-- Alternative approach: Disable RLS entirely for this simple app
-- Since this is a public catalog without authentication, we can disable RLS

-- Disable RLS on all tables
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.carousel_images DISABLE ROW LEVEL SECURITY;

-- Note: This approach is simpler and more suitable for a public catalog
-- where you don't need user authentication or data isolation 