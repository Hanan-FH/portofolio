import { useEffect } from 'react';

/**
 * Ultra-Light 60fps Scroll-Driven Manga Engine (~45 lines).
 * 1. One-shot IntersectionObserver (threshold: 0.12) adds .is-cut-in and unobserves immediately.
 * 2. Second IntersectionObserver tracks ONLY visible .manga-chapter elements in an active Set.
 * 3. Passive rAF scroll loop computes normalized --p (-1 to 1) ONLY for active chapters.
 */
export function useMangaScrollEngine(): void {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = document.querySelectorAll<HTMLElement>('[data-cut]');
    const chapters = document.querySelectorAll<HTMLElement>('.manga-chapter');

    if (reduced || typeof IntersectionObserver === 'undefined') {
      revealEls.forEach((el) => el.classList.add('is-cut-in'));
      return;
    }

    const revealObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-cut-in');
            revealObs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObs.observe(el));

    const activeSet = new Set<HTMLElement>();
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const vh = window.innerHeight || 1;
      for (const el of activeSet) {
        const rect = el.getBoundingClientRect();
        const raw = (rect.top + rect.height * 0.5 - vh * 0.5) / ((vh + rect.height) * 0.5);
        const p = Math.max(-1, Math.min(1, raw));
        el.style.setProperty('--p', p.toFixed(4));
      }
    };

    const schedule = () => {
      if (!rafId && activeSet.size > 0) rafId = window.requestAnimationFrame(updateProgress);
    };

    const chapterObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) activeSet.add(el);
          else activeSet.delete(el);
        }
        schedule();
      },
      { rootMargin: '80px 0px' }
    );
    chapters.forEach((ch) => chapterObs.observe(ch));

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      revealObs.disconnect();
      chapterObs.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);
}
