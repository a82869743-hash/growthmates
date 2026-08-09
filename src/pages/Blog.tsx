import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const ArticleList = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, cover_image_url, author_name, tags, published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const featuredPost = posts && posts.length > 0 ? posts[0] : null;
  const remainingPosts = posts && posts.length > 1 ? posts.slice(1) : [];

  return (
    <div className="min-h-screen bg-bg-base text-fg-default font-body">
      <Navbar />

      {/* Hero Header */}
      <section className="border-b border-border-subtle bg-bg-surface py-16 md:py-24">
        <div className="container max-w-4xl text-center">
          <span className="inline-block rounded-full bg-accent-dim px-3.5 py-1 text-xs font-semibold text-accent mb-3">
            GrowthMates Publication
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-display">
            Perspectives &amp; Insights
          </h1>
          <p className="mt-3 text-base text-fg-dim max-w-xl mx-auto">
            Deep-dive articles on Agentic AI, supply chain decision engines, and enterprise workflow automation.
          </p>
        </div>
      </section>

      {/* Editorial Article List Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-bg-muted animate-pulse rounded-md" />
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured / Most Recent Post Top Treatment */}
              {featuredPost && (
                <div className="border-b border-border-subtle pb-12">
                  <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-wider block mb-3">
                    FEATURED ARTICLE
                  </span>
                  <Link to={`/blog/${featuredPost.slug}`} className="group block space-y-4">
                    {featuredPost.cover_image_url && (
                      <div className="aspect-[21/9] overflow-hidden rounded-md border border-border-subtle mb-4">
                        <img
                          src={featuredPost.cover_image_url}
                          alt={featuredPost.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                        />
                      </div>
                    )}
                    <h2 className="text-2xl md:text-3xl font-extrabold text-fg-default font-display group-hover:text-accent transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-sm text-fg-dim leading-relaxed line-clamp-2">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-fg-dimmer font-mono pt-1">
                      <span>{featuredPost.author_name}</span>
                      <span>•</span>
                      <span>
                        {featuredPost.published_at
                          ? format(new Date(featuredPost.published_at), "MMM d, yyyy")
                          : "Draft"}
                      </span>
                    </div>
                  </Link>
                </div>
              )}

              {/* Remaining Posts Editorial List */}
              <div className="space-y-8">
                {remainingPosts.map((post) => (
                  <article
                    key={post.id}
                    className="border-b border-border-subtle pb-8 last:border-b-0 last:pb-0"
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group grid gap-6 md:grid-cols-12 items-center"
                    >
                      {/* Left Thumbnail (4 cols) */}
                      <div className="md:col-span-4">
                        {post.cover_image_url ? (
                          <div className="aspect-video overflow-hidden rounded-md border border-border-subtle">
                            <img
                              src={post.cover_image_url}
                              alt={post.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="aspect-video rounded-md bg-accent-dim flex items-center justify-center text-accent font-bold text-xl font-display">
                            GM AI
                          </div>
                        )}
                      </div>

                      {/* Right Title & Excerpt (8 cols) */}
                      <div className="md:col-span-8 space-y-2">
                        <div className="flex flex-wrap gap-2 mb-1">
                          {post.tags?.slice(0, 2).map((t: string) => (
                            <span key={t} className="text-[10px] font-mono text-accent bg-accent-dim px-2 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-fg-default font-display group-hover:text-accent transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-xs text-fg-dim line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-fg-dimmer pt-2 font-mono">
                          <span>
                            {post.published_at
                              ? format(new Date(post.published_at), "MMM d, yyyy")
                              : "Draft"}
                          </span>
                          <span className="text-accent font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Read Article <ArrowUpRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {!posts || posts.length === 0 ? (
                <div className="text-center py-16 text-fg-dim">
                  No articles published yet. Check back soon.
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArticleList;
