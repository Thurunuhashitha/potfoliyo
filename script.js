/**
 * Thurunu Hashitha — Portfolio Script
 * All selectors verified against index.html structure.
 */

/* ─── 1. CUSTOM CURSOR (desktop pointer devices only) ─── */
(function initCursor() {
  const isPointerFine = window.matchMedia('(pointer: fine)').matches;
  if (!isPointerFine) return;

  const ring = document.getElementById('cr');
  const dot  = document.getElementById('cd');
  if (!ring || !dot) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    // Dot follows instantly
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  }, { passive: true });

  // Ring follows with smooth lag
  (function loop() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();
})();


/* ─── 2. NAVIGATION ─── */
(function initNav() {
  const nav        = document.getElementById('nav');
  const hamburger  = document.getElementById('hamburger');
  const mobMenu    = document.getElementById('mob-menu');
  const mobClose   = document.getElementById('mob-close');

  // Scroll-shrink nav
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // Mobile menu open
  if (hamburger && mobMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // Mobile menu close button
  if (mobClose && mobMenu) {
    mobClose.addEventListener('click', closeMobile);
  }

  // Keyboard: Escape closes mobile menu
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobMenu && mobMenu.classList.contains('open')) {
      closeMobile();
    }
  });
})();

/** Close the mobile menu — also called inline via onclick on <a> tags */
function closeMobile() {
  const mobMenu   = document.getElementById('mob-menu');
  const hamburger = document.getElementById('hamburger');
  if (!mobMenu) return;
  mobMenu.classList.remove('open');
  hamburger && hamburger.classList.remove('open');
  hamburger && hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}


/* ─── 3. ACTIVE NAV LINK ON SCROLL ─── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  function updateActive() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 220) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();


/* ─── 4. SCROLL REVEAL ─── */
(function initReveal() {
  const elements = document.querySelectorAll('.rv');
  if (!elements.length) return;

  // Respect prefers-reduced-motion
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    elements.forEach(el => el.classList.add('vis'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });

  elements.forEach(el => observer.observe(el));
})();


/* ─── 5. BACK TO TOP BUTTON ─── */
(function initBackTop() {
  const btn = document.getElementById('back-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ─── 6. SMOOTH SCROLL FOR ANCHOR LINKS ─── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return; // let back-to-top handle itself
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offsetTop = target.offsetTop - 76; // account for fixed nav height
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
  });
})();


/* ─── 7. TICKER PAUSE ON HOVER ─── */
// Handled via CSS: .ticker:hover { animation-play-state: paused; }
// No JS needed.


/* ─── 8. CONSOLE WELCOME ─── */
console.log('%c👋 Thurunu Hashitha — Portfolio', 'font-size:16px;color:#00c8f0;font-weight:bold;');
console.log('%cBuilt with React, Node.js, and a lot of care. View source on GitHub!', 'font-size:12px;color:#8a9ab5;');
