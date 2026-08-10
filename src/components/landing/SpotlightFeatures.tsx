import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Truck, ShoppingBag, Sprout, ShieldCheck, ArrowRight, ChevronDown, Filter, Zap, Plane, Factory, Landmark } from "lucide-react";

interface IndustryFeature {
  id: string;
  eyebrow: string;
  title: string;
  linkText: string;
  description: string;
  bullets: string[];
  visualType: "transportation" | "retail" | "agriculture" | "enterprise";
  stats: { label: string; value: string }[];
}

const INDUSTRY_FEATURES: IndustryFeature[] = [
  {
    id: "transportation",
    eyebrow: "WHY GROWTHMATES AI",
    title: "Our Role in Transportation",
    linkText: "Explore Transportation & Logistics AI Solutions",
    description:
      "Technology is the backbone of modern transportation. From fleet dispatching to route optimization and automated freight rate quoting, GrowthMates AI delivers intelligent agent solutions that keep fleets and cargo moving safely, securely, and efficiently.",
    bullets: [
      "Autonomous 12-stop route optimization & traffic re-routing",
      "Live freight rate calculation & margin enforcement",
      "Driver HOS compliance auditing & electronic logging sync",
    ],
    visualType: "transportation",
    stats: [
      { label: "Dispatch Efficiency", value: "+94%" },
      { label: "Fleet Fuel Savings", value: "$1.4M/yr" },
      { label: "Route Accuracy", value: "99.8%" },
    ],
  },
  {
    id: "retail",
    eyebrow: "WHY GROWTHMATES AI",
    title: "Our Role in Retail & E-Commerce",
    linkText: "Explore Retail & E-Commerce AI Solutions",
    description:
      "Intelligence is the catalyst for modern retail growth. GrowthMates AI powers automated RMA refund processing, predictive inventory reordering, and multi-channel order orchestration that maximize customer lifetime value.",
    bullets: [
      "Automated RMA fraud verification & instant customer refunding",
      "Predictive inventory stockout alerts & supplier PO generation",
      "Multi-channel OMS & ERP synchronization across storefronts",
    ],
    visualType: "retail",
    stats: [
      { label: "RMA Processing Time", value: "< 2 mins" },
      { label: "Stockout Prevention", value: "98.2%" },
      { label: "LTV Growth", value: "+34%" },
    ],
  },
  {
    id: "agriculture",
    eyebrow: "WHY GROWTHMATES AI",
    title: "Our Role in Agriculture & AgTech",
    linkText: "Explore Agriculture & AgTech AI Solutions",
    description:
      "Data is the engine of sustainable agriculture. GrowthMates AI deploys autonomous crop telemetry agents, weather risk forecasters, and supply chain tracking solutions that maximize crop yield and streamline farm-to-market distribution.",
    bullets: [
      "Real-time soil sensor & microclimate weather forecasting",
      "Automated harvest dispatching & cold-chain temperature tracking",
      "Farm input inventory monitoring & bulk order automation",
    ],
    visualType: "agriculture",
    stats: [
      { label: "Harvest Yield Boost", value: "+28%" },
      { label: "Water Waste Cut", value: "40%" },
      { label: "Telemetry Uptime", value: "99.9%" },
    ],
  },
  {
    id: "enterprise",
    eyebrow: "WHY GROWTHMATES AI",
    title: "Our Role in Enterprise Technology",
    linkText: "Explore Enterprise Security & Infrastructure Solutions",
    description:
      "Security is the foundation of digital transformation. GrowthMates AI connects directly to your existing SAP, Oracle, Xero, and Salesforce infrastructure using Model Context Protocol (MCP) with enterprise SOC2 compliance.",
    bullets: [
      "Model Context Protocol (MCP 1.0) zero-friction gateway",
      "SOC2 ready architecture with SAML 2.0 & SSO authentication",
      "Granular role permissions & immutable audit log security",
    ],
    visualType: "enterprise",
    stats: [
      { label: "Integration Setup", value: "< 48 hrs" },
      { label: "Audit Compliance", value: "100%" },
      { label: "ROI Payback", value: "3.2 mos" },
    ],
  },
];

/* Ultra-High-Precision 3D Isometric Visual Component */
const IsometricVisual = ({ type }: { type: IndustryFeature["visualType"] }) => {
  if (type === "transportation") {
    return (
      <div className="relative w-full max-w-lg mx-auto h-[420px] flex items-center justify-center">
        <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 540 420" fill="none">
          <defs>
            <linearGradient id="roadTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2E5EFF" />
              <stop offset="100%" stopColor="#1B3BB3" />
            </linearGradient>
            <linearGradient id="roadSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#16214F" />
              <stop offset="100%" stopColor="#0D1433" />
            </linearGradient>
            <linearGradient id="gearBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E7E5DE" />
            </linearGradient>
          </defs>

          {/* Gear Base Wheel Teeth */}
          <g transform="translate(0, 15)">
            <path
              d="M 120 295 L 140 285 L 155 292 L 175 282 L 190 289 L 210 279 L 225 286 L 245 276 L 260 283 L 280 273 L 295 280 L 315 270 L 330 277 L 350 267 L 370 277 L 370 310 L 120 310 Z"
              fill="url(#gearBaseGrad)"
              stroke="#2E5EFF"
              strokeWidth="1.5"
            />
          </g>

          {/* 3D Extruded Isometric Road Base Platform */}
          <path d="M 50 250 L 270 140 L 490 250 L 270 360 Z" fill="url(#roadTopGrad)" stroke="#2E5EFF" strokeWidth="2" />
          <path d="M 50 250 L 270 360 L 270 380 L 50 270 Z" fill="url(#roadSideGrad)" />
          <path d="M 270 360 L 490 250 L 490 270 L 270 380 Z" fill="#0A0F26" />

          <path d="M 130 250 L 410 250" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="16 14" opacity="0.9" />

          {/* 3D Transit Bus Model */}
          <g transform="translate(100, 135)">
            <path d="M 50 40 L 160 95 L 200 75 L 90 20 Z" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="1.5" />
            <rect x="90" y="32" width="30" height="10" rx="3" fill="#2E5EFF" />
            <rect x="130" y="52" width="30" height="10" rx="3" fill="#2E5EFF" />
            <path d="M 50 40 L 160 95 L 160 145 L 50 90 Z" fill="#2E5EFF" />
            <path d="M 160 95 L 200 75 L 200 125 L 160 145 Z" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="1.5" />
            
            <path d="M 60 52 L 150 97 L 150 78 L 60 33 Z" fill="#16214F" />
            <path d="M 65 57 L 90 69 L 90 60 L 65 48 Z" fill="#7C97FF" opacity="0.8" />
            <path d="M 98 73 L 123 85 L 123 76 L 98 64 Z" fill="#7C97FF" opacity="0.8" />
            <path d="M 128 88 L 145 96 L 145 87 L 128 79 Z" fill="#7C97FF" opacity="0.8" />

            <path d="M 165 92 L 195 77 L 195 97 L 165 112 Z" fill="#16214F" />
            <path d="M 170 95 L 190 85 L 190 95 L 170 105 Z" fill="#7C97FF" opacity="0.9" />

            <circle cx="170" cy="130" r="4" fill="#FF6A3D" />
            <circle cx="190" cy="120" r="4" fill="#FF6A3D" />

            <ellipse cx="85" cy="100" rx="14" ry="14" fill="#14171F" stroke="#FFFFFF" strokeWidth="2" />
            <ellipse cx="140" cy="128" rx="14" ry="14" fill="#14171F" stroke="#FFFFFF" strokeWidth="2" />
          </g>

          <g transform="translate(350, 75)">
            <rect x="20" y="40" width="8" height="140" rx="4" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="1.5" />
            <path d="M -5 30 L 45 5 L 60 20 L 10 45 Z" fill="#2E5EFF" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="24" y="70" width="24" height="12" rx="3" fill="#FF6A3D" />
          </g>

          <g transform="translate(280, 140)">
            <path d="M 0 30 L 75 0 L 115 20 L 40 50 Z" fill="#EEF1FF" stroke="#2E5EFF" strokeWidth="1.5" />
            <line x1="12" y1="35" x2="12" y2="95" stroke="#2E5EFF" strokeWidth="2.5" />
            <line x1="108" y1="22" x2="108" y2="82" stroke="#2E5EFF" strokeWidth="2.5" />
            <path d="M 25 60 L 95 30 L 95 38 L 25 68 Z" fill="#FF6A3D" />
          </g>
        </svg>
      </div>
    );
  }

  if (type === "retail") {
    return (
      <div className="relative w-full max-w-lg mx-auto h-[420px] flex items-center justify-center">
        <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 540 420" fill="none">
          <defs>
            <linearGradient id="retailTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6A3D" />
              <stop offset="100%" stopColor="#D94E24" />
            </linearGradient>
            <linearGradient id="retailSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#16214F" />
              <stop offset="100%" stopColor="#0D1433" />
            </linearGradient>
          </defs>

          <g transform="translate(0, 15)">
            <path
              d="M 120 295 L 140 285 L 155 292 L 175 282 L 190 289 L 210 279 L 225 286 L 245 276 L 260 283 L 280 273 L 295 280 L 315 270 L 330 277 L 350 267 L 370 277 L 370 310 L 120 310 Z"
              fill="#F2F1EC"
              stroke="#FF6A3D"
              strokeWidth="1.5"
            />
          </g>

          <path d="M 50 250 L 270 140 L 490 250 L 270 360 Z" fill="url(#retailTopGrad)" stroke="#FF6A3D" strokeWidth="2" />
          <path d="M 50 250 L 270 360 L 270 380 L 50 270 Z" fill="url(#retailSideGrad)" />
          <path d="M 270 360 L 490 250 L 490 270 L 270 380 Z" fill="#0A0F26" />

          <g transform="translate(135, 90)">
            <path d="M 130 0 L 0 65 L 0 190 L 130 125 Z" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="2" />
            <path d="M 130 0 L 260 65 L 260 190 L 130 125 Z" fill="#EEF1FF" stroke="#2E5EFF" strokeWidth="2" />
            <path d="M 130 0 L 260 65 L 130 130 L 0 65 Z" fill="#2E5EFF" />
            
            <path d="M 25 85 L 115 130 L 115 150 L 25 105 Z" fill="#FF6A3D" />
            <path d="M 145 145 L 235 190 L 235 200 L 145 155 Z" fill="#2E5EFF" />

            <rect x="25" y="125" width="80" height="50" rx="3" fill="#16214F" />
            <rect x="35" y="132" width="60" height="36" rx="2" fill="#7C97FF" opacity="0.8" />
            
            <rect x="155" y="155" width="80" height="50" rx="3" fill="#16214F" />
            <rect x="165" y="162" width="60" height="36" rx="2" fill="#7C97FF" opacity="0.8" />

            <g transform="translate(105, -45)">
              <circle cx="25" cy="25" r="28" fill="#FFFFFF" stroke="#FF6A3D" strokeWidth="3" className="drop-shadow-lg" />
              <ShoppingBag className="h-7 w-7 text-[#FF6A3D] translate-x-3 translate-y-3" />
            </g>
          </g>
        </svg>
      </div>
    );
  }

  if (type === "agriculture") {
    return (
      <div className="relative w-full max-w-lg mx-auto h-[420px] flex items-center justify-center">
        <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 540 420" fill="none">
          <defs>
            <linearGradient id="farmTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1FAA59" />
              <stop offset="100%" stopColor="#0B5C2B" />
            </linearGradient>
            <linearGradient id="farmSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#16214F" />
              <stop offset="100%" stopColor="#0D1433" />
            </linearGradient>
          </defs>

          <g transform="translate(0, 15)">
            <path
              d="M 120 295 L 140 285 L 155 292 L 175 282 L 190 289 L 210 279 L 225 286 L 245 276 L 260 283 L 280 273 L 295 280 L 315 270 L 330 277 L 350 267 L 370 277 L 370 310 L 120 310 Z"
              fill="#F2F1EC"
              stroke="#1FAA59"
              strokeWidth="1.5"
            />
          </g>

          <path d="M 50 250 L 270 140 L 490 250 L 270 360 Z" fill="url(#farmTopGrad)" stroke="#1FAA59" strokeWidth="2" />
          <path d="M 50 250 L 270 360 L 270 380 L 50 270 Z" fill="url(#farmSideGrad)" />
          <path d="M 270 360 L 490 250 L 490 270 L 270 380 Z" fill="#0A0F26" />

          <path d="M 120 230 L 270 305" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="12 10" opacity="0.9" />
          <path d="M 165 205 L 315 280" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="12 10" opacity="0.9" />
          <path d="M 210 180 L 360 255" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="12 10" opacity="0.9" />

          <g transform="translate(225, 80)">
            <rect x="25" y="45" width="70" height="140" rx="35" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="2.5" />
            <path d="M 25 80 L 95 80 L 60 20 Z" fill="#2E5EFF" />
            <line x1="80" y1="85" x2="80" y2="175" stroke="#16214F" strokeWidth="2" />

            <g transform="translate(35, -35)">
              <circle cx="25" cy="25" r="28" fill="#FFFFFF" stroke="#1FAA59" strokeWidth="3" className="drop-shadow-lg" />
              <Sprout className="h-7 w-7 text-[#1FAA59] translate-x-3 translate-y-3" />
            </g>
          </g>
        </svg>
      </div>
    );
  }

  // Enterprise Security
  return (
    <div className="relative w-full max-w-lg mx-auto h-[420px] flex items-center justify-center">
      <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 540 420" fill="none">
        <defs>
          <linearGradient id="secTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E5EFF" />
            <stop offset="100%" stopColor="#16214F" />
          </linearGradient>
          <linearGradient id="secSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#16214F" />
            <stop offset="100%" stopColor="#0D1433" />
          </linearGradient>
        </defs>

        <g transform="translate(0, 15)">
          <path
            d="M 120 295 L 140 285 L 155 292 L 175 282 L 190 289 L 210 279 L 225 286 L 245 276 L 260 283 L 280 273 L 295 280 L 315 270 L 330 277 L 350 267 L 370 277 L 370 310 L 120 310 Z"
            fill="#F2F1EC"
            stroke="#2E5EFF"
            strokeWidth="1.5"
          />
        </g>

        <path d="M 50 250 L 270 140 L 490 250 L 270 360 Z" fill="url(#secTopGrad)" stroke="#2E5EFF" strokeWidth="2" />
        <path d="M 50 250 L 270 360 L 270 380 L 50 270 Z" fill="url(#secSideGrad)" />
        <path d="M 270 360 L 490 250 L 490 270 L 270 380 Z" fill="#0A0F26" />

        <g transform="translate(175, 75)">
          <path d="M 95 0 L 0 45 L 0 190 L 95 145 Z" fill="#14171F" stroke="#2E5EFF" strokeWidth="2" />
          <path d="M 95 0 L 190 45 L 190 190 L 95 145 Z" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="2" />
          <path d="M 95 0 L 190 45 L 95 90 L 0 45 Z" fill="#2E5EFF" />

          <circle cx="35" cy="75" r="5" fill="#1FAA59" />
          <circle cx="55" cy="75" r="5" fill="#2E5EFF" />
          <circle cx="35" cy="115" r="5" fill="#FF6A3D" />
          <circle cx="55" cy="115" r="5" fill="#1FAA59" />
          <circle cx="35" cy="155" r="5" fill="#2E5EFF" />
          <circle cx="55" cy="155" r="5" fill="#1FAA59" />

          <g transform="translate(70, -40)">
            <circle cx="25" cy="25" r="28" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="3" className="drop-shadow-lg" />
            <ShieldCheck className="h-7 w-7 text-[#2E5EFF] translate-x-3 translate-y-3" />
          </g>
        </g>
      </svg>
    </div>
  );
};

const SpotlightFeatures = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayedFeatures =
    activeTab === "all"
      ? INDUSTRY_FEATURES
      : INDUSTRY_FEATURES.filter((f) => f.id === activeTab);

  return (
    <section className="border-b border-[#E7E5DE] bg-[#FAF9F6]" id="spotlight-features">
      
      {/* Interactive Industry Dropdown Dashboard Control Bar */}
      <div className="py-8 bg-white border-b border-[#E7E5DE] sticky top-16 md:top-20 z-30 backdrop-blur-md bg-white/95">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#5B616E]">
              FILTER SOLUTION DASHBOARD:
            </span>

            {/* Interactive Dropdown Button (SDI Reference Style) */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] px-4 py-2 text-xs font-bold text-[#2E5EFF] border border-[#2E5EFF]/20 hover:bg-[#2E5EFF] hover:text-white transition-all shadow-sm"
              >
                <Filter className="h-3.5 w-3.5" />
                <span>
                  {activeTab === "all"
                    ? "All Industry Solutions"
                    : INDUSTRY_FEATURES.find((f) => f.id === activeTab)?.title}
                </span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${filterOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Floating Dropdown Filter Card */}
              {filterOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-white border border-[#E7E5DE] p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="text-[10px] font-mono font-bold text-[#8B8F99] uppercase px-2 py-1 mb-1">
                    SELECT INDUSTRY
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab("all");
                      setFilterOpen(false);
                    }}
                    className={`w-full text-left rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                      activeTab === "all" ? "bg-[#2E5EFF] text-white" : "text-[#14171F] hover:bg-[#FAF9F6]"
                    }`}
                  >
                    ✨ All Industry Solutions
                  </button>
                  {INDUSTRY_FEATURES.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setActiveTab(f.id);
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                        activeTab === f.id ? "bg-[#2E5EFF] text-white" : "text-[#14171F] hover:bg-[#FAF9F6]"
                      }`}
                    >
                      {f.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Pill Tabs */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                activeTab === "all" ? "bg-[#14171F] text-white" : "bg-[#FAF9F6] text-[#5B616E] hover:text-[#14171F]"
              }`}
            >
              All
            </button>
            {INDUSTRY_FEATURES.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveTab(f.id)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                  activeTab === f.id ? "bg-[#2E5EFF] text-white" : "bg-[#FAF9F6] text-[#5B616E] hover:text-[#14171F]"
                }`}
              >
                {f.id.toUpperCase()}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Feature Rows */}
      {displayedFeatures.map((feature, idx) => {
        const isEven = idx % 2 === 0;
        const bgClass = isEven ? "bg-[#FAF9F6]" : "bg-[#FFFFFF]";

        return (
          <div
            key={feature.id}
            id={`industry-${feature.id}`}
            className={`${bgClass} py-20 md:py-28 border-b border-[#E7E5DE] last:border-b-0 text-[#14171F]`}
          >
            <div className="container max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid items-center gap-12 lg:grid-cols-12">
                
                {/* Text Content Column */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"} space-y-5`}
                >
                  <span className="text-xs font-mono font-bold tracking-widest text-[#5B616E] uppercase block">
                    {feature.eyebrow}
                  </span>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E5EFF] font-display tracking-tight leading-tight">
                    {feature.title}
                  </h2>

                  <p className="text-base sm:text-lg text-[#5B616E] leading-relaxed font-body">
                    {feature.description}
                  </p>

                  {/* Live Performance Stats Strip */}
                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-[#E7E5DE]">
                    {feature.stats.map((stat) => (
                      <div key={stat.label} className="space-y-0.5">
                        <div className="text-xs text-[#5B616E] font-mono">{stat.label}</div>
                        <div className="text-lg font-extrabold text-[#14171F] font-display">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  <ul className="pt-2 space-y-3">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-3 text-sm font-semibold text-[#14171F]">
                        <CheckCircle2 className="h-5 w-5 text-[#2E5EFF] shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#2E5EFF] hover:underline"
                    >
                      {feature.linkText} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>

                {/* Ultra-Rich 3D Isometric Visual Column */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                >
                  <IsometricVisual type={feature.visualType} />
                </motion.div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default SpotlightFeatures;
