import { useState } from "react";
import { Link } from "react-router-dom";
import { Truck, ShoppingBag, Factory, Building2, Landmark, ChevronDown, CheckCircle2, Terminal, ArrowRight, Sparkles } from "lucide-react";

interface CaseFile {
  id: string;
  industry: string;
  icon: typeof Truck;
  title: string;
  topResult: string;
  challenge: string;
  solution: string;
  technicalReadout: string;
  resultsChecklist: string[];
}

const caseFiles: CaseFile[] = [
  {
    id: "case-logistics",
    industry: "Transportation & Freight",
    icon: Truck,
    title: "National Freight Hauler Automates 45,000 Bill-of-Lading Ingestion",
    topResult: "99.4% OCR Accuracy • $1.8M Fuel Savings",
    challenge: "Drivers submitted handwritten paper bills of lading via mobile photos, taking 12 human dispatchers 45 minutes per load to manually transcribe line items into TruckMate ERP.",
    solution: "Architected a custom Python FastAPI vision parsing agent that ingests mobile photos, extracts structured line items, validates against contract rates, and posts directly into TruckMate SQL DB.",
    technicalReadout: "STACK: Python 3.11 • OpenAI Vision API • Kafka • PostgreSQL • TruckMate SOAP/SQL Connector • Docker",
    resultsChecklist: [
      "Reduced bill processing turnaround from 45 min to 18 seconds",
      "Saved $1.8M in annual fuel loss by auto-optimizing driver return routes",
      "Allowed dispatch team to scale fleet volume by 300% without adding headcount",
    ],
  },
  {
    id: "case-retail",
    industry: "Retail & E-Commerce",
    icon: ShoppingBag,
    title: "Omnichannel Fashion Retailer Sub-Second Stock Sync Across 12 Marketplaces",
    topResult: "Zero Stock Overselling • Sub-80ms API Latency",
    challenge: "Legacy Magento monolith suffered from 15-minute polling sync delays between web store, physical POS registers, and Amazon storefronts during flash sales.",
    solution: "Decoupled inventory management into an event-driven Go microservice using Redis in-memory atomic locks and Kafka stream pub/sub for instant balance distribution.",
    technicalReadout: "STACK: Go (Golang) • Redis Cluster • Apache Kafka • GraphQL • AWS Lambda • Shopify API",
    resultsChecklist: [
      "Processed 14,000 peak orders per minute during Black Friday without downtime",
      "Eliminated inventory oversell customer refunds entirely",
      "Reduced cloud hosting compute costs by 42% through serverless architecture",
    ],
  },
  {
    id: "case-manufacturing",
    industry: "Industrial Manufacturing",
    icon: Factory,
    title: "Tier-1 Auto Supplier Deploys Computer Vision Defect & MES Telemetry Hub",
    topResult: "38% Downtime Reduction • 99.8% Defect Precision",
    challenge: "Manual visual inspection missed microscopic surface flaws in metal stampings, causing expensive factory recalls and un-scheduled assembly line shutdowns.",
    solution: "Installed edge industrial cameras linked to an on-prem PyTorch neural network that evaluates metal stampings on the conveyor belt at 60 FPS, triggering automatic line rejects.",
    technicalReadout: "STACK: PyTorch • OpenCV • MQTT • InfluxDB • Grafana • Siemens PLC Modbus Integration",
    resultsChecklist: [
      "Detected 99.8% of micro-fractures before parts reached final assembly",
      "Cut machine breakdown downtime by 38% via thermal vibration monitoring",
      "Saved $3.2M in potential auto manufacturer recall penalties",
    ],
  },
  {
    id: "case-construction",
    industry: "Construction & Infra",
    icon: Building2,
    title: "Mega-Infrastructure Developer Digitizes BIM Tender Risk Auditing",
    topResult: "4-Hour Audit vs 3 Weeks • 100% Sub-Contractor Compliance",
    challenge: "Sub-contractor tender proposals for an $800M highway project contained thousands of pages of structural specs, making contract risk auditing a 3-week bottleneck.",
    solution: "Deployed an offline-first PWA inspection platform backed by a vector search AI retriever that audits tender clauses against municipal engineering standards instantly.",
    technicalReadout: "STACK: React PWA • TypeScript • Supabase Vector • LlamaIndex • Azure Blob Storage",
    resultsChecklist: [
      "Audited 800-page tender documentation sets in under 4 hours",
      "Flagged 14 structural compliance mismatches prior to contract signature",
      "Digitized 100% of site safety inspection checklists on mobile tablets",
    ],
  },
  {
    id: "case-fintech",
    industry: "Financial Services",
    icon: Landmark,
    title: "Regional Bank Modernizes Ledger Reconciliation & Fraud Screening",
    topResult: "500K Daily Transactions • Sub-12ms Fraud Flags",
    challenge: "Batch end-of-day ledger processing delayed fraud detection by up to 24 hours, exposing the bank to fraudulent wire transfers.",
    solution: "Replaced batch night processing with a high-throughput Java Spring Boot stream processing engine that evaluates transactions against anomaly ML models under 12 milliseconds.",
    technicalReadout: "STACK: Java 21 • Spring Boot • Apache Kafka • ClickHouse • PostgreSQL • SOC2 Audit Log",
    resultsChecklist: [
      "Flagged 99.1% of fraudulent transfer attempts before settlement",
      "Reconciled 500,000 daily transaction records in under 3 minutes",
      "Achieved full SOC2 Type II compliance audit certification",
    ],
  },
];

const tabs = ["All", "Transportation & Freight", "Retail & E-Commerce", "Industrial Manufacturing", "Construction & Infra", "Financial Services"];

export const CaseFileExplorer = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [expandedId, setExpandedId] = useState<string>("case-logistics");

  const filteredCases = activeTab === "All"
    ? caseFiles
    : caseFiles.filter((item) => item.industry === activeTab);

  return (
    <section className="py-16 lg:py-24 bg-bg-base border-b border-border-subtle selection:bg-accent-tint selection:text-accent-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Industry Pill Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-accent text-white shadow-floating scale-105"
                    : "bg-white border border-border-subtle text-fg-dim hover:text-fg-default hover:border-accent/40 hover:bg-bg-surface shadow-flat"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Pro Agency Case Files List */}
        <div className="space-y-6 text-left">
          {filteredCases.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-6 shadow-floating text-left bg-white ${
                  isExpanded
                    ? "border-accent ring-1 ring-accent/20"
                    : "border-border-subtle hover:border-accent/60"
                }`}
              >
                {/* Header Row */}
                <div
                  className="flex items-center justify-between cursor-pointer select-none"
                  onClick={() => setExpandedId(isExpanded ? "" : item.id)}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`p-3 rounded-2xl transition-colors ${isExpanded ? "bg-accent text-white shadow-flat" : "bg-accent-tint text-accent"}`}>
                      <Icon className="w-6 h-6 shrink-0" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                        <span className="px-3 py-0.5 rounded-full bg-accent-tint text-accent-deep font-bold text-[11px]">
                          {item.industry}
                        </span>
                        <span className="text-[10px] text-fg-dimmer font-bold">&bull; VERIFIED CASE FILE</span>
                      </div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-fg-default tracking-tight leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <span className="hidden md:inline-block font-mono text-xs text-accent font-bold bg-[#FFF5F0] px-4 py-1.5 rounded-full border border-accent/30 shadow-flat">
                      {item.topResult}
                    </span>
                    <button
                      className={`p-2.5 rounded-full transition-all ${
                        isExpanded ? "bg-accent text-white" : "bg-bg-surface text-fg-dim border border-border-subtle"
                      }`}
                      aria-label="Expand case details"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Expanded Content Details */}
                {isExpanded && (
                  <div className="pt-4 border-t border-border-subtle animate-in fade-in duration-200 space-y-6">
                    
                    {/* Challenge vs Solution Split */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div className="p-6 bg-[#F5F4F0] border border-border-subtle rounded-2xl space-y-2 font-mono text-xs shadow-flat">
                        <div className="font-bold text-fg-default uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-fg-dim" /> 1. OPERATIONAL CHALLENGE
                        </div>
                        <p className="text-xs text-fg-dim font-body leading-relaxed pt-1">
                          {item.challenge}
                        </p>
                      </div>

                      <div className="p-6 bg-[#F5F4F0] border border-border-subtle rounded-2xl space-y-2 font-mono text-xs shadow-flat">
                        <div className="font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-accent" /> 2. D-BST ARCHITECTURE &amp; DELIVERY
                        </div>
                        <p className="text-xs text-fg-default font-body leading-relaxed pt-1">
                          {item.solution}
                        </p>
                      </div>
                    </div>

                    {/* Technical Readout Line */}
                    <div className="p-4 bg-[#18191B] border border-white/10 text-white rounded-2xl font-mono text-xs flex items-center gap-3 shadow-flat">
                      <Terminal className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-zinc-300 font-semibold">{item.technicalReadout}</span>
                    </div>

                    {/* Results Checklist */}
                    <div className="space-y-3 font-mono text-xs">
                      <div className="font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-accent" /> VERIFIED PROJECT DELIVERABLES &amp; ROI:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {item.resultsChecklist.map((res, idx) => (
                          <div key={idx} className="p-4 bg-white border border-border-subtle rounded-2xl text-xs text-fg-default font-body flex items-start gap-2.5 shadow-flat">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                            <span>{res}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Footer */}
                    <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                      <span className="text-fg-dim">
                        Have a similar system challenge in your organization?
                      </span>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-bold text-xs uppercase tracking-wider hover:bg-accent-deep transition-all shadow-flat hover:shadow-floating"
                      >
                        <span>Schedule Architectural Review</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
