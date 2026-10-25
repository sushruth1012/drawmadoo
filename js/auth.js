/**
 * ═════════════════════════════════════════════════════════════════════
 * DRAWMADOO — Complete Authentication & Role-Based Access Engine
 * Supabase Auth Integration with Google OAuth, Email Login,
 * Role Selection Onboarding, Session Persistence, and Route Guards.
 * ═════════════════════════════════════════════════════════════════════
 */

(function (window) {
  'use strict';

  const MOCK_STORAGE_KEY = 'drawmadoo_auth_mock_session';

  const AuthService = {
    currentUser: null,
    userProfile: null,
    userRole: 'guest', // 'guest', 'customer', 'artist', 'admin'
    session: null,
    isLoading: true,
    listeners: [],

    /**
     * Initializes Authentication & Session Monitoring
     */
    async init() {
      this.isLoading = true;

      // 1. Try Supabase Auth first
      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;

      if (client) {
        try {
          const { data: { session } } = await client.auth.getSession();
          if (session && session.user) {
            await this.handleSession(session);
          } else {
            this.handleGuest();
          }

          // Listen for Supabase auth state changes
          client.auth.onAuthStateChange(async (event, newSession) => {
            if (newSession && newSession.user) {
              await this.handleSession(newSession);
            } else {
              this.handleGuest();
            }
          });
        } catch (err) {
          console.warn('[AuthService] Supabase session fetch failed, checking local state:', err);
          this.loadMockSession();
        }
      } else {
        // Fallback to local session store for development & offline resilience
        this.loadMockSession();
      }

      this.isLoading = false;
      this.injectAuthModal();
      this.updateNavbarAuthUI();
      this.checkRouteProtection();

      // Listen for global storage changes
      window.addEventListener('storage', (e) => {
        if (e.key === MOCK_STORAGE_KEY) {
          this.loadMockSession();
          this.updateNavbarAuthUI();
        }
      });
    },

    /**
     * Handle active Supabase session
     */
    async handleSession(session) {
      this.session = session;
      this.currentUser = session.user;

      // Fetch user profile from public.users table
      const profile = await this.fetchUserProfile(session.user.id, session.user.email);
      this.userProfile = profile;
      this.userRole = profile.role || 'customer';

      this.notifyListeners();
      this.updateNavbarAuthUI();

      // Check if new user needs role onboarding
      if (!profile.role_confirmed) {
        this.showOnboardingModal();
      }
    },

    /**
     * Fetch user profile from database or generate initial
     */
    async fetchUserProfile(userId, email) {
      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;

      if (client) {
        try {
          const { data, error } = await client
            .from('users')
            .select('*, artist_profiles(*)')
            .eq('id', userId)
            .single();

          if (!error && data) {
            return {
              id: data.id,
              email: data.email,
              fullName: data.full_name,
              avatarUrl: data.avatar_url,
              role: data.role,
              bio: data.bio,
              country: data.country,
              socialLinks: data.social_links,
              artistProfile: data.artist_profiles,
              role_confirmed: Boolean(data.role && data.role !== 'guest')
            };
          }
        } catch (e) {
          console.warn('[AuthService] Profile query error:', e);
        }
      }

      // Default profile structure
      return {
        id: userId,
        email: email,
        fullName: email ? email.split('@')[0] : 'Art Collector',
        avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80`,
        role: 'customer',
        role_confirmed: true
      };
    },

    /**
     * Load or restore local mock session for offline resilience
     */
    loadMockSession() {
      try {
        const saved = localStorage.getItem(MOCK_STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          this.currentUser = data.user;
          this.userProfile = data.profile;
          this.userRole = data.profile ? data.profile.role : 'customer';
          this.session = { user: data.user };
          this.notifyListeners();
          return;
        }
      } catch (e) {
        console.warn('[AuthService] Error reading mock session:', e);
      }
      this.handleGuest();
    },

    saveMockSession(user, profile) {
      try {
        localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify({ user, profile }));
      } catch (e) {}
    },

    handleGuest() {
      this.session = null;
      this.currentUser = null;
      this.userProfile = null;
      this.userRole = 'guest';
      this.notifyListeners();
      this.updateNavbarAuthUI();
    },

    /**
     * ── Authentication Methods ──
     */

    // 1. Google OAuth
    async signInWithGoogle() {
      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;

      if (client) {
        const { error } = await client.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin
          }
        });
        if (error) throw error;
        return;
      }

      // Simulated Google sign-in for offline preview
      const mockUser = {
        id: 'usr-google-' + Math.random().toString(36).substr(2, 9),
        email: 'collector.google@example.com',
        user_metadata: { full_name: 'Art Collector' }
      };
      const mockProfile = {
        id: mockUser.id,
        email: mockUser.email,
        fullName: 'Art Collector',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
        role: 'customer',
        role_confirmed: false
      };
      this.currentUser = mockUser;
      this.userProfile = mockProfile;
      this.userRole = 'customer';
      this.saveMockSession(mockUser, mockProfile);
      this.notifyListeners();
      this.updateNavbarAuthUI();
      this.closeModal();
      this.showOnboardingModal();
    },

    // 2. Email & Password Sign Up
    async signUp(email, password, fullName, selectedRole = 'customer') {
      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;

      if (client) {
        const { data, error } = await client.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              full_name: fullName.trim(),
              role: selectedRole
            }
          }
        });
        if (error) throw error;
        if (data.session) {
          await this.handleSession(data.session);
        }
        return data;
      }

      // Offline Simulated Signup
      const mockUser = {
        id: 'usr-' + Math.random().toString(36).substr(2, 9),
        email: email.trim(),
        user_metadata: { full_name: fullName.trim() }
      };
      const mockProfile = {
        id: mockUser.id,
        email: mockUser.email,
        fullName: fullName.trim() || email.split('@')[0],
        avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80`,
        role: selectedRole,
        role_confirmed: true
      };
      this.currentUser = mockUser;
      this.userProfile = mockProfile;
      this.userRole = selectedRole;
      this.saveMockSession(mockUser, mockProfile);
      this.notifyListeners();
      this.updateNavbarAuthUI();
      return { user: mockUser };
    },

    // 3. Email & Password Sign In
    async signIn(email, password) {
      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;

      if (client) {
        const { data, error } = await client.auth.signInWithPassword({
          email: email.trim(),
          password: password
        });
        if (error) throw error;
        if (data.session) {
          await this.handleSession(data.session);
        }
        return data;
      }

      // Offline Simulated Signin
      let role = 'customer';
      if (email.includes('admin')) role = 'admin';
      else if (email.includes('artist')) role = 'artist';

      const mockUser = {
        id: 'usr-' + Math.random().toString(36).substr(2, 9),
        email: email.trim()
      };
      const mockProfile = {
        id: mockUser.id,
        email: mockUser.email,
        fullName: email.split('@')[0].replace('.', ' '),
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
        role: role,
        role_confirmed: true
      };
      this.currentUser = mockUser;
      this.userProfile = mockProfile;
      this.userRole = role;
      this.saveMockSession(mockUser, mockProfile);
      this.notifyListeners();
      this.updateNavbarAuthUI();
      return { user: mockUser };
    },

    // 4. Password Reset
    async resetPassword(email) {
      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;
      if (client) {
        const { error } = await client.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/#reset-password`
        });
        if (error) throw error;
      }
      return true;
    },

    // 5. Sign Out
    async signOut() {
      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;
      if (client) {
        try {
          await client.auth.signOut();
        } catch (e) {
          console.warn('[AuthService] Supabase signOut error:', e);
        }
      }
      try {
        localStorage.removeItem(MOCK_STORAGE_KEY);
      } catch (e) {}
      this.handleGuest();
      if (window.showToast) {
        window.showToast('You have been signed out.');
      }
    },

    // 6. Role Selection Onboarding Completion
    async completeOnboardingRole(chosenRole) {
      if (!this.currentUser) return;
      const role = chosenRole === 'artist' ? 'artist' : 'customer';

      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;
      if (client) {
        try {
          await client.from('users').update({ role: role }).eq('id', this.currentUser.id);
          if (role === 'artist') {
            await client.from('artist_profiles').upsert({
              id: this.currentUser.id,
              display_name: this.userProfile?.fullName || 'New Artist'
            });
          }
        } catch (err) {
          console.warn('[AuthService] Role update error:', err);
        }
      }

      if (this.userProfile) {
        this.userProfile.role = role;
        this.userProfile.role_confirmed = true;
      }
      this.userRole = role;
      this.saveMockSession(this.currentUser, this.userProfile);
      this.notifyListeners();
      this.updateNavbarAuthUI();
      this.closeModal();

      if (window.showToast) {
        window.showToast(`Welcome to Drawmadoo as a verified ${role}!`);
      }
    },

    // Listeners for Reactive Global State
    subscribe(callback) {
      this.listeners.push(callback);
      return () => {
        this.listeners = this.listeners.filter(l => l !== callback);
      };
    },

    notifyListeners() {
      const state = {
        user: this.currentUser,
        profile: this.userProfile,
        role: this.userRole,
        isAuthenticated: Boolean(this.currentUser)
      };
      this.listeners.forEach(cb => {
        try { cb(state); } catch (e) {}
      });
      window.dispatchEvent(new CustomEvent('drawmadoo:auth_state_changed', { detail: state }));
    },

    /**
     * ── UI Integration & Modals ──
     */
    injectAuthModal() {
      if (document.getElementById('auth-modal-root')) return;

      const modalRoot = document.createElement('div');
      modalRoot.id = 'auth-modal-root';
      modalRoot.innerHTML = `
        <div class="auth-modal-backdrop" id="authModalBackdrop">
          <div class="auth-modal-card" id="authModalCard">
            <button class="auth-modal-close" id="authModalClose" aria-label="Close">✕</button>
            
            <div id="authModalContent">
              <!-- Content rendered dynamically via openModal() -->
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(modalRoot);

      document.getElementById('authModalClose').onclick = () => this.closeModal();
      document.getElementById('authModalBackdrop').onclick = (e) => {
        if (e.target.id === 'authModalBackdrop') this.closeModal();
      };
    },

    openModal(view = 'signin') {
      const backdrop = document.getElementById('authModalBackdrop');
      if (!backdrop) return;
      this.renderModalView(view);
      backdrop.classList.add('active');
    },

    closeModal() {
      const backdrop = document.getElementById('authModalBackdrop');
      if (backdrop) backdrop.classList.remove('active');
    },

    showOnboardingModal() {
      this.openModal('onboarding');
    },

    renderModalView(view) {
      const container = document.getElementById('authModalContent');
      if (!container) return;

      if (view === 'onboarding') {
        container.innerHTML = `
          <div class="auth-header">
            <div class="auth-emblem">
              <svg width="48" height="48" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="48" fill="#2B221D"/><g transform="translate(33, 67) rotate(45)"><polygon points="0,0 -3.5,-12 3.5,-12" fill="#EAD7C2"/><polygon points="0,0 -1.2,-4 1.2,-4" fill="#2B221D"/><rect x="-3.5" y="-52" width="2.2" height="40" fill="#8A5A2B"/><rect x="-1.3" y="-52" width="2.6" height="40" fill="#D4A373"/><rect x="1.3" y="-52" width="2.2" height="40" fill="#A67244"/><rect x="-3.5" y="-58" width="7" height="6.5" fill="#C19A49" rx="0.8"/></g></svg>
            </div>
            <h2 class="auth-title">Welcome to Drawmadoo</h2>
            <p class="auth-subtitle">Select how you would like to experience the marketplace.</p>
          </div>

          <div class="role-cards-grid">
            <div class="role-choice-card selected" id="roleCustomerCard" onclick="AuthService.selectOnboardingCard('customer')">
              <div class="role-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div class="role-title">Art Collector</div>
              <p class="role-desc">Discover, curate, and acquire original handmade artworks from verified artists.</p>
            </div>

            <div class="role-choice-card" id="roleArtistCard" onclick="AuthService.selectOnboardingCard('artist')">
              <div class="role-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              </div>
              <div class="role-title">Artist</div>
              <p class="role-desc">Showcase your portfolio, upload artworks, and sell to collectors worldwide.</p>
            </div>
          </div>

          <button class="btn-auth-submit" id="btnConfirmRole">Continue</button>
        `;

        let selected = 'customer';
        this.selectOnboardingCard = (role) => {
          selected = role;
          document.getElementById('roleCustomerCard').classList.toggle('selected', role === 'customer');
          document.getElementById('roleArtistCard').classList.toggle('selected', role === 'artist');
        };

        document.getElementById('btnConfirmRole').onclick = () => {
          this.completeOnboardingRole(selected);
        };
        return;
      }

      // Default: Sign In or Sign Up Tab
      const isSignup = view === 'signup';
      const isForgot = view === 'forgot';

      container.innerHTML = `
        <div class="auth-header">
          <div class="auth-emblem">
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="48" fill="#2B221D"/><g transform="translate(33, 67) rotate(45)"><polygon points="0,0 -3.5,-12 3.5,-12" fill="#EAD7C2"/><polygon points="0,0 -1.2,-4 1.2,-4" fill="#2B221D"/><rect x="-3.5" y="-52" width="2.2" height="40" fill="#8A5A2B"/><rect x="-1.3" y="-52" width="2.6" height="40" fill="#D4A373"/><rect x="1.3" y="-52" width="2.2" height="40" fill="#A67244"/><rect x="-3.5" y="-58" width="7" height="6.5" fill="#C19A49" rx="0.8"/></g></svg>
          </div>
          <h2 class="auth-title">${isForgot ? 'Reset Password' : (isSignup ? 'Create Account' : 'Welcome Back')}</h2>
          <p class="auth-subtitle">${isForgot ? 'Enter your email to receive a recovery link.' : 'Enter your credentials to access your Drawmadoo account.'}</p>
        </div>

        <div id="authAlertBox" class="auth-alert"></div>

        ${!isForgot ? `
          <div class="auth-tabs">
            <button class="auth-tab-btn ${!isSignup ? 'active' : ''}" onclick="AuthService.renderModalView('signin')">Sign In</button>
            <button class="auth-tab-btn ${isSignup ? 'active' : ''}" onclick="AuthService.renderModalView('signup')">Sign Up</button>
          </div>

          <button class="btn-google" id="btnGoogleAuth">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
            <span>Continue with Google</span>
          </button>

          <div class="auth-divider"><span>or with email</span></div>
        ` : ''}

        <form id="authForm" onsubmit="return false;">
          ${isSignup ? `
            <div class="auth-form-group">
              <label class="auth-label">Full Name</label>
              <input type="text" class="auth-input" id="authFullName" placeholder="e.g. Maya Sharma" required autocomplete="name">
            </div>
            <div class="auth-form-group">
              <label class="auth-label">I want to join as</label>
              <select class="auth-input" id="authSignupRole">
                <option value="customer">Art Collector (Buy & Collect Art)</option>
                <option value="artist">Artist (Sell & Showcase Art)</option>
              </select>
            </div>
          ` : ''}

          <div class="auth-form-group">
            <label class="auth-label">Email Address</label>
            <input type="email" class="auth-input" id="authEmail" placeholder="you@domain.com" required autocomplete="email">
          </div>

          ${!isForgot ? `
            <div class="auth-form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label class="auth-label" style="margin-bottom: 0;">Password</label>
                ${!isSignup ? `<a onclick="AuthService.renderModalView('forgot')" style="font-size: 11px; color: #665A52; cursor: pointer; text-decoration: underline;">Forgot?</a>` : ''}
              </div>
              <div class="auth-input-wrap">
                <input type="password" class="auth-input" id="authPassword" placeholder="••••••••" required autocomplete="${isSignup ? 'new-password' : 'current-password'}">
                <button type="button" class="auth-password-toggle" onclick="AuthService.togglePasswordVisibility('authPassword', this)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
            </div>
          ` : ''}

          <button type="submit" class="btn-auth-submit" id="btnAuthSubmit">
            ${isForgot ? 'Send Reset Link' : (isSignup ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div class="auth-footer-links">
          ${isForgot ? `
            Remembered your password? <a onclick="AuthService.renderModalView('signin')">Sign In</a>
          ` : (isSignup ? `
            Already have an account? <a onclick="AuthService.renderModalView('signin')">Sign In</a>
          ` : `
            Don't have an account? <a onclick="AuthService.renderModalView('signup')">Create one free</a>
          `)}
        </div>
      `;

      // Event handlers
      const googleBtn = document.getElementById('btnGoogleAuth');
      if (googleBtn) {
        googleBtn.onclick = () => this.signInWithGoogle();
      }

      const form = document.getElementById('authForm');
      form.onsubmit = async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('btnAuthSubmit');
        const alertBox = document.getElementById('authAlertBox');
        const email = document.getElementById('authEmail').value;

        alertBox.className = 'auth-alert';
        alertBox.style.display = 'none';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Please wait...';

        try {
          if (isForgot) {
            await this.resetPassword(email);
            alertBox.className = 'auth-alert success';
            alertBox.textContent = 'Password reset instructions have been sent to your email.';
            submitBtn.textContent = 'Email Sent';
          } else if (isSignup) {
            const fullName = document.getElementById('authFullName').value;
            const password = document.getElementById('authPassword').value;
            const role = document.getElementById('authSignupRole').value;
            await this.signUp(email, password, fullName, role);
            this.closeModal();
            if (window.showToast) window.showToast(`Welcome to Drawmadoo, ${fullName}!`);
          } else {
            const password = document.getElementById('authPassword').value;
            await this.signIn(email, password);
            this.closeModal();
            if (window.showToast) window.showToast('Signed in successfully.');
          }
        } catch (err) {
          alertBox.className = 'auth-alert error';
          alertBox.textContent = err.message || 'Authentication error. Please check your credentials.';
          submitBtn.disabled = false;
          submitBtn.textContent = isForgot ? 'Send Reset Link' : (isSignup ? 'Create Account' : 'Sign In');
        }
      };
    },

    togglePasswordVisibility(inputId, btn) {
      const input = document.getElementById(inputId);
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        btn.style.color = '#2B221D';
      } else {
        input.type = 'password';
        btn.style.color = '#9E9388';
      }
    },

    /**
     * ── Navbar Profile / User Avatar State ──
     */
    updateNavbarAuthUI() {
      // Find all profile / auth action buttons in navbars
      const profileBtns = document.querySelectorAll('.nav-action-btn[data-action="profile"], #nav-profile-btn, .mobile-profile-btn');

      profileBtns.forEach(btn => {
        if (!this.currentUser) {
          // Logged Out State: opens Auth modal
          btn.onclick = (e) => {
            e.preventDefault();
            this.openModal('signin');
          };
          btn.title = 'Sign In';
          btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
        } else {
          // Logged In State: renders Avatar + Dropdown toggle
          btn.title = this.userProfile?.fullName || 'My Account';
          const avatarUrl = this.userProfile?.avatarUrl;
          const initials = (this.userProfile?.fullName || this.currentUser.email || 'U').charAt(0).toUpperCase();

          btn.innerHTML = avatarUrl ? 
            `<img src="${avatarUrl}" alt="Avatar" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover;">` :
            `<div style="width: 28px; height: 28px; border-radius: 50%; background: #2B221D; color: #FFF; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center;">${initials}</div>`;

          btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleUserDropdown(btn);
          };
        }
      });

      // Also update admin panel header user button if present
      const adminHeaderBtn = document.querySelector('.header-user-btn');
      if (adminHeaderBtn && this.currentUser) {
        const avatarImg = adminHeaderBtn.querySelector('.header-user-avatar');
        const nameSpan = adminHeaderBtn.querySelector('.header-user-name');
        if (avatarImg && this.userProfile?.avatarUrl) avatarImg.src = this.userProfile.avatarUrl;
        if (nameSpan) nameSpan.textContent = this.userProfile?.fullName || (this.currentUser.email ? this.currentUser.email.split('@')[0] : 'Admin');
      }
    },

    toggleUserDropdown(anchorBtn) {
      let dropdown = document.getElementById('userNavbarDropdown');
      if (dropdown && dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
        return;
      }

      if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.id = 'userNavbarDropdown';
        dropdown.className = 'user-dropdown-menu';
        document.body.appendChild(dropdown);

        // Click outside closes dropdown
        document.addEventListener('click', (e) => {
          if (!dropdown.contains(e.target) && e.target !== anchorBtn && !anchorBtn.contains(e.target)) {
            dropdown.classList.remove('active');
          }
        });
      }

      const rect = anchorBtn.getBoundingClientRect();
      dropdown.style.top = `${rect.bottom + window.scrollY + 8}px`;
      dropdown.style.right = `${window.innerWidth - rect.right}px`;
      dropdown.style.left = 'auto';

      const isInAdmin = window.location.pathname.toLowerCase().includes('/admin');
      const rootPrefix = isInAdmin ? '../' : './';
      const adminPrefix = isInAdmin ? './' : 'admin/';

      const role = this.userRole;
      const isArtist = role === 'artist' || role === 'admin';
      const isAdmin = role === 'admin';

      dropdown.innerHTML = `
        <div class="user-dropdown-header">
          <div class="user-dropdown-name">${this.userProfile?.fullName || 'Collector'}</div>
          <div class="user-dropdown-email">${this.currentUser?.email || ''}</div>
          <div style="margin-top: 6px;">
            <span class="user-role-badge ${role}">${role.toUpperCase()}</span>
          </div>
        </div>

        ${isAdmin ? `
          <a href="${adminPrefix}index.html" class="user-dropdown-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
            <span>Admin Management</span>
          </a>
        ` : ''}

        ${isArtist ? `
          <a href="${adminPrefix}index.html#artworks" class="user-dropdown-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
            <span>Artist Studio / Upload</span>
          </a>
        ` : ''}

        <a href="${rootPrefix}explore.html" class="user-dropdown-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/></svg>
          <span>Explore Gallery</span>
        </a>

        <a href="${rootPrefix}exhibition.html" class="user-dropdown-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
          <span>Virtual Exhibition</span>
        </a>

        <button class="user-dropdown-item logout" onclick="AuthService.signOut(); document.getElementById('userNavbarDropdown').classList.remove('active');">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          <span>Sign Out</span>
        </button>
      `;

      dropdown.classList.add('active');
    },

    /**
     * ── Route Protection ──
     */
    checkRouteProtection() {
      const path = window.location.pathname.toLowerCase();

      // Protected admin paths
      if (path.includes('/admin') || path.includes('/admin/')) {
        if (!this.currentUser) {
          console.warn('[RouteGuard] Guest attempting admin route');
          // In admin/index.html, we handle access control smoothly
        } else if (this.userRole !== 'admin' && this.userRole !== 'artist') {
          console.warn('[RouteGuard] Non-admin attempting admin dashboard');
        }
      }
    }
  };

  // Expose globally
  window.AuthService = AuthService;

  // Initialize on script load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AuthService.init());
  } else {
    AuthService.init();
  }
})(window);
