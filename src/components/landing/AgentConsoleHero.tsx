import { useState, useEffect } from "react";
import { ArrowUpRight, ShieldCheck, Cpu, CheckCircle2, BarChart3, Navigation, Sparkles, Truck, ShoppingBag, Sprout, Building2, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Sector {
  id: string;
  name: string;
  badge: string;
  stat: string;
  statLabel: string;
  description: string;
  color: string;
  icon: any;
}

const SECTORS: Sector[] = [
  {
    id: "logistics",
    name: "Fleet & Logistics Mesh",
    badge: "Route AI",
    stat: "12-Stop",
    statLabel: "Route Optimization",
    description: "Autonomous multi-stop dispatch, traffic re-routing, and live freight rate calculation.",
    color: "#2E5EFF",
    icon: Truck,
  },
  {
    id: "retail",
    name: "Retail & E-Commerce OMS",
    badge: "Refund AI",
    stat: "< 2 mins",
    statLabel: "Automated RMA",
    description: "Instant customer refunding, predictive inventory reordering, and multi-storefront sync.",
    color: "#FF6A3D",
    icon: ShoppingBag,
  },
  {
    id: "agtech",
    name: "Agricultural Telemetry",
    badge: "Yield AI",
    stat: "+18%",
    statLabel: "Crop Yield Boost",
    description: "Real-time microclimate sensors, harvest dispatching, and cold-chain temperature logs.",
    color: "#1FAA59",
    icon: Sprout,
  },
  {
    id: "security",
    name: "Enterprise SOC2 Gateway",
    badge: "Security AI",
    stat: "Zero-Trust",
    statLabel: "SAML 2.0 & MCP",
    description: "Model Context Protocol zero-friction gateway with granular role permissions & audit trails.",
    color: "#7C97FF",
    icon: ShieldCheck,
  },
];

const AGENT_STREAM = [
  { action: "Optimizing 12 multi-stop transport routes", badge: "Route AI", time: "1.2s" },
  { action: "Quoted freight lane MEL → SYD: $2,340", badge: "Rate Engine", time: "Live" },
  { action: "Inventory reorder triggered: 450 units", badge: "Inventory AI", time: "Synced" },
  { action: "Driver HOS compliance audit verified", badge: "Compliance AI", time: "Passed" },
  { action: "Verified SOC2 SAML 2.0 handshake token", badge: "Security AI", time: "Secure" },
];

const AgentConsoleHero = () => {
  const [activeSector, setActiveSector] = useState<Sector>(SECTORS[0]);
  const [streamIdx, setStreamIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect for live prompt stream
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentFullText = AGENT_STREAM[streamIdx].action;

    if (isTyping) {
      if (displayText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, 30);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      timeout = setTimeout(() => {
        setDisplayText("");
        setIsTyping(true);
        setStreamIdx((prev) => (prev + 1) % AGENT_STREAM.length);
      }, 300);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, streamIdx]);

  const activeStream = AGENT_STREAM[streamIdx];

  return (
    <section className="relative bg-[#FAF9F6] py-16 md:py-24 lg:py-28 overflow-hidden border-b border-[#E7E5DE] text-[#14171F]">
      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          
          {/* Left Column (GrowthMates Vision Copy & Interactive Sector Controls) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] px-4 py-1.5 text-xs font-bold text-[#2E5EFF]">
              <span className="h-2 w-2 rounded-full bg-[#2E5EFF] animate-pulse" />
              THE GROWTHMATES AI VISION
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#14171F] font-display leading-[1.08]">
              Empowering Modern Enterprise with <span className="text-[#2E5EFF]">Autonomous Agent Mesh</span>
            </h1>

            <p className="text-base sm:text-lg text-[#5B616E] leading-relaxed max-w-2xl font-body">
              GrowthMates AI deploys specialized decision agents across logistics, retail, agriculture, and enterprise cloud infrastructure. From real-time route optimization to automated refund processing and zero-trust security.
            </p>

            {/* Interactive Sector Pills (User can click to inspect each sector) */}
            <div className="pt-1 flex flex-wrap gap-2">
              {SECTORS.map((sector) => {
                const Icon = sector.icon;
                const isSelected = activeSector.id === sector.id;

                return (
                  <button
                    key={sector.id}
                    onClick={() => setActiveSector(sector)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-[#2E5EFF] text-white shadow-md scale-105"
                        : "bg-white text-[#5B616E] border border-[#E7E5DE] hover:border-[#2E5EFF]/50"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{sector.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Sector Inspector Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSector.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl bg-white border border-[#E7E5DE] p-5 shadow-raised flex items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E5EFF]">
                      {activeSector.name}
                    </span>
                  </div>
                  <p className="text-xs text-[#5B616E] font-body leading-relaxed">
                    {activeSector.description}
                  </p>
                </div>
                <div className="text-right shrink-0 border-l border-[#E7E5DE] pl-5">
                  <p className="text-2xl font-extrabold font-display" style={{ color: activeSector.color }}>
                    {activeSector.stat}
                  </p>
                  <p className="text-[11px] font-mono text-[#5B616E] font-semibold">
                    {activeSector.statLabel}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* SDI Style Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() =>
                  (window as any).Calendly?.initPopupWidget({
                    url: "https://calendly.com/d-bstsolutions/book-your-free-consultation",
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2E5EFF] px-8 py-4 text-sm font-bold text-white transition-transform hover:scale-105 shadow-[0_10px_25px_-5px_rgba(46,94,255,0.4)]"
              >
                Talk to an Expert <ArrowUpRight className="h-4 w-4" />
              </button>

              <a
                href="/roi-calculator"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#2E5EFF]/30 bg-white px-7 py-3.5 text-sm font-bold text-[#2E5EFF] hover:bg-[#EEF1FF] transition-colors shadow-sm"
              >
                Calculate ROI <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Stat Counters */}
            <div className="pt-6 flex items-center gap-8 border-t border-[#E7E5DE]">
              <div>
                <p className="text-3xl font-extrabold text-[#14171F] font-display">85%</p>
                <p className="text-xs text-[#5B616E] font-semibold">Cost Reduction</p>
              </div>
              <div className="h-8 w-px bg-[#E7E5DE]" />
              <div>
                <p className="text-3xl font-extrabold text-[#2E5EFF] font-display">92%</p>
                <p className="text-xs text-[#5B616E] font-semibold">Efficiency Gains</p>
              </div>
              <div className="h-8 w-px bg-[#E7E5DE]" />
              <div>
                <p className="text-3xl font-extrabold text-[#FF6A3D] font-display">98%</p>
                <p className="text-xs text-[#5B616E] font-semibold">Workflow Accuracy</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column (Custom GrowthMates 3D Connected Ecosystem Graphic) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:col-span-6 flex flex-col items-center justify-center"
          >
            {/* 3D Smart Ecosystem Canvas Container */}
            <div className="relative w-full max-w-[620px] h-[520px] flex items-center justify-center">
              
              {/* Outer Glowing Orbit Ring */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-70">
                <svg className="w-full h-full max-w-[580px] max-h-[480px]" viewBox="0 0 580 480" fill="none">
                  <ellipse cx="290" cy="370" rx="270" ry="90" stroke="#2E5EFF" strokeWidth="2.5" strokeDasharray="10 8" className="animate-spin-slow" />
                  <ellipse cx="290" cy="370" rx="210" ry="65" stroke="#FF6A3D" strokeWidth="1.5" opacity="0.6" />
                </svg>
              </div>

              {/* 3D Isometric Connected Sector Towers SVG */}
              <svg className="w-full h-full drop-shadow-2xl z-10" viewBox="0 0 600 500" fill="none">
                <defs>
                  <linearGradient id="corePlatformGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#EEF1FF" />
                  </linearGradient>
                  <linearGradient id="centerCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2E5EFF" />
                    <stop offset="100%" stopColor="#16214F" />
                  </linearGradient>
                </defs>

                {/* Main Ground Platform */}
                <ellipse cx="300" cy="390" rx="250" ry="75" fill="url(#corePlatformGrad)" stroke="#2E5EFF" strokeWidth="2" />
                <ellipse cx="300" cy="390" rx="200" ry="55" fill="#E7E5DE" opacity="0.5" />

                {/* Glowing Laser Conduits connecting Towers to Center Core */}
                <path d="M 180 260 L 300 230" stroke="#2E5EFF" strokeWidth="3" strokeDasharray="6 6" />
                <path d="M 420 250 L 300 230" stroke="#FF6A3D" strokeWidth="3" strokeDasharray="6 6" />
                <path d="M 230 340 L 300 230" stroke="#1FAA59" strokeWidth="3" strokeDasharray="6 6" />
                <path d="M 370 340 L 300 230" stroke="#7C97FF" strokeWidth="3" strokeDasharray="6 6" />

                {/* 3D Central GrowthMates AI Decision Core Tower */}
                <g transform="translate(260, 110)">
                  <path d="M 40 0 L 0 25 L 0 210 L 40 185 Z" fill="#2E5EFF" />
                  <path d="M 40 0 L 80 25 L 80 210 L 40 185 Z" fill="#16214F" />
                  <path d="M 40 0 L 80 25 L 40 50 L 0 25 Z" fill="#7C97FF" />
                  
                  {/* Glowing Core Sphere */}
                  <circle cx="40" cy="80" r="16" fill="#FF6A3D" className="animate-pulse" />
                  <circle cx="40" cy="80" r="24" fill="#FF6A3D" opacity="0.3" />
                </g>

                {/* 3D Logistics Sector Tower (Left) */}
                <g transform="translate(140, 200)">
                  <path d="M 40 0 L 0 22 L 0 140 L 40 118 Z" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="1.5" />
                  <path d="M 40 0 L 80 22 L 80 140 L 40 118 Z" fill="#EEF1FF" stroke="#2E5EFF" strokeWidth="1.5" />
                  <path d="M 40 0 L 80 22 L 40 44 L 0 22 Z" fill="#2E5EFF" />
                </g>

                {/* 3D Retail Sector Tower (Right) */}
                <g transform="translate(380, 190)">
                  <path d="M 40 0 L 0 22 L 0 150 L 40 128 Z" fill="#FF6A3D" />
                  <path d="M 40 0 L 80 22 L 80 150 L 40 128 Z" fill="#FFFFFF" stroke="#FF6A3D" strokeWidth="1.5" />
                  <path d="M 40 0 L 80 22 L 40 44 L 0 22 Z" fill="#16214F" />
                </g>

                {/* 3D AgTech Tower (Front Left) */}
                <g transform="translate(190, 290)">
                  <path d="M 35 0 L 0 18 L 0 85 L 35 67 Z" fill="#FFFFFF" stroke="#1FAA59" strokeWidth="1.5" />
                  <path d="M 35 0 L 70 18 L 70 85 L 35 67 Z" fill="#1FAA59" />
                  <path d="M 35 0 L 70 18 L 35 36 L 0 18 Z" fill="#0B5C2B" />
                </g>

                {/* 3D Enterprise Security Tower (Front Right) */}
                <g transform="translate(330, 290)">
                  <path d="M 35 0 L 0 18 L 0 85 L 35 67 Z" fill="#2E5EFF" />
                  <path d="M 35 0 L 70 18 L 70 85 L 35 67 Z" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="1.5" />
                  <path d="M 35 0 L 70 18 L 35 36 L 0 18 Z" fill="#16214F" />
                </g>
              </svg>

              {/* Floating Interactive Badge Nodes linked to sectors */}
              
              {/* Badge 1: Logistics Node */}
              <motion.button
                onClick={() => setActiveSector(SECTORS[0])}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-16 left-8 z-20 flex items-center gap-2 rounded-full px-3.5 py-2 shadow-raised border transition-all ${
                  activeSector.id === "logistics"
                    ? "bg-[#2E5EFF] text-white border-white scale-110"
                    : "bg-white text-[#14171F] border-[#2E5EFF]/30 hover:scale-105"
                }`}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5EFF] text-white">
                  <Truck className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold">Fleet Dispatch</span>
              </motion.button>

              {/* Badge 2: Retail Node */}
              <motion.button
                onClick={() => setActiveSector(SECTORS[1])}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-14 right-8 z-20 flex items-center gap-2 rounded-full px-3.5 py-2 shadow-raised border transition-all ${
                  activeSector.id === "retail"
                    ? "bg-[#FF6A3D] text-white border-white scale-110"
                    : "bg-white text-[#14171F] border-[#FF6A3D]/30 hover:scale-105"
                }`}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF6A3D] text-white">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold">Retail OMS</span>
              </motion.button>

              {/* Badge 3: AgTech Node */}
              <motion.button
                onClick={() => setActiveSector(SECTORS[2])}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-44 left-4 z-20 flex items-center gap-2 rounded-full px-3.5 py-2 shadow-raised border transition-all ${
                  activeSector.id === "agtech"
                    ? "bg-[#1FAA59] text-white border-white scale-110"
                    : "bg-white text-[#14171F] border-[#1FAA59]/30 hover:scale-105"
                }`}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1FAA59] text-white">
                  <Sprout className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold">Crop Telemetry</span>
              </motion.button>

              {/* Badge 4: Security Node */}
              <motion.button
                onClick={() => setActiveSector(SECTORS[3])}
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-48 right-4 z-20 flex items-center gap-2 rounded-full px-3.5 py-2 shadow-raised border transition-all ${
                  activeSector.id === "security"
                    ? "bg-[#7C97FF] text-white border-white scale-110"
                    : "bg-white text-[#14171F] border-[#7C97FF]/30 hover:scale-105"
                }`}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7C97FF] text-white">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold">SOC2 Security</span>
              </motion.button>

              {/* Embedded Live Agent Prompt Stream Card (Bottom Center) */}
              <div className="absolute bottom-2 z-30 w-full max-w-sm rounded-xl bg-white/95 backdrop-blur-md border border-[#2E5EFF]/40 p-4 shadow-floating">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#5B616E] mb-1">
                  <span className="text-[#2E5EFF] font-bold">[{activeStream.badge}]</span>
                  <span className="text-[#FF6A3D] font-bold">● {activeStream.time}</span>
                </div>
                <div className="text-xs font-mono font-bold text-[#14171F] flex items-center gap-1">
                  <span>&gt; {displayText}</span>
                  <span className="inline-block h-3.5 w-1.5 bg-[#2E5EFF] animate-pulse" />
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AgentConsoleHero;
