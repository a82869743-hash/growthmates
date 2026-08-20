import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Package,
  Route as RouteIcon,
  Truck,
  DollarSign,
  CheckCircle2,
  Sparkles,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { InteractiveGridCanvas } from "@/components/common/InteractiveGridCanvas";

/* ─── 5 Clear, Non-Technical Business Steps ─── */
const NODES = [
  {
    id: "shipment",
    title: "1. Order Received",
    desc: "Melbourne ➔ Sydney freight",
    tag: "#LD-8920",
    color: "#64748B",
    bgTint: "#F8FAFC",
    icon: Package,
  },
  {
    id: "route",
    title: "2. Smart Route Planned",
    desc: "12 stops optimized (-38L fuel)",
    tag: "Fastest",
    color: "#2E5EFF",
    bgTint: "#EEF2FF",
    icon: RouteIcon,
  },
  {
    id: "fleet",
    title: "3. Best Driver Assigned",
    desc: "Matched available semi-truck",
    tag: "Available",
    color: "#2E5EFF",
    bgTint: "#EEF2FF",
    icon: Truck,
  },
  {
    id: "rate",
    title: "4. Fair Price Calculated",
    desc: "$2,340 quote (+18% profit)",
    tag: "Profitable",
    color: "#FF6A3D",
    bgTint: "#FFF5F0",
    icon: DollarSign,
  },
  {
    id: "dispatch",
    title: "5. Automatically Dispatched",
    desc: "SMS sent · Driver on the road",
    tag: "Complete",
    color: "#1FAA59",
    bgTint: "#F0FDF4",
    icon: CheckCircle2,
  },
];

export const AgentConsoleHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReduced) {
      setActiveStep(4);
      return;
    }

    const svg = containerRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll<SVGPathElement>(".flow-connector");
    const traveler = svg.querySelector<SVGCircleElement>("#flow-traveler");

    const resetAll = () => {
      setActiveStep(0);
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, {
          strokeDasharray: len,
          strokeDashoffset: len,
          opacity: 0.25,
        });
      });
      if (traveler) gsap.set(traveler, { opacity: 0 });
    };

    resetAll();

    // GSAP Master Loop
    const tl = gsap.timeline({
      delay: 0.5,
      repeat: -1,
      repeatDelay: 2.2,
      onRepeat: resetAll,
    });

    paths.forEach((path, i) => {
      const len = path.getTotalLength();
      const nextStep = i + 1;
      const segDuration = 0.8;

      tl.to(traveler, { opacity: 1, duration: 0.08 }, i === 0 ? 0 : "+=0");

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: segDuration,
          ease: "power2.inOut",
          onUpdate: function () {
            if (!traveler) return;
            const currentOffset = parseFloat(path.style.strokeDashoffset || "0");
            const progress = Math.max(0, Math.min(1, 1 - currentOffset / len));
            const pt = path.getPointAtLength(progress * len);
            traveler.setAttribute("cx", String(pt.x));
            traveler.setAttribute("cy", String(pt.y));
          },
        },
        i === 0 ? 0 : "+=0"
      );

      tl.call(() => {
        setActiveStep(nextStep);
      }, undefined, `-=${segDuration * 0.2}`);
    });

    tl.to(traveler, { opacity: 0, duration: 0.35, ease: "power2.out" });

    return () => {
      tl.kill();
    };
  }, [prefersReduced]);

  return (
    <section className="relative bg-[#FAF9F6] pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-24 overflow-hidden text-[#14171F]">
      {/* ══ INTERACTIVE WAVY GRID BACKGROUND ══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <InteractiveGridCanvas />
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#FAF9F6] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#FAF9F6] to-transparent pointer-events-none" />
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* ── LEFT COLUMN: Headline & Clear Value Proposition ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] px-4 py-1.5 text-xs font-bold text-[#2E5EFF] border border-[#2E5EFF]/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2E5EFF] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2E5EFF]" />
              </span>
              Enterprise Agentic AI Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-extrabold tracking-tight text-[#14171F] font-display leading-[1.08]">
              AI Agents That{" "}
              <span className="relative inline-block text-[#2E5EFF]">
                Actually Run
                <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 200 10" preserveAspectRatio="none" fill="none">
                  <motion.path
                    d="M0 7 Q50 1 100 5 T200 4"
                    stroke="#FF6A3D"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </svg>
              </span>{" "}
              Your Operations
            </h1>

            <p className="text-base sm:text-lg text-[#5B616E] leading-relaxed max-w-xl font-body">
              Automate complex dispatch, fleet logistics, and enterprise workflows with autonomous multi-agent pipelines — executed in seconds, not hours.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <button
                onClick={() =>
                  (window as any).Calendly?.initPopupWidget({
                    url: "https://calendly.com/d-bstsolutions/book-your-free-consultation",
                  })
                }
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#2E5EFF] px-8 py-4 text-sm font-bold text-white transition-all hover:shadow-[0_14px_32px_-6px_rgba(46,94,255,0.5)] hover:scale-[1.03] active:scale-[0.98] shadow-[0_10px_25px_-5px_rgba(46,94,255,0.35)]"
              >
                Book a 15-Min Demo
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <a
                href="/roi-calculator"
                className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#2E5EFF]/20 bg-white px-7 py-3.5 text-sm font-bold text-[#2E5EFF] hover:bg-[#EEF1FF] hover:border-[#2E5EFF]/40 transition-all shadow-sm"
              >
                See How Much You Save
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Simple Business Benefits */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E7E5DE]/80">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#14171F] font-display">85%</p>
                <p className="text-[11px] font-semibold text-[#5B616E] mt-0.5">Less Phone Calls & Admin</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#2E5EFF] font-display">&lt;1 Sec</p>
                <p className="text-[11px] font-semibold text-[#5B616E] mt-0.5">Instant Driver Match</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#1FAA59] font-display">100%</p>
                <p className="text-[11px] font-semibold text-[#5B616E] mt-0.5">Hands-Free Dispatch</p>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: Intuitive, Perfectly Spaced Animated Workflow Visual ── */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 relative"
          >
            {/* Main Visual Card */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#FAFBFF] via-white to-[#F6F8FF] border border-[#E2DFD7] shadow-[0_20px_60px_-15px_rgba(46,94,255,0.10),0_4px_16px_-4px_rgba(0,0,0,0.04)] overflow-hidden">
              
              {/* Subtle Dotted Background Texture */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#2E5EFF_1.2px,transparent_1.2px)] [background-size:20px_20px]" />

              {/* Top Header: Simple Live Status */}
              <div className="relative z-10 flex items-center justify-between px-5 py-3.5 bg-white/90 border-b border-[#EAE7DF] backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                  </div>
                  <span className="text-xs font-bold text-[#14171F] tracking-tight">
                    How An Order Gets Dispatched In Seconds
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#1FAA59]/25 text-[11px] font-bold text-[#1FAA59]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1FAA59] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1FAA59]" />
                  </span>
                  Live Auto-Pilot
                </div>
              </div>

              {/* ══ Live Step Explanation Banner ══ */}
              <div className="relative z-10 px-5 py-2.5 bg-[#EEF2FF]/60 border-b border-[#E2DFD7] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#2E5EFF] font-semibold">
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
                  <span>
                    {activeStep === 0 && "Step 1 of 5: Customer places an order"}
                    {activeStep === 1 && "Step 2 of 5: AI calculates the fastest 12-stop route"}
                    {activeStep === 2 && "Step 3 of 5: AI matches closest driver with legal hours"}
                    {activeStep === 3 && "Step 4 of 5: AI confirms a healthy 18% profit margin"}
                    {activeStep >= 4 && "Step 5 of 5: Driver receives SMS with GPS route & paperwork ✓"}
                  </span>
                </div>
                <span className="hidden sm:inline-block text-[11px] font-mono text-[#5B616E] font-medium">
                  {activeStep === 4 ? "Finished" : "Processing..."}
                </span>
              </div>

              {/* ── Main Canvas: 5 Cascading Step Cards with Generous Spacing ── */}
              <div className="relative p-4 sm:p-6 h-[460px] overflow-hidden">

                {/* SVG Bezier Connectors with Precise Card Alignment */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-0"
                  viewBox="0 0 690 440"
                  preserveAspectRatio="none"
                >
                  {/* Cable 1 -> 2: (x:130, y:52) to (x:235, y:132) */}
                  <path
                    className="flow-connector"
                    d="M 130 52 C 130 105, 235 80, 235 132"
                    fill="none"
                    stroke="#2E5EFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Cable 2 -> 3: (x:235, y:132) to (x:340, y:212) */}
                  <path
                    className="flow-connector"
                    d="M 235 132 C 235 185, 340 160, 340 212"
                    fill="none"
                    stroke="#2E5EFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Cable 3 -> 4: (x:340, y:212) to (x:445, y:292) */}
                  <path
                    className="flow-connector"
                    d="M 340 212 C 340 265, 445 240, 445 292"
                    fill="none"
                    stroke="#FF6A3D"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Cable 4 -> 5: (x:445, y:292) to (x:550, y:372) */}
                  <path
                    className="flow-connector"
                    d="M 445 292 C 445 345, 550 320, 550 372"
                    fill="none"
                    stroke="#1FAA59"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Traveling Light Photon */}
                  <circle
                    id="flow-traveler"
                    r="5"
                    fill="#2E5EFF"
                    opacity="0"
                  />
                </svg>

                {/* ══ 5 Non-Tech Steps Cards with Balanced Increments ══ */}
                <div className="relative z-10 w-full h-full">
                  
                  {/* Step 1: Order Received */}
                  <div
                    className={`absolute left-2 sm:left-4 top-3 w-[200px] sm:w-[225px] rounded-xl bg-white border-2 p-3 transition-all duration-300 shadow-sm ${
                      activeStep >= 0
                        ? "border-[#64748B] shadow-[0_6px_20px_rgba(100,116,139,0.15)] ring-2 ring-[#64748B]/10"
                        : "border-[#E2DFD7] opacity-40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B]">
                          <Package className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[11px] font-bold text-[#64748B]">1. New Order</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#F1F5F9] text-[#64748B]">
                        #8920
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#14171F]">Order Received</p>
                    <p className="text-[10.5px] text-[#5B616E] mt-0.5 truncate">Melbourne ➔ Sydney freight</p>
                  </div>

                  {/* Step 2: Smart Route Planned */}
                  <div
                    className={`absolute left-[50px] sm:left-[115px] top-[83px] sm:top-[85px] w-[200px] sm:w-[225px] rounded-xl bg-white border-2 p-3 transition-all duration-300 shadow-sm ${
                      activeStep >= 1
                        ? "border-[#2E5EFF] shadow-[0_8px_24px_rgba(46,94,255,0.2)] ring-2 ring-[#2E5EFF]/15 scale-[1.02]"
                        : "border-[#E2DFD7] opacity-40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-[#EEF2FF] border border-[#2E5EFF]/20 flex items-center justify-center text-[#2E5EFF]">
                          <RouteIcon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[11px] font-bold text-[#2E5EFF]">2. Route AI</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#EEF2FF] text-[#2E5EFF]">
                        -38L Fuel
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#14171F]">Smart Route Planned</p>
                    <p className="text-[10.5px] text-[#5B616E] mt-0.5 truncate">12 stops optimized</p>
                  </div>

                  {/* Step 3: Best Driver Assigned */}
                  <div
                    className={`absolute left-[100px] sm:left-[220px] top-[163px] sm:top-[165px] w-[200px] sm:w-[225px] rounded-xl bg-white border-2 p-3 transition-all duration-300 shadow-sm ${
                      activeStep >= 2
                        ? "border-[#2E5EFF] shadow-[0_8px_24px_rgba(46,94,255,0.2)] ring-2 ring-[#2E5EFF]/15 scale-[1.02]"
                        : "border-[#E2DFD7] opacity-40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-[#EEF2FF] border border-[#2E5EFF]/20 flex items-center justify-center text-[#2E5EFF]">
                          <Truck className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[11px] font-bold text-[#2E5EFF]">3. Driver Match</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#EEF2FF] text-[#2E5EFF]">
                        Available
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#14171F]">Best Driver Assigned</p>
                    <p className="text-[10.5px] text-[#5B616E] mt-0.5 truncate">Matched closest semi-truck</p>
                  </div>

                  {/* Step 4: Fair Price Quoted */}
                  <div
                    className={`absolute left-[140px] sm:left-[325px] top-[243px] sm:top-[245px] w-[200px] sm:w-[225px] rounded-xl bg-white border-2 p-3 transition-all duration-300 shadow-sm ${
                      activeStep >= 3
                        ? "border-[#FF6A3D] shadow-[0_8px_24px_rgba(255,106,61,0.22)] ring-2 ring-[#FF6A3D]/15 scale-[1.02]"
                        : "border-[#E2DFD7] opacity-40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-[#FFF5F0] border border-[#FF6A3D]/20 flex items-center justify-center text-[#FF6A3D]">
                          <DollarSign className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[11px] font-bold text-[#FF6A3D]">4. Price Quote</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#FFF5F0] text-[#FF6A3D]">
                        +18% Profit
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#14171F]">Fair Price Quoted</p>
                    <p className="text-[10.5px] text-[#5B616E] mt-0.5 truncate">$2,340 profitable freight</p>
                  </div>

                  {/* Step 5: Automatically Dispatched (Generous padding from bottom border!) */}
                  <div
                    className={`absolute left-[180px] sm:left-[430px] top-[323px] sm:top-[325px] w-[200px] sm:w-[225px] rounded-xl bg-white border-2 p-3 transition-all duration-300 shadow-sm ${
                      activeStep >= 4
                        ? "border-[#1FAA59] shadow-[0_10px_28px_rgba(31,170,89,0.25)] ring-2 ring-[#1FAA59]/20 scale-[1.02]"
                        : "border-[#E2DFD7] opacity-40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-[#F0FDF4] border border-[#1FAA59]/20 flex items-center justify-center text-[#1FAA59]">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[11px] font-bold text-[#1FAA59]">5. Dispatched</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#F0FDF4] text-[#1FAA59] flex items-center gap-1">
                        <Check className="h-2.5 w-2.5" /> Done
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#14171F]">Truck Dispatched!</p>
                    <p className="text-[10.5px] text-[#5B616E] mt-0.5 truncate">Driver notified via SMS</p>
                  </div>

                </div>

              </div>

              {/* ── Bottom Summary Strip ── */}
              <div className="relative z-10 px-5 py-3 bg-white border-t border-[#EAE7DF] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5B616E]">
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-[#2E5EFF] font-bold">● Total Time:</span>
                  <span>Under 1 second from order to dispatch</span>
                </div>
                <div className="flex items-center gap-2 text-[#1FAA59] font-bold">
                  <span>✓ Zero Manual Data Entry</span>
                </div>
              </div>

            </div>

            {/* Seamless Software Integrations */}
            <div className="mt-5 flex items-center justify-center gap-2 flex-wrap text-center">
              <span className="text-xs font-semibold text-[#5B616E]">Connects seamlessly with:</span>
              {["SAP", "TruckMate", "McLeod", "Oracle", "Shopify", "Xero"].map(
                (name) => (
                  <span
                    key={name}
                    className="inline-flex items-center px-2.5 py-1 rounded-full bg-white border border-[#E2DFD7] text-[11px] font-bold text-[#14171F] shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-[#2E5EFF]/30 transition-all cursor-default"
                  >
                    {name}
                  </span>
                )
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AgentConsoleHero;
