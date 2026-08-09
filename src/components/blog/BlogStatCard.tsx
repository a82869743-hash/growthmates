import { cn } from "@/lib/utils";

interface BlogStatCardProps {
  value: string;
  label: string;
  source?: string;
  className?: string;
}

const BlogStatCard = ({ value, label, source, className }: BlogStatCardProps) => (
  <div
    className={cn(
      "rounded-2xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-md",
      className
    )}
  >
    <p className="text-3xl font-bold tracking-tight text-primary md:text-4xl">{value}</p>
    <p className="mt-1.5 text-sm font-medium text-foreground">{label}</p>
    {source && (
      <p className="mt-2 text-[11px] text-muted-foreground italic">{source}</p>
    )}
  </div>
);

export default BlogStatCard;
