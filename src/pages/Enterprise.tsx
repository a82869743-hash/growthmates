import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import {
  Building2,
  ShieldCheck,
  Send,
  CheckCircle,
  Clock,
  CalendarCheck,
  ArrowRight,
  ArrowUpRight,
  FileText,
  Lock,
  Cpu,
  Zap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ScrollReveal from "@/components/landing/ScrollReveal";

const CALENDLY_URL = "https://calendly.com/d-bstsolutions/book-your-free-consultation";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

type ContactFormData = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

const FEATURED_INFOGRAPHIC_POST = {
  id: "post-featured-infographic",
  title: "AI AGENT vs AGENTIC AI: Understanding the Difference for Enterprise Operations",
  slug: "ai-agent-vs-agentic-ai",
  excerpt:
    "Understanding the fundamental shift from rule-based AI agents with limited memory to goal-driven Agentic AI that plans, reasons, and executes autonomous end-to-end enterprise workflows.",
  cover_image_url: "/images/ai-agent-vs-agentic-ai.png",
  author_name: "GrowthMates AI Research",
  published_at: "2026-03-28T00:00:00Z",
  tags: ["Agentic AI", "AI Architecture", "Decision Intelligence"],
};

const DEFAULT_EDITORIAL_POSTS = [
  {
    id: "post-1",
    title: "Agent Tools vs. Building AI Into Your Core System: A Data-Driven Decision Framework",
    slug: "agent-tools-vs-core-systems",
    excerpt:
      "74% faster time to value. 62% lower TCO over five years. 3.8x more use cases deployed. The practical framework for when to build an agent vs core system integration.",
    cover_image_url: "/images/blog-unique-1.png",
    author_name: "GrowthMates Architecture",
    published_at: "2026-03-25T00:00:00Z",
    tags: ["Agent Tools", "Build vs Buy"],
  },
  {
    id: "post-2",
    title: "Building Secure, Scalable Enterprise AI Agent Architectures",
    slug: "enterprise-ai-architecture",
    excerpt:
      "A deep dive into the architectural patterns, security layers, and scalability considerations for deploying autonomous AI agents across enterprise environments.",
    cover_image_url: "/images/blog-unique-2.png",
    author_name: "GrowthMates Engineering",
    published_at: "2026-03-24T00:00:00Z",
    tags: ["Enterprise AI", "Architecture"],
  },
  {
    id: "post-3",
    title: "AI Agents Are Decision Engines, Not Workflow Tools — What That Means for Your Operations",
    slug: "ai-workflow-automation-guide",
    excerpt:
      "Traditional automation follows scripts. AI agents reason, decide, and act. Backed by research from Gartner and McKinsey, revealing why the shift from process automation is accelerating.",
    cover_image_url: "/images/blog-unique-3.png",
    author_name: "GrowthMates Strategy",
    published_at: "2026-03-20T00:00:00Z",
    tags: ["AI Agents", "Decision Intelligence"],
  },
];

const Enterprise = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  // Contact Form State
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: initialQuery ? `Enterprise query: ${initialQuery}` : "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const renderTime = useRef(Date.now());

  useEffect(() => {
    if (initialQuery) {
      setForm((prev) => ({
        ...prev,
        message: prev.message || `Enterprise query: ${initialQuery}`,
      }));
    }
  }, [initialQuery]);

  const validate = (): boolean => {
    const result = contactSchema.safeParse(form);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: FieldErrors = {};
    result.error.errors.forEach((err) => {
      const field = err.path[0] as keyof ContactFormData;
      if (!fieldErrors[field]) fieldErrors[field] = err.message;
    });
    setErrors(fieldErrors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot || Date.now() - renderTime.current < 2000) {
      setSubmitted(true);
      return;
    }
    if (!validate()) return;

    setSubmitting(true);
    try {
      const { error: dbError } = await supabase.from("contact_submissions").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company?.trim() || null,
        message: form.message?.trim() || null,
      });
      if (dbError) throw dbError;

      try {
        await supabase.functions.invoke("send-contact-notification", {
          body: {
            name: form.name.trim(),
            email: form.email.trim(),
            company: form.company?.trim() || "",
            message: form.message?.trim() || "",
          },
        });
      } catch {
        console.warn("Email notification failed, but submission was saved.");
      }

      setSubmitted(true);
      toast({
        title: "Enterprise consultation requested",
        description: "An AI Solution Architect will reach out within 2 hours.",
      });
    } catch {
      toast({
        title: "Submission error",
        description: "Please try again or email us directly at hello@growthmates.ai",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#14171F] font-body">
      <Navbar />

      {/* ══ 1. HERO SECTION ══ */}
      <section className="border-b border-[#E7E5DE] bg-white py-16 md:py-24">
        <ScrollReveal variant="fade-up">
          <div className="container max-w-4xl text-center px-4 sm:px-6 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] border border-[#2E5EFF]/20 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#2E5EFF]">
              <Building2 className="h-3.5 w-3.5" /> ENTERPRISE SOLUTIONS &amp; RESEARCH
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-display text-[#14171F]">
              Scale Custom <span className="text-[#2E5EFF]">Agentic AI</span> for Your Enterprise
            </h1>
            <p className="text-base sm:text-lg text-[#5B616E] max-w-2xl mx-auto font-body">
              Partner directly with GrowthMates AI engineering to deploy autonomous agents, integrate MCP 1.0 zero-friction gateways, and explore our latest operational research.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ══ 2. ENTERPRISE CONSULTATION & CONTACT GRID ══ */}
      <section className="py-16 md:py-24 container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Left Column: Enterprise Security & Value Prop (5 cols) */}
          <ScrollReveal variant="fade-right" className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-white border border-[#E7E5DE] p-8 shadow-raised space-y-6">
              <h2 className="text-2xl font-extrabold font-display text-[#14171F]">
                Enterprise-Grade AI Architecture
              </h2>
              <p className="text-sm text-[#5B616E] leading-relaxed">
                Connect intelligent decision agents directly into your SAP, Oracle, Xero, or TMS infrastructure with zero legacy friction and military-grade encryption.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-[#EEF1FF] text-[#2E5EFF] shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#14171F]">SOC2 Type II &amp; SAML 2.0</h4>
                    <p className="text-xs text-[#5B616E]">Enterprise SSO, granular RBAC permissions, and immutable audit trails.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-[#1FAA59]/10 text-[#1FAA59] shrink-0">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#14171F]">Model Context Protocol (MCP 1.0)</h4>
                    <p className="text-xs text-[#5B616E]">Standardized real-time tool calling and data context streaming.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-[#FF6A3D]/10 text-[#FF6A3D] shrink-0">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#14171F]">Dedicated Solution Architects</h4>
                    <p className="text-xs text-[#5B616E]">End-to-end custom agent design, load testing, and deployment SLA.</p>
                  </div>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="pt-4 border-t border-[#E7E5DE]">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#16214F] px-5 py-3.5 text-xs font-bold text-white hover:bg-[#0E1638] transition-all shadow-md"
                >
                  <CalendarCheck className="h-4 w-4 text-[#4ADE80]" />
                  Schedule Live Executive Demo <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Direct Consultation Form (7 cols) */}
          <ScrollReveal variant="fade-left" className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-[#E7E5DE] p-8 sm:p-10 shadow-raised">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1FAA59]/10 text-[#1FAA59]">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-[#14171F]">Thank you, {form.name}!</h3>
                  <p className="text-sm text-[#5B616E] max-w-md mx-auto">
                    Your enterprise inquiry has been routed to our senior engineering team. We will review your requirements and respond within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", company: "", message: "" });
                    }}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#2E5EFF] hover:underline"
                  >
                    Submit another query →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-extrabold font-display text-[#14171F]">
                      Request Enterprise Consultation
                    </h3>
                    <p className="text-xs text-[#5B616E] mt-1">
                      Fill out your details below and an AI Solution Architect will analyze your workflows.
                    </p>
                  </div>

                  {/* Anti-spam honeypot */}
                  <input
                    type="text"
                    name="website_url"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#5B616E] font-mono mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Sarah Jenkins"
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm font-semibold text-[#14171F] focus:border-[#2E5EFF] focus:outline-none transition-all ${
                          errors.name ? "border-red-500 bg-red-50/20" : "border-[#E7E5DE] bg-white"
                        }`}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#5B616E] font-mono mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="sarah@enterprise.com"
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm font-semibold text-[#14171F] focus:border-[#2E5EFF] focus:outline-none transition-all ${
                          errors.email ? "border-red-500 bg-red-50/20" : "border-[#E7E5DE] bg-white"
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5B616E] font-mono mb-1.5">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Global Logistics Corp"
                      className="w-full rounded-xl border border-[#E7E5DE] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#14171F] focus:border-[#2E5EFF] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5B616E] font-mono mb-1.5">
                      Operational Challenge or Architecture Goals
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your current bottleneck, e.g. We spend 15 hrs/week manually auditing freight invoices across 400 monthly loads..."
                      className="w-full rounded-xl border border-[#E7E5DE] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#14171F] focus:border-[#2E5EFF] focus:outline-none transition-all font-body"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2E5EFF] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#1B3BB3] transition-all disabled:opacity-50"
                  >
                    {submitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Submit Enterprise Request
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ══ 3. ENTERPRISE RESEARCH & THOUGHT LEADERSHIP (FORMERLY BLOG) ══ */}
      <section className="border-t border-[#E7E5DE] bg-white py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="inline-block rounded-full bg-[#EEF1FF] border border-[#2E5EFF]/20 px-3.5 py-1 text-xs font-mono font-bold uppercase text-[#2E5EFF]">
                GrowthMates Publication
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-[#14171F]">
                Enterprise Research &amp; Architectural Insights
              </h2>
              <p className="text-base text-[#5B616E] max-w-xl mx-auto font-body">
                Deep-dive research on Agentic AI design patterns, decision engines, and enterprise integrations.
              </p>
            </div>
          </ScrollReveal>

          {/* Featured Infographic Research Article */}
          <ScrollReveal variant="scale">
            <div className="rounded-3xl border-2 border-[#2E5EFF]/20 bg-[#FAF9F6] p-8 sm:p-10 shadow-sm mb-12">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold text-[#FF6A3D] bg-[#FF6A3D]/10 px-2.5 py-0.5 rounded uppercase tracking-wider">
                  Featured Research
                </span>
                <span className="text-xs text-[#8B8F99]">March 28, 2026</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#14171F] font-display hover:text-[#2E5EFF] transition-colors">
                <Link to={`/blog/${FEATURED_INFOGRAPHIC_POST.slug}`}>
                  {FEATURED_INFOGRAPHIC_POST.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#5B616E] leading-relaxed max-w-3xl">
                {FEATURED_INFOGRAPHIC_POST.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Link
                  to={`/blog/${FEATURED_INFOGRAPHIC_POST.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2E5EFF] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1B3BB3] transition-all"
                >
                  Read Full Architecture Analysis <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* 3-Column Editorial Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {DEFAULT_EDITORIAL_POSTS.map((post) => (
              <ScrollReveal key={post.id} variant="fade-up">
                <div className="rounded-2xl border border-[#E7E5DE] bg-[#FAF9F6] p-6 space-y-4 hover:border-[#2E5EFF] transition-all flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#2E5EFF] bg-[#EEF1FF] px-2 py-0.5 rounded uppercase">
                        {post.tags[0]}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-[#14171F] font-display leading-snug hover:text-[#2E5EFF] transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <p className="text-xs text-[#5B616E] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#E7E5DE] flex justify-between items-center text-xs font-bold text-[#2E5EFF]">
                    <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 hover:underline">
                      Read Paper <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <span className="text-[11px] text-[#8B8F99] font-normal font-mono">{post.author_name}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enterprise;
