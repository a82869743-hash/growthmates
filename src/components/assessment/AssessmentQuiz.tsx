import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { QuizQuestion } from "./types";

const QUESTIONS: QuizQuestion[] = [
  {
    id: "orderHandling",
    question: "How does your team currently handle incoming orders?",
    options: [
      { value: "manual", label: "Mostly Manual", description: "Phone, email, paper-based entry" },
      { value: "semi", label: "Semi-Automated", description: "Some digital tools but manual steps" },
      { value: "digital", label: "Fully Digital", description: "Integrated systems with minimal manual work" },
    ],
  },
  {
    id: "bottleneck",
    question: "What's your biggest admin bottleneck?",
    options: [
      { value: "data_entry", label: "Data Entry", description: "Manual entry across multiple systems" },
      { value: "invoicing", label: "Invoicing & Billing", description: "Slow invoice creation and disputes" },
      { value: "reporting", label: "Reporting", description: "Lack of real-time visibility and insights" },
      { value: "communication", label: "Communication", description: "Coordinating between teams and customers" },
    ],
  },
  {
    id: "teamSize",
    question: "How large is your operations team?",
    options: [
      { value: "small", label: "1-5 people", description: "Small team wearing many hats" },
      { value: "medium", label: "6-20 people", description: "Dedicated roles but stretched thin" },
      { value: "large", label: "21+ people", description: "Large team with specialized functions" },
    ],
  },
  {
    id: "currentSystems",
    question: "What systems do you currently use?",
    options: [
      { value: "spreadsheets", label: "Spreadsheets & Email", description: "Excel, Google Sheets, manual tracking" },
      { value: "basic_software", label: "Basic Software", description: "Accounting tools like Xero, MYOB, QuickBooks" },
      { value: "industry_tools", label: "Industry Software", description: "TMS, ERP, or specialized platforms" },
      { value: "custom", label: "Custom/Integrated", description: "Custom-built or fully integrated systems" },
    ],
  },
  {
    id: "automationExp",
    question: "What's your experience with automation or AI?",
    options: [
      { value: "none", label: "No Experience", description: "Haven't explored automation yet" },
      { value: "exploring", label: "Exploring", description: "Researching options but haven't implemented" },
      { value: "some", label: "Some Automation", description: "Using basic automations (e.g., email rules)" },
      { value: "advanced", label: "Advanced", description: "Already using AI/ML tools in operations" },
    ],
  },
];

interface AssessmentQuizProps {
  currentStep: number;
  answers: string[];
  onAnswer: (answer: string) => void;
}

const AssessmentQuiz = ({ currentStep, answers, onAnswer }: AssessmentQuizProps) => {
  const question = QUESTIONS[currentStep];
  if (!question) return null;

  const pct = Math.round((currentStep / QUESTIONS.length) * 100);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress Rail Header */}
      <div className="mb-6 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between text-[#5B616E] font-bold">
          <span>QUESTION {currentStep + 1} OF {QUESTIONS.length}</span>
          <span className="text-[#2E5EFF]">{pct}% COMPLETE</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-[#E7E5DE] overflow-hidden">
          <div
            className="h-full bg-[#2E5EFF] rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Centered Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl bg-white border border-[#E7E5DE] p-8 shadow-raised"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14171F] mb-6 font-display leading-tight">
            {question.question}
          </h2>

          {/* Large Tappable Option Blocks */}
          <div className="space-y-3.5">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onAnswer(opt.value)}
                className="w-full flex items-center justify-between rounded-2xl border border-[#E7E5DE] bg-[#FAF9F6] p-5 text-left transition-all duration-200 hover:border-[#2E5EFF] hover:bg-[#EEF1FF] hover:shadow-md group"
              >
                <div>
                  <span className="font-bold text-sm text-[#14171F] group-hover:text-[#2E5EFF] font-display block">
                    {opt.label}
                  </span>
                  <span className="mt-0.5 text-xs text-[#5B616E] block font-body">{opt.description}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-[#8B8F99] group-hover:text-[#2E5EFF] group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export { QUESTIONS };
export default AssessmentQuiz;
