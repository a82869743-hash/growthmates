import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "submit_idea",
  title: "Submit product idea",
  description:
    "Submit a new product idea to the GrowthMates.ai public roadmap on behalf of the signed-in user.",
  inputSchema: {
    title: z.string().trim().min(3).max(120).describe("Short idea title."),
    description: z.string().trim().min(10).max(2000).describe("Detailed description of the idea."),
    industries: z
      .array(z.string().trim().min(1).max(40))
      .max(5)
      .default([])
      .describe("Relevant industries, e.g. ['transportation'] or ['retail']."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ title, description, industries }, ctx: ToolContext) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      {
        global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
        auth: { persistSession: false, autoRefreshToken: false },
      },
    );
    const { data, error } = await supabase
      .from("ideas")
      .insert({
        title,
        description,
        industries,
        contact_email: ctx.getUserEmail() ?? null,
      })
      .select("id, title, description, industries, created_at")
      .single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Idea submitted: ${data.id}` }],
      structuredContent: { idea: data },
    };
  },
});
