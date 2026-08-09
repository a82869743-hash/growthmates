import { useMemo } from "react";
import type { ROIInputs, ROIResults } from "./types";
import { BENCHMARKS } from "./constants";

/**
 * Background ROI calculation hook.
 * All pricing/benchmark assumptions are hidden from the UI.
 */
export function useROICalculations(inputs: ROIInputs): ROIResults {
  return useMemo(() => {
    const { business, operations, automation } = inputs;
    const b = BENCHMARKS;

    // ── Current state ──────────────────────────────────────────
    const totalStaff =
      operations.staff.orderEntry +
      operations.staff.invoicing +
      operations.staff.reconciliation +
      operations.staff.customerQueries;

    const totalWeeklyHours =
      operations.weeklyHours.manualOrderEntry +
      operations.weeklyHours.invoiceProcessing +
      operations.weeklyHours.trackingUpdates +
      operations.weeklyHours.dataReconciliation;

    const monthlyAdminCostNow =
      totalWeeklyHours * operations.hourlyRate * b.weeksPerMonth;

    const monthlyHoursNow = totalWeeklyHours * b.weeksPerMonth;

    // ── Automation impact (scaled by willingness) ──────────────
    const willingness = automation.willingnessPercent / 100;

    // Use midpoint of benchmark ranges, scaled by willingness
    const adminReduction =
      ((b.adminReductionMin + b.adminReductionMax) / 2) * willingness;

    const invoiceReduction =
      ((b.invoiceReductionMin + b.invoiceReductionMax) / 2) * willingness;

    const errorReduction =
      ((b.errorReductionMin + b.errorReductionMax) / 2) * willingness;

    const cashFlowDays =
      ((b.cashFlowImprovementMinDays + b.cashFlowImprovementMaxDays) / 2) *
      willingness;

    // Pain-point bonus: more pain points = slightly better ROI
    const painBonus = 1 + inputs.painPoints.length * 0.015; // up to ~9% bonus

    const effectiveReduction = Math.min(adminReduction * painBonus, 0.55);

    // ── After automation ───────────────────────────────────────
    const monthlyAdminCostAfter =
      monthlyAdminCostNow * (1 - effectiveReduction);

    const monthlyCostSavings = monthlyAdminCostNow - monthlyAdminCostAfter;

    const hoursSavedPerMonth = Math.round(
      monthlyHoursNow * effectiveReduction
    );

    // ── Hidden platform cost ───────────────────────────────────
    const platformMonthly =
      b.platformBaseMonthly +
      business.fleetSize * b.platformPerTruck +
      business.monthlyOrders * b.platformPerOrderBatch +
      b.platformCloudBuffer;

    const setupAmortised = b.setupCost / 6;

    const totalPlatformMonthly = platformMonthly + setupAmortised;

    // ── Net benefit ────────────────────────────────────────────
    const netMonthlyBenefit = monthlyCostSavings - totalPlatformMonthly;

    // Break-even: months until cumulative net benefit > 0
    // Account for setup cost in month 1
    let breakEvenMonths = 0;
    let cumulative = -b.setupCost;
    for (let m = 1; m <= 24; m++) {
      cumulative += monthlyCostSavings - platformMonthly;
      if (cumulative >= 0) {
        breakEvenMonths = m;
        break;
      }
    }
    if (breakEvenMonths === 0 && cumulative < 0) {
      breakEvenMonths = 24; // cap at 24 months
    }

    // ROI at milestones
    const totalInvestment3 = b.setupCost + platformMonthly * 3;
    const totalSavings3 = monthlyCostSavings * 3;
    const roi3Months =
      totalInvestment3 > 0
        ? Math.round(((totalSavings3 - totalInvestment3) / totalInvestment3) * 100)
        : 0;

    const totalInvestment6 = b.setupCost + platformMonthly * 6;
    const totalSavings6 = monthlyCostSavings * 6;
    const roi6Months =
      totalInvestment6 > 0
        ? Math.round(((totalSavings6 - totalInvestment6) / totalInvestment6) * 100)
        : 0;

    return {
      monthlyAdminCostNow: Math.round(monthlyAdminCostNow),
      monthlyAdminCostAfter: Math.round(monthlyAdminCostAfter),
      monthlyCostSavings: Math.round(monthlyCostSavings),
      hoursSavedPerMonth,
      netMonthlyBenefit: Math.round(netMonthlyBenefit),
      breakEvenMonths,
      roi3Months,
      roi6Months,
      cashFlowImprovement: Math.round(cashFlowDays),
      errorReductionPercent: Math.round(errorReduction * 100),
    };
  }, [inputs]);
}
