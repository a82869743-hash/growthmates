import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory IP rate limiter (per instance)
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 10;
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
      return new Response(JSON.stringify({ error: "Too many requests." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { answers, email, name, company } = await req.json();
    if (!answers || !Array.isArray(answers) || answers.length < 5) {
      return new Response(JSON.stringify({ error: "All quiz answers required." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const safeAnswers = answers.slice(0, 10).map((a: unknown) => (typeof a === "string" ? a : String(a ?? "")).slice(0, 500));

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const prompt = `Analyze these business assessment answers and provide a structured automation readiness score:

1. How do you handle orders? ${safeAnswers[0]}
2. Biggest admin bottleneck? ${safeAnswers[1]}
3. Team size for operations? ${safeAnswers[2]}
4. Current systems used? ${safeAnswers[3]}
5. Automation experience? ${safeAnswers[4]}

Respond with ONLY a JSON object (no markdown, no code fences) in this exact format:
{"score": <number 0-100>, "level": "<Beginner|Intermediate|Advanced>", "strengths": ["<strength1>", "<strength2>"], "improvements": ["<improvement1>", "<improvement2>", "<improvement3>"], "recommendations": ["<rec1>", "<rec2>", "<rec3>"]}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are an automation readiness analyst. Return ONLY valid JSON, no markdown." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) return new Response(JSON.stringify({ error: "Too many requests." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (response.status === 402) return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    let result;
    try {
      // Try to extract JSON from the response, handling potential markdown fences
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      result = JSON.parse(jsonMatch ? jsonMatch[0] : content);
    } catch {
      result = { score: 50, level: "Intermediate", strengths: ["Digital awareness"], improvements: ["Process automation", "System integration"], recommendations: ["Start with document automation", "Evaluate AI-ready platforms"] };
    }

    // Save lead if email provided
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && typeof email === "string" && emailRegex.test(email.trim()) && email.trim().length <= 255) {
      try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from("contact_submissions").insert({
          name: (typeof name === "string" ? name.trim().slice(0, 100) : "") || "Assessment User",
          email: email.trim().toLowerCase(),
          company: typeof company === "string" ? company.trim().slice(0, 200) : null,
          message: `Assessment Score: ${result.score}/100 (${result.level}). Answers: ${safeAnswers.join("; ")}`,
          source: "assessment",
        });
      } catch (dbErr) {
        console.error("Failed to save assessment lead:", dbErr);
      }
    }

    return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("assessment-quiz error:", e);
    return new Response(JSON.stringify({ error: "Something went wrong." }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
