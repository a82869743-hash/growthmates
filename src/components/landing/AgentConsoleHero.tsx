import { useState, useEffect } from "react";
import { ArrowUpRight, ShieldCheck, CheckCircle2, BarChart3, Navigation } from "lucide-react";
import { motion } from "framer-motion";

const AGENT_STREAM = [
  { action: "Optimizing 12 multi-stop routes", badge: "Route AI", time: "1.2s" },
  { action: "Quoted freight lane MEL → SYD: $2,340", badge: "Rate Engine", time: "Live" },
  { action: "Inventory reorder triggered: 450 units", badge: "Inventory AI", time: "Synced" },
  { action: "Driver HOS compliance audit verified", badge: "Compliance AI", time: "Passed" },
];

const AgentConsoleHero = () => {
  const [streamIdx, setStreamIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentFullText = AGENT_STREAM[streamIdx].action;

    if (isTyping) {
      if (displayText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, 35);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2200);
      }
    } else {
      timeout = setTimeout(() => {
        setDisplayText("");
        setIsTyping(true);
        setStreamIdx((prev) => (prev + 1) % AGENT_STREAM.length);
      }, 350);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, streamIdx]);

  const activeStream = AGENT_STREAM[streamIdx];

  return (
    <section className="relative bg-[#FAF9F6] pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-12 md:pb-16 overflow-hidden border-b border-[#E7E5DE] text-[#14171F]">
      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] px-4 py-1.5 text-xs font-bold text-[#2E5EFF]">
              <span className="h-2 w-2 rounded-full bg-[#2E5EFF] animate-pulse" />
              Enterprise Agentic AI Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#14171F] font-display leading-[1.08]">
              Empowering Your Business with <span className="text-[#2E5EFF]">Modern Agentic AI</span>
            </h1>

            <p className="text-base sm:text-lg text-[#5B616E] leading-relaxed max-w-2xl font-body">
              GrowthMates AI helps organizations modernize operational workflows, cut costs by up to 85%, and achieve sustainable growth through proven AI agent strategies across Transportation, Retail, Agriculture, and Education. Transform your tech landscape into a powerful asset for growth.
            </p>

            {/* Pill-Shaped Glassmorphism CTAs */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
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

            {/* Stat Indicators */}
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

          {/* Right Column — 3D Connected Ecosystem Graphic (6 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:col-span-6 flex flex-col items-center justify-center"
          >
            {/* 3D Smart Ecosystem Canvas Container */}
            <div className="relative w-full max-w-[600px] h-[440px] flex items-center justify-center">
              
              {/* Outer Orbit Base Track */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
                <svg className="w-full h-full max-w-[560px] max-h-[420px]" viewBox="0 0 560 420" fill="none">
                  <ellipse cx="280" cy="330" rx="260" ry="85" stroke="#2E5EFF" strokeWidth="3" strokeDasharray="8 8" className="animate-spin-slow" />
                  <ellipse cx="280" cy="330" rx="200" ry="60" stroke="#FF6A3D" strokeWidth="1.5" opacity="0.6" />
                </svg>
              </div>

              {/* 3D Isometric Buildings & Connected Hubs SVG */}
              <svg className="w-full h-full drop-shadow-2xl z-10" viewBox="0 0 600 440" fill="none">
                <defs>
                  <linearGradient id="sdiBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2E5EFF" />
                    <stop offset="100%" stopColor="#16214F" />
                  </linearGradient>
                  <linearGradient id="sdiWhiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#F2F1EC" />
                  </linearGradient>
                </defs>

                {/* Ground Base Platform */}
                <ellipse cx="300" cy="350" rx="240" ry="65" fill="url(#sdiWhiteGrad)" stroke="#2E5EFF" strokeWidth="2" />
                <ellipse cx="300" cy="350" rx="190" ry="45" fill="#EEF1FF" opacity="0.7" />

                {/* 3D Tower 1 (Main AI Core Hub) */}
                <g transform="translate(260, 90)">
                  <path d="M40 0 L0 25 L0 210 L40 185 Z" fill="#2E5EFF" />
                  <path d="M40 0 L80 25 L80 210 L40 185 Z" fill="#16214F" />
                  <path d="M40 0 L80 25 L40 50 L0 25 Z" fill="#7C97FF" />
                  <line x1="20" y1="50" x2="20" y2="190" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
                  <line x1="60" y1="50" x2="60" y2="190" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.3" />
                </g>

                {/* 3D Building 2 */}
                <g transform="translate(140, 190)">
                  <path d="M35 0 L0 20 L0 140 L35 120 Z" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="1" />
                  <path d="M35 0 L70 20 L70 140 L35 120 Z" fill="#EEF1FF" stroke="#2E5EFF" strokeWidth="1" />
                  <path d="M35 0 L70 20 L35 40 L0 20 Z" fill="#4171FF" />
                </g>

                {/* 3D Building 3 */}
                <g transform="translate(380, 180)">
                  <path d="M40 0 L0 22 L0 150 L40 128 Z" fill="#2E5EFF" />
                  <path d="M40 0 L80 22 L80 150 L40 128 Z" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="1" />
                  <path d="M40 0 L80 22 L40 44 L0 22 Z" fill="#7C97FF" />
                </g>

                {/* Front Low Buildings */}
                <g transform="translate(200, 270)">
                  <path d="M30 0 L0 15 L0 80 L30 65 Z" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="1" />
                  <path d="M30 0 L60 15 L60 80 L30 65 Z" fill="#2E5EFF" />
                </g>
                <g transform="translate(330, 270)">
                  <path d="M30 0 L0 15 L0 80 L30 65 Z" fill="#2E5EFF" />
                  <path d="M30 0 L60 15 L60 80 L30 65 Z" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="1" />
                </g>
              </svg>

              {/* Floating 3D Badge Nodes */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-12 left-12 z-20 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-raised border border-[#2E5EFF]/30"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5EFF] text-white">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-[#14171F]">SOC2 Security</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-10 z-20 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-raised border border-[#2E5EFF]/30"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF6A3D] text-white">
                  <Navigation className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-[#14171F]">Route Optimization</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-36 left-6 z-20 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-raised border border-[#2E5EFF]/30"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2E5EFF] text-white">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-[#14171F]">Live Analytics</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-40 right-6 z-20 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-raised border border-[#2E5EFF]/30"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1FAA59] text-white">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-[#14171F]">Zero Downtime</span>
              </motion.div>

              {/* Embedded Live Agent Prompt Overlay */}
              <div className="absolute bottom-2 z-30 w-full max-w-sm rounded-xl bg-white/95 backdrop-blur-md border border-[#2E5EFF]/40 p-3.5 shadow-floating">
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
