-- 1. roadmap_access: remove public read access (code now verified server-side)
DROP POLICY IF EXISTS "Anyone can read access config" ON public.roadmap_access;

-- 2. comments: remove public direct read of author emails, expose sanitized view
DROP POLICY IF EXISTS "Anyone can read comments" ON public.comments;

CREATE POLICY "No direct select on comments"
  ON public.comments FOR SELECT
  USING (false);

CREATE OR REPLACE VIEW public.comments_public AS
SELECT
  id,
  idea_id,
  body,
  created_at,
  substring(md5(author_email) for 8) AS author_id
FROM public.comments;

GRANT SELECT ON public.comments_public TO anon, authenticated;

-- 3. Email format + length validation on user-supplied emails
ALTER TABLE public.idea_votes
  ADD CONSTRAINT idea_votes_email_format
  CHECK (voter_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  ADD CONSTRAINT idea_votes_email_length
  CHECK (char_length(voter_email) <= 255);

ALTER TABLE public.comments
  ADD CONSTRAINT comments_email_format
  CHECK (author_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  ADD CONSTRAINT comments_email_length
  CHECK (char_length(author_email) <= 255),
  ADD CONSTRAINT comments_body_length
  CHECK (char_length(body) <= 2000);