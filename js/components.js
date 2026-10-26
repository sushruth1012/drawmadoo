/**
 * ═════════════════════════════════════════════════════════════════════
 * DRAWMADOO — Reusable Shared Component Library
 * Production-ready, modular UI components for Explore Gallery,
 * Artwork Details, Artist Profiles, Collections, Wishlist, and Home.
 * ═════════════════════════════════════════════════════════════════════
 */

'use strict';

(function(window) {

  // SVG Icons helper
  const Icons = {
    verified: `<svg width="12" height="12" viewBox="0 0 24 24" fill="#0F6F8E" stroke="white" stroke-width="2.5"><circle cx="12" cy="12" r="10" fill="#0F6F8E"/><polyline points="8 12 11 15 16 9" stroke="white" fill="none"/></svg>`,
    heart: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    heartFilled: `<svg width="16" height="16" viewBox="0 0 24 24" fill="#D56A24" stroke="#D56A24" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    bag: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    eye: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
    share: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    star: `<svg width="12" height="12" viewBox="0 0 24 24" fill="#C9A46A" stroke="#C9A46A" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    chevronLeft: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>`,
    chevronRight: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`,
    close: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
    clock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    shield: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    certificate: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    shipping: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
    pencil: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`
  };

  /**
   * Verified Badge Component
   */
  function VerifiedBadge(title = 'Verified Real Artist') {
    return `<span class="verified-badge-inline" title="${title}" style="display:inline-flex; vertical-align:middle; margin-left:4px;">${Icons.verified}</span>`;
  }

  /**
   * Price Tag Component
   */
  function PriceTag(amount, currency = '₹') {
    const formatted = typeof amount === 'number' ? amount.toLocaleString('en-IN') : amount;
    return `<span class="price-tag" style="font-weight:700; color:var(--color-primary);">${currency}${formatted}</span>`;
  }

  /**
   * Wishlist Button Component
   */
  function WishlistButton(artworkId, isActive = false) {
    return `
      <button class="card-btn-wishlist ${isActive ? 'active' : ''}" 
              data-artwork-id="${artworkId}" 
              onclick="event.stopPropagation(); window.DrawmadooComponents.toggleWishlist('${artworkId}', this)" 
              aria-label="Wishlist" 
              title="Add to Wishlist">
        ${isActive ? Icons.heartFilled : Icons.heart}
      </button>
    `;
  }

  /**
   * Artwork Card Component (Mockup accurate #1 & #2)
   */
  function ArtworkCard(art, options = {}) {
    if (!art) return '';
    const isWishlisted = options.isWishlisted || false;
    const primaryImg = (art.images && art.images[0]) || art.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=700&q=80';
    const artistName = art.artist || 'Independent Artist';
    const rating = art.rating || '4.8';
    const reviews = art.reviewsCount || '120';
    const isSold = art.status === 'sold';
    const isHumanMade = art.isHumanMade !== false; // Default true for Drawmadoo luxury standard

    return `
      <article class="masonry-artwork-card ${isSold ? 'is-sold' : ''}" data-id="${art.id}">
        <!-- Image Container with Overlays -->
        <div class="card-image-box" onclick="window.DrawmadooComponents.openArtworkDetails('${art.id}')">
          <!-- Badges -->
          <div class="card-badges-top-left">
            ${isHumanMade ? `<span class="badge-human-made" title="100% Human-Created Artwork">100% Human</span>` : ''}
            ${art.featured ? `<span class="badge-featured-gold">Featured</span>` : ''}
            ${isSold ? `<span class="badge-sold-out">Sold Out</span>` : ''}
          </div>

          <!-- Wishlist Heart Button -->
          ${WishlistButton(art.id, isWishlisted)}

          <!-- Quick View & Cart Overlay Actions -->
          <div class="card-image-actions">
            <button class="card-action-icon-btn btn-quick-view" onclick="event.stopPropagation(); window.DrawmadooComponents.openQuickView('${art.id}')" title="Quick View" aria-label="Quick View">
              ${Icons.bag}
            </button>
          </div>

          <!-- Artwork Image with Progressive Blur-to-Sharp -->
          <img src="${primaryImg}" alt="${art.title}" loading="lazy" class="masonry-img">
        </div>

        <!-- Metadata Body -->
        <div class="card-details-box">
          <h3 class="card-artwork-title" onclick="window.DrawmadooComponents.openArtworkDetails('${art.id}')">${art.title}</h3>
          
          <div class="card-artist-line">
            <span class="card-artist-name">${artistName}</span>
            ${VerifiedBadge()}
          </div>

          <div class="card-rating-line">
            ${Icons.star}
            <span class="rating-val">${rating}</span>
            <span class="reviews-count">(${reviews})</span>
          </div>

          <div class="card-price-line">
            ${PriceTag(art.price)}
          </div>

          <div class="card-tags-pills">
            ${art.medium ? `<span class="tag-pill">${art.medium}</span>` : ''}
            ${art.category ? `<span class="tag-pill">${art.category}</span>` : ''}
          </div>
        </div>

        <!-- In-line Admin Edit Pencil -->
        <button class="admin-inline-pencil" onclick="event.stopPropagation(); window.DrawmadooComponents.openAdminArtworkModal('${art.id}')" title="Admin: Edit Artwork">
          ${Icons.pencil}
        </button>
      </article>
    `;
  }

  /**
   * Category Chip Component (Mockup accurate #1)
   */
  function CategoryChip(cat, isActive = false) {
    return `
      <button class="cat-pill ${isActive ? 'active' : ''}" 
              onclick="window.DrawmadooComponents.onCategorySelect('${cat.name}')"
              data-cat-name="${cat.name}">
        <img src="${cat.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=100&q=80'}" class="cat-pill-thumb" alt="${cat.name}" loading="lazy">
        <span class="cat-pill-name">${cat.name}</span>
      </button>
    `;
  }

  /**
   * Collection Card Component (Mockup accurate #5)
   */
  function CollectionCard(col) {
    const img = col.coverImage || col.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80';
    const count = col.artworkCount || (col.artworkIds ? col.artworkIds.length : 96);
    return `
      <div class="popular-collection-card" onclick="window.DrawmadooComponents.filterByCollection('${col.name}')">
        <img src="${img}" alt="${col.name}" loading="lazy" class="popular-collection-img">
        <div class="popular-collection-overlay">
          <h4 class="popular-collection-title">${col.name}</h4>
          <span class="popular-collection-count">${count} artworks</span>
        </div>
      </div>
    `;
  }

  /**
   * Mini Artwork Card for Editor's Picks & Trending (Mockup accurate #6)
   */
  function MiniArtworkCard(art) {
    const img = (art.images && art.images[0]) || art.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300&q=80';
    return `
      <div class="featured-mini-card" onclick="window.DrawmadooComponents.openArtworkDetails('${art.id}')">
        <div class="featured-mini-img-wrap">
          <img src="${img}" alt="${art.title}" loading="lazy">
        </div>
        <div class="featured-mini-info">
          <h5 class="featured-mini-title">${art.title}</h5>
          <span class="featured-mini-price">₹${Number(art.price).toLocaleString('en-IN')}</span>
        </div>
      </div>
    `;
  }

  /**
   * Popular Artist Card
   */
  function ArtistCard(artist) {
    const avatar = artist.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
    const followers = artist.followers ? `${(artist.followers / 1000).toFixed(1)}k` : '12.4k';
    return `
      <div class="curated-artist-card">
        <div class="curated-artist-avatar-wrap">
          <img src="${avatar}" alt="${artist.name}" loading="lazy" class="curated-artist-avatar">
          <span class="curated-artist-verified">${Icons.verified}</span>
        </div>
        <h4 class="curated-artist-name">${artist.name}</h4>
        <span class="curated-artist-style">${artist.style || 'Oil & Acrylic'}</span>
        <span class="curated-artist-country">${artist.country || 'India'} • ${followers} followers</span>
        <button class="btn btn-outline btn-sm curated-artist-follow-btn" onclick="event.stopPropagation(); window.DrawmadooComponents.toggleArtistFollow('${artist.id}', this)">
          Follow
        </button>
      </div>
    `;
  }

  /**
   * Empty State Component
   */
  function EmptyState(options = {}) {
    const title = options.title || 'No Artworks Found';
    const subtitle = options.subtitle || 'Try modifying your search criteria or resetting filters to explore original pieces.';
    const buttonText = options.buttonText || 'Reset All Filters';
    return `
      <div class="gallery-empty-state">
        <div class="empty-state-art-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2C2723" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="m8 15 4-4 4 4"/><line x1="12" y1="19" x2="12" y2="11"/></svg>
        </div>
        <h3 class="empty-state-title">${title}</h3>
        <p class="empty-state-desc">${subtitle}</p>
        <button class="btn btn-primary btn-sm" onclick="window.DrawmadooComponents.resetAllFilters()">
          ${buttonText}
        </button>
      </div>
    `;
  }

  /**
   * Skeleton Card Loader Component
   */
  function SkeletonLoader(count = 8) {
    let html = '';
    const heights = [280, 360, 310, 420, 290, 350, 400, 320];
    for (let i = 0; i < count; i++) {
      const h = heights[i % heights.length];
      html += `
        <div class="skeleton-masonry-card">
          <div class="skeleton-box" style="height:${h}px; border-radius:var(--radius-lg); margin-bottom:12px;"></div>
          <div class="skeleton-box" style="height:18px; width:75%; border-radius:4px; margin-bottom:8px;"></div>
          <div class="skeleton-box" style="height:14px; width:45%; border-radius:4px; margin-bottom:8px;"></div>
          <div class="skeleton-box" style="height:16px; width:30%; border-radius:4px;"></div>
        </div>
      `;
    }
    return html;
  }

  /**
   * Quick View Modal (Mockup accurate #4)
   */
  function QuickViewModal(art) {
    if (!art) return '';
    const images = (art.images && art.images.length > 0) ? art.images : [art.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80'];
    const formattedPrice = `₹${Number(art.price).toLocaleString('en-IN')}`;
    const artistAvatar = art.artistAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
    const isWishlisted = (JSON.parse(localStorage.getItem('drawmadoo_wishlist') || '[]')).includes(art.id);

    return `
      <div class="quickview-backdrop" id="quickview-backdrop" onclick="window.DrawmadooComponents.closeQuickView(event)">
        <div class="quickview-modal-container" onclick="event.stopPropagation()">
          <button class="quickview-close-btn" onclick="window.DrawmadooComponents.closeQuickView()" aria-label="Close modal">
            ${Icons.close}
          </button>

          <div class="quickview-grid">
            <!-- Left Side: Thumbnails Strip + Big Viewer -->
            <div class="quickview-media-col">
              <div class="quickview-thumb-strip">
                ${images.map((img, idx) => `
                  <button class="quickview-thumb-btn ${idx === 0 ? 'active' : ''}" onclick="window.DrawmadooComponents.setQuickViewImage('${img}', this)">
                    <img src="${img}" alt="Thumbnail ${idx + 1}" loading="lazy">
                  </button>
                `).join('')}
              </div>

              <div class="quickview-main-image-wrap">
                <button class="quickview-nav-arrow arrow-left" onclick="window.DrawmadooComponents.prevQuickViewImage()" aria-label="Previous image">
                  ${Icons.chevronLeft}
                </button>
                <img src="${images[0]}" id="quickview-main-img" alt="${art.title}" class="quickview-active-img">
                <button class="quickview-nav-arrow arrow-right" onclick="window.DrawmadooComponents.nextQuickViewImage()" aria-label="Next image">
                  ${Icons.chevronRight}
                </button>
              </div>
            </div>

            <!-- Right Side: Artwork Info & Checkout -->
            <div class="quickview-details-col">
              <div class="quickview-header-row">
                <h2 class="quickview-title">${art.title}</h2>
                <div class="quickview-top-actions">
                  <button class="btn-icon ${isWishlisted ? 'active' : ''}" onclick="window.DrawmadooComponents.toggleWishlist('${art.id}', this)" title="Wishlist">
                    ${isWishlisted ? Icons.heartFilled : Icons.heart}
                  </button>
                  <button class="btn-icon" onclick="window.DrawmadooComponents.shareArtwork('${art.title}')" title="Share">
                    ${Icons.share}
                  </button>
                </div>
              </div>

              <!-- Artist Info Row -->
              <div class="quickview-artist-row">
                <img src="${artistAvatar}" alt="${art.artist}" class="quickview-artist-avatar">
                <div class="quickview-artist-meta">
                  <span class="quickview-artist-name">${art.artist} ${VerifiedBadge()}</span>
                  <span class="quickview-artist-title">Verified Master Creator</span>
                </div>
                <button class="btn btn-outline btn-sm quickview-follow-btn" onclick="window.DrawmadooComponents.toggleArtistFollow('${art.artistId || art.artist}', this)">
                  Follow
                </button>
              </div>

              <!-- Rating & Reviews -->
              <div class="quickview-rating-row">
                ${Icons.star}
                <span class="quickview-rating-num">${art.rating || '4.9'}</span>
                <span class="quickview-reviews-text">(${art.reviewsCount || '86'} reviews)</span>
              </div>

              <!-- Price -->
              <div class="quickview-price-tag">${formattedPrice}</div>

              <!-- Medium & Style Pills -->
              <div class="quickview-tags-row">
                <span class="quickview-tag-chip">${art.medium || 'Oil Painting'}</span>
                <span class="quickview-tag-chip">${art.category || 'Fine Art'}</span>
                <span class="quickview-tag-chip">100% Original</span>
              </div>

              <!-- Size Selector -->
              <div class="quickview-size-selector">
                <span class="quickview-section-label">Select Dimensions</span>
                <div class="quickview-size-chips">
                  <button class="size-chip active" onclick="window.DrawmadooComponents.selectSize(this)">12 x 16 in</button>
                  <button class="size-chip" onclick="window.DrawmadooComponents.selectSize(this)">18 x 24 in</button>
                  <button class="size-chip" onclick="window.DrawmadooComponents.selectSize(this)">24 x 36 in</button>
                </div>
              </div>

              <!-- Artwork Story / Narrative -->
              <div class="quickview-story-box">
                <p>${art.description || 'A sublime, original work of art capturing delicate textures and nuanced interplay of light, hand-painted on premium linen canvas.'}</p>
              </div>

              <!-- Collector Guarantees -->
              <ul class="quickview-guarantees-list">
                <li>${Icons.shipping} <span>Free insured worldwide shipping with real-time tracking</span></li>
                <li>${Icons.certificate} <span>Physical Certificate of Authenticity signed by the artist</span></li>
                <li>${Icons.shield} <span>7-day museum-grade return guarantee & full damage insurance</span></li>
              </ul>

              <!-- Bottom Acquisition Buttons -->
              <div class="quickview-cta-row">
                <button class="btn btn-primary quickview-btn-cart" onclick="window.DrawmadooComponents.addToCart('${art.id}')">
                  Add to Cart
                </button>
                <button class="btn btn-secondary quickview-btn-buy" onclick="window.DrawmadooComponents.buyNow('${art.id}')">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Export onto window
  window.DrawmadooComponents = {
    Icons,
    VerifiedBadge,
    PriceTag,
    WishlistButton,
    ArtworkCard,
    CategoryChip,
    CollectionCard,
    MiniArtworkCard,
    ArtistCard,
    EmptyState,
    SkeletonLoader,
    QuickViewModal,

    // Component event hooks (overridden by page logic)
    onCategorySelect: () => {},
    filterByCollection: () => {},
    openArtworkDetails: (artId) => { window.location.href = 'artwork-details.html?id=' + encodeURIComponent(artId); },
    openQuickView: (artId) => { window.location.href = 'artwork-details.html?id=' + encodeURIComponent(artId); },
    closeQuickView: () => {},
    setQuickViewImage: () => {},
    prevQuickViewImage: () => {},
    nextQuickViewImage: () => {},
    toggleWishlist: () => {},
    toggleArtistFollow: () => {},
    addToCart: () => {},
    buyNow: () => {},
    shareArtwork: () => {},
    selectSize: () => {},
    resetAllFilters: () => {},
    openAdminArtworkModal: () => {}
  };

})(window);
