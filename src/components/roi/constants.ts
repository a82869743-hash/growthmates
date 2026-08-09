/** Country-specific defaults */
export const COUNTRY_DEFAULTS = {
  USA: {
    hourlyRate: 28,
    currency: "USD",
    currencySymbol: "$",
  },
  Australia: {
    hourlyRate: 35,
    currency: "AUD",
    currencySymbol: "$",
  },
} as const;

/** Pain point labels for UI */
export const PAIN_POINT_LABELS: Record<string, string> = {
  dataEntryErrors: "Manual data entry errors",
  invoiceDisputes: "Invoice disputes",
  delayedInvoicing: "Delayed invoicing",
  poorVisibility: "Poor shipment visibility",
  highAdminWorkload: "High admin workload",
  slowReporting: "Slow reporting / lack of insights",
};

/** System options for UI */
export const SYSTEM_OPTIONS: Record<string, string> = {
  tms: "TMS (TruckMate / other)",
  xero: "Xero",
  quickbooks: "QuickBooks",
  myob: "MYOB",
  excel: "Excel / Email / PDFs",
  other: "Other",
};

/**
 * Hidden benchmarks — conservative, data-driven assumptions.
 * These are NEVER exposed to the UI directly.
 */
export const BENCHMARKS = {
  /** AI agents reduce admin workload by 30–45% */
  adminReductionMin: 0.30,
  adminReductionMax: 0.45,

  /** Invoice processing time reduced by 40–60% */
  invoiceReductionMin: 0.40,
  invoiceReductionMax: 0.60,

  /** Error rates reduced by 50–70% */
  errorReductionMin: 0.50,
  errorReductionMax: 0.70,

  /** Faster invoicing improves cash flow by 5–10 days */
  cashFlowImprovementMinDays: 5,
  cashFlowImprovementMaxDays: 10,

  /** Weeks per month for converting weekly → monthly */
  weeksPerMonth: 4.33,

  /** Platform cost model (hidden) */
  platformBaseMonthly: 800,
  platformPerTruck: 12,
  platformPerOrderBatch: 0.15, // per order processed
  platformCloudBuffer: 150,    // cloud + AI usage buffer

  /** Setup / onboarding cost (one-time, amortised over 6 months) */
  setupCost: 2500,
} as const;
