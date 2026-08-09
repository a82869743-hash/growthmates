import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactPayload {
  name: string;
  email: string;
  company: string;
  message: string;
}

// Simple server-side validation
function validatePayload(body: unknown): { valid: true; data: ContactPayload } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body" };
  }
  const { name, email, company, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
    return { valid: false, error: "Name must be 2-100 characters" };
  }
  if (typeof email !== "string" || email.trim().length > 255) {
    return { valid: false, error: "Invalid email" };
  }
  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: "Invalid email format" };
  }
  if (company !== undefined && company !== null && typeof company === "string" && company.length > 200) {
    return { valid: false, error: "Company name too long" };
  }
  if (message !== undefined && message !== null && typeof message === "string" && message.length > 2000) {
    return { valid: false, error: "Message too long" };
  }

  return {
    valid: true,
    data: {
      name: (name as string).trim(),
      email: (email as string).trim().toLowerCase(),
      company: typeof company === "string" ? company.trim() : "",
      message: typeof message === "string" ? message.trim() : "",
    },
  };
}

const RATE_LIMIT_WINDOW_MINUTES = 60;
const RATE_LIMIT_MAX_REQUESTS = 3;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // --- Server-side input validation ---
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const validation = validatePayload(rawBody);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    const { name, email, company, message } = validation.data;

    // --- Database-backed rate limiting by email ---
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();

    const { count, error: countError } = await supabase
      .from("contact_submissions")
      .select("id", { count: "exact", head: true })
      .eq("email", email)
      .gte("created_at", windowStart);

    if (!countError && count !== null && count >= RATE_LIMIT_MAX_REQUESTS) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // --- Send email notification ---
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured — skipping email notification");
      return new Response(JSON.stringify({ skipped: true, reason: "RESEND_API_KEY not set" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const NOTIFICATION_EMAIL = Deno.env.get("NOTIFICATION_EMAIL") || "admin@growthmates.ai";

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e; border-bottom: 2px solid #4361ee; padding-bottom: 10px;">
          📩 New Demo Request — GrowthMates.ai
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #555; width: 120px;">Name</td>
            <td style="padding: 8px 12px;">${escapeHtml(name)}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 8px 12px; font-weight: bold; color: #555;">Email</td>
            <td style="padding: 8px 12px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #555;">Company</td>
            <td style="padding: 8px 12px;">${company ? escapeHtml(company) : "<em>Not provided</em>"}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 8px 12px; font-weight: bold; color: #555;">Message</td>
            <td style="padding: 8px 12px;">${message ? escapeHtml(message) : "<em>No message</em>"}</td>
          </tr>
        </table>
        <p style="margin-top: 24px; font-size: 13px; color: #999;">
          This lead is also saved in your contact_submissions database table.
        </p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "GrowthMates.ai <noreply@growthmates.ai>",
        to: [NOTIFICATION_EMAIL],
        subject: `New Demo Request from ${name}${company ? ` (${company})` : ""}`,
        html: emailHtml,
        reply_to: email,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "Failed to send notification" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Error in send-contact-notification:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

serve(handler);
