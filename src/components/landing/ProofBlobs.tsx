import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ShieldCheck, ArrowRight, X, Building2, CheckCircle2, TrendingUp, Award } from "lucide-react";

interface ClientOutcome {
  id: string;
  client: string;
  industry: string;
  logoColor: string;
  outcomeTitle: string;
  quote: string;
  author: string;
  role: string;
  verifiedTag: string;
  borderRadius: string;
  challenge: string;
  solution: string;
  impactMetrics: string[];
}

const CLIENT_OUTCOMES: ClientOutcome[] = [
  {
    id: "roadmaster",
    client: "Roadmaster Transport",
    industry: "Logistics & Heavy Haulage",
    logoColor: "#2E5EFF",
    outcomeTitle: "Fleet Idle Time Optimized",
    quote: "GrowthMates gave us instant visibility over 500+ heavy vehicles and eliminated manual dispatch friction across inter-state routes.",
    author: "Marcus Vance",
    role: "VP of Logistics Operations",
    verifiedTag: "SOC2 Audited",
    borderRadius: "32px 32px 12px 32px",
    challenge: "High driver idle times, manual dispatch phone calls, and inefficient lane planning across 500+ interstate freight trucks.",
    solution: "Deployed GrowthMates Autonomous Fleet Dispatch & Multi-Stop Route Optimization Agents via SAP ERP gateway.",
    impactMetrics: ["Optimized idle fuel consumption", "Reduced driver turn-around friction", "Zero dispatch errors over 90 days"],
  },
  {
    id: "digitxl",
    client: "DigitXl Omnichannel",
    industry: "Enterprise Retail",
    logoColor: "#FF6A3D",
    outcomeTitle: "Automated Order Routing",
    quote: "Our operational bottleneck vanished overnight. Order processing speed increased significantly across peak Black Friday fulfillment.",
    author: "Elena Rostova",
    role: "Chief Technology Officer",
    verifiedTag: "Enterprise Verified",
    borderRadius: "32px 12px 32px 32px",
    challenge: "Peak holiday season order spikes caused warehouse bottlenecks and fulfillment delays.",
    solution: "Integrated GrowthMates Inventory & Order Routing Agents with Shopify Plus and Xero accounting ledger.",
    impactMetrics: ["Automated order routing", "Accelerated peak season throughput", "Reduced manual warehouse entry"],
  },
  {
    id: "lumiland",
    client: "Lumiland Commerce",
    industry: "Global E-Commerce",
    logoColor: "#1FAA59",
    outcomeTitle: "Streamlined RMA Support",
    quote: "The customer RMA and fraud prevention agents handle support tickets seamlessly with zero human delay and full policy compliance.",
    author: "James Chen",
    role: "Head of E-Commerce",
    verifiedTag: "Live SLA Active",
    borderRadius: "12px 32px 32px 32px",
    challenge: "Overwhelmed support team handling high volumes of return requests with slow customer refund turnaround.",
    solution: "Deployed GrowthMates RMA & Refund Resolution Agent integrated directly with Zendesk and Stripe payment engine.",
    impactMetrics: ["Streamlined customer resolution time", "Automated return verification accuracy", "Increased customer CSAT score"],
  },
  {
    id: "linfox",
    client: "Linfox Logistics Network",
    industry: "Multi-Modal Freight",
    logoColor: "#7C97FF",
    outcomeTitle: "On-Time Freight Dispatch",
    quote: "An indispensable platform for multi-modal freight networks. Real-time rate quoting and automated lane booking has boosted our margins.",
    author: "Sarah Jenkins",
    role: "Director of Supply Chain",
    verifiedTag: "SOC2 Audited",
    borderRadius: "32px 32px 32px 12px",
    challenge: "Manual rate quoting and carrier confirmation took up to 6 hours per freight lane, missing high-margin spot rates.",
    solution: "Implemented GrowthMates Freight Rate Engine & Carrier Dispatch Agent connecting Oracle TMS to TruckMate.",
    impactMetrics: ["On-time freight dispatch execution", "Fast spot rate quoting", "Expanded net freight margins"],
  },
];

const ProofBlobs = () => {
  const [selectedCase, setSelectedCase] = useState<ClientOutcome | null>(null);

  return (
    <section className="bg-[#FAF9F6] py-20 md:py-28 border-b border-[#E7E5DE] text-[#14171F] relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] border border-[#2E5EFF]/20 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#2E5EFF]">
            <Award className="h-3.5 w-3.5 text-[#FF6A3D]" /> VERIFIED CLIENT PROOF &amp; OUTCOMES
          </div>
          <h2 className="text-4xl font-extrabold text-[#14171F] sm:text-5xl font-display tracking-tight">
            Trusted by Industry Leaders
          </h2>
          <p className="text-base sm:text-lg text-[#5B616E] max-w-xl mx-auto font-body">
            Here's how enterprise transportation, retail, and supply chain teams achieve measurable impact with GrowthMates AI.
          </p>

          {/* Key Proof Metric Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono font-bold text-[#5B616E]">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#E7E5DE] shadow-xs">
              <TrendingUp className="h-3.5 w-3.5 text-[#1FAA59]" /> Multi-Modal Fleet &amp; Supply Chain Network
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#E7E5DE] shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-[#2E5EFF]" /> SOC2 Type II Certified
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#E7E5DE] shadow-xs">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#FF6A3D]" /> Enterprise Execution SLA
            </span>
          </div>
        </div>

        {/* Asymmetric Organic Blob Cards Row */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto items-stretch">
          {CLIENT_OUTCOMES.map((item, idx) => {
            const isOffset = idx % 2 === 1;

            return (
              <motion.div
                key={item.client}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ borderRadius: item.borderRadius }}
                className={`group relative bg-white border border-[#E7E5DE] p-7 shadow-raised flex flex-col justify-between transition-all duration-300 hover:border-[#2E5EFF] hover:shadow-2xl hover:-translate-y-1.5 ${
                  isOffset ? "lg:translate-y-4" : ""
                }`}
              >
                <div>
                  {/* Client Name & Verified Badge */}
                  <div className="flex items-center justify-between border-b border-[#E7E5DE] pb-4 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-xs" style={{ backgroundColor: item.logoColor }}>
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-sm font-extrabold text-[#14171F] font-display block leading-tight">
                          {item.client}
                        </span>
                        <span className="text-[10px] text-[#8B8F99] font-mono block">{item.industry}</span>
                      </div>
                    </div>
                    <Quote className="h-4 w-4 text-[#2E5EFF] opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#FF6A3D] text-[#FF6A3D]" />
                    ))}
                  </div>

                  {/* Outcome Title Banner */}
                  <div className="text-lg font-extrabold font-display tracking-tight mb-3" style={{ color: item.logoColor }}>
                    {item.outcomeTitle}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs text-[#5B616E] leading-relaxed italic font-body">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info & Interactive Case Study Button */}
                <div className="mt-6 pt-4 border-t border-[#E7E5DE] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#14171F] font-display">{item.author}</p>
                      <p className="text-[10px] font-mono text-[#8B8F99]">{item.role}</p>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-[#1FAA59] bg-[#1FAA59]/10 px-2 py-0.5 rounded-full">
                      {item.verifiedTag}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedCase(item)}
                    className="w-full rounded-full bg-[#FAF9F6] border border-[#E7E5DE] py-2 text-[11px] font-mono font-bold text-[#2E5EFF] group-hover:bg-[#2E5EFF] group-hover:text-white group-hover:border-[#2E5EFF] transition-all flex items-center justify-center gap-1 shadow-xs"
                  >
                    View Case Study <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Interactive Case Study Breakdown Modal */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl rounded-3xl bg-white border border-[#E7E5DE] p-6 sm:p-8 shadow-2xl space-y-6 text-[#14171F]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF9F6] text-[#5B616E] hover:text-[#14171F] border border-[#E7E5DE]"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 border-b border-[#E7E5DE] pb-4">
                <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-md" style={{ backgroundColor: selectedCase.logoColor }}>
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-xl font-display text-[#14171F]">{selectedCase.client}</h3>
                    <span className="text-[10px] font-mono font-bold text-[#1FAA59] bg-[#1FAA59]/10 px-2 py-0.5 rounded-full">
                      ● Verified Outcome
                    </span>
                  </div>
                  <p className="text-xs text-[#5B616E] font-mono">{selectedCase.industry} · {selectedCase.author} ({selectedCase.role})</p>
                </div>
              </div>

              {/* Case Study Grid */}
              <div className="space-y-4 text-xs font-body">
                
                {/* Challenge */}
                <div className="rounded-2xl bg-[#FAF9F6] p-4 border border-[#E7E5DE] space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#FF6A3D] uppercase tracking-wider block">
                    OPERATIONAL CHALLENGE
                  </span>
                  <p className="text-[#5B616E] leading-relaxed">{selectedCase.challenge}</p>
                </div>

                {/* Solution */}
                <div className="rounded-2xl bg-[#EEF1FF] p-4 border border-[#2E5EFF]/30 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#2E5EFF] uppercase tracking-wider block">
                    GROWTHMATES AGENTIC SOLUTION
                  </span>
                  <p className="text-[#14171F] font-medium leading-relaxed">{selectedCase.solution}</p>
                </div>

                {/* Impact Metrics */}
                <div className="rounded-2xl bg-[#16214F] text-white p-4 space-y-2 border border-[#2E5EFF]/30 shadow-inner">
                  <span className="text-[10px] font-mono font-bold text-[#7C97FF] uppercase tracking-wider block">
                    MEASURABLE BUSINESS IMPACT
                  </span>
                  <ul className="space-y-1.5 font-mono text-xs text-white/90">
                    {selectedCase.impactMetrics.map((m) => (
                      <li key={m} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#1FAA59] shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedCase(null)}
                  className="rounded-full bg-[#FAF9F6] border border-[#E7E5DE] px-5 py-2.5 text-xs font-bold text-[#5B616E] hover:text-[#14171F]"
                >
                  Close Case Study
                </button>
                <button
                  onClick={() => {
                    setSelectedCase(null);
                    (window as any).Calendly?.initPopupWidget({
                      url: "https://calendly.com/d-bstsolutions/book-your-free-consultation",
                    });
                  }}
                  className="rounded-full bg-[#2E5EFF] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#1B3BB3] transition-all shadow-md flex items-center gap-1.5"
                >
                  Book Consult Like This <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ProofBlobs;
