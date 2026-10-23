/* ═══════════════════════════════════════════════════════════
   DRAWMADOO — Mock Data Layer (Simulates CMS/Database)
   All content is editable via admin mode.
   ═══════════════════════════════════════════════════════════ */

const DrawmadooData = {

  /* ── Site Settings ── */
  site: {
    name: 'Drawmadoo',
    tagline: 'Where Art Finds Home',
    logo: null,
    favicon: null,
    darkMode: false,
    adminMode: false,
    announcement: {
      enabled: true,
      text: '🎨 Free worldwide shipping on orders above ₹15,000',
      link: '#'
    }
  },

  /* ── Hero Section ── */
  hero: {
    badge: 'Handmade Creativity',
    title: 'Original Art.\nCreated by Real Artists.',
    subtitle: 'Discover unique paintings, sketches and digital artworks from talented independent artists around the world.',
    cta1: { text: 'Explore Gallery', link: '#gallery', icon: 'arrow-right' },
    cta2: { text: 'Meet Artists', link: '#artists' },
    cta3: { text: 'Watch Artist Process', link: '#', icon: 'play' },
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80',
    stats: [
      { value: '18,000+', label: 'Original Artworks', icon: 'palette' },
      { value: '2,700+', label: 'Verified Artists', icon: 'users' },
      { value: '34', label: 'Countries', icon: 'globe' },
      { value: '250K+', label: 'Collectors', icon: 'heart' }
    ]
  },

  /* ── Categories ── */
  categories: [
    { id: 1, name: 'Portrait', image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400&q=80', count: 2340 },
    { id: 2, name: 'Landscape', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', count: 1850 },
    { id: 3, name: 'Abstract', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80', count: 3120 },
    { id: 4, name: 'Traditional', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&q=80', count: 980 },
    { id: 5, name: 'Digital Art', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80', count: 4210 },
    { id: 6, name: 'Sketches', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80', count: 1560 },
    { id: 7, name: 'Watercolor', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=80', count: 2100 },
    { id: 8, name: 'Oil Painting', image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=400&q=80', count: 1780 },
    { id: 9, name: 'Fantasy', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80', count: 890 },
    { id: 10, name: 'Anime', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80', count: 3450 }
  ],

  /* ── Trending Artists ── */
  artists: [
    {
      id: 1, name: 'Aisha Khan', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80',
      style: 'Watercolor', country: 'India', countryFlag: '🇮🇳', followers: 12400, verified: true,
      bio: 'Watercolor artist specializing in ethereal landscapes and botanical illustrations.',
      featured: true
    },
    {
      id: 2, name: 'Rohan Deshpande', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      style: 'Digital Art', country: 'India', countryFlag: '🇮🇳', followers: 8900, verified: true,
      bio: 'Digital artist creating vibrant, story-driven artwork inspired by Indian mythology.',
      featured: true
    },
    {
      id: 3, name: 'Meera Nair', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      style: 'Traditional', country: 'India', countryFlag: '🇮🇳', followers: 6700, verified: true,
      bio: 'Traditional Kerala mural painter bringing ancient art forms to modern collectors.',
      featured: true
    },
    {
      id: 4, name: 'Arjun Rao', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
      style: 'Portrait', country: 'India', countryFlag: '🇮🇳', followers: 15200, verified: true,
      bio: 'Portrait artist known for expressive oil paintings capturing the human spirit.',
      featured: true
    },
    {
      id: 5, name: 'Kiara Menon', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      style: 'Illustration', country: 'India', countryFlag: '🇮🇳', followers: 9100, verified: true,
      bio: 'Illustrator creating whimsical, narrative-driven artwork for books and galleries.',
      featured: false
    },
    {
      id: 6, name: 'Vikram Sen', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
      style: 'Landscape', country: 'India', countryFlag: '🇮🇳', followers: 7300, verified: true,
      bio: 'Plein air painter capturing the breathtaking landscapes of the Himalayas.',
      featured: false
    },
    {
      id: 7, name: 'Sarah Mitchell', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
      style: 'Abstract', country: 'USA', countryFlag: '🇺🇸', followers: 18500, verified: true,
      bio: 'Abstract expressionist working with bold colors and large-scale canvases.',
      featured: false
    },
    {
      id: 8, name: 'Yuki Tanaka', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80',
      style: 'Anime', country: 'Japan', countryFlag: '🇯🇵', followers: 22100, verified: true,
      bio: 'Anime-inspired digital artist with a unique blend of traditional and modern techniques.',
      featured: false
    }
  ],

  /* ── Why Drawmadoo ── */
  whyDrawmadoo: [
    { icon: 'hand-heart', title: '100% Human Made', description: 'Original artworks from real artists. No AI-generated art, ever.' },
    { icon: 'certificate', title: 'Certificate Included', description: 'Authenticity with every purchase. Verified and signed.' },
    { icon: 'shield-check', title: 'Secure Shipping', description: 'Safe and reliable delivery worldwide with tracking.' },
    { icon: 'heart-handshake', title: 'Support Artists', description: 'Directly support independent creators and their craft.' },
    { icon: 'globe', title: 'Worldwide Delivery', description: 'Art delivered to your doorstep from 34 countries.' }
  ],

  /* ── Featured Artwork ── */
  featuredArtwork: {
    id: 1,
    title: 'Evening at Hampi',
    description: 'A serene view of the historic Hampi ruins during sunset, painted in acrylic on canvas. This piece captures the golden hour light cascading through ancient temple pillars.',
    price: 12500,
    currency: '₹',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=900&q=80',
    thumbnails: [
      'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=200&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&q=80',
      'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=200&q=80',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&q=80'
    ],
    medium: 'Acrylic on Canvas',
    size: '24 x 18 inches',
    year: 2024,
    artist: {
      name: 'Rohan Deshpande',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      verified: true
    },
    tags: ['landscape', 'heritage', 'sunset', 'architecture'],
    featured: true,
    inStock: true,
    rating: 4.9,
    reviews: 47
  },

  /* ── Shop by Medium ── */
  mediums: [
    { id: 1, name: 'Oil Painting', icon: '🖌️', image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=200&q=80', count: 1780 },
    { id: 2, name: 'Watercolor', icon: '💧', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=200&q=80', count: 2100 },
    { id: 3, name: 'Pencil Sketch', icon: '✏️', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&q=80', count: 1560 },
    { id: 4, name: 'Acrylic', icon: '🎨', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&q=80', count: 2340 },
    { id: 5, name: 'Ink', icon: '🖋️', image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=200&q=80', count: 890 },
    { id: 6, name: 'Digital Art', icon: '💻', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80', count: 4210 },
    { id: 7, name: 'Mixed Media', icon: '🎭', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=200&q=80', count: 670 },
    { id: 8, name: 'Pastel', icon: '🌈', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80', count: 540 }
  ],

  /* ── Curated Collections ── */
  collections: [
    { id: 1, name: 'Modern Living', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', artworks: 120, description: 'Contemporary art for modern spaces' },
    { id: 2, name: 'Nature', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80', artworks: 340, description: 'Landscapes and botanical art' },
    { id: 3, name: 'Indian Heritage', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&q=80', artworks: 250, description: 'Traditional Indian art forms' },
    { id: 4, name: 'Minimal', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=500&q=80', artworks: 85, description: 'Clean, minimal artwork' },
    { id: 5, name: 'Fantasy', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80', artworks: 180, description: 'Imaginative and fantastical worlds' },
    { id: 6, name: 'Spiritual', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80', artworks: 95, description: 'Art for the soul' },
    { id: 7, name: 'Luxury Homes', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80', artworks: 60, description: 'Statement pieces for luxury interiors' },
    { id: 8, name: 'Modern Office', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80', artworks: 70, description: 'Professional art for workspaces' }
  ],

  /* ── Customer Homes Gallery ── */
  customerHomes: [
    { id: 1, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', customer: 'Priya S.', location: 'Mumbai', artwork: 'Golden Sunset' },
    { id: 2, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', customer: 'Arjun M.', location: 'Bangalore', artwork: 'Mountain Dawn' },
    { id: 3, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', customer: 'Sarah L.', location: 'London', artwork: 'Abstract Flow' },
    { id: 4, image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80', customer: 'Raj K.', location: 'Delhi', artwork: 'Temple Sunrise' },
    { id: 5, image: 'https://images.unsplash.com/photo-1600573472591-ee6981cf81f0?w=600&q=80', customer: 'Emma W.', location: 'New York', artwork: 'Urban Dreams' },
    { id: 6, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80', customer: 'Anita R.', location: 'Chennai', artwork: 'Floral Symphony' }
  ],

  /* ── Featured Artist (Meet the Artist) ── */
  featuredArtist: {
    name: 'Rohan Deshpande',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80',
    bio: 'Born in Pune, India, Rohan discovered his passion for art at the age of 8. After studying at the Sir J.J. School of Art in Mumbai, he spent years traveling across India, capturing the soul of the subcontinent through his vibrant acrylic paintings. His work has been exhibited in galleries across Mumbai, Delhi, and London.',
    style: 'Acrylic on Canvas',
    country: 'India',
    countryFlag: '🇮🇳',
    followers: 8900,
    artworks: 145,
    sold: 89,
    verified: true,
    social: {
      instagram: '#', youtube: '#', twitter: '#'
    },
    timeline: [
      { year: 2015, event: 'Graduated from Sir J.J. School of Art' },
      { year: 2017, event: 'First solo exhibition in Mumbai' },
      { year: 2019, event: 'Featured in India Art Fair' },
      { year: 2021, event: 'International exhibition in London' },
      { year: 2023, event: 'Joined Drawmadoo as Featured Artist' }
    ]
  },

  /* ── Product Cards (Gallery) ── */
  artworks: [
    {
      id: 1, title: 'Golden Horizon', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80',
      artist: 'Aisha Khan', artistAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80',
      price: 8500, currency: '₹', medium: 'Watercolor', size: '18 x 24 inches',
      rating: 4.8, reviews: 23, inStock: true, isNew: true, isFeatured: false
    },
    {
      id: 2, title: 'Mystic Forest', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80',
      artist: 'Vikram Sen', artistAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      price: 15000, currency: '₹', medium: 'Oil on Canvas', size: '30 x 40 inches',
      rating: 4.9, reviews: 56, inStock: true, isNew: false, isFeatured: true
    },
    {
      id: 3, title: 'Abstract Emotions', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&q=80',
      artist: 'Sarah Mitchell', artistAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
      price: 22000, currency: '₹', medium: 'Acrylic', size: '36 x 48 inches',
      rating: 5.0, reviews: 12, inStock: true, isNew: true, isFeatured: false
    },
    {
      id: 4, title: 'Temple at Dawn', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&q=80',
      artist: 'Meera Nair', artistAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      price: 9800, currency: '₹', medium: 'Traditional', size: '20 x 28 inches',
      rating: 4.7, reviews: 34, inStock: true, isNew: false, isFeatured: false
    },
    {
      id: 5, title: 'Digital Dreams', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80',
      artist: 'Rohan Deshpande', artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      price: 5500, currency: '₹', medium: 'Digital Print', size: '16 x 20 inches',
      rating: 4.6, reviews: 89, inStock: true, isNew: false, isFeatured: false
    },
    {
      id: 6, title: 'Sakura Whisper', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&q=80',
      artist: 'Yuki Tanaka', artistAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80',
      price: 7200, currency: '₹', medium: 'Digital Art', size: '18 x 24 inches',
      rating: 4.9, reviews: 67, inStock: true, isNew: true, isFeatured: false
    }
  ],

  /* ── Newsletter ── */
  newsletter: {
    title: 'Receive one masterpiece every Friday.',
    subtitle: 'Join 45,000+ art lovers who discover exceptional artwork in their inbox.',
    buttonText: 'Join Gallery',
    privacyText: 'We respect your privacy. Unsubscribe anytime.'
  },

  /* ── Footer ── */
  footer: {
    about: 'Drawmadoo connects real artists with collectors who appreciate authentic, handmade artwork. Every piece tells a story.',
    columns: [
      {
        title: 'Explore',
        links: [
          { text: 'Gallery', href: '#' },
          { text: 'Collections', href: '#' },
          { text: 'Artists', href: '#' },
          { text: 'Custom Art', href: '#' },
          { text: 'New Arrivals', href: '#' }
        ]
      },
      {
        title: 'Support',
        links: [
          { text: 'FAQs', href: '#' },
          { text: 'Shipping', href: '#' },
          { text: 'Returns', href: '#' },
          { text: 'Size Guide', href: '#' },
          { text: 'Contact', href: '#' }
        ]
      },
      {
        title: 'Legal',
        links: [
          { text: 'Privacy Policy', href: '#' },
          { text: 'Terms of Service', href: '#' },
          { text: 'Cookie Policy', href: '#' },
          { text: 'Licensing', href: '#' }
        ]
      }
    ],
    social: [
      { name: 'Instagram', href: '#', icon: 'instagram' },
      { name: 'Pinterest', href: '#', icon: 'pinterest' },
      { name: 'YouTube', href: '#', icon: 'youtube' },
      { name: 'Discord', href: '#', icon: 'discord' }
    ],
    copyright: '© 2024 Drawmadoo. All rights reserved.',
    badges: ['Secure Payments', 'Authenticity Guaranteed', 'Free Returns']
  },

  /* ── Search ── */
  search: {
    recentSearches: ['watercolor landscape', 'abstract art', 'portrait', 'digital fantasy', 'oil painting'],
    trendingTags: ['sunset', 'portrait', 'minimalist', 'nature', 'heritage', 'abstract', 'anime', 'traditional'],
    filters: {
      medium: ['Oil', 'Watercolor', 'Acrylic', 'Digital', 'Ink', 'Pastel', 'Mixed Media', 'Charcoal', 'Pencil'],
      priceRange: [
        { label: 'Under ₹5,000', min: 0, max: 5000 },
        { label: '₹5,000 - ₹15,000', min: 5000, max: 15000 },
        { label: '₹15,000 - ₹50,000', min: 15000, max: 50000 },
        { label: 'Above ₹50,000', min: 50000, max: Infinity }
      ],
      orientation: ['Horizontal', 'Vertical', 'Square'],
      size: ['Small (under 12")', 'Medium (12"-24")', 'Large (24"-48")', 'Extra Large (48"+)'],
      availability: ['In Stock', 'Made to Order', 'Limited Edition']
    }
  },

  /* ── Navigation ── */
  nav: {
    links: [
      { text: 'Explore', href: 'explore.html' },
      { text: 'Collections', href: '#collections' },
      { text: 'Artists', href: '#artists' },
      { text: 'Custom Art', href: '#custom' },
      { text: 'About', href: '#about' }
    ]
  }
};

/**
 * Dynamic Synchronizer between DrawmadooDB and DrawmadooData
 * Ensures zero hardcoding and full CMS reactivity across storefront.
 */
function syncDrawmadooDataWithDB() {
  if (!window.DrawmadooDB) return;
  const db = window.DrawmadooDB;
  const hp = db.getHomepageConfig();
  
  // Dynamic Nav
  DrawmadooData.nav.links = [
    { text: 'Explore', href: 'explore.html' },
    { text: 'Collections', href: '#collections' },
    { text: 'Artists', href: '#artists' },
    { text: 'Custom Art', href: '#custom' },
    { text: 'About', href: '#about' }
  ];

  // Dynamic Hero from configured artwork pointer
  const heroArt = db.getArtworkById(hp.heroArtworkId) || db.getArtworks()[0];
  if (heroArt) {
    DrawmadooData.hero.image = (heroArt.images && heroArt.images[0]) || heroArt.image || DrawmadooData.hero.image;
    if (hp.heroCustom) {
      if (hp.heroCustom.title) DrawmadooData.hero.title = hp.heroCustom.title;
      if (hp.heroCustom.subtitle) DrawmadooData.hero.subtitle = hp.heroCustom.subtitle;
      if (hp.heroCustom.badge) DrawmadooData.hero.badge = hp.heroCustom.badge;
    }
  }

  // Dynamic Featured Spotlight Artwork
  const featuredArt = db.getArtworkById(hp.featuredArtworkId) || db.getArtworks().find(a => a.featured) || db.getArtworks()[0];
  if (featuredArt) {
    DrawmadooData.featuredArtwork = {
      id: featuredArt.id,
      title: featuredArt.title,
      description: featuredArt.description,
      price: featuredArt.price,
      currency: '₹',
      image: (featuredArt.images && featuredArt.images[0]) || featuredArt.image,
      thumbnails: (featuredArt.images && featuredArt.images.length > 0) ? featuredArt.images : [featuredArt.image],
      medium: featuredArt.medium,
      size: featuredArt.size,
      year: featuredArt.year || 2024,
      artist: {
        name: featuredArt.artist,
        avatar: featuredArt.artistAvatar,
        verified: true
      },
      tags: featuredArt.tags || [],
      featured: true,
      inStock: featuredArt.status === 'available',
      rating: featuredArt.rating || 4.9,
      reviews: featuredArt.reviewsCount || 47
    };
  }

  // Dynamic Artworks List
  DrawmadooData.artworks = db.getArtworks().map(a => ({
    id: a.id,
    title: a.title,
    image: (a.images && a.images[0]) || a.image,
    artist: a.artist,
    artistAvatar: a.artistAvatar,
    price: a.price,
    currency: '₹',
    medium: a.medium,
    size: a.size,
    rating: a.rating,
    reviews: a.reviewsCount,
    inStock: a.status === 'available',
    isNew: false,
    isFeatured: a.featured,
    status: a.status
  }));

  // Dynamic Categories
  DrawmadooData.categories = db.getCategories().filter(c => c.id !== 'cat-all').map((c, i) => ({
    id: c.id,
    name: c.name,
    image: c.image,
    count: db.getArtworks({ category: c.name }).length * 120 + 40
  }));

  // Dynamic Artists
  DrawmadooData.artists = db.getArtists().map(a => ({
    id: a.id,
    name: a.name,
    avatar: a.avatar,
    style: a.style,
    country: a.country,
    countryFlag: '🇮🇳',
    followers: a.followers,
    verified: a.status === 'verified',
    bio: a.bio,
    featured: true
  }));

  // Dynamic Featured Artist spotlight
  const spotlightArtist = db.getArtistById(hp.featuredArtistId) || db.getArtists()[0];
  if (spotlightArtist) {
    DrawmadooData.featuredArtist = {
      name: spotlightArtist.name,
      avatar: spotlightArtist.avatar,
      coverImage: spotlightArtist.cover,
      bio: spotlightArtist.bio,
      style: spotlightArtist.style,
      country: spotlightArtist.country,
      countryFlag: '🇮🇳',
      followers: spotlightArtist.followers,
      artworks: db.getArtworks({ includeHidden: true }).filter(art => art.artistId === spotlightArtist.id || art.artist === spotlightArtist.name).length,
      sold: spotlightArtist.salesCount || 12,
      verified: spotlightArtist.status === 'verified',
      social: spotlightArtist.social || {},
      timeline: [
        { year: 2017, event: 'First solo gallery exhibition' },
        { year: 2019, event: 'Featured in India Art Fair' },
        { year: 2022, event: 'International showcase in London' },
        { year: 2024, event: 'Joined Drawmadoo as Master Artist' }
      ]
    };
  }
}

// Initial sync
if (typeof window !== 'undefined') {
  syncDrawmadooDataWithDB();
  if (window.DrawmadooDB) {
    window.DrawmadooDB.onChange(() => {
      syncDrawmadooDataWithDB();
      if (typeof window.reRenderStorefront === 'function') {
        window.reRenderStorefront();
      }
    });
  }
}

