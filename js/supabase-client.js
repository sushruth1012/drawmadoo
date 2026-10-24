/**
 * ═════════════════════════════════════════════════════════════════════
 * DRAWMADOO — Centralized Supabase Client & Storage Provider
 * Production-ready client integration with seamless offline fallback.
 * ═════════════════════════════════════════════════════════════════════
 */

(function (window) {
  'use strict';

  const STORAGE_KEY = 'drawmadoo_supabase_config';
  let supabaseInstance = null;

  const SupabaseClient = {
    /**
     * Retrieves stored or environment Supabase credentials
     */
    getConfig() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
        const legacyUrl = localStorage.getItem('DRAWMADOO_SUPABASE_URL');
        const legacyKey = localStorage.getItem('DRAWMADOO_SUPABASE_ANON_KEY');
        if (legacyUrl && legacyKey) {
          return { url: legacyUrl, anonKey: legacyKey, enabled: true };
        }
      } catch (e) {
        console.warn('[SupabaseClient] Error reading config from storage:', e);
      }
      return {
        url: window.__DRAWMADOO_SUPABASE_URL__ || '',
        anonKey: window.__DRAWMADOO_SUPABASE_KEY__ || '',
        enabled: Boolean(window.__DRAWMADOO_SUPABASE_URL__ && window.__DRAWMADOO_SUPABASE_KEY__)
      };
    },

    /**
     * Updates and saves Supabase credentials
     */
    saveConfig(url, anonKey) {
      const config = {
        url: (url || '').trim(),
        anonKey: (anonKey || '').trim(),
        enabled: Boolean(url && anonKey)
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
        localStorage.setItem('DRAWMADOO_SUPABASE_URL', config.url);
        localStorage.setItem('DRAWMADOO_SUPABASE_ANON_KEY', config.anonKey);
        supabaseInstance = null; // force re-init
        window.dispatchEvent(new CustomEvent('drawmadoo:supabase_config_changed', { detail: config }));
      } catch (e) {
        console.error('[SupabaseClient] Error saving config:', e);
      }
      return config;
    },

    configure(url, anonKey) {
      return this.saveConfig(url, anonKey);
    },

    /**
     * Checks if Supabase has valid live credentials
     */
    isConfigured() {
      const config = this.getConfig();
      return Boolean(config.url && config.anonKey);
    },

    /**
     * Initializes or returns the Supabase JS client instance
     */
    getClient() {
      if (supabaseInstance) return supabaseInstance;

      const config = this.getConfig();
      if (!config.url || !config.anonKey) {
        return null;
      }

      if (typeof window.supabase === 'undefined' || !window.supabase.createClient) {
        console.warn('[SupabaseClient] @supabase/supabase-js library not loaded yet.');
        return null;
      }

      try {
        supabaseInstance = window.supabase.createClient(config.url, config.anonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            storage: window.localStorage
          }
        });
        return supabaseInstance;
      } catch (err) {
        console.error('[SupabaseClient] Failed to create Supabase client:', err);
        return null;
      }
    },

    /**
     * Client-side Image Optimization before upload to Supabase Storage
     * Resizes large photos to appropriate dimensions (max 2400px for artworks, 600px for avatars)
     * and compresses to JPEG/WebP to ensure fast page loads.
     */
    async optimizeImage(file, maxDimension = 2400, quality = 0.88) {
      if (!file || !file.type.startsWith('image/')) return file;

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              } else {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  resolve(file);
                  return;
                }
                const optimizedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
                  type: 'image/jpeg',
                  lastModified: Date.now()
                });
                resolve(optimizedFile);
              },
              'image/jpeg',
              quality
            );
          };
          img.onerror = () => resolve(file);
          img.src = e.target.result;
        };
        reader.onerror = () => resolve(file);
        reader.readAsDataURL(file);
      });
    },

    /**
     * Upload an optimized image to Supabase Storage
     * @param {string} bucket - 'artworks', 'avatars', or 'assets'
     * @param {string} path - path within bucket e.g. 'artist-id/artwork-id.jpg'
     * @param {File} file - file object
     */
    async uploadFile(bucket, path, file) {
      const client = this.getClient();
      if (!client) {
        throw new Error('Supabase is not configured. Please connect Supabase in Settings.');
      }

      // Optimize file
      const maxDim = bucket === 'avatars' ? 600 : 2400;
      const optimized = await this.optimizeImage(file, maxDim);

      const { data, error } = await client.storage
        .from(bucket)
        .upload(path, optimized, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      // Get public URL
      const { data: publicUrlData } = client.storage
        .from(bucket)
        .getPublicUrl(data.path);

      return publicUrlData.publicUrl;
    }
  };

  window.DrawmadooSupabase = SupabaseClient;
})(window);
