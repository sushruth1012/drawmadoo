-- ==============================================================================
-- DRAWMADOO — Fix Upload Permissions & Relax Artwork Insertion RLS
-- Run this once in your Supabase Dashboard -> SQL Editor
-- ==============================================================================

-- 1. Ensure storage buckets exist and are public
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('artworks', 'artworks', true, 26214400, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('avatars', 'avatars', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('assets', 'assets', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Storage RLS: Allow anyone with the anon key or authenticated token to upload artworks
DROP POLICY IF EXISTS "Public Read Artworks" ON storage.objects;
CREATE POLICY "Public Read Artworks" ON storage.objects FOR SELECT USING (bucket_id = 'artworks');

DROP POLICY IF EXISTS "Artists Upload Artworks" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public & Authenticated Artworks Upload" ON storage.objects;
CREATE POLICY "Allow Public & Authenticated Artworks Upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'artworks');

DROP POLICY IF EXISTS "Allow Artworks Update" ON storage.objects;
CREATE POLICY "Allow Artworks Update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'artworks');

-- Storage RLS: Allow uploads to avatars bucket
DROP POLICY IF EXISTS "Public Read Avatars" ON storage.objects;
CREATE POLICY "Public Read Avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Users Upload Avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public & Authenticated Avatars Upload" ON storage.objects;
CREATE POLICY "Allow Public & Authenticated Avatars Upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Allow Avatars Update" ON storage.objects;
CREATE POLICY "Allow Avatars Update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars');

-- 3. Artworks Table: Relax artist_id foreign key constraint and add artist_name column
ALTER TABLE public.artworks ADD COLUMN IF NOT EXISTS artist_name TEXT;
DO $$ 
BEGIN
  ALTER TABLE public.artworks ALTER COLUMN artist_id DROP NOT NULL;
EXCEPTION 
  WHEN OTHERS THEN NULL;
END $$;

-- 4. Artworks Table RLS: Allow public read, insert, update and delete
DROP POLICY IF EXISTS "Public can view available artworks" ON public.artworks;
CREATE POLICY "Public can view available artworks" ON public.artworks FOR SELECT USING (true);

DROP POLICY IF EXISTS "Artists can insert own artworks" ON public.artworks;
DROP POLICY IF EXISTS "Allow artwork insert" ON public.artworks;
CREATE POLICY "Allow artwork insert" ON public.artworks FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Artists can update own artworks" ON public.artworks;
DROP POLICY IF EXISTS "Allow artwork update" ON public.artworks FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Artists can delete own artworks" ON public.artworks;
DROP POLICY IF EXISTS "Allow artwork delete" ON public.artworks FOR DELETE USING (true);
