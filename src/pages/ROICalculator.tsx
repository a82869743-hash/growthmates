import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { BarChart3, Bot, CheckCircle2, User } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
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
  { id: 0, label: "1. Business Profile" },
  { id: 1, label: "2. Operations" },
  { id: 2, label: "3. Pain Points" },
  { id: 3, label: "4. Readiness" },
  { id: 4, label: "5. ROI Results" },
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
    willingnessPercent: 70,
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

  const togglePainPoint = (key: PainPoint) => {
    setPainPoints((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  return (
    <div className="min-h-screen bg-bg-base text-fg-default font-body">
      <Navbar />

      <section className="container py-16 md:py-24">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-signal-warm-dim text-signal-warm">
            <BarChart3 className="h-5 w-5" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-display">
            Interactive ROI Calculator Thread
          </h1>
          <p className="mt-3 text-base text-fg-dim max-w-xl mx-auto">
            Answer 4 quick operational questions below to generate your tailored AI ROI analysis in real time.
          </p>
        </div>

        {/* Layout with Slim Sticky Side Progress Rail */}
        <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-12 items-start">
          {/* Side Progress Rail (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28 rounded-md bg-bg-surface border border-border-subtle p-5 shadow-flat space-y-4">
            <span className="text-[10px] font-mono font-semibold text-fg-dimmer uppercase tracking-wider block border-b border-border-subtle pb-2">
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
                    className={`w-full text-left text-xs p-2.5 rounded-md flex items-center justify-between transition-all ${
                      isActive
                        ? "bg-accent text-white font-semibold shadow-flat"
                        : isDone
                        ? "bg-accent-dim text-accent font-medium"
                        : "text-fg-dim hover:text-fg-default"
                    }`}
                  >
                    <span>{s.label}</span>
                    {isDone && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Conversational Stream Column (9 cols) */}
          <div className="lg:col-span-9 space-y-8">
            {/* Stage 0: Business Profile */}
            <div className="rounded-md bg-bg-surface border border-border-subtle p-6 shadow-raised space-y-4">
              {/* System Prompt Bubble */}
              <div className="flex gap-3 items-start">
                <div className="h-8 w-8 rounded-full bg-signal-warm-dim text-signal-warm flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-md bg-signal-warm-dim border border-signal-warm/20 p-4 text-xs text-fg-default leading-relaxed max-w-xl">
                  <p className="font-semibold text-signal-warm mb-1">GROWTHMATES AI ADVISOR</p>
                  Let's start with your fleet profile. What is your current fleet size and load volume?
                </div>
              </div>

              {/* Interactive User Input Bubble */}
              <div className="flex gap-3 items-start justify-end">
                <div className="rounded-md bg-accent-dim border border-accent/20 p-5 text-xs text-fg-default space-y-4 max-w-xl w-full">
                  <div className="flex items-center gap-2 font-semibold text-accent border-b border-accent/20 pb-2">
                    <User className="h-4 w-4" /> Business &amp; Fleet Inputs
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-fg-dim mb-1">
                        Fleet Size (Trucks)
                      </label>
                      <input
                        type="number"
                        min={5}
                        value={business.fleetSize}
                        onChange={(e) => handleBusinessChange("fleetSize", parseInt(e.target.value) || 0)}
                        className="w-full rounded-md border border-border-subtle bg-bg-surface px-3 py-2 text-xs text-fg-default focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-fg-dim mb-1">
                        Monthly Orders / Loads
                      </label>
                      <input
                        type="number"
                        min={10}
                        value={business.monthlyOrders}
                        onChange={(e) => handleBusinessChange("monthlyOrders", parseInt(e.target.value) || 0)}
                        className="w-full rounded-md border border-border-subtle bg-bg-surface px-3 py-2 text-xs text-fg-default focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setActiveStage(1)}
                      className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
                    >
                      Confirm Fleet Details &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 1: Operations Hours */}
            {activeStage >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-md bg-bg-surface border border-border-subtle p-6 shadow-raised space-y-4"
              >
                <div className="flex gap-3 items-start">
                  <div className="h-8 w-8 rounded-full bg-signal-warm-dim text-signal-warm flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-md bg-signal-warm-dim border border-signal-warm/20 p-4 text-xs text-fg-default leading-relaxed max-w-xl">
                    <p className="font-semibold text-signal-warm mb-1">GROWTHMATES AI ADVISOR</p>
                    Great! Now tell us about your admin team's weekly manual hours spent on tasks like order entry, tracking, and invoicing.
                  </div>
                </div>

                <div className="flex gap-3 items-start justify-end">
                  <div className="rounded-md bg-accent-dim border border-accent/20 p-5 text-xs text-fg-default space-y-4 max-w-xl w-full">
                    <div className="flex items-center gap-2 font-semibold text-accent border-b border-accent/20 pb-2">
                      <User className="h-4 w-4" /> Weekly Admin Hours
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-fg-dim mb-1">Order Entry Hours/wk</label>
                        <input
                          type="number"
                          value={operations.weeklyHours.manualOrderEntry}
                          onChange={(e) =>
                            setOperations((prev) => ({
                              ...prev,
                              weeklyHours: { ...prev.weeklyHours, manualOrderEntry: parseInt(e.target.value) || 0 },
                            }))
                          }
                          className="w-full rounded-md border border-border-subtle bg-bg-surface px-3 py-2 text-xs text-fg-default focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-fg-dim mb-1">Invoice Processing Hours/wk</label>
                        <input
                          type="number"
                          value={operations.weeklyHours.invoiceProcessing}
                          onChange={(e) =>
                            setOperations((prev) => ({
                              ...prev,
                              weeklyHours: { ...prev.weeklyHours, invoiceProcessing: parseInt(e.target.value) || 0 },
                            }))
                          }
                          className="w-full rounded-md border border-border-subtle bg-bg-surface px-3 py-2 text-xs text-fg-default focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => setActiveStage(2)}
                        className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
                      >
                        Confirm Operation Hours &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stage 2: Pain Points */}
            {activeStage >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-md bg-bg-surface border border-border-subtle p-6 shadow-raised space-y-4"
              >
                <div className="flex gap-3 items-start">
                  <div className="h-8 w-8 rounded-full bg-signal-warm-dim text-signal-warm flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-md bg-signal-warm-dim border border-signal-warm/20 p-4 text-xs text-fg-default leading-relaxed max-w-xl">
                    <p className="font-semibold text-signal-warm mb-1">GROWTHMATES AI ADVISOR</p>
                    What are your biggest operational pain points right now? Select all that apply.
                  </div>
                </div>

                <div className="flex gap-3 items-start justify-end">
                  <div className="rounded-md bg-accent-dim border border-accent/20 p-5 text-xs text-fg-default space-y-4 max-w-xl w-full">
                    <div className="flex items-center gap-2 font-semibold text-accent border-b border-accent/20 pb-2">
                      <User className="h-4 w-4" /> Operational Bottlenecks
                    </div>

                    <div className="grid grid-cols-2 gap-2">
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
                            className={`p-3 rounded-md text-xs font-semibold text-left border transition-all ${
                              isSelected
                                ? "bg-accent text-white border-accent"
                                : "bg-bg-surface text-fg-dim border-border-subtle"
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
                        className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
                      >
                        Confirm Pain Points &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stage 3: Automation Readiness */}
            {activeStage >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-md bg-bg-surface border border-border-subtle p-6 shadow-raised space-y-4"
              >
                <div className="flex gap-3 items-start">
                  <div className="h-8 w-8 rounded-full bg-signal-warm-dim text-signal-warm flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-md bg-signal-warm-dim border border-signal-warm/20 p-4 text-xs text-fg-default leading-relaxed max-w-xl">
                    <p className="font-semibold text-signal-warm mb-1">GROWTHMATES AI ADVISOR</p>
                    Almost done! How ready is your team to automate manual workflows?
                  </div>
                </div>

                <div className="flex gap-3 items-start justify-end">
                  <div className="rounded-md bg-accent-dim border border-accent/20 p-5 text-xs text-fg-default space-y-4 max-w-xl w-full">
                    <div className="flex items-center gap-2 font-semibold text-accent border-b border-accent/20 pb-2">
                      <User className="h-4 w-4" /> Readiness Level
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-fg-dim mb-2">
                        <span>Automation Readiness Willingness</span>
                        <span className="text-accent">{automation.willingnessPercent}%</span>
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
                            willingnessPercent: parseInt(e.target.value) || 70,
                          }))
                        }
                        className="w-full accent-accent cursor-pointer"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => setActiveStage(4)}
                        className="rounded-full bg-accent px-6 py-2.5 text-xs font-semibold text-white hover:opacity-90 shadow-flat"
                      >
                        Calculate Final ROI &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stage 4: Results Dashboard */}
            {activeStage >= 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-md bg-bg-surface border border-border-subtle p-8 shadow-raised"
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
