# Drawmadoo — Premium Online Art Gallery & Marketplace

Drawmadoo is a premium, museum-grade art marketplace connecting real independent artists with art collectors worldwide. The design language evokes a luxury art museum with Apple-like minimalism, Behance/ArtStation curation, and warm editorial typography.

---

## 🎨 Design Philosophy & Brand Tokens

- **Warm Ivory Background:** `#F7F2EA` (Paper texture overlay)
- **Soft Beige Cards:** `#EFE4D2`
- **Dark Walnut Text:** `#35241B`
- **Primary Brown:** `#8A5A2B`
- **Artist Blue:** `#0F6F8E` (Verified artist badge)
- **Burnt Orange:** `#D56A24` (Featured badge & primary CTAs)
- **Golden Sand:** `#C99A42` (Stars & ratings)
- **Typography:**
  - Headings: *Cormorant Garamond* (Elegant editorial serif)
  - Body & Data: *Inter* (Clean, legible sans-serif)
  - Buttons: *Inter SemiBold*
- **Radius:** 16px – 20px rounded corners with soft ambient shadows.

---

## 🚀 Live Demo & Launch Instructions

To launch and explore the application locally:

### Option 1: Double-click to open
Simply open the following HTML files in any modern web browser (Chrome, Edge, Safari, Firefox):
1. **Storefront & In-line CMS:** `drawmadoo/index.html`
2. **Dedicated Admin Dashboard:** `drawmadoo/admin/index.html`

### Option 2: Run via local HTTP Server
Run the following in PowerShell / terminal inside the `drawmadoo` directory:
```bash
python -m http.server 8080
```
Then visit:
- **Storefront:** [http://localhost:8080/](http://localhost:8080/)
- **Admin Dashboard:** [http://localhost:8080/admin/](http://localhost:8080/admin/)

---

## ✨ Features Breakdown

### 1. Storefront (`index.html`)
- **Dynamic Announcement Bar:** Top notification banner with dismiss handle.
- **Glassmorphic Navigation:** Transparent on page top, seamlessly elevates to frosted glass (`backdrop-filter: blur(20px)`) on scroll.
- **Hero Section:**
  - Ambient floating SVG paint brush accents.
  - Interactive mouse parallax depth effect.
  - Live animated stat counters (18,000+ Artworks, 2,700+ Artists, 34 Countries, 250K+ Collectors).
  - Quick action CTAs (*Explore Gallery*, *Meet Artists*, *Watch Artist Process*).
- **Popular Categories:** 10 categories with smooth snap-scroll, hover zoom, and count pills.
- **Trending Artists:** Independent verified artists slider with follower counts and quick follow buttons.
- **Why Drawmadoo:** 100% Human-made guarantee, Certificates included, White-glove insured delivery, Direct creator support.
- **Featured Artwork Spotlight:**
  - Multi-view thumbnail carousel with crossfade transitions.
  - Provenance & artwork specification table.
  - Artist attribution badge.
  - Direct acquisition & inquiry buttons.
- **Shop by Medium:** Tactile circular medium tiles (Oil, Watercolor, Acrylic, Digital Art, Ink, Pastel, etc.).
- **Curated Collections:** Themed spaces (Modern Living, Indian Heritage, Luxury Homes, Minimal Living).
- **Art in Real Homes:** Pinterest-style masonry layout showcasing collector interiors.
- **Meet the Artist:** In-depth creator spotlight with artist biography, career timeline milestones, and studio metrics.
- **Weekly Salon Newsletter:** Clean dark walnut card for Friday masterwork subscriptions.
- **Recently Sold Toast:** Ambient floating notification displaying collector purchases every 30 seconds.
- **Universal Search Overlay:** Full-screen dialog with live search, trending tags, and recent searches.
- **Theme Switcher:** Seamless Light / Dark mode with `localStorage` persistence.

---

## 🛠️ In-Line CMS & Admin Capabilities

### 1. In-Line Storefront CMS
- Press **`Ctrl + Shift + A`** or click the **Edit Mode** indicator in the navbar to toggle Admin Mode.
- Floating pencil icons (`Edit Hero`, `Edit Artwork`, `Edit Category`, etc.) appear on every section matching the exact design in the mockup.
- Clicking any pencil opens the **Slide-in Storefront Builder Panel** on the right side to modify content live.

### 2. Standalone Admin Dashboard (`admin/index.html`)
- **Overview Dashboard:** Revenue metrics (₹12,45,000), monthly order volume, curation queue, and top-grossing artworks.
- **Order Management:** Status filtering (Processing, Shipped, Delivered, Cancelled), bulk status updates, CSV export, and courier tracking details.
- **Catalog & Inventory:** Grid vs. List toggle, medium/category filters, stock badges ("1 of 1 Unique", "In Stock", "Sold"), and Add Artwork modal with image preview.
- **Artist Verification:** Review and approve/reject creator applications with bio and sales history.
- **Homepage Builder:** Reorder storefront sections using up/down controls, toggle visibility, and configure layout ordering.
- **Analytics:** Native SVG charts for revenue trajectories and medium breakdown without external dependencies.
- **Store Settings:** Branding, domestic & international shipping thresholds, SEO metadata, and announcement bar configuration.
- **Mobile Admin Experience:** Collapsible drawer, responsive tables, and bottom navigation bar for mobile management on the go.
