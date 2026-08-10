import { motion } from "framer-motion";
import {
  ArrowUpRight, CalendarDays, Clock, MapPin, Sparkles, Truck, Store, BrainCircuit, ShieldCheck, Cpu, BarChart3
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

      {/* Main Hero Container with Highly Visible Multi-Modal Logistics Background */}
      <section className="py-12 md:py-20 bg-bg-base">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Large Hero Banner Box with Vibrant Logistics Background */}
          <div
            className="relative overflow-hidden rounded-3xl text-white p-8 md:p-14 shadow-2xl min-h-[640px] flex flex-col justify-between border-2 border-[#2E5EFF]/40"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(16, 23, 53, 0.78) 0%, rgba(16, 23, 53, 0.55) 50%, rgba(16, 23, 53, 0.35) 100%), url('/images/megatrans-bg.png')`,
              backgroundPosition: "center 30%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Top Text Content inside Banner with Drop Shadows for Ultra Legibility */}
            <div className="relative z-10 max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#16214F]/80 backdrop-blur-md border border-white/30 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-lg">
                <Sparkles className="h-3.5 w-3.5 text-[#FF6A3D]" /> WE DELIVER · MEGATRANS 2026 STARTUP POD
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-[1.08] text-white [text-shadow:_0_4px_12px_rgba(0,0,0,0.8)]">
                Why Transportation Leaders Choose GrowthMates AI
              </h1>
              
              <p className="text-base md:text-lg text-white font-medium max-w-2xl font-body leading-relaxed [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">
                Come meet us at Australia’s largest integrated logistics and supply chain expo. Visit our Startup POD at MCEC Melbourne to see live agentic decision execution.
              </p>
            </div>

            {/* Bottom 4 Glassmorphism Frosted Cards Grid */}
            <div className="relative z-10 mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              
              {/* Card 1 */}
              <div className="rounded-2xl bg-[#16214F]/80 backdrop-blur-md border border-white/25 p-6 hover:bg-[#16214F]/90 hover:border-white/50 transition-all duration-300 shadow-2xl">
                <div className="flex items-center gap-3 mb-3 text-[#7C97FF]">
                  <Truck className="h-5 w-5" />
                  <span className="text-xs font-mono uppercase font-bold text-white/90">FLEET DISPATCH</span>
                </div>
                <h3 className="text-lg font-bold font-display text-white mb-2">
                  Autonomous Fleet Dispatch
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Multi-stop route optimisation, real-time traffic rerouting, and lane margin enforcement.
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl bg-[#16214F]/80 backdrop-blur-md border border-white/25 p-6 hover:bg-[#16214F]/90 hover:border-white/50 transition-all duration-300 shadow-2xl">
                <div className="flex items-center gap-3 mb-3 text-[#FF6A3D]">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="text-xs font-mono uppercase font-bold text-white/90">GOVERNANCE</span>
                </div>
                <h3 className="text-lg font-bold font-display text-white mb-2">
                  Security-First Design
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  SOC2 compliant runtime, zero-trust memory isolation, and SAML 2.0 SSO enterprise authentication.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl bg-[#16214F]/80 backdrop-blur-md border border-white/25 p-6 hover:bg-[#16214F]/90 hover:border-white/50 transition-all duration-300 shadow-2xl">
                <div className="flex items-center gap-3 mb-3 text-[#7C97FF]">
                  <Cpu className="h-5 w-5" />
                  <span className="text-xs font-mono uppercase font-bold text-white/90">PARTNERSHIP</span>
                </div>
                <h3 className="text-lg font-bold font-display text-white mb-2">
                  Hands-On Partnership
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Embedded collaboration with engineering teams to deploy pre-built transport agents in days.
                </p>
              </div>

              {/* Card 4 */}
              <div className="rounded-2xl bg-[#16214F]/80 backdrop-blur-md border border-white/25 p-6 hover:bg-[#16214F]/90 hover:border-white/50 transition-all duration-300 shadow-2xl">
                <div className="flex items-center gap-3 mb-3 text-[#1FAA59]">
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-xs font-mono uppercase font-bold text-white/90">PROVEN ROI</span>
                </div>
                <h3 className="text-lg font-bold font-display text-white mb-2">
                  Proven Methodologies
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Frameworks for high-volume, mission-critical transport operations with 85% cost reduction.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Boarding Pass Style Ticket Stub Strip */}
      <section className="py-16 bg-bg-muted border-b border-border-subtle">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl rounded-2xl bg-bg-surface border border-border-subtle p-8 shadow-raised">
            <div className="text-xs font-mono font-bold text-accent uppercase tracking-wider mb-6 flex justify-between items-center border-b border-border-subtle pb-3">
              <span>MEGATRANS 2026 EVENT PASS</span>
              <span className="text-signal-warm font-bold">STARTUP POD #04</span>
            </div>

            {/* Ticket Stub Sections with Dashed Perforation Line */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center relative">
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

      {/* Why Visit Us Section */}
      <section className="py-20 md:py-28 bg-bg-base border-b border-border-subtle">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
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

      {/* Booking CTA */}
      <section className="py-20 bg-[#16214F] text-white text-center">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold font-display sm:text-4xl text-white">
            Let's Talk at MegaTrans
          </h2>
          <p className="mt-3 text-sm text-white/70 max-w-xl mx-auto">
            Reserve a slot to meet us at the Startup POD, or reach out anytime.
          </p>
          <button
            onClick={openCalendly}
            className="mt-8 rounded-full bg-[#2E5EFF] px-8 py-4 text-sm font-bold text-white hover:opacity-90 inline-flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
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
