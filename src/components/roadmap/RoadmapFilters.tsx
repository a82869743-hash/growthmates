import { Filter, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IndustryTag, RoadmapStatus } from "./types";
import { INDUSTRY_LABELS, ROADMAP_STATUS_LABELS, ALL_TAGS } from "./types";

interface Props {
  industry: IndustryTag | "all";
  status: RoadmapStatus | "all";
  selectedTags: string[];
  onIndustryChange: (v: IndustryTag | "all") => void;
  onStatusChange: (v: RoadmapStatus | "all") => void;
  onTagToggle: (tag: string) => void;
}

const RoadmapFilters = ({
  industry,
  status,
  selectedTags,
  onIndustryChange,
  onStatusChange,
  onTagToggle,
}: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filters:</span>
        </div>

        <Select
          value={industry}
          onValueChange={(v) => onIndustryChange(v as IndustryTag | "all")}
        >
          <SelectTrigger className="w-[160px] h-9 text-sm">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {(Object.keys(INDUSTRY_LABELS) as IndustryTag[]).map((key) => (
              <SelectItem key={key} value={key}>
                {INDUSTRY_LABELS[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={status}
          onValueChange={(v) => onStatusChange(v as RoadmapStatus | "all")}
        >
          <SelectTrigger className="w-[160px] h-9 text-sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {(Object.keys(ROADMAP_STATUS_LABELS) as RoadmapStatus[]).map((key) => (
              <SelectItem key={key} value={key}>
                {ROADMAP_STATUS_LABELS[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        {ALL_TAGS.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer text-xs transition-colors"
            onClick={() => onTagToggle(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default RoadmapFilters;
