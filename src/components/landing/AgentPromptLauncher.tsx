import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Plus, RefreshCw, Truck, ShoppingBag, Sprout, ShieldCheck, Calculator, Play, CheckCircle2 } from "lucide-react";

interface PresetPrompt {
  id: string;
  category: "dispatch" | "retail" | "agriculture" | "enterprise";
  label: string;
  prompt: string;
  agentName: string;
  timeSaved: string;
  roiMultiplier: string;
  steps: string[];
}

const PRESET_PROMPTS: PresetPrompt[] = [
  {
    id: "dispatch-1",
    category: "dispatch",
    label: "Reroute 12-stop freight truck",
    prompt: "Deploy an autonomous dispatch agent to optimize a 12-stop interstate freight truck route considering live Sydney-Melbourne traffic delays.",
    agentName: "FleetDispatch-Agent #08",
    timeSaved: "3.5 hrs/day",
    roiMultiplier: "4.2x",
    steps: [
      "Fetched live GPS telemetry & traffic incident feeds",
      "Calculated fuel-optimal 12-stop sequence (-42 km)",
      "Dispatched updated turn-by-turn route to driver mobile app",
      "Logged verified arrival ETAs in SAP ERP dashboard",
    ],
  },
  {
    id: "retail-1",
    category: "retail",
    label: "Auto-verify customer RMA refund",
    prompt: "Verify return tracking status and auto-process $185 RMA refund for order #GM-8821 with zero human intervention.",
    agentName: "RMARefund-Agent #03",
    timeSaved: "12 mins/order",
    roiMultiplier: "5.1x",
    steps: [
      "Scanned warehouse barcode arrival scan for order #GM-8821",
      "Cross-referenced return policy & verified item condition score",
      "Issued $185.00 refund via Stripe API gateway",
      "Sent instant SMS confirmation & updated Shopify inventory",
    ],
  },
  {
    id: "ag-1",
    category: "agriculture",
    label: "Predict inventory stockouts",
    prompt: "Analyze soil moisture sensors & weather telemetry to forecast crop water demands and auto-generate supplier PO for fertilizer.",
    agentName: "CropTelemetry-Agent #12",
    timeSaved: "6 hrs/week",
    roiMultiplier: "3.8x",
    steps: [
      "Ingested microclimate weather radar & 48 soil moisture sensors",
      "Predicted 14% moisture deficit over next 72 hours",
      "Auto-generated draft PO for 500L bio-fertilizer in Xero",
      "Scheduled precision drip irrigation cycle for 04:00 AM",
    ],
  },
  {
    id: "sec-1",
    category: "enterprise",
    label: "Audit driver HOS compliance",
    prompt: "Audit electronic logging device (ELD) logs across 45 active drivers for HOS compliance and flag potential rest breaks required.",
    agentName: "SecurityAudit-Agent #01",
    timeSaved: "15 hrs/week",
    roiMultiplier: "6.0x",
    steps: [
      "Connected via MCP 1.0 zero-trust gateway to Geotab ELD api",
      "Audited 45 driver logs against NHVR fatigue regulations",
      "Flagged 2 drivers approaching 12-hour duty limits",
      "Pushed alert to dispatch manager & updated compliance log",
    ],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Agents", icon: Sparkles },
  { id: "dispatch", label: "Fleet Dispatch", icon: Truck },
  { id: "retail", label: "Retail RMA", icon: ShoppingBag },
  { id: "agriculture", label: "Ag Telemetry", icon: Sprout },
  { id: "enterprise", label: "MCP Security", icon: ShieldCheck },
];

export const AgentPromptLauncher = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [inputValue, setInputValue] = useState<string>("");
  const [activePrompt, setActivePrompt] = useState<PresetPrompt | null>(PRESET_PROMPTS[0]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const filteredPresets = selectedCategory === "all"
    ? PRESET_PROMPTS
    : PRESET_PROMPTS.filter((p) => p.category === selectedCategory);

  const handleSelectPreset = (preset: PresetPrompt) => {
    setInputValue(preset.prompt);
    setActivePrompt(preset);
    setIsExecuting(true);
    setTimeout(() => setIsExecuting(false), 600);
  };

  const handleRandomPreset = () => {
    const random = PRESET_PROMPTS[Math.floor(Math.random() * PRESET_PROMPTS.length)];
    handleSelectPreset(random);
  };

  return (
    <section className="py-20 md:py-28 bg-[#FAF9F6] border-b border-[#E7E5DE] text-[#14171F]">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Replit Style Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] border border-[#2E5EFF]/20 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#2E5EFF]">
            <Sparkles className="h-3.5 w-3.5" /> REPLIT-STYLE AGENT LAUNCHER
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-[#14171F]">
            What agent will you deploy today?
          </h2>
          
          <p className="text-base sm:text-lg text-[#5B616E] max-w-xl mx-auto font-body">
            Turn operational goals into autonomous transport, retail &amp; supply chain AI agents in minutes — zero-trust, SOC2 compliant.
          </p>
        </motion.div>

        {/* Replit Style Interactive Prompt Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          {/* Main Input Box Container */}
          <div className="relative rounded-2xl bg-white border-2 border-[#2E5EFF]/30 p-4 shadow-xl focus-within:border-[#2E5EFF] focus-within:ring-4 focus-within:ring-[#2E5EFF]/10 transition-all">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF9F6] border border-[#E7E5DE] text-[#5B616E] hover:bg-[#EEF1FF] hover:text-[#2E5EFF] transition-colors"
                title="Attach ERP context file or schema"
              >
                <Plus className="h-5 w-5" />
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Create an agent that..."
                className="w-full bg-transparent text-sm sm:text-base text-[#14171F] placeholder-[#8B8F99] focus:outline-none font-body"
              />

              <button
                onClick={() => {
                  if (activePrompt) setIsExecuting(true);
                  setTimeout(() => setIsExecuting(false), 600);
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF6A3D] text-white hover:bg-[#E5592E] transition-all shadow-md hover:scale-105"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Category Filter Pills Bar */}
            <div className="mt-4 pt-3 border-t border-[#E7E5DE] flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
                        isActive
                          ? "bg-[#2E5EFF] text-white shadow-sm"
                          : "bg-[#FAF9F6] text-[#5B616E] hover:bg-[#EEF1FF] hover:text-[#2E5EFF]"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleRandomPreset}
                className="inline-flex items-center gap-1 text-xs font-mono text-[#8B8F99] hover:text-[#2E5EFF] transition-colors shrink-0"
              >
                <RefreshCw className="h-3 w-3" /> Try example
              </button>
            </div>
          </div>

          {/* Quick Example Prompt Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-[#8B8F99] font-mono">Try prompt:</span>
            {filteredPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className="rounded-full bg-white border border-[#E7E5DE] px-3.5 py-1 text-xs font-medium text-[#14171F] hover:border-[#2E5EFF] hover:bg-[#EEF1FF] hover:text-[#2E5EFF] transition-all shadow-2xs"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Live Agent Execution Result Box */}
          <AnimatePresence mode="wait">
            {activePrompt && (
              <motion.div
                key={activePrompt.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-8 rounded-2xl bg-[#16214F] text-white p-6 shadow-2xl text-left border border-[#2E5EFF]/30"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2E5EFF] text-white">
                      <Play className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-display text-white">{activePrompt.agentName}</h4>
                      <p className="text-xs font-mono text-[#7C97FF]">Status: {isExecuting ? "Executing steps..." : "Active & Reasoning"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs font-mono text-white/60 uppercase">TIME SAVED</div>
                      <div className="text-sm font-bold text-[#1FAA59] font-display">{activePrompt.timeSaved}</div>
                    </div>
                    <div className="text-right border-l border-white/15 pl-4">
                      <div className="text-xs font-mono text-white/60 uppercase">ROI MULTIPLIER</div>
                      <div className="text-sm font-bold text-[#FF6A3D] font-display">{activePrompt.roiMultiplier}</div>
                    </div>
                  </div>
                </div>

                {/* Execution Trace Steps */}
                <div className="space-y-2.5">
                  <div className="text-xs font-mono text-white/50 uppercase tracking-wider">EXECUTION TRACE LOG</div>
                  {activePrompt.steps.map((step, idx) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-2.5 text-xs text-white/90 font-mono bg-white/5 rounded-lg px-3 py-2 border border-white/5"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#1FAA59] shrink-0" />
                      <span>{step}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-white/60">Zero-Trust Memory Isolation · SOC2 Compliant</span>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C97FF] hover:underline"
                  >
                    Deploy this agent in your ERP <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>

      </div>
    </section>
  );
};

export default AgentPromptLauncher;
