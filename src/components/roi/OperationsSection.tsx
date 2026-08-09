import { Users, Clock, DollarSign, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { OperationsProfile } from "./types";

interface Props {
  data: OperationsProfile;
  onChange: (data: OperationsProfile) => void;
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

function StaffInput({
  label,
  tip,
  value,
  onChange,
}: {
  label: string;
  tip: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label className="text-sm whitespace-nowrap">
        {label}
        <Tip text={tip} />
      </Label>
      <Input
        type="number"
        min={0}
        max={100}
        value={value || ""}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        className="w-20 text-center tabular-nums"
      />
    </div>
  );
}

function HoursInput({
  label,
  tip,
  value,
  onChange,
}: {
  label: string;
  tip: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label className="text-sm whitespace-nowrap">
        {label}
        <Tip text={tip} />
      </Label>
      <div className="flex items-center gap-1.5">
        <Input
          type="number"
          min={0}
          max={200}
          value={value || ""}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          className="w-20 text-center tabular-nums"
        />
        <span className="text-xs text-muted-foreground">hrs</span>
      </div>
    </div>
  );
}

const OperationsSection = ({ data, onChange }: Props) => {
  const updateStaff = (patch: Partial<typeof data.staff>) =>
    onChange({ ...data, staff: { ...data.staff, ...patch } });

  const updateHours = (patch: Partial<typeof data.weeklyHours>) =>
    onChange({ ...data, weeklyHours: { ...data.weeklyHours, ...patch } });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Users className="h-4.5 w-4.5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Operations & Admin Effort</h3>
          <p className="text-xs text-muted-foreground">
            How much manual effort goes into daily operations?
          </p>
        </div>
      </div>

      {/* Staff counts */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">
          Number of staff involved in:
        </p>
        <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
          <StaffInput
            label="Order entry"
            tip="Staff who manually enter or process incoming freight orders."
            value={data.staff.orderEntry}
            onChange={(v) => updateStaff({ orderEntry: v })}
          />
          <StaffInput
            label="Invoicing"
            tip="Staff responsible for creating and sending invoices."
            value={data.staff.invoicing}
            onChange={(v) => updateStaff({ invoicing: v })}
          />
          <StaffInput
            label="Reconciliation"
            tip="Staff who reconcile payments, PODs, and account data."
            value={data.staff.reconciliation}
            onChange={(v) => updateStaff({ reconciliation: v })}
          />
          <StaffInput
            label="Customer queries"
            tip="Staff handling tracking calls, ETAs, and status updates."
            value={data.staff.customerQueries}
            onChange={(v) => updateStaff({ customerQueries: v })}
          />
        </div>
      </div>

      {/* Hourly rate */}
      <div className="space-y-2">
        <Label className="text-sm">
          Average hourly cost per admin staff
          <Tip text="Includes wages, super/benefits, and overheads. Pre-filled based on your country." />
        </Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="number"
            min={10}
            max={200}
            value={data.hourlyRate || ""}
            onChange={(e) =>
              onChange({ ...data, hourlyRate: Math.max(10, Number(e.target.value)) })
            }
            className="pl-9 tabular-nums"
          />
        </div>
      </div>

      {/* Weekly hours */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">
          Estimated hours per week spent on:
        </p>
        <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
          <HoursInput
            label="Manual order entry"
            tip="Time spent keying in orders from emails, PDFs, or phone calls."
            value={data.weeklyHours.manualOrderEntry}
            onChange={(v) => updateHours({ manualOrderEntry: v })}
          />
          <HoursInput
            label="Invoice processing"
            tip="Time spent creating, reviewing, and sending invoices."
            value={data.weeklyHours.invoiceProcessing}
            onChange={(v) => updateHours({ invoiceProcessing: v })}
          />
          <HoursInput
            label="Tracking & updates"
            tip="Time spent on customer status calls, ETAs, and tracking."
            value={data.weeklyHours.trackingUpdates}
            onChange={(v) => updateHours({ trackingUpdates: v })}
          />
          <HoursInput
            label="Data reconciliation"
            tip="Time spent reconciling data across systems and generating reports."
            value={data.weeklyHours.dataReconciliation}
            onChange={(v) => updateHours({ dataReconciliation: v })}
          />
        </div>
      </div>
    </div>
  );
};

export default OperationsSection;
