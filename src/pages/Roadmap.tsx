import { useState, useEffect, useCallback, useMemo } from "react";
import { Map, Lightbulb, LayoutGrid, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/landing/Navbar";
import RoadmapFilters from "@/components/roadmap/RoadmapFilters";
import KanbanBoard from "@/components/roadmap/KanbanBoard";
import CardDetailDrawer from "@/components/roadmap/CardDetailDrawer";
import IdeaSubmitForm from "@/components/roadmap/IdeaSubmitForm";
import IdeasList from "@/components/roadmap/IdeasList";
import AdminPanel from "@/components/roadmap/AdminPanel";
import AdminLoginDialog from "@/components/roadmap/AdminLoginDialog";
import AccessGate from "@/components/roadmap/AccessGate";
import type {
  RoadmapItem,
  Idea,
  Comment,
  IndustryTag,
  RoadmapStatus,
} from "@/components/roadmap/types";

const RoadmapPage = () => {
  const { toast } = useToast();
  const [hasAccess, setHasAccess] = useState(
    () => sessionStorage.getItem("roadmap_access") === "granted"
  );
  const [isAdmin, setIsAdmin] = useState(false);

  // Data
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [votedIdeaIds, setVotedIdeaIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Filters
  const [industry, setIndustry] = useState<IndustryTag | "all">("all");
  const [status, setStatus] = useState<RoadmapStatus | "all">("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Drawer
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Tab
  const [tab, setTab] = useState<string>("roadmap");

  // Check auth state on mount and listen for changes
  const checkAdminStatus = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      setIsAdmin(false);
      return false;
    }

    // Check admin role via user_roles table for the authenticated user
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();

    const hasAdmin = !!roleData;
    setIsAdmin(hasAdmin);
    return hasAdmin;
  }, []);

  useEffect(() => {
    // Set up auth state listener BEFORE checking session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setIsAdmin(false);
      } else {
        // Defer role check to avoid deadlock
        setTimeout(() => checkAdminStatus(), 0);
      }
    });

    checkAdminStatus();

    return () => subscription.unsubscribe();
  }, [checkAdminStatus]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch public data (sanitized views exclude personal emails)
      const [itemsRes, ideasRes, commentsRes] = await Promise.all([
        supabase.from("roadmap_items").select("*").order("created_at", { ascending: false }),
        supabase.from("ideas_public").select("*").order("votes_count", { ascending: false }),
        supabase.from("comments_public").select("*").order("created_at", { ascending: true }),
      ]);

      if (itemsRes.data) setRoadmapItems(itemsRes.data as unknown as RoadmapItem[]);
      if (ideasRes.data) setIdeas(ideasRes.data as unknown as Idea[]);
      if (commentsRes.data) setComments(commentsRes.data as unknown as Comment[]);

      // If admin, fetch full ideas via authenticated edge function
      const adminConfirmed = await checkAdminStatus();
      if (adminConfirmed) {
        try {
          const { data: adminData } = await supabase.functions.invoke("get-admin-ideas");
          if (adminData?.ideas) {
            setIdeas(adminData.ideas as unknown as Idea[]);
          }
        } catch (err) {
          console.warn("Admin ideas fetch failed, using public data:", err);
        }
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  }, [checkAdminStatus]);

  useEffect(() => {
    if (hasAccess) fetchData();
  }, [hasAccess, fetchData]);

  // Load voted ideas from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("roadmap_voted_ideas");
    if (stored) {
      try {
        setVotedIdeaIds(new Set(JSON.parse(stored)));
      } catch {}
    }
  }, []);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;

  const handleVote = async (ideaId: string) => {
    let voterEmail = localStorage.getItem("roadmap_voter_email");
    if (!voterEmail) {
      const entered = prompt("Enter your email to vote:");
      if (!entered?.trim()) return;
      voterEmail = entered.trim();
      if (!isValidEmail(voterEmail)) {
        toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
        return;
      }
      localStorage.setItem("roadmap_voter_email", voterEmail);
    }
    if (!isValidEmail(voterEmail)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    await doVote(ideaId, voterEmail);
  };

  const doVote = async (ideaId: string, email: string) => {
    const { error } = await supabase.from("idea_votes").insert({
      idea_id: ideaId,
      voter_email: email,
    });

    if (error) {
      if (error.code === "23505") {
        toast({ title: "Already voted", description: "You've already upvoted this idea." });
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
      return;
    }

    setVotedIdeaIds((prev) => {
      const next = new Set(prev);
      next.add(ideaId);
      localStorage.setItem("roadmap_voted_ideas", JSON.stringify([...next]));
      return next;
    });

    setIdeas((prev) =>
      prev.map((i) => (i.id === ideaId ? { ...i, votes_count: i.votes_count + 1 } : i))
    );
  };

  const handleComment = async (ideaId: string, body: string, email: string) => {
    if (!isValidEmail(email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    if (body.length > 2000) {
      toast({ title: "Comment too long", description: "Please keep comments under 2000 characters.", variant: "destructive" });
      return;
    }

    const { error } = await supabase
      .from("comments")
      .insert({ idea_id: ideaId, author_email: email, body });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    // Refetch sanitized comments (direct select on comments is blocked)
    const { data: refreshed } = await supabase
      .from("comments_public")
      .select("*")
      .order("created_at", { ascending: true });
    if (refreshed) setComments(refreshed as unknown as Comment[]);

    toast({ title: "Comment posted" });
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleAdminLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    toast({ title: "Logged out" });
    fetchData(); // Reload with public data
  };

  // Filtered data
  const filteredItems = useMemo(() => {
    return roadmapItems.filter((item) => {
      if (industry !== "all" && !item.industries.includes(industry)) return false;
      if (status !== "all" && item.status !== status) return false;
      if (selectedTags.length > 0 && !selectedTags.some((t) => item.tags.includes(t))) return false;
      return true;
    });
  }, [roadmapItems, industry, status, selectedTags]);

  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      if (industry !== "all" && !idea.industries.includes(industry)) return false;
      return true;
    });
  }, [ideas, industry]);

  if (!hasAccess) {
    return <AccessGate onAccessGranted={() => setHasAccess(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="container py-10 md:py-16">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Map className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Product Roadmap
              </h1>
            </div>
            <p className="text-sm text-muted-foreground max-w-lg">
              Track what we're building and submit your ideas. Help shape what
              comes next.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IdeaSubmitForm onSubmitted={fetchData} />
            {isAdmin && (
              <>
                <AdminPanel
                  ideas={ideas}
                  roadmapItems={roadmapItems}
                  onRefresh={fetchData}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground"
                  onClick={handleAdminLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Filters */}
        <RoadmapFilters
          industry={industry}
          status={status}
          selectedTags={selectedTags}
          onIndustryChange={setIndustry}
          onStatusChange={setStatus}
          onTagToggle={handleTagToggle}
        />

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab} className="mt-6">
          <TabsList className="mb-6">
            <TabsTrigger value="roadmap" className="gap-2">
              <LayoutGrid className="h-4 w-4" />
              Roadmap
            </TabsTrigger>
            <TabsTrigger value="ideas" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              Ideas
              {ideas.length > 0 && (
                <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  {ideas.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : (
              <KanbanBoard
                items={filteredItems}
                onCardClick={(item) => {
                  setSelectedItem(item);
                  setDrawerOpen(true);
                }}
              />
            )}
          </TabsContent>

          <TabsContent value="ideas">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : (
              <IdeasList
                ideas={filteredIdeas}
                comments={comments}
                onVote={handleVote}
                onCommentSubmit={handleComment}
                votedIdeaIds={votedIdeaIds}
              />
            )}
          </TabsContent>
        </Tabs>

        {/* Admin login trigger (hidden dot) — only if not already admin */}
        {!isAdmin && (
          <div className="mt-12 text-center">
            <AdminLoginDialog onLoginSuccess={() => { checkAdminStatus(); fetchData(); }} />
          </div>
        )}
      </section>

      {/* Footer with private label */}
      <div className="border-t border-border">
        <div className="container py-4 flex items-center justify-between">
          <p className="text-[11px] text-muted-foreground/50">
            Private preview · Access code required
          </p>
          <p className="text-[11px] text-muted-foreground/50">
            © {new Date().getFullYear()} GrowthMates.ai
          </p>
        </div>
      </div>

      {/* Card detail drawer */}
      <CardDetailDrawer
        item={selectedItem}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedItem(null);
        }}
      />
    </div>
  );
};

export default RoadmapPage;
