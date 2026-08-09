import { useState } from "react";
import {
  Shield,
  Edit3,
  ArrowRightLeft,
  Trash2,
  Download,
  FileText,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type {
  Idea,
  RoadmapItem,
  IdeaStatus,
  RoadmapStatus,
  PriorityLevel,
  IndustryTag,
} from "./types";
import {
  IDEA_STATUS_LABELS,
  ROADMAP_STATUS_LABELS,
  PRIORITY_LABELS,
  INDUSTRY_LABELS,
  ALL_TAGS,
} from "./types";

interface Props {
  ideas: Idea[];
  roadmapItems: RoadmapItem[];
  onRefresh: () => void;
}

const AdminPanel = ({ ideas, roadmapItems, onRefresh }: Props) => {
  const { toast } = useToast();
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [editingItem, setEditingItem] = useState<RoadmapItem | null>(null);
  const [convertingIdea, setConvertingIdea] = useState<Idea | null>(null);

  // Convert form state
  const [convertForm, setConvertForm] = useState({
    title: "",
    description: "",
    priority: "p2" as PriorityLevel,
    status: "planned" as RoadmapStatus,
    target_window: "",
  });

  const updateIdeaStatus = async (id: string, status: IdeaStatus, adminNote?: string) => {
    const updateData: Record<string, unknown> = { status };
    if (adminNote !== undefined) updateData.admin_note = adminNote;
    
    const { error } = await supabase
      .from("ideas")
      .update(updateData)
      .eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Idea updated" });
      onRefresh();
    }
  };

  const updateRoadmapItem = async (id: string, updates: Partial<RoadmapItem>) => {
    const { error } = await supabase
      .from("roadmap_items")
      .update(updates)
      .eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Item updated" });
      setEditingItem(null);
      onRefresh();
    }
  };

  const convertIdeaToRoadmapItem = async () => {
    if (!convertingIdea) return;
    const { data, error } = await supabase
      .from("roadmap_items")
      .insert({
        title: convertForm.title || convertingIdea.title,
        description: convertForm.description || convertingIdea.description,
        problem_statement: convertingIdea.description,
        intended_outcome: convertingIdea.success_criteria,
        industries: convertingIdea.industries,
        tags: convertingIdea.tags,
        priority: convertForm.priority,
        status: convertForm.status,
        target_window: convertForm.target_window || null,
        linked_idea_id: convertingIdea.id,
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    // Update the idea to link back
    await supabase
      .from("ideas")
      .update({ status: "accepted" as IdeaStatus, linked_roadmap_id: data.id })
      .eq("id", convertingIdea.id);

    toast({ title: "Idea converted to roadmap item!" });
    setConvertingIdea(null);
    onRefresh();
  };

  const exportCSV = () => {
    const headers = ["Title", "Status", "Priority", "Industries", "Target Window", "Progress"];
    const rows = roadmapItems.map((i) => [
      i.title,
      ROADMAP_STATUS_LABELS[i.status],
      PRIORITY_LABELS[i.priority],
      i.industries.map((ind) => INDUSTRY_LABELS[ind as IndustryTag]).join("; "),
      i.target_window || "",
      `${i.progress_pct}%`,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "roadmap-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Shield className="h-4 w-4" />
            Admin
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto sm:max-w-xl">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Admin Panel
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6 mt-4 pb-8">
            {/* Export */}
            <Button variant="outline" size="sm" className="gap-2" onClick={exportCSV}>
              <Download className="h-4 w-4" />
              Export Roadmap CSV
            </Button>

            {/* Ideas management */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Ideas ({ideas.length})
              </h3>
              <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                {ideas.map((idea) => (
                  <div
                    key={idea.id}
                    className="rounded-lg border border-border p-3 text-xs space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-foreground">{idea.title}</span>
                      <Badge variant="secondary" className="text-[10px] shrink-0">
                        {IDEA_STATUS_LABELS[idea.status]}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground line-clamp-1">{idea.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      <Select
                        value={idea.status}
                        onValueChange={(v) => updateIdeaStatus(idea.id, v as IdeaStatus)}
                      >
                        <SelectTrigger className="h-7 w-[130px] text-[10px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(IDEA_STATUS_LABELS) as IdeaStatus[]).map((s) => (
                            <SelectItem key={s} value={s} className="text-xs">
                              {IDEA_STATUS_LABELS[s]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-[10px] gap-1"
                        onClick={() => {
                          setConvertingIdea(idea);
                          setConvertForm({
                            title: idea.title,
                            description: idea.description,
                            priority: "p2",
                            status: "planned",
                            target_window: "",
                          });
                        }}
                      >
                        <ArrowRightLeft className="h-3 w-3" />
                        Convert
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Roadmap items management */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Roadmap Items ({roadmapItems.length})
              </h3>
              <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                {roadmapItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-border p-3 text-xs space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-foreground">{item.title}</span>
                      <Badge variant="secondary" className="text-[10px] shrink-0">
                        {ROADMAP_STATUS_LABELS[item.status]}
                      </Badge>
                    </div>
                    <div className="flex gap-1.5">
                      <Select
                        value={item.status}
                        onValueChange={(v) =>
                          updateRoadmapItem(item.id, { status: v as RoadmapStatus })
                        }
                      >
                        <SelectTrigger className="h-7 w-[130px] text-[10px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(ROADMAP_STATUS_LABELS) as RoadmapStatus[]).map((s) => (
                            <SelectItem key={s} value={s} className="text-xs">
                              {ROADMAP_STATUS_LABELS[s]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={item.priority}
                        onValueChange={(v) =>
                          updateRoadmapItem(item.id, { priority: v as PriorityLevel })
                        }
                      >
                        <SelectTrigger className="h-7 w-[80px] text-[10px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(PRIORITY_LABELS) as PriorityLevel[]).map((p) => (
                            <SelectItem key={p} value={p} className="text-xs">
                              {PRIORITY_LABELS[p]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Convert idea dialog */}
      <Dialog open={!!convertingIdea} onOpenChange={(v) => !v && setConvertingIdea(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convert Idea to Development Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label className="text-sm">Title</Label>
              <Input
                value={convertForm.title}
                onChange={(e) =>
                  setConvertForm((f) => ({ ...f, title: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Description</Label>
              <Textarea
                value={convertForm.description}
                onChange={(e) =>
                  setConvertForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm">Priority</Label>
                <Select
                  value={convertForm.priority}
                  onValueChange={(v) =>
                    setConvertForm((f) => ({ ...f, priority: v as PriorityLevel }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(PRIORITY_LABELS) as PriorityLevel[]).map((p) => (
                      <SelectItem key={p} value={p}>
                        {PRIORITY_LABELS[p]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Status</Label>
                <Select
                  value={convertForm.status}
                  onValueChange={(v) =>
                    setConvertForm((f) => ({ ...f, status: v as RoadmapStatus }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(ROADMAP_STATUS_LABELS) as RoadmapStatus[]).map((s) => (
                      <SelectItem key={s} value={s}>
                        {ROADMAP_STATUS_LABELS[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Target Window</Label>
              <Input
                value={convertForm.target_window}
                onChange={(e) =>
                  setConvertForm((f) => ({ ...f, target_window: e.target.value }))
                }
                placeholder="e.g. Q2 2026"
              />
            </div>
            <Button className="w-full gap-2" onClick={convertIdeaToRoadmapItem}>
              <ArrowRightLeft className="h-4 w-4" />
              Convert to Roadmap Item
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminPanel;
