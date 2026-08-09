import type { RoadmapItem, RoadmapStatus } from "./types";
import { ROADMAP_STATUS_LABELS, KANBAN_COLUMNS } from "./types";
import KanbanCard from "./KanbanCard";

interface Props {
  items: RoadmapItem[];
  onCardClick: (item: RoadmapItem) => void;
}

const columnColors: Record<RoadmapStatus, string> = {
  under_review: "border-t-muted-foreground/40",
  planned: "border-t-primary/60",
  in_progress: "border-t-accent-orange/60",
  in_beta: "border-t-secondary/60",
  shipped: "border-t-primary",
};

const KanbanBoard = ({ items, onCardClick }: Props) => {
  const columns = KANBAN_COLUMNS.map((status) => ({
    status,
    label: ROADMAP_STATUS_LABELS[status],
    items: items.filter((i) => i.status === status),
  }));

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      {columns.map((col) => (
        <div key={col.status} className="space-y-3">
          {/* Column header */}
          <div
            className={`rounded-lg border-t-[3px] bg-muted/40 px-3 py-2.5 ${columnColors[col.status]}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">
                {col.label}
              </h3>
              <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-2 py-0.5 tabular-nums">
                {col.items.length}
              </span>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-3 min-h-[120px]">
            {col.items.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-4 text-center">
                <p className="text-xs text-muted-foreground">
                  No items match your filters
                </p>
              </div>
            ) : (
              col.items.map((item) => (
                <KanbanCard
                  key={item.id}
                  item={item}
                  onClick={() => onCardClick(item)}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
