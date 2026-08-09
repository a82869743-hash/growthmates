
-- =============================================
-- ROADMAP & VOC SYSTEM SCHEMA
-- =============================================

-- Enum types
CREATE TYPE public.roadmap_status AS ENUM (
  'under_review', 'planned', 'in_progress', 'in_beta', 'shipped'
);

CREATE TYPE public.idea_status AS ENUM (
  'new', 'under_review', 'accepted', 'not_now', 'duplicate', 'shipped'
);

CREATE TYPE public.priority_level AS ENUM ('p1', 'p2', 'p3');

CREATE TYPE public.industry_tag AS ENUM ('transportation', 'retail', 'agriculture');

-- =============================================
-- ROADMAP ACCESS CONFIG (access code gate)
-- =============================================
CREATE TABLE public.roadmap_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_code TEXT NOT NULL DEFAULT 'growthmates2026',
  admin_emails TEXT[] NOT NULL DEFAULT ARRAY['admin@growthmates.ai']::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.roadmap_access ENABLE ROW LEVEL SECURITY;

-- Anyone can read access config (needed for code validation)
CREATE POLICY "Anyone can read access config"
  ON public.roadmap_access FOR SELECT
  USING (true);

-- =============================================
-- ROADMAP ITEMS (Kanban board)
-- =============================================
CREATE TABLE public.roadmap_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  problem_statement TEXT,
  intended_outcome TEXT,
  who_benefits TEXT,
  dependencies TEXT,
  release_notes TEXT,
  industries industry_tag[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  status roadmap_status NOT NULL DEFAULT 'under_review',
  priority priority_level NOT NULL DEFAULT 'p2',
  target_window TEXT,
  progress_pct INTEGER NOT NULL DEFAULT 0 CHECK (progress_pct >= 0 AND progress_pct <= 100),
  votes_count INTEGER NOT NULL DEFAULT 0,
  linked_idea_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.roadmap_items ENABLE ROW LEVEL SECURITY;

-- Public read access (gated by access code in UI)
CREATE POLICY "Anyone can read roadmap items"
  ON public.roadmap_items FOR SELECT
  USING (true);

-- Only authenticated users can insert/update/delete (admin enforcement in app)
CREATE POLICY "Authenticated users can insert roadmap items"
  ON public.roadmap_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update roadmap items"
  ON public.roadmap_items FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete roadmap items"
  ON public.roadmap_items FOR DELETE
  TO authenticated
  USING (true);

-- =============================================
-- IDEAS (Voice of Customer)
-- =============================================
CREATE TABLE public.ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  success_criteria TEXT,
  industries industry_tag[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  systems_involved TEXT[] NOT NULL DEFAULT '{}',
  status idea_status NOT NULL DEFAULT 'new',
  votes_count INTEGER NOT NULL DEFAULT 0,
  contact_email TEXT NOT NULL,
  company_name TEXT,
  attachment_url TEXT,
  admin_note TEXT,
  duplicate_of_id UUID REFERENCES public.ideas(id),
  linked_roadmap_id UUID REFERENCES public.roadmap_items(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;

-- Public read access (gated by access code in UI)
CREATE POLICY "Anyone can read ideas"
  ON public.ideas FOR SELECT
  USING (true);

-- Anyone can submit ideas (no auth required for VOC)
CREATE POLICY "Anyone can submit ideas"
  ON public.ideas FOR INSERT
  WITH CHECK (true);

-- Authenticated users can update ideas (admin enforcement in app)
CREATE POLICY "Authenticated users can update ideas"
  ON public.ideas FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete ideas"
  ON public.ideas FOR DELETE
  TO authenticated
  USING (true);

-- =============================================
-- IDEA VOTES (unique per email per idea)
-- =============================================
CREATE TABLE public.idea_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id UUID NOT NULL REFERENCES public.ideas(id) ON DELETE CASCADE,
  voter_email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (idea_id, voter_email)
);

ALTER TABLE public.idea_votes ENABLE ROW LEVEL SECURITY;

-- Anyone can read votes
CREATE POLICY "Anyone can read votes"
  ON public.idea_votes FOR SELECT
  USING (true);

-- Anyone can vote (email-based uniqueness)
CREATE POLICY "Anyone can insert votes"
  ON public.idea_votes FOR INSERT
  WITH CHECK (true);

-- =============================================
-- COMMENTS
-- =============================================
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id UUID NOT NULL REFERENCES public.ideas(id) ON DELETE CASCADE,
  author_email TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Anyone can read comments
CREATE POLICY "Anyone can read comments"
  ON public.comments FOR SELECT
  USING (true);

-- Anyone can post comments
CREATE POLICY "Anyone can insert comments"
  ON public.comments FOR INSERT
  WITH CHECK (true);

-- =============================================
-- AUDIT LOG (admin actions)
-- =============================================
CREATE TABLE public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  admin_email TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Only authenticated can read/write audit log
CREATE POLICY "Authenticated users can read audit log"
  ON public.audit_log FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert audit log"
  ON public.audit_log FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- =============================================
-- TRIGGERS for updated_at
-- =============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_roadmap_items_updated_at
  BEFORE UPDATE ON public.roadmap_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ideas_updated_at
  BEFORE UPDATE ON public.ideas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_roadmap_access_updated_at
  BEFORE UPDATE ON public.roadmap_access
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- FUNCTION: Increment/decrement vote count
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_idea_vote()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.ideas SET votes_count = votes_count + 1 WHERE id = NEW.idea_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.ideas SET votes_count = votes_count - 1 WHERE id = OLD.idea_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_idea_vote_change
  AFTER INSERT OR DELETE ON public.idea_votes
  FOR EACH ROW EXECUTE FUNCTION public.handle_idea_vote();

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_roadmap_items_status ON public.roadmap_items(status);
CREATE INDEX idx_roadmap_items_industries ON public.roadmap_items USING GIN(industries);
CREATE INDEX idx_ideas_status ON public.ideas(status);
CREATE INDEX idx_ideas_industries ON public.ideas USING GIN(industries);
CREATE INDEX idx_idea_votes_idea_id ON public.idea_votes(idea_id);
CREATE INDEX idx_comments_idea_id ON public.comments(idea_id);
