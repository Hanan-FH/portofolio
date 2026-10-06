/**
 * Animations & Scroll Observer Module
 * Uses native browser IntersectionObserver for:
 * 1. Scroll-triggered reveal animations (.reveal-item)
 * 2. Active section tracking in desktop and mobile navigation
 * Full support for prefers-reduced-motion.
 */

export function initAnimations() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Reveal on scroll animations
  const revealElements = document.querySelectorAll('.reveal-item');

  if (isReducedMotion || !('IntersectionObserver' in window)) {
    // If reduced motion or observer not supported, make all immediately visible
    revealElements.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1,
      }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  }

  // 2. Active section tracking for navbar
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-section-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              const href = link.getAttribute('href');
              if (href === `#${currentId}`) {
                link.classList.add('nav-link-active');
                link.setAttribute('aria-current', 'true');
              } else {
                link.classList.remove('nav-link-active');
                link.removeAttribute('aria-current');
              }
            });
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((sec) => sectionObserver.observe(sec));
  }
}
