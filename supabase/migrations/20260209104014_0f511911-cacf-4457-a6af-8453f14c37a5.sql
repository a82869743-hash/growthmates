
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Users can only see their own roles
CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Only admins can manage roles
CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ============================
-- Update ideas table policies
-- ============================
DROP POLICY IF EXISTS "Authenticated users can update ideas" ON public.ideas;
DROP POLICY IF EXISTS "Authenticated users can delete ideas" ON public.ideas;

CREATE POLICY "Admin users can update ideas"
  ON public.ideas FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin users can delete ideas"
  ON public.ideas FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ============================
-- Update roadmap_items policies
-- ============================
DROP POLICY IF EXISTS "Authenticated users can update roadmap items" ON public.roadmap_items;
DROP POLICY IF EXISTS "Authenticated users can delete roadmap items" ON public.roadmap_items;
DROP POLICY IF EXISTS "Authenticated users can insert roadmap items" ON public.roadmap_items;

CREATE POLICY "Admin users can update roadmap items"
  ON public.roadmap_items FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin users can delete roadmap items"
  ON public.roadmap_items FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin users can insert roadmap items"
  ON public.roadmap_items FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============================
-- Update audit_log policies
-- ============================
DROP POLICY IF EXISTS "Authenticated users can insert audit log" ON public.audit_log;
DROP POLICY IF EXISTS "Authenticated users can read audit log" ON public.audit_log;

CREATE POLICY "Admin users can insert audit log"
  ON public.audit_log FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin users can read audit log"
  ON public.audit_log FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
