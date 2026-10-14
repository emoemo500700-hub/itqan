-- =====================================================================
-- ITQAN — Step 1: Database, Security & Admin Login
-- Idempotent: safe to run multiple times (uses IF NOT EXISTS / DROP POLICY IF EXISTS)
-- =====================================================================

-- ------------------------------------------------------------------
-- 1) Admin helper function
-- ------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT lower(coalesce(auth.jwt() ->> 'email', '')) = 'emoemo500700@gmail.com'
$$;

-- ------------------------------------------------------------------
-- 2) New tables
-- ------------------------------------------------------------------

-- 2a) site_config — single row (id=1) holding site name, logo, marquee text & position
CREATE TABLE IF NOT EXISTS public.site_config (
  id          int          PRIMARY KEY,
  data        jsonb        NOT NULL DEFAULT '{}',
  updated_at  timestamptz  DEFAULT now()
);

INSERT INTO public.site_config (id, data)
VALUES (1, jsonb_build_object(
  'site_name', 'إتقان',
  'logo', '',
  'marquee_text', '',
  'marquee_position', 'top'
))
ON CONFLICT (id) DO NOTHING;

-- 2b) content_nodes — tree of sections / grades / subjects / lessons
CREATE TABLE IF NOT EXISTS public.content_nodes (
  id           uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id    uuid         REFERENCES public.content_nodes(id) ON DELETE CASCADE,
  title        text         NOT NULL,
  emoji        text         DEFAULT '📁',
  kind         text         DEFAULT 'section',
  duration_min int          DEFAULT 0,
  sort         int          DEFAULT 0,
  published    boolean      DEFAULT true,
  created_at   timestamptz  DEFAULT now()
);

-- 2c) media_files — files attached to content nodes
CREATE TABLE IF NOT EXISTS public.media_files (
  id           uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id      uuid         REFERENCES public.content_nodes(id) ON DELETE SET NULL,
  name         text         NOT NULL,
  mime         text         NOT NULL,
  storage_path text         NOT NULL,
  size_bytes   bigint,
  created_at   timestamptz  DEFAULT now()
);

-- 2d) download_log — anonymous download tracking (auto-purged after 30 days)
CREATE TABLE IF NOT EXISTS public.download_log (
  id          bigint       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  file_id     uuid         REFERENCES public.media_files(id) ON DELETE CASCADE,
  created_at  timestamptz  DEFAULT now()
);

-- ------------------------------------------------------------------
-- 3) Enable RLS on all four tables
-- ------------------------------------------------------------------
ALTER TABLE public.site_config   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.download_log  ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------
-- 3a) site_config policies — read for all, write admin-only
-- ------------------------------------------------------------------
DROP POLICY IF EXISTS "read_site_config" ON public.site_config;
CREATE POLICY "read_site_config"
  ON public.site_config FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "insert_site_config" ON public.site_config;
CREATE POLICY "insert_site_config"
  ON public.site_config FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "update_site_config" ON public.site_config;
CREATE POLICY "update_site_config"
  ON public.site_config FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "delete_site_config" ON public.site_config;
CREATE POLICY "delete_site_config"
  ON public.site_config FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------
-- 3b) content_nodes policies — read published for all, write admin-only
-- ------------------------------------------------------------------
DROP POLICY IF EXISTS "read_content_nodes" ON public.content_nodes;
CREATE POLICY "read_content_nodes"
  ON public.content_nodes FOR SELECT
  TO anon, authenticated
  USING (published);

DROP POLICY IF EXISTS "insert_content_nodes" ON public.content_nodes;
CREATE POLICY "insert_content_nodes"
  ON public.content_nodes FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "update_content_nodes" ON public.content_nodes;
CREATE POLICY "update_content_nodes"
  ON public.content_nodes FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "delete_content_nodes" ON public.content_nodes;
CREATE POLICY "delete_content_nodes"
  ON public.content_nodes FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------
-- 3c) media_files policies — read for all, write admin-only
-- ------------------------------------------------------------------
DROP POLICY IF EXISTS "read_media_files" ON public.media_files;
CREATE POLICY "read_media_files"
  ON public.media_files FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "insert_media_files" ON public.media_files;
CREATE POLICY "insert_media_files"
  ON public.media_files FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "update_media_files" ON public.media_files;
CREATE POLICY "update_media_files"
  ON public.media_files FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "delete_media_files" ON public.media_files;
CREATE POLICY "delete_media_files"
  ON public.media_files FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------
-- 3d) download_log policies — insert for all, select+delete admin-only
-- ------------------------------------------------------------------
DROP POLICY IF EXISTS "insert_download_log" ON public.download_log;
CREATE POLICY "insert_download_log"
  ON public.download_log FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "select_download_log" ON public.download_log;
CREATE POLICY "select_download_log"
  ON public.download_log FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "delete_download_log" ON public.download_log;
CREATE POLICY "delete_download_log"
  ON public.download_log FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------
-- 4) Cleanup function: delete download_log rows older than 30 days
--    Scheduled via pg_cron if available; see STEP1_NOTES.md
-- ------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.cleanup_download_log()
RETURNS void
LANGUAGE sql
AS $$
  DELETE FROM public.download_log WHERE created_at < now() - interval '30 days';
$$;

-- Try to schedule with pg_cron (extension may not be enabled — that's OK)
DO $func$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_extension WHERE extname = 'pg_cron'
  ) THEN
    -- cron.schedule is available; replace any existing job
    PERFORM cron.unschedule('itqan_download_log_cleanup');
    PERFORM cron.schedule(
      'itqan_download_log_cleanup',
      '0 3 * * *',          -- daily at 03:00 UTC
      $job$SELECT public.cleanup_download_log();$job$
    );
  END IF;
EXCEPTION WHEN OTHERS THEN
  -- pg_cron not available or job already exists — handled gracefully
  NULL;
END
$func$;

-- ------------------------------------------------------------------
-- 5) Indexes
-- ------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_content_nodes_parent_sort
  ON public.content_nodes (parent_id, sort);

CREATE INDEX IF NOT EXISTS idx_media_files_node
  ON public.media_files (node_id);

CREATE INDEX IF NOT EXISTS idx_download_log_created
  ON public.download_log (created_at);
