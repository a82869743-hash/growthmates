import { motion, AnimatePresence } from "framer-motion";
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
    <div className="mx-auto max-w-xl">
      {/* Top Thin Progress Bar */}
      <div className="mb-8 font-mono text-xs">
        <div className="flex items-center justify-between text-fg-dim mb-2">
          <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
          <span className="text-accent font-semibold">{pct}% Complete</span>
        </div>
        <div className="h-2 w-full rounded-full bg-bg-muted overflow-hidden border border-border-subtle">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Centered Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="rounded-md bg-bg-surface border border-border-subtle p-8 shadow-raised"
        >
          <h2 className="text-2xl font-extrabold text-fg-default mb-6 font-display">
            {question.question}
          </h2>

          {/* Large Tappable Option Blocks */}
          <div className="space-y-3">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onAnswer(opt.value)}
                className="w-full flex flex-col items-start rounded-md border border-border-subtle bg-bg-base p-5 text-left transition-all duration-200 hover:border-accent hover:bg-accent-dim hover:shadow-flat group"
              >
                <span className="font-bold text-sm text-fg-default group-hover:text-accent font-display">
                  {opt.label}
                </span>
                <span className="mt-1 text-xs text-fg-dim">{opt.description}</span>
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
