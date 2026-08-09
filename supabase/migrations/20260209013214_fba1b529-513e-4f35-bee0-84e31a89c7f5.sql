
-- Create a public view that excludes sensitive contact_email field
CREATE VIEW public.ideas_public AS
SELECT 
  id, title, description, success_criteria, industries,
  systems_involved, tags, status, votes_count, 
  admin_note, duplicate_of_id, linked_roadmap_id,
  attachment_url, company_name, created_at, updated_at
FROM public.ideas;

-- Grant access to anon and authenticated roles
GRANT SELECT ON public.ideas_public TO anon, authenticated;

-- Drop the overly permissive SELECT policy on the base table
DROP POLICY "Anyone can read ideas" ON public.ideas;

-- Block direct SELECT on the base ideas table (only service role can read)
CREATE POLICY "No direct select on ideas"
ON public.ideas FOR SELECT
USING (false);
