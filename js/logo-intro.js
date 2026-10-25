/**
 * Drawmadoo — Cinematic Logo Intro Animation
 * 
 * Tells the handcrafted story of an artist sketching the official Drawmadoo logo.
 * - Realistic SVG artist pencil enters from left
 * - Progressively sketches the circular emblem along its natural drawing path
 * - Pencil glides into its exact resting position at 45° and seamlessly becomes
 *   the pencil present in the official Drawmadoo logo
 * - "Drawmadoo" wordmark signs progressively from left to right with a handwritten reveal
 * - Holds composition for ~0.5s, then smoothly morphs/fades into the landing page
 * - Runs once per browser session (stored in sessionStorage)
 * - Preloads landing page assets in the background during animation
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'drawmadoo_intro_seen';
  let isRunning = false;
  let hasTransitioned = false;

  // Check if user already saw the intro in this browser session
  function shouldSkipIntro() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  }

  // Preload critical landing page assets in the background
  function preloadLandingPageAssets() {
    try {
      // 1. Preload key fonts
      if (document.fonts && document.fonts.load) {
        document.fonts.load("600 52px 'Playfair Display'");
        document.fonts.load("500 24px 'Playfair Display'");
      }

      // 2. Preload primary hero image if available in DrawmadooData
      if (typeof DrawmadooData !== 'undefined' && DrawmadooData.hero && DrawmadooData.hero.featuredArtwork) {
        const heroImg = DrawmadooData.hero.featuredArtwork.image;
        if (heroImg) {
          const img = new Image();
          img.src = heroImg;
        }
      }
    } catch (err) {
      console.warn('[Intro] Preload error:', err);
    }
  }

  // Construct the HTML/SVG markup for the intro overlay
  function createIntroOverlay() {
    if (document.getElementById('drawmadoo-intro-overlay')) {
      return document.getElementById('drawmadoo-intro-overlay');
    }

    const overlay = document.createElement('div');
    overlay.id = 'drawmadoo-intro-overlay';
    overlay.innerHTML = `
      <div class="intro-stage" id="intro-stage">
        <svg id="drawmadooIntroSvg" viewBox="0 0 650 200" width="650" height="200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <!-- Soft realistic drop shadow for pencil -->
            <filter id="introPencilShadow" x="-60%" y="-60%" width="220%" height="220%">
              <feDropShadow dx="-5" dy="7" stdDeviation="4.5" flood-color="#2B221D" flood-opacity="0.20"/>
            </filter>

            <!-- Palette inner color washes (Official Brand Colors) -->
            <radialGradient id="introTealWash" cx="32%" cy="32%" r="48%">
              <stop offset="0%" stop-color="#168EB5" stop-opacity="0.95"/>
              <stop offset="65%" stop-color="#0F6F8E" stop-opacity="0.85"/>
              <stop offset="100%" stop-color="#0F6F8E" stop-opacity="0"/>
            </radialGradient>

            <radialGradient id="introGoldWash" cx="68%" cy="36%" r="52%">
              <stop offset="0%" stop-color="#F5CE70" stop-opacity="0.98"/>
              <stop offset="55%" stop-color="#C19A49" stop-opacity="0.88"/>
              <stop offset="100%" stop-color="#C19A49" stop-opacity="0"/>
            </radialGradient>

            <radialGradient id="introTerracottaWash" cx="62%" cy="72%" r="46%">
              <stop offset="0%" stop-color="#E27236" stop-opacity="0.95"/>
              <stop offset="60%" stop-color="#C85A24" stop-opacity="0.85"/>
              <stop offset="100%" stop-color="#C85A24" stop-opacity="0"/>
            </radialGradient>

            <!-- Palette deep dark ground -->
            <radialGradient id="introPaletteDark" cx="42%" cy="42%" r="58%">
              <stop offset="0%" stop-color="#342820"/>
              <stop offset="75%" stop-color="#201813"/>
              <stop offset="100%" stop-color="#140E0A"/>
            </radialGradient>

            <!-- Clip path to keep palette artwork inside circular frame -->
            <clipPath id="introPaletteCircleClip">
              <circle cx="100" cy="100" r="48"/>
            </clipPath>

            <!-- Progressive write-on reveal mask for "Drawmadoo" -->
            <mask id="introTextWriteMask">
              <rect id="introTextMaskRect" x="160" y="40" width="0" height="120" fill="#FFFFFF"/>
            </mask>
          </defs>

          <!-- ═══════════ Official Drawmadoo Logo Elements ═══════════ -->

          <!-- 1. Palette Interior (Blooms organically as pencil sketches) -->
          <g id="introPaletteInterior" clip-path="url(#introPaletteCircleClip)" opacity="0">
            <circle cx="100" cy="100" r="48" fill="url(#introPaletteDark)"/>
            <circle cx="76" cy="76" r="38" fill="url(#introTealWash)"/>
            <circle cx="126" cy="80" r="40" fill="url(#introGoldWash)"/>
            <circle cx="112" cy="124" r="36" fill="url(#introTerracottaWash)"/>
            <!-- Palette Thumbhole -->
            <ellipse cx="128" cy="116" rx="8" ry="11" fill="#140E0A" transform="rotate(25 128 116)" opacity="0.6"/>
            <ellipse cx="128" cy="116" rx="6" ry="9" fill="#2B221D" transform="rotate(25 128 116)"/>
          </g>

          <!-- 2. Sketched Outer Perimeter of the Emblem (Live pencil sketch) -->
          <path id="introSketchCircle"
                d="M 52 100 A 48 48 0 1 1 52 100.1"
                fill="none"
                stroke="#2B221D"
                stroke-width="3.2"
                stroke-linecap="round"
                stroke-linejoin="round"/>

          <!-- 3. Internal sketch swirl path (pencil guides the color wash) -->
          <path id="introSketchSwirl"
                d="M 52 100 C 66 65, 110 60, 130 80 C 146 95, 135 128, 110 132 C 85 136, 75 122, 66 134"
                fill="none"
                stroke="#C19A49"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-dasharray="240"
                stroke-dashoffset="240"
                opacity="0.4"/>

          <!-- 4. Wordmark "Drawmadoo" (Progressive handwritten write-on reveal) -->
          <g id="introLogoTextGroup" mask="url(#introTextWriteMask)">
            <text x="175" y="118"
                  font-family="'Playfair Display', 'Cormorant Garamond', Georgia, serif"
                  font-size="52"
                  font-weight="600"
                  letter-spacing="-0.015em"
                  fill="#2B221D">Drawmadoo</text>
          </g>

          <!-- 5. Delicate Gold Signature Underline flourish -->
          <path id="introSignatureUnderline"
                d="M 175 132 Q 260 135 340 131 Q 400 128 450 132"
                fill="none"
                stroke="#C19A49"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-dasharray="290"
                stroke-dashoffset="290"
                opacity="0.7"/>

          <!-- ═══════════ The Handcrafted Realistic Artist Pencil ═══════════ -->
          <!-- Origin (0, 0) is the tip of the graphite lead -->
          <g id="introArtistPencil" filter="url(#introPencilShadow)" transform="translate(-140, 100) rotate(45)">
            <g id="introPencilModel">
              <!-- Sharpened basswood cone (from tip (0,0) to cone base y=-24) -->
              <polygon points="0,0 -6.5,-24 6.5,-24" fill="#EAD7C2"/>
              <!-- Wood grain scallop cuts -->
              <path d="M -6.5,-24 Q -3.2,-21.5 0,-24 Q 3.2,-21.5 6.5,-24" fill="#D4A373" opacity="0.4"/>
              
              <!-- Graphite lead tip at the very point (0,0) -->
              <polygon points="0,0 -2.2,-8 2.2,-8" fill="#2B221D"/>

              <!-- Pencil Shaft / Body (13px wide, 78px long, from y=-24 to y=-102) -->
              <rect x="-6.5" y="-102" width="4" height="78" fill="#8A5A2B"/>
              <rect x="-2.5" y="-102" width="5" height="78" fill="#D4A373"/>
              <rect x="2.5" y="-102" width="4" height="78" fill="#A67244"/>

              <!-- Brass Ferrule / Gold Ring (from y=-102 to y=-115) -->
              <rect x="-6.5" y="-115" width="13" height="13" rx="1.5" fill="#C19A49"/>
              <line x1="-6.5" y1="-108.5" x2="6.5" y2="-108.5" stroke="#F5CE70" stroke-width="1.2"/>
              
              <!-- Dipped Crown end (y=-115 to y=-121) -->
              <path d="M -6,-115 C -6,-120.5 6,-120.5 6,-115 Z" fill="#201813"/>
            </g>
          </g>
        </svg>
      </div>

      <button class="intro-skip-pill" id="introSkipBtn" aria-label="Skip intro animation">Skip</button>
    `;

    document.body.appendChild(overlay);
    return overlay;
  }

  // Animation Sequence Controller
  function startAnimation(overlay) {
    if (isRunning) return;
    isRunning = true;
    hasTransitioned = false;

    preloadLandingPageAssets();

    const sketchCircle = document.getElementById('introSketchCircle');
    const sketchSwirl = document.getElementById('introSketchSwirl');
    const paletteInterior = document.getElementById('introPaletteInterior');
    const textMaskRect = document.getElementById('introTextMaskRect');
    const signatureUnderline = document.getElementById('introSignatureUnderline');
    const artistPencil = document.getElementById('introArtistPencil');
    const skipBtn = document.getElementById('introSkipBtn');

    if (!sketchCircle || !artistPencil) {
      endAnimation(overlay);
      return;
    }

    const circleLen = sketchCircle.getTotalLength();
    const swirlLen = sketchSwirl.getTotalLength();
    const underlineLen = signatureUnderline.getTotalLength();

    // Reset initial states
    sketchCircle.style.strokeDasharray = circleLen;
    sketchCircle.style.strokeDashoffset = circleLen;
    sketchSwirl.style.strokeDasharray = swirlLen;
    sketchSwirl.style.strokeDashoffset = swirlLen;
    signatureUnderline.style.strokeDasharray = underlineLen;
    signatureUnderline.style.strokeDashoffset = underlineLen;
    paletteInterior.style.opacity = '0';
    textMaskRect.setAttribute('width', '0');

    // Initial pencil offscreen left
    artistPencil.setAttribute('transform', 'translate(-120, 140) rotate(45)');

    // Easing curves
    const easeInOutCubic = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
    const easeOutQuad = t => 1 - (1 - t) * (1 - t);

    // Official resting position inside emblem
    const restingX = 66, restingY = 134;
    const restingAngle = 45;

    let startTime = null;
    let animFrameId = null;

    // Allow user to skip gracefully
    const handleSkip = () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      endAnimation(overlay);
    };

    if (skipBtn) skipBtn.onclick = handleSkip;
    const handleKey = (e) => {
      if (e.key === 'Escape' || e.key === ' ') handleSkip();
    };
    window.addEventListener('keydown', handleKey, { once: true });

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // ── Phase 1: Pencil Enters (0 - 550ms) ──
      if (elapsed <= 550) {
        const progress = easeOutCubic(elapsed / 550);
        const startX = -120, startY = 160;
        const targetPoint = sketchCircle.getPointAtLength(0); // (52, 100)
        const currentX = startX + (targetPoint.x - startX) * progress;
        const currentY = startY + (targetPoint.y - startY) * progress;
        const angle = 45 + 5 * Math.sin(progress * Math.PI);
        artistPencil.setAttribute('transform', `translate(${currentX}, ${currentY}) rotate(${angle})`);
      }

      // ── Phase 2: Drawing Circle Perimeter (550 - 1600ms) ──
      else if (elapsed <= 1600) {
        const progress = easeInOutCubic((elapsed - 550) / 1050);
        const dist = progress * circleLen;
        sketchCircle.style.strokeDashoffset = circleLen - dist;

        const point = sketchCircle.getPointAtLength(dist);
        const wristWiggle = 45 + 8 * Math.sin(progress * Math.PI * 2);
        artistPencil.setAttribute('transform', `translate(${point.x}, ${point.y}) rotate(${wristWiggle})`);
      }

      // ── Phase 3: Swirl Inward & Colors Bloom (1600 - 2250ms) ──
      else if (elapsed <= 2250) {
        const progress = easeInOutCubic((elapsed - 1600) / 650);
        sketchCircle.style.strokeDashoffset = 0;
        paletteInterior.style.opacity = Math.min(progress * 1.4, 1);

        const sDist = progress * swirlLen;
        sketchSwirl.style.strokeDashoffset = swirlLen - sDist;

        const point = sketchSwirl.getPointAtLength(sDist);
        const wristWiggle = 45 - 6 * Math.sin(progress * Math.PI);
        artistPencil.setAttribute('transform', `translate(${point.x}, ${point.y}) rotate(${wristWiggle})`);
      }

      // ── Phase 4: Pencil Settles into Resting Position (2250 - 2750ms) ──
      else if (elapsed <= 2750) {
        const progress = easeOutCubic((elapsed - 2250) / 500);
        paletteInterior.style.opacity = 1;
        sketchCircle.style.strokeDashoffset = 0;
        sketchSwirl.style.strokeDashoffset = 0;
        sketchSwirl.style.opacity = Math.max(0, 0.4 * (1 - progress * 1.5));

        const lastPoint = sketchSwirl.getPointAtLength(swirlLen);
        const curX = lastPoint.x + (restingX - lastPoint.x) * progress;
        const curY = lastPoint.y + (restingY - lastPoint.y) * progress;

        artistPencil.setAttribute('transform', `translate(${curX}, ${curY}) rotate(${restingAngle})`);
      }

      // ── Phase 5: "Drawmadoo" Signature Reveal (2750 - 3400ms) ──
      else if (elapsed <= 3400) {
        paletteInterior.style.opacity = 1;
        sketchCircle.style.strokeDashoffset = 0;
        sketchSwirl.style.opacity = 0;
        // Seamless transition: moving pencil is locked in official logo resting position
        artistPencil.setAttribute('transform', `translate(${restingX}, ${restingY}) rotate(${restingAngle})`);

        const textProgress = easeOutQuad((elapsed - 2750) / 650);
        const clipWidth = textProgress * 320;
        textMaskRect.setAttribute('width', clipWidth);

        const uDist = textProgress * underlineLen;
        signatureUnderline.style.strokeDashoffset = underlineLen - uDist;
      }

      // ── Phase 6: Hold Composition (3400 - 3900ms) ──
      else if (elapsed <= 3900) {
        textMaskRect.setAttribute('width', 320);
        signatureUnderline.style.strokeDashoffset = 0;
        artistPencil.setAttribute('transform', `translate(${restingX}, ${restingY}) rotate(${restingAngle})`);
      }

      // ── Phase 7: Transition to Landing Page (3900ms+) ──
      else {
        textMaskRect.setAttribute('width', 320);
        signatureUnderline.style.strokeDashoffset = 0;
        artistPencil.setAttribute('transform', `translate(${restingX}, ${restingY}) rotate(${restingAngle})`);
        window.removeEventListener('keydown', handleKey);
        endAnimation(overlay);
        return;
      }

      animFrameId = requestAnimationFrame(step);
    }

    animFrameId = requestAnimationFrame(step);
  }

  // End animation and smoothly fade into landing page
  function endAnimation(overlay) {
    if (hasTransitioned) return;
    hasTransitioned = true;
    isRunning = false;

    // Remember for this session
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch (e) {}

    if (!overlay) overlay = document.getElementById('drawmadoo-intro-overlay');
    if (!overlay) return;

    // Smooth cinematic fade/morph
    overlay.classList.add('intro-exiting');

    setTimeout(() => {
      overlay.classList.add('intro-hidden');
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 700);
  }

  // Initialize intro system
  function initIntro() {
    if (shouldSkipIntro()) {
      const existing = document.getElementById('drawmadoo-intro-overlay');
      if (existing) existing.style.display = 'none';
      return;
    }

    const overlay = createIntroOverlay();
    // Wait for initial render paint
    requestAnimationFrame(() => {
      setTimeout(() => startAnimation(overlay), 100);
    });
  }

  // Global helper API for testing or replay
  window.DrawmadooIntro = {
    start: () => {
      try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) {}
      const existing = document.getElementById('drawmadoo-intro-overlay');
      if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
      const overlay = createIntroOverlay();
      startAnimation(overlay);
    },
    skip: () => {
      endAnimation(document.getElementById('drawmadoo-intro-overlay'));
    },
    resetSession: () => {
      try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) {}
    }
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntro);
  } else {
    initIntro();
  }
})();
