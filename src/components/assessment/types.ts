export interface QuizQuestion {
  id: string;
  question: string;
  options: { value: string; label: string; description: string }[];
}

export interface AssessmentResult {
  score: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  strengths: string[];
  improvements: string[];
  recommendations: string[];
}
