import { Truck, Package, DollarSign, Globe } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import type { BusinessProfile } from "./types";
import { COUNTRY_DEFAULTS } from "./constants";

interface Props {
  data: BusinessProfile;
  onChange: (data: BusinessProfile) => void;
}

function Tip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="ml-1.5 inline h-3.5 w-3.5 text-muted-foreground/60 cursor-help" />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[240px] text-xs">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

const BusinessProfileSection = ({ data, onChange }: Props) => {
  const update = (patch: Partial<BusinessProfile>) =>
    onChange({ ...data, ...patch });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Truck className="h-4.5 w-4.5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Business Profile</h3>
          <p className="text-xs text-muted-foreground">
            Tell us about your fleet and operations
          </p>
        </div>
      </div>

      {/* Fleet size */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm">
            Number of trucks
            <Tip text="Include all active trucks in your fleet, owned and leased." />
          </Label>
          <span className="rounded-md bg-muted px-3 py-1 text-sm font-semibold tabular-nums">
            {data.fleetSize}
          </span>
        </div>
        <Slider
          min={5}
          max={500}
          step={1}
          value={[data.fleetSize]}
          onValueChange={([v]) => update({ fleetSize: v })}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>5</span>
          <span>500</span>
        </div>
      </div>

      {/* Monthly orders */}
      <div className="space-y-2">
        <Label className="text-sm">
          Monthly orders / loads processed
          <Tip text="Total number of freight orders or loads your operation handles each month." />
        </Label>
        <Input
          type="number"
          min={0}
          value={data.monthlyOrders || ""}
          onChange={(e) =>
            update({ monthlyOrders: Math.max(0, Number(e.target.value)) })
          }
          placeholder="e.g. 800"
          className="tabular-nums"
        />
      </div>

      {/* Average revenue per load */}
      <div className="space-y-2">
        <Label className="text-sm">
          Average revenue per load{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
          <Tip text="Helps estimate cash-flow improvements from faster invoicing." />
        </Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="number"
            min={0}
            value={data.avgRevenuePerLoad || ""}
            onChange={(e) =>
              update({ avgRevenuePerLoad: Math.max(0, Number(e.target.value)) })
            }
            placeholder="e.g. 2500"
            className="pl-9 tabular-nums"
          />
        </div>
      </div>

      {/* Country */}
      <div className="space-y-2">
        <Label className="text-sm">
          Country
          <Tip text="Used to set default hourly rates and currency." />
        </Label>
        <Select
          value={data.country}
          onValueChange={(v) =>
            update({ country: v as BusinessProfile["country"] })
          }
        >
          <SelectTrigger>
            <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USA">United States (USD)</SelectItem>
            <SelectItem value="Australia">Australia (AUD)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BusinessProfileSection;
