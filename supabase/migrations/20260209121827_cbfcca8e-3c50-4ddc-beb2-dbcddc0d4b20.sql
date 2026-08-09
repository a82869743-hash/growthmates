
-- Security fix: restrict voter email exposure
DROP POLICY IF EXISTS "Anyone can read votes" ON public.idea_votes;
CREATE POLICY "No direct select on idea_votes"
  ON public.idea_votes FOR SELECT USING (false);
CREATE POLICY "Admins can read votes"
  ON public.idea_votes FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Assessment leads tracking
ALTER TABLE public.contact_submissions
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'contact_form';
