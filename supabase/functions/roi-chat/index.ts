import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an ROI Calculator assistant for GrowthMates.ai, helping transportation & logistics businesses estimate savings from AI automation.

You need to gather the following data through natural conversation:
1. Fleet size (number of trucks/vehicles) - minimum 5
2. Monthly orders/shipments
3. Average revenue per load (in their currency)
4. Country (USA or Australia)
5. Staff doing admin tasks (order entry, invoicing, reconciliation, customer queries)
6. Hourly rate for admin staff
7. Weekly hours spent on: manual order entry, invoice processing, tracking updates, data reconciliation
8. Pain points (from: dataEntryErrors, invoiceDisputes, delayedInvoicing, poorVisibility, highAdminWorkload, slowReporting)
9. Current systems (from: tms, xero, quickbooks, myob, excel, other)
10. Automation willingness (0-100%)

Ask 2-3 questions at a time, keeping it conversational. When you have enough data, call the extract_roi_inputs tool with the structured data.

Be friendly, professional, and help them think through their operations. Use reasonable defaults if they're unsure about specific numbers.`;

// Simple in-memory IP rate limiter (per instance)
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 30;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > RATE_LIMIT_MAX;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (rateLimited(ip)) {
      return new Response(JSON.stringify({ error: "Too many requests. Please wait." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages required." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const safeMessages = messages.slice(-20).map((m: any) => ({
      role: m?.role === "assistant" ? "assistant" : (m?.role === "tool" ? "tool" : "user"),
      content: typeof m?.content === "string" ? m.content.slice(0, 2000) : m?.content,
      ...(m?.tool_calls ? { tool_calls: m.tool_calls } : {}),
      ...(m?.tool_call_id ? { tool_call_id: m.tool_call_id } : {}),
    }));

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...safeMessages],
        stream: true,
        tools: [{
          type: "function",
          function: {
            name: "extract_roi_inputs",
            description: "Extract structured ROI calculator inputs from the conversation when enough data has been gathered.",
            parameters: {
              type: "object",
              properties: {
                business: {
                  type: "object",
                  properties: {
                    fleetSize: { type: "number" },
                    monthlyOrders: { type: "number" },
                    avgRevenuePerLoad: { type: "number" },
                    country: { type: "string", enum: ["USA", "Australia"] },
                  },
                  required: ["fleetSize", "monthlyOrders", "avgRevenuePerLoad", "country"],
                },
                operations: {
                  type: "object",
                  properties: {
                    staff: {
                      type: "object",
                      properties: {
                        orderEntry: { type: "number" },
                        invoicing: { type: "number" },
                        reconciliation: { type: "number" },
                        customerQueries: { type: "number" },
                      },
                      required: ["orderEntry", "invoicing", "reconciliation", "customerQueries"],
                    },
                    hourlyRate: { type: "number" },
                    weeklyHours: {
                      type: "object",
                      properties: {
                        manualOrderEntry: { type: "number" },
                        invoiceProcessing: { type: "number" },
                        trackingUpdates: { type: "number" },
                        dataReconciliation: { type: "number" },
                      },
                      required: ["manualOrderEntry", "invoiceProcessing", "trackingUpdates", "dataReconciliation"],
                    },
                  },
                  required: ["staff", "hourlyRate", "weeklyHours"],
                },
                painPoints: { type: "array", items: { type: "string" } },
                automation: {
                  type: "object",
                  properties: {
                    currentSystems: { type: "array", items: { type: "string" } },
                    willingnessPercent: { type: "number" },
                  },
                  required: ["currentSystems", "willingnessPercent"],
                },
              },
              required: ["business", "operations", "painPoints", "automation"],
            },
          },
        }],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) return new Response(JSON.stringify({ error: "Too many requests. Please wait." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (response.status === 402) return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error(`AI gateway error: ${response.status}`);
    }

    return new Response(response.body, { headers: { ...corsHeaders, "Content-Type": "text/event-stream" } });
  } catch (e) {
    console.error("roi-chat error:", e);
    return new Response(JSON.stringify({ error: "Something went wrong." }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
