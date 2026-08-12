const industryList = [
  "Transportation & Logistics",
  "Retail & E-Commerce",
  "Industrial Manufacturing",
  "Construction & Infrastructure",
  "Financial Services & Fintech",
  "Sustainable Energy & Utilities",
  "Enterprise Technology",
];

export const IndustryChips = () => {
  return (
    <div className="py-6">
      <div className="text-xs font-mono font-bold uppercase tracking-wider text-fg-dim mb-3 text-center sm:text-left">
        Serving Core Engineering Sectors
      </div>
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
        {industryList.map((ind) => (
          <span
            key={ind}
            className="px-3.5 py-1.5 rounded-full bg-bg-surface border border-border-subtle text-xs font-medium text-fg-default shadow-flat hover:border-accent/40 transition-colors"
          >
            {ind}
          </span>
        ))}
      </div>
    </div>
  );
};
