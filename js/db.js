/**
 * ═════════════════════════════════════════════════════════════════════
 * DRAWMADOO — Dynamic CMS & Database Engine (Production-Ready)
 * All artworks, artists, categories, collections, and page sections
 * are dynamically loaded and persisted. Zero hardcoded artwork cards.
 * ═════════════════════════════════════════════════════════════════════
 */

'use strict';

const DB_STORAGE_KEY = 'drawmadoo_database_v2';

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
    heroArtworkId: 'art-101',
    heroCustom: {
      badge: 'Handmade Creativity',
      title: 'Original Art.\nCreated by Real Artists.',
      subtitle: 'Discover unique paintings, sketches and digital artworks from talented independent artists around the world.',
      ctaPrimary: 'Explore Gallery',
      ctaSecondary: 'Meet Artists',
      ctaWatch: 'Watch Artist Process'
    },
    featuredArtworkId: 'art-103',
    featuredArtistId: 'art-deshpande',
    trendingArtworkIds: ['art-101', 'art-102', 'art-104', 'art-105', 'art-106', 'art-107'],
    recentArtworkIds: ['art-108', 'art-109', 'art-110', 'art-111', 'art-112', 'art-113', 'art-114', 'art-115']
  },

  /* ── Dynamic Artworks Catalog ── */
  artworks: [
    {
      id: 'art-101',
      title: 'Timeless Grace',
      artistId: 'art-khan',
      artist: 'Aisha Khan',
      artistAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80',
      price: 18500,
      medium: 'Oil Painting',
      category: 'Portrait',
      size: '20 x 24 inches',
      year: 2024,
      orientation: 'vertical',
      rating: 4.8,
      reviewsCount: 120,
      description: 'A mesmerizing oil portrait celebrating timeless beauty, classical poise, and ethereal natural radiance.',
      status: 'available', // available, sold, hidden, draft
      featured: true,
      isPlaceholder: true,
      tags: ['Oil Painting', 'Portrait', 'Indian', 'Classical'],
      images: [
        'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&q=80',
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80'
      ],
      createdAt: '2024-09-12T10:00:00.000Z'
    },
    {
      id: 'art-102',
      title: 'Whispers of Himalaya',
      artistId: 'art-deshpande',
      artist: 'Rohan Deshpande',
      artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      price: 12000,
      medium: 'Watercolor',
      category: 'Landscape',
      size: '24 x 18 inches',
      year: 2024,
      orientation: 'horizontal',
      rating: 4.9,
      reviewsCount: 86,
      description: 'Sweeping snow-capped Himalayan peaks bathed in early morning azure light, painted with spontaneous washes.',
      status: 'available',
      featured: true,
      isPlaceholder: true,
      tags: ['Watercolor', 'Landscape', 'Mountains', 'Nature'],
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
      ],
      createdAt: '2024-09-14T11:30:00.000Z'
    },
    {
      id: 'art-103',
      title: 'Hampi Sunset',
      artistId: 'art-nair',
      artist: 'Meera Nair',
      artistAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      price: 14000,
      medium: 'Acrylic',
      category: 'Traditional',
      size: '28 x 20 inches',
      year: 2024,
      orientation: 'horizontal',
      rating: 4.7,
      reviewsCount: 64,
      description: 'Golden hour cascades across the stone pillars and timeless architecture of historic Hampi ruins.',
      status: 'available',
      featured: true,
      isPlaceholder: true,
      tags: ['Acrylic', 'Traditional', 'Heritage', 'Hampi'],
      images: [
        'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=900&q=80',
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80',
        'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=400&q=80'
      ],
      createdAt: '2024-09-15T14:20:00.000Z'
    },
    {
      id: 'art-104',
      title: 'Silent Thoughts',
      artistId: 'art-rao',
      artist: 'Arjun Rao',
      artistAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
      price: 9500,
      medium: 'Pencil',
      category: 'Sketches',
      size: '16 x 20 inches',
      year: 2024,
      orientation: 'vertical',
      rating: 4.8,
      reviewsCount: 92,
      description: 'Intricate graphite and charcoal study of contemplation and quiet grace, capturing delicate textural contrasts.',
      status: 'available',
      featured: false,
      isPlaceholder: true,
      tags: ['Pencil', 'Sketches', 'Portrait', 'Monochrome'],
      images: [
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80'
      ],
      createdAt: '2024-09-18T09:10:00.000Z'
    },
    {
      id: 'art-105',
      title: 'Dreamscape',
      artistId: 'art-menon',
      artist: 'Kiara Menon',
      artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      price: 16800,
      medium: 'Digital Art',
      category: 'Fantasy',
      size: '30 x 20 inches',
      year: 2024,
      orientation: 'vertical',
      rating: 4.9,
      reviewsCount: 110,
      description: 'Cosmic twilight illuminating ethereal peaks and vibrant celestial nebulae in high definition digital media.',
      status: 'available',
      featured: true,
      isPlaceholder: true,
      tags: ['Digital Art', 'Fantasy', 'Cosmic', 'Vibrant'],
      images: [
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80'
      ],
      createdAt: '2024-09-20T16:45:00.000Z'
    },
    {
      id: 'art-106',
      title: 'Monsoon Streets',
      artistId: 'art-sen',
      artist: 'Vikram Sen',
      artistAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
      price: 11000,
      medium: 'Watercolor',
      category: 'Landscape',
      size: '22 x 16 inches',
      year: 2024,
      orientation: 'vertical',
      rating: 4.6,
      reviewsCount: 58,
      description: 'Rain-soaked colonial streets reflecting warm golden shoplights and dramatic wet reflections.',
      status: 'available',
      featured: false,
      isPlaceholder: true,
      tags: ['Watercolor', 'Cityscape', 'Rain', 'Atmosphere'],
      images: [
        'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80'
      ],
      createdAt: '2024-09-22T13:00:00.000Z'
    },
    {
      id: 'art-107',
      title: 'Lord Krishna',
      artistId: 'art-khan',
      artist: 'Aisha Khan',
      artistAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80',
      price: 21000,
      medium: 'Acrylic',
      category: 'Traditional',
      size: '24 x 36 inches',
      year: 2024,
      orientation: 'vertical',
      rating: 4.9,
      reviewsCount: 200,
      description: 'Divine portrait in radiant azure and gold leaf accents, capturing serenity, devotion, and cosmic balance.',
      status: 'available',
      featured: true,
      isPlaceholder: true,
      tags: ['Acrylic', 'Spiritual', 'Traditional', 'Gold Leaf'],
      images: [
        'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80'
      ],
      createdAt: '2024-09-25T15:30:00.000Z'
    },
    {
      id: 'art-108',
      title: 'Into the Forest',
      artistId: 'art-deshpande',
      artist: 'Rohan Deshpande',
      artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      price: 13500,
      medium: 'Digital Art',
      category: 'Landscape',
      size: '20 x 28 inches',
      year: 2024,
      orientation: 'vertical',
      rating: 4.8,
      reviewsCount: 85,
      description: 'A solitary golden deer standing in a sun-dappled ancient woodland sanctuary.',
      status: 'available',
      featured: false,
      isPlaceholder: true,
      tags: ['Digital Art', 'Nature', 'Forest', 'Wildlife'],
      images: [
        'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80'
      ],
      createdAt: '2024-09-28T18:00:00.000Z'
    },
    {
      id: 'art-109',
      title: 'Abstract Emotions',
      artistId: 'art-nair',
      artist: 'Meera Nair',
      artistAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      price: 10500,
      medium: 'Acrylic',
      category: 'Abstract',
      size: '24 x 24 inches',
      year: 2024,
      orientation: 'square',
      rating: 4.8,
      reviewsCount: 48,
      description: 'Energetic impasto knife strokes blending fiery burnt orange, deep azure, and earthy sienna.',
      status: 'available',
      featured: false,
      isPlaceholder: true,
      tags: ['Acrylic', 'Abstract', 'Contemporary', 'Vibrant'],
      images: [
        'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80'
      ],
      createdAt: '2024-10-01T12:00:00.000Z'
    },
    {
      id: 'art-110',
      title: 'Village Life',
      artistId: 'art-rao',
      artist: 'Arjun Rao',
      artistAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
      price: 11500,
      medium: 'Oil Painting',
      category: 'Traditional',
      size: '30 x 20 inches',
      year: 2024,
      orientation: 'horizontal',
      rating: 4.8,
      reviewsCount: 67,
      description: 'Idyllic rustic countryside cottages framed by swaying coconut palms and sunlit paddy fields.',
      status: 'available',
      featured: false,
      isPlaceholder: true,
      tags: ['Oil Painting', 'Traditional', 'Rural', 'Landscape'],
      images: [
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80'
      ],
      createdAt: '2024-10-04T10:45:00.000Z'
    },
    {
      id: 'art-111',
      title: 'Ocean Breath',
      artistId: 'art-menon',
      artist: 'Kiara Menon',
      artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      price: 14200,
      medium: 'Acrylic',
      category: 'Abstract',
      size: '28 x 20 inches',
      year: 2024,
      orientation: 'horizontal',
      rating: 4.7,
      reviewsCount: 82,
      description: 'Dynamic turquoise oceanic wave cresting under morning mist with sculptural foam texturing.',
      status: 'available',
      featured: false,
      isPlaceholder: true,
      tags: ['Acrylic', 'Nature', 'Ocean', 'Seascape'],
      images: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'
      ],
      createdAt: '2024-10-06T14:10:00.000Z'
    },
    {
      id: 'art-112',
      title: 'Majestic Giants',
      artistId: 'art-sen',
      artist: 'Vikram Sen',
      artistAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
      price: 19000,
      medium: 'Pencil',
      category: 'Sketches',
      size: '30 x 22 inches',
      year: 2024,
      orientation: 'horizontal',
      rating: 4.9,
      reviewsCount: 140,
      description: 'Hyper-detailed graphite tribute to an elder elephant patriarch in the Nilgiri biosphere reserve.',
      status: 'available',
      featured: true,
      isPlaceholder: true,
      tags: ['Pencil', 'Wildlife', 'Elephant', 'Realism'],
      images: [
        'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&q=80'
      ],
      createdAt: '2024-10-09T11:20:00.000Z'
    },
    {
      id: 'art-113',
      title: 'Sacred Bloom',
      artistId: 'art-khan',
      artist: 'Aisha Khan',
      artistAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80',
      price: 12500,
      medium: 'Watercolor',
      category: 'Traditional',
      size: '18 x 24 inches',
      year: 2024,
      orientation: 'vertical',
      rating: 4.8,
      reviewsCount: 85,
      description: 'Luminous pink lotus floating above tranquil dark emerald waters with subtle gold dust highlights.',
      status: 'available',
      featured: false,
      isPlaceholder: true,
      tags: ['Watercolor', 'Spiritual', 'Lotus', 'Botanical'],
      images: [
        'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=800&q=80'
      ],
      createdAt: '2024-10-12T16:15:00.000Z'
    },
    {
      id: 'art-114',
      title: 'Varanasi Ghat',
      artistId: 'art-deshpande',
      artist: 'Rohan Deshpande',
      artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      price: 17000,
      medium: 'Oil Painting',
      category: 'Landscape',
      size: '36 x 24 inches',
      year: 2024,
      orientation: 'horizontal',
      rating: 4.9,
      reviewsCount: 130,
      description: 'Dusk settling along the ancient riverbanks of the Ganges with floating oil lamps and stone stairs.',
      status: 'available',
      featured: false,
      isPlaceholder: true,
      tags: ['Oil Painting', 'Cityscape', 'Varanasi', 'Heritage'],
      images: [
        'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80'
      ],
      createdAt: '2024-10-15T09:40:00.000Z'
    },
    {
      id: 'art-115',
      title: 'Golden Hour',
      artistId: 'art-nair',
      artist: 'Meera Nair',
      artistAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      price: 13800,
      medium: 'Oil Painting',
      category: 'Portrait',
      size: '20 x 24 inches',
      year: 2024,
      orientation: 'vertical',
      rating: 4.7,
      reviewsCount: 79,
      description: 'A study in warm amber backlighting and gentle chiaroscuro honoring traditional Indian portraiture.',
      status: 'available',
      featured: false,
      isPlaceholder: true,
      tags: ['Oil Painting', 'Portrait', 'Warm', 'Classical'],
      images: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80'
      ],
      createdAt: '2024-10-18T13:25:00.000Z'
    }
  ],

  /* ── Dynamic Artists Directory ── */
  artists: [
    {
      id: 'art-khan',
      name: 'Aisha Khan',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80',
      cover: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80',
      style: 'Watercolor & Oil',
      country: 'India',
      city: 'Jaipur',
      followers: 12400,
      salesCount: 43,
      status: 'verified', // verified, pending, suspended
      isPlaceholder: true,
      bio: 'Jaipur-based fine artist specializing in ethereal figurative studies and contemporary interpretations of Rajasthani miniature painting techniques.',
      social: { instagram: '@aishakhanart', twitter: '@aisha_gallery' }
    },
    {
      id: 'art-deshpande',
      name: 'Rohan Deshpande',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      cover: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80',
      style: 'Acrylic & Digital Art',
      country: 'India',
      city: 'Pune',
      followers: 8900,
      salesCount: 89,
      status: 'verified',
      isPlaceholder: true,
      bio: 'Alumnus of Sir J.J. School of Art, traveling across the Indian subcontinent to document sacred geography, temple ruins, and living Himalayan culture.',
      social: { instagram: '@rohandeshpande', youtube: 'RohanArtStudio' }
    },
    {
      id: 'art-nair',
      name: 'Meera Nair',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      cover: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200&q=80',
      style: 'Traditional & Mural',
      country: 'India',
      city: 'Kochi',
      followers: 6700,
      salesCount: 31,
      status: 'verified',
      isPlaceholder: true,
      bio: 'Master Kerala mural painter honoring ancient vegetable dye aesthetics while translating temple frescoes into large canvas statements.',
      social: { instagram: '@meeranair_art' }
    },
    {
      id: 'art-rao',
      name: 'Arjun Rao',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&q=80',
      style: 'Pencil & Oil',
      country: 'India',
      city: 'Bengaluru',
      followers: 15200,
      salesCount: 65,
      status: 'verified',
      isPlaceholder: true,
      bio: 'Dedicated figurative draftsman working in carbon pencil and rich oil glazes, capturing nuanced emotional stillness in human portraits.',
      social: { instagram: '@arjunrao_draws' }
    },
    {
      id: 'art-menon',
      name: 'Kiara Menon',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
      cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
      style: 'Digital Art & Fantasy',
      country: 'India',
      city: 'Mumbai',
      followers: 9100,
      salesCount: 28,
      status: 'verified',
      isPlaceholder: true,
      bio: 'Concept illustrator weaving dreamlike cosmic landscapes, mythic folklore, and celestial lighting schemes.',
      social: { instagram: '@kiaramenon' }
    },
    {
      id: 'art-sen',
      name: 'Vikram Sen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
      style: 'Plein Air & Watercolor',
      country: 'India',
      city: 'Kolkata',
      followers: 7300,
      salesCount: 39,
      status: 'verified',
      isPlaceholder: true,
      bio: 'Plein air painter capturing the damp monsoon atmosphere of old Calcutta and Himalayan wildlife conservation.',
      social: { instagram: '@vikramsen' }
    }
  ],

  /* ── Dynamic Categories ── */
  categories: [
    { id: 'cat-all', name: 'All', icon: '🎨', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&q=80' },
    { id: 'cat-portrait', name: 'Portrait', icon: '👤', image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=200&q=80' },
    { id: 'cat-landscape', name: 'Landscape', icon: '🏔️', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80' },
    { id: 'cat-traditional', name: 'Traditional', icon: '🏛️', image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=200&q=80' },
    { id: 'cat-abstract', name: 'Abstract', icon: '🌀', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&q=80' },
    { id: 'cat-digital', name: 'Digital Art', icon: '💻', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80' },
    { id: 'cat-sketches', name: 'Sketches', icon: '✏️', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&q=80' },
    { id: 'cat-watercolor', name: 'Watercolor', icon: '💧', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=200&q=80' },
    { id: 'cat-oil', name: 'Oil Painting', icon: '🖌️', image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=200&q=80' },
    { id: 'cat-fantasy', name: 'Fantasy', icon: '✨', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&q=80' },
    { id: 'cat-anime', name: 'Anime', icon: '🌸', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&q=80' }
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
      const raw = localStorage.getItem(DB_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Version check or schema validation
        if (parsed && Array.isArray(parsed.artworks)) {
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
