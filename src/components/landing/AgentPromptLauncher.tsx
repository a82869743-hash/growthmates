import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Plus,
  Truck,
  ShoppingBag,
  Sprout,
  ShieldCheck,
  Globe,
  DollarSign,
  Database,
  Bot,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
  Activity,
  ArrowUpRight,
  Play,
  Terminal,
  FileCode,
  Check,
  Users,
  X,
  Loader2,
} from "lucide-react";
import { generateGeminiArchitecture, SolutionArchitecture } from "@/lib/geminiArchitectureService";

const PRESET_EXAMPLES = [
  { label: "12-Stop Interstate Freight Routing", prompt: "Deploy an autonomous dispatch agent to optimize 12-stop freight routes across Sydney & Melbourne." },
  { label: "CRM Inbound Lead Scoring & Routing", prompt: "Build an autonomous CRM lead qualification and meeting booking agent for enterprise sales." },
  { label: "Automate E-Commerce RMA Refunds", prompt: "Verify return tracking status and auto-process $185 RMA refund for order #GM-8821 with zero human intervention." },
  { label: "IoT Soil Telemetry & Crop Irrigation", prompt: "Analyze soil moisture sensors & weather telemetry to forecast crop water demands and auto-generate supplier PO for fertilizer." },
  { label: "24/7 Driver HOS Safety Compliance", prompt: "Audit electronic logging device (ELD) logs across 45 active drivers for HOS compliance and flag potential rest breaks required." },
];

const CATEGORIES = [
  { id: "dispatch", label: "Fleet Dispatch", icon: Truck, prompt: "Deploy an autonomous dispatch agent to optimize 12-stop freight routes across Sydney & Melbourne." },
  { id: "crm", label: "CRM & Sales", icon: Users, prompt: "Build an autonomous CRM lead qualification and meeting booking agent for enterprise sales." },
  { id: "retail", label: "Retail RMA", icon: ShoppingBag, prompt: "Verify return tracking status and auto-process $185 RMA refund for order #GM-8821." },
  { id: "agriculture", label: "Ag Telemetry", icon: Sprout, prompt: "Analyze soil moisture sensors & weather telemetry to forecast crop water demands." },
  { id: "enterprise", label: "Compliance & Safety", icon: ShieldCheck, prompt: "Audit electronic logging device (ELD) logs across 45 active drivers for HOS compliance." },
];

export const AgentPromptLauncher = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [architecture, setArchitecture] = useState<SolutionArchitecture | null>(null);
  const [executionLogIndex, setExecutionLogIndex] = useState<number>(4);
  const resultRef = useRef<HTMLDivElement>(null);

  // Trigger Gemini AI generation and broadcast prompt to platform cards
  const handleExecutePrompt = async (promptToRun?: string) => {
    const targetPrompt = (promptToRun || inputValue).trim();
    if (!targetPrompt) return;

    if (promptToRun) {
      setInputValue(promptToRun);
    }

    // Broadcast prompt event to sync the 4 platform cards below in real time
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("growthmates:prompt-change", {
          detail: { prompt: targetPrompt },
        })
      );
    }

    setIsGenerating(true);
    setHasGenerated(true);
    setExecutionLogIndex(1);

    const t1 = setTimeout(() => setExecutionLogIndex(2), 350);
    const t2 = setTimeout(() => setExecutionLogIndex(3), 700);
    const t3 = setTimeout(() => setExecutionLogIndex(4), 1050);

    try {
      const generated = await generateGeminiArchitecture(targetPrompt);
      setArchitecture(generated);
      
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 150);
    } catch (err) {
      console.error("AI Generation error:", err);
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
      }, 1200);
    }
  };

  const handleSelectPreset = (prompt: string, categoryId?: string) => {
    if (categoryId) setSelectedCategory(categoryId);
    handleExecutePrompt(prompt);
  };

  const handleClear = () => {
    setHasGenerated(false);
    setArchitecture(null);
    setInputValue("");
    setSelectedCategory("");
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("growthmates:prompt-change", {
          detail: { prompt: "" },
        })
      );
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#FAF9F6] text-[#14171F] relative overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10 space-y-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] border border-[#2E5EFF]/20 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#2E5EFF]">
            <Sparkles className="h-3.5 w-3.5" /> POWERED BY GEMINI AI
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#14171F]">
            What will you build with GrowthMates AI?
          </h2>
          <p className="text-base sm:text-lg text-[#5B616E] max-w-2xl mx-auto font-body">
            Describe any operational goal in plain English. Our Gemini AI engine will generate and execute its end-to-end plan live.
          </p>
        </motion.div>

        {/* ══ SEARCH / PROMPT LAUNCHER INPUT BOX ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-6"
        >
          <div className="relative rounded-2xl bg-white border-2 border-[#2E5EFF]/30 p-3.5 sm:p-4 shadow-xl focus-within:border-[#2E5EFF] focus-within:ring-4 focus-within:ring-[#2E5EFF]/10 transition-all">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleExecutePrompt();
              }}
              className="flex items-center gap-3"
            >
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF9F6] border border-[#E7E5DE] text-[#5B616E] hover:bg-[#EEF1FF] hover:text-[#2E5EFF] transition-colors shrink-0"
                title="Attach context file or ERP schema"
              >
                <Plus className="h-5 w-5" />
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  const val = e.target.value;
                  setInputValue(val);
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(
                      new CustomEvent("growthmates:prompt-change", {
                        detail: { prompt: val },
                      })
                    );
                  }
                }}
                placeholder="Describe an agent (e.g. crm management, 12-stop freight routing, shopify return refunds)..."
                className="w-full bg-transparent text-sm sm:text-base text-[#14171F] placeholder-[#8B8F99] focus:outline-none font-body"
              />

              <button
                type="submit"
                disabled={isGenerating}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF6A3D] text-white hover:bg-[#E5592E] transition-all shadow-md hover:scale-105"
                title="Generate with Gemini AI"
              >
                {isGenerating ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </button>
            </form>

            {/* Category Filter Pills Bar */}
            <div className="mt-3.5 pt-3 border-t border-[#E7E5DE] flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleSelectPreset(cat.prompt, cat.id)}
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

              {hasGenerated && (
                <button
                  onClick={handleClear}
                  className="inline-flex items-center gap-1 text-xs font-mono text-[#8B8F99] hover:text-[#FF6A3D] transition-colors shrink-0"
                >
                  <X className="h-3.5 w-3.5" /> Close plan
                </button>
              )}
            </div>
          </div>

          {/* Quick Example Prompt Chips */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-[#8B8F99] font-mono">Try examples:</span>
            {PRESET_EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                onClick={() => handleSelectPreset(ex.prompt)}
                className="rounded-full bg-white border border-[#E7E5DE] px-3 py-1 text-xs font-medium text-[#14171F] hover:border-[#2E5EFF] hover:bg-[#EEF1FF] hover:text-[#2E5EFF] transition-all shadow-2xs"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ══ LIVE TELEMETRY & EXECUTION PLAN CARD (OPENS WHEN PROMPT IS SUBMITTED) ══ */}
        <AnimatePresence>
          {hasGenerated && architecture && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="max-w-5xl mx-auto overflow-hidden mt-6"
            >
              <div className="rounded-3xl bg-white border-2 border-[#2E5EFF]/25 p-5 sm:p-8 shadow-[0_20px_70px_-15px_rgba(46,94,255,0.14),0_6px_20px_-6px_rgba(0,0,0,0.04)] relative overflow-hidden">
                {/* Subtle technical background grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#2E5EFF_1.2px,transparent_1.2px)] [background-size:22px_22px]" />

                {/* Card Header */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#E7E5DE] pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#EEF1FF] text-[#2E5EFF] border border-[#2E5EFF]/20 uppercase">
                      {architecture.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-display text-[#14171F]">
                      {architecture.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono">
                    <button
                      onClick={() => handleExecutePrompt()}
                      disabled={isGenerating}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold transition-all ${
                        isGenerating
                          ? "bg-[#2E5EFF]/15 text-[#2E5EFF] border border-[#2E5EFF]/30"
                          : "bg-[#F0FDF4] border border-[#1FAA59]/30 text-[#1FAA59] hover:bg-[#1FAA59] hover:text-white shadow-xs"
                      }`}
                    >
                      <Play className="h-3 w-3 fill-current" />
                      {isGenerating ? "Executing Pipeline..." : "Re-Run Pipeline"}
                    </button>

                    <div className="flex items-center gap-1 text-[#5B616E]">
                      <span className="h-2 w-2 rounded-full bg-[#1FAA59] animate-ping" />
                      <span>Sub-{architecture.metrics.latency}</span>
                    </div>
                  </div>
                </div>

                {/* ── Live Agent Reasoning & Log Stream Terminal ── */}
                <div className="relative z-10 bg-[#14171F] rounded-xl p-3.5 text-xs font-mono text-white mb-6 border border-[#252A36]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                    <span className="text-[#2E5EFF] font-bold flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5" />
                      LIVE EXECUTION TELEMETRY (GEMINI ENGINE)
                    </span>
                    <span className="text-[11px] text-[#1FAA59]">STATUS: 200 OK</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-zinc-300">
                    {architecture.liveLogs.map((log, idx) => (
                      <p
                        key={log}
                        className={`transition-all duration-300 ${
                          idx + 1 <= executionLogIndex || !isGenerating
                            ? "opacity-100 text-zinc-200"
                            : "opacity-30"
                        }`}
                      >
                        {log}
                      </p>
                    ))}
                  </div>
                </div>

                {/* ── 4-Step End-to-End Execution Plan Strip ── */}
                <div className="relative z-10 bg-[#FAF9F6] border border-[#E7E5DE] rounded-2xl p-4 sm:p-5 mb-6">
                  <div className="flex items-center justify-between mb-3 border-b border-[#E7E5DE] pb-2">
                    <span className="text-xs font-mono font-bold text-[#14171F] flex items-center gap-1.5">
                      <Activity className="h-3.5 w-3.5 text-[#2E5EFF]" />
                      END-TO-END EXECUTION SEQUENCE
                    </span>
                    <span className="text-[11px] font-mono text-[#5B616E]">
                      Total Runtime: <strong className="text-[#2E5EFF]">{architecture.metrics.latency}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {architecture.steps.map((step) => (
                      <div
                        key={step.num}
                        className="p-3 rounded-xl bg-white border border-[#E7E5DE] shadow-2xs space-y-1 hover:border-[#2E5EFF]/50 transition-colors"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="font-bold text-[#2E5EFF]">STEP {step.num}</span>
                          <span className="text-[#8B8F99]">{step.latency}</span>
                        </div>
                        <p className="text-xs font-bold text-[#14171F]">{step.label}</p>
                        <p className="text-[11px] text-[#5B616E] leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Bottom Value Metrics & Deployment Action Bar ── */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E7E5DE]">
                  <div className="grid grid-cols-3 gap-6 text-left w-full sm:w-auto">
                    <div>
                      <p className="text-[10px] font-mono text-[#8B8F99] uppercase">COST CUT</p>
                      <p className="text-lg font-extrabold text-[#14171F] font-display">{architecture.metrics.costReduction}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-[#8B8F99] uppercase">ACCURACY</p>
                      <p className="text-lg font-extrabold text-[#2E5EFF] font-display">{architecture.metrics.accuracy}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-[#8B8F99] uppercase">EST. ROI</p>
                      <p className="text-lg font-extrabold text-[#1FAA59] font-display">{architecture.metrics.roi}</p>
                    </div>
                  </div>

                  <a
                    href={`/contact?prompt=${encodeURIComponent(architecture.prompt)}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#2E5EFF] px-7 py-3 text-xs font-bold text-white hover:bg-[#1E4AE6] transition-all shadow-md hover:scale-[1.02] shrink-0"
                  >
                    Deploy This Workflow In 48h
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default AgentPromptLauncher;
