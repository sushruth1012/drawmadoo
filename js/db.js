/**
 * ═════════════════════════════════════════════════════════════════════
 * DRAWMADOO — Dynamic CMS & Database Engine (Production-Ready)
 * All artworks, artists, categories, collections, and page sections
 * are dynamically loaded and persisted. Zero hardcoded artwork cards.
 * ═════════════════════════════════════════════════════════════════════
 */

'use strict';

const DB_STORAGE_KEY = 'drawmadoo_database_v3';

/**
 * Initial Seed Data Schema
 * Note: These are marked with isPlaceholder: true so the administrator
 * can replace or purge them with real artworks at any time via the Admin CMS.
 */
const DEFAULT_DATABASE = {
  version: '2.0.0',
  lastModified: new Date().toISOString(),

  /* ── Site Configuration & Store Identity ── */
  site: {
    name: 'Drawmadoo',
    tagline: 'Where Art Finds Home',
    currency: '₹',
    currencyCode: 'INR',
    logo: null,
    favicon: null,
    announcement: {
      enabled: true,
      text: '🎨 Free worldwide shipping on original orders above ₹15,000',
      link: 'explore.html'
    },
    shipping: {
      freeThreshold: 15000,
      standardCost: 850,
      expressCost: 2200
    }
  },

  /* ── Homepage Builder Section Configurations ── */
  homepage: {
    sections: [
      { id: 'hero', name: 'Hero Section', enabled: true, order: 1 },
      { id: 'categories', name: 'Popular Categories', enabled: true, order: 2 },
      { id: 'artists', name: 'Trending Artists', enabled: true, order: 3 },
      { id: 'why', name: 'Why Drawmadoo', enabled: true, order: 4 },
      { id: 'featured', name: 'Featured Artwork Spotlight', enabled: true, order: 5 },
      { id: 'mediums', name: 'Shop by Medium', enabled: true, order: 6 },
      { id: 'collections', name: 'Curated Collections', enabled: true, order: 7 },
      { id: 'homes', name: 'Art in Real Homes', enabled: true, order: 8 },
      { id: 'spotlight', name: 'Meet the Artist', enabled: true, order: 9 },
      { id: 'newsletter', name: 'Weekly Masterpiece Newsletter', enabled: true, order: 10 }
    ],
    // Admin configured dynamic pointers:
    heroArtworkId: null,
    heroCustom: {
      badge: 'Handmade Creativity',
      title: 'Original Art.\nCreated by Real Artists.',
      subtitle: 'Discover unique paintings, sketches and digital artworks from talented independent artists around the world.',
      ctaPrimary: 'Explore Gallery',
      ctaSecondary: 'Meet Artists',
      ctaWatch: 'Watch Artist Process'
    },
    featuredArtworkId: null,
    featuredArtistId: null,
    trendingArtworkIds: [],
    recentArtworkIds: []
  },

  /* ── Dynamic Artworks Catalog ── */
  artworks: [],

  /* ── Dynamic Artists Directory ── */
  artists: [],

  /* ── Dynamic Categories ── */
  /* ── Dynamic Categories ── */
  categories: [
    { id: 'cat-all', name: 'All', icon: '🎨', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&q=80' },
    { id: 'cat-portrait', name: 'Portrait', icon: '👤', image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=200&q=80' },
    { id: 'cat-landscape', name: 'Landscape', icon: '🏔️', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80' },
    { id: 'cat-traditional', name: 'Traditional', icon: '🏛️', image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=200&q=80' },
    { id: 'cat-abstract', name: 'Abstract', icon: '🌀', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&q=80' },
    { id: 'cat-modern', name: 'Modern', icon: '📐', image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=200&q=80' },
    { id: 'cat-fantasy', name: 'Fantasy', icon: '✨', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&q=80' },
    { id: 'cat-anime', name: 'Anime', icon: '🌸', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&q=80' },
    { id: 'cat-nature', name: 'Nature', icon: '🌿', image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=200&q=80' },
    { id: 'cat-architecture', name: 'Architecture', icon: '🏰', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=200&q=80' },
    { id: 'cat-spiritual', name: 'Spiritual', icon: '🕉️', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=200&q=80' },
    { id: 'cat-wildlife', name: 'Wildlife', icon: '🦌', image: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=200&q=80' },
    { id: 'cat-watercolor', name: 'Watercolor', icon: '💧', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=200&q=80' },
    { id: 'cat-oil', name: 'Oil Painting', icon: '🖌️', image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=200&q=80' },
    { id: 'cat-ink', name: 'Ink', icon: '✒️', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&q=80' },
    { id: 'cat-pencil', name: 'Pencil', icon: '✏️', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&q=80' },
    { id: 'cat-digital', name: 'Digital Art', icon: '💻', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80' },
    { id: 'cat-mixed', name: 'Mixed Media', icon: '🎭', image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?w=200&q=80' }
  ],

  /* ── Dynamic Collections ── */
  collections: [
    {
      id: 'col-modern-living',
      name: 'Modern Living',
      description: 'Architectural abstractions and soothing neutral works designed for contemporary residences.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      artworkIds: ['art-101', 'art-109', 'art-111']
    },
    {
      id: 'col-nature',
      name: 'Nature & Solitude',
      description: 'Plein air landscapes, whispering mountains, and botanical serenity.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
      artworkIds: ['art-102', 'art-106', 'art-108']
    },
    {
      id: 'col-indian-heritage',
      name: 'Indian Heritage',
      description: 'Celebration of temple architecture, mythological lore, and time-honored artisanal methods.',
      image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&q=80',
      artworkIds: ['art-103', 'art-107', 'art-114']
    },
    {
      id: 'col-minimal',
      name: 'Minimal & Monochromes',
      description: 'Intricate graphite studies and subtle gestural washes where negative space speaks.',
      image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600&q=80',
      artworkIds: ['art-104', 'art-112']
    },
    {
      id: 'col-fantasy',
      name: 'Cosmic & Mythic',
      description: 'Visionary digital realms, celestial horizons, and fantastical dreamscapes.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
      artworkIds: ['art-105']
    }
  ],

  /* ── Customer Homes Showcase ── */
  customerHomes: [
    { id: 'home-1', customer: 'Priya & Rahul S.', location: 'Bandra, Mumbai', artworkTitle: 'Hampi Sunset', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
    { id: 'home-2', customer: 'Kabir Mehta', location: 'Indiranagar, Bengaluru', artworkTitle: 'Whispers of Himalaya', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80' },
    { id: 'home-3', customer: 'Elena Rostova', location: 'Kensington, London', artworkTitle: 'Timeless Grace', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
    { id: 'home-4', customer: 'Ananya Deshmukh', location: 'Civil Lines, Delhi', artworkTitle: 'Lord Krishna', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80' }
  ]
};

/**
 * DrawmadooDB Engine
 * Exposes full CRUD and reactive event broadcasting.
 */
class DrawmadooDatabaseEngine {
  constructor() {
    this.db = this.load();
    this.listeners = new Set();
    this.initCrossTabSync();
  }

  load() {
    try {
      // Purge old versions to provide clean slate
      localStorage.removeItem('drawmadoo_database_v2');
      localStorage.removeItem('drawmadoo_database');
      const raw = localStorage.getItem(DB_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.artworks)) {
          // Filter out legacy placeholders if any
          parsed.artworks = parsed.artworks.filter(a => !a.isPlaceholder && !String(a.id).startsWith('art-1'));
          parsed.artists = (parsed.artists || []).filter(a => !a.isPlaceholder && !String(a.id).startsWith('art-'));
          return parsed;
        }
      }
    } catch (e) {
      console.warn('⚠️ Could not load database from localStorage. Initializing default.', e);
    }
    this.save(DEFAULT_DATABASE, false);
    return JSON.parse(JSON.stringify(DEFAULT_DATABASE));
  }

  save(dataToSave, notify = true) {
    dataToSave = dataToSave || this.db;
    dataToSave.lastModified = new Date().toISOString();
    try {
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('❌ Failed to persist to localStorage (quota exceeded?):', e);
    }
    this.db = dataToSave;
    if (notify) {
      this.broadcastChange();
    }
  }

  broadcastChange(origin = 'local') {
    const event = new CustomEvent('drawmadoo:dbchange', { detail: { origin, db: this.db } });
    window.dispatchEvent(event);
    this.listeners.forEach(cb => {
      try { cb(this.db); } catch (err) { console.error(err); }
    });
  }

  initCrossTabSync() {
    window.addEventListener('storage', e => {
      if (e.key === DB_STORAGE_KEY && e.newValue) {
        try {
          this.db = JSON.parse(e.newValue);
          this.broadcastChange('crosstab');
        } catch (err) {
          console.error('Error syncing database across tabs:', err);
        }
      }
    });
  }

  onChange(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /* ──────────────────────────────────────────────────
     SUPABASE INTEGRATION (CMS-First Cloud Connectivity)
     ────────────────────────────────────────────────── */
  getSupabaseConfig() {
    try {
      const saved = localStorage.getItem('drawmadoo_supabase_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.url && parsed.anonKey) {
          return {
            ...parsed,
            url: parsed.url.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, ''),
            enabled: true
          };
        }
      }
    } catch (e) {
      console.warn('Could not read Supabase config', e);
    }
    const defaultUrl = 'https://luishtsdhiitqbzolydw.supabase.co';
    const defaultKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1aXNodHNkaGlpdHFiem9seWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4NTI1NjIsImV4cCI6MjEwODQyODU2Mn0.nERuyLOpDcchYlpyt3c_F6PB7t8n6KarNqCIVHiPCCI';
    const url = (window.__DRAWMADOO_SUPABASE_URL__ || defaultUrl).replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
    const anonKey = (window.__DRAWMADOO_SUPABASE_KEY__ || defaultKey).trim();
    return {
      url,
      anonKey,
      table: 'artworks',
      enabled: Boolean(url && anonKey)
    };
  }

  saveSupabaseConfig(config) {
    try {
      const cleanUrl = (config.url || '').replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
      const cleanConfig = { ...config, url: cleanUrl };
      localStorage.setItem('drawmadoo_supabase_config', JSON.stringify(cleanConfig));
      this.broadcastChange('supabase_config');
      return cleanConfig;
    } catch (e) {
      console.error('Failed to save Supabase config', e);
    }
    return config;
  }

  async fetchSupabaseArtworks() {
    const config = this.getSupabaseConfig();
    if (!config.url || !config.anonKey) {
      return null;
    }
    try {
      const baseUrl = config.url.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
      const endpoint = `${baseUrl}/rest/v1/${config.table || 'artworks'}?select=*&order=created_at.desc`;
      const res = await fetch(endpoint, {
        headers: {
          'apikey': config.anonKey,
          'Authorization': `Bearer ${config.anonKey}`,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error(`Supabase error HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(row => {
          const imgUrl = row.primary_image_url || (Array.isArray(row.images) ? row.images[0] : row.image) || '';
          const categoryName = row.category || (Array.isArray(row.tags) && row.tags.length > 0 ? row.tags[0] : 'Traditional');
          return {
            id: String(row.id || `sup-${Math.random().toString(36).substr(2, 9)}`),
            title: row.title || 'Untitled Artwork',
            artist: row.artist || row.artist_name || 'Independent Artist',
            artistAvatar: row.artist_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            price: Number(row.price) || 12000,
            medium: row.medium || 'Oil Painting',
            category: categoryName,
            size: row.size || row.dimensions || '24 x 18 inches',
            year: row.year || 2026,
            description: row.description || '',
            status: row.status || 'available',
            featured: Boolean(row.featured),
            image: imgUrl,
            images: [imgUrl]
          };
        });
      }
    } catch (e) {
      console.warn('⚠️ Supabase fetch fallback to local CMS database:', e.message);
    }
    return null;
  }

  /* ──────────────────────────────────────────────────
     ARTWORK CRUD OPERATIONS
     ────────────────────────────────────────────────── */
  getArtworks(filterOpts = {}) {
    let list = [...this.db.artworks];

    // Status filter (available, sold, hidden, draft)
    if (filterOpts.status && filterOpts.status !== 'all') {
      list = list.filter(a => a.status === filterOpts.status);
    } else if (!filterOpts.includeHidden) {
      // By default for customer storefront, only show available or sold (hide hidden/draft)
      list = list.filter(a => a.status === 'available' || a.status === 'sold');
    }

    // Category filter
    if (filterOpts.category && filterOpts.category !== 'All' && filterOpts.category !== 'cat-all') {
      list = list.filter(a => a.category?.toLowerCase() === filterOpts.category.toLowerCase());
    }

    // Medium filter
    if (filterOpts.medium && filterOpts.medium !== 'all') {
      list = list.filter(a => a.medium?.toLowerCase() === filterOpts.medium.toLowerCase());
    }

    // Search query
    if (filterOpts.search) {
      const q = filterOpts.search.toLowerCase().trim();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.artist.toLowerCase().includes(q) ||
        (a.tags && a.tags.some(t => t.toLowerCase().includes(q))) ||
        (a.description && a.description.toLowerCase().includes(q))
      );
    }

    // Featured only
    if (filterOpts.featuredOnly) {
      list = list.filter(a => a.featured);
    }

    // Price range
    if (typeof filterOpts.minPrice === 'number') {
      list = list.filter(a => a.price >= filterOpts.minPrice);
    }
    if (typeof filterOpts.maxPrice === 'number' && filterOpts.maxPrice < Infinity) {
      list = list.filter(a => a.price <= filterOpts.maxPrice);
    }

    // Sorting
    if (filterOpts.sortBy) {
      switch (filterOpts.sortBy) {
        case 'price-asc':
          list.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          list.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          break;
        case 'rating':
          list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'trending':
        default:
          // Featured first, then reviews count
          list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (b.reviewsCount || 0) - (a.reviewsCount || 0));
          break;
      }
    }

    return list;
  }

  getArtworkById(id) {
    return this.db.artworks.find(a => a.id === id) || null;
  }

  createArtwork(artworkData) {
    const id = artworkData.id || `art-${Date.now()}`;
    const newArt = {
      id,
      title: artworkData.title || 'Untitled Masterpiece',
      artistId: artworkData.artistId || (this.db.artists[0]?.id || 'art-independent'),
      artist: artworkData.artist || 'Independent Artist',
      artistAvatar: artworkData.artistAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      price: Number(artworkData.price) || 5000,
      medium: artworkData.medium || 'Oil Painting',
      category: artworkData.category || 'Contemporary',
      size: artworkData.size || '24 x 18 inches',
      year: Number(artworkData.year) || new Date().getFullYear(),
      orientation: artworkData.orientation || 'vertical',
      rating: 5.0,
      reviewsCount: 1,
      description: artworkData.description || 'Original hand-crafted masterwork with provenance certificate.',
      status: artworkData.status || 'available',
      featured: Boolean(artworkData.featured),
      isPlaceholder: false,
      tags: Array.isArray(artworkData.tags) ? artworkData.tags : (artworkData.tags ? artworkData.tags.split(',').map(s => s.trim()) : ['Original Art']),
      images: Array.isArray(artworkData.images) && artworkData.images.length > 0 ? artworkData.images : [
        artworkData.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80'
      ],
      createdAt: new Date().toISOString()
    };

    this.db.artworks.unshift(newArt);
    this.save();
    return newArt;
  }

  updateArtwork(id, updates) {
    const index = this.db.artworks.findIndex(a => a.id === id);
    if (index === -1) return null;

    // Sanitize price
    if (updates.price !== undefined) updates.price = Number(updates.price);
    if (updates.tags && typeof updates.tags === 'string') {
      updates.tags = updates.tags.split(',').map(t => t.trim()).filter(Boolean);
    }
    // If updating primary image
    if (updates.image && updates.images) {
      if (!updates.images.includes(updates.image)) {
        updates.images.unshift(updates.image);
      }
    } else if (updates.image && !updates.images) {
      updates.images = [updates.image];
    }

    this.db.artworks[index] = {
      ...this.db.artworks[index],
      ...updates,
      isPlaceholder: false, // Once updated by admin, it is officially real content
      updatedAt: new Date().toISOString()
    };

    this.save();
    return this.db.artworks[index];
  }

  deleteArtwork(id) {
    this.db.artworks = this.db.artworks.filter(a => a.id !== id);
    // Remove references in homepage
    if (this.db.homepage.heroArtworkId === id) this.db.homepage.heroArtworkId = this.db.artworks[0]?.id || null;
    if (this.db.homepage.featuredArtworkId === id) this.db.homepage.featuredArtworkId = this.db.artworks[0]?.id || null;
    this.db.homepage.trendingArtworkIds = this.db.homepage.trendingArtworkIds.filter(aid => aid !== id);
    // Remove from collections
    this.db.collections.forEach(col => {
      col.artworkIds = (col.artworkIds || []).filter(aid => aid !== id);
    });

    this.save();
    return true;
  }

  duplicateArtwork(id) {
    const source = this.getArtworkById(id);
    if (!source) return null;

    const copy = JSON.parse(JSON.stringify(source));
    copy.id = `art-${Date.now()}`;
    copy.title = `${source.title} (Copy)`;
    copy.createdAt = new Date().toISOString();
    copy.isPlaceholder = false;
    copy.status = 'draft';

    const index = this.db.artworks.findIndex(a => a.id === id);
    this.db.artworks.splice(index + 1, 0, copy);
    this.save();
    return copy;
  }

  toggleArtworkFeatured(id) {
    const art = this.getArtworkById(id);
    if (!art) return null;
    art.featured = !art.featured;
    this.save();
    return art.featured;
  }

  setArtworkStatus(id, newStatus) {
    const art = this.getArtworkById(id);
    if (!art) return null;
    art.status = newStatus;
    this.save();
    return art;
  }

  reorderArtworks(orderedIds) {
    const lookup = new Map(this.db.artworks.map(a => [a.id, a]));
    const reordered = [];
    orderedIds.forEach(id => {
      if (lookup.has(id)) {
        reordered.push(lookup.get(id));
        lookup.delete(id);
      }
    });
    // Add any remaining
    lookup.forEach(a => reordered.push(a));
    this.db.artworks = reordered;
    this.save();
  }

  /* ──────────────────────────────────────────────────
     ARTIST CRUD OPERATIONS
     ────────────────────────────────────────────────── */
  getArtists(filterOpts = {}) {
    let list = [...this.db.artists];
    if (filterOpts.status && filterOpts.status !== 'all') {
      list = list.filter(a => a.status === filterOpts.status);
    }
    if (filterOpts.search) {
      const q = filterOpts.search.toLowerCase().trim();
      list = list.filter(a =>
        a.name.toLowerCase().includes(q) ||
        (a.style && a.style.toLowerCase().includes(q)) ||
        (a.city && a.city.toLowerCase().includes(q))
      );
    }
    return list;
  }

  getArtistById(id) {
    return this.db.artists.find(a => a.id === id) || null;
  }

  createArtist(artistData) {
    const id = artistData.id || `art-${Date.now()}`;
    const newArtist = {
      id,
      name: artistData.name || 'New Creator',
      avatar: artistData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
      cover: artistData.cover || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80',
      style: artistData.style || 'Contemporary',
      country: artistData.country || 'India',
      city: artistData.city || 'Mumbai',
      followers: 120,
      salesCount: 0,
      status: artistData.status || 'verified',
      isPlaceholder: false,
      bio: artistData.bio || 'Independent studio artist dedicated to original handmade creativity.',
      social: artistData.social || { instagram: '@drawmadoo' }
    };
    this.db.artists.unshift(newArtist);
    this.save();
    return newArtist;
  }

  updateArtist(id, updates) {
    const index = this.db.artists.findIndex(a => a.id === id);
    if (index === -1) return null;
    this.db.artists[index] = {
      ...this.db.artists[index],
      ...updates,
      isPlaceholder: false
    };
    // Sync artist name across artworks if changed
    if (updates.name) {
      this.db.artworks.forEach(art => {
        if (art.artistId === id) {
          art.artist = updates.name;
          if (updates.avatar) art.artistAvatar = updates.avatar;
        }
      });
    }
    this.save();
    return this.db.artists[index];
  }

  deleteArtist(id) {
    this.db.artists = this.db.artists.filter(a => a.id !== id);
    if (this.db.homepage.featuredArtistId === id) {
      this.db.homepage.featuredArtistId = this.db.artists[0]?.id || null;
    }
    this.save();
    return true;
  }

  /* ──────────────────────────────────────────────────
     HOMEPAGE BUILDER CONFIGURATION
     ────────────────────────────────────────────────── */
  getHomepageConfig() {
    return this.db.homepage;
  }

  updateHomepageConfig(updates) {
    this.db.homepage = {
      ...this.db.homepage,
      ...updates
    };
    this.save();
    return this.db.homepage;
  }

  setHeroArtwork(artworkId, customOverrides = null) {
    this.db.homepage.heroArtworkId = artworkId;
    if (customOverrides) {
      this.db.homepage.heroCustom = {
        ...this.db.homepage.heroCustom,
        ...customOverrides
      };
    }
    this.save();
  }

  setFeaturedArtwork(artworkId) {
    this.db.homepage.featuredArtworkId = artworkId;
    this.save();
  }

  /* ──────────────────────────────────────────────────
     COLLECTION & CATEGORY OPERATIONS
     ────────────────────────────────────────────────── */
  getCategories() {
    return this.db.categories;
  }

  getCollections() {
    return this.db.collections;
  }

  updateCategory(id, updates) {
    const cat = this.db.categories.find(c => c.id === id);
    if (cat) {
      Object.assign(cat, updates);
      this.save();
    }
    return cat;
  }

  updateCollection(id, updates) {
    const col = this.db.collections.find(c => c.id === id);
    if (col) {
      Object.assign(col, updates);
      this.save();
    }
    return col;
  }

  addArtworkToCollection(collectionId, artworkId) {
    const col = this.db.collections.find(c => c.id === collectionId);
    if (col) {
      col.artworkIds = col.artworkIds || [];
      if (!col.artworkIds.includes(artworkId)) {
        col.artworkIds.push(artworkId);
        this.save();
      }
    }
  }

  removeArtworkFromCollection(collectionId, artworkId) {
    const col = this.db.collections.find(c => c.id === collectionId);
    if (col && col.artworkIds) {
      col.artworkIds = col.artworkIds.filter(id => id !== artworkId);
      this.save();
    }
  }

  /* ──────────────────────────────────────────────────
     ADMIN BULK ACTIONS & DATA CLEANSING
     ────────────────────────────────────────────────── */
  /**
   * Purges all placeholder/demo artworks and artists so administrators
   * can launch with only authentic customer catalog.
   */
  clearAllPlaceholders() {
    this.db.artworks = this.db.artworks.filter(a => !a.isPlaceholder);
    this.db.artists = this.db.artists.filter(a => !a.isPlaceholder);
    this.save();
  }

  resetToDefaults() {
    this.db = JSON.parse(JSON.stringify(DEFAULT_DATABASE));
    this.save(this.db, true);
  }

  exportJSON() {
    return JSON.stringify(this.db, null, 2);
  }

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && Array.isArray(parsed.artworks) && Array.isArray(parsed.artists)) {
        this.db = parsed;
        this.save(this.db, true);
        return { success: true };
      }
      return { success: false, error: 'Invalid Drawmadoo database schema.' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
}

// Global singleton instance
window.DrawmadooDB = new DrawmadooDatabaseEngine();
