import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_roadmap_items",
  title: "List roadmap items",
  description: "List public GrowthMates.ai product roadmap items with title, status, and industry.",
  inputSchema: {
    status: z
      .enum(["planned", "in_progress", "shipped"])
      .optional()
      .describe("Optional filter by status."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    let query = supabase.from("roadmap_items").select("*");
    if (status) query = query.eq("status", status);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { items: data ?? [] },
    };
  },
});
