
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  cover_image_url text,
  author_name text NOT NULL DEFAULT 'GrowthMates Team',
  tags text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT false,
  published_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read published posts
CREATE POLICY "Anyone can read published posts"
ON public.blog_posts FOR SELECT
TO public
USING (published = true);

-- Admins can read all posts (including drafts)
CREATE POLICY "Admins can read all posts"
ON public.blog_posts FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Admins can insert posts
CREATE POLICY "Admins can insert posts"
ON public.blog_posts FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Admins can update posts
CREATE POLICY "Admins can update posts"
ON public.blog_posts FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Admins can delete posts
CREATE POLICY "Admins can delete posts"
ON public.blog_posts FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Auto-update updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
