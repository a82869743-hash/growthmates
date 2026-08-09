export interface BusinessProfile {
  fleetSize: number;
  monthlyOrders: number;
  avgRevenuePerLoad: number;
  country: "USA" | "Australia";
}

export interface StaffCounts {
  orderEntry: number;
  invoicing: number;
  reconciliation: number;
  customerQueries: number;
}

export interface WeeklyHours {
  manualOrderEntry: number;
  invoiceProcessing: number;
  trackingUpdates: number;
  dataReconciliation: number;
}

export interface OperationsProfile {
  staff: StaffCounts;
  hourlyRate: number;
  weeklyHours: WeeklyHours;
}

export type PainPoint =
  | "dataEntryErrors"
  | "invoiceDisputes"
  | "delayedInvoicing"
  | "poorVisibility"
  | "highAdminWorkload"
  | "slowReporting";

export type CurrentSystem =
  | "tms"
  | "xero"
  | "quickbooks"
  | "myob"
  | "excel"
  | "other";

export interface AutomationReadiness {
  currentSystems: CurrentSystem[];
  willingnessPercent: number;
}

export interface ROIInputs {
  business: BusinessProfile;
  operations: OperationsProfile;
  painPoints: PainPoint[];
  automation: AutomationReadiness;
}

export interface ROIResults {
  monthlyAdminCostNow: number;
  monthlyAdminCostAfter: number;
  monthlyCostSavings: number;
  hoursSavedPerMonth: number;
  netMonthlyBenefit: number;
  breakEvenMonths: number;
  roi3Months: number;
  roi6Months: number;
  cashFlowImprovement: number;
  errorReductionPercent: number;
}
