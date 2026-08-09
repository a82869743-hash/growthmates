import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, ArrowRight, Loader2, Award } from "lucide-react";
import { Link } from "react-router-dom";
import type { AssessmentResult } from "./types";

interface AssessmentResultsProps {
  result: AssessmentResult | null;
  isLoading: boolean;
  onSubmitEmail: (email: string, name: string, company: string) => void;
}

const AssessmentResults = ({ result, isLoading, onSubmitEmail }: AssessmentResultsProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [revealed, setRevealed] = useState(false);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-lg text-center py-20 bg-bg-surface rounded-md border border-border-subtle p-8 shadow-raised">
        <Loader2 className="h-10 w-10 animate-spin text-accent mx-auto mb-4" />
        <h2 className="text-xl font-bold font-display text-fg-default">Analyzing your operational workflow...</h2>
        <p className="mt-2 text-xs text-fg-dim">Our AI is computing your Automation Readiness Score &amp; recommendations.</p>
      </div>
    );
  }

  if (!result) return null;

  if (!revealed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-lg"
      >
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-dim text-accent">
            <Award className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-extrabold font-display text-fg-default">Your Report is Ready!</h2>
          <p className="mt-2 text-xs text-fg-dim">Enter your contact details to unlock your full Automation Readiness Analysis.</p>
        </div>

        <div className="rounded-md border border-border-subtle bg-bg-surface p-6 shadow-raised space-y-4">
          <div>
            <label className="block text-xs font-semibold text-fg-default mb-1">Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full rounded-md border border-border-subtle bg-bg-base px-3.5 py-2 text-xs text-fg-default focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-fg-default mb-1">Work Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@company.com"
              className="w-full rounded-md border border-border-subtle bg-bg-base px-3.5 py-2 text-xs text-fg-default focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-fg-default mb-1">Company</label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Logistics"
              className="w-full rounded-md border border-border-subtle bg-bg-base px-3.5 py-2 text-xs text-fg-default focus:border-accent"
            />
          </div>
          <button
            disabled={!email || !name}
            onClick={() => {
              onSubmitEmail(email, name, company);
              setRevealed(true);
            }}
            className="w-full rounded-full bg-accent px-6 py-3 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 shadow-flat"
          >
            Unlock My Report <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl space-y-8"
    >
      {/* Organic Asymmetric Blob Card Score Presentation */}
      <div
        style={{ borderRadius: "48px 48px 12px 48px" }}
        className="bg-bg-surface border border-accent/40 p-8 shadow-floating text-center max-w-md mx-auto space-y-3"
      >
        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-accent">
          AUTOMATION READINESS INDEX
        </span>
        <div className="text-6xl font-extrabold text-fg-default font-display tracking-tight">
          {result.score} <span className="text-xs text-fg-dimmer font-normal">/ 100</span>
        </div>
        <div className="inline-block rounded-full bg-accent-dim px-4 py-1 text-xs font-bold text-accent uppercase tracking-wider">
          {result.level} Tier Readiness
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-md border border-border-subtle bg-bg-surface p-6 shadow-flat">
          <h3 className="flex items-center gap-2 font-bold text-accent text-sm mb-4 font-display">
            <CheckCircle2 className="h-4 w-4" /> Operational Strengths
          </h3>
          <ul className="space-y-2 text-xs text-fg-dim">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-md border border-border-subtle bg-bg-surface p-6 shadow-flat">
          <h3 className="flex items-center gap-2 font-bold text-signal-warm text-sm mb-4 font-display">
            <AlertCircle className="h-4 w-4" /> Areas to Accelerate
          </h3>
          <ul className="space-y-2 text-xs text-fg-dim">
            {result.improvements.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-signal-warm font-bold">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-md border border-border-subtle bg-bg-surface p-6 shadow-flat space-y-3">
        <h3 className="font-bold text-sm text-fg-default font-display">🎯 Tailored AI Recommendations</h3>
        <ul className="space-y-2 text-xs text-fg-dim">
          {result.recommendations.map((r, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="font-mono text-accent font-bold">{i + 1}.</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link to="/contact">
          <button className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white hover:opacity-90 inline-flex items-center gap-2 shadow-flat">
            Schedule Architecture Session <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default AssessmentResults;
