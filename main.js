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
     3. ACTIVE NAV LINK ON SCROLL
  ------------------------------------------ */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    let current = '';
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 140) {
        current = sec.id;
      }
    });

    navLinks.forEach((link) => {
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
  navLinks.forEach((link) => {
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
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.25s, box-shadow 0.25s';
    cardObserver.observe(card);
  });

});
