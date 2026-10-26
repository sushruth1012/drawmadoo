/**
 * ═════════════════════════════════════════════════════════════════════
 * DRAWMADOO — Production Artist Registration Service
 * 
 * Manages artist onboarding, validation, Supabase Storage uploads,
 * database persistence (public.artist_profiles & public.users),
 * real-time loading feedback, and verified approval tracking.
 * ═════════════════════════════════════════════════════════════════════
 */

(function (window) {
  'use strict';

  const ArtistRegistrationService = {
    selectedFile: null,
    currentUser: null,
    isSubmitting: false,

    /**
     * Initializes the registration page and listeners
     */
    async init() {
      this.bindEvents();
      await this.checkExistingAuth();
    },

    /**
     * Bind form, upload dropzone, and input validation events
     */
    bindEvents() {
      const form = document.getElementById('artist-application-form');
      if (form) {
        form.addEventListener('submit', (e) => this.handleSubmit(e));
      }

      // Drag and drop photo upload zone
      const dropZone = document.getElementById('artist-upload-zone');
      const fileInput = document.getElementById('artist-profile-photo');
      const removeBtn = document.getElementById('preview-remove-btn');

      if (dropZone && fileInput) {
        // Click dropzone triggers file input
        dropZone.addEventListener('click', (e) => {
          if (e.target.closest('#upload-preview-container') || e.target.closest('#preview-remove-btn')) {
            return;
          }
          fileInput.click();
        });

        // Dragover & Dragenter
        ['dragenter', 'dragover'].forEach(eventName => {
          dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.add('dragover');
          });
        });

        // Dragleave & Drop
        ['dragleave', 'drop'].forEach(eventName => {
          dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.remove('dragover');
          });
        });

        dropZone.addEventListener('drop', (e) => {
          const files = e.dataTransfer && e.dataTransfer.files;
          if (files && files.length > 0) {
            this.handleFileSelected(files[0]);
          }
        });

        fileInput.addEventListener('change', (e) => {
          if (e.target.files && e.target.files.length > 0) {
            this.handleFileSelected(e.target.files[0]);
          }
        });
      }

      if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.clearSelectedFile();
        });
      }

      // Clear field errors dynamically on user input
      const inputs = document.querySelectorAll('.artist-text-input, .artist-textarea, .artist-select');
      inputs.forEach(input => {
        input.addEventListener('input', () => {
          input.classList.remove('field-error');
          const errorMsg = document.getElementById(`${input.id}-error`);
          if (errorMsg) errorMsg.classList.remove('visible');
        });
      });

      // Clear specialty error on checkbox change
      const specialtyCheckboxes = document.querySelectorAll('input[name="specialties"]');
      specialtyCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
          const specError = document.getElementById('specialties-error');
          if (specError) specError.classList.remove('visible');
        });
      });
    },

    /**
     * Detects existing Supabase session and updates UI accordingly
     */
    async checkExistingAuth() {
      const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;
      if (!client) return;

      try {
        const { data: { session } } = await client.auth.getSession();
        if (session && session.user) {
          this.currentUser = session.user;
          this.renderAuthenticatedUserUI(session.user);
          await this.checkExistingApplication(client, session.user.id);
        }
      } catch (err) {
        console.warn('[ArtistRegistration] Auth check error:', err);
      }
    },

    /**
     * Renders user info if already signed in
     */
    renderAuthenticatedUserUI(user) {
      const loggedInNotice = document.getElementById('authenticated-user-banner');
      const fullNameInput = document.getElementById('applicant-fullname');
      const emailInput = document.getElementById('applicant-email');
      const passwordGroup = document.getElementById('password-field-group');

      if (fullNameInput && (user.user_metadata?.full_name || user.user_metadata?.name)) {
        fullNameInput.value = user.user_metadata.full_name || user.user_metadata.name;
      }
      if (emailInput && user.email) {
        emailInput.value = user.email;
        emailInput.disabled = true;
        emailInput.style.backgroundColor = 'rgba(44, 39, 35, 0.04)';
      }
      if (passwordGroup) {
        passwordGroup.style.display = 'none';
      }
      if (loggedInNotice) {
        loggedInNotice.style.display = 'flex';
        const userEmailSpan = document.getElementById('logged-in-email-display');
        if (userEmailSpan) userEmailSpan.textContent = user.email;
      }
    },

    /**
     * Checks if current user has already submitted an artist application
     */
    async checkExistingApplication(client, userId) {
      try {
        const { data, error } = await client
          .from('artist_profiles')
          .select('id, display_name, verification_status, artist_bio, portfolio_description, cover_image_url, specialties')
          .eq('id', userId)
          .maybeSingle();

        if (data && !error) {
          if (data.verification_status === 'pending') {
            this.showSuccessScreen({
              id: data.id,
              displayName: data.display_name,
              verificationStatus: 'pending',
              specialties: data.specialties || [],
              isExisting: true
            });
          } else if (data.verification_status === 'verified') {
            const formCard = document.getElementById('artist-form-card');
            const verifiedBanner = document.getElementById('already-verified-banner');
            if (formCard) formCard.style.display = 'none';
            if (verifiedBanner) verifiedBanner.style.display = 'block';
          }
        }
      } catch (err) {
        console.warn('[ArtistRegistration] Existing application query error:', err);
      }
    },

    /**
     * Handles file selection for artist profile picture
     */
    handleFileSelected(file) {
      const errorMsg = document.getElementById('profile-photo-error');
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        this.showFieldError('profile-photo', 'Please upload a valid image file (JPG, PNG, or WebP).');
        return;
      }

      // Validate size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        this.showFieldError('profile-photo', 'Image file size must be less than 10MB.');
        return;
      }

      if (errorMsg) errorMsg.classList.remove('visible');
      this.selectedFile = file;

      // Update upload preview UI
      const previewContainer = document.getElementById('upload-preview-container');
      const previewThumb = document.getElementById('preview-thumb-img');
      const filenameEl = document.getElementById('preview-filename');
      const filesizeEl = document.getElementById('preview-filesize');
      const uploadPlaceholder = document.getElementById('upload-prompt-content');

      if (filenameEl) filenameEl.textContent = file.name;
      if (filesizeEl) filesizeEl.textContent = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

      const reader = new FileReader();
      reader.onload = (e) => {
        if (previewThumb) previewThumb.src = e.target.result;
        if (previewContainer) previewContainer.classList.add('active');
        if (uploadPlaceholder) uploadPlaceholder.style.display = 'none';
      };
      reader.readAsDataURL(file);
    },

    /**
     * Clears selected profile photo
     */
    clearSelectedFile() {
      this.selectedFile = null;
      const fileInput = document.getElementById('artist-profile-photo');
      if (fileInput) fileInput.value = '';

      const previewContainer = document.getElementById('upload-preview-container');
      const uploadPlaceholder = document.getElementById('upload-prompt-content');
      if (previewContainer) previewContainer.classList.remove('active');
      if (uploadPlaceholder) uploadPlaceholder.style.display = 'block';
    },

    /**
     * Field validation logic
     */
    validateForm() {
      let isValid = true;
      this.hideErrorBanner();

      const fullName = (document.getElementById('applicant-fullname')?.value || '').trim();
      const email = (document.getElementById('applicant-email')?.value || '').trim();
      const password = document.getElementById('applicant-password')?.value || '';
      const displayName = (document.getElementById('artist-display-name')?.value || '').trim();
      const country = (document.getElementById('artist-country')?.value || '').trim();
      const artistBio = (document.getElementById('artist-bio')?.value || '').trim();
      const portfolioDesc = (document.getElementById('portfolio-description')?.value || '').trim();
      const specialtyBoxes = document.querySelectorAll('input[name="specialties"]:checked');

      // 1. Full Name
      if (fullName.length < 2) {
        this.showFieldError('applicant-fullname', 'Please enter your full legal name (minimum 2 characters).');
        isValid = false;
      }

      // 2. Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        this.showFieldError('applicant-email', 'Please provide a valid email address.');
        isValid = false;
      }

      // 3. Password (only required if not already authenticated)
      if (!this.currentUser && password.length < 6) {
        this.showFieldError('applicant-password', 'Password must be at least 6 characters long.');
        isValid = false;
      }

      // 4. Artist Display Name
      if (displayName.length < 2) {
        this.showFieldError('artist-display-name', 'Please enter your professional artist signature name.');
        isValid = false;
      }

      // 5. Country
      if (!country) {
        this.showFieldError('artist-country', 'Please select your country of residence.');
        isValid = false;
      }

      // 6. Specialties (at least one)
      if (specialtyBoxes.length === 0) {
        const specError = document.getElementById('specialties-error');
        if (specError) {
          specError.textContent = 'Please select at least one artistic specialty.';
          specError.classList.add('visible');
        }
        isValid = false;
      }

      // 7. Profile Photo
      if (!this.selectedFile) {
        this.showFieldError('profile-photo', 'Please upload a professional artist portrait or atelier photograph.');
        isValid = false;
      }

      // 8. Artist Bio
      if (artistBio.length < 25) {
        this.showFieldError('artist-bio', 'Please share a brief artist statement (minimum 25 characters).');
        isValid = false;
      }

      // 9. Portfolio Description
      if (portfolioDesc.length < 25) {
        this.showFieldError('portfolio-description', 'Please describe your artwork experience or notable exhibitions (minimum 25 characters).');
        isValid = false;
      }

      return isValid;
    },

    showFieldError(fieldId, message) {
      const input = document.getElementById(fieldId);
      if (input) input.classList.add('field-error');
      const errorMsg = document.getElementById(`${fieldId}-error`);
      if (errorMsg) {
        errorMsg.textContent = message;
        errorMsg.classList.add('visible');
      }
    },

    /**
     * Helper to upload image to Supabase Storage with bucket resiliency
     */
    async uploadProfilePhoto(client, userId, file) {
      const fileExt = file.name.split('.').pop().toLowerCase() || 'jpg';
      const storageFilePath = `artists/${userId}-${Date.now()}.${fileExt}`;

      // Optimize image before upload
      const optimized = (window.DrawmadooSupabase && typeof window.DrawmadooSupabase.optimizeImage === 'function')
        ? await window.DrawmadooSupabase.optimizeImage(file, 800)
        : file;

      // Primary bucket: 'avatars', Secondary fallback: 'artworks'
      const bucketsToTry = ['avatars', 'artworks'];
      let lastError = null;

      for (const bucket of bucketsToTry) {
        try {
          const { data: uploadData, error: uploadError } = await client.storage
            .from(bucket)
            .upload(storageFilePath, optimized, {
              cacheControl: '3600',
              upsert: true
            });

          if (!uploadError && uploadData) {
            const { data: urlData } = client.storage
              .from(bucket)
              .getPublicUrl(uploadData.path || storageFilePath);

            if (urlData && urlData.publicUrl) {
              return urlData.publicUrl;
            }
          } else if (uploadError) {
            lastError = uploadError;
            console.warn(`[ArtistRegistration] Storage upload to "${bucket}" bucket failed:`, uploadError);
          }
        } catch (err) {
          lastError = err;
          console.warn(`[ArtistRegistration] Storage exception on "${bucket}":`, err);
        }
      }

      // If both buckets fail, check if it's Bucket not found
      const errMsg = lastError?.message || '';
      if (errMsg.toLowerCase().includes('bucket not found') || errMsg.toLowerCase().includes('nosuchbucket')) {
        throw new Error("Supabase Storage bucket 'avatars' not found. Please run 'supabase/fix_artist_permissions.sql' in your Supabase SQL Editor to initialize the storage bucket.");
      }

      throw new Error(`Failed to upload profile photo to Supabase Storage: ${lastError?.message || 'Storage error'}`);
    },

    /**
     * Submit form application
     */
    async handleSubmit(e) {
      e.preventDefault();
      if (this.isSubmitting) return;

      if (!this.validateForm()) {
        const firstError = document.querySelector('.field-error-msg.visible');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      this.isSubmitting = true;
      this.showLoadingModal('Initializing artist application...');

      try {
        const client = window.DrawmadooSupabase ? window.DrawmadooSupabase.getClient() : null;
        if (!client) {
          throw new Error('Supabase client connection failed. Please ensure network connectivity and try again.');
        }

        // Collect Form Data
        const fullName = document.getElementById('applicant-fullname').value.trim();
        const email = document.getElementById('applicant-email').value.trim();
        const password = document.getElementById('applicant-password')?.value || '';
        const displayName = document.getElementById('artist-display-name').value.trim();
        const country = document.getElementById('artist-country').value.trim();
        const artistBio = document.getElementById('artist-bio').value.trim();
        const portfolioDesc = document.getElementById('portfolio-description').value.trim();
        const websiteUrl = (document.getElementById('artist-website')?.value || '').trim();
        const instagramHandle = (document.getElementById('artist-instagram')?.value || '').trim();

        const selectedSpecialties = Array.from(
          document.querySelectorAll('input[name="specialties"]:checked')
        ).map(cb => cb.value);

        const socialLinks = {};
        if (websiteUrl) socialLinks.website = websiteUrl;
        if (instagramHandle) socialLinks.instagram = instagramHandle;

        // Step 1: Authentication / Session Assurance
        this.updateLoadingStep('Authenticating artist credentials...');
        let userId = this.currentUser ? this.currentUser.id : null;

        if (!userId) {
          // Attempt sign up
          const { data: signUpData, error: signUpError } = await client.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                full_name: fullName,
                role: 'artist'
              }
            }
          });

          if (signUpError) {
            // If already registered, attempt to log in with provided credentials
            if (signUpError.message && signUpError.message.toLowerCase().includes('already registered')) {
              this.updateLoadingStep('Signing into existing account...');
              const { data: signInData, error: signInError } = await client.auth.signInWithPassword({
                email: email,
                password: password
              });
              if (signInError) {
                throw new Error('This email is already registered. Please provide the correct password for your account, or sign in first.');
              }
              userId = signInData.user.id;
              this.currentUser = signInData.user;
            } else {
              throw new Error(`Authentication error: ${signUpError.message}`);
            }
          } else {
            userId = signUpData.user ? signUpData.user.id : null;
            this.currentUser = signUpData.user;
            if (signUpData.session) {
              await client.auth.setSession(signUpData.session);
            }
          }
        }

        if (!userId) {
          throw new Error('Unable to establish verified user identity. Please try signing in first.');
        }

        // Step 2: Storage Upload (Avatars bucket)
        this.updateLoadingStep('Uploading profile photograph to Supabase Storage...');
        const publicAvatarUrl = await this.uploadProfilePhoto(client, userId, this.selectedFile);

        if (!publicAvatarUrl) {
          throw new Error('Storage returned an invalid image URL. Please re-upload your photograph.');
        }

        // Step 3: Upsert public.users record
        this.updateLoadingStep('Updating user record and permissions...');
        const { error: userUpdateError } = await client
          .from('users')
          .upsert({
            id: userId,
            email: email,
            full_name: fullName,
            country: country,
            bio: artistBio,
            avatar_url: publicAvatarUrl,
            role: 'artist',
            social_links: socialLinks,
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' });

        if (userUpdateError) {
          console.warn('[ArtistRegistration] Non-fatal user table notice:', userUpdateError);
        }

        // Step 4: Upsert public.artist_profiles record
        // STRICT REQUIREMENT 9: The submitted artist should remain in "Pending" status until approved by an admin
        this.updateLoadingStep('Submitting artist portfolio to curation registry...');
        const { data: artistRecord, error: artistError } = await client
          .from('artist_profiles')
          .upsert({
            id: userId,
            display_name: displayName,
            artist_bio: artistBio,
            portfolio_description: portfolioDesc,
            verification_status: 'pending', // strict pending status
            cover_image_url: publicAvatarUrl,
            specialties: selectedSpecialties,
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' })
          .select()
          .single();

        // STRICT REQUIREMENT 7: Do not create fake success messages.
        // Only show success after Supabase confirms the record has been created.
        if (artistError) {
          throw new Error(`Database error saving artist profile: ${artistError.message}`);
        }

        if (!artistRecord || !artistRecord.id) {
          throw new Error('Supabase did not return confirmed record data. Please contact support.');
        }

        // Optional notification entry for the user
        try {
          await client.from('notifications').insert({
            user_id: userId,
            title: 'Artist Application Submitted',
            message: 'Your artist application has been submitted successfully and is currently under review by our curation team.',
            type: 'verification'
          });
        } catch (notifErr) {
          // notification failure is non-blocking
        }

        // Step 5: Success Display
        this.hideLoadingModal();
        this.showSuccessScreen({
          id: artistRecord.id,
          displayName: artistRecord.display_name,
          verificationStatus: artistRecord.verification_status,
          specialties: artistRecord.specialties,
          isExisting: false
        });

      } catch (err) {
        console.error('[ArtistRegistration] Application submission failed:', err);
        this.hideLoadingModal();
        this.showErrorBanner(err.message || 'An unexpected error occurred during submission. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    },

    /**
     * UI Helpers for Loading Overlay
     */
    showLoadingModal(initialStep) {
      const overlay = document.getElementById('artist-loading-overlay');
      const stepText = document.getElementById('artist-loading-step-text');
      if (stepText) stepText.textContent = initialStep;
      if (overlay) overlay.classList.add('active');
    },

    updateLoadingStep(stepMessage) {
      const stepText = document.getElementById('artist-loading-step-text');
      if (stepText) stepText.textContent = stepMessage;
    },

    hideLoadingModal() {
      const overlay = document.getElementById('artist-loading-overlay');
      if (overlay) overlay.classList.remove('active');
    },

    /**
     * Error Banner management
     */
    showErrorBanner(message) {
      const banner = document.getElementById('artist-error-banner');
      const messageEl = document.getElementById('artist-error-message-text');
      if (messageEl) messageEl.textContent = message;
      if (banner) {
        banner.classList.add('visible');
        banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },

    hideErrorBanner() {
      const banner = document.getElementById('artist-error-banner');
      if (banner) banner.classList.remove('visible');
    },

    /**
     * Premium Success Screen
     * Exact required text:
     * "Your artist application has been submitted successfully. Our team will review your portfolio and notify you once your account is approved."
     */
    showSuccessScreen(info) {
      const formCard = document.getElementById('artist-form-card');
      const perksStrip = document.getElementById('artist-perks-strip');
      const successScreen = document.getElementById('artist-success-screen');

      if (formCard) formCard.style.display = 'none';
      if (perksStrip) perksStrip.style.display = 'none';

      // Update success details
      const idEl = document.getElementById('success-app-id');
      const nameEl = document.getElementById('success-artist-name');
      const specialtiesEl = document.getElementById('success-artist-specialties');
      const dateEl = document.getElementById('success-submitted-date');

      if (idEl) idEl.textContent = `DM-ART-${(info.id || '').slice(0, 8).toUpperCase()}`;
      if (nameEl) nameEl.textContent = info.displayName || 'Distinguished Artist';
      if (specialtiesEl && info.specialties && info.specialties.length > 0) {
        specialtiesEl.textContent = info.specialties.join(' • ');
      }
      if (dateEl) {
        const now = new Date();
        dateEl.textContent = now.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }

      if (successScreen) {
        successScreen.classList.add('active');
        successScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  window.ArtistRegistrationService = ArtistRegistrationService;

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ArtistRegistrationService.init());
  } else {
    ArtistRegistrationService.init();
  }
})(window);
