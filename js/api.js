/**
 * ═════════════════════════════════════════════════════════════════════
 * DRAWMADOO — Unified Supabase Data Access Layer & Business Services
 * Handles CRUD operations, joins, uploads, and resilient fallbacks.
 * ═════════════════════════════════════════════════════════════════════
 */

(function (window) {
  'use strict';

  const DrawmadooAPI = {
    /**
     * ── ARTWORKS SERVICE ──
     */
    async getArtworks(options = {}) {
      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;

      if (client) {
        try {
          let query = client
            .from('artworks')
            .select(`
              id,
              title,
              slug,
              price,
              medium,
              dimensions,
              year,
              description,
              status,
              featured,
              primary_image_url,
              tags,
              views_count,
              created_at,
              category:categories(id, name, slug),
              artist:artist_profiles(id, display_name, cover_image_url, verification_status)
            `);

          // Apply filters
          if (options.status) {
            query = query.eq('status', options.status);
          } else if (!options.includeAll) {
            query = query.in('status', ['available', 'sold']);
          }

          if (options.category && options.category !== 'all') {
            query = query.eq('category_id', options.category);
          }

          if (options.medium && options.medium !== 'all') {
            query = query.eq('medium', options.medium);
          }

          if (options.artistId) {
            query = query.eq('artist_id', options.artistId);
          }

          if (options.featured) {
            query = query.eq('featured', true);
          }

          // Sorting
          if (options.sortBy === 'price-low') {
            query = query.order('price', { ascending: true });
          } else if (options.sortBy === 'price-high') {
            query = query.order('price', { ascending: false });
          } else {
            query = query.order('created_at', { ascending: false });
          }

          if (options.limit) {
            query = query.limit(options.limit);
          }

          const { data, error } = await query;

          if (!error && Array.isArray(data) && data.length > 0) {
            // Map Supabase relational rows into standardized artwork objects
            return data.map(item => ({
              id: item.id,
              title: item.title,
              price: Number(item.price),
              medium: item.medium,
              category: item.category ? item.category.name : 'Fine Art',
              categoryId: item.category ? item.category.id : null,
              size: item.dimensions || '24 x 18 inches',
              year: item.year || 2024,
              description: item.description || '',
              status: item.status,
              featured: item.featured,
              artistId: item.artist ? item.artist.id : null,
              artist: item.artist ? item.artist.display_name : 'Independent Artist',
              artistAvatar: item.artist?.cover_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
              artistVerified: item.artist?.verification_status === 'verified',
              images: [item.primary_image_url],
              primaryImage: item.primary_image_url,
              tags: item.tags || []
            }));
          }
        } catch (err) {
          console.warn('[DrawmadooAPI] Supabase artworks fetch failed, falling back to local catalog:', err);
        }
      }

      // Seamless fallback to DrawmadooDB catalog
      if (window.DrawmadooDB && typeof window.DrawmadooDB.getArtworks === 'function') {
        return window.DrawmadooDB.getArtworks(options);
      }

      return [];
    },

    /**
     * Get single artwork by ID
     */
    async getArtworkById(id) {
      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;

      if (client && id && !id.startsWith('art-')) {
        try {
          const { data, error } = await client
            .from('artworks')
            .select(`
              *,
              category:categories(*),
              artist:artist_profiles(*),
              images:artwork_images(*)
            `)
            .eq('id', id)
            .single();

          if (!error && data) {
            return {
              id: data.id,
              title: data.title,
              price: Number(data.price),
              medium: data.medium,
              category: data.category ? data.category.name : 'Fine Art',
              size: data.dimensions,
              year: data.year,
              description: data.description,
              status: data.status,
              artist: data.artist ? data.artist.display_name : 'Independent Artist',
              artistAvatar: data.artist?.cover_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
              images: data.images && data.images.length > 0 ? data.images.map(img => img.image_url) : [data.primary_image_url]
            };
          }
        } catch (e) {
          console.warn('[DrawmadooAPI] Get artwork by id error:', e);
        }
      }

      if (window.DrawmadooDB) {
        return window.DrawmadooDB.getArtworkById(id);
      }
      return null;
    },

    /**
     * Create Artwork (Direct Supabase Storage Upload & public.artworks Insert)
     */
    async createArtwork(artworkData, imageFile) {
      const user = window.AuthService?.currentUser;
      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;

      let primaryImageUrl = artworkData.primary_image_url || '';

      // Upload image to Supabase Storage if file is provided
      if (imageFile && client) {
        const fileExt = (imageFile.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
        const userPrefix = user ? user.id : 'curator';
        const filePath = `${userPrefix}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        
        console.log('[DrawmadooAPI] Uploading artwork to Supabase Storage:', filePath);
        primaryImageUrl = await window.DrawmadooSupabase.uploadFile('artworks', filePath, imageFile);
        console.log('[DrawmadooAPI] Storage upload complete! Public URL:', primaryImageUrl);
      }

      if (client && primaryImageUrl) {
        const payload = {
          title: artworkData.title,
          price: Number(artworkData.price) || 0,
          medium: artworkData.medium || 'Original Medium',
          dimensions: artworkData.size || artworkData.dimensions || 'Standard',
          year: artworkData.year || new Date().getFullYear(),
          description: artworkData.description || '',
          status: artworkData.status || 'available',
          primary_image_url: primaryImageUrl,
          tags: artworkData.tags || []
        };
        if (artworkData.categoryId) payload.category_id = artworkData.categoryId;
        if (user && user.id) payload.artist_id = user.id;
        if (artworkData.artist) payload.artist_name = artworkData.artist;

        console.log('[DrawmadooAPI] Inserting artwork into public.artworks table...');
        const { data, error } = await client
          .from('artworks')
          .insert([payload])
          .select()
          .single();

        if (error) {
          console.warn('[DrawmadooAPI] Artwork table insert notice:', error);
          if (error.message && (error.message.includes('foreign key') || error.message.includes('artist_id') || error.message.includes('artist_name'))) {
            delete payload.artist_id;
            delete payload.artist_name;
            const { data: retryData, error: retryError } = await client
              .from('artworks')
              .insert([payload])
              .select()
              .single();
            if (!retryError && retryData) return retryData;
          }
        } else if (data) {
          console.log('[DrawmadooAPI] Successfully inserted into public.artworks:', data);
          return data;
        }
      }

      // Sync with DrawmadooDB
      if (window.DrawmadooDB) {
        return window.DrawmadooDB.createArtwork({
          ...artworkData,
          artistId: user ? user.id : 'art-curator',
          artist: artworkData.artist || window.AuthService?.userProfile?.fullName || 'Curated Masterpiece',
          image: primaryImageUrl || artworkData.image,
          images: [primaryImageUrl || artworkData.image]
        });
      }
    },

    /**
     * ── CATEGORIES SERVICE ──
     */
    async getCategories() {
      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;
      if (client) {
        try {
          const { data, error } = await client
            .from('categories')
            .select('*')
            .order('display_order', { ascending: true });

          if (!error && Array.isArray(data) && data.length > 0) {
            return data;
          }
        } catch (e) {}
      }

      if (window.DrawmadooDB) {
        return window.DrawmadooDB.getCategories();
      }
      return [];
    },

    /**
     * ── WISHLIST SERVICE ──
     */
    async getWishlist() {
      const user = window.AuthService?.currentUser;
      if (!user) return [];

      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;
      if (client) {
        try {
          const { data, error } = await client
            .from('wishlist')
            .select('artwork_id, artworks(*)')
            .eq('user_id', user.id);

          if (!error && data) {
            return data.map(w => w.artwork_id);
          }
        } catch (e) {}
      }

      // Local storage fallback
      try {
        return JSON.parse(localStorage.getItem('drawmadoo_wishlist') || '[]');
      } catch (e) {
        return [];
      }
    },

    async toggleWishlist(artworkId) {
      const user = window.AuthService?.currentUser;
      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;

      if (user && client) {
        try {
          // Check if already in wishlist
          const { data } = await client
            .from('wishlist')
            .select('id')
            .eq('user_id', user.id)
            .eq('artwork_id', artworkId)
            .maybeSingle();

          if (data) {
            // Remove
            await client.from('wishlist').delete().eq('id', data.id);
            return { action: 'removed' };
          } else {
            // Insert
            await client.from('wishlist').insert({ user_id: user.id, artwork_id: artworkId });
            return { action: 'added' };
          }
        } catch (e) {
          console.warn('[DrawmadooAPI] Wishlist error:', e);
        }
      }

      // Local storage toggle
      let list = [];
      try { list = JSON.parse(localStorage.getItem('drawmadoo_wishlist') || '[]'); } catch (e) {}
      const idx = list.indexOf(artworkId);
      let action = 'added';
      if (idx > -1) {
        list.splice(idx, 1);
        action = 'removed';
      } else {
        list.push(artworkId);
      }
      localStorage.setItem('drawmadoo_wishlist', JSON.stringify(list));
      return { action };
    },

    /**
     * ── CART SERVICE ──
     */
    async getCart() {
      const user = window.AuthService?.currentUser;
      if (!user) {
        try { return JSON.parse(localStorage.getItem('drawmadoo_cart') || '[]'); } catch (e) { return []; }
      }

      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;
      if (client) {
        try {
          const { data, error } = await client
            .from('cart_items')
            .select('artwork_id, quantity, artworks(*)')
            .eq('user_id', user.id);

          if (!error && data) {
            return data.map(item => ({
              id: item.artwork_id,
              quantity: item.quantity,
              artwork: item.artworks
            }));
          }
        } catch (e) {}
      }

      try { return JSON.parse(localStorage.getItem('drawmadoo_cart') || '[]'); } catch (e) { return []; }
    },

    async addToCart(artworkId, quantity = 1) {
      const user = window.AuthService?.currentUser;
      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;

      if (user && client) {
        try {
          await client.from('cart_items').upsert({
            user_id: user.id,
            artwork_id: artworkId,
            quantity: quantity
          });
        } catch (e) {
          console.warn('[DrawmadooAPI] Add to cart error:', e);
        }
      }

      let cart = [];
      try { cart = JSON.parse(localStorage.getItem('drawmadoo_cart') || '[]'); } catch (e) {}
      const existing = cart.find(c => c.id === artworkId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ id: artworkId, quantity });
      }
      localStorage.setItem('drawmadoo_cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('drawmadoo:cart_updated', { detail: cart }));
      return cart;
    }
  };

  window.DrawmadooAPI = DrawmadooAPI;
})(window);
