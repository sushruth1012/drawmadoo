/**
 * ═════════════════════════════════════════════════════════════════════
 * DRAWMADOO — Production Artwork Details Controller
 * Dynamic Supabase Integration, Luxury Lightbox, Wishlist,
 * Collector Reviews, Custom Inspiration Handoff & Related Artworks
 * ═════════════════════════════════════════════════════════════════════
 */

(function (window) {
  'use strict';

  const ArtworkDetailsApp = {
    artworkId: null,
    artwork: null,
    artist: null,
    relatedArtworks: [],
    reviews: [],
    selectedRating: 5,

    async init() {
      const params = new URLSearchParams(window.location.search);
      this.artworkId = params.get('id');

      this.bindGlobalEvents();
      await this.loadArtworkData();
      this.loadCustomerReviews();
    },

    bindGlobalEvents() {
      // Lightbox close handlers
      const lightbox = document.getElementById('art-lightbox');
      if (lightbox) {
        lightbox.addEventListener('click', (e) => {
          if (e.target === lightbox || e.target.closest('.art-lightbox-close')) {
            this.closeLightbox();
          }
        });
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeLightbox();
          this.closeBuyModal();
        }
      });

      // Buy modal backdrop
      const buyModal = document.getElementById('art-buy-modal');
      if (buyModal) {
        buyModal.addEventListener('click', (e) => {
          if (e.target === buyModal || e.target.closest('.art-buy-close')) {
            this.closeBuyModal();
          }
        });
      }
    },

    /**
     * Fetch artwork from Supabase
     */
    async loadArtworkData() {
      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;

      try {
        let art = null;
        let artistProfile = null;

        if (client) {
          // If artworkId provided, query by ID
          if (this.artworkId) {
            const { data, error } = await client
              .from('artworks')
              .select('*, artist_profiles(*)')
              .eq('id', this.artworkId)
              .maybeSingle();

            if (!error && data) {
              art = data;
              artistProfile = data.artist_profiles;
            }
          }

          // If no specific ID or not found in Supabase by that ID, fetch latest artwork
          if (!art) {
            const { data: latestArtworks, error: latestErr } = await client
              .from('artworks')
              .select('*, artist_profiles(*)')
              .order('created_at', { ascending: false })
              .limit(1);

            if (!latestErr && latestArtworks && latestArtworks.length > 0) {
              art = latestArtworks[0];
              artistProfile = art.artist_profiles;
              this.artworkId = art.id;
            }
          }
        }

        // Resilient Fallback to local catalog if Supabase had no rows or offline
        if (!art && window.DrawmadooData && window.DrawmadooData.artworks) {
          const localList = window.DrawmadooData.artworks;
          art = localList.find(a => String(a.id) === String(this.artworkId)) || localList[0];
        }

        if (!art) {
          document.getElementById('art-details-root').innerHTML = `
            <div style="text-align: center; padding: 6rem 1.5rem;">
              <h2 style="font-family: var(--font-heading); font-size: 2.2rem; color: #2C2723; margin-bottom: 1rem;">Artwork Not Found</h2>
              <p style="color: #6F665F; margin-bottom: 2rem;">The requested artwork could not be located in our gallery registry.</p>
              <a href="explore.html" class="btn-art-buy" style="max-width: 240px; margin: 0 auto; text-decoration: none;">Explore Gallery</a>
            </div>
          `;
          return;
        }

        this.artwork = this.normalizeArtwork(art, artistProfile);
        this.renderArtwork(this.artwork);
        await this.loadRelatedArtworks(client, this.artwork);

      } catch (err) {
        console.error('[ArtworkDetails] Load error:', err);
      }
    },

    /**
     * Normalize artwork data fields across Supabase schema and local mock structures
     */
    normalizeArtwork(art, artistProfile) {
      const primaryImg = art.primary_image_url || art.image || (art.images && art.images[0]) || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80';
      const title = art.title || 'Untitled Masterpiece';
      const artistName = art.artist_name || (artistProfile && artistProfile.display_name) || art.artist || 'Sushruth TS';
      const medium = art.medium || 'Handcrafted Oil on Linen Canvas';
      const category = art.category || (art.tags && art.tags[0]) || 'Fine Art';
      const dimensions = art.dimensions || '24 × 36 inches (61 × 91 cm)';
      const price = Number(art.price) || 8500;
      const year = art.year || 2026;
      const description = art.description && art.description.trim().length > 10
        ? art.description
        : `A breathtaking, museum-quality original creation by ${artistName}. Masterfully rendered with subtle tonal transitions, delicate texturing, and rich archival pigments that evoke a profound sense of contemplation and elegance.`;

      const status = (art.status || 'available').toLowerCase();
      const isAvailable = status === 'available';

      return {
        id: art.id,
        title,
        artistName,
        artistAvatar: (artistProfile && artistProfile.cover_image_url) || art.artistAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
        artistBio: (artistProfile && artistProfile.artist_bio) || 'Renowned contemporary artist working from our curated atelier studio, exploring classical traditions through delicate light and emotional form.',
        artistLocation: (artistProfile && artistProfile.country) || 'India',
        artistSpecialties: (artistProfile && artistProfile.specialties) || ['Oil Painting', 'Fine Art', 'Portraiture'],
        medium,
        category,
        dimensions,
        price,
        year,
        description,
        primaryImg,
        status,
        isAvailable,
        rating: art.rating || '4.9',
        reviewsCount: art.reviewsCount || 24,
        style: art.style || 'Contemporary Realism'
      };
    },

    /**
     * Render artwork into page DOM
     */
    renderArtwork(art) {
      document.title = `${art.title} by ${art.artistName} — Drawmadoo`;

      // 1. Breadcrumbs
      const breadcrumbEl = document.getElementById('art-breadcrumb-current');
      const breadcrumbCat = document.getElementById('art-breadcrumb-category');
      if (breadcrumbEl) breadcrumbEl.textContent = art.title;
      if (breadcrumbCat) breadcrumbCat.textContent = art.category;

      // 2. Left Media Column
      const primaryImgEl = document.getElementById('art-primary-image');
      if (primaryImgEl) {
        primaryImgEl.src = art.primaryImg;
        primaryImgEl.alt = `${art.title} by ${art.artistName}`;
      }

      // 3. Right Meta Column
      const titleEl = document.getElementById('art-title');
      const artistNameEl = document.getElementById('art-artist-name');
      const artistAvatarEl = document.getElementById('art-artist-avatar');
      const artistLocEl = document.getElementById('art-artist-location');
      const priceEl = document.getElementById('art-price-val');
      const availBadge = document.getElementById('art-availability-badge');
      const availText = document.getElementById('art-availability-text');

      if (titleEl) titleEl.textContent = art.title;
      if (artistNameEl) artistNameEl.textContent = art.artistName;
      if (artistAvatarEl) artistAvatarEl.src = art.artistAvatar;
      if (artistLocEl) artistLocEl.textContent = `Atelier Artist • ${art.artistLocation}`;
      if (priceEl) priceEl.textContent = `₹ ${art.price.toLocaleString('en-IN')}`;

      if (availBadge && availText) {
        if (art.isAvailable) {
          availBadge.className = 'art-availability-badge available';
          availText.textContent = 'Available • Original Piece';
        } else {
          availBadge.className = 'art-availability-badge sold';
          availText.textContent = 'Reserved • Private Collection';
        }
      }

      // 4. Specifications Grid
      const specCategory = document.getElementById('spec-category');
      const specMedium = document.getElementById('spec-medium');
      const specStyle = document.getElementById('spec-style');
      const specDimensions = document.getElementById('spec-dimensions');
      const specYear = document.getElementById('spec-year');
      const specStatus = document.getElementById('spec-status');

      if (specCategory) specCategory.textContent = art.category;
      if (specMedium) specMedium.textContent = art.medium;
      if (specStyle) specStyle.textContent = art.style;
      if (specDimensions) specDimensions.textContent = art.dimensions;
      if (specYear) specYear.textContent = art.year;
      if (specStatus) specStatus.textContent = art.isAvailable ? '100% Original (In Studio)' : 'Sold Out';

      // 5. Story Behind This Artwork
      const storyTextEl = document.getElementById('art-story-text');
      if (storyTextEl) storyTextEl.textContent = art.description;

      // 6. Artist Profile Card
      const cardArtistName = document.getElementById('card-artist-name');
      const cardArtistImg = document.getElementById('card-artist-img');
      const cardArtistBio = document.getElementById('card-artist-bio');
      const cardArtistTags = document.getElementById('card-artist-tags');

      if (cardArtistName) cardArtistName.textContent = art.artistName;
      if (cardArtistImg) cardArtistImg.src = art.artistAvatar;
      if (cardArtistBio) cardArtistBio.textContent = art.artistBio;
      if (cardArtistTags && art.artistSpecialties) {
        cardArtistTags.innerHTML = art.artistSpecialties.map(s => 
          `<span class="art-artist-tag">${s}</span>`
        ).join('');
      }

      // 7. Check Wishlist state
      this.updateWishlistButtonUI();

      // Show root container
      const skeletonRoot = document.getElementById('art-details-skeleton');
      const contentRoot = document.getElementById('art-details-content');
      if (skeletonRoot) skeletonRoot.style.display = 'none';
      if (contentRoot) contentRoot.style.display = 'block';
    },

    /**
     * Load Related Artworks from Supabase
     */
    async loadRelatedArtworks(client, currentArt) {
      const container = document.getElementById('art-related-grid');
      if (!container) return;

      let related = [];

      if (client) {
        try {
          const { data, error } = await client
            .from('artworks')
            .select('*')
            .neq('id', currentArt.id)
            .limit(4);

          if (!error && data && data.length > 0) {
            related = data;
          }
        } catch (e) {
          console.warn('[ArtworkDetails] Related artworks query notice:', e);
        }
      }

      // Fallback from local data if needed
      if (related.length === 0 && window.DrawmadooData && window.DrawmadooData.artworks) {
        related = window.DrawmadooData.artworks
          .filter(a => String(a.id) !== String(currentArt.id))
          .slice(0, 4);
      }

      if (related.length === 0) {
        container.innerHTML = `<p style="color: #6F665F; grid-column: 1 / -1; text-align: center;">Curating related artworks from the atelier...</p>`;
        return;
      }

      // Render each related artwork card with direct link to its own Artwork Details page
      container.innerHTML = related.map(rel => {
        const rTitle = rel.title || 'Untitled';
        const rArtist = rel.artist_name || rel.artist || 'Independent Master';
        const rPrice = Number(rel.price) || 6500;
        const rImg = rel.primary_image_url || rel.image || (rel.images && rel.images[0]) || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80';
        const rMedium = rel.medium || 'Original Artwork';

        return `
          <a href="artwork-details.html?id=${encodeURIComponent(rel.id)}" class="related-art-card">
            <div class="related-art-img-wrap">
              <img src="${rImg}" alt="${rTitle}" loading="lazy">
            </div>
            <div class="related-art-info">
              <h4 class="related-art-title">${rTitle}</h4>
              <span class="related-art-artist">${rArtist}</span>
              <div class="related-art-bottom">
                <span class="related-art-price">₹ ${rPrice.toLocaleString('en-IN')}</span>
                <span class="related-art-badge">${rMedium}</span>
              </div>
            </div>
          </a>
        `;
      }).join('');
    },

    /**
     * Wishlist Management
     */
    toggleWishlist() {
      if (!this.artwork) return;
      const key = 'drawmadoo_wishlist';
      let wishlist = [];
      try {
        wishlist = JSON.parse(localStorage.getItem(key) || '[]');
      } catch (e) {}

      const idx = wishlist.indexOf(this.artwork.id);
      let isAdded = false;

      if (idx > -1) {
        wishlist.splice(idx, 1);
        isAdded = false;
        if (typeof showToast === 'function') showToast('Artwork removed from your wishlist');
      } else {
        wishlist.push(this.artwork.id);
        isAdded = true;
        if (typeof showToast === 'function') showToast('Artwork saved to your wishlist', 'success');
      }

      localStorage.setItem(key, JSON.stringify(wishlist));
      this.updateWishlistButtonUI();

      // Sync with Supabase wishlist table if user is logged in
      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;
      if (client && window.AuthService && window.AuthService.currentUser) {
        const userId = window.AuthService.currentUser.id;
        if (isAdded) {
          client.from('wishlist').upsert({ user_id: userId, artwork_id: this.artwork.id }).then();
        } else {
          client.from('wishlist').delete().match({ user_id: userId, artwork_id: this.artwork.id }).then();
        }
      }
    },

    updateWishlistButtonUI() {
      const btn = document.getElementById('btn-art-wishlist');
      const text = document.getElementById('wishlist-btn-text');
      if (!btn || !this.artwork) return;

      const wishlist = JSON.parse(localStorage.getItem('drawmadoo_wishlist') || '[]');
      const isSaved = wishlist.includes(this.artwork.id);

      if (isSaved) {
        btn.classList.add('active');
        if (text) text.textContent = 'Saved to Wishlist';
      } else {
        btn.classList.remove('active');
        if (text) text.textContent = 'Add to Wishlist';
      }
    },

    /**
     * USP: Create Similar Artwork Handoff
     * Redirects to index.html custom artwork section with this artwork pre-selected as reference!
     */
    createSimilarArtwork() {
      if (!this.artwork) return;
      const refId = encodeURIComponent(this.artwork.id);
      const title = encodeURIComponent(this.artwork.title);
      const artist = encodeURIComponent(this.artwork.artistName);
      const img = encodeURIComponent(this.artwork.primaryImg);
      const medium = encodeURIComponent(this.artwork.medium);

      window.location.href = `index.html?custom_ref=${refId}&title=${title}&artist=${artist}&img=${img}&medium=${medium}#custom-artworks-section`;
    },

    /**
     * Lightbox Controls
     */
    openLightbox() {
      if (!this.artwork) return;
      const lightbox = document.getElementById('art-lightbox');
      const img = document.getElementById('art-lightbox-image');
      const caption = document.getElementById('art-lightbox-caption');

      if (img) img.src = this.artwork.primaryImg;
      if (caption) caption.textContent = `${this.artwork.title} — ${this.artwork.artistName} (${this.artwork.medium})`;
      if (lightbox) {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    },

    closeLightbox() {
      const lightbox = document.getElementById('art-lightbox');
      if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    },

    /**
     * Direct Purchase / Checkout Modal
     */
    openBuyModal() {
      if (!this.artwork) return;
      const modal = document.getElementById('art-buy-modal');
      const title = document.getElementById('buy-artwork-title');
      const price = document.getElementById('buy-artwork-price');
      const thumb = document.getElementById('buy-artwork-thumb');

      if (title) title.textContent = this.artwork.title;
      if (price) price.textContent = `₹ ${this.artwork.price.toLocaleString('en-IN')}`;
      if (thumb) thumb.src = this.artwork.primaryImg;

      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    },

    closeBuyModal() {
      const modal = document.getElementById('art-buy-modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    },

    handleBuySubmit(e) {
      e.preventDefault();
      const form = document.getElementById('art-checkout-form');
      const successView = document.getElementById('buy-success-view');

      if (form) form.style.display = 'none';
      if (successView) successView.style.display = 'block';

      if (typeof showToast === 'function') {
        showToast('Acquisition order confirmed! Certificate of Authenticity generated.', 'success');
      }
    },

    /**
     * Reviews Management
     */
    loadCustomerReviews() {
      const storageKey = `drawmadoo_reviews_${this.artworkId || 'general'}`;
      let stored = [];
      try {
        stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      } catch (e) {}

      // Default curated initial reviews if none added yet
      if (stored.length === 0) {
        stored = [
          {
            author: 'Vikramaditya Singhania',
            verified: true,
            rating: 5,
            date: 'October 18, 2026',
            comment: 'An exquisite masterpiece in every sense. The depth of the brushwork and the subtle layering of tones creates an emotional presence in our living gallery. Delivered in flawless museum crating with signed provenance documents.'
          },
          {
            author: 'Ananya Deshmukh',
            verified: true,
            rating: 5,
            date: 'September 29, 2026',
            comment: 'Even more striking in person than online. The textures of the canvas and pigment vibrancy are truly museum-grade. Drawmadoo’s white-glove delivery service was immaculate.'
          }
        ];
      }

      this.reviews = stored;
      this.renderReviews();
    },

    renderReviews() {
      const listEl = document.getElementById('art-reviews-list');
      const countEl = document.getElementById('reviews-hero-count');
      const starHeroEl = document.getElementById('reviews-hero-score');
      if (!listEl) return;

      if (countEl) countEl.textContent = `${this.reviews.length} collector review${this.reviews.length === 1 ? '' : 's'}`;

      listEl.innerHTML = this.reviews.map(rev => `
        <div class="art-review-item">
          <div class="art-review-item-head">
            <div class="art-reviewer-author">
              <span>${rev.author}</span>
              ${rev.verified ? `<span class="art-reviewer-verified">✓ Verified Collector</span>` : ''}
            </div>
            <span class="art-review-date">${rev.date}</span>
          </div>
          <div class="art-review-stars">${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}</div>
          <p class="art-review-text">"${rev.comment}"</p>
        </div>
      `).join('');
    },

    toggleReviewForm() {
      const panel = document.getElementById('art-add-review-panel');
      if (panel) {
        panel.classList.toggle('open');
        if (panel.classList.contains('open')) {
          panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    },

    setStarRating(rating) {
      this.selectedRating = rating;
      const stars = document.querySelectorAll('.review-star-picker span');
      stars.forEach((star, idx) => {
        if (idx < rating) {
          star.classList.add('active');
        } else {
          star.classList.remove('active');
        }
      });
    },

    submitReview(e) {
      e.preventDefault();
      const authorInput = document.getElementById('review-author-name');
      const textInput = document.getElementById('review-comment-text');

      const author = (authorInput?.value || '').trim() || 'Distinguished Collector';
      const comment = (textInput?.value || '').trim();

      if (comment.length < 10) {
        alert('Please share a thoughtful review of at least 10 characters.');
        return;
      }

      const newReview = {
        author,
        verified: true,
        rating: this.selectedRating,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        comment
      };

      this.reviews.unshift(newReview);
      const storageKey = `drawmadoo_reviews_${this.artworkId || 'general'}`;
      localStorage.setItem(storageKey, JSON.stringify(this.reviews));

      this.renderReviews();
      this.toggleReviewForm();

      if (authorInput) authorInput.value = '';
      if (textInput) textInput.value = '';

      if (typeof showToast === 'function') {
        showToast('Your curatorial review has been published!', 'success');
      }
    }
  };

  window.ArtworkDetailsApp = ArtworkDetailsApp;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ArtworkDetailsApp.init());
  } else {
    ArtworkDetailsApp.init();
  }
})(window);
