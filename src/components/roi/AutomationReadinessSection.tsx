import { Settings, HelpCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { AutomationReadiness, CurrentSystem } from "./types";
import { SYSTEM_OPTIONS } from "./constants";

interface Props {
  data: AutomationReadiness;
  onChange: (data: AutomationReadiness) => void;
}

const AutomationReadinessSection = ({ data, onChange }: Props) => {
  const toggleSystem = (sys: CurrentSystem) => {
    const next = data.currentSystems.includes(sys)
      ? data.currentSystems.filter((s) => s !== sys)
      : [...data.currentSystems, sys];
    onChange({ ...data, currentSystems: next });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10">
          <Settings className="h-4.5 w-4.5 text-secondary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Automation Readiness</h3>
          <p className="text-xs text-muted-foreground">
            What systems do you use today?
          </p>
        </div>
      </div>

      {/* Current systems */}
      <div className="space-y-3">
        <Label className="text-sm">
          Current systems in use
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="ml-1.5 inline h-3.5 w-3.5 text-muted-foreground/60 cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[240px] text-xs">
              Select all software and tools currently used in your operations. This helps assess integration complexity.
            </TooltipContent>
          </Tooltip>
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(SYSTEM_OPTIONS) as CurrentSystem[]).map((key) => (
            <label
              key={key}
              className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 cursor-pointer transition-colors hover:bg-muted/40 has-[[data-state=checked]]:border-primary/40 has-[[data-state=checked]]:bg-primary/5"
            >
              <Checkbox
                checked={data.currentSystems.includes(key)}
                onCheckedChange={() => toggleSystem(key)}
              />
              <span className="text-sm text-foreground">
                {SYSTEM_OPTIONS[key]}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Willingness to automate */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm">
            Willingness to automate
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="ml-1.5 inline h-3.5 w-3.5 text-muted-foreground/60 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[240px] text-xs">
                How much of your current manual processes would you be comfortable automating? Higher = more aggressive ROI estimate.
              </TooltipContent>
            </Tooltip>
          </Label>
          <span className="rounded-md bg-muted px-3 py-1 text-sm font-semibold tabular-nums">
            {data.willingnessPercent}%
          </span>
        </div>
        <Slider
          min={20}
          max={100}
          step={5}
          value={[data.willingnessPercent]}
          onValueChange={([v]) =>
            onChange({ ...data, willingnessPercent: v })
          }
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Conservative (20%)</span>
          <span>Aggressive (100%)</span>
        </div>
      </div>
    </div>
  );
};

export default AutomationReadinessSection;
