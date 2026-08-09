import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listBlogPosts from "./tools/list-blog-posts";
import getBlogPost from "./tools/get-blog-post";
import listRoadmapItems from "./tools/list-roadmap-items";
import submitIdea from "./tools/submit-idea";

// Build the OAuth issuer from the project ref (Vite inlines this at build time).
// Do NOT use SUPABASE_URL — on Lovable Cloud it is the .lovable.cloud proxy,
// and mcp-js requires the direct supabase.co issuer.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "growthmates-mcp",
  title: "GrowthMates.ai",
  version: "0.1.0",
  instructions:
    "Tools to browse GrowthMates.ai blog articles and public product roadmap, and to submit new roadmap ideas as the signed-in user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listBlogPosts, getBlogPost, listRoadmapItems, submitIdea],
});
