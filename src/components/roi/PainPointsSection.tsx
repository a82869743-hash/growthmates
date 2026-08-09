import { AlertTriangle, HelpCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { PainPoint } from "./types";
import { PAIN_POINT_LABELS } from "./constants";

interface Props {
  selected: PainPoint[];
  onChange: (selected: PainPoint[]) => void;
}

const PAIN_POINT_TIPS: Record<PainPoint, string> = {
  dataEntryErrors:
    "Frequent typos, wrong addresses, or missed details when manually entering orders.",
  invoiceDisputes:
    "Customers regularly query or dispute invoices due to inaccurate charges.",
  delayedInvoicing:
    "Invoices take too long to create after delivery, hurting cash flow.",
  poorVisibility:
    "Lack of real-time tracking info leads to constant status calls.",
  highAdminWorkload:
    "Admin staff are stretched thin handling repetitive operational tasks.",
  slowReporting:
    "Management reports take too long to produce or lack actionable insights.",
};

const PainPointsSection = ({ selected, onChange }: Props) => {
  const toggle = (point: PainPoint) => {
    onChange(
      selected.includes(point)
        ? selected.filter((p) => p !== point)
        : [...selected, point]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10">
          <AlertTriangle className="h-4.5 w-4.5 text-destructive" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Current Pain Points</h3>
          <p className="text-xs text-muted-foreground">
            Select all that apply to your operations
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {(Object.keys(PAIN_POINT_LABELS) as PainPoint[]).map((key) => (
          <label
            key={key}
            className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 cursor-pointer transition-colors hover:bg-muted/40 has-[[data-state=checked]]:border-primary/40 has-[[data-state=checked]]:bg-primary/5"
          >
            <Checkbox
              checked={selected.includes(key)}
              onCheckedChange={() => toggle(key)}
              className="mt-0.5"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-foreground">
                {PAIN_POINT_LABELS[key]}
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="ml-1.5 inline h-3.5 w-3.5 text-muted-foreground/60 cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[240px] text-xs">
                  {PAIN_POINT_TIPS[key]}
                </TooltipContent>
              </Tooltip>
            </div>
          </label>
        ))}
      </div>

      {selected.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {selected.length} pain point{selected.length > 1 ? "s" : ""} selected — this helps us tailor your ROI estimate.
        </p>
      )}
    </div>
  );
};

export default PainPointsSection;
