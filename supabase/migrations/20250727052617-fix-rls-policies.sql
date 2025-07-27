-- Fix RLS policies to allow public access for admin operations
-- Since this app doesn't use authentication, we need to allow public access

-- Drop existing policies
DROP POLICY IF EXISTS "Only authenticated users can insert products" ON public.products;
DROP POLICY IF EXISTS "Only authenticated users can update products" ON public.products;
DROP POLICY IF EXISTS "Only authenticated users can delete products" ON public.products;

DROP POLICY IF EXISTS "Only authenticated users can insert categories" ON public.categories;
DROP POLICY IF EXISTS "Only authenticated users can update categories" ON public.categories;
DROP POLICY IF EXISTS "Only authenticated users can delete categories" ON public.categories;

DROP POLICY IF EXISTS "Only authenticated users can insert carousel images" ON public.carousel_images;
DROP POLICY IF EXISTS "Only authenticated users can update carousel images" ON public.carousel_images;
DROP POLICY IF EXISTS "Only authenticated users can delete carousel images" ON public.carousel_images;

-- Create new policies that allow public access for admin operations
-- Note: In a production environment, you should implement proper authentication

-- Products policies
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Products can be inserted by anyone" 
ON public.products 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Products can be updated by anyone" 
ON public.products 
FOR UPDATE 
USING (true);

CREATE POLICY "Products can be deleted by anyone" 
ON public.products 
FOR DELETE 
USING (true);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone" 
ON public.categories 
FOR SELECT 
USING (true);

CREATE POLICY "Categories can be inserted by anyone" 
ON public.categories 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Categories can be updated by anyone" 
ON public.categories 
FOR UPDATE 
USING (true);

CREATE POLICY "Categories can be deleted by anyone" 
ON public.categories 
FOR DELETE 
USING (true);

-- Carousel images policies
CREATE POLICY "Carousel images are viewable by everyone" 
ON public.carousel_images 
FOR SELECT 
USING (true);

CREATE POLICY "Carousel images can be inserted by anyone" 
ON public.carousel_images 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Carousel images can be updated by anyone" 
ON public.carousel_images 
FOR UPDATE 
USING (true);

CREATE POLICY "Carousel images can be deleted by anyone" 
ON public.carousel_images 
FOR DELETE 
USING (true); 