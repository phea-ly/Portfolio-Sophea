/* =============================================
   SOPHEA SOPHORN — Portfolio JavaScript
   File: js/main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     1. SCROLL PROGRESS BAR
  ------------------------------------------ */
  const scrollProgress = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const scrollTop    = window.scrollY;
    const docHeight    = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  });


  /* ------------------------------------------
     2. MOBILE NAV TOGGLE
  ------------------------------------------ */
  const navToggle  = document.getElementById('navToggle');
  const navLinks   = document.querySelector('.nav-links');
  const navAnchors = document.querySelectorAll('.nav-links a');

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function openNav() {
    navToggle.classList.add('open');
    navLinks.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Close nav when clicking overlay
  overlay.addEventListener('click', closeNav);

  // Close nav when a link is clicked
  navAnchors.forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  // Close nav on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeNav();
    }
  });


  /* ------------------------------------------
     3. ACTIVE NAV LINK ON SCROLL
  ------------------------------------------ */
  const sections  = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    let current = '';
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 140) {
        current = sec.id;
      }
    });

    navAnchors.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Run once on load


  /* ------------------------------------------
     4. EXPERIENCE TIMELINE — SCROLL REVEAL
  ------------------------------------------ */
  const expItems = document.querySelectorAll('.exp-item');

  const expObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  expItems.forEach((item) => expObserver.observe(item));


  /* ------------------------------------------
     5. LANGUAGE BAR ANIMATION
  ------------------------------------------ */
  const aboutCard = document.querySelector('.about-card');

  const langObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.lang-fill');
          bars.forEach((bar) => {
            bar.style.width = bar.dataset.width;
          });
          // Disconnect after firing once
          langObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  if (aboutCard) langObserver.observe(aboutCard);


  /* ------------------------------------------
     6. SMOOTH SCROLL FOR NAV LINKS
  ------------------------------------------ */
  navAnchors.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });


  /* ------------------------------------------
     7. CARD SCROLL REVEAL (generic)
  ------------------------------------------ */
  const revealCards = document.querySelectorAll(
    '.skill-card, .edu-card, .ref-card, .interest-card'
  );

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger each card slightly
          setTimeout(() => {
            entry.target.style.opacity  = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 60);
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealCards.forEach((card) => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.25s, box-shadow 0.25s, background 0.3s';
    cardObserver.observe(card);
  });


  /* ------------------------------------------
     8. GALLERY LIGHTBOX
  ------------------------------------------ */
  const galleryGrids = document.querySelectorAll('.edu-gallery-grid');

  if (galleryGrids.length > 0) {
    // Build lightbox DOM
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';

    const closeBtn = document.createElement('div');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    lightbox.appendChild(closeBtn);

    const navPrev = document.createElement('div');
    navPrev.className = 'lightbox-nav prev';
    navPrev.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
    lightbox.appendChild(navPrev);

    const navNext = document.createElement('div');
    navNext.className = 'lightbox-nav next';
    navNext.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
    lightbox.appendChild(navNext);

    const img = document.createElement('img');
    img.className = 'lightbox-img';
    img.alt = 'Gallery image';
    img.onerror = function() {
      this.style.display = 'none';
      const existing = this.parentNode?.querySelector('.lightbox-placeholder');
      if (!existing) {
        const placeholder = document.createElement('div');
        placeholder.className = 'lightbox-placeholder';
        placeholder.textContent = 'Could not load image';
        if (this.parentNode) this.parentNode.appendChild(placeholder);
      }
    };
    lightbox.appendChild(img);

    const counter = document.createElement('div');
    counter.className = 'lightbox-counter';
    lightbox.appendChild(counter);

    document.body.appendChild(lightbox);

    let currentIndex = 0;

    function getVisibleItems() {
      return [...document.querySelectorAll('.edu-gallery-item:not(.edu-add-more)')].filter(
        (el) => window.getComputedStyle(el).display !== 'none'
      );
    }

    function resetLightboxImage() {
      img.style.display = '';
      const placeholder = lightbox.querySelector('.lightbox-placeholder');
      if (placeholder) placeholder.remove();
    }

    function loadImage(src, alt) {
      resetLightboxImage();
      img.src = src;
      img.alt = alt || 'Gallery image';
    }

    function openLightbox(index) {
      const items = getVisibleItems();
      if (items.length === 0) return;
      currentIndex = Math.max(0, Math.min(index, items.length - 1));
      loadImage(items[currentIndex].querySelector('img')?.src || items[currentIndex].dataset.full, items[currentIndex].querySelector('img')?.alt);
      counter.textContent = `${currentIndex + 1} / ${items.length}`;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function prevImage() {
      const items = getVisibleItems();
      if (items.length === 0) return;
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      loadImage(items[currentIndex].querySelector('img')?.src || items[currentIndex].dataset.full, items[currentIndex].querySelector('img')?.alt);
      counter.textContent = `${currentIndex + 1} / ${items.length}`;
    }

    function nextImage() {
      const items = getVisibleItems();
      if (items.length === 0) return;
      currentIndex = (currentIndex + 1) % items.length;
      loadImage(items[currentIndex].querySelector('img')?.src || items[currentIndex].dataset.full, items[currentIndex].querySelector('img')?.alt);
      counter.textContent = `${currentIndex + 1} / ${items.length}`;
    }

    // Nav buttons
    closeBtn.addEventListener('click', closeLightbox);
    navPrev.addEventListener('click', prevImage);
    navNext.addEventListener('click', nextImage);

    // Click outside image to close
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    });

    // Click to open (delegate via event listener on document for dynamically added items)
    document.addEventListener('click', (e) => {
      // Ignore clicks on delete buttons
      if (e.target.closest('.edu-delete-btn')) return;
      const item = e.target.closest('.edu-gallery-item:not(.edu-add-more)');
      if (item) {
        const items = getVisibleItems();
        const idx = items.indexOf(item);
        if (idx >= 0) openLightbox(idx);
      }
    });
  }


  /* ------------------------------------------
     9. ADMIN MODE — protect delete buttons
        Secret: press Ctrl+Shift+E to toggle
  ------------------------------------------ */
  let adminMode = false;

  // Create edit-mode indicators inside each gallery
  document.querySelectorAll('.edu-gallery').forEach((gallery) => {
    const indicator = document.createElement('div');
    indicator.className = 'edu-edit-indicator';
    indicator.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg> Edit mode — delete visible';
    gallery.insertBefore(indicator, gallery.querySelector('.edu-gallery-grid'));
  });

  function setAdminMode(enabled) {
    adminMode = enabled;
    document.querySelectorAll('.edu-gallery-grid').forEach((grid) => {
      grid.classList.toggle('gallery-editing', enabled);
    });
    document.querySelectorAll('.edu-edit-indicator').forEach((ind) => {
      ind.classList.toggle('active', enabled);
    });
  }

  // Press Ctrl+Shift+E to toggle admin mode
  document.addEventListener('keydown', (e) => {
    if (e.key === 'E' && e.ctrlKey && e.shiftKey) {
      e.preventDefault();
      setAdminMode(!adminMode);
    }
  });


  /* ------------------------------------------
     10. DELETE PHOTOS VIA DELEGATION — only in admin mode
  ------------------------------------------ */
  document.addEventListener('click', (e) => {
    const delBtn = e.target.closest('.edu-delete-btn');
    if (!delBtn) return;
    if (!adminMode) return;
    const item = delBtn.closest('.edu-gallery-item');
    if (!item) return;
    const grid = item.closest('.edu-gallery-grid');
    if (!grid) return;

    item.remove();

    // If no more real items, restore empty state
    const remaining = grid.querySelectorAll('.edu-gallery-item');
    if (remaining.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'edu-gallery-empty-state';
      emptyState.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="0.3"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>No photos yet</span>';
      grid.appendChild(emptyState);
      grid.setAttribute('data-empty', 'true');
    }
  });

});
