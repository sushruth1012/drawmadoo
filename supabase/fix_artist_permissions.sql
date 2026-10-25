-- ==============================================================================
-- DRAWMADOO — Artist Registration & Avatars Storage Setup
-- Run this in Supabase SQL Editor to enable seamless artist registration
-- ==============================================================================

-- 1. Create 'avatars' and 'artworks' storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('artworks', 'artworks', true, 26214400, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Allow public & authenticated uploads to 'avatars' storage bucket
DROP POLICY IF EXISTS "Public Read Avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Avatars All" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public & Authenticated Avatars Upload" ON storage.objects;

CREATE POLICY "Public Read Avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Allow Public Avatars All"
  ON storage.objects FOR ALL
  USING (bucket_id = 'avatars')
  WITH CHECK (bucket_id = 'avatars');

-- 3. Ensure artist_profiles permits registration inserts & updates
ALTER TABLE public.artist_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- 4. Ensure artist_profiles id does not block unregistered foreign keys if auth is decoupled
-- (Leaves FK intact, but ensures table is ready for pending artist applications)
ALTER TABLE public.artist_profiles ALTER COLUMN verification_status SET DEFAULT 'pending';
