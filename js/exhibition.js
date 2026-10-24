/**
 * ═════════════════════════════════════════════════════════════════════
 * DRAWMADOO — Virtual Art Exhibition 3D Engine (Three.js & GSAP)
 * Signature digital museum experience. Fully dynamic, CMS-driven,
 * Supabase-ready, with luxury museum corridor walkthrough.
 *
 * Desktop: Scroll-driven inertia walkthrough along museum corridor.
 * Mobile: Automatic cinematic guided walkthrough with subtle touch look.
 * Interaction: Smooth glide to inspect artworks front-and-center.
 * ═════════════════════════════════════════════════════════════════════
 */

'use strict';

class DrawmadooExhibition {
  constructor() {
    this.container = document.getElementById('exhibition-canvas-container');
    if (!this.container) return;

    // Device & Platform Detection
    this.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (window.innerWidth <= 768 && ('ontouchstart' in window || navigator.maxTouchPoints > 0));

    // Data state
    this.artworks = [];
    this.categories = [];
    this.halls = [];
    this.paintingMeshes = [];
    this.currentPaintingIndex = 0;
    this.currentHallIndex = 0;
    this.isInspecting = false;
    this.isAutoTourActive = false;
    this.ambientSoundActive = false;
    this.audioGuideUtterance = null;

    // Corridor Navigation Coordinates & Inertia Physics
    this.corridorX = 0;
    this.corridorY = 1.85; // Human standing eye level in meters
    this.currentCorridorZ = 4.0;
    this.targetCorridorZ = 4.0;
    this.savedCorridorZ = 4.0;
    this.minCorridorZ = -80.0; // Dynamically set based on hall count
    this.maxCorridorZ = 4.0;

    // Mobile Guided Walk State
    this.mobileWalkSpeed = 1.35; // units per second
    this.mobilePauseTimer = 0;
    this.lastPausedPainting = -1;
    this.mobileLookOffset = { x: 0, y: 0 };

    // Three.js Core
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.currentLookAt = new THREE.Vector3();
    this.mouseParallax = { x: 0, y: 0, targetX: 0, targetY: 0 };

    // Textures & Caching
    this.textureLoader = new THREE.TextureLoader();
    this.loadedTextures = new Map();

    // Web Audio API
    this.audioCtx = null;
    this.ambientGain = null;
    this.ambientOscs = null;

    // Initialize Engine
    this.init();
  }

  async init() {
    this.showLoader(10, 'Initializing digital museum...');
    await this.loadDynamicData();

    this.showLoader(40, 'Constructing exhibition halls...');
    this.setupThreeScene();
    this.buildMuseumArchitecture();

    this.showLoader(75, 'Curating museum lighting & frames...');
    this.setupInteraction();
    this.setupScrollNavigation();
    this.setupAudio();
    this.renderHeaderHallsNav();
    this.setupKeyboardControls();

    this.showLoader(100, 'Exhibition ready.');
    setTimeout(() => {
      this.hideLoader();
    }, 600);

    this.animate();

    // Listen to live CMS updates
    window.addEventListener('drawmadoo:dbchange', () => {
      console.log('🔄 CMS change detected: Refreshing virtual exhibition...');
      this.refreshExhibitionData();
    });
  }

  /* ──────────────────────────────────────────────────
     1. DYNAMIC CONTENT & SUPABASE RETRIEVAL
     ────────────────────────────────────────────────── */
  async loadDynamicData() {
    try {
      // 1. Check for Supabase dynamic artworks first
      if (window.DrawmadooDB && typeof window.DrawmadooDB.fetchSupabaseArtworks === 'function') {
        const supabaseArtworks = await window.DrawmadooDB.fetchSupabaseArtworks();
        if (supabaseArtworks && supabaseArtworks.length > 0) {
          this.artworks = supabaseArtworks;
          console.log('✅ Loaded dynamic artworks from Supabase:', this.artworks.length);
        }
      }

      // 2. Fallback to DrawmadooDB (CMS catalog)
      if (!this.artworks || this.artworks.length === 0) {
        if (window.DrawmadooDB) {
          this.artworks = window.DrawmadooDB.getArtworks({ includeHidden: false });
          this.categories = window.DrawmadooDB.getCategories() || [];
        } else if (window.DrawmadooData) {
          this.artworks = window.DrawmadooData.artworks || [];
          this.categories = window.DrawmadooData.categories || [];
        }
      }

      // 3. Fallback default categories if empty
      if (!this.categories || this.categories.length === 0) {
        this.categories = [
          { name: 'Landscape', title: 'Landscape Hall' },
          { name: 'Portrait', title: 'Portrait Hall' },
          { name: 'Traditional', title: 'Traditional Art Hall' },
          { name: 'Abstract', title: 'Abstract Gallery' },
          { name: 'Digital Art', title: 'Digital Art Gallery' },
          { name: 'Sketches', title: 'Sketch Gallery' }
        ];
      }

      // Group artworks by category into halls (hide empty halls automatically)
      this.groupArtworksIntoHalls();
    } catch (err) {
      console.error('Error loading exhibition data:', err);
    }
  }

  groupArtworksIntoHalls() {
    this.halls = [];
    const categoryMap = new Map();

    this.categories.forEach(cat => {
      categoryMap.set(cat.name.toLowerCase(), {
        name: cat.name,
        title: cat.name.includes('Hall') || cat.name.includes('Gallery') ? cat.name : `${cat.name} Hall`,
        artworks: []
      });
    });

    // Populate artworks into their respective halls
    this.artworks.forEach(art => {
      const catKey = (art.category || 'Landscape').toLowerCase();
      if (!categoryMap.has(catKey)) {
        categoryMap.set(catKey, {
          name: art.category,
          title: `${art.category} Hall`,
          artworks: []
        });
      }
      categoryMap.get(catKey).artworks.push(art);
    });

    // Filter out halls with 0 artworks (User requirement: hide empty halls)
    categoryMap.forEach(hall => {
      if (hall.artworks.length > 0) {
        this.halls.push(hall);
      }
    });

    // Fallback if somehow all were empty
    if (this.halls.length === 0 && this.artworks.length > 0) {
      this.halls.push({
        name: 'Masterpieces',
        title: 'Grand Masterpiece Hall',
        artworks: this.artworks
      });
    }

    console.info(`🏛️ Formed ${this.halls.length} curated exhibition halls with ${this.artworks.length} artworks.`);
  }

  /* ──────────────────────────────────────────────────
     2. THREE.JS SCENE, CAMERA & LIGHTING SETUP
     ────────────────────────────────────────────────── */
  setupThreeScene() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // Scene with soft atmospheric fog for museum depth
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0e0d0c);
    this.scene.fog = new THREE.FogExp2(0x0e0d0c, 0.018);

    // Perspective Camera strictly at human standing eye-level (1.85m)
    this.camera = new THREE.PerspectiveCamera(54, width / height, 0.1, 250);
    this.camera.position.set(this.corridorX, this.corridorY, 5.5);
    this.currentLookAt.set(this.corridorX, this.corridorY, -4.5);
    this.camera.lookAt(this.currentLookAt);

    // High performance WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    this.container.appendChild(this.renderer.domElement);

    // Ambient Museum Lighting
    const ambientLight = new THREE.AmbientLight(0x2d261f, 0.95);
    this.scene.add(ambientLight);

    // Directional Ceiling Track Light
    const trackLight = new THREE.DirectionalLight(0xfff3e0, 0.6);
    trackLight.position.set(0, 12, 10);
    this.scene.add(trackLight);

    // Resize Handler
    window.addEventListener('resize', () => this.onWindowResize());
  }

  /* ──────────────────────────────────────────────────
     3. MUSEUM ARCHITECTURE & WALLS BUILDER
     ────────────────────────────────────────────────── */
  buildMuseumArchitecture() {
    const hallLength = 26; // Z distance per hall
    const hallWidth = 11;  // X distance between opposite walls (corridor is center x=0)
    const wallHeight = 7.5;

    // Materials
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x161413,
      roughness: 0.88,
      metalness: 0.05
    });

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x110f0d,
      roughness: 0.28,
      metalness: 0.35
    });

    const ceilingMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0908,
      roughness: 0.95
    });

    const trimMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a5a2b,
      roughness: 0.4,
      metalness: 0.4
    });

    const totalHalls = this.halls.length;
    const totalLength = totalHalls * hallLength;

    // Configure corridor walk boundaries
    this.minCorridorZ = -(totalLength) + 1.0;
    this.maxCorridorZ = 4.0;

    // Continuous Grand Museum Floor with subtle gloss
    const floorGeo = new THREE.PlaneGeometry(hallWidth + 4, totalLength + 30);
    const floor = new THREE.Mesh(floorGeo, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, -(totalLength / 2) + 10);
    floor.receiveShadow = true;
    this.scene.add(floor);

    // Museum Ceiling with warm recessed cove
    const ceilingGeo = new THREE.PlaneGeometry(hallWidth + 4, totalLength + 30);
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, wallHeight, -(totalLength / 2) + 10);
    this.scene.add(ceiling);

    this.paintingMeshes = [];
    let globalIndex = 0;

    // Iterate each hall and build architecture + frames
    this.halls.forEach((hall, hIndex) => {
      const hallZStart = -(hIndex * hallLength);
      const hallZCenter = hallZStart - (hallLength / 2);

      // Left Wall
      const leftWallGeo = new THREE.BoxGeometry(0.3, wallHeight, hallLength);
      const leftWall = new THREE.Mesh(leftWallGeo, wallMaterial);
      leftWall.position.set(-(hallWidth / 2), wallHeight / 2, hallZCenter);
      leftWall.receiveShadow = true;
      this.scene.add(leftWall);

      // Right Wall
      const rightWall = leftWall.clone();
      rightWall.position.set(hallWidth / 2, wallHeight / 2, hallZCenter);
      this.scene.add(rightWall);

      // Baseboard Walnut Trims
      const baseboardGeo = new THREE.BoxGeometry(0.35, 0.3, hallLength);
      const leftBaseboard = new THREE.Mesh(baseboardGeo, trimMaterial);
      leftBaseboard.position.set(-(hallWidth / 2) + 0.05, 0.15, hallZCenter);
      this.scene.add(leftBaseboard);

      const rightBaseboard = leftBaseboard.clone();
      rightBaseboard.position.set((hallWidth / 2) - 0.05, 0.15, hallZCenter);
      this.scene.add(rightBaseboard);

      // Hall Archway & Overhead Sign
      this.createHallArchway(hall.title, -(hallWidth / 2), (hallWidth / 2), wallHeight, hallZStart);

      // Mount Paintings along Left and Right walls
      const artworksInHall = hall.artworks;
      const slotsPerSide = Math.max(Math.ceil(artworksInHall.length / 2), 1);
      const zSpacing = (hallLength - 6) / slotsPerSide;

      artworksInHall.forEach((art, aIdx) => {
        const isLeft = aIdx % 2 === 0;
        const sideSlot = Math.floor(aIdx / 2);
        const zPos = hallZStart - 3.5 - (sideSlot * zSpacing);

        const xPos = isLeft ? -(hallWidth / 2) + 0.18 : (hallWidth / 2) - 0.18;
        const yPos = 2.1; // Art eye level
        const rotY = isLeft ? Math.PI / 2 : -Math.PI / 2;

        const paintingGroup = this.createFramedPainting(art, xPos, yPos, zPos, rotY, globalIndex, hall.name);
        this.scene.add(paintingGroup);

        this.paintingMeshes.push({
          index: globalIndex,
          id: art.id,
          artData: art,
          hallName: hall.name,
          mesh: paintingGroup,
          xPos,
          yPos,
          zPos,
          isLeft
        });

        globalIndex++;
      });
    });

    console.info(`🖼️ Mounted ${this.paintingMeshes.length} framed artworks with museum spotlights.`);
  }

  /* ──────────────────────────────────────────────────
     4. ARCHWAY & OVERHEAD HALL SIGN
     ────────────────────────────────────────────────── */
  createHallArchway(title, xLeft, xRight, height, zPos) {
    const archGroup = new THREE.Group();

    // Arch Beam
    const beamGeo = new THREE.BoxGeometry(Math.abs(xRight - xLeft) + 0.4, 0.6, 0.6);
    const beamMat = new THREE.MeshStandardMaterial({ color: 0x1c1a18, roughness: 0.5, metalness: 0.2 });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.set(0, height - 0.5, zPos);
    archGroup.add(beam);

    // Warm Signboard Canvas Texture
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#171513';
    ctx.fillRect(0, 0, 1024, 256);

    // Gold Border
    ctx.strokeStyle = '#c99a42';
    ctx.lineWidth = 6;
    ctx.strokeRect(16, 16, 1024 - 32, 256 - 32);

    // Text
    ctx.fillStyle = '#f7f2ea';
    ctx.font = 'bold 52px "Cormorant Garamond", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`• ${title.toUpperCase()} •`, 512, 128);

    const signTexture = new THREE.CanvasTexture(canvas);
    signTexture.encoding = THREE.sRGBEncoding;

    const signGeo = new THREE.PlaneGeometry(4.2, 1.05);
    const signMat = new THREE.MeshStandardMaterial({
      map: signTexture,
      roughness: 0.4,
      metalness: 0.1
    });

    // Front sign
    const signFront = new THREE.Mesh(signGeo, signMat);
    signFront.position.set(0, height - 1.25, zPos + 0.31);
    archGroup.add(signFront);

    // Back sign
    const signBack = signFront.clone();
    signBack.rotation.y = Math.PI;
    signBack.position.z = zPos - 0.31;
    archGroup.add(signBack);

    // Downward ambient spotlight on archway
    const archLight = new THREE.SpotLight(0xfff1db, 1.4, 10, Math.PI / 4, 0.5);
    archLight.position.set(0, height - 0.6, zPos);
    archLight.target.position.set(0, 0, zPos);
    archGroup.add(archLight);
    archGroup.add(archLight.target);

    this.scene.add(archGroup);
  }

  /* ──────────────────────────────────────────────────
     5. FRAMED PAINTING BUILDER WITH WARM SPOTLIGHT
     ────────────────────────────────────────────────── */
  createFramedPainting(art, x, y, z, rotY, index, hallName) {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.rotation.y = rotY;

    // Aspect ratio auto-detection
    let width = 2.1;
    let height = 1.6;
    if (art.orientation === 'vertical' || art.category === 'Portrait') {
      width = 1.6;
      height = 2.1;
    } else if (art.orientation === 'square') {
      width = 1.8;
      height = 1.8;
    }

    // 1. Frame Geometry (Deep 3D Bevel)
    const frameDepth = 0.12;
    const frameBorder = 0.14;
    const frameGeo = new THREE.BoxGeometry(width + (frameBorder * 2), height + (frameBorder * 2), frameDepth);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x8a5a2b, // Brand walnut brown
      roughness: 0.35,
      metalness: 0.28
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.z = -frameDepth / 2;
    frameMesh.castShadow = true;
    frameMesh.receiveShadow = true;
    group.add(frameMesh);

    // 2. Archival Museum Matte (Soft linen off-white)
    const matteGeo = new THREE.PlaneGeometry(width + 0.08, height + 0.08);
    const matteMat = new THREE.MeshStandardMaterial({ color: 0xf5efe6, roughness: 0.9 });
    const matteMesh = new THREE.Mesh(matteGeo, matteMat);
    matteMesh.position.z = 0.005;
    group.add(matteMesh);

    // 3. Canvas Artwork Plane
    const primaryImg = (art.images && art.images[0]) || art.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80';
    const canvasGeo = new THREE.PlaneGeometry(width, height);

    // Placeholder canvas while remote texture streams in
    const defaultCanvasMat = new THREE.MeshStandardMaterial({
      color: 0x24201c,
      roughness: 0.8
    });
    const canvasMesh = new THREE.Mesh(canvasGeo, defaultCanvasMat);
    canvasMesh.position.z = 0.012;
    canvasMesh.userData = { artworkId: art.id, paintingIndex: index, isPainting: true };
    group.add(canvasMesh);

    // Asynchronous texture loading with caching & mipmapping
    this.loadArtworkTexture(primaryImg, (texture) => {
      canvasMesh.material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.42,
        metalness: 0.05
      });
      canvasMesh.material.needsUpdate = true;
    });

    // 4. Museum Brass Plaque beneath painting
    const plaqueMesh = this.createMuseumPlaque(art, width);
    plaqueMesh.position.set(0, -(height / 2) - 0.32, 0.02);
    plaqueMesh.userData = { artworkId: art.id, paintingIndex: index, isPainting: true };
    group.add(plaqueMesh);

    // 5. Dedicated Warm Museum Spotlight
    const spotLight = new THREE.SpotLight(0xfff4e0, 2.4, 7.5, Math.PI / 5, 0.65, 1.2);
    spotLight.position.set(0, (height / 2) + 1.2, 1.8);
    spotLight.target = canvasMesh;
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.0005;
    spotLight.shadow.mapSize.width = 512;
    spotLight.shadow.mapSize.height = 512;
    group.add(spotLight);

    return group;
  }

  loadArtworkTexture(url, callback) {
    if (this.loadedTextures.has(url)) {
      callback(this.loadedTextures.get(url));
      return;
    }
    this.textureLoader.load(
      url,
      (tex) => {
        tex.encoding = THREE.sRGBEncoding;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = true;
        this.loadedTextures.set(url, tex);
        callback(tex);
      },
      undefined,
      (err) => {
        console.warn('Failed to load artwork texture:', url, err);
      }
    );
  }

  createMuseumPlaque(art, artworkWidth) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 140;
    const ctx = canvas.getContext('2d');

    // Brass Plaque Gradient
    const grad = ctx.createLinearGradient(0, 0, 512, 140);
    grad.addColorStop(0, '#2b231a');
    grad.addColorStop(0.5, '#3b2f22');
    grad.addColorStop(1, '#241c14');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 140);

    // Gold Trim
    ctx.strokeStyle = '#c99a42';
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, 512 - 16, 140 - 16);

    // Plaque Typography
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px "Cormorant Garamond", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText(art.title.length > 28 ? art.title.substr(0, 26) + '...' : art.title, 256, 44);

    ctx.fillStyle = '#c99a42';
    ctx.font = '500 16px "Inter", sans-serif';
    ctx.fillText(`${art.artist} • ${art.year || 2024}`, 256, 76);

    ctx.fillStyle = '#a69888';
    ctx.font = '400 13px "Inter", sans-serif';
    ctx.fillText(`${art.medium || 'Original Work'} • Click to Inspect`, 256, 106);

    const texture = new THREE.CanvasTexture(canvas);
    texture.encoding = THREE.sRGBEncoding;

    const plaqueGeo = new THREE.PlaneGeometry(Math.min(artworkWidth * 0.75, 1.2), 0.32);
    const plaqueMat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.35,
      metalness: 0.45
    });

    return new THREE.Mesh(plaqueGeo, plaqueMat);
  }

  /* ──────────────────────────────────────────────────
     6. SCROLL NAVIGATION & CORRIDOR GLIDING SYSTEM
     ────────────────────────────────────────────────── */
  setupScrollNavigation() {
    // Desktop wheel scroll event: moves camera smoothly along the main corridor
    const onWheel = (e) => {
      // Allow standard scrolling inside the inspector side panel if open
      if (e.target && e.target.closest && e.target.closest('#artwork-inspector-panel')) {
        return;
      }

      if (this.isInspecting) return;

      // Prevent page scrolling/bouncing
      e.preventDefault();

      // Pause guided tour if active so user takes immediate natural control
      if (this.isAutoTourActive) {
        this.toggleAutoTour();
      }

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 33;
      if (e.deltaMode === 2) delta *= 100;

      // Scrolling Down (positive delta) -> walk forward deeper into museum (decrease Z)
      // Scrolling Up (negative delta) -> walk back toward entrance (increase Z)
      const scrollSensitivity = 0.0085;
      this.targetCorridorZ -= delta * scrollSensitivity;

      // Clamped strictly between entrance and the end of the museum
      this.targetCorridorZ = Math.max(this.minCorridorZ, Math.min(this.maxCorridorZ, this.targetCorridorZ));
    };

    window.addEventListener('wheel', onWheel, { passive: false });
  }

  /* ──────────────────────────────────────────────────
     7. CINEMATIC CAMERA NAVIGATION & CORRIDOR FLOW
     ────────────────────────────────────────────────── */
  goToPainting(index, immediate = false) {
    if (!this.paintingMeshes || this.paintingMeshes.length === 0) return;

    if (this.isInspecting) {
      this.closeInspection();
    }

    const total = this.paintingMeshes.length;
    this.currentPaintingIndex = (index + total) % total;
    const target = this.paintingMeshes[this.currentPaintingIndex];

    const targetZ = target.mesh.position.z;

    if (immediate) {
      this.targetCorridorZ = targetZ;
      this.currentCorridorZ = targetZ;
      this.camera.position.set(this.corridorX, this.corridorY, this.currentCorridorZ);
    } else {
      if (window.gsap) {
        gsap.to(this, {
          targetCorridorZ: targetZ,
          duration: 1.6,
          ease: 'power2.inOut'
        });
      } else {
        this.targetCorridorZ = targetZ;
      }
    }

    this.updateBottomDockUI(target);
    this.updateActiveHallChip(target.hallName);
  }

  nextPainting() {
    this.goToPainting(this.currentPaintingIndex + 1);
  }

  prevPainting() {
    this.goToPainting(this.currentPaintingIndex - 1);
  }

  goToHall(hallName) {
    const firstInHall = this.paintingMeshes.find(
      p => p.hallName.toLowerCase() === hallName.toLowerCase()
    );
    if (firstInHall) {
      if (this.isInspecting) {
        this.closeInspection();
      }
      const targetZ = firstInHall.mesh.position.z + 1.2;
      if (window.gsap) {
        gsap.to(this, {
          targetCorridorZ: targetZ,
          duration: 1.8,
          ease: 'power2.inOut'
        });
      } else {
        this.targetCorridorZ = targetZ;
      }
      this.updateActiveHallChip(hallName);
    }
  }

  syncCurrentArtworkWithCorridor() {
    if (!this.paintingMeshes || this.paintingMeshes.length === 0) return;

    let closestPainting = null;
    let minDiff = Infinity;

    for (let i = 0; i < this.paintingMeshes.length; i++) {
      const artZ = this.paintingMeshes[i].mesh.position.z;
      const diff = Math.abs(artZ - this.currentCorridorZ);
      if (diff < minDiff) {
        minDiff = diff;
        closestPainting = this.paintingMeshes[i];
      }
    }

    if (closestPainting && closestPainting.index !== this.currentPaintingIndex) {
      this.currentPaintingIndex = closestPainting.index;
      this.updateBottomDockUI(closestPainting);
      this.updateActiveHallChip(closestPainting.hallName);
    }
  }

  getNearestPainting() {
    if (!this.paintingMeshes || this.paintingMeshes.length === 0) return null;
    let nearest = null;
    let minDiff = Infinity;
    for (let i = 0; i < this.paintingMeshes.length; i++) {
      const diff = Math.abs(this.paintingMeshes[i].mesh.position.z - this.currentCorridorZ);
      if (diff < minDiff) {
        minDiff = diff;
        nearest = this.paintingMeshes[i];
      }
    }
    return nearest;
  }

  /* ──────────────────────────────────────────────────
     8. ARTWORK INSPECTION & SIDE PANEL
     ────────────────────────────────────────────────── */
  inspectArtwork(index) {
    if (!this.paintingMeshes[index]) return;
    const target = this.paintingMeshes[index];

    this.isInspecting = true;
    this.savedCorridorZ = this.currentCorridorZ;
    this.targetCorridorZ = this.currentCorridorZ; // Halt walking inertia

    // Stop auto-tour if active
    if (this.isAutoTourActive) {
      this.toggleAutoTour();
    }

    // Artwork position in world space
    const artPos = target.mesh.position;
    const isLeft = artPos.x < 0;

    // View distance from painting front-and-center
    // Left wall: artwork faces +X. Camera sits at artPos.x + 2.3
    // Right wall: artwork faces -X. Camera sits at artPos.x - 2.3
    const inspectDistance = 2.35;
    const inspectX = isLeft ? artPos.x + inspectDistance : artPos.x - inspectDistance;
    const inspectY = artPos.y;
    const inspectZ = artPos.z;

    if (window.gsap) {
      gsap.killTweensOf(this.camera.position);
      gsap.killTweensOf(this.currentLookAt);

      gsap.to(this.camera.position, {
        x: inspectX,
        y: inspectY,
        z: inspectZ,
        duration: 1.35,
        ease: 'power2.out'
      });

      gsap.to(this.currentLookAt, {
        x: artPos.x,
        y: artPos.y,
        z: artPos.z,
        duration: 1.35,
        ease: 'power2.out',
        onUpdate: () => {
          this.camera.lookAt(this.currentLookAt);
        }
      });
    } else {
      this.camera.position.set(inspectX, inspectY, inspectZ);
      this.currentLookAt.set(artPos.x, artPos.y, artPos.z);
      this.camera.lookAt(this.currentLookAt);
    }

    // Populate and open Side Panel
    this.populateSidePanel(target.artData, target.hallName);
    const panel = document.getElementById('artwork-inspector-panel');
    if (panel) panel.classList.add('open');
  }

  closeInspection() {
    const panel = document.getElementById('artwork-inspector-panel');
    if (panel) panel.classList.remove('open');

    // Stop audio narration if playing
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Return camera smoothly to the corridor center path
    const returnZ = this.savedCorridorZ;
    this.targetCorridorZ = returnZ;
    this.currentCorridorZ = returnZ;

    if (window.gsap) {
      gsap.killTweensOf(this.camera.position);
      gsap.killTweensOf(this.currentLookAt);

      gsap.to(this.camera.position, {
        x: this.corridorX,
        y: this.corridorY,
        z: returnZ,
        duration: 1.25,
        ease: 'power2.inOut'
      });

      const forwardLook = {
        x: this.corridorX,
        y: this.corridorY,
        z: returnZ - 10
      };

      gsap.to(this.currentLookAt, {
        x: forwardLook.x,
        y: forwardLook.y,
        z: forwardLook.z,
        duration: 1.25,
        ease: 'power2.inOut',
        onUpdate: () => {
          this.camera.lookAt(this.currentLookAt);
        },
        onComplete: () => {
          this.isInspecting = false;
        }
      });
    } else {
      this.camera.position.set(this.corridorX, this.corridorY, returnZ);
      this.currentLookAt.set(this.corridorX, this.corridorY, returnZ - 10);
      this.camera.lookAt(this.currentLookAt);
      this.isInspecting = false;
    }
  }

  populateSidePanel(art, hallName) {
    const panel = document.getElementById('artwork-inspector-panel');
    if (!panel) return;

    const img = (art.images && art.images[0]) || art.image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80';
    const isWishlisted = (window.AppState && window.AppState.wishlist?.includes(art.id)) || false;
    const formattedPrice = `₹${Number(art.price || 0).toLocaleString('en-IN')}`;

    document.getElementById('panel-hall-label').innerText = `${hallName} • Gallery View`;
    document.getElementById('panel-art-img').src = img;
    document.getElementById('panel-art-title').innerText = art.title;
    document.getElementById('panel-artist-avatar').src = art.artistAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80';
    document.getElementById('panel-artist-name').innerText = art.artist;
    document.getElementById('panel-artist-country').innerText = `${art.countryFlag || '🌍'} Verified Independent Artist`;
    document.getElementById('panel-art-price').innerText = formattedPrice;
    document.getElementById('panel-spec-medium').innerText = art.medium || 'Original';
    document.getElementById('panel-spec-size').innerText = art.size || 'Custom Canvas';
    document.getElementById('panel-spec-year').innerText = art.year || 2024;
    document.getElementById('panel-spec-auth').innerText = 'Physical Certificate Included';
    document.getElementById('panel-art-desc').innerText = art.description || 'A timeless original piece created by a verified independent master artist, exploring depth, light and expressive authentic emotion.';

    // Wishlist Button state
    const wishlistBtn = document.getElementById('panel-wishlist-btn');
    if (wishlistBtn) {
      wishlistBtn.classList.toggle('active', isWishlisted);
      wishlistBtn.onclick = () => this.toggleWishlist(art.id);
    }

    // Acquire / Add to cart button
    const acquireBtn = document.getElementById('panel-acquire-btn');
    if (acquireBtn) {
      acquireBtn.onclick = () => {
        this.addToCart(art);
      };
    }

    // Audio Guide button
    const audioBtn = document.getElementById('panel-audio-guide-btn');
    if (audioBtn) {
      audioBtn.onclick = () => this.toggleAudioGuideNarration(art);
    }
  }

  /* ──────────────────────────────────────────────────
     9. INTERACTION, RAYCASTING & TOUCH CONTROLS
     ────────────────────────────────────────────────── */
  setupInteraction() {
    // Click on canvas to inspect artwork
    this.container.addEventListener('click', (e) => {
      const rect = this.container.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.scene.children, true);

      for (let i = 0; i < intersects.length; i++) {
        const obj = intersects[i].object;
        if (obj.userData && obj.userData.isPainting) {
          this.inspectArtwork(obj.userData.paintingIndex);
          return;
        }
      }

      // If clicked outside paintings while inspecting, close inspection
      if (this.isInspecting) {
        this.closeInspection();
      }
    });

    // Subtle desktop mouse look parallax + hover pointer cursor
    window.addEventListener('mousemove', (e) => {
      if (this.isMobile) return;

      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      this.mouseParallax.targetX = ((e.clientX - halfW) / halfW) * 0.18;
      this.mouseParallax.targetY = ((e.clientY - halfH) / halfH) * 0.12;

      // Hover cursor raycasting
      const rect = this.container.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.scene.children, true);

      let isHoveringPainting = false;
      for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.userData?.isPainting) {
          isHoveringPainting = true;
          break;
        }
      }
      this.container.style.cursor = isHoveringPainting ? 'pointer' : 'default';
    });

    // Mobile touch look around (clamped to prevent disorientation)
    let touchStartX = 0;
    let touchStartY = 0;
    let isTouching = false;

    this.container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isTouching = true;
      }
    }, { passive: true });

    this.container.addEventListener('touchmove', (e) => {
      if (!isTouching || this.isInspecting) return;
      const diffX = e.touches[0].clientX - touchStartX;
      const diffY = e.touches[0].clientY - touchStartY;

      // Subtle look offset (clamped to prevent free flight / disorientation)
      this.mobileLookOffset.x = Math.max(-0.35, Math.min(0.35, (diffX / window.innerWidth) * 0.6));
      this.mobileLookOffset.y = Math.max(-0.2, Math.min(0.2, (diffY / window.innerHeight) * 0.35));
    }, { passive: true });

    this.container.addEventListener('touchend', () => {
      isTouching = false;
      // Smoothly spring look back to forward center
      if (window.gsap) {
        gsap.to(this.mobileLookOffset, { x: 0, y: 0, duration: 1.0, ease: 'power2.out' });
      } else {
        this.mobileLookOffset.x = 0;
        this.mobileLookOffset.y = 0;
      }
    }, { passive: true });
  }

  /* ──────────────────────────────────────────────────
     10. GUIDED AUTO TOUR (Cinematic Guided Walkthrough)
     ────────────────────────────────────────────────── */
  toggleAutoTour() {
    this.isAutoTourActive = !this.isAutoTourActive;
    const tourBtn = document.getElementById('ex-tour-btn');

    if (this.isAutoTourActive) {
      if (tourBtn) {
        tourBtn.classList.add('playing');
        tourBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          <span>Pause Tour</span>
        `;
      }
      this.showToast('Cinematic guided walkthrough started.');
    } else {
      if (tourBtn) {
        tourBtn.classList.remove('playing');
        tourBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <span>Guided Tour</span>
        `;
      }
      this.showToast('Guided tour paused.');
    }
  }

  /* ──────────────────────────────────────────────────
     11. AMBIENT AUDIO & AUDIO GUIDE NARRATION
     ────────────────────────────────────────────────── */
  setupAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn('Web Audio not supported');
    }
  }

  toggleAmbientSound() {
    if (!this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.ambientSoundActive = !this.ambientSoundActive;
    const audioBtn = document.getElementById('ex-ambient-audio-btn');

    if (this.ambientSoundActive) {
      this.startMuseumAmbientSound();
      if (audioBtn) audioBtn.classList.add('active');
      this.showToast('Ambient gallery soundscape activated.');
    } else {
      this.stopMuseumAmbientSound();
      if (audioBtn) audioBtn.classList.remove('active');
      this.showToast('Ambient sound muted.');
    }
  }

  startMuseumAmbientSound() {
    if (!this.audioCtx) return;
    try {
      this.ambientGain = this.audioCtx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.12, this.audioCtx.currentTime + 3);

      // Low soothing warm drone
      const osc1 = this.audioCtx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, this.audioCtx.currentTime); // A2

      const osc2 = this.audioCtx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(164.81, this.audioCtx.currentTime); // E3

      // Low pass filter
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.audioCtx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.audioCtx.destination);

      osc1.start();
      osc2.start();
      this.ambientOscs = [osc1, osc2];
    } catch (e) {
      console.error(e);
    }
  }

  stopMuseumAmbientSound() {
    if (this.ambientGain && this.audioCtx) {
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.8);
      setTimeout(() => {
        if (this.ambientOscs) {
          this.ambientOscs.forEach(o => o.stop());
          this.ambientOscs = null;
        }
      }, 900);
    }
  }

  toggleAudioGuideNarration(art) {
    if (!('speechSynthesis' in window)) {
      this.showToast('Audio narration not supported in this browser.');
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      document.getElementById('ex-audio-guide-card')?.classList.remove('playing');
      return;
    }

    const narrationText = `Now viewing ${art.title}, an original work created by verified artist ${art.artist} in ${art.year || 2024}. Medium: ${art.medium || 'Fine Art'}. ${art.description || 'This authentic piece is part of the Drawmadoo digital collection.'}`;

    this.audioGuideUtterance = new SpeechSynthesisUtterance(narrationText);
    this.audioGuideUtterance.rate = 0.95;
    this.audioGuideUtterance.pitch = 1.0;

    const card = document.getElementById('ex-audio-guide-card');
    if (card) card.classList.add('playing');

    this.audioGuideUtterance.onend = () => {
      if (card) card.classList.remove('playing');
    };

    window.speechSynthesis.speak(this.audioGuideUtterance);
  }

  /* ──────────────────────────────────────────────────
     12. UI UPDATES & USER CONTROLS
     ────────────────────────────────────────────────── */
  renderHeaderHallsNav() {
    const container = document.getElementById('ex-halls-nav');
    if (!container) return;

    container.innerHTML = this.halls
      .map(
        (hall, idx) => `
        <button class="ex-hall-chip ${idx === 0 ? 'active' : ''}" data-hall="${hall.name}" onclick="window.DrawmadooExhibitionInstance.goToHall('${hall.name}')">
          <span>${hall.name}</span>
          <span style="opacity:0.6; font-size:10px;">(${hall.artworks.length})</span>
        </button>
      `
      )
      .join('');
  }

  updateActiveHallChip(activeHallName) {
    document.querySelectorAll('.ex-hall-chip').forEach(chip => {
      const isMatch = chip.dataset.hall?.toLowerCase() === activeHallName?.toLowerCase();
      chip.classList.toggle('active', isMatch);
    });
  }

  updateBottomDockUI(target) {
    const titleEl = document.getElementById('ex-dock-art-title');
    const metaEl = document.getElementById('ex-dock-art-meta');
    const counterEl = document.getElementById('ex-dock-counter');

    if (titleEl) titleEl.innerText = target.artData.title;
    if (metaEl) metaEl.innerText = `${target.hallName} • By ${target.artData.artist}`;
    if (counterEl) counterEl.innerText = `${target.index + 1} of ${this.paintingMeshes.length}`;
  }

  setupKeyboardControls() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;

      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        if (!this.isInspecting) {
          this.targetCorridorZ = Math.max(this.minCorridorZ, this.targetCorridorZ - 2.2);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        if (!this.isInspecting) {
          this.targetCorridorZ = Math.min(this.maxCorridorZ, this.targetCorridorZ + 2.2);
        }
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        this.nextPainting();
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        this.prevPainting();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        this.toggleAutoTour();
      } else if (e.key === 'Escape') {
        if (this.isInspecting) this.closeInspection();
      } else if (e.key === 'm' || e.key === 'M') {
        this.toggleAmbientSound();
      } else if (e.key === '?') {
        this.toggleHelpModal();
      }
    });
  }

  enterExhibition() {
    const overlay = document.getElementById('ex-entrance-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
    }

    // Smooth cinematic forward glide into the first gallery hall
    this.currentCorridorZ = 5.5;
    this.targetCorridorZ = 1.0;

    if (window.gsap) {
      gsap.to(this, {
        currentCorridorZ: 1.0,
        targetCorridorZ: 1.0,
        duration: 2.2,
        ease: 'power3.out'
      });
    }

    // Start ambient audio if user had toggled it
    if (this.ambientSoundActive && this.audioCtx) {
      this.startMuseumAmbientSound();
    }

    this.showToast('Welcome to the Drawmadoo Virtual Art Exhibition.');
  }

  addToCart(art) {
    if (window.AppState) {
      window.AppState.cart = window.AppState.cart || [];
      window.AppState.cart.push(art);
      const cartCountEl = document.getElementById('nav-cart-counter');
      if (cartCountEl) cartCountEl.innerText = window.AppState.cart.length;
    }
    this.showToast(`“${art.title}” added to acquisition cart.`);
  }

  toggleWishlist(artId) {
    if (window.AppState) {
      window.AppState.wishlist = window.AppState.wishlist || [];
      const idx = window.AppState.wishlist.indexOf(artId);
      const btn = document.getElementById('panel-wishlist-btn');
      if (idx > -1) {
        window.AppState.wishlist.splice(idx, 1);
        if (btn) btn.classList.remove('active');
        this.showToast('Removed from saved wishlist.');
      } else {
        window.AppState.wishlist.push(artId);
        if (btn) btn.classList.add('active');
        this.showToast('Saved to your private wishlist.');
      }
    }
  }

  showToast(msg) {
    const toast = document.getElementById('ex-toast');
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  showLoader(percent, text) {
    const fill = document.getElementById('ex-loader-bar-fill');
    const txt = document.getElementById('ex-loader-text');
    if (fill) fill.style.width = `${percent}%`;
    if (txt && text) txt.innerText = text;
  }

  hideLoader() {
    const loader = document.getElementById('ex-loader-overlay');
    if (loader) loader.classList.add('fade-out');
  }

  toggleHelpModal() {
    const modal = document.getElementById('ex-help-modal');
    if (modal) modal.classList.toggle('open');
  }

  async refreshExhibitionData() {
    await this.loadDynamicData();
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
    const ambientLight = new THREE.AmbientLight(0x2d261f, 0.95);
    this.scene.add(ambientLight);
    this.buildMuseumArchitecture();
    this.renderHeaderHallsNav();
    this.goToPainting(0, true);
  }

  onWindowResize() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  /* ──────────────────────────────────────────────────
     13. RENDER LOOP & INERTIA DYNAMICS
     ────────────────────────────────────────────────── */
  animate() {
    requestAnimationFrame(() => this.animate());

    const dt = Math.min(this.clock.getDelta(), 0.1);

    // Subtle mouse parallax interpolation
    this.mouseParallax.x += (this.mouseParallax.targetX - this.mouseParallax.x) * 0.05;
    this.mouseParallax.y += (this.mouseParallax.targetY - this.mouseParallax.y) * 0.05;

    // Mobile automatic walkthrough OR desktop guided auto-tour
    const shouldAutoWalk = (this.isMobile || this.isAutoTourActive) && !this.isInspecting;
    if (shouldAutoWalk) {
      if (this.mobilePauseTimer > 0) {
        this.mobilePauseTimer -= dt;
      } else {
        const nearest = this.getNearestPainting();
        if (nearest && Math.abs(this.currentCorridorZ - nearest.mesh.position.z) < 0.35 && this.lastPausedPainting !== nearest.index) {
          this.lastPausedPainting = nearest.index;
          this.mobilePauseTimer = 2.4; // Pause briefly so viewer can admire the artwork
        } else {
          this.targetCorridorZ -= this.mobileWalkSpeed * dt;
          if (this.targetCorridorZ < this.minCorridorZ) {
            this.targetCorridorZ = this.maxCorridorZ;
            this.currentCorridorZ = this.maxCorridorZ;
            this.lastPausedPainting = -1;
          }
        }
      }
    }

    if (!this.isInspecting) {
      // Smooth inertia glide along the corridor center
      const lerpAlpha = 1.0 - Math.pow(0.002, dt);
      this.currentCorridorZ += (this.targetCorridorZ - this.currentCorridorZ) * Math.min(lerpAlpha, 0.12);

      // Strictly keep camera centered in corridor
      this.camera.position.x = this.corridorX;
      this.camera.position.y = this.corridorY;
      this.camera.position.z = this.currentCorridorZ;

      // Smooth forward lookAt with subtle clamped parallax
      const forwardDist = 10.0;
      const targetLookX = this.corridorX + (this.mouseParallax.x * 2.2) + (this.mobileLookOffset.x * 3.5);
      const targetLookY = this.corridorY - (this.mouseParallax.y * 0.8) - (this.mobileLookOffset.y * 1.8);
      const targetLookZ = this.currentCorridorZ - forwardDist;

      this.currentLookAt.x += (targetLookX - this.currentLookAt.x) * 0.08;
      this.currentLookAt.y += (targetLookY - this.currentLookAt.y) * 0.08;
      this.currentLookAt.z = targetLookZ;

      this.camera.lookAt(this.currentLookAt);

      // Keep UI synchronized with closest artwork
      this.syncCurrentArtworkWithCorridor();
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Global Singleton Initialization on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.DrawmadooExhibitionInstance = new DrawmadooExhibition();
});
