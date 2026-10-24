-- ==============================================================================
-- DRAWMADOO — Supabase Storage Buckets & Policies
-- ==============================================================================

-- 1. Create storage buckets (if not already present)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('artworks', 'artworks', true, 15728640, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('assets', 'assets', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
ON CONFLICT (id) DO NOTHING;

-- 2. Storage RLS Policies

-- Public Read for all artwork and avatar assets
CREATE POLICY "Public Read Artworks"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'artworks');

CREATE POLICY "Public Read Avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Public Read Assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'assets');

-- Authenticated Users & Artists can upload images
CREATE POLICY "Artists Upload Artworks"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'artworks' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users Upload Avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated'
  );

-- Users can delete their own uploaded objects
CREATE POLICY "Users Delete Own Artwork Objects"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'artworks' AND
    auth.uid() = owner
  );

CREATE POLICY "Users Delete Own Avatar Objects"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    auth.uid() = owner
  );
