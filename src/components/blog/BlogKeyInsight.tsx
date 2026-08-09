import { Lightbulb } from "lucide-react";

interface BlogKeyInsightProps {
  title: string;
  children: React.ReactNode;
}

const BlogKeyInsight = ({ title, children }: BlogKeyInsightProps) => (
  <div className="my-10 rounded-2xl border border-secondary/30 bg-secondary/5 p-6 md:p-8">
    <div className="flex items-center gap-2 mb-3">
      <Lightbulb className="h-5 w-5 text-secondary" />
      <h4 className="text-sm font-bold uppercase tracking-wider text-secondary">{title}</h4>
    </div>
    <div className="text-sm leading-relaxed text-foreground/90 space-y-2">{children}</div>
  </div>
);

export default BlogKeyInsight;
