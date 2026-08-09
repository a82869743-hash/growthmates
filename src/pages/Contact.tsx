import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, CheckCircle, Clock, CalendarCheck, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const CALENDLY_URL = "https://calendly.com/d-bstsolutions/book-your-free-consultation";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

type ContactFormData = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

const ContactPanel = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: initialQuery ? `Automate query: ${initialQuery}` : "",
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
        message: prev.message || `Automate query: ${initialQuery}`,
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
    if (honeypot) {
      setSubmitted(true);
      return;
    }
    if (Date.now() - renderTime.current < 2000) {
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
      toast({ title: "Message received!", description: "We'll get back to you within 24 hours." });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  return (
    <div className="min-h-screen bg-bg-base text-fg-default font-body">
      <Navbar />

      <div className="container py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="inline-block rounded-full bg-accent-dim px-3.5 py-1 text-xs font-semibold text-accent mb-3">
              Direct Contact &amp; Consultations
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-display">
              Get in Touch
            </h1>
            <p className="mt-3 text-base text-fg-dim">
              Send us a message or schedule a live working session directly with our engineering team.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Left: Contact Form Column (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {submitted ? (
                <div className="flex flex-col items-center justify-center rounded-md border border-border-subtle bg-bg-surface p-12 text-center shadow-raised">
                  <div className="rounded-full bg-accent-dim p-4 mb-4">
                    <CheckCircle className="h-10 w-10 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold font-display">Thank you!</h2>
                  <p className="mt-2 text-sm text-fg-dim">
                    Your message has been received. Our team will reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-md border border-border-subtle bg-bg-surface p-8 shadow-raised space-y-6"
                >
                  <h2 className="text-xl font-bold font-display border-b border-border-subtle pb-3">
                    Send a Message
                  </h2>

                  {/* Floating-label style Input: Full Name */}
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      placeholder=" "
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={`peer w-full rounded-md border bg-bg-base px-3.5 pt-5 pb-2 text-xs text-fg-default focus:outline-none focus:border-accent ${
                        errors.name ? "border-signal-warm" : "border-border-subtle"
                      }`}
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-3.5 top-1.5 text-[10px] font-semibold uppercase tracking-wider text-fg-dimmer transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:text-fg-dim peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-accent"
                    >
                      Full Name *
                    </label>
                    {errors.name && <p className="mt-1 text-[11px] text-signal-warm">{errors.name}</p>}
                  </div>

                  {/* Floating-label style Input: Work Email */}
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      placeholder=" "
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={`peer w-full rounded-md border bg-bg-base px-3.5 pt-5 pb-2 text-xs text-fg-default focus:outline-none focus:border-accent ${
                        errors.email ? "border-signal-warm" : "border-border-subtle"
                      }`}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-3.5 top-1.5 text-[10px] font-semibold uppercase tracking-wider text-fg-dimmer transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:text-fg-dim peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-accent"
                    >
                      Work Email *
                    </label>
                    {errors.email && <p className="mt-1 text-[11px] text-signal-warm">{errors.email}</p>}
                  </div>

                  {/* Floating-label style Input: Company */}
                  <div className="relative">
                    <input
                      id="company"
                      type="text"
                      placeholder=" "
                      value={form.company || ""}
                      onChange={(e) => handleChange("company", e.target.value)}
                      className="peer w-full rounded-md border border-border-subtle bg-bg-base px-3.5 pt-5 pb-2 text-xs text-fg-default focus:outline-none focus:border-accent"
                    />
                    <label
                      htmlFor="company"
                      className="absolute left-3.5 top-1.5 text-[10px] font-semibold uppercase tracking-wider text-fg-dimmer transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:text-fg-dim peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-accent"
                    >
                      Company Name
                    </label>
                  </div>

                  {/* Floating-label style Input: Message */}
                  <div className="relative">
                    <textarea
                      id="message"
                      placeholder=" "
                      rows={4}
                      value={form.message || ""}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="peer w-full rounded-md border border-border-subtle bg-bg-base px-3.5 pt-6 pb-2 text-xs text-fg-default focus:outline-none focus:border-accent resize-none"
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-3.5 top-1.5 text-[10px] font-semibold uppercase tracking-wider text-fg-dimmer transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:text-fg-dim peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-accent"
                    >
                      Your Use Case &amp; Questions
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 shadow-flat"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                    <Send className="h-4 w-4" />
                  </button>

                  {/* Honeypot */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>
                </form>
              )}

              {/* 3-Step What Happens Next Strip */}
              <div className="rounded-md bg-bg-muted border border-border-subtle p-5 font-sans">
                <p className="text-xs font-mono uppercase tracking-wider text-fg-dimmer mb-3 font-semibold">
                  What Happens Next?
                </p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 rounded bg-bg-surface border border-border-subtle">
                    <Clock className="h-4 w-4 text-accent mx-auto mb-1" />
                    <span className="font-semibold block text-fg-default text-[11px]">1. We Review</span>
                    <span className="text-[10px] text-fg-dim">Within 2 hours</span>
                  </div>
                  <div className="p-3 rounded bg-bg-surface border border-border-subtle">
                    <Send className="h-4 w-4 text-accent mx-auto mb-1" />
                    <span className="font-semibold block text-fg-default text-[11px]">2. We Reach Out</span>
                    <span className="text-[10px] text-fg-dim">Within 24 hours</span>
                  </div>
                  <div className="p-3 rounded bg-bg-surface border border-border-subtle">
                    <CalendarCheck className="h-4 w-4 text-accent mx-auto mb-1" />
                    <span className="font-semibold block text-fg-default text-[11px]">3. Working Session</span>
                    <span className="text-[10px] text-fg-dim">Book 1-on-1 demo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Calendly Embed Column (6 cols) */}
            <div className="lg:col-span-6 rounded-lg bg-bg-surface border border-border-subtle p-6 shadow-raised flex flex-col h-full">
              <div className="mb-4 border-b border-border-subtle pb-3">
                <h2 className="text-xl font-bold font-display text-fg-default">
                  Book a Free Working Session
                </h2>
                <p className="text-xs text-fg-dim mt-0.5">
                  Pick a convenient time for a 30-minute interactive demo with our engineering team.
                </p>
              </div>

              <iframe
                src={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff`}
                className="w-full flex-1 rounded-md border border-border-subtle min-h-[620px]"
                frameBorder="0"
                title="Book a consultation"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPanel;
