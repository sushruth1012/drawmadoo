-- ==============================================================================
-- DRAWMADOO — Complete Production Supabase Relational Schema & Security Policies
-- Scalable, Relational, RLS-Enforced Backend Foundation
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. USERS & PROFILES
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'artist', 'admin')),
  bio TEXT,
  country TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Artist Profiles Table
CREATE TABLE IF NOT EXISTS public.artist_profiles (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  artist_bio TEXT,
  portfolio_description TEXT,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  featured_status BOOLEAN NOT NULL DEFAULT FALSE,
  cover_image_url TEXT,
  specialties TEXT[] DEFAULT ARRAY[]::TEXT[],
  total_sales NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 3. CATEGORIES & TAXONOMY
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 4. ARTWORKS & MEDIA
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.artworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT,
  artist_id UUID NOT NULL REFERENCES public.artist_profiles(id) ON DELETE RESTRICT,
  category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
  medium TEXT NOT NULL,
  dimensions TEXT,
  year INT DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  description TEXT,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold', 'hidden', 'draft')),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  primary_image_url TEXT NOT NULL,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  views_count INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Multi-image support for artworks
CREATE TABLE IF NOT EXISTS public.artwork_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artwork_id UUID NOT NULL REFERENCES public.artworks(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 5. SOCIAL & COMMERCE (Wishlist, Cart, Orders, Reviews)
-- ==============================================================================

-- Wishlist Table
CREATE TABLE IF NOT EXISTS public.wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  artwork_id UUID NOT NULL REFERENCES public.artworks(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_wishlist_user_artwork UNIQUE (user_id, artwork_id)
);

-- Shopping Cart Table
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  artwork_id UUID NOT NULL REFERENCES public.artworks(id) ON DELETE CASCADE,
  quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_cart_user_artwork UNIQUE (user_id, artwork_id)
);

-- Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  total_amount NUMERIC(12, 2) NOT NULL CHECK (total_amount >= 0),
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled')),
  shipping_address JSONB,
  payment_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  artwork_id UUID NOT NULL REFERENCES public.artworks(id) ON DELETE RESTRICT,
  artist_id UUID NOT NULL REFERENCES public.artist_profiles(id) ON DELETE RESTRICT,
  price NUMERIC(12, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artwork_id UUID REFERENCES public.artworks(id) ON DELETE CASCADE,
  artist_id UUID REFERENCES public.artist_profiles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'order', 'artwork', 'system', 'verification')),
  read BOOLEAN NOT NULL DEFAULT FALSE,
  data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Artist Favorites / Following Table
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  artist_id UUID NOT NULL REFERENCES public.artist_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_favorites_user_artist UNIQUE (user_id, artist_id)
);

-- Recently Viewed Artworks
CREATE TABLE IF NOT EXISTS public.recently_viewed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  artwork_id UUID NOT NULL REFERENCES public.artworks(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_recently_viewed_user_artwork UNIQUE (user_id, artwork_id)
);

-- ==============================================================================
-- 6. PERFORMANCE INDEXES
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_artworks_artist ON public.artworks(artist_id);
CREATE INDEX IF NOT EXISTS idx_artworks_category ON public.artworks(category_id);
CREATE INDEX IF NOT EXISTS idx_artworks_status ON public.artworks(status);
CREATE INDEX IF NOT EXISTS idx_artworks_featured ON public.artworks(featured);
CREATE INDEX IF NOT EXISTS idx_wishlist_user ON public.wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_user ON public.cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_artwork ON public.reviews(artwork_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, read);

-- ==============================================================================
-- 7. AUTOMATED USER REGISTRATION TRIGGER
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.users.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.users.avatar_url);
    
  -- If role is artist, create initial artist profile
  IF (NEW.raw_user_meta_data->>'role') = 'artist' THEN
    INSERT INTO public.artist_profiles (id, display_name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)))
    ON CONFLICT (id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==============================================================================
-- 8. HELPER SECURITY FUNCTIONS
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_artist()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND (role = 'artist' OR role = 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artwork_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recently_viewed ENABLE ROW LEVEL SECURITY;

-- ── Users Policies ──
CREATE POLICY "Users are viewable by public"
  ON public.users FOR SELECT USING (true);

CREATE POLICY "Users can edit own profile"
  ON public.users FOR UPDATE USING (auth.uid() = id OR public.is_admin());

-- ── Artist Profiles Policies ──
CREATE POLICY "Artist profiles are public"
  ON public.artist_profiles FOR SELECT USING (true);

CREATE POLICY "Artists can update own profile"
  ON public.artist_profiles FOR UPDATE USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Artists can insert own profile"
  ON public.artist_profiles FOR INSERT WITH CHECK (auth.uid() = id OR public.is_admin());

-- ── Categories Policies ──
CREATE POLICY "Categories are viewable by public"
  ON public.categories FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL USING (public.is_admin());

-- ── Artworks Policies ──
CREATE POLICY "Public can view available artworks"
  ON public.artworks FOR SELECT USING (
    status IN ('available', 'sold') OR 
    auth.uid() = artist_id OR 
    public.is_admin()
  );

CREATE POLICY "Artists can insert own artworks"
  ON public.artworks FOR INSERT WITH CHECK (
    auth.uid() = artist_id OR public.is_admin()
  );

CREATE POLICY "Artists can update own artworks"
  ON public.artworks FOR UPDATE USING (
    auth.uid() = artist_id OR public.is_admin()
  );

CREATE POLICY "Artists can delete own artworks"
  ON public.artworks FOR DELETE USING (
    auth.uid() = artist_id OR public.is_admin()
  );

-- ── Artwork Images Policies ──
CREATE POLICY "Artwork images are viewable by public"
  ON public.artwork_images FOR SELECT USING (true);

CREATE POLICY "Artists can manage artwork images"
  ON public.artwork_images FOR ALL USING (
    EXISTS (SELECT 1 FROM public.artworks WHERE id = artwork_images.artwork_id AND artist_id = auth.uid()) OR public.is_admin()
  );

-- ── Wishlist Policies ──
CREATE POLICY "Users manage own wishlist"
  ON public.wishlist FOR ALL USING (auth.uid() = user_id OR public.is_admin());

-- ── Cart Policies ──
CREATE POLICY "Users manage own cart"
  ON public.cart_items FOR ALL USING (auth.uid() = user_id OR public.is_admin());

-- ── Orders Policies ──
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can create orders"
  ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update orders"
  ON public.orders FOR UPDATE USING (public.is_admin());

-- ── Order Items Policies ──
CREATE POLICY "Users and Artists can view relevant order items"
  ON public.order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE id = order_items.order_id AND user_id = auth.uid()) OR
    auth.uid() = artist_id OR
    public.is_admin()
  );

-- ── Reviews Policies ──
CREATE POLICY "Reviews are viewable by public"
  ON public.reviews FOR SELECT USING (true);

CREATE POLICY "Users can create and edit own reviews"
  ON public.reviews FOR ALL USING (auth.uid() = user_id OR public.is_admin());

-- ── Notifications Policies ──
CREATE POLICY "Users manage own notifications"
  ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- ── Favorites Policies ──
CREATE POLICY "Users manage own favorites"
  ON public.favorites FOR ALL USING (auth.uid() = user_id);

-- ── Recently Viewed Policies ──
CREATE POLICY "Users manage own recently viewed"
  ON public.recently_viewed FOR ALL USING (auth.uid() = user_id);

-- ==============================================================================
-- 10. INITIAL SEED CATEGORIES
-- ==============================================================================

INSERT INTO public.categories (id, name, slug, description, display_order)
VALUES 
  ('cat-portrait', 'Portrait', 'portrait', 'Evocative figurative and human portraits', 1),
  ('cat-landscape', 'Landscape', 'landscape', 'Luminous natural panoramas and vistas', 2),
  ('cat-traditional', 'Traditional & Heritage', 'traditional', 'Classical Indian, temple and heritage motifs', 3),
  ('cat-abstract', 'Abstract', 'abstract', 'Vibrant non-representational expressions', 4),
  ('cat-digital', 'Digital Art', 'digital-art', 'Imaginative concept art and digital paintings', 5),
  ('cat-sketches', 'Sketches & Charcoal', 'sketches', 'Detailed pencil, ink and monochrome drawings', 6)
ON CONFLICT (id) DO NOTHING;
