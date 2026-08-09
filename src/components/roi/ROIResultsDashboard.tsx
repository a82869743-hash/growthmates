import { DollarSign, Clock, TrendingUp, CalendarCheck, ArrowRight, Download, MessageSquare, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import type { ROIResults, BusinessProfile } from "./types";

interface Props {
  results: ROIResults;
  business: BusinessProfile;
}

const formatCurrency = (val: number, symbol = "$") => `${symbol}${Math.abs(val).toLocaleString()}`;

const ROIResultsDashboard = ({ results, business }: Props) => {
  const currSymbol = business.country === "Australia" ? "A$" : "$";

  const breakEvenText =
    results.breakEvenMonths <= 0
      ? "< 1 month"
      : results.breakEvenMonths >= 24
      ? "24+ months"
      : `${results.breakEvenMonths} month${results.breakEvenMonths > 1 ? "s" : ""}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-signal-warm-dim text-signal-warm">
          <Zap className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-extrabold text-fg-default font-display sm:text-3xl">
          Estimated Operational ROI Results
        </h2>
        <p className="mt-1 text-xs text-fg-dim">
          Based on {business.fleetSize} vehicles &amp; {business.monthlyOrders.toLocaleString()} monthly loads
        </p>
      </div>

      {/* Full-width Stat Rows (SpotlightFeatures pattern) */}
      <div className="space-y-4">
        {/* Stat Row 1 */}
        <div className="rounded-md bg-bg-surface border border-border-subtle p-6 shadow-flat flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono font-semibold uppercase text-accent tracking-wider">MONTHLY SAVINGS</span>
            <div className="text-4xl font-extrabold text-fg-default font-display mt-1">
              {results.monthlyCostSavings > 0 ? formatCurrency(results.monthlyCostSavings, currSymbol) : `${currSymbol}0`}
            </div>
          </div>
          <p className="text-xs text-fg-dim max-w-md text-left md:text-right">
            Direct operational cost reduction achieved through automated order entry, freight tracking, and rate quoting workflows.
          </p>
        </div>

        {/* Stat Row 2 */}
        <div className="rounded-md bg-bg-surface border border-border-subtle p-6 shadow-flat flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono font-semibold uppercase text-accent tracking-wider">TIME SAVED</span>
            <div className="text-4xl font-extrabold text-fg-default font-display mt-1">
              {results.hoursSavedPerMonth} hrs / mo
            </div>
          </div>
          <p className="text-xs text-fg-dim max-w-md text-left md:text-right">
            Manual administrative workload eliminated and redirected to high-margin logistics and customer growth activities.
          </p>
        </div>

        {/* Stat Row 3 */}
        <div className="rounded-md bg-bg-surface border border-border-subtle p-6 shadow-flat flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono font-semibold uppercase text-accent tracking-wider">NET BENEFIT</span>
            <div className="text-4xl font-extrabold text-fg-default font-display mt-1">
              {results.netMonthlyBenefit > 0 ? formatCurrency(results.netMonthlyBenefit, currSymbol) : `${currSymbol}0`}
            </div>
          </div>
          <p className="text-xs text-fg-dim max-w-md text-left md:text-right">
            Net monthly cash benefit calculated after accounting for platform subscription costs and system overhead.
          </p>
        </div>

        {/* Stat Row 4 */}
        <div className="rounded-md bg-bg-surface border border-border-subtle p-6 shadow-flat flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono font-semibold uppercase text-accent tracking-wider">BREAK-EVEN PERIOD</span>
            <div className="text-4xl font-extrabold text-fg-default font-display mt-1">
              {breakEvenText}
            </div>
          </div>
          <p className="text-xs text-fg-dim max-w-md text-left md:text-right">
            Estimated timeframe required to fully recoup investment and begin realizing net operational profit.
          </p>
        </div>
      </div>

      {/* Insight Callout */}
      <div className="rounded-md bg-accent-dim border border-accent/30 p-5 text-xs text-fg-default leading-relaxed font-sans">
        <p>
          <strong>Summary Executive Insight:</strong> For a fleet size of <strong>{business.fleetSize} vehicles</strong> processing <strong>{business.monthlyOrders.toLocaleString()} loads per month</strong>, AI automation delivers a 3-month projected ROI of <strong>{results.roi3Months}%</strong> and a 6-month projected ROI of <strong>{results.roi6Months}%</strong>.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <Link to="/contact" className="flex-1">
          <button className="w-full rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white hover:opacity-90 flex items-center justify-center gap-2 shadow-flat">
            Get Personalised Walkthrough <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
        <Link to="/contact" className="flex-1">
          <button className="w-full rounded-full bg-bg-muted border border-border-subtle px-6 py-3.5 text-sm font-semibold text-fg-default hover:bg-bg-surface flex items-center justify-center gap-2">
            <MessageSquare className="h-4 w-4" /> Speak with Solution Engineer
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ROIResultsDashboard;
