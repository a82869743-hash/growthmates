import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Bot, CheckCircle2, User, Sparkles, Truck, Calculator, ArrowRight, ShieldCheck } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/landing/ScrollReveal";
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

const STAGES = [
  { id: 0, label: "1. Fleet & Load Volume" },
  { id: 1, label: "2. Operations & Hours" },
  { id: 2, label: "3. Bottlenecks & Disruption" },
  { id: 3, label: "4. Readiness & Systems" },
  { id: 4, label: "5. Real-Time ROI Metrics" },
];

const ROICalculator = () => {
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

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#14171F] font-body">
      <Navbar />

      <section className="container max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        
        {/* Hero Header with ScrollReveal */}
        <ScrollReveal variant="fade-up">
          <div className="mx-auto max-w-3xl text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] border border-[#2E5EFF]/20 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#2E5EFF]">
              <Calculator className="h-3.5 w-3.5" /> INTERACTIVE ADVISOR THREAD
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-[#14171F]">
              AI Automation <span className="text-[#2E5EFF]">ROI Calculator</span>
            </h1>
            <p className="text-base text-[#5B616E] max-w-lg mx-auto font-body">
              Answer 4 quick operational questions below to generate your tailored AI ROI analysis and cost reduction breakdown.
            </p>
          </div>
        </ScrollReveal>

        {/* Layout Grid with Sticky Side Rail */}
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-12 items-start">
          
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
                className="rounded-3xl bg-white border-2 border-[#2E5EFF]/30 p-8 shadow-2xl"
              >
                <ROIResultsDashboard results={results} business={business} />
              </motion.div>
            )}

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ROICalculator;
