-- ==============================================================================
-- DRAWMADOO — Supabase Storage Buckets & Policies
-- ==============================================================================

-- 1. Create storage buckets (if not already present)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('artworks', 'artworks', true, 26214400, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('avatars', 'avatars', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('assets', 'assets', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Storage RLS Policies

-- Public Read for all artwork, avatar, and asset buckets
DROP POLICY IF EXISTS "Public Read Artworks" ON storage.objects;
CREATE POLICY "Public Read Artworks"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'artworks');

DROP POLICY IF EXISTS "Public Read Avatars" ON storage.objects;
CREATE POLICY "Public Read Avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Public Read Assets" ON storage.objects;
CREATE POLICY "Public Read Assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'assets');

-- Allow Uploads to artworks bucket (Public & Authenticated)
DROP POLICY IF EXISTS "Artists Upload Artworks" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public & Authenticated Artworks Upload" ON storage.objects;
CREATE POLICY "Allow Public & Authenticated Artworks Upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'artworks');

DROP POLICY IF EXISTS "Allow Artworks Update" ON storage.objects;
CREATE POLICY "Allow Artworks Update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'artworks');

-- Allow Uploads to avatars bucket (Public & Authenticated)
DROP POLICY IF EXISTS "Users Upload Avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public & Authenticated Avatars Upload" ON storage.objects;
CREATE POLICY "Allow Public & Authenticated Avatars Upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Allow Avatars Update" ON storage.objects;
CREATE POLICY "Allow Avatars Update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars');

-- Allow Delete
DROP POLICY IF EXISTS "Users Delete Own Artwork Objects" ON storage.objects;
CREATE POLICY "Users Delete Own Artwork Objects"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'artworks');

DROP POLICY IF EXISTS "Users Delete Own Avatar Objects" ON storage.objects;
CREATE POLICY "Users Delete Own Avatar Objects"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'avatars');
