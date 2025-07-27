-- Seed data for Peoni Beauty Korean Cosmetics Store

-- Insert sample categories
INSERT INTO public.categories (name, slug) VALUES 
  ('Skincare', 'skincare'),
  ('Makeup', 'makeup'), 
  ('Face Masks', 'masks'),
  ('Sun Care', 'suncare'),
  ('Lip Care', 'lipcare'),
  ('Eye Care', 'eyecare')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO public.products (name, brand, price, original_price, category_id, description, image, rating, tags) VALUES 
  (
    'Glow Vitamin C Serum',
    'Beauty Brand',
    1299,
    1599,
    (SELECT id FROM public.categories WHERE slug = 'skincare'),
    'Brightening vitamin C serum for radiant, even-toned skin with powerful antioxidants',
    '/src/assets/product1.jpg',
    4.8,
    ARRAY['Vitamin C', 'Brightening', 'Anti-aging']
  ),
  (
    'Hydra Hyaluronic Acid Toner',
    'Hydro Beauty',
    899,
    NULL,
    (SELECT id FROM public.categories WHERE slug = 'skincare'),
    'Deep hydrating toner with premium hyaluronic acid for plump, healthy skin',
    '/src/assets/product2.jpg',
    4.9,
    ARRAY['Hydrating', 'Hyaluronic Acid', 'Plumping']
  ),
  (
    'Setting Cushion Foundation',
    'Perfect Cover',
    1099,
    1299,
    (SELECT id FROM public.categories WHERE slug = 'makeup'),
    'Natural, full coverage cushion foundation with long-lasting wear and SPF protection',
    '/src/assets/product3.jpg',
    4.7,
    ARRAY['Full Coverage', 'Natural Finish', 'Long-lasting']
  ),
  (
    'Collagen Hydrogel Mask',
    'Glow Lab',
    249,
    NULL,
    (SELECT id FROM public.categories WHERE slug = 'masks'),
    'Firming and hydrating collagen mask for youthful, radiant skin',
    '/src/assets/product4.jpg',
    4.6,
    ARRAY['Collagen', 'Firming', 'Hydrating']
  ),
  (
    'SPF50+ Sunscreen',
    'Sun Shield',
    799,
    899,
    (SELECT id FROM public.categories WHERE slug = 'suncare'),
    'Lightweight, non-greasy sunscreen with broad spectrum protection',
    '/src/assets/product1.jpg',
    4.8,
    ARRAY['SPF50+', 'Lightweight', 'Non-comedogenic']
  ),
  (
    'Glitter Eyeshadow Palette',
    'Sparkle Beauty',
    1199,
    1399,
    (SELECT id FROM public.categories WHERE slug = 'makeup'),
    'Vibrant glitter eyeshadow palette with stunning pigmentation and long-lasting formula',
    '/src/assets/product2.jpg',
    4.9,
    ARRAY['Glitter', 'Multi-color', 'High Pigment']
  ),
  (
    'Moisturizing Lip Balm',
    'Lip Care Plus',
    399,
    NULL,
    (SELECT id FROM public.categories WHERE slug = 'lipcare'),
    'Intensely moisturizing lip balm with natural ingredients for soft, supple lips',
    '/src/assets/product3.jpg',
    4.5,
    ARRAY['Moisturizing', 'Natural', 'Soft Lips']
  ),
  (
    'Eye Cream with Retinol',
    'Youthful Eyes',
    899,
    1099,
    (SELECT id FROM public.categories WHERE slug = 'eyecare'),
    'Anti-aging eye cream with retinol to reduce fine lines and dark circles',
    '/src/assets/product4.jpg',
    4.7,
    ARRAY['Retinol', 'Anti-aging', 'Dark Circles']
  ),
  (
    'Tea Tree Acne Spot Treatment',
    'Clear Skin',
    599,
    NULL,
    (SELECT id FROM public.categories WHERE slug = 'skincare'),
    'Targeted acne treatment with tea tree oil to clear blemishes quickly',
    '/src/assets/product1.jpg',
    4.6,
    ARRAY['Tea Tree', 'Acne Treatment', 'Spot Treatment']
  ),
  (
    'BB Cream with SPF',
    'Natural Glow',
    699,
    799,
    (SELECT id FROM public.categories WHERE slug = 'makeup'),
    'All-in-one BB cream with SPF protection and natural coverage',
    '/src/assets/product2.jpg',
    4.8,
    ARRAY['BB Cream', 'SPF', 'Natural Coverage']
  )
ON CONFLICT DO NOTHING;

-- Insert carousel images
INSERT INTO public.carousel_images (url, alt, order_index) VALUES 
  ('/src/assets/product1.jpg', 'Glow Vitamin C Serum - Brightening skincare', 1),
  ('/src/assets/product2.jpg', 'Hydra Hyaluronic Acid Toner - Deep hydration', 2),
  ('/src/assets/product3.jpg', 'Setting Cushion Foundation - Perfect coverage', 3),
  ('/src/assets/product4.jpg', 'Collagen Hydrogel Mask - Firming treatment', 4)
ON CONFLICT DO NOTHING; 