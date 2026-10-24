/**
 * ═════════════════════════════════════════════════════════════════════
 * DRAWMADOO — Master Application Logic (Production-Ready)
 * Where Art Finds Home — Premium Art Marketplace
 * ═════════════════════════════════════════════════════════════════════
 */

'use strict';

/* ─────────────────────────────────────────────────────────────────────
   SECTION 1: SVG ICON SYSTEM
   All icons follow 24x24 viewBox, stroke-based with 1.5px stroke.
   ───────────────────────────────────────────────────────────────────── */
const icons = {
  heart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  'heart-filled': `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  search: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  cart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  user: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  bell: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  menu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  x: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  'chevron-left': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  'chevron-right': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  'arrow-right': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  play: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="6 3 20 12 6 21 6 3"/></svg>`,
  star: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  'star-filled': `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  palette: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  users: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  globe: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  edit: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`,
  plus: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>`,
  check: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  'shield-check': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
  certificate: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  'hand-heart': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.8a2 2 0 0 0-2.8-2.8L15 13"/><path d="M19 8a2.5 2.5 0 0 0-4.9-1c-.5-.6-1.2-1-2.1-1A2.5 2.5 0 0 0 9.5 8c0 1.5 1.5 3 2.5 4 1-1 2.5-2.5 2.5-4a2.5 2.5 0 0 0 4.5 0z"/></svg>`,
  'heart-handshake': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.86.86 2.22.86 3.08 0l1.92-1.92"/><path d="m11 15 2 2"/><path d="m14 12 2 2"/></svg>`,
  instagram: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
  pinterest: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M10.7 13.5c1.4 0 3.3-.9 3.3-3.2 0-2.3-1.8-3.3-3.8-3.3-2.6 0-4.2 1.8-4.2 4 0 1.2.6 2.3 1.5 2.7.2.1.3 0 .3-.2l.3-1.1c0-.1 0-.2-.1-.3-.3-.4-.5-.9-.5-1.5 0-1.6 1.2-3 3.1-3 1.6 0 2.7 1.1 2.7 2.6 0 1.7-.9 3.2-2.1 3.2-.7 0-1.2-.6-1-1.3l.6-2.5c.2-.7-.3-1.4-1-1.4-.8 0-1.4.8-1.4 1.9 0 .7.2 1.2.2 1.2l-.9 3.7c-.3 1.1-.1 2.5 0 3.4"/><line x1="12" y1="9" x2="10" y2="21"/></svg>`,
  youtube: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>`,
  discord: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><path d="M7.5 7.5c3.5-1 5.5-1 9 0"/><path d="M7 16.5c3.5 1 6.5 1 10 0"/><path d="M15.5 17c0 1 1.5 2 2 2 1.5 0 2.5-1 3-3.5.5-3.5 0-8-1-9.5-1.5-.5-3-.5-4 0l-.5 1"/><path d="M8.5 17c0 1-1.5 2-2 2-1.5 0-2.5-1-3-3.5-.5-3.5 0-8 1-9.5 1.5-.5 3-.5 4 0l.5 1"/></svg>`,
  sun: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  moon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  eye: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  share: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>`,
  frame: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><rect width="10" height="10" x="7" y="7" rx="1"/></svg>`,
  'home-preview': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  'external-link': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>`,
  trash: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
  grid: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>`,
  list: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>`,
  filter: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  clock: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  'trending-up': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  leaf: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  branch: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  logo: `<svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="navTeal" cx="32%" cy="32%" r="48%"><stop offset="0%" stop-color="#168EB5"/><stop offset="100%" stop-color="#0F6F8E"/></radialGradient>
      <radialGradient id="navGold" cx="68%" cy="36%" r="52%"><stop offset="0%" stop-color="#F5CE70"/><stop offset="100%" stop-color="#C99A42"/></radialGradient>
      <radialGradient id="navTerra" cx="62%" cy="72%" r="46%"><stop offset="0%" stop-color="#E27236"/><stop offset="100%" stop-color="#C85A24"/></radialGradient>
      <radialGradient id="navDark" cx="42%" cy="42%" r="58%"><stop offset="0%" stop-color="#342820"/><stop offset="100%" stop-color="#140E0A"/></radialGradient>
      <clipPath id="navCircleClip"><circle cx="50" cy="50" r="48"/></clipPath>
    </defs>
    <g clip-path="url(#navCircleClip)">
      <circle cx="50" cy="50" r="48" fill="url(#navDark)"/>
      <circle cx="38" cy="38" r="38" fill="url(#navTeal)"/>
      <circle cx="63" cy="40" r="40" fill="url(#navGold)"/>
      <circle cx="56" cy="62" r="36" fill="url(#navTerra)"/>
      <ellipse cx="64" cy="58" rx="4" ry="6" fill="#140E0A" transform="rotate(25 64 58)" opacity="0.6"/>
    </g>
    <circle cx="50" cy="50" r="48" stroke="#2C221A" stroke-width="3" fill="none"/>
    <g transform="translate(33, 67) rotate(45)">
      <polygon points="0,0 -3.5,-12 3.5,-12" fill="#EAD7C2"/>
      <polygon points="0,0 -1.2,-4 1.2,-4" fill="#2C221A"/>
      <rect x="-3.5" y="-52" width="2.2" height="40" fill="#8A5A2B"/>
      <rect x="-1.3" y="-52" width="2.6" height="40" fill="#D4A373"/>
      <rect x="1.3" y="-52" width="2.2" height="40" fill="#A67244"/>
      <rect x="-3.5" y="-58" width="7" height="6.5" fill="#C99A42" rx="0.8"/>
      <path d="M -3.2,-58 C -3.2,-61 3.2,-61 3.2,-58 Z" fill="#201813"/>
    </g>
  </svg>`
};

/**
 * Returns formatted inline SVG icon
 * @param {string} name - Icon key name
 * @param {string} customClass - Optional CSS class
 * @param {number} size - Pixel size (default 20)
 * @returns {string} SVG HTML string
 */
function getIcon(name, customClass = '', size = 20) {
  const iconRaw = icons[name] || icons['palette'];
  return iconRaw
    .replace('width="24"', `width="${size}"`)
    .replace('height="24"', `height="${size}"`)
    .replace('<svg ', `<svg class="icon ${customClass}" `);
}

/* ─────────────────────────────────────────────────────────────────────
   SECTION 2: STATE MANAGEMENT & PERSISTENCE
   Handles localStorage for Wishlist, Dark Mode, Admin Mode, Overrides.
   ───────────────────────────────────────────────────────────────────── */
const AppState = {
  theme: 'light',
  adminMode: false,
  wishlist: [],
  cart: [],
  currentCarouselIndex: 0,
  recentlySoldDismissed: false,
  activeAdminSection: 'hero'
};

function loadStoredState() {
  // Theme - defaults to light gallery mode
  const savedTheme = localStorage.getItem('drawmadoo_theme');
  if (savedTheme) {
    AppState.theme = savedTheme;
  } else {
    AppState.theme = 'light';
  }

  // Wishlist
  try {
    const savedWishlist = JSON.parse(localStorage.getItem('drawmadoo_wishlist') || '[]');
    AppState.wishlist = Array.isArray(savedWishlist) ? savedWishlist : [];
  } catch (e) {
    AppState.wishlist = [];
  }

  // Admin Mode
  AppState.adminMode = localStorage.getItem('drawmadoo_admin_mode') === 'true';

  // Overrides for DrawmadooData
  try {
    const savedOverrides = JSON.parse(localStorage.getItem('drawmadoo_overrides') || '{}');
    if (typeof DrawmadooData !== 'undefined' && savedOverrides && typeof savedOverrides === 'object') {
      Object.keys(savedOverrides).forEach(key => {
        if (DrawmadooData[key]) {
          DrawmadooData[key] = { ...DrawmadooData[key], ...savedOverrides[key] };
        }
      });
    }
  } catch (e) {
    console.warn('Could not load data overrides', e);
  }
}

function saveWishlistState() {
  localStorage.setItem('drawmadoo_wishlist', JSON.stringify(AppState.wishlist));
  updateWishlistUI();
}

function saveThemeState() {
  localStorage.setItem('drawmadoo_theme', AppState.theme);
  document.documentElement.setAttribute('data-theme', AppState.theme);
}

function saveAdminState() {
  localStorage.setItem('drawmadoo_admin_mode', AppState.adminMode ? 'true' : 'false');
  if (AppState.adminMode) {
    document.body.classList.add('admin-mode');
  } else {
    document.body.classList.remove('admin-mode');
  }
}

/* ─────────────────────────────────────────────────────────────────────
   SECTION 3: RUNTIME CSS INJECTION
   Comprehensive, pixel-perfect layout and component styling guaranteeing
   a world-class museum aesthetic without external dependency risks.
   ───────────────────────────────────────────────────────────────────── */
function injectRuntimeStyles() {
  if (document.getElementById('drawmadoo-runtime-styles')) return;

  const style = document.createElement('style');
  style.id = 'drawmadoo-runtime-styles';
  style.textContent = `
    /* Smooth page load transition */
    body {
      opacity: 0;
      transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease;
    }
    body.page-loaded {
      opacity: 1;
    }

    /* Announcement Bar */
    .announcement-bar {
      background: var(--color-primary-dark);
      color: #FFFFFF;
      font-size: var(--text-xs);
      font-weight: 500;
      letter-spacing: var(--tracking-wide);
      padding: var(--space-2) 0;
      transition: all var(--duration) var(--ease-out);
    }
    .announcement-bar .container {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .announcement-bar a {
      color: inherit;
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    .announcement-close {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    .announcement-close:hover {
      color: #FFFFFF;
    }

    /* Floating Navbar */
    .navbar {
      position: sticky;
      top: 0;
      z-index: var(--z-navbar);
      background: var(--color-surface-glass);
      backdrop-filter: blur(var(--glass-blur));
      -webkit-backdrop-filter: blur(var(--glass-blur));
      border-bottom: 1px solid var(--color-border);
      transition: all var(--duration-slow) var(--ease-out);
      padding: var(--space-4) 0;
    }
    .navbar.scrolled {
      padding: var(--space-2) 0;
      background: var(--color-surface-glass);
      box-shadow: var(--shadow-sm);
      border-bottom-color: var(--color-border-strong);
    }
    .navbar-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-6);
    }
    .nav-brand {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      font-family: var(--font-heading);
      font-size: var(--text-3xl);
      font-weight: 600;
      color: var(--color-primary);
      letter-spacing: -0.01em;
      text-decoration: none;
    }
    .nav-brand-logo {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform var(--duration) var(--ease-out);
    }
    .nav-brand:hover .nav-brand-logo {
      transform: rotate(-8deg) scale(1.06);
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: var(--space-8);
    }
    .nav-link {
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--color-text-secondary);
      transition: color var(--duration) var(--ease-out);
      position: relative;
      padding: var(--space-1) 0;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--color-primary);
      transition: width var(--duration) var(--ease-out);
      border-radius: var(--radius-full);
    }
    .nav-link:hover {
      color: var(--color-primary);
    }
    .nav-link:hover::after {
      width: 100%;
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    .nav-action-btn {
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: var(--radius);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text);
      background: var(--color-card);
      border: 1px solid var(--color-border-card);
      transition: all var(--duration) var(--ease-out);
    }
    .nav-action-btn:hover {
      background: var(--color-primary);
      color: white;
      transform: translateY(-2px);
      box-shadow: var(--shadow-sm);
    }
    .nav-badge-count {
      position: absolute;
      top: -4px;
      right: -4px;
      background: var(--color-burnt-orange);
      color: white;
      font-size: 10px;
      font-weight: 700;
      min-width: 18px;
      height: 18px;
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .admin-pill-badge {
      display: none;
      background: var(--color-burnt-orange);
      color: white;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: var(--radius-full);
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    body.admin-mode .admin-pill-badge {
      display: inline-block;
    }
    .mobile-menu-toggle {
      display: none;
    }

    /* Mobile Menu Drawer */
    .mobile-menu {
      position: fixed;
      inset: 0;
      z-index: var(--z-modal);
      background: var(--color-surface);
      padding: var(--space-8);
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform var(--duration-slow) var(--ease-out);
      overflow-y: auto;
    }
    .mobile-menu.open {
      transform: translateX(0);
    }
    .mobile-menu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-8);
      padding-bottom: var(--space-4);
      border-bottom: 1px solid var(--color-border);
    }
    .mobile-nav-links {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      margin-bottom: var(--space-8);
    }
    .mobile-nav-link {
      font-family: var(--font-heading);
      font-size: var(--text-3xl);
      color: var(--color-text);
      font-weight: 500;
    }
    .mobile-nav-link:hover {
      color: var(--color-primary);
    }

    /* Hero Section */
    .hero {
      position: relative;
      padding: var(--space-20) 0 var(--space-16);
      overflow: hidden;
      min-height: 85vh;
      display: flex;
      align-items: center;
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      align-items: center;
      gap: var(--space-12);
      position: relative;
      z-index: 2;
    }
    .hero-badge-wrap {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-6);
    }
    .hero-title {
      font-size: clamp(2.8rem, 5vw, 4.2rem);
      line-height: 1.1;
      margin-bottom: var(--space-6);
      font-weight: 400;
      color: var(--color-text);
    }
    .hero-title em {
      font-style: italic;
      color: var(--color-primary);
      font-weight: 500;
    }
    .hero-subtitle {
      font-size: var(--text-lg);
      line-height: var(--leading-relaxed);
      color: var(--color-text-secondary);
      margin-bottom: var(--space-8);
      max-width: 580px;
    }
    .hero-cta-group {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--space-4);
      margin-bottom: var(--space-12);
    }
    .hero-process-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--space-3);
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-artist-blue);
      cursor: pointer;
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-full);
      background: rgba(15, 111, 142, 0.08);
      transition: all var(--duration) var(--ease-out);
    }
    .hero-process-btn:hover {
      background: rgba(15, 111, 142, 0.16);
      transform: translateX(3px);
    }
    .play-icon-circle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--color-artist-blue);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Hero Stats Bar */
    .hero-stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-4);
      padding-top: var(--space-8);
      border-top: 1px solid var(--color-border);
    }
    .stat-card {
      display: flex;
      flex-direction: column;
    }
    .stat-number {
      font-family: var(--font-heading);
      font-size: var(--text-3xl);
      font-weight: 600;
      color: var(--color-text);
      line-height: 1.2;
    }
    .stat-label-wrap {
      display: flex;
      align-items: center;
      gap: var(--space-1);
      font-size: var(--text-xs);
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-top: var(--space-1);
    }

    /* Hero Artwork Showcase Visual */
    .hero-visual-wrapper {
      position: relative;
      perspective: 1000px;
    }
    .hero-visual-card {
      position: relative;
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-xl);
      border: 8px solid var(--color-surface);
      background: var(--color-card);
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform;
    }
    .hero-visual-card img {
      width: 100%;
      height: 520px;
      object-fit: cover;
      display: block;
      transition: transform var(--duration-slower) var(--ease-out);
    }
    .hero-visual-card:hover img {
      transform: scale(1.03);
    }
    .hero-visual-floating-badge {
      position: absolute;
      bottom: var(--space-6);
      left: var(--space-6);
      right: var(--space-6);
      padding: var(--space-4) var(--space-5);
      border-radius: var(--radius-md);
      background: var(--color-surface-glass);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--color-border);
      box-shadow: var(--shadow-md);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* Floating Paint Elements */
    .floating-paint {
      position: absolute;
      pointer-events: none;
      z-index: 1;
      opacity: 0.2;
      filter: blur(1px);
      transition: opacity 0.3s;
    }
    .floating-paint-1 {
      top: 10%;
      left: -2%;
      width: 280px;
      animation: floatSlow1 12s ease-in-out infinite alternate;
      color: var(--color-primary);
    }
    .floating-paint-2 {
      top: 60%;
      right: -3%;
      width: 320px;
      animation: floatSlow2 15s ease-in-out infinite alternate;
      color: var(--color-burnt-orange);
    }
    .floating-paint-3 {
      bottom: 5%;
      left: 35%;
      width: 220px;
      animation: floatSlow3 10s ease-in-out infinite alternate;
      color: var(--color-artist-blue);
    }
    .floating-paint-4 {
      top: 5%;
      right: 25%;
      width: 180px;
      animation: floatSlow1 14s ease-in-out 2s infinite alternate;
      color: var(--color-golden-sand);
    }

    @keyframes floatSlow1 {
      0% { transform: translateY(0) rotate(0deg); }
      100% { transform: translateY(-25px) rotate(8deg); }
    }
    @keyframes floatSlow2 {
      0% { transform: translateY(0) rotate(0deg) scale(1); }
      100% { transform: translateY(-30px) rotate(-6deg) scale(1.05); }
    }
    @keyframes floatSlow3 {
      0% { transform: translateY(0) rotate(0deg); }
      100% { transform: translateY(-20px) rotate(10deg); }
    }

    /* Category Cards */
    .categories-carousel-wrapper {
      position: relative;
    }
    .category-card {
      width: 240px;
      flex-shrink: 0;
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
      background: var(--color-card);
      border: 1px solid var(--color-border-card);
      transition: all var(--duration-slow) var(--ease-out);
      cursor: pointer;
    }
    .category-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-card-hover);
    }
    .category-card-img-wrap {
      height: 280px;
      position: relative;
      overflow: hidden;
    }
    .category-card-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--duration-slower) var(--ease-out);
    }
    .category-card:hover .category-card-img-wrap img {
      transform: scale(1.08);
    }
    .category-card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent 40%, rgba(53, 36, 27, 0.85) 100%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: var(--space-5);
      color: white;
    }
    .category-card-title {
      font-family: var(--font-heading);
      font-size: var(--text-2xl);
      font-weight: 500;
      color: white;
    }
    .category-card-count {
      font-size: var(--text-xs);
      color: rgba(255, 255, 255, 0.8);
      margin-top: 2px;
    }

    /* Artist Cards */
    .artist-card {
      width: 280px;
      flex-shrink: 0;
      background: var(--color-card);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border-card);
      padding: var(--space-6);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: all var(--duration-slow) var(--ease-out);
      position: relative;
    }
    .artist-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-card-hover);
      background: var(--color-surface);
    }
    .artist-avatar-wrap {
      position: relative;
      margin-bottom: var(--space-4);
    }
    .artist-avatar {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid var(--color-surface);
      box-shadow: var(--shadow-sm);
    }
    .artist-verified-badge {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 24px;
      height: 24px;
      background: var(--color-artist-blue);
      border-radius: 50%;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--color-surface);
    }
    .artist-name {
      font-family: var(--font-heading);
      font-size: var(--text-2xl);
      font-weight: 500;
      color: var(--color-text);
      margin-bottom: var(--space-1);
    }
    .artist-style-pill {
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-primary);
      background: rgba(138, 90, 43, 0.1);
      padding: 3px 10px;
      border-radius: var(--radius-full);
      margin-bottom: var(--space-3);
    }
    .artist-bio {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      line-height: 1.5;
      margin-bottom: var(--space-4);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .artist-stats {
      font-size: var(--text-xs);
      color: var(--color-text-muted);
      margin-bottom: var(--space-5);
      font-weight: 500;
    }

    /* Why Drawmadoo Section */
    .why-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-6);
    }
    .why-card {
      background: var(--color-card);
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      border: 1px solid var(--color-border-card);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      transition: all var(--duration) var(--ease-out);
    }
    .why-card:hover {
      background: var(--color-surface);
      transform: translateY(-4px);
      box-shadow: var(--shadow-card-hover);
    }
    .why-icon-wrap {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      background: rgba(138, 90, 43, 0.1);
      color: var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--space-4);
    }
    .why-title {
      font-family: var(--font-heading);
      font-size: var(--text-xl);
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: var(--space-2);
    }
    .why-desc {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      line-height: var(--leading-normal);
    }

    /* Featured Spotlight Section */
    .featured-spotlight-wrapper {
      background: var(--color-surface);
      border-radius: var(--radius-2xl);
      border: 1px solid var(--color-border);
      padding: var(--space-8);
      box-shadow: var(--shadow-lg);
      margin-bottom: var(--space-16);
    }
    .featured-spotlight-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: var(--space-10);
      align-items: center;
    }
    .featured-main-visual {
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
      background: var(--color-card);
      border: 1px solid var(--color-border-card);
      height: 480px;
    }
    .featured-main-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.35s ease-out, transform var(--duration-slow) var(--ease-out);
    }
    .featured-carousel-nav {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-top: var(--space-4);
    }
    .featured-thumb-btn {
      width: 70px;
      height: 70px;
      border-radius: var(--radius-md);
      overflow: hidden;
      border: 2px solid transparent;
      padding: 0;
      cursor: pointer;
      opacity: 0.6;
      transition: all var(--duration) var(--ease-out);
      background: var(--color-card);
    }
    .featured-thumb-btn.active {
      opacity: 1;
      border-color: var(--color-primary);
      transform: scale(1.05);
      box-shadow: var(--shadow-sm);
    }
    .featured-thumb-btn img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .featured-info-col {
      display: flex;
      flex-direction: column;
    }
    .featured-title {
      font-family: var(--font-heading);
      font-size: var(--text-4xl);
      font-weight: 500;
      color: var(--color-text);
      margin-bottom: var(--space-3);
    }
    .featured-artist-row {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-4);
    }
    .featured-artist-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
    }
    .featured-price {
      font-family: var(--font-heading);
      font-size: var(--text-4xl);
      font-weight: 600;
      color: var(--color-primary);
      margin-bottom: var(--space-4);
    }
    .featured-specs-table {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-3);
      padding: var(--space-4);
      background: var(--color-card);
      border-radius: var(--radius-md);
      margin-bottom: var(--space-6);
    }
    .spec-item {
      display: flex;
      flex-direction: column;
    }
    .spec-label {
      font-size: 11px;
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .spec-val {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-text);
    }

    /* Product Cards & Gallery Grid */
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--space-8);
    }
    .product-card {
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
      background: var(--color-card);
      border: 1px solid var(--color-border-card);
      transition: all var(--duration-slow) var(--ease-out);
      display: flex;
      flex-direction: column;
    }
    .product-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-card-hover);
    }
    .product-img-wrap {
      position: relative;
      height: 320px;
      overflow: hidden;
      background: var(--color-bg-alt);
    }
    .product-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--duration-slower) var(--ease-out);
    }
    .product-card:hover .product-img {
      transform: scale(1.06);
    }
    .product-badges {
      position: absolute;
      top: var(--space-3);
      left: var(--space-3);
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
      z-index: 2;
    }
    .product-wishlist-btn {
      position: absolute;
      top: var(--space-3);
      right: var(--space-3);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--glass-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--color-border);
      color: var(--color-text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 3;
      transition: all var(--duration) var(--ease-out);
    }
    .product-wishlist-btn:hover,
    .product-wishlist-btn.active {
      color: var(--color-burnt-orange);
      background: white;
      transform: scale(1.1);
    }
    .product-overlay {
      position: absolute;
      inset: 0;
      background: rgba(53, 36, 27, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--duration) var(--ease-out);
    }
    .product-card:hover .product-overlay {
      opacity: 1;
      pointer-events: auto;
    }
    .product-info {
      padding: var(--space-5);
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .product-meta-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-2);
    }
    .product-medium {
      font-size: var(--text-xs);
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .product-title {
      font-family: var(--font-heading);
      font-size: var(--text-2xl);
      font-weight: 500;
      color: var(--color-text);
      margin-bottom: var(--space-2);
      line-height: 1.25;
    }
    .product-artist-row {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      margin-bottom: var(--space-4);
    }
    .product-artist-avatar {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      object-fit: cover;
    }
    .product-bottom-row {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: var(--space-3);
      border-top: 1px solid var(--color-border);
    }
    .product-price {
      font-family: var(--font-heading);
      font-size: var(--text-2xl);
      font-weight: 600;
      color: var(--color-primary);
    }
    .product-rating {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-text);
    }

    /* Mediums Section */
    .mediums-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: var(--space-5);
    }
    .medium-card {
      background: var(--color-card);
      border-radius: var(--radius-lg);
      padding: var(--space-5) var(--space-3);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      border: 1px solid var(--color-border-card);
      transition: all var(--duration) var(--ease-out);
      cursor: pointer;
    }
    .medium-card:hover {
      background: var(--color-surface);
      transform: translateY(-4px);
      box-shadow: var(--shadow-card-hover);
    }
    .medium-icon {
      font-size: 32px;
      margin-bottom: var(--space-2);
    }
    .medium-name {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: 2px;
    }
    .medium-count {
      font-size: 11px;
      color: var(--color-text-muted);
    }

    /* Curated Collections */
    .collections-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--space-6);
    }
    .collection-card {
      position: relative;
      height: 340px;
      border-radius: var(--radius-lg);
      overflow: hidden;
      cursor: pointer;
      border: 1px solid var(--color-border-card);
      box-shadow: var(--shadow-sm);
      transition: all var(--duration-slow) var(--ease-out);
    }
    .collection-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-card-hover);
    }
    .collection-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--duration-slower) var(--ease-out);
    }
    .collection-card:hover img {
      transform: scale(1.08);
    }
    .collection-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(53, 36, 27, 0.85) 100%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: var(--space-6);
      color: white;
    }
    .collection-title {
      font-family: var(--font-heading);
      font-size: var(--text-3xl);
      font-weight: 500;
      color: white;
      margin-bottom: var(--space-1);
    }
    .collection-desc {
      font-size: var(--text-xs);
      color: rgba(255, 255, 255, 0.85);
      margin-bottom: var(--space-3);
    }

    /* Customer Homes Masonry */
    .homes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: var(--space-6);
    }
    .home-card {
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
      background: var(--color-card);
      border: 1px solid var(--color-border-card);
      transition: all var(--duration-slow) var(--ease-out);
    }
    .home-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-card-hover);
    }
    .home-card img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      transition: transform var(--duration-slower) var(--ease-out);
    }
    .home-card:hover img {
      transform: scale(1.05);
    }
    .home-card-body {
      padding: var(--space-4) var(--space-5);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--color-card);
    }
    .home-customer-name {
      font-weight: 600;
      font-size: var(--text-sm);
      color: var(--color-text);
    }
    .home-artwork-tag {
      font-size: var(--text-xs);
      color: var(--color-primary);
      font-weight: 500;
    }

    /* Meet the Artist Spotlight */
    .artist-spotlight-card {
      background: var(--color-surface);
      border-radius: var(--radius-2xl);
      border: 1px solid var(--color-border);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
    }
    .artist-spotlight-cover {
      height: 260px;
      position: relative;
    }
    .artist-spotlight-cover img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .artist-spotlight-content {
      padding: var(--space-8);
      position: relative;
      margin-top: -60px;
    }
    .artist-spotlight-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: var(--space-4);
      margin-bottom: var(--space-6);
    }
    .artist-spotlight-identity {
      display: flex;
      align-items: flex-end;
      gap: var(--space-5);
    }
    .artist-spotlight-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 5px solid var(--color-surface);
      object-fit: cover;
      box-shadow: var(--shadow-md);
      background: var(--color-card);
    }
    .timeline-container {
      margin-top: var(--space-8);
      padding-top: var(--space-6);
      border-top: 1px solid var(--color-border);
    }
    .timeline-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: var(--space-4);
      margin-top: var(--space-4);
    }
    .timeline-item {
      background: var(--color-card);
      padding: var(--space-4);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border-card);
    }
    .timeline-year {
      font-family: var(--font-heading);
      font-size: var(--text-xl);
      font-weight: 600;
      color: var(--color-primary);
    }
    .timeline-event {
      font-size: var(--text-xs);
      color: var(--color-text-secondary);
      margin-top: 2px;
    }

    /* Newsletter Box */
    .newsletter-box {
      background: linear-gradient(135deg, var(--color-card) 0%, var(--color-bg-alt) 100%);
      border-radius: var(--radius-2xl);
      border: 1px solid var(--color-border);
      padding: var(--space-16) var(--space-8);
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
      box-shadow: var(--shadow-md);
    }
    .newsletter-form {
      display: flex;
      gap: var(--space-3);
      max-width: 480px;
      margin: var(--space-8) auto var(--space-4);
    }
    .newsletter-input {
      flex: 1;
      padding: var(--space-3) var(--space-5);
      border-radius: var(--radius-full);
      background: var(--color-surface);
      border: 1.5px solid var(--color-border-strong);
    }

    /* Footer */
    .footer {
      background: var(--color-surface);
      border-top: 1px solid var(--color-border);
      padding: var(--space-16) 0 var(--space-8);
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr repeat(3, 1fr);
      gap: var(--space-10);
      margin-bottom: var(--space-12);
    }
    .footer-brand-about {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      margin-top: var(--space-4);
      max-width: 340px;
      line-height: var(--leading-relaxed);
    }
    .footer-col-title {
      font-family: var(--font-heading);
      font-size: var(--text-xl);
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: var(--space-4);
    }
    .footer-links-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
    .footer-link {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
    }
    .footer-link:hover {
      color: var(--color-primary);
    }
    .footer-bottom-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: var(--space-6);
      border-top: 1px solid var(--color-border);
      font-size: var(--text-xs);
      color: var(--color-text-muted);
    }
    .footer-social-row {
      display: flex;
      gap: var(--space-3);
      margin-top: var(--space-4);
    }
    .social-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--color-card);
      color: var(--color-text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--duration) var(--ease-out);
    }
    .social-btn:hover {
      background: var(--color-primary);
      color: white;
      transform: translateY(-2px);
    }

    /* Search Overlay */
    .search-overlay {
      position: fixed;
      inset: 0;
      z-index: var(--z-overlay);
      background: var(--color-overlay-heavy);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: var(--space-16) var(--space-4) var(--space-8);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--duration) var(--ease-out);
    }
    .search-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }
    .search-modal-container {
      background: var(--color-surface);
      width: 100%;
      max-width: 720px;
      border-radius: var(--radius-xl);
      border: 1px solid var(--color-border-strong);
      box-shadow: var(--shadow-xl);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      max-height: 85vh;
      animation: scaleIn 0.25s var(--ease-out);
    }
    .search-input-header {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-5) var(--space-6);
      border-bottom: 1px solid var(--color-border);
    }
    .search-input-field {
      flex: 1;
      border: none;
      box-shadow: none;
      font-size: var(--text-lg);
      background: transparent;
      color: var(--color-text);
    }
    .search-input-field:focus {
      box-shadow: none;
      border: none;
    }
    .search-modal-body {
      padding: var(--space-6);
      overflow-y: auto;
    }
    .search-tags-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      margin-top: var(--space-3);
    }
    .search-tag-chip {
      padding: 6px 14px;
      border-radius: var(--radius-full);
      background: var(--color-card);
      font-size: var(--text-xs);
      font-weight: 500;
      color: var(--color-text-secondary);
      cursor: pointer;
      border: 1px solid var(--color-border-card);
      transition: all var(--duration) var(--ease-out);
    }
    .search-tag-chip:hover {
      background: var(--color-primary);
      color: white;
    }
    .search-results-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      margin-top: var(--space-4);
    }
    .search-result-row {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-3);
      border-radius: var(--radius-md);
      transition: background var(--duration) var(--ease-out);
      cursor: pointer;
    }
    .search-result-row:hover {
      background: var(--color-card);
    }
    .search-result-thumb {
      width: 50px;
      height: 50px;
      border-radius: var(--radius-sm);
      object-fit: cover;
    }

    /* Admin Sidebar */
    .admin-sidebar {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 440px;
      max-width: 90vw;
      background: var(--color-surface);
      border-left: 1px solid var(--color-border-strong);
      z-index: var(--z-admin);
      box-shadow: var(--shadow-xl);
      transform: translateX(100%);
      transition: transform var(--duration-slow) var(--ease-out);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .admin-sidebar.open {
      transform: translateX(0);
    }
    .admin-sidebar-overlay {
      position: fixed;
      inset: 0;
      z-index: calc(var(--z-admin) - 1);
      background: var(--color-overlay);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--duration) var(--ease-out);
    }
    .admin-sidebar-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }
    .admin-sidebar-header {
      padding: var(--space-5) var(--space-6);
      border-bottom: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--color-card);
    }
    .admin-sidebar-body {
      padding: var(--space-6);
      overflow-y: auto;
      flex: 1;
    }
    .admin-nav-tabs {
      display: flex;
      gap: var(--space-2);
      overflow-x: auto;
      padding-bottom: var(--space-3);
      margin-bottom: var(--space-6);
      scrollbar-width: none;
    }
    .admin-nav-tabs::-webkit-scrollbar { display: none; }
    .admin-tab-btn {
      padding: 6px 14px;
      border-radius: var(--radius-full);
      font-size: var(--text-xs);
      font-weight: 600;
      white-space: nowrap;
      background: var(--color-card);
      color: var(--color-text-secondary);
      border: 1px solid var(--color-border);
      cursor: pointer;
    }
    .admin-tab-btn.active {
      background: var(--color-burnt-orange);
      color: white;
      border-color: var(--color-burnt-orange);
    }
    .admin-form-group {
      margin-bottom: var(--space-4);
    }
    .admin-form-label {
      display: block;
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: var(--space-1);
    }
    .admin-form-input, .admin-form-textarea {
      width: 100%;
      padding: var(--space-3);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);
      background: var(--color-surface);
      color: var(--color-text);
    }
    .admin-form-textarea {
      resize: vertical;
      min-height: 80px;
    }

    /* Recently Sold Popup */
    .recently-sold {
      position: fixed;
      bottom: var(--space-6);
      left: var(--space-6);
      z-index: var(--z-sticky);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--space-3) var(--space-4);
      box-shadow: var(--shadow-lg);
      display: flex;
      align-items: center;
      gap: var(--space-3);
      max-width: 320px;
      transform: translateY(120%);
      opacity: 0;
      transition: transform var(--duration-slow) var(--ease-spring), opacity var(--duration) var(--ease-out);
    }
    .recently-sold.show {
      transform: translateY(0);
      opacity: 1;
    }
    .recently-sold-thumb {
      width: 52px;
      height: 52px;
      border-radius: var(--radius-md);
      object-fit: cover;
      flex-shrink: 0;
    }
    .recently-sold-info {
      flex: 1;
    }
    .recently-sold-badge {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--color-burnt-orange);
      letter-spacing: 0.05em;
    }
    .recently-sold-title {
      font-size: var(--text-xs);
      font-weight: 600;
      color: var(--color-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 180px;
    }
    .recently-sold-time {
      font-size: 11px;
      color: var(--color-text-muted);
    }

    /* Quick View Modal */
    .quick-view-modal {
      position: fixed;
      inset: 0;
      z-index: var(--z-modal);
      background: var(--color-overlay-heavy);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-6);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--duration) var(--ease-out);
    }
    .quick-view-modal.open {
      opacity: 1;
      pointer-events: auto;
    }
    .quick-view-card {
      background: var(--color-surface);
      border-radius: var(--radius-2xl);
      max-width: 800px;
      width: 100%;
      border: 1px solid var(--color-border);
      box-shadow: var(--shadow-xl);
      display: grid;
      grid-template-columns: 1fr 1fr;
      overflow: hidden;
      position: relative;
    }
    .quick-view-close {
      position: absolute;
      top: var(--space-4);
      right: var(--space-4);
      z-index: 5;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--glass-bg);
      backdrop-filter: blur(8px);
      border: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .quick-view-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      min-height: 420px;
    }
    .quick-view-body {
      padding: var(--space-8);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    /* Floating Toast Notifications */
    .toast-container {
      position: fixed;
      bottom: var(--space-6);
      right: var(--space-6);
      z-index: var(--z-tooltip);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      pointer-events: none;
    }
    .toast-pill {
      background: var(--color-text);
      color: var(--color-text-inverse);
      padding: var(--space-3) var(--space-5);
      border-radius: var(--radius-full);
      font-size: var(--text-sm);
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: var(--space-2);
      box-shadow: var(--shadow-lg);
      transform: translateY(20px);
      opacity: 0;
      transition: all var(--duration) var(--ease-spring);
      pointer-events: auto;
    }
    .toast-pill.show {
      transform: translateY(0);
      opacity: 1;
    }

    /* Responsive adjustments */
    @media (max-width: 1024px) {
      .hero-grid {
        grid-template-columns: 1fr;
        gap: var(--space-8);
      }
      .hero-visual-card img {
        height: 400px;
      }
      .featured-spotlight-grid {
        grid-template-columns: 1fr;
      }
      .footer-grid {
        grid-template-columns: 1fr 1fr;
      }
      .floating-paint {
        display: none !important;
      }
    }
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .mobile-menu-toggle { display: flex; }
      .hero-stats-row { grid-template-columns: 1fr 1fr; }
      .newsletter-form { flex-direction: column; }
      .quick-view-card { grid-template-columns: 1fr; max-height: 90vh; overflow-y: auto; }
      .quick-view-img { height: 260px; min-height: 260px; }
      .footer-grid { grid-template-columns: 1fr; }
    }
  `;

  document.head.appendChild(style);
}

/* ─────────────────────────────────────────────────────────────────────
   SECTION 4: RENDER FUNCTIONS (CMS-Driven)
   Generate complete semantic HTML matching Design System specifications.
   ───────────────────────────────────────────────────────────────────── */

/**
 * 1. Render Announcement Bar
 */
function renderAnnouncementBar() {
  const bar = document.getElementById('announcement-bar');
  const textEl = document.getElementById('announcement-text');
  if (!bar || !textEl) return;

  const ann = DrawmadooData.site?.announcement;
  if (ann && ann.enabled) {
    bar.style.display = 'block';
    textEl.innerHTML = `<a href="${ann.link || '#'}">${ann.text || ''}</a>`;
  } else {
    bar.style.display = 'none';
  }
}

/**
 * 2. Render Floating Navbar
 */
function renderNavbar() {
  const navContainer = document.getElementById('navbar');
  if (!navContainer) return;

  const site = DrawmadooData.site || { name: 'Drawmadoo' };
  const navData = DrawmadooData.nav || { links: [] };

  const linksHtml = (navData.links || [])
    .map(link => `
      <a href="${link.href}" class="nav-link ${link.href.includes('exhibition') ? 'nav-link-exhibition' : ''}">
        ${link.text}
        ${link.badge ? `<span class="badge badge-primary" style="font-size: 10px; padding: 2px 7px; margin-left: 4px; border-radius: 999px; letter-spacing: 0.05em; font-weight: 700;">${link.badge}</span>` : ''}
      </a>
    `)
    .join('');

  navContainer.innerHTML = `
    <div class="container navbar-inner">
      <div style="display: flex; align-items: center; gap: var(--space-4);">
        <a href="#" class="nav-brand" aria-label="Drawmadoo Home">
          <div class="nav-brand-logo">${getIcon('logo', '', 34)}</div>
          <span>${site.name}</span>
        </a>
        <span class="admin-pill-badge">ADMIN</span>
        <button class="admin-edit-btn" data-section="nav" title="Edit Navigation">
          ${getIcon('edit', '', 12)} Edit Nav
        </button>
      </div>

      <nav class="nav-links" aria-label="Desktop Navigation">
        ${linksHtml}
      </nav>

      <div class="nav-actions">
        <button id="nav-search-btn" class="nav-action-btn" aria-label="Open search">
          ${getIcon('search', '', 18)}
        </button>

        <button id="nav-theme-btn" class="nav-action-btn" aria-label="Toggle dark mode">
          ${getIcon(AppState.theme === 'dark' ? 'sun' : 'moon', '', 18)}
        </button>

        <a href="#gallery" id="nav-wishlist-btn" class="nav-action-btn" aria-label="Wishlist">
          ${getIcon('heart', '', 18)}
          <span class="nav-badge-count" id="wishlist-counter">${AppState.wishlist.length}</span>
        </a>

        <button id="nav-cart-btn" class="nav-action-btn" aria-label="Shopping Cart">
          ${getIcon('cart', '', 18)}
          <span class="nav-badge-count" id="cart-counter">0</span>
        </button>

        <button id="nav-admin-toggle-btn" class="nav-action-btn" title="Toggle Admin Mode (Ctrl+Shift+A)" aria-label="Toggle admin mode">
          ${getIcon('shield-check', '', 18)}
        </button>

        <button id="mobile-menu-open-btn" class="nav-action-btn mobile-menu-toggle" aria-label="Open mobile menu">
          ${getIcon('menu', '', 20)}
        </button>
      </div>
    </div>
  `;
}

/**
 * 3. Render Mobile Menu Drawer
 */
function renderMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (!mobileMenu) return;

  const site = DrawmadooData.site || { name: 'Drawmadoo' };
  const navData = DrawmadooData.nav || { links: [] };

  const linksHtml = (navData.links || [])
    .map(link => `<a href="${link.href}" class="mobile-nav-link">${link.text}</a>`)
    .join('');

  mobileMenu.innerHTML = `
    <div class="mobile-menu-header">
      <div class="nav-brand">
        <div class="nav-brand-logo">${getIcon('leaf', '', 20)}</div>
        <span>${site.name}</span>
      </div>
      <button id="mobile-menu-close-btn" class="btn-icon" aria-label="Close menu">
        ${getIcon('x', '', 22)}
      </button>
    </div>

    <div class="mobile-nav-links">
      ${linksHtml}
    </div>

    <div style="margin-top: auto; display: flex; flex-direction: column; gap: var(--space-4);">
      <button id="mobile-search-btn" class="btn btn-outline" style="width: 100%;">
        ${getIcon('search', '', 16)} Search Artworks
      </button>
      <div style="display: flex; gap: var(--space-3);">
        <button id="mobile-theme-btn" class="btn btn-secondary" style="flex: 1;">
          ${getIcon(AppState.theme === 'dark' ? 'sun' : 'moon', '', 16)} Theme
        </button>
        <button id="mobile-admin-btn" class="btn btn-secondary" style="flex: 1;">
          ${getIcon('shield-check', '', 16)} Admin
        </button>
      </div>
    </div>
  `;
}

/**
 * 4. Render Hero Section
 */
function renderHero() {
  const heroSection = document.getElementById('hero-section');
  if (!heroSection) return;

  const hero = DrawmadooData.hero || {};
  const stats = hero.stats || [];

  const titleHtml = (hero.title || 'Original Art.\nCreated by Real Artists.')
    .split('\n')
    .map((line, idx) => (idx === 1 ? `<em>${line}</em>` : line))
    .join('<br>');

  const statsHtml = stats
    .map(
      stat => `
      <div class="stat-card animate-on-scroll">
        <div class="stat-number stat-counter" data-target-value="${stat.value}">${stat.value}</div>
        <div class="stat-label-wrap">
          ${getIcon(stat.icon || 'palette', '', 12)}
          <span>${stat.label}</span>
        </div>
      </div>
    `
    )
    .join('');

  heroSection.innerHTML = `
    <!-- Floating Paint Splashes (Desktop only) -->
    <svg class="floating-paint floating-paint-1" viewBox="0 0 200 200" fill="currentColor">
      <path d="M42.7,-64.1C55.9,-57.2,67.6,-46.8,74.7,-33.7C81.8,-20.6,84.3,-4.9,81.1,9.8C77.9,24.5,69,38.2,57.7,48.7C46.4,59.2,32.7,66.6,18.1,70.1C3.5,73.6,-12,73.2,-26.4,68.2C-40.8,63.1,-54.1,53.4,-63.9,40.8C-73.7,28.2,-80.1,12.7,-80.1,-3C-80.1,-18.7,-73.7,-34.6,-63,-46.8C-52.3,-59,-37.3,-67.4,-22.4,-72.4C-7.5,-77.4,7.3,-79,22.2,-75.7C37.1,-72.4,49.5,-64.2,42.7,-64.1Z" transform="translate(100 100)"/>
    </svg>
    <svg class="floating-paint floating-paint-2" viewBox="0 0 200 200" fill="currentColor">
      <path d="M47.7,-68.8C61.4,-59.8,71.8,-46,76.5,-30.5C81.2,-15,80.1,2.3,75.4,18.7C70.6,35.1,62.1,50.6,49.3,61.4C36.4,72.2,19.2,78.3,1.4,76.4C-16.4,74.5,-32.8,64.6,-45.8,52.8C-58.8,41,-68.4,27.3,-73.4,11.6C-78.4,-4.1,-78.8,-21.8,-71.3,-36.3C-63.7,-50.8,-48.2,-62.1,-32.6,-69.9C-17,-77.8,-1.3,-82.2,13.6,-78.9C28.5,-75.6,43,-64.7,47.7,-68.8Z" transform="translate(100 100)"/>
    </svg>
    <svg class="floating-paint floating-paint-3" viewBox="0 0 200 200" fill="currentColor">
      <path d="M38.8,-57C51.2,-48.5,63,-38.7,69.5,-25.7C76,-12.7,77.2,3.5,73.4,18.7C69.6,33.9,60.8,48.1,48.4,57.7C36,67.3,20,72.3,4.2,70.5C-11.6,68.7,-27.2,60.1,-40.5,49.5C-53.8,38.9,-64.8,26.3,-69.8,11.3C-74.8,-3.7,-73.8,-21.1,-65.8,-34.8C-57.8,-48.5,-42.8,-58.5,-27.7,-65.8C-12.6,-73.1,2.6,-77.7,16.8,-73.8C31,-69.9,44.2,-57.5,38.8,-57Z" transform="translate(100 100)"/>
    </svg>

    <div class="container">
      <div class="hero-grid">
        <div class="hero-content animate-on-scroll">
          <div class="hero-badge-wrap">
            <span class="badge badge-primary">
              ${getIcon('leaf', '', 12)}
              <span>${hero.badge || 'Handmade Creativity'}</span>
            </span>
            <button class="admin-edit-btn" data-section="hero">
              ${getIcon('edit', '', 12)} Edit Hero
            </button>
          </div>

          <h1 class="hero-title">${titleHtml}</h1>
          <p class="hero-subtitle">${hero.subtitle || ''}</p>

          <!-- Integrated Hero Search Bar -->
          <div class="hero-search-wrapper">
            <form class="hero-search-box" onsubmit="event.preventDefault(); const q = this.querySelector('input').value.trim(); if(q) window.location.href='explore.html?search='+encodeURIComponent(q);">
              <span class="hero-search-icon">${getIcon('search', '', 18)}</span>
              <input type="text" placeholder="Search artworks, artists, styles or collections..." aria-label="Search artworks" />
              <button type="submit" class="btn btn-primary btn-sm" style="border-radius: var(--radius-full); padding: 8px 18px;">Search</button>
            </form>
          </div>

          <!-- Hero Action Buttons -->
          <div class="hero-cta-group" style="margin-top: var(--space-6); display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center;">
            <a href="exhibition.html" class="btn btn-primary btn-lg btn-exhibition-glow" onclick="document.body.style.transition='opacity 0.4s ease'; document.body.style.opacity='0'; setTimeout(()=>window.location.href='exhibition.html', 350); return false;" style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent-terracotta) 100%); border: none; box-shadow: 0 8px 24px rgba(200, 90, 36, 0.35); display: inline-flex; align-items: center; gap: 8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              <span>Explore Art Exhibition</span>
            </a>
            <a href="explore.html" class="btn btn-outline btn-lg">
              <span>Explore Gallery</span>
              ${getIcon('arrow-right', '', 16)}
            </a>
            <a href="admin/index.html" class="btn btn-secondary btn-lg" onclick="showToast('Connecting to artist application portal...');">
              Become an Artist
            </a>
            <a href="#artists-section" class="btn btn-outline btn-lg">
              Meet Artists
            </a>
          </div>

          <!-- Statistics -->
          <div class="hero-stats-row">
            ${statsHtml}
          </div>
        </div>

        <div class="hero-visual-wrapper animate-on-scroll" id="hero-parallax-target">
          <div class="hero-visual-card">
            <img class="img-loading" data-src="${hero.image}" alt="Masterpiece featured on Drawmadoo" loading="eager" />
            <div class="hero-visual-floating-badge">
              <div>
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-primary); font-weight: 600;">Authentic & Hand-Signed</div>
                <div style="font-family: var(--font-heading); font-size: var(--text-lg); font-weight: 600; color: var(--color-text);">Verified Independent Art</div>
              </div>
              <span class="badge badge-human">${getIcon('check', '', 12)} 100% Human</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * 5. Render Popular Categories (Top 6 Categories)
 */
function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;

  const targetCategoryNames = ['Portrait', 'Landscape', 'Traditional', 'Abstract', 'Digital Art', 'Sketches'];
  const allCategories = DrawmadooData.categories || [];

  const categories = targetCategoryNames.map(name => {
    return (
      allCategories.find(c => c.name.toLowerCase() === name.toLowerCase()) || {
        id: name.toLowerCase(),
        name: name,
        image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400&q=80',
        count: 1200
      }
    );
  });

  const cardsHtml = categories
    .map(
      cat => `
      <div class="category-card" data-category-id="${cat.id}" onclick="window.location.href='explore.html?category=' + encodeURIComponent('${cat.name}')">
        <div class="category-card-img-wrap">
          <img class="img-loading" data-src="${cat.image}" alt="${cat.name} Art" loading="lazy" />
          <div class="category-card-overlay">
            <h3 class="category-card-title">${cat.name}</h3>
            <span class="category-card-count">${Number(cat.count).toLocaleString()} Artworks</span>
          </div>
        </div>
      </div>
    `
    )
    .join('');

  container.innerHTML = `
    <div class="section-header animate-on-scroll">
      <div>
        <span class="badge badge-primary">Curated Genres</span>
        <h2 style="margin-top: var(--space-2);">Popular Categories</h2>
      </div>
      <div class="section-header-actions">
        <button class="admin-edit-btn" data-section="categories">${getIcon('edit', '', 12)} Edit</button>
      </div>
    </div>

    <div class="categories-grid-six animate-on-scroll">
      ${cardsHtml}
    </div>

    <div class="section-footer-cta animate-on-scroll">
      <a href="explore.html" class="btn btn-outline btn-lg" style="border-radius: var(--radius-full); padding: 12px 36px;">
        View All Categories
      </a>
    </div>
  `;
}

/**
 * 6. Render Trending Artists (Top 6 Artists Carousel)
 */
function renderArtists() {
  const container = document.getElementById('artists-container');
  if (!container) return;

  const artists = (DrawmadooData.artists || []).slice(0, 6);

  const cardsHtml = artists
    .map(
      artist => `
      <div class="artist-card" data-artist-id="${artist.id}">
        <div class="artist-avatar-wrap">
          <img class="artist-avatar img-loading" data-src="${artist.avatar}" alt="${artist.name}" loading="lazy" />
          ${artist.verified ? `<div class="artist-verified-badge" title="Verified Artist">${getIcon('check', '', 12)}</div>` : ''}
        </div>
        <h3 class="artist-name">${artist.name}</h3>
        <span class="artist-style-pill">${artist.style}</span>
        <div class="artist-stats" style="margin: 6px 0 12px;">
          <span>${artist.countryFlag || '🌍'} ${artist.country}</span> • <span>${Number(artist.followers).toLocaleString()} Collectors</span>
        </div>
        <button class="btn btn-outline btn-sm" style="width: 100%; border-radius: var(--radius-full);" onclick="window.location.href='explore.html?artist=' + encodeURIComponent('${artist.name}')">
          View Studio
        </button>
      </div>
    `
    )
    .join('');

  container.innerHTML = `
    <div class="section-header animate-on-scroll">
      <div>
        <span class="badge badge-verified">Global Creators</span>
        <h2 style="margin-top: var(--space-2);">Trending Artists</h2>
      </div>
      <div class="section-header-actions">
        <button class="admin-edit-btn" data-section="artists">${getIcon('edit', '', 12)} Edit</button>
        <button class="scroll-arrow scroll-arrow-left" data-target="artists-scroll" aria-label="Previous artists">${getIcon('chevron-left')}</button>
        <button class="scroll-arrow scroll-arrow-right" data-target="artists-scroll" aria-label="Next artists">${getIcon('chevron-right')}</button>
      </div>
    </div>

    <div class="scroll-container" id="artists-scroll">
      ${cardsHtml}
    </div>

    <div class="section-footer-cta animate-on-scroll">
      <a href="explore.html" class="btn btn-outline btn-lg" style="border-radius: var(--radius-full); padding: 12px 36px;">
        View All Artists
      </a>
    </div>
  `;
}

/**
 * 7. Render Why Drawmadoo (4 Minimal Standard Cards)
 */
function renderWhyDrawmadoo() {
  const container = document.getElementById('why-container');
  if (!container) return;

  const items = (DrawmadooData.whyDrawmadoo || []).slice(0, 4);

  const cardsHtml = items
    .map(
      item => `
      <div class="why-card animate-on-scroll">
        <div class="why-icon-wrap">${getIcon(item.icon, '', 24)}</div>
        <h3 class="why-title">${item.title}</h3>
        <p class="why-desc">${item.description}</p>
      </div>
    `
    )
    .join('');

  container.innerHTML = `
    <div class="section-header animate-on-scroll" style="margin-bottom: var(--space-8);">
      <div>
        <span class="badge badge-human">Trust & Authenticity</span>
        <h2 style="margin-top: var(--space-2);">Why Drawmadoo</h2>
      </div>
      <button class="admin-edit-btn" data-section="whyDrawmadoo">${getIcon('edit', '', 12)} Edit Standard</button>
    </div>

    <div class="why-grid">
      ${cardsHtml}
    </div>
  `;
}

/**
 * Helper to render an individual Product Card (Artwork)
 */
function renderProductCard(artwork) {
  if (!artwork) return '';
  const isWishlisted = AppState.wishlist.includes(artwork.id);
  const formattedPrice = `${artwork.currency || '₹'}${Number(artwork.price).toLocaleString('en-IN')}`;

  return `
    <article class="product-card animate-on-scroll" data-id="${artwork.id}">
      <div class="product-img-wrap">
        <img class="product-img img-loading" data-src="${artwork.image}" alt="${artwork.title}" loading="lazy" />
        <div class="product-badges">
          ${artwork.isNew ? '<span class="badge badge-primary">New</span>' : ''}
          ${artwork.isFeatured ? '<span class="badge badge-featured">Featured</span>' : ''}
        </div>
        <button class="product-wishlist-btn ${isWishlisted ? 'active' : ''}" data-wishlist-id="${artwork.id}" aria-label="Wishlist ${artwork.title}">
          ${getIcon(isWishlisted ? 'heart-filled' : 'heart', '', 18)}
        </button>
        <div class="product-overlay">
          <button class="btn btn-sm btn-secondary quick-view-btn" data-quick-id="${artwork.id}">
            ${getIcon('eye', '', 14)} Quick View
          </button>
        </div>
      </div>

      <div class="product-info">
        <div class="product-meta-row">
          <span class="product-medium">${artwork.medium || 'Original Work'}</span>
          <span style="font-size: 11px; color: var(--color-text-muted);">${artwork.size || ''}</span>
        </div>
        <h3 class="product-title">${artwork.title}</h3>
        <div class="product-artist-row">
          <img class="product-artist-avatar" src="${artwork.artistAvatar}" alt="${artwork.artist}" />
          <span>${artwork.artist}</span>
        </div>
        <div class="product-bottom-row">
          <span class="product-price">${formattedPrice}</span>
          <div class="product-rating">
            <span style="color: var(--color-golden-sand);">${getIcon('star-filled', '', 14)}</span>
            <span>${artwork.rating || '4.9'}</span>
            <span style="color: var(--color-text-muted);">(${artwork.reviews || 0})</span>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * 8. Render Featured Artworks (Top 4 Artworks Grid)
 */
function renderFeaturedArtwork() {
  const container = document.getElementById('featured-container');
  if (!container) return;

  const artworks = (DrawmadooData.artworks || []).slice(0, 4);
  const productsHtml = artworks.map(art => renderProductCard(art)).join('');

  container.innerHTML = `
    <div class="section-header animate-on-scroll">
      <div>
        <span class="badge badge-featured">Curated Masterpieces</span>
        <h2 style="margin-top: var(--space-2);">Featured Artworks</h2>
      </div>
      <div class="section-header-actions">
        <button class="admin-edit-btn" data-section="artworks">${getIcon('edit', '', 12)} Edit Artworks</button>
      </div>
    </div>

    <div class="featured-artworks-four-grid">
      ${productsHtml}
    </div>

    <div class="section-footer-cta animate-on-scroll">
      <a href="explore.html" class="btn btn-primary btn-lg" style="border-radius: var(--radius-full); padding: 14px 36px; display: inline-flex; align-items: center; gap: 8px;">
        <span>Explore All Artworks</span>
        ${getIcon('arrow-right', '', 16)}
      </a>
    </div>
  `;
}

/**
 * 9. Render Shop by Medium
 */
function renderMediums() {
  const container = document.getElementById('mediums-container');
  if (!container) return;

  const mediums = DrawmadooData.mediums || [];

  const cardsHtml = mediums
    .map(
      m => `
      <div class="medium-card animate-on-scroll" onclick="filterArtworksByMedium('${m.name}')">
        <div class="medium-icon">${m.icon}</div>
        <div class="medium-name">${m.name}</div>
        <div class="medium-count">${Number(m.count).toLocaleString()} works</div>
      </div>
    `
    )
    .join('');

  container.innerHTML = `
    <div class="section-header animate-on-scroll">
      <div>
        <span class="badge badge-primary">Disciplines</span>
        <h2 style="margin-top: var(--space-2);">Shop by Medium</h2>
      </div>
      <button class="admin-edit-btn" data-section="mediums">${getIcon('edit', '', 12)} Edit Mediums</button>
    </div>

    <div class="mediums-grid">
      ${cardsHtml}
    </div>
  `;
}

/**
 * 10. Render Curated Collections
 */
function renderCollections() {
  const container = document.getElementById('collections-container');
  if (!container) return;

  const collections = DrawmadooData.collections || [];

  const cardsHtml = collections
    .map(
      c => `
      <div class="collection-card animate-on-scroll" data-collection-id="${c.id}" onclick="showToast('Viewing ${c.name} Collection')">
        <img class="img-loading" data-src="${c.image}" alt="${c.name}" loading="lazy" />
        <div class="collection-overlay">
          <span class="badge badge-primary" style="width: fit-content; margin-bottom: var(--space-2);">${c.artworks} Works</span>
          <h3 class="collection-title">${c.name}</h3>
          <p class="collection-desc">${c.description}</p>
          <span class="link-arrow" style="color: white;">Explore Collection ${getIcon('arrow-right', '', 14)}</span>
        </div>
      </div>
    `
    )
    .join('');

  container.innerHTML = `
    <div class="section-header animate-on-scroll">
      <div>
        <span class="badge badge-featured">Signature Edits</span>
        <h2 style="margin-top: var(--space-2);">Curated Collections</h2>
      </div>
      <div class="section-header-actions">
        <button class="admin-edit-btn" data-section="collections">${getIcon('edit', '', 12)} Edit</button>
        <button class="admin-add-btn" data-action="add-collection">${getIcon('plus', '', 12)} Add Collection</button>
      </div>
    </div>

    <div class="collections-grid">
      ${cardsHtml}
    </div>
  `;
}

/**
 * 11. Render Art in Customer Homes
 */
function renderCustomerHomes() {
  const container = document.getElementById('homes-container');
  if (!container) return;

  const homes = DrawmadooData.customerHomes || [];

  const cardsHtml = homes
    .map(
      h => `
      <div class="home-card animate-on-scroll">
        <img class="img-loading" data-src="${h.image}" alt="Artwork styled in ${h.customer}'s home" loading="lazy" />
        <div class="home-card-body">
          <div>
            <div class="home-customer-name">${h.customer} • ${h.location}</div>
            <div class="home-artwork-tag">Styled piece: “${h.artwork}”</div>
          </div>
          <span class="badge badge-primary">${getIcon('home-preview', '', 12)} Verified</span>
        </div>
      </div>
    `
    )
    .join('');

  container.innerHTML = `
    <div class="section-header animate-on-scroll">
      <div>
        <span class="badge badge-human">Real Collectors</span>
        <h2 style="margin-top: var(--space-2);">Art in Real Homes</h2>
      </div>
      <button class="admin-edit-btn" data-section="customerHomes">${getIcon('edit', '', 12)} Edit Gallery</button>
    </div>

    <div class="homes-grid">
      ${cardsHtml}
    </div>
  `;
}

/**
 * 12. Render Meet the Artist Spotlight
 */
function renderMeetArtist() {
  const container = document.getElementById('artist-spotlight-container');
  if (!container) return;

  const artist = DrawmadooData.featuredArtist || {};
  const timeline = artist.timeline || [];

  const timelineHtml = timeline
    .map(
      t => `
      <div class="timeline-item">
        <div class="timeline-year">${t.year}</div>
        <div class="timeline-event">${t.event}</div>
      </div>
    `
    )
    .join('');

  container.innerHTML = `
    <div class="section-header animate-on-scroll">
      <div>
        <span class="badge badge-verified">Artist Spotlight</span>
        <h2 style="margin-top: var(--space-2);">Meet the Artist</h2>
      </div>
      <button class="admin-edit-btn" data-section="featuredArtist">${getIcon('edit', '', 12)} Edit Profile</button>
    </div>

    <div class="artist-spotlight-card animate-on-scroll">
      <div class="artist-spotlight-cover">
        <img class="img-loading" data-src="${artist.coverImage}" alt="${artist.name}'s studio" loading="lazy" />
      </div>

      <div class="artist-spotlight-content">
        <div class="artist-spotlight-header">
          <div class="artist-spotlight-identity">
            <img class="artist-spotlight-avatar" src="${artist.avatar}" alt="${artist.name}" />
            <div>
              <div style="display: flex; align-items: center; gap: var(--space-2);">
                <h3 style="font-family: var(--font-heading); font-size: var(--text-3xl); font-weight: 500;">${artist.name}</h3>
                <span class="verified-icon" title="Verified Creator">${getIcon('check', '', 10)}</span>
              </div>
              <p style="font-size: var(--text-sm); color: var(--color-primary); font-weight: 500;">
                ${artist.countryFlag || ''} ${artist.country} • ${artist.style}
              </p>
            </div>
          </div>

          <div style="display: flex; gap: var(--space-3); align-items: center;">
            <div style="text-align: right; margin-right: var(--space-4);">
              <div style="font-family: var(--font-heading); font-size: var(--text-2xl); font-weight: 600;">${artist.artworks} Works</div>
              <div style="font-size: 11px; color: var(--color-text-muted);">${artist.sold} Pieces Collected</div>
            </div>
            <button class="btn btn-artist-blue" onclick="showToast('Now following ${artist.name}')">Follow Artist</button>
          </div>
        </div>

        <p style="font-size: var(--text-base); color: var(--color-text-secondary); line-height: 1.8; max-width: 900px;">
          ${artist.bio || ''}
        </p>

        <div class="timeline-container">
          <div style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted);">
            Artistic Journey & Milestones
          </div>
          <div class="timeline-list">
            ${timelineHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * 13. Render Newsletter Section
 */
function renderNewsletter() {
  const container = document.getElementById('newsletter-container');
  if (!container) return;

  const nl = DrawmadooData.newsletter || {};

  container.innerHTML = `
    <div class="newsletter-box animate-on-scroll">
      <span class="badge badge-primary" style="margin-bottom: var(--space-4);">Weekly Salon</span>
      <h2 style="font-size: var(--text-4xl); margin-bottom: var(--space-3);">${nl.title}</h2>
      <p style="color: var(--color-text-secondary); max-width: 560px; margin: 0 auto;">${nl.subtitle}</p>

      <form id="newsletter-form" class="newsletter-form">
        <input type="email" id="newsletter-email" class="newsletter-input" placeholder="Enter your email address..." required aria-label="Email address" />
        <button type="submit" class="btn btn-primary">
          ${nl.buttonText || 'Join Gallery'}
        </button>
      </form>
      <p style="font-size: 11px; color: var(--color-text-muted);">${nl.privacyText || 'We respect your inbox.'}</p>
    </div>
  `;
}

/**
 * 14. Render Footer
 */
function renderFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;

  const f = DrawmadooData.footer || {};
  const columns = f.columns || [];

  const columnsHtml = columns
    .map(
      col => `
      <div>
        <h4 class="footer-col-title">${col.title}</h4>
        <ul class="footer-links-list">
          ${(col.links || []).map(link => `<li><a href="${link.href}" class="footer-link">${link.text}</a></li>`).join('')}
        </ul>
      </div>
    `
    )
    .join('');

  const badgesHtml = (f.badges || [])
    .map(b => `<span class="badge badge-primary">${getIcon('check', '', 12)} ${b}</span>`)
    .join(' ');

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="nav-brand" style="margin-bottom: var(--space-3);">
            <div class="nav-brand-logo">${getIcon('logo', '', 34)}</div>
            <span>${DrawmadooData.site?.name || 'Drawmadoo'}</span>
          </div>
          <p class="footer-brand-about">${f.about || ''}</p>
          <div class="footer-social-row">
            ${(f.social || []).map(s => `<a href="${s.href}" class="social-btn" aria-label="${s.name}">${getIcon(s.icon || 'globe', '', 18)}</a>`).join('')}
          </div>
        </div>

        ${columnsHtml}
      </div>

      <div class="footer-bottom-bar">
        <div>${f.copyright || '© 2024 Drawmadoo. All rights reserved.'}</div>
        <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
          ${badgesHtml}
        </div>
      </div>
    </div>
  `;
}

/**
 * 15. Render Search Overlay & Modal
 */
function renderSearchOverlay() {
  const overlay = document.getElementById('search-overlay');
  if (!overlay) return;

  const searchData = DrawmadooData.search || { recentSearches: [], trendingTags: [] };

  const recentTagsHtml = (searchData.recentSearches || [])
    .map(t => `<button class="search-tag-chip recent-search-btn" data-query="${t}">${getIcon('clock', '', 12)} ${t}</button>`)
    .join('');

  const trendingTagsHtml = (searchData.trendingTags || [])
    .map(t => `<button class="search-tag-chip trending-search-btn" data-query="${t}">${getIcon('trending-up', '', 12)} ${t}</button>`)
    .join('');

  overlay.innerHTML = `
    <div class="search-modal-container">
      <div class="search-input-header">
        <span style="color: var(--color-text-muted);">${getIcon('search', '', 20)}</span>
        <input type="text" id="main-search-input" class="search-input-field" placeholder="Search original artworks, artists, styles, mediums..." autocomplete="off" />
        <button id="search-close-btn" class="btn-icon" aria-label="Close search">
          ${getIcon('x', '', 20)}
        </button>
      </div>

      <div class="search-modal-body">
        <div id="search-default-view">
          <div style="margin-bottom: var(--space-6);">
            <div style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted);">
              Recent Inquiries
            </div>
            <div class="search-tags-row">
              ${recentTagsHtml}
            </div>
          </div>

          <div>
            <div style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted);">
              Trending Curations
            </div>
            <div class="search-tags-row">
              ${trendingTagsHtml}
            </div>
          </div>
        </div>

        <div id="search-results-container" style="display: none;">
          <div style="font-size: var(--text-xs); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); margin-bottom: var(--space-3);" id="search-results-heading">
            Matching Artworks
          </div>
          <div class="search-results-list" id="search-results-list"></div>
        </div>
      </div>
    </div>
  `;
}

/**
 * 16. Render Admin Sidebar Drawer
 */
function renderAdminSidebar() {
  const sidebar = document.getElementById('admin-sidebar');
  if (!sidebar) return;

  const sections = [
    { key: 'hero', label: 'Hero Banner' },
    { key: 'categories', label: 'Categories' },
    { key: 'artists', label: 'Artists' },
    { key: 'whyDrawmadoo', label: 'Why Drawmadoo' },
    { key: 'featuredArtwork', label: 'Spotlight Piece' },
    { key: 'artworks', label: 'Gallery Works' },
    { key: 'mediums', label: 'Mediums' },
    { key: 'collections', label: 'Collections' },
    { key: 'customerHomes', label: 'Real Homes' },
    { key: 'featuredArtist', label: 'Meet the Artist' },
    { key: 'newsletter', label: 'Newsletter' },
    { key: 'site', label: 'Site & Announcement' }
  ];

  const tabsHtml = sections
    .map(
      s => `
      <button class="admin-tab-btn ${s.key === AppState.activeAdminSection ? 'active' : ''}" data-admin-tab="${s.key}">
        ${s.label}
      </button>
    `
    )
    .join('');

  sidebar.innerHTML = `
    <div class="admin-sidebar-header">
      <div style="display: flex; align-items: center; gap: var(--space-2);">
        ${getIcon('edit', '', 18)}
        <h3 style="font-size: var(--text-lg); font-weight: 600;">Drawmadoo CMS Editor</h3>
      </div>
      <button id="admin-sidebar-close-btn" class="btn-icon" aria-label="Close admin panel">
        ${getIcon('x', '', 20)}
      </button>
    </div>

    <div class="admin-sidebar-body">
      <div class="admin-nav-tabs">
        ${tabsHtml}
      </div>

      <div id="admin-form-container">
        <!-- Rendered dynamically depending on tab -->
      </div>
    </div>
  `;

  renderAdminSectionForm(AppState.activeAdminSection);
}

/**
 * Render dynamic section edit form inside Admin Sidebar
 */
function renderAdminSectionForm(sectionKey) {
  const formContainer = document.getElementById('admin-form-container');
  if (!formContainer) return;

  let formHtml = '';

  if (sectionKey === 'hero') {
    const hero = DrawmadooData.hero || {};
    formHtml = `
      <form id="admin-edit-form">
        <div class="admin-form-group">
          <label class="admin-form-label">Badge Text</label>
          <input type="text" name="badge" class="admin-form-input" value="${hero.badge || ''}" />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Hero Title (Use newline for italic accent)</label>
          <textarea name="title" class="admin-form-textarea">${hero.title || ''}</textarea>
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Hero Subtitle</label>
          <textarea name="subtitle" class="admin-form-textarea">${hero.subtitle || ''}</textarea>
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Hero Artwork Image URL</label>
          <input type="text" name="image" class="admin-form-input" value="${hero.image || ''}" />
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: var(--space-4);">
          Save Hero Changes
        </button>
      </form>
    `;
  } else if (sectionKey === 'featuredArtwork') {
    const fa = DrawmadooData.featuredArtwork || {};
    formHtml = `
      <form id="admin-edit-form">
        <div class="admin-form-group">
          <label class="admin-form-label">Artwork Title</label>
          <input type="text" name="title" class="admin-form-input" value="${fa.title || ''}" />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Price (INR)</label>
          <input type="number" name="price" class="admin-form-input" value="${fa.price || 0}" />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Medium & Substrate</label>
          <input type="text" name="medium" class="admin-form-input" value="${fa.medium || ''}" />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Dimensions</label>
          <input type="text" name="size" class="admin-form-input" value="${fa.size || ''}" />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Description</label>
          <textarea name="description" class="admin-form-textarea">${fa.description || ''}</textarea>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: var(--space-4);">
          Save Spotlight Changes
        </button>
      </form>
    `;
  } else if (sectionKey === 'site') {
    const site = DrawmadooData.site || {};
    const ann = site.announcement || {};
    formHtml = `
      <form id="admin-edit-form">
        <div class="admin-form-group">
          <label class="admin-form-label">Gallery Title</label>
          <input type="text" name="name" class="admin-form-input" value="${site.name || ''}" />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Announcement Text</label>
          <input type="text" name="announcementText" class="admin-form-input" value="${ann.text || ''}" />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Announcement Enabled</label>
          <select name="announcementEnabled" class="admin-form-input">
            <option value="true" ${ann.enabled ? 'selected' : ''}>Enabled</option>
            <option value="false" ${!ann.enabled ? 'selected' : ''}>Disabled</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: var(--space-4);">
          Save Site Settings
        </button>
      </form>
    `;
  } else if (sectionKey === 'newsletter') {
    const nl = DrawmadooData.newsletter || {};
    formHtml = `
      <form id="admin-edit-form">
        <div class="admin-form-group">
          <label class="admin-form-label">Newsletter Title</label>
          <input type="text" name="title" class="admin-form-input" value="${nl.title || ''}" />
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Newsletter Subtitle</label>
          <textarea name="subtitle" class="admin-form-textarea">${nl.subtitle || ''}</textarea>
        </div>
        <div class="admin-form-group">
          <label class="admin-form-label">Button CTA</label>
          <input type="text" name="buttonText" class="admin-form-input" value="${nl.buttonText || ''}" />
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: var(--space-4);">
          Save Newsletter Changes
        </button>
      </form>
    `;
  } else {
    formHtml = `
      <div style="text-align: center; padding: var(--space-8); color: var(--color-text-secondary);">
        <p style="margin-bottom: var(--space-4);">Section: <strong>${sectionKey}</strong></p>
        <p style="font-size: var(--text-sm);">Interactive editing available. You can add new items or edit existing data objects in real time.</p>
        <button class="btn btn-secondary" style="margin-top: var(--space-4);" onclick="showToast('Section edit modal primed for ${sectionKey}')">
          ${getIcon('plus', '', 14)} Add Entry to ${sectionKey}
        </button>
      </div>
    `;
  }

  formContainer.innerHTML = formHtml;

  const form = document.getElementById('admin-edit-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      saveSectionFromForm(sectionKey, new FormData(form));
    });
  }
}

/**
 * Handle form submission in Admin Mode & re-render target section
 */
function saveSectionFromForm(sectionKey, formData) {
  if (sectionKey === 'hero') {
    DrawmadooData.hero.badge = formData.get('badge');
    DrawmadooData.hero.title = formData.get('title');
    DrawmadooData.hero.subtitle = formData.get('subtitle');
    DrawmadooData.hero.image = formData.get('image');
    renderHero();
    initCounters();
    initHeroParallax();
    initLazyLoading();
  } else if (sectionKey === 'featuredArtwork') {
    DrawmadooData.featuredArtwork.title = formData.get('title');
    DrawmadooData.featuredArtwork.price = Number(formData.get('price'));
    DrawmadooData.featuredArtwork.medium = formData.get('medium');
    DrawmadooData.featuredArtwork.size = formData.get('size');
    DrawmadooData.featuredArtwork.description = formData.get('description');
    renderFeaturedArtwork();
    initCarousel();
    initLazyLoading();
  } else if (sectionKey === 'site') {
    DrawmadooData.site.name = formData.get('name');
    DrawmadooData.site.announcement.text = formData.get('announcementText');
    DrawmadooData.site.announcement.enabled = formData.get('announcementEnabled') === 'true';
    renderNavbar();
    renderAnnouncementBar();
  } else if (sectionKey === 'newsletter') {
    DrawmadooData.newsletter.title = formData.get('title');
    DrawmadooData.newsletter.subtitle = formData.get('subtitle');
    DrawmadooData.newsletter.buttonText = formData.get('buttonText');
    renderNewsletter();
  }

  // Persist overrides in localStorage
  try {
    const overrides = JSON.parse(localStorage.getItem('drawmadoo_overrides') || '{}');
    overrides[sectionKey] = DrawmadooData[sectionKey];
    localStorage.setItem('drawmadoo_overrides', JSON.stringify(overrides));
  } catch (err) {
    console.warn('Failed saving overrides', err);
  }

  showToast(`Section “${sectionKey}” updated successfully!`);
  closeAdminSidebar();
}

/* ─────────────────────────────────────────────────────────────────────
   SECTION 5: INTERACTIVE BEHAVIORS & EVENT HANDLERS
   ───────────────────────────────────────────────────────────────────── */

/**
 * 5.1 IntersectionObserver for scroll animations
 */
function initScrollObserver() {
  const elements = document.querySelectorAll('.animate-on-scroll:not(.visible)');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 70);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/**
 * 5.2 Navbar scroll elevation effect
 */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 5.3 Mobile Menu Open / Close logic
 */
function initMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const openBtn = document.getElementById('mobile-menu-open-btn');
  const closeBtn = document.getElementById('mobile-menu-close-btn');

  if (!mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (openBtn) openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close on nav link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Mobile secondary action buttons
  const mobileSearchBtn = document.getElementById('mobile-search-btn');
  if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener('click', () => {
      closeMenu();
      openSearchOverlay();
    });
  }

  const mobileThemeBtn = document.getElementById('mobile-theme-btn');
  if (mobileThemeBtn) {
    mobileThemeBtn.addEventListener('click', toggleTheme);
  }

  const mobileAdminBtn = document.getElementById('mobile-admin-btn');
  if (mobileAdminBtn) {
    mobileAdminBtn.addEventListener('click', () => {
      closeMenu();
      toggleAdminMode();
    });
  }
}

/**
 * 5.4 Counter Animation
 * Parses formats like '18,000+', '2,700+', '34', '250K+' and animates smoothly over 2s.
 */
function initCounters() {
  const counterElements = document.querySelectorAll('.stat-counter');

  function parseStatString(str) {
    const raw = String(str).trim();
    const isK = raw.toUpperCase().includes('K');
    const isPlus = raw.includes('+');
    const numPart = parseFloat(raw.replace(/[^\d.]/g, '')) || 0;

    return {
      target: numPart,
      isK,
      isPlus,
      hasComma: raw.includes(',')
    };
  }

  function animateCounter(el) {
    const originalText = el.dataset.targetValue || el.innerText;
    const { target, isK, isPlus, hasComma } = parseStatString(originalText);
    const duration = 2000;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(target * ease);

      let formatted = hasComma ? currentVal.toLocaleString('en-US') : String(currentVal);
      if (isK) formatted += 'K';
      if (isPlus) formatted += '+';

      el.innerText = formatted;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.innerText = originalText;
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterElements.forEach(el => observer.observe(el));
}

/**
 * 5.5 Horizontal Scroll Containers with Left/Right Arrows
 */
function initScrollContainers() {
  document.querySelectorAll('.scroll-arrow').forEach(arrow => {
    arrow.addEventListener('click', () => {
      const targetId = arrow.dataset.target;
      const container = targetId ? document.getElementById(targetId) : arrow.closest('.section')?.querySelector('.scroll-container');
      if (!container) return;

      const scrollDistance = container.clientWidth * 0.8;
      const direction = arrow.classList.contains('scroll-arrow-left') ? -1 : 1;
      container.scrollBy({ left: direction * scrollDistance, behavior: 'smooth' });
    });
  });

  // Dynamic arrow visibility based on scroll position
  document.querySelectorAll('.scroll-container').forEach(container => {
    const updateArrows = () => {
      const parent = container.closest('.section') || container.parentElement;
      const leftArrow = parent.querySelector('.scroll-arrow-left');
      const rightArrow = parent.querySelector('.scroll-arrow-right');

      if (leftArrow) {
        leftArrow.style.opacity = container.scrollLeft <= 10 ? '0.3' : '1';
        leftArrow.style.pointerEvents = container.scrollLeft <= 10 ? 'none' : 'auto';
      }
      if (rightArrow) {
        const isEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
        rightArrow.style.opacity = isEnd ? '0.3' : '1';
        rightArrow.style.pointerEvents = isEnd ? 'none' : 'auto';
      }
    };

    container.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();
  });
}

/**
 * 5.6 Image Lazy Loading with Blur-to-Sharp Transition
 */
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const loadImage = img => {
    const src = img.getAttribute('data-src');
    if (!src) return;

    img.src = src;
    img.removeAttribute('data-src');

    const onImageLoaded = () => {
      img.classList.remove('img-loading');
      img.classList.add('img-loaded');
    };

    if (img.complete && img.naturalHeight !== 0) {
      onImageLoaded();
    } else {
      img.addEventListener('load', onImageLoaded, { once: true });
      img.addEventListener(
        'error',
        () => {
          img.classList.remove('img-loading');
        },
        { once: true }
      );
    }
  };

  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '250px 0px' }
    );

    images.forEach(img => imgObserver.observe(img));
  } else {
    images.forEach(img => loadImage(img));
  }
}

/**
 * 5.7 Search Overlay & Live Search Filtering
 */
function initSearchOverlay() {
  const overlay = document.getElementById('search-overlay');
  const openBtn = document.getElementById('nav-search-btn');
  const closeBtn = document.getElementById('search-close-btn');
  const input = document.getElementById('main-search-input');
  const defaultView = document.getElementById('search-default-view');
  const resultsContainer = document.getElementById('search-results-container');
  const resultsList = document.getElementById('search-results-list');

  if (!overlay) return;

  window.openSearchOverlay = () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (input) {
      setTimeout(() => input.focus(), 150);
    }
  };

  window.closeSearchOverlay = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (input) input.value = '';
    if (defaultView) defaultView.style.display = 'block';
    if (resultsContainer) resultsContainer.style.display = 'none';
  };

  if (openBtn) openBtn.addEventListener('click', window.openSearchOverlay);
  if (closeBtn) closeBtn.addEventListener('click', window.closeSearchOverlay);

  // Close when clicking outside modal box
  overlay.addEventListener('click', e => {
    if (e.target === overlay) window.closeSearchOverlay();
  });

  // Search filtering
  if (input) {
    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();

      if (!query) {
        defaultView.style.display = 'block';
        resultsContainer.style.display = 'none';
        return;
      }

      defaultView.style.display = 'none';
      resultsContainer.style.display = 'block';

      const artworks = DrawmadooData.artworks || [];
      const artists = DrawmadooData.artists || [];

      const matchedArtworks = artworks.filter(
        a =>
          a.title.toLowerCase().includes(query) ||
          a.artist.toLowerCase().includes(query) ||
          (a.medium && a.medium.toLowerCase().includes(query))
      );

      const matchedArtists = artists.filter(
        art => art.name.toLowerCase().includes(query) || art.style.toLowerCase().includes(query)
      );

      let resultsHtml = '';

      matchedArtworks.forEach(art => {
        resultsHtml += `
          <div class="search-result-row" onclick="window.closeSearchOverlay(); openQuickView(${art.id})">
            <img class="search-result-thumb" src="${art.image}" alt="${art.title}" />
            <div style="flex: 1;">
              <div style="font-weight: 600; font-size: var(--text-sm);">${art.title}</div>
              <div style="font-size: var(--text-xs); color: var(--color-text-secondary);">${art.artist} • ${art.medium}</div>
            </div>
            <div style="font-family: var(--font-heading); font-weight: 600; color: var(--color-primary);">
              ${art.currency}${Number(art.price).toLocaleString('en-IN')}
            </div>
          </div>
        `;
      });

      matchedArtists.forEach(artist => {
        resultsHtml += `
          <div class="search-result-row" onclick="window.closeSearchOverlay(); showToast('Navigating to ${artist.name}\\'s portfolio')">
            <img class="search-result-thumb" style="border-radius: 50%;" src="${artist.avatar}" alt="${artist.name}" />
            <div style="flex: 1;">
              <div style="font-weight: 600; font-size: var(--text-sm);">${artist.name} (Artist)</div>
              <div style="font-size: var(--text-xs); color: var(--color-text-secondary);">${artist.style} • ${artist.country}</div>
            </div>
            <span class="badge badge-verified">Artist</span>
          </div>
        `;
      });

      if (!resultsHtml) {
        resultsHtml = `
          <div style="padding: var(--space-8); text-align: center; color: var(--color-text-muted);">
            No matching artwork found for “${query}”. Try watercolor, portrait, or landscape.
          </div>
        `;
      }

      resultsList.innerHTML = resultsHtml;
    });
  }

  // Preset search chips click
  overlay.querySelectorAll('.search-tag-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.dataset.query;
      if (input && q) {
        input.value = q;
        input.dispatchEvent(new Event('input'));
      }
    });
  });
}

/**
 * 5.8 Admin Mode Toggle & Keyboard Shortcut (Ctrl+Shift+A)
 */
function initAdminMode() {
  const toggleBtn = document.getElementById('nav-admin-toggle-btn');

  window.toggleAdminMode = () => {
    AppState.adminMode = !AppState.adminMode;
    saveAdminState();
    showToast(AppState.adminMode ? 'Admin Mode Activated (Ctrl+Shift+A)' : 'Admin Mode Deactivated');
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', window.toggleAdminMode);
  }

  // Keyboard shortcut Ctrl+Shift+A or Cmd+Shift+A
  window.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      window.toggleAdminMode();
    }
  });

  // Wire up inline section edit buttons
  document.addEventListener('click', e => {
    const editBtn = e.target.closest('.admin-edit-btn');
    if (editBtn) {
      const section = editBtn.dataset.section || 'hero';
      openAdminSidebar(section);
    }

    const addBtn = e.target.closest('.admin-add-btn');
    if (addBtn) {
      const action = addBtn.dataset.action;
      showToast(`Creation wizard opened for action: ${action}`);
    }
  });
}

/**
 * 5.9 Admin Sidebar Control
 */
function initAdminSidebar() {
  const sidebar = document.getElementById('admin-sidebar');
  const overlay = document.getElementById('admin-sidebar-overlay');
  const closeBtn = document.getElementById('admin-sidebar-close-btn');

  window.openAdminSidebar = (sectionKey = 'hero') => {
    AppState.activeAdminSection = sectionKey;
    renderAdminSidebar();
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
  };

  window.closeAdminSidebar = () => {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  };

  if (closeBtn) closeBtn.addEventListener('click', window.closeAdminSidebar);
  if (overlay) overlay.addEventListener('click', window.closeAdminSidebar);

  // Tab switching inside admin sidebar
  document.addEventListener('click', e => {
    const tabBtn = e.target.closest('.admin-tab-btn');
    if (tabBtn && tabBtn.dataset.adminTab) {
      document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
      tabBtn.classList.add('active');
      AppState.activeAdminSection = tabBtn.dataset.adminTab;
      renderAdminSectionForm(tabBtn.dataset.adminTab);
    }
  });
}

/**
 * 5.10 Dark Mode Logic
 */
function initDarkMode() {
  const themeBtn = document.getElementById('nav-theme-btn');

  window.toggleTheme = () => {
    AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
    saveThemeState();

    if (themeBtn) {
      themeBtn.innerHTML = getIcon(AppState.theme === 'dark' ? 'sun' : 'moon', '', 18);
    }

    showToast(`Switched to ${AppState.theme === 'dark' ? 'Museum Dark' : 'Gallery Light'} theme`);
  };

  if (themeBtn) {
    themeBtn.addEventListener('click', window.toggleTheme);
  }

  // System preference change listener
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('drawmadoo_theme')) {
        AppState.theme = e.matches ? 'dark' : 'light';
        saveThemeState();
      }
    });
  }
}

/**
 * 5.11 Wishlist System
 */
function initWishlist() {
  document.addEventListener('click', e => {
    const wishBtn = e.target.closest('.product-wishlist-btn');
    if (!wishBtn) return;

    const id = parseInt(wishBtn.dataset.wishlistId, 10);
    if (!id) return;

    const index = AppState.wishlist.indexOf(id);
    if (index === -1) {
      AppState.wishlist.push(id);
      wishBtn.classList.add('active');
      wishBtn.innerHTML = getIcon('heart-filled', '', 18);
      showToast('Artwork added to your private wishlist');
    } else {
      AppState.wishlist.splice(index, 1);
      wishBtn.classList.remove('active');
      wishBtn.innerHTML = getIcon('heart', '', 18);
      showToast('Artwork removed from wishlist');
    }

    saveWishlistState();
  });
}

function updateWishlistUI() {
  const counter = document.getElementById('wishlist-counter');
  if (counter) counter.innerText = AppState.wishlist.length;

  document.querySelectorAll('.product-wishlist-btn').forEach(btn => {
    const id = parseInt(btn.dataset.wishlistId, 10);
    const inWish = AppState.wishlist.includes(id);
    btn.classList.toggle('active', inWish);
    btn.innerHTML = getIcon(inWish ? 'heart-filled' : 'heart', '', 18);
  });
}

/**
 * 5.12 Quick View Modal
 */
function initQuickView() {
  let modal = document.getElementById('quick-view-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'quick-view-modal';
    modal.className = 'quick-view-modal';
    document.body.appendChild(modal);
  }

  window.openQuickView = artworkId => {
    const artwork = (DrawmadooData.artworks || []).find(a => a.id === artworkId) || DrawmadooData.featuredArtwork;
    if (!artwork) return;

    const formattedPrice = `${artwork.currency || '₹'}${Number(artwork.price).toLocaleString('en-IN')}`;

    modal.innerHTML = `
      <div class="quick-view-card">
        <button class="quick-view-close" onclick="closeQuickView()" aria-label="Close modal">
          ${getIcon('x', '', 18)}
        </button>
        <div>
          <img class="quick-view-img" src="${artwork.image}" alt="${artwork.title}" />
        </div>
        <div class="quick-view-body">
          <span class="badge badge-primary" style="width: fit-content; margin-bottom: var(--space-3);">${artwork.medium}</span>
          <h2 style="font-family: var(--font-heading); font-size: var(--text-3xl); margin-bottom: var(--space-2);">${artwork.title}</h2>
          <p style="font-size: var(--text-sm); color: var(--color-text-secondary); margin-bottom: var(--space-4);">By ${artwork.artist}</p>
          <div style="font-family: var(--font-heading); font-size: var(--text-3xl); font-weight: 600; color: var(--color-primary); margin-bottom: var(--space-4);">${formattedPrice}</div>
          <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: var(--space-6); line-height: 1.6;">
            Includes verified certificate of authenticity, professional museum packing, and tracked worldwide delivery.
          </p>
          <div style="display: flex; gap: var(--space-3);">
            <button class="btn btn-primary" style="flex: 1;" onclick="showToast('Artwork added to acquisition cart'); closeQuickView();">
              Add to Cart
            </button>
            <button class="btn btn-outline" onclick="showToast('Room view launched');">
              ${getIcon('frame', '', 16)} Frame
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeQuickView = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  modal.addEventListener('click', e => {
    if (e.target === modal) window.closeQuickView();
  });

  document.addEventListener('click', e => {
    const quickBtn = e.target.closest('.quick-view-btn');
    if (quickBtn) {
      const id = parseInt(quickBtn.dataset.quickId, 10);
      window.openQuickView(id);
    }
  });
}

/**
 * 5.13 Featured Artwork Carousel with Smooth Crossfade
 */
function initCarousel() {
  const mainImg = document.getElementById('featured-main-img');
  const prevBtn = document.getElementById('featured-prev-btn');
  const nextBtn = document.getElementById('featured-next-btn');
  if (!mainImg) return;

  const fa = DrawmadooData.featuredArtwork || {};
  const thumbs = fa.thumbnails && fa.thumbnails.length > 0 ? fa.thumbnails : [fa.image];

  function setIndex(newIdx) {
    if (!mainImg) return;
    AppState.currentCarouselIndex = (newIdx + thumbs.length) % thumbs.length;

    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = thumbs[AppState.currentCarouselIndex];
      mainImg.style.opacity = '1';
    }, 180);

    document.querySelectorAll('.featured-thumb-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx === AppState.currentCarouselIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => setIndex(AppState.currentCarouselIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => setIndex(AppState.currentCarouselIndex + 1));
  }

  document.addEventListener('click', e => {
    const thumbBtn = e.target.closest('.featured-thumb-btn');
    if (thumbBtn && thumbBtn.dataset.carouselIndex !== undefined) {
      setIndex(parseInt(thumbBtn.dataset.carouselIndex, 10));
    }
  });
}

/**
 * 5.14 Recently Sold Popup
 * Displays random artwork every 30 seconds, auto-dismisses after 5 seconds.
 */
function initRecentlySold() {
  const popup = document.getElementById('recently-sold');
  if (!popup) return;

  const artworks = DrawmadooData.artworks || [];
  if (artworks.length === 0) return;

  const cities = ['London', 'New York', 'Mumbai', 'Paris', 'Tokyo', 'Zurich', 'Singapore', 'Berlin'];

  function triggerPopup() {
    if (AppState.recentlySoldDismissed) return;

    const randomArtwork = artworks[Math.floor(Math.random() * artworks.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];

    popup.innerHTML = `
      <img class="recently-sold-thumb" src="${randomArtwork.image}" alt="${randomArtwork.title}" />
      <div class="recently-sold-info">
        <div class="recently-sold-badge">Acquired Just Now</div>
        <div class="recently-sold-title">${randomArtwork.title}</div>
        <div class="recently-sold-time">Collector in ${randomCity} • ${randomArtwork.currency}${Number(randomArtwork.price).toLocaleString('en-IN')}</div>
      </div>
      <button id="recently-sold-dismiss-btn" style="color: var(--color-text-muted); cursor: pointer;" aria-label="Dismiss alert">
        ${getIcon('x', '', 14)}
      </button>
    `;

    popup.style.display = 'flex';
    requestAnimationFrame(() => popup.classList.add('show'));

    const dismissBtn = document.getElementById('recently-sold-dismiss-btn');
    if (dismissBtn) {
      dismissBtn.onclick = () => {
        popup.classList.remove('show');
        AppState.recentlySoldDismissed = true;
      };
    }

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      popup.classList.remove('show');
    }, 5000);
  }

  // Initial trigger after 10s, then recurring every 30s
  setTimeout(triggerPopup, 10000);
  setInterval(triggerPopup, 30000);
}

/**
 * 5.15 Hero Mouse Parallax (Desktop Only)
 */
function initHeroParallax() {
  const target = document.getElementById('hero-parallax-target');
  const heroSection = document.getElementById('hero-section');
  if (!target || !heroSection) return;

  // Only execute on desktop pointer devices
  if (window.innerWidth < 1024) return;

  heroSection.addEventListener(
    'mousemove',
    e => {
      if (window.innerWidth < 1024) return;
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const card = target.querySelector('.hero-visual-card');
      if (card) {
        card.style.transform = `translate3d(${x * 20}px, ${y * 20}px, 0) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
      }
    },
    { passive: true }
  );

  heroSection.addEventListener('mouseleave', () => {
    const card = target.querySelector('.hero-visual-card');
    if (card) {
      card.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)';
    }
  });
}

/**
 * 5.16 Toast Notification System
 */
function initToastSystem() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  window.showToast = (msg, iconName = 'check') => {
    const toast = document.createElement('div');
    toast.className = 'toast-pill';
    toast.innerHTML = `${getIcon(iconName, '', 16)} <span>${msg}</span>`;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  };
}

/**
 * 5.17 Filter Artworks by Medium
 */
window.filterArtworksByMedium = mediumName => {
  const galleryEl = document.getElementById('gallery');
  if (galleryEl) galleryEl.scrollIntoView({ behavior: 'smooth' });
  showToast(`Filtering for medium: ${mediumName}`);
};

/**
 * 5.18 Form Submissions
 */
function initForms() {
  const nlForm = document.getElementById('newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email')?.value;
      showToast(`Welcome! A curated masterpiece is on its way to ${email}`);
      nlForm.reset();
    });
  }

  const watchBtn = document.getElementById('hero-watch-process-btn');
  if (watchBtn) {
    watchBtn.addEventListener('click', () => {
      showToast('Loading 4K artist studio documentary film...', 'play');
    });
  }
}

/**
 * Global Keyboard Handler (Escape key dismisses modals)
 */
function initKeyboardAccessibility() {
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (document.getElementById('search-overlay')?.classList.contains('open')) {
        window.closeSearchOverlay();
      }
      if (document.getElementById('admin-sidebar')?.classList.contains('open')) {
        window.closeAdminSidebar();
      }
      if (document.getElementById('mobile-menu')?.classList.contains('open')) {
        document.getElementById('mobile-menu').classList.remove('open');
        document.body.style.overflow = '';
      }
      if (document.getElementById('quick-view-modal')?.classList.contains('open')) {
        window.closeQuickView();
      }
    }
  });
}

/* ─────────────────────────────────────────────────────────────────────
   SECTION 6: MASTER INITIALIZATION
   Executes strictly in the specified order on DOMContentLoaded.
   ───────────────────────────────────────────────────────────────────── */
function initApp() {
  // 1. Restore stored state & apply theme/admin overrides
  loadStoredState();
  injectRuntimeStyles();

  // Apply dark mode theme immediately to avoid flash of light
  document.documentElement.setAttribute('data-theme', AppState.theme);
  if (AppState.adminMode) document.body.classList.add('admin-mode');

  // 2. Call all render functions (Simplified 8-Section Homepage)
  renderAnnouncementBar();
  renderNavbar();
  renderMobileMenu();
  renderHero();
  renderCategories();
  renderArtists();
  renderWhyDrawmadoo();
  renderFeaturedArtwork();
  renderNewsletter();
  renderFooter();
  renderSearchOverlay();
  renderAdminSidebar();

  // 3. Initialize behavior systems in specified order
  initToastSystem();
  initLazyLoading();
  initScrollObserver();
  initNavbarScroll();
  initCounters();
  initScrollContainers();
  initCarousel();
  initDarkMode();
  initWishlist();
  initQuickView();
  initAdminMode();
  initAdminSidebar();
  initMobileMenu();
  initSearchOverlay();
  initHeroParallax();
  initRecentlySold();
  initForms();
  initKeyboardAccessibility();

  // 4. Mark page as loaded for smooth transition
  document.body.classList.add('page-loaded');

  console.info('🎨 Drawmadoo Art Marketplace initialized successfully.');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
