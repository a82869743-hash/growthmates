import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2, CalendarDays, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const openCalendly = () =>
  (window as any).Calendly?.initPopupWidget({
    url: "https://calendly.com/d-bstsolutions/book-your-free-consultation",
  });

const LiveCTA = () => {
  return (
    <section className="bg-[#16214F] py-20 md:py-28 text-white relative overflow-hidden border-t border-[#2E5EFF]/30">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#2E5EFF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-96 h-96 bg-[#FF6A3D]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#2E5EFF]/20 border border-[#7C97FF]/30 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#7C97FF] shadow-md">
            <Sparkles className="h-3.5 w-3.5 text-[#FF6A3D]" /> READY TO AUTOMATE YOUR ENTERPRISE WORKFLOWS?
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-[1.08] text-white">
            Start Deploying Agentic Decision Engines Today
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto font-body leading-relaxed">
            Connect your ERP, TMS, and financial ledgers via zero-trust MCP 1.0 in under 5 minutes. No complex code changes required.
          </p>

          {/* 4 Feature Benefit Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-white/90">
            <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
              <ShieldCheck className="h-3.5 w-3.5 text-[#7C97FF]" /> Zero-Trust MCP 1.0
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#1FAA59]" /> SOC2 Type II Certified
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#FF6A3D]" /> Pre-Built Transport Agents
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#7C97FF]" /> Dedicated Engineering Support
            </span>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={openCalendly}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#2E5EFF] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[#1B3BB3] hover:scale-105 shadow-xl"
            >
              <CalendarDays className="h-4 w-4" /> Schedule 15-Min Live Demo Session
            </button>

            <Link
              to="/roi-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 border border-white/20 px-7 py-4 text-sm font-bold text-white hover:bg-white/20 transition-all shadow-md"
            >
              <Calculator className="h-4 w-4 text-[#FF6A3D]" /> Calculate Operational ROI <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LiveCTA;
