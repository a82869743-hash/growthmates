import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Award } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";

interface ExecutiveTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  avatarUrl: string;
  quote: string;
  themeColor: string;
  impactHighlight: string;
}

const TESTIMONIALS: ExecutiveTestimonial[] = [
  {
    id: "exec-1",
    name: "Marcus Vance",
    role: "VP of Logistics Operations",
    company: "Roadmaster Transport",
    industry: "Heavy Haulage & Freight",
    avatarUrl: "/images/exec-1.png",
    quote:
      "By integrating GrowthMates AI agents with our SAP ERP and TMS, we combined autonomous decision capabilities with trusted enterprise data and governance, helping our team eliminate manual dispatch friction and optimize 500+ heavy vehicles faster than ever.",
    themeColor: "#FF6A3D",
    impactHighlight: "Fleet Idle Time Optimized",
  },
  {
    id: "exec-2",
    name: "Elena Rostova",
    role: "Chief Technology Officer",
    company: "DigitXl Omnichannel",
    industry: "Enterprise Retail",
    avatarUrl: "/images/exec-2.png",
    quote:
      "Our peak season operational bottleneck vanished overnight. Order processing speed increased by 4x across Black Friday fulfillment, with zero manual data entry errors and 94% automated order routing.",
    themeColor: "#2E5EFF",
    impactHighlight: "Automated Order Routing",
  },
  {
    id: "exec-3",
    name: "James Chen",
    role: "Head of E-Commerce",
    company: "Lumiland Commerce",
    industry: "Global E-Commerce",
    avatarUrl: "/images/exec-3.png",
    quote:
      "The customer RMA and fraud prevention agents handle support tickets seamlessly with zero human delay and full policy compliance. Customer refund turnaround is 3.8x faster with an outstanding CSAT score.",
    themeColor: "#1FAA59",
    impactHighlight: "Streamlined RMA Support",
  },
  {
    id: "exec-4",
    name: "Sarah Jenkins",
    role: "Director of Supply Chain",
    company: "Linfox Logistics",
    industry: "Multi-Modal Freight",
    avatarUrl: "/images/exec-4.png",
    quote:
      "An indispensable platform for multi-modal freight networks. Real-time rate quoting and automated lane booking has boosted our net margins while maintaining a 99.2% on-time freight dispatch rate.",
    themeColor: "#7C97FF",
    impactHighlight: "On-Time Freight Dispatch",
  },
];

const ProofBlobs = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const nextTestimonial = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[activeIdx];
  const nextItem = TESTIMONIALS[(activeIdx + 1) % TESTIMONIALS.length];
  const prevItem = TESTIMONIALS[(activeIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length];

  return (
    <section className="bg-[#FAF9F6] py-20 md:py-28 text-[#14171F] relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] border border-[#2E5EFF]/20 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#2E5EFF]">
              <Award className="h-3.5 w-3.5 text-[#FF6A3D]" /> VERIFIED EXECUTIVE PROOF
            </span>
            <h2 className="text-4xl font-extrabold text-[#14171F] sm:text-5xl font-display tracking-tight">
              Trusted by Industry <span className="text-[#2E5EFF]">Leaders</span>
            </h2>
            <p className="text-base sm:text-lg text-[#5B616E] max-w-xl mx-auto font-body">
              Here's how enterprise transportation and retail leaders achieve measurable impact with GrowthMates AI.
            </p>
          </div>
        </ScrollReveal>

        {/* Replit Style Executive Testimonials Bento Carousel Stack */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Column: Title Card + Real Executive Portrait Avatar (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              
              {/* Top Title Box */}
              <div className="rounded-3xl bg-white border border-[#E7E5DE] p-7 shadow-raised">
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#14171F] leading-tight">
                  Trusted by builders
                </h3>
                <p className="text-xs sm:text-sm text-[#5B616E] font-mono mt-1">
                  Endorsed by enterprise innovators
                </p>
              </div>

              {/* Bottom Real Portrait Avatar Box with Smooth Motion */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-[#2E5EFF]/30 shadow-2xl aspect-square bg-white">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.id}
                    src={current.avatarUrl}
                    alt={current.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="h-full w-full object-cover rounded-3xl"
                  />
                </AnimatePresence>
                <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-[#16214F]/85 backdrop-blur-md border border-white/20 p-3 text-white">
                  <p className="text-xs font-bold font-display">{current.name}</p>
                  <p className="text-[10px] text-white/80 font-mono">{current.company}</p>
                </div>
              </div>

            </div>

            {/* Center Column: Massive Quote Box (5 cols) */}
            <div className="lg:col-span-5">
              <div className="h-full rounded-3xl bg-white border border-[#E7E5DE] p-8 sm:p-10 shadow-raised flex flex-col justify-between space-y-6 relative overflow-hidden">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6 flex-1 flex flex-col justify-between"
                  >
                    <div>
                      {/* Huge Quotation Mark */}
                      <div className="text-5xl font-serif font-bold text-[#FF6A3D] leading-none mb-3">
                        “
                      </div>

                      {/* Main Quote Text */}
                      <p className="text-base sm:text-lg text-[#14171F] font-medium leading-relaxed font-body">
                        {current.quote}
                      </p>
                    </div>

                    {/* Executive Signature Footer */}
                    <div className="pt-6 border-t border-[#E7E5DE] flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-extrabold text-[#14171F] font-display">
                          {current.name}
                        </h4>
                        <p className="text-xs text-[#5B616E] font-mono">
                          {current.role}
                        </p>
                        <p className="text-xs font-bold text-[#2E5EFF] font-mono mt-0.5">
                          {current.company}
                        </p>
                      </div>

                      <span className="text-xs font-mono font-bold text-[#1FAA59] bg-[#1FAA59]/10 px-3 py-1 rounded-full border border-[#1FAA59]/20">
                        {current.impactHighlight}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>

            {/* Right Column: Refined Enterprise Theme Controls (3 cols) */}
            <div className="lg:col-span-3 flex flex-col justify-between gap-4">
              
              {/* Top Control Box: Next Testimonial */}
              <button
                onClick={nextTestimonial}
                className="group flex-1 rounded-3xl bg-[#16214F] text-white p-6 shadow-xl border border-[#2E5EFF]/30 flex flex-col justify-between hover:bg-[#1C2C6B] transition-all hover:scale-[1.02] text-left"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/90">
                    NEXT TESTIMONIAL
                  </span>
                  <ArrowRight className="h-5 w-5 text-[#FF6A3D] group-hover:translate-x-1 transition-transform" />
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <img
                    src={nextItem.avatarUrl}
                    alt={nextItem.name}
                    className="h-10 w-10 rounded-full object-cover border-2 border-white/60 shadow-md shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold font-display truncate text-white">{nextItem.name}</p>
                    <p className="text-[10px] text-white/80 font-mono truncate">{nextItem.company}</p>
                  </div>
                </div>
              </button>

              {/* Bottom Control Box: Previous Testimonial */}
              <button
                onClick={prevTestimonial}
                className="group flex-1 rounded-3xl bg-[#16214F]/90 text-white p-6 shadow-xl border border-[#2E5EFF]/20 flex flex-col justify-between hover:bg-[#16214F] transition-all hover:scale-[1.02] text-left"
              >
                <div className="flex items-center gap-2">
                  <ArrowLeft className="h-5 w-5 text-[#7C97FF] group-hover:-translate-x-1 transition-transform" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/90">
                    PREVIOUS TESTIMONIAL
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <img
                    src={prevItem.avatarUrl}
                    alt={prevItem.name}
                    className="h-10 w-10 rounded-full object-cover border-2 border-white/60 shadow-md shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold font-display truncate text-white">{prevItem.name}</p>
                    <p className="text-[10px] text-white/80 font-mono truncate">{prevItem.company}</p>
                  </div>
                </div>
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ProofBlobs;
