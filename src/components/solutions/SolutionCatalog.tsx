import { useState, useEffect, useRef } from "react";
import { Clock, DollarSign, ArrowRight, CheckCircle2, Sparkles, X, Send, Loader2, Cpu, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface SolutionCatalogItem {
  id: string;
  title: string;
  industry: string;
  summary: string;
  timeline: string;
  priceRange: string;
  techStack: string[];
  benefits: string[];
  fullDescription: string;
  architectureHighlight: string;
}

const catalogData: SolutionCatalogItem[] = [
  {
    id: "freight-dispatch-ai",
    title: "Autonomous Freight Dispatch & Bill of Lading Engine",
    industry: "Transportation & Freight",
    summary: "Automated OCR document parsing and route dispatch engine for high-density logistics fleets.",
    timeline: "4–6 WEEKS",
    priceRange: "$25,000 – $60,000",
    techStack: ["Python", "FastAPI", "OpenAI Vision", "PostgreSQL", "Kafka", "React"],
    benefits: [
      "99.4% OCR accuracy on handwritten driver bills of lading",
      "Reduces dispatch triage latency from 45 min to under 30 sec",
      "Direct bi-directional integration with TruckMate & McLeod ERP",
    ],
    fullDescription: "An end-to-end automated dispatch suite that ingests multi-format load orders, automatically validates rate confirmations against contracts, parses bill of lading paperwork, and dispatches drivers via mobile SMS/app push notifications.",
    architectureHighlight: "Sub-80ms gRPC queue buffer with automated rate confirmation validation.",
  },
  {
    id: "omnichannel-inventory-sync",
    title: "Omnichannel Sub-Second Inventory Sync Engine",
    industry: "Retail & E-Commerce",
    summary: "Real-time microservices data pipeline keeping 50,000+ SKU inventory balances synchronized across multi-region storefronts.",
    timeline: "3–5 WEEKS",
    priceRange: "$20,000 – $45,000",
    techStack: ["Go", "Redis", "Kafka", "GraphQL", "AWS Lambda", "Shopify API"],
    benefits: [
      "Eliminates stock overselling across Amazon, Shopify, and SAP core",
      "Sub-80ms API response time under Black Friday peak traffic",
      "Automated stock reorder alerts triggered via predictive sales velocity",
    ],
    fullDescription: "Event-driven inventory synchronization framework built for high-throughput multi-channel retailers. Ingests purchase events from POS systems and web storefronts simultaneously, maintaining atomic ledger counts.",
    architectureHighlight: "Atomic Redis in-memory ledger lock preventing multi-channel overbooking.",
  },
  {
    id: "predictive-mes-telemetry",
    title: "IoT Predictive Maintenance & Floor MES Hub",
    industry: "Industrial Manufacturing",
    summary: "Edge IoT telemetry aggregator and machine learning failure forecasting engine for CNC and robotic lines.",
    timeline: "6–10 WEEKS",
    priceRange: "$40,000 – $95,000",
    techStack: ["Python", "MQTT", "InfluxDB", "PyTorch", "Docker", "Grafana"],
    benefits: [
      "Reduces unplanned factory floor downtime by 38%",
      "Real-time vibration & thermal anomaly detection under 50ms",
      "Integrated maintenance work order creation in SAP S/4HANA",
    ],
    fullDescription: "Connects directly to factory floor PLCs and sensors, streaming high-frequency telemetry into an on-prem or cloud time-series database where machine learning algorithms predict component wear prior to breakdown.",
    architectureHighlight: "10kHz OPC-UA sensor stream feeding PyTorch early-warning ML model.",
  },
  {
    id: "subcontractor-tender-analyzer",
    title: "BIM Compliance & Sub-Contractor Tender Parser",
    industry: "Construction & Infra",
    summary: "AI-driven tender document risk auditor and BIM compliance verification assistant for mega-construction firms.",
    timeline: "4–6 WEEKS",
    priceRange: "$30,000 – $70,000",
    techStack: ["TypeScript", "LlamaIndex", "Supabase Vector", "React", "Azure Blob"],
    benefits: [
      "Audits 500-page tender documents for liability clauses in minutes",
      "Highlights structural spec mismatches against local building codes",
      "Centralized sub-contractor insurance & safety record validation",
    ],
    fullDescription: "Built specifically for general contractors managing dozens of simultaneous site tenders. Parses structural blueprints, safety compliance logs, and tender proposals, surfacing high-risk anomalies automatically.",
    architectureHighlight: "Hybrid BM25 + pgvector RAG pipeline parsing 500+ page BIM specs.",
  },
  {
    id: "kyc-ledger-reconciliation",
    title: "Automated KYC & High-Frequency Ledger Reconciler",
    industry: "Financial Services",
    summary: "Zero-trust banking reconciliation engine processing multi-currency transactions with automated fraud detection.",
    timeline: "6–8 WEEKS",
    priceRange: "$45,000 – $110,000",
    techStack: ["Java", "Spring Boot", "Kafka", "ClickHouse", "PostgreSQL", "React"],
    benefits: [
      "Reconciles 500,000 daily transaction records in under 3 minutes",
      "Flags anomalous AML/KYC patterns with 99.1% precision",
      "SOC2 Type II compliant immutable audit logging",
    ],
    fullDescription: "High-performance financial reconciliation middleware that matches banking ledgers against gateway payment feeds, automatically isolating un-reconciled line items and generating regulatory compliance reports.",
    architectureHighlight: "Double-entry ACID transaction match engine handling 50k TPS.",
  },
  {
    id: "grid-yield-optimizer",
    title: "Solar & Microgrid Yield Optimization Platform",
    industry: "Sustainable Energy",
    summary: "Weather-integrated telemetry pipeline predicting renewable energy generation and automated battery grid dispatch.",
    timeline: "5–8 WEEKS",
    priceRange: "$35,000 – $80,000",
    techStack: ["Python", "Pandas", "LightGBM", "AWS Timestream", "React", "D3.js"],
    benefits: [
      "Increases battery storage revenue yield by 18% during peak grid pricing",
      "Integrates live NOAA weather radar for microgrid solar forecasting",
      "Automated carbon offset credit tracking and reporting",
    ],
    fullDescription: "Decentralized microgrid software suite that combines historical generation telemetry, satellite solar irradiance data, and spot energy pricing to optimize battery charge/discharge cycles in real time.",
    architectureHighlight: "Live satellite irradiance feed integrated with battery charge dispatch.",
  },
];

const categories = ["All", "Transportation & Freight", "Retail & E-Commerce", "Industrial Manufacturing", "Construction & Infra", "Financial Services", "Sustainable Energy"];

export const SolutionCatalog = () => {
  const { toast } = useToast();
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [proposalModalItem, setProposalModalItem] = useState<SolutionCatalogItem | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalForm, setModalForm] = useState({ name: "", email: "", notes: "" });

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Alternating Left & Right Airborne GSAP Entrance Animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        const isLeft = idx % 2 === 0;

        gsap.fromTo(
          card,
          {
            x: isLeft ? -90 : 90,
            y: 40,
            rotate: isLeft ? -3 : 3,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selectedIndustry]);

  const filteredSolutions = selectedIndustry === "All"
    ? catalogData
    : catalogData.filter((item) => item.industry === selectedIndustry);

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalForm.name || !modalForm.email) {
      toast({
        title: "Missing Fields",
        description: "Please enter your name and email address.",
        variant: "destructive",
      });
      return;
    }

    setModalLoading(true);
    setTimeout(() => {
      setModalLoading(false);
      toast({
        title: "Blueprint Proposal Requested",
        description: `Thank you. A D-BST Senior Architect will dispatch proposal specs for "${proposalModalItem?.title}" within 24 hours.`,
      });
      setProposalModalItem(null);
      setModalForm({ name: "", email: "", notes: "" });
    }, 1000);
  };

  return (
    <section ref={containerRef} className="py-16 lg:py-24 bg-bg-base border-b border-border-subtle selection:bg-accent-tint selection:text-accent-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Industry Pill Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => {
            const isActive = selectedIndustry === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedIndustry(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-accent text-white shadow-floating scale-105"
                    : "bg-white border border-border-subtle text-fg-dim hover:text-fg-default hover:border-accent/40 hover:bg-bg-surface shadow-flat"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Full Open Cards Grid with Left/Right Airborne Scroll Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          {filteredSolutions.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="p-8 sm:p-10 rounded-3xl border border-border-subtle hover:border-accent bg-white shadow-floating flex flex-col justify-between space-y-7 text-left transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden"
            >
              <div className="space-y-6">
                
                {/* Top Header: Industry Tag + Timeline & Price */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle/80 pb-4 font-mono text-xs">
                  <span className="px-3.5 py-1 rounded-full bg-accent-tint text-accent-deep font-bold text-xs shadow-flat">
                    {item.industry}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-fg-dim">
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#F5F4F0] border border-border-subtle">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      <span>{item.timeline}</span>
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#F5F4F0] border border-border-subtle text-fg-default">
                      <DollarSign className="w-3.5 h-3.5 text-accent" />
                      <span>{item.priceRange}</span>
                    </span>
                  </div>
                </div>

                {/* Title & Summary */}
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-fg-default tracking-tight leading-snug group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-fg-dim font-body leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Architecture Highlight Spec */}
                <div className="p-4 bg-accent-tint/60 border border-accent/30 rounded-2xl font-mono text-xs space-y-1">
                  <div className="font-bold text-accent flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-accent" /> D-BST ARCHITECTURE HIGHLIGHT
                  </div>
                  <p className="text-fg-default font-body text-xs leading-relaxed pt-0.5">
                    {item.architectureHighlight}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-fg-dimmer">
                    CORE TECHNOLOGY STACK
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-white border border-border-subtle text-xs font-mono text-fg-default font-bold shadow-flat"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Full Details Box (Always Open & Detailed) */}
                <div className="p-6 sm:p-7 bg-[#F5F4F0] border border-border-subtle rounded-2xl space-y-4 font-mono text-xs shadow-flat">
                  <p className="text-xs text-fg-default font-body leading-relaxed">
                    {item.fullDescription}
                  </p>

                  <div className="space-y-2.5 pt-2 border-t border-border-subtle">
                    <div className="text-xs font-mono font-bold uppercase text-accent flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-accent" /> PROVEN BUSINESS ROI &amp; IMPACT:
                    </div>
                    <div className="space-y-2">
                      {item.benefits.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-xs text-fg-dim font-body leading-snug">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Button Footer */}
              <div className="pt-6 border-t border-border-subtle/80 flex items-center justify-between">
                <span className="text-[10px] font-mono text-fg-dim font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" /> Production Ready SLA
                </span>

                <button
                  onClick={() => setProposalModalItem(item)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-white font-bold text-xs uppercase tracking-wider hover:bg-accent-deep transition-all shadow-flat hover:shadow-floating"
                >
                  <span>Request Proposal Blueprint</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* PROPOSAL BLUEPRINT MODAL */}
      {proposalModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-bg-base border border-accent/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-floating relative text-left font-mono space-y-6">
            
            <button
              onClick={() => setProposalModalItem(null)}
              className="absolute top-5 right-5 p-1 rounded-full bg-bg-surface hover:bg-accent-tint text-fg-dim hover:text-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-accent">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>REQUEST PROPOSAL BLUEPRINT</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-fg-default font-sans">
                {proposalModalItem.title}
              </h3>
              <p className="text-xs text-fg-dim font-body">
                {proposalModalItem.summary}
              </p>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-fg-default">Full Name *</label>
                <input
                  type="text"
                  placeholder="Alex Morgan"
                  value={modalForm.name}
                  onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-white border border-border-subtle text-fg-default text-sm font-body focus:outline-none focus:border-accent shadow-flat"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-fg-default">Work Email *</label>
                <input
                  type="email"
                  placeholder="alex@enterprise.com"
                  value={modalForm.email}
                  onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-white border border-border-subtle text-fg-default text-sm font-body focus:outline-none focus:border-accent shadow-flat"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-fg-default">Custom Notes / Timeline</label>
                <textarea
                  rows={3}
                  placeholder="Briefly state your target launch window or current tech stack..."
                  value={modalForm.notes}
                  onChange={(e) => setModalForm({ ...modalForm, notes: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-white border border-border-subtle text-fg-default text-sm font-body focus:outline-none focus:border-accent resize-none shadow-flat"
                />
              </div>

              <button
                type="submit"
                disabled={modalLoading}
                className="w-full py-4 rounded-xl bg-accent text-white font-bold text-xs uppercase tracking-wider hover:bg-accent-deep transition-all shadow-raised flex items-center justify-center gap-2"
              >
                {modalLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SUBMIT BLUEPRINT PROPOSAL REQUEST</span>
                  </>
                )}
              </button>
            </form>

            <div className="text-[10px] font-mono text-fg-dim text-center flex items-center justify-center gap-1.5 pt-1">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Automated 24-Hour Architect SLA Response Guarantee</span>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
