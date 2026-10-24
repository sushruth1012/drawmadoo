-- 1. Add artist_name column & make artist_id optional
ALTER TABLE public.artworks ADD COLUMN IF NOT EXISTS artist_name TEXT;
ALTER TABLE public.artworks ALTER COLUMN artist_id DROP NOT NULL;

-- 2. Disable RLS restrictions on artworks so inserts never get blocked
ALTER TABLE public.artworks DISABLE ROW LEVEL SECURITY;

-- 3. Allow full read & upload access to artworks storage bucket
DROP POLICY IF EXISTS "Artists Upload Artworks" ON storage.objects;
DROP POLICY IF EXISTS "Public Read Artworks" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Artworks All" ON storage.objects;

CREATE POLICY "Allow Public Artworks All"
ON storage.objects FOR ALL
USING (bucket_id = 'artworks')
WITH CHECK (bucket_id = 'artworks');
