import { X, Target, Users, Link2, FileText, Calendar, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { RoadmapItem } from "./types";
import { INDUSTRY_LABELS, PRIORITY_LABELS, ROADMAP_STATUS_LABELS, type IndustryTag } from "./types";

interface Props {
  item: RoadmapItem | null;
  open: boolean;
  onClose: () => void;
}

const DetailRow = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </div>
    <div className="text-sm text-foreground leading-relaxed">{children}</div>
  </div>
);

const CardDetailDrawer = ({ item, open, onClose }: Props) => {
  if (!item) return null;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent className="overflow-y-auto sm:max-w-lg">
        <SheetHeader className="pb-4">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {item.industries.map((ind) => (
              <Badge key={ind} variant="secondary" className="text-xs">
                {INDUSTRY_LABELS[ind as IndustryTag] || ind}
              </Badge>
            ))}
            <Badge variant="outline" className="text-xs">
              {PRIORITY_LABELS[item.priority]}
            </Badge>
            <Badge className="text-xs">
              {ROADMAP_STATUS_LABELS[item.status]}
            </Badge>
          </div>
          <SheetTitle className="text-lg">{item.title}</SheetTitle>
          {item.description && (
            <p className="text-sm text-muted-foreground">{item.description}</p>
          )}
        </SheetHeader>

        <div className="space-y-5 pb-8">
          {/* Progress */}
          {item.progress_pct > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted-foreground">Progress</span>
                <span className="font-semibold tabular-nums">{item.progress_pct}%</span>
              </div>
              <Progress value={item.progress_pct} className="h-2" />
            </div>
          )}

          {/* Target window */}
          {item.target_window && (
            <DetailRow icon={Calendar} label="Target Window">
              {item.target_window}
            </DetailRow>
          )}

          {/* Problem statement */}
          {item.problem_statement && (
            <DetailRow icon={Target} label="Problem Statement">
              {item.problem_statement}
            </DetailRow>
          )}

          {/* Intended outcome */}
          {item.intended_outcome && (
            <DetailRow icon={TrendingUp} label="Intended Outcome">
              {item.intended_outcome}
            </DetailRow>
          )}

          {/* Who benefits */}
          {item.who_benefits && (
            <DetailRow icon={Users} label="Who Benefits">
              {item.who_benefits}
            </DetailRow>
          )}

          {/* Dependencies */}
          {item.dependencies && (
            <DetailRow icon={Link2} label="Dependencies">
              {item.dependencies}
            </DetailRow>
          )}

          {/* Release notes */}
          {item.release_notes && (
            <DetailRow icon={FileText} label="Release Notes">
              {item.release_notes}
            </DetailRow>
          )}

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Tags
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CardDetailDrawer;
