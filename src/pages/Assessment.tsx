import { useState } from "react";
import { ClipboardCheck } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
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
  const quizDone = step >= QUESTIONS.length;

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
    <div className="min-h-screen bg-bg-base text-fg-default font-body">
      <Navbar />
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-accent-dim text-accent">
            <ClipboardCheck className="h-5 w-5" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-display">
            AI Readiness Assessment
          </h1>
          <p className="mt-3 text-base text-fg-dim max-w-lg mx-auto">
            Answer 5 quick operational questions to receive your Automation Readiness Score &amp; custom roadmap.
          </p>
        </div>

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
