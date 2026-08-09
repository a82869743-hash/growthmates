import { useState } from "react";
import { ChevronUp, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Idea, Comment } from "./types";
import { IDEA_STATUS_LABELS, INDUSTRY_LABELS, type IndustryTag, type IdeaStatus } from "./types";

const statusColors: Record<IdeaStatus, string> = {
  new: "bg-muted text-muted-foreground",
  under_review: "bg-primary/10 text-primary",
  accepted: "bg-secondary/10 text-secondary",
  not_now: "bg-muted text-muted-foreground",
  duplicate: "bg-muted text-muted-foreground",
  shipped: "bg-primary text-primary-foreground",
};

interface Props {
  ideas: Idea[];
  comments: Comment[];
  onVote: (ideaId: string) => void;
  onCommentSubmit: (ideaId: string, body: string, email: string) => void;
  votedIdeaIds: Set<string>;
}

const IdeasList = ({ ideas, comments, onVote, onCommentSubmit, votedIdeaIds }: Props) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [commentEmail, setCommentEmail] = useState("");

  const handleComment = (ideaId: string) => {
    if (!commentText.trim() || !commentEmail.trim()) return;
    onCommentSubmit(ideaId, commentText.trim(), commentEmail.trim());
    setCommentText("");
  };

  return (
    <div className="space-y-3">
      {ideas.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">No ideas match your filters.</p>
        </div>
      )}

      {ideas.map((idea) => {
        const ideaComments = comments.filter((c) => c.idea_id === idea.id);
        const isExpanded = expandedId === idea.id;

        return (
          <div
            key={idea.id}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            <div className="flex gap-3 p-4">
              {/* Vote button */}
              <div className="flex flex-col items-center gap-0.5">
                <Button
                  variant={votedIdeaIds.has(idea.id) ? "default" : "outline"}
                  size="icon"
                  className="h-10 w-10 rounded-lg"
                  onClick={() => onVote(idea.id)}
                  disabled={votedIdeaIds.has(idea.id)}
                >
                  <ChevronUp className="h-5 w-5" />
                </Button>
                <span className="text-xs font-semibold tabular-nums text-foreground">
                  {idea.votes_count}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold text-foreground line-clamp-1">
                    {idea.title}
                  </h4>
                  <Badge
                    variant="secondary"
                    className={`text-[10px] shrink-0 ${statusColors[idea.status]}`}
                  >
                    {IDEA_STATUS_LABELS[idea.status]}
                  </Badge>
                </div>

                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {idea.description}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {idea.industries.map((ind) => (
                    <Badge
                      key={ind}
                      variant="outline"
                      className="text-[10px] px-1.5 py-0"
                    >
                      {INDUSTRY_LABELS[ind as IndustryTag] || ind}
                    </Badge>
                  ))}
                  {idea.company_name && (
                    <span className="text-[10px] text-muted-foreground">
                      by {idea.company_name}
                    </span>
                  )}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : idea.id)}
                    className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <MessageSquare className="h-3 w-3" />
                    {ideaComments.length} comment{ideaComments.length !== 1 ? "s" : ""}
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded comments section */}
            {isExpanded && (
              <div className="border-t border-border bg-muted/30 px-4 py-3 space-y-3">
                {idea.admin_note && (
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                    <p className="text-[10px] font-semibold text-primary uppercase tracking-wide mb-1">
                      Team Response
                    </p>
                    <p className="text-xs text-foreground">{idea.admin_note}</p>
                  </div>
                )}

                {ideaComments.map((c) => (
                  <div key={c.id} className="text-xs">
                    <span className="font-medium text-foreground">
                      {c.author_id ? `User ${c.author_id}` : "Anonymous"}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      {new Date(c.created_at).toLocaleDateString()}
                    </span>
                    <p className="mt-0.5 text-muted-foreground">{c.body}</p>
                  </div>
                ))}

                {/* Add comment */}
                <div className="flex gap-2">
                  <Input
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    placeholder="Your email"
                    type="email"
                    className="text-xs h-8 w-40"
                  />
                  <Input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment…"
                    className="text-xs h-8 flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleComment(idea.id);
                    }}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs"
                    onClick={() => handleComment(idea.id)}
                    disabled={!commentText.trim() || !commentEmail.trim()}
                  >
                    Post
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default IdeasList;
