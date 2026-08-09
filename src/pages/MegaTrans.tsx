import { motion } from "framer-motion";
import {
  ArrowUpRight, CalendarDays, Clock, MapPin, Sparkles, Truck, Store, BrainCircuit
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const CALENDLY_URL = "https://calendly.com/d-bstsolutions/book-your-free-consultation";

const openCalendly = () => (window as any).Calendly?.initPopupWidget({ url: CALENDLY_URL });

const MegaTrans = () => {
  useDocumentMeta({
    title: "Meet us at MegaTrans 2026 — Melbourne",
    description:
      "Come meet GrowthMates.ai at MegaTrans 2026, Australia's largest logistics & supply chain expo. Visit our Startup POD at the Melbourne Convention & Exhibition Centre, 16-17 September 2026.",
    url: "/megatrans",
    type: "website",
  });

  return (
    <div className="min-h-screen bg-bg-base text-fg-default font-body">
      <Navbar />

      {/* Event Hero */}
      <section className="relative py-20 md:py-28 border-b border-border-subtle bg-bg-surface overflow-hidden">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-dim px-4 py-1.5 text-xs font-semibold text-accent mb-4">
              <Sparkles className="h-3.5 w-3.5" /> MegaTrans 2026 · Startup POD
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl font-display leading-tight">
              Come meet us at <span className="text-accent">MegaTrans 2026</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base text-fg-dim leading-relaxed">
              We're exhibiting at Australia's largest integrated logistics and supply chain expo. Drop by our Startup POD to see how Agentic AI becomes the decision engine for transport and retail operations.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openCalendly}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white hover:opacity-90 shadow-flat"
              >
                Book a Meeting <ArrowUpRight className="h-4 w-4" />
              </button>

              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-bg-muted border border-border-subtle px-6 py-3.5 text-sm font-semibold text-fg-default hover:bg-bg-surface"
              >
                Explore Platform <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Boarding Pass Style Ticket Stub Strip */}
      <section className="py-16 bg-bg-muted border-b border-border-subtle">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-lg bg-bg-surface border border-border-subtle p-8 shadow-raised">
            <div className="text-xs font-mono font-bold text-accent uppercase tracking-wider mb-6 flex justify-between items-center border-b border-border-subtle pb-3">
              <span>MEGATRANS 2026 EVENT PASS</span>
              <span>STARTUP POD #04</span>
            </div>

            {/* Ticket Stub Sections with Dashed Perforation Line */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center relative">
              {/* Dashed Perforation Overlay (Desktop) */}
              <div className="hidden md:block absolute top-0 bottom-0 left-1/4 w-px border-r-2 border-dashed border-border-subtle" />
              <div className="hidden md:block absolute top-0 bottom-0 left-2/4 w-px border-r-2 border-dashed border-border-subtle" />
              <div className="hidden md:block absolute top-0 bottom-0 left-3/4 w-px border-r-2 border-dashed border-border-subtle" />

              {/* Stub 1 */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-fg-dim text-xs font-mono uppercase">
                  <CalendarDays className="h-4 w-4 text-accent" /> DATES
                </div>
                <p className="text-sm font-bold text-fg-default font-display">16–17 Sept 2026</p>
                <p className="text-[11px] text-fg-dimmer">2-Day Expo</p>
              </div>

              {/* Stub 2 */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-fg-dim text-xs font-mono uppercase">
                  <Clock className="h-4 w-4 text-accent" /> HOURS
                </div>
                <p className="text-sm font-bold text-fg-default font-display">10am – 5pm</p>
                <p className="text-[11px] text-fg-dimmer">Daily Expo Hours</p>
              </div>

              {/* Stub 3 */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-fg-dim text-xs font-mono uppercase">
                  <MapPin className="h-4 w-4 text-accent" /> VENUE
                </div>
                <p className="text-sm font-bold text-fg-default font-display">MCEC Melbourne</p>
                <p className="text-[11px] text-fg-dimmer">South Wharf VIC</p>
              </div>

              {/* Stub 4 */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-fg-dim text-xs font-mono uppercase">
                  <Sparkles className="h-4 w-4 text-accent" /> LOCATION
                </div>
                <p className="text-sm font-bold text-fg-default font-display">Startup POD</p>
                <p className="text-[11px] text-fg-dimmer">GrowthMates Booth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Visit Us: Simple 3-Item Horizontal Row (Not Cards) */}
      <section className="py-20 md:py-28 bg-bg-base border-b border-border-subtle">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl font-extrabold text-fg-default font-display sm:text-4xl">
              Why Stop By Our POD
            </h2>
            <p className="mt-3 text-base text-fg-dim">
              A few minutes with our engineering team could reshape how your supply chain operates.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="space-y-3 text-left">
              <BrainCircuit className="h-8 w-8 text-accent" />
              <h3 className="text-lg font-bold text-fg-default font-display">AI that decides, not just automates</h3>
              <p className="text-xs text-fg-dim leading-relaxed">
                See how our agents act as a decision engine for operations — reasoning over live data instead of running rigid workflows.
              </p>
            </div>

            <div className="space-y-3 text-left border-t md:border-t-0 md:border-l border-border-subtle pt-6 md:pt-0 md:pl-8">
              <Truck className="h-8 w-8 text-accent" />
              <h3 className="text-lg font-bold text-fg-default font-display">Built for transport &amp; logistics</h3>
              <p className="text-xs text-fg-dim leading-relaxed">
                Route optimisation, freight tracking, fleet health, and fuel &amp; carbon analytics tailored to future supply chains.
              </p>
            </div>

            <div className="space-y-3 text-left border-t md:border-t-0 md:border-l border-border-subtle pt-6 md:pt-0 md:pl-8">
              <Store className="h-8 w-8 text-accent" />
              <h3 className="text-lg font-bold text-fg-default font-display">Smarter retail supply chains</h3>
              <p className="text-xs text-fg-dim leading-relaxed">
                Demand forecasting, inventory intelligence, and last-mile delivery agents that cut waste and lift margins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent-deep text-white text-center">
        <div className="container">
          <h2 className="text-3xl font-extrabold font-display sm:text-4xl">
            Let's Talk at MegaTrans
          </h2>
          <p className="mt-3 text-sm text-white/70 max-w-xl mx-auto">
            Reserve a slot to meet us at the Startup POD, or reach out anytime.
          </p>
          <button
            onClick={openCalendly}
            className="mt-8 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white hover:opacity-90 inline-flex items-center gap-2 shadow-flat"
          >
            Book a Meeting <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MegaTrans;
