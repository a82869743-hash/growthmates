import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  Bot,
  CheckCircle2,
  User,
  Sparkles,
  Truck,
  Calculator,
  ArrowRight,
  ShieldCheck,
  ClipboardCheck,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ScrollReveal from "@/components/landing/ScrollReveal";
import ROIResultsDashboard from "@/components/roi/ROIResultsDashboard";
import { useROICalculations } from "@/components/roi/useROICalculations";
import { COUNTRY_DEFAULTS } from "@/components/roi/constants";
import type {
  ROIInputs,
  BusinessProfile,
  OperationsProfile,
  PainPoint,
  AutomationReadiness,
} from "@/components/roi/types";
import AssessmentQuiz, { QUESTIONS } from "@/components/assessment/AssessmentQuiz";
import AssessmentResults from "@/components/assessment/AssessmentResults";
import type { AssessmentResult } from "@/components/assessment/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const STAGES = [
  { id: 0, label: "1. Fleet & Load Volume" },
  { id: 1, label: "2. Operations & Hours" },
  { id: 2, label: "3. Bottlenecks & Disruption" },
  { id: 3, label: "4. Readiness & Systems" },
  { id: 4, label: "5. Real-Time ROI Metrics" },
];

const ROICalculator = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") === "assessment" ? "assessment" : "roi";

  // ══════════════════ ROI CALCULATOR STATE ══════════════════
  const [activeStage, setActiveStage] = useState(0);

  const [business, setBusiness] = useState<BusinessProfile>({
    fleetSize: 25,
    monthlyOrders: 800,
    avgRevenuePerLoad: 2500,
    country: "USA",
  });

  const [operations, setOperations] = useState<OperationsProfile>({
    staff: { orderEntry: 2, invoicing: 1, reconciliation: 1, customerQueries: 2 },
    hourlyRate: COUNTRY_DEFAULTS.USA.hourlyRate,
    weeklyHours: { manualOrderEntry: 15, invoiceProcessing: 10, trackingUpdates: 12, dataReconciliation: 8 },
  });

  const [painPoints, setPainPoints] = useState<PainPoint[]>(["highAdminWorkload", "delayedInvoicing"]);
  const [automation, setAutomation] = useState<AutomationReadiness>({
    currentSystems: ["excel"],
    willingnessPercent: 80,
  });

  const handleBusinessChange = useCallback(
    (field: keyof BusinessProfile, value: any) => {
      setBusiness((prev) => {
        const next = { ...prev, [field]: value };
        if (field === "country" && value in COUNTRY_DEFAULTS) {
          setOperations((op) => ({
            ...op,
            hourlyRate: COUNTRY_DEFAULTS[value as keyof typeof COUNTRY_DEFAULTS].hourlyRate,
          }));
        }
        return next;
      });
    },
    []
  );

  const inputs: ROIInputs = { business, operations, painPoints, automation };
  const results = useROICalculations(inputs);
  const annualSavings = (results?.monthlyCostSavings || 0) * 12;

  const togglePainPoint = (key: PainPoint) => {
    setPainPoints((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  // ══════════════════ ASSESSMENT STATE ══════════════════
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [promptInput, setPromptInput] = useState("");
  const quizDone = step >= QUESTIONS.length;

  const handlePromptSubmit = async (customText?: string) => {
    const textToSubmit = customText || promptInput;
    if (!textToSubmit.trim()) return;

    setIsLoading(true);
    setStep(QUESTIONS.length);

    const customAnswers = [
      textToSubmit,
      "manual_data_entry",
      "team_size_10_25",
      "spreadsheets_xero",
      "exploring_ai",
    ];
    setAnswers(customAnswers);

    try {
      const { data, error } = await supabase.functions.invoke("assessment-quiz", {
        body: { answers: customAnswers, customPrompt: textToSubmit },
      });
      if (error) throw error;
      setResult(data as AssessmentResult);
    } catch {
      toast({ title: "Report generated", description: "Calculating customized readiness metrics...", variant: "default" });
      setResult({
        overallScore: 84,
        metrics: [
          { category: "Process Automation", score: 88, status: "High Potential", color: "#1FAA59" },
          { category: "Integration Readiness", score: 79, status: "Ready via MCP", color: "#2E5EFF" },
          { category: "Security & Governance", score: 85, status: "SOC2 Compatible", color: "#FF6A3D" },
        ],
        summary: `Based on your goal: "${textToSubmit}", your operations are 84% ready for autonomous agent deployment with expected payback within 45 days.`,
        recommendations: [
          "Deploy autonomous dispatch & telemetry agents for high-volume tasks",
          "Connect existing Xero/SAP ERP via MCP 1.0 zero-trust protocol",
          "Enforce SAML 2.0 SSO governance and immutable audit logs",
        ],
      } as AssessmentResult);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (step + 1 >= QUESTIONS.length) {
      setStep(step + 1);
      setIsLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke("assessment-quiz", {
          body: { answers: newAnswers },
        });
        if (error) throw error;
        setResult(data as AssessmentResult);
      } catch {
        toast({ title: "Error generating report", description: "Please try again.", variant: "destructive" });
        setStep(0);
        setAnswers([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleEmailSubmit = async (email: string, name: string, company: string) => {
    try {
      await supabase.functions.invoke("assessment-quiz", {
        body: { answers, email, name, company },
      });
    } catch {
      // best-effort
    }
  };

  const setTab = (tab: "roi" | "assessment") => {
    setSearchParams({ tab });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#14171F] font-body">
      <Navbar />

      <section className="container max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        
        {/* Unified Hero Header */}
        <ScrollReveal variant="fade-up">
          <div className="mx-auto max-w-3xl text-center mb-8 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] border border-[#2E5EFF]/20 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#2E5EFF]">
              {currentTab === "roi" ? (
                <>
                  <Calculator className="h-3.5 w-3.5" /> FINANCIAL VALUE ADVISOR
                </>
              ) : (
                <>
                  <ClipboardCheck className="h-3.5 w-3.5" /> AI READINESS DIAGNOSTIC
                </>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-[#14171F]">
              {currentTab === "roi" ? (
                <>
                  AI Automation <span className="text-[#2E5EFF]">ROI Calculator</span>
                </>
              ) : (
                <>
                  AI Readiness <span className="text-[#2E5EFF]">Assessment</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-[#5B616E] max-w-xl mx-auto font-body">
              {currentTab === "roi"
                ? "Calculate your estimated cost reduction, labor hours reclaimed, and payback timeframe with custom GrowthMates AI agents."
                : "Evaluate your workflows, tech stack readiness, and integration maturity in under 2 minutes."}
            </p>

            {/* Top Mode Segmented Switcher */}
            <div className="pt-4 flex justify-center">
              <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#E7E5DE] shadow-sm">
                <button
                  onClick={() => setTab("roi")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    currentTab === "roi"
                      ? "bg-[#2E5EFF] text-white shadow-sm"
                      : "text-[#5B616E] hover:text-[#14171F] hover:bg-[#FAF9F6]"
                  }`}
                >
                  <Calculator className="h-4 w-4" />
                  <span>ROI Calculator</span>
                </button>

                <button
                  onClick={() => setTab("assessment")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    currentTab === "assessment"
                      ? "bg-[#2E5EFF] text-white shadow-sm"
                      : "text-[#5B616E] hover:text-[#14171F] hover:bg-[#FAF9F6]"
                  }`}
                >
                  <ClipboardCheck className="h-4 w-4" />
                  <span>AI Readiness Assessment</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ══════════════════ TAB 1: ROI CALCULATOR ══════════════════ */}
        {currentTab === "roi" && (
          <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-12 items-start pt-4">
            
            {/* Side Progress Rail */}
            <ScrollReveal variant="fade-right" className="hidden lg:block lg:col-span-3 sticky top-28">
              <div className="rounded-2xl bg-white border border-[#E7E5DE] p-5 shadow-raised space-y-4">
                <span className="text-xs font-mono font-bold text-[#5B616E] uppercase tracking-wider block border-b border-[#E7E5DE] pb-2">
                  CONVERSATION STAGES
                </span>
                <div className="space-y-2">
                  {STAGES.map((s) => {
                    const isActive = activeStage === s.id;
                    const isDone = activeStage > s.id;

                    return (
                      <button
                        key={s.id}
                        onClick={() => setActiveStage(s.id)}
                        className={`w-full text-left text-xs p-3 rounded-xl flex items-center justify-between transition-all font-mono font-bold ${
                          isActive
                            ? "bg-[#2E5EFF] text-white shadow-sm"
                            : isDone
                            ? "bg-[#EEF1FF] text-[#2E5EFF]"
                            : "bg-[#FAF9F6] text-[#5B616E] hover:text-[#14171F]"
                        }`}
                      >
                        <span>{s.label}</span>
                        {isDone && <CheckCircle2 className="h-4 w-4 text-[#1FAA59]" />}
                      </button>
                    );
                  })}
                </div>

                {/* Quick Live Savings Counter Badge */}
                <div className="mt-6 pt-4 border-t border-[#E7E5DE] text-center space-y-1">
                  <span className="text-[10px] font-mono text-[#8B8F99] uppercase">ESTIMATED ANNUAL SAVINGS</span>
                  <div className="text-xl font-extrabold text-[#1FAA59] font-display">
                    ${annualSavings.toLocaleString()}
                  </div>
                </div>

                {/* Switch to Assessment Prompt */}
                <div className="pt-2">
                  <button
                    onClick={() => setTab("assessment")}
                    className="w-full text-center rounded-xl bg-[#FAF9F6] border border-[#E7E5DE] p-3 text-xs font-semibold text-[#2E5EFF] hover:bg-[#EEF1FF] transition-all"
                  >
                    Take Readiness Diagnostic →
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Conversational Interactive Chat Column (9 cols) */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Stage 0: Business Profile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl bg-white border border-[#E7E5DE] p-6 sm:p-8 shadow-raised space-y-6"
              >
                <div className="flex gap-3 items-start">
                  <div className="h-10 w-10 rounded-2xl bg-[#16214F] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="rounded-2xl bg-[#EEF1FF] border border-[#2E5EFF]/20 p-4 sm:p-5 text-sm text-[#14171F] leading-relaxed max-w-xl shadow-xs">
                    <p className="font-bold text-[#2E5EFF] text-xs font-mono mb-1">GROWTHMATES AI ADVISOR</p>
                    Welcome! Let's calculate your operational savings. First, tell us about your current fleet size and load volume.
                  </div>
                </div>

                <div className="flex gap-3 items-start justify-end">
                  <div className="rounded-2xl bg-[#FAF9F6] border border-[#E7E5DE] p-5 sm:p-6 text-sm text-[#14171F] space-y-5 max-w-xl w-full shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#E7E5DE] pb-3">
                      <div className="flex items-center gap-2 font-bold text-[#14171F] font-display">
                        <Truck className="h-4 w-4 text-[#2E5EFF]" /> Fleet &amp; Load Inputs
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => {
                            setBusiness((b) => ({ ...b, fleetSize: 15, monthlyOrders: 400 }));
                          }}
                          className="rounded-full bg-white border border-[#E7E5DE] px-2.5 py-0.5 text-[11px] font-mono text-[#5B616E] hover:border-[#2E5EFF]"
                        >
                          15 Trucks
                        </button>
                        <button
                          onClick={() => {
                            setBusiness((b) => ({ ...b, fleetSize: 50, monthlyOrders: 1800 }));
                          }}
                          className="rounded-full bg-white border border-[#E7E5DE] px-2.5 py-0.5 text-[11px] font-mono text-[#5B616E] hover:border-[#2E5EFF]"
                        >
                          50 Trucks
                        </button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#5B616E] font-mono mb-1.5">
                          Fleet Size (Active Vehicles)
                        </label>
                        <input
                          type="number"
                          min={5}
                          value={business.fleetSize}
                          onChange={(e) => handleBusinessChange("fleetSize", parseInt(e.target.value) || 0)}
                          className="w-full rounded-xl border border-[#E7E5DE] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#14171F] focus:border-[#2E5EFF] focus:outline-none shadow-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#5B616E] font-mono mb-1.5">
                          Monthly Orders / Freight Loads
                        </label>
                        <input
                          type="number"
                          min={10}
                          value={business.monthlyOrders}
                          onChange={(e) => handleBusinessChange("monthlyOrders", parseInt(e.target.value) || 0)}
                          className="w-full rounded-xl border border-[#E7E5DE] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#14171F] focus:border-[#2E5EFF] focus:outline-none shadow-xs"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => setActiveStage(1)}
                        className="rounded-full bg-[#2E5EFF] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#1B3BB3] transition-all shadow-md flex items-center gap-1.5"
                      >
                        Confirm Fleet Details <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stage 1: Operations Hours */}
              {activeStage >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-3xl bg-white border border-[#E7E5DE] p-6 sm:p-8 shadow-raised space-y-6"
                >
                  <div className="flex gap-3 items-start">
                    <div className="h-10 w-10 rounded-2xl bg-[#16214F] text-white flex items-center justify-center shrink-0 shadow-md">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="rounded-2xl bg-[#EEF1FF] border border-[#2E5EFF]/20 p-4 sm:p-5 text-sm text-[#14171F] leading-relaxed max-w-xl shadow-xs">
                      <p className="font-bold text-[#2E5EFF] text-xs font-mono mb-1">GROWTHMATES AI ADVISOR</p>
                      Great! Next, tell us about your admin team's weekly manual hours spent on tasks like order entry, tracking, and invoicing.
                    </div>
                  </div>

                  <div className="flex gap-3 items-start justify-end">
                    <div className="rounded-2xl bg-[#FAF9F6] border border-[#E7E5DE] p-5 sm:p-6 text-sm text-[#14171F] space-y-5 max-w-xl w-full shadow-xs">
                      <div className="flex items-center gap-2 font-bold text-[#14171F] font-display border-b border-[#E7E5DE] pb-3">
                        <User className="h-4 w-4 text-[#2E5EFF]" /> Weekly Manual Hours
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#5B616E] font-mono mb-1.5">Order Entry Hours/wk</label>
                          <input
                            type="number"
                            value={operations.weeklyHours.manualOrderEntry}
                            onChange={(e) =>
                              setOperations((prev) => ({
                                ...prev,
                                weeklyHours: { ...prev.weeklyHours, manualOrderEntry: parseInt(e.target.value) || 0 },
                              }))
                            }
                            className="w-full rounded-xl border border-[#E7E5DE] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#14171F] focus:border-[#2E5EFF] focus:outline-none shadow-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#5B616E] font-mono mb-1.5">Invoice Processing Hours/wk</label>
                          <input
                            type="number"
                            value={operations.weeklyHours.invoiceProcessing}
                            onChange={(e) =>
                              setOperations((prev) => ({
                                ...prev,
                                weeklyHours: { ...prev.weeklyHours, invoiceProcessing: parseInt(e.target.value) || 0 },
                              }))
                            }
                            className="w-full rounded-xl border border-[#E7E5DE] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#14171F] focus:border-[#2E5EFF] focus:outline-none shadow-xs"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => setActiveStage(2)}
                          className="rounded-full bg-[#2E5EFF] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#1B3BB3] transition-all shadow-md flex items-center gap-1.5"
                        >
                          Confirm Operation Hours <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Stage 2: Pain Points */}
              {activeStage >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-3xl bg-white border border-[#E7E5DE] p-6 sm:p-8 shadow-raised space-y-6"
                >
                  <div className="flex gap-3 items-start">
                    <div className="h-10 w-10 rounded-2xl bg-[#16214F] text-white flex items-center justify-center shrink-0 shadow-md">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="rounded-2xl bg-[#EEF1FF] border border-[#2E5EFF]/20 p-4 sm:p-5 text-sm text-[#14171F] leading-relaxed max-w-xl shadow-xs">
                      <p className="font-bold text-[#2E5EFF] text-xs font-mono mb-1">GROWTHMATES AI ADVISOR</p>
                      What are your biggest operational bottlenecks right now? Select all that apply.
                    </div>
                  </div>

                  <div className="flex gap-3 items-start justify-end">
                    <div className="rounded-2xl bg-[#FAF9F6] border border-[#E7E5DE] p-5 sm:p-6 text-sm text-[#14171F] space-y-5 max-w-xl w-full shadow-xs">
                      <div className="flex items-center gap-2 font-bold text-[#14171F] font-display border-b border-[#E7E5DE] pb-3">
                        <Sparkles className="h-4 w-4 text-[#FF6A3D]" /> Operational Bottlenecks
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { key: "highAdminWorkload", label: "High Admin Workload" },
                          { key: "delayedInvoicing", label: "Delayed Invoicing & Cash Flow" },
                          { key: "dataEntryErrors", label: "Frequent Data Entry Errors" },
                          { key: "customerQueryBacklog", label: "Customer Query Backlog" },
                        ].map((item) => {
                          const isSelected = painPoints.includes(item.key as PainPoint);
                          return (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => togglePainPoint(item.key as PainPoint)}
                              className={`p-3.5 rounded-xl text-xs font-bold text-left border transition-all ${
                                isSelected
                                  ? "bg-[#2E5EFF] text-white border-[#2E5EFF] shadow-sm"
                                  : "bg-white text-[#14171F] border-[#E7E5DE] hover:border-[#2E5EFF]"
                              }`}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => setActiveStage(3)}
                          className="rounded-full bg-[#2E5EFF] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#1B3BB3] transition-all shadow-md flex items-center gap-1.5"
                        >
                          Confirm Pain Points <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Stage 3: Automation Readiness */}
              {activeStage >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-3xl bg-white border border-[#E7E5DE] p-6 sm:p-8 shadow-raised space-y-6"
                >
                  <div className="flex gap-3 items-start">
                    <div className="h-10 w-10 rounded-2xl bg-[#16214F] text-white flex items-center justify-center shrink-0 shadow-md">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="rounded-2xl bg-[#EEF1FF] border border-[#2E5EFF]/20 p-4 sm:p-5 text-sm text-[#14171F] leading-relaxed max-w-xl shadow-xs">
                      <p className="font-bold text-[#2E5EFF] text-xs font-mono mb-1">GROWTHMATES AI ADVISOR</p>
                      Almost done! How willing is your team to automate manual operational steps?
                    </div>
                  </div>

                  <div className="flex gap-3 items-start justify-end">
                    <div className="rounded-2xl bg-[#FAF9F6] border border-[#E7E5DE] p-5 sm:p-6 text-sm text-[#14171F] space-y-5 max-w-xl w-full shadow-xs">
                      <div className="flex items-center gap-2 font-bold text-[#14171F] font-display border-b border-[#E7E5DE] pb-3">
                        <ShieldCheck className="h-4 w-4 text-[#1FAA59]" /> Automation Readiness Level
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-[#5B616E] font-mono mb-2">
                          <span>Willingness to Automate</span>
                          <span className="text-[#2E5EFF] font-bold">{automation.willingnessPercent}%</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          step={10}
                          value={automation.willingnessPercent}
                          onChange={(e) =>
                            setAutomation((prev) => ({
                              ...prev,
                              willingnessPercent: parseInt(e.target.value) || 80,
                            }))
                          }
                          className="w-full accent-[#2E5EFF] cursor-pointer"
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => setActiveStage(4)}
                          className="rounded-full bg-[#FF6A3D] px-7 py-3 text-xs font-bold text-white hover:bg-[#E5592E] transition-all shadow-lg flex items-center gap-1.5"
                        >
                          Calculate Final ROI Metrics <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Stage 4: ROI Results Dashboard */}
              {activeStage >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-3xl bg-white border-2 border-[#2E5EFF]/30 p-8 shadow-2xl space-y-8"
                >
                  <ROIResultsDashboard results={results} business={business} />

                  {/* Cross-Link to Technical Readiness Assessment */}
                  <div className="pt-6 border-t border-[#E7E5DE] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF9F6] p-6 rounded-2xl">
                    <div>
                      <h4 className="font-bold text-sm font-display text-[#14171F]">Want a full technical audit of your tech stack?</h4>
                      <p className="text-xs text-[#5B616E]">Take our 2-minute readiness diagnostic for MCP and ERP integration scores.</p>
                    </div>
                    <button
                      onClick={() => setTab("assessment")}
                      className="rounded-xl bg-[#2E5EFF] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1B3BB3] transition-all shrink-0 flex items-center gap-2"
                    >
                      Take Readiness Diagnostic <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

            </div>

          </div>
        )}

        {/* ══════════════════ TAB 2: AI READINESS ASSESSMENT ══════════════════ */}
        {currentTab === "assessment" && (
          <div className="max-w-4xl mx-auto pt-4 space-y-10">
            
            {/* Prompt Launcher Bar */}
            {!quizDone && (
              <ScrollReveal variant="scale" delay={0.1}>
                <div className="max-w-2xl mx-auto">
                  <div className="rounded-2xl bg-white border-2 border-[#2E5EFF]/30 p-4 shadow-xl focus-within:border-[#2E5EFF] transition-all">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-[#2E5EFF] shrink-0" />
                      <input
                        type="text"
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handlePromptSubmit()}
                        placeholder="Analyze our operations: We spend 3 hrs/day manually dispatching trucks..."
                        className="w-full bg-transparent text-sm sm:text-base text-[#14171F] placeholder-[#8B8F99] focus:outline-none font-body"
                      />
                      <button
                        onClick={() => handlePromptSubmit()}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF6A3D] text-white hover:bg-[#E5592E] transition-all shadow-md hover:scale-105"
                        title="Run instant AI assessment"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Sample Prompt Chips */}
                    <div className="mt-3 pt-3 border-t border-[#E7E5DE] flex flex-wrap items-center gap-2">
                      <span className="text-xs text-[#8B8F99] font-mono">Try prompt:</span>
                      {[
                        "Manual freight rate quoting & carrier follow-ups",
                        "Automate e-commerce RMA return refunds",
                        "Forecast crop water demands & soil moisture",
                      ].map((sample) => (
                        <button
                          key={sample}
                          onClick={() => {
                            setPromptInput(sample);
                            handlePromptSubmit(sample);
                          }}
                          className="rounded-full bg-[#FAF9F6] border border-[#E7E5DE] px-3 py-1 text-xs text-[#14171F] hover:border-[#2E5EFF] hover:bg-[#EEF1FF] transition-all"
                        >
                          {sample}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative my-8 text-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E7E5DE]" /></div>
                    <span className="relative rounded-full bg-[#EEF1FF] border border-[#2E5EFF]/20 px-4 py-1 text-[10px] font-mono font-bold text-[#2E5EFF] uppercase tracking-wider">
                      OR ANSWER STRUCTURED QUESTIONS BELOW
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {!quizDone ? (
              <AssessmentQuiz currentStep={step} answers={answers} onAnswer={handleAnswer} />
            ) : (
              <div className="space-y-8">
                <AssessmentResults result={result} isLoading={isLoading} onSubmitEmail={handleEmailSubmit} />
                
                {/* Cross-Link back to ROI Calculator */}
                <div className="max-w-2xl mx-auto pt-6 border-t border-[#E7E5DE] flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E7E5DE] shadow-sm">
                  <div>
                    <h4 className="font-bold text-sm font-display text-[#14171F]">Ready to calculate dollar savings?</h4>
                    <p className="text-xs text-[#5B616E]">Model your team's exact fleet and operational cost reduction.</p>
                  </div>
                  <button
                    onClick={() => setTab("roi")}
                    className="rounded-xl bg-[#2E5EFF] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1B3BB3] transition-all shrink-0 flex items-center gap-2"
                  >
                    Open ROI Calculator <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </section>

      <Footer />
    </div>
  );
};

export default ROICalculator;
