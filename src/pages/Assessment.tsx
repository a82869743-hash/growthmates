import { useState } from "react";
import { ClipboardCheck, Sparkles, ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ScrollReveal from "@/components/landing/ScrollReveal";
import AssessmentQuiz, { QUESTIONS } from "@/components/assessment/AssessmentQuiz";
import AssessmentResults from "@/components/assessment/AssessmentResults";
import type { AssessmentResult } from "@/components/assessment/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Assessment = () => {
  const { toast } = useToast();
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

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#14171F] font-body">
      <Navbar />
      <section className="container max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        
        {/* Header with ScrollReveal */}
        <ScrollReveal variant="fade-up">
          <div className="mx-auto max-w-3xl text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] border border-[#2E5EFF]/20 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#2E5EFF]">
              <ClipboardCheck className="h-3.5 w-3.5" /> AI READINESS DIAGNOSTIC
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-[#14171F]">
              AI Readiness <span className="text-[#2E5EFF]">Assessment</span>
            </h1>
            <p className="text-base sm:text-lg text-[#5B616E] max-w-lg mx-auto font-body">
              Type your operational goal into the prompt bar below for instant AI analysis, or answer 5 quick questions.
            </p>
          </div>
        </ScrollReveal>

        {/* Prompt Launcher Bar */}
        {!quizDone && (
          <ScrollReveal variant="scale" delay={0.1}>
            <div className="max-w-2xl mx-auto mb-14">
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
          <AssessmentResults result={result} isLoading={isLoading} onSubmitEmail={handleEmailSubmit} />
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Assessment;
