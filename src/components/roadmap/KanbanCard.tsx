import type { RoadmapItem } from "./types";
import { INDUSTRY_LABELS, PRIORITY_LABELS, type IndustryTag } from "./types";

interface Props {
  item: RoadmapItem;
  onClick: () => void;
}

const priorityColors: Record<string, string> = {
  p1: "bg-signal-warm-dim text-signal-warm border-signal-warm/30",
  p2: "bg-accent-dim text-accent border-accent/30",
  p3: "bg-bg-muted text-fg-dim border-border-subtle",
};

// Distinct flat tag colors: Transportation -> --accent, Retail -> --signal-warm
const industryTagStyles: Record<string, string> = {
  transportation: "bg-accent-dim text-accent border-accent/30 font-semibold",
  retail: "bg-signal-warm-dim text-signal-warm border-signal-warm/30 font-semibold",
  agriculture: "bg-bg-muted text-fg-dim border-border-subtle font-semibold",
};

const KanbanCard = ({ item, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-md border border-border-subtle bg-bg-surface p-4 shadow-flat transition-all hover:shadow-raised hover:border-accent/40 cursor-pointer group font-sans"
    >
      {/* Industry + Priority tags */}
      <div className="flex flex-wrap gap-1.5 mb-2.5">
        {item.industries.map((ind) => (
          <span
            key={ind}
            className={`text-[10px] px-2 py-0.5 rounded border ${
              industryTagStyles[ind] || "bg-bg-muted text-fg-dim border-border-subtle"
            }`}
          >
            {INDUSTRY_LABELS[ind as IndustryTag] || ind}
          </span>
        ))}
        <span
          className={`text-[10px] px-2 py-0.5 rounded border ${
            priorityColors[item.priority] || "bg-bg-muted text-fg-dim border-border-subtle"
          }`}
        >
          {PRIORITY_LABELS[item.priority]}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-xs font-bold text-fg-default font-display group-hover:text-accent transition-colors line-clamp-2">
        {item.title}
      </h4>

      {/* Description */}
      {item.description && (
        <p className="mt-1 text-xs text-fg-dim line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      )}

      {/* Bottom row */}
      <div className="mt-3 flex items-center justify-between">
        {item.target_window && (
          <span className="text-[10px] text-fg-dimmer bg-bg-muted px-2 py-0.5 rounded font-mono">
            {item.target_window}
          </span>
        )}
        {item.progress_pct > 0 && (
          <div className="flex items-center gap-2 flex-1 ml-2">
            <div className="h-1.5 flex-1 bg-bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full"
                style={{ width: `${item.progress_pct}%` }}
              />
            </div>
            <span className="text-[10px] text-fg-dim font-mono">
              {item.progress_pct}%
            </span>
          </div>
        )}
      </div>
    </button>
  );
};

export default KanbanCard;
