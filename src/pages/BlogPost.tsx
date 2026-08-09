import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import DecisionEngineArticle from "@/components/blog/articles/DecisionEngineArticle";
import SecureArchitectureArticle from "@/components/blog/articles/SecureArchitectureArticle";
import AgentToolsArticle from "@/components/blog/articles/AgentToolsArticle";
import SocialShareButtons from "@/components/blog/SocialShareButtons";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const RICH_ARTICLES: Record<string, React.ComponentType> = {
  "ai-workflow-automation-guide": DecisionEngineArticle,
  "enterprise-ai-architecture": SecureArchitectureArticle,
  "agent-tools-vs-core-systems": AgentToolsArticle,
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPct((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const RichComponent = slug ? RICH_ARTICLES[slug] : undefined;

  useDocumentMeta(
    post
      ? {
          title: post.title,
          description: post.excerpt,
          image: post.cover_image_url || undefined,
          url: `/blog/${post.slug}`,
          author: post.author_name,
          publishedTime: post.published_at || undefined,
          tags: post.tags,
        }
      : null
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-base text-fg-default">
        <Navbar />
        <div className="container max-w-[680px] py-20 space-y-4">
          <div className="h-8 bg-bg-muted animate-pulse rounded w-3/4" />
          <div className="h-4 bg-bg-muted animate-pulse rounded w-1/2" />
          <div className="h-64 bg-bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (!post || error) {
    return (
      <div className="min-h-screen bg-bg-base text-fg-default font-body">
        <Navbar />
        <div className="container flex flex-col items-center justify-center py-32 text-center">
          <h1 className="text-3xl font-extrabold font-display">Article not found</h1>
          <p className="mt-2 text-sm text-fg-dim">This article may have been removed or updated.</p>
          <Link to="/blog" className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-xs font-semibold text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-base text-fg-default font-body relative">
      {/* Fixed Top Scroll Progress Rail */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border-subtle">
        <div className="h-full bg-accent transition-all duration-150" style={{ width: `${scrollPct}%` }} />
      </div>

      <Navbar />

      {/* Hero / Title Header Container (Single Centered Reading Width ~680px) */}
      <header className="container max-w-[680px] pt-14 pb-8 border-b border-border-subtle">
        <Link
          to="/blog"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-mono text-fg-dim hover:text-fg-default transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All Publications
        </Link>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.map((tag: string) => (
            <span key={tag} className="text-[10px] font-mono text-accent bg-accent-dim px-2.5 py-0.5 rounded-full font-semibold">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-extrabold sm:text-4xl leading-tight font-display text-fg-default">
          {post.title}
        </h1>

        <div className="mt-4 flex items-center justify-between text-xs text-fg-dim font-mono border-t border-border-subtle pt-4">
          <div className="flex items-center gap-3">
            <span>By {post.author_name}</span>
            <span>•</span>
            <span>{post.published_at ? format(new Date(post.published_at), "MMMM d, yyyy") : ""}</span>
          </div>
          <SocialShareButtons url={`/blog/${post.slug}`} title={post.title} excerpt={post.excerpt} />
        </div>
      </header>

      {/* Cover Image */}
      {post.cover_image_url && (
        <div className="container max-w-[680px] my-8">
          <div className="overflow-hidden rounded-md border border-border-subtle">
            <img src={post.cover_image_url} alt={post.title} className="h-full w-full object-cover max-h-[380px]" />
          </div>
        </div>
      )}

      {/* Centered Reading Body Column (~680px width) */}
      <main className="container max-w-[680px] py-8">
        {RichComponent ? (
          <RichComponent />
        ) : (
          <article className="prose prose-sm max-w-none text-fg-default leading-relaxed prose-headings:font-display prose-headings:font-bold prose-a:text-accent prose-blockquote:bg-accent-dim prose-blockquote:border-accent prose-blockquote:rounded-r-md prose-blockquote:p-4 font-body">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        )}

        {/* Post Footer CTA */}
        <div className="mt-16 rounded-md bg-accent-dim border border-accent/30 p-8 text-center space-y-3">
          <h3 className="text-lg font-bold text-fg-default font-display">
            Ready to transition to Agentic Decision Intelligence?
          </h3>
          <p className="text-xs text-fg-dim max-w-md mx-auto">
            Discover how custom AI agents can automate your logistics or retail operations.
          </p>
          <button
            onClick={() =>
              (window as any).Calendly?.initPopupWidget({
                url: "https://calendly.com/d-bstsolutions/book-your-free-consultation",
              })
            }
            className="mt-2 rounded-full bg-accent px-6 py-2.5 text-xs font-semibold text-white hover:opacity-90 inline-block shadow-flat"
          >
            Book a Free Consultation
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
