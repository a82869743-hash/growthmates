import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  author_name: string;
  tags: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const empty: Omit<BlogPost, "id" | "created_at" | "updated_at"> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image_url: null,
  author_name: "GrowthMates Team",
  tags: [],
  published: false,
  published_at: null,
};

const BlogAdmin = () => {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<BlogPost | typeof empty | null>(null);
  const [tagInput, setTagInput] = useState("");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (post: typeof empty & { id?: string }) => {
      const payload = {
        ...post,
        published_at: post.published ? post.published_at || new Date().toISOString() : null,
      };
      if ("id" in post && post.id) {
        const { error } = await supabase
          .from("blog_posts")
          .update(payload)
          .eq("id", post.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
      setEditing(null);
      toast({ title: "Post saved" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast({ title: "Post deleted" });
    },
  });

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const addTag = () => {
    if (tagInput.trim() && editing) {
      setEditing({ ...editing, tags: [...(editing.tags || []), tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    if (editing) {
      setEditing({ ...editing, tags: editing.tags.filter((_, i) => i !== index) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Blog Posts</h2>
        <Button size="sm" className="gap-2" onClick={() => setEditing({ ...empty })}>
          <Plus className="h-4 w-4" /> New Post
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : (
        <div className="space-y-3">
          {posts?.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{post.title}</h3>
                  {post.published ? (
                    <Badge variant="default" className="text-xs"><Eye className="mr-1 h-3 w-3" />Live</Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs"><EyeOff className="mr-1 h-3 w-3" />Draft</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">/blog/{post.slug}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button size="icon" variant="ghost" onClick={() => setEditing(post)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => {
                    if (confirm("Delete this post?")) deleteMutation.mutate(post.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {!posts?.length && (
            <p className="text-sm text-muted-foreground text-center py-8">No posts yet.</p>
          )}
        </div>
      )}

      {/* Editor dialog */}
      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{"id" in (editing || {}) ? "Edit Post" : "New Post"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={editing.title}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      title: e.target.value,
                      slug: !("id" in editing) ? generateSlug(e.target.value) : editing.slug,
                    })
                  }
                />
              </div>
              <div>
                <Label>Slug</Label>
                <Input
                  value={editing.slug}
                  onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                />
              </div>
              <div>
                <Label>Excerpt</Label>
                <Textarea
                  rows={2}
                  value={editing.excerpt}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                />
              </div>
              <div>
                <Label>Content (Markdown)</Label>
                <Textarea
                  rows={12}
                  value={editing.content}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                  className="font-mono text-sm"
                />
              </div>
              <div>
                <Label>Cover Image URL</Label>
                <Input
                  value={editing.cover_image_url || ""}
                  onChange={(e) => setEditing({ ...editing, cover_image_url: e.target.value || null })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label>Author</Label>
                <Input
                  value={editing.author_name}
                  onChange={(e) => setEditing({ ...editing, author_name: e.target.value })}
                />
              </div>
              <div>
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    placeholder="Add a tag..."
                  />
                  <Button type="button" variant="outline" size="sm" onClick={addTag}>
                    Add
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {editing.tags?.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeTag(i)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={editing.published}
                  onCheckedChange={(checked) => setEditing({ ...editing, published: checked })}
                />
                <Label>Published</Label>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setEditing(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => saveMutation.mutate(editing as any)}
                  disabled={!editing.title || !editing.slug || saveMutation.isPending}
                >
                  {saveMutation.isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogAdmin;
