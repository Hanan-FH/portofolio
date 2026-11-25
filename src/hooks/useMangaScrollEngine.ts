import { useEffect } from 'react';

/**
 * Ultra-Light 60fps Scroll-Driven Manga Engine.
 * 1. One-shot IntersectionObserver (threshold: 0.12) adds `.is-cut-in` and unobserves immediately.
 * 2. Second IntersectionObserver tracks ONLY visible `.manga-chapter` elements in an active Set.
 * 3. Single passive `rAF` scroll listener batches all layout reads before writing `--p` (-1 to 1)
 *    plus the desktop margin-rail `--rail-progress` and `--rail-velocity` custom properties.
 *    Velocity decay frames execute zero DOM layout reads.
 */
export function useMangaScrollEngine(): void {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = document.querySelectorAll<HTMLElement>('[data-cut]');
    const chapters = document.querySelectorAll<HTMLElement>('.manga-chapter');

    if (reduced || typeof IntersectionObserver === 'undefined') {
      revealEls.forEach((el) => el.classList.add('is-cut-in'));

      const docEl = document.documentElement;
      const railEl = document.querySelector<HTMLElement>('.manga-rail-left');
      const syncRail = () => {
        const max = docEl.scrollHeight - (window.innerHeight || 1);
        const progress = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
        railEl?.style.setProperty('--rail-progress', progress.toFixed(4));
        railEl?.style.setProperty('--rail-velocity', '0');
      };
      syncRail();
      window.addEventListener('scroll', syncRail, { passive: true });
      window.addEventListener('resize', syncRail, { passive: true });
      return () => {
        window.removeEventListener('scroll', syncRail);
        window.removeEventListener('resize', syncRail);
      };
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
    const docEl = document.documentElement;
    const railEl = document.querySelector<HTMLElement>('.manga-rail-left');
    let rafId = 0;
    let lastScrollY = window.scrollY;
    let velocity = 0;
    let needsLayoutSync = true;

    const updateProgress = () => {
      rafId = 0;
      const scrollY = window.scrollY;
      const deltaY = Math.abs(scrollY - lastScrollY);

      if (needsLayoutSync || deltaY > 0) {
        needsLayoutSync = false;
        const vh = window.innerHeight || 1;
        const maxScroll = Math.max(1, docEl.scrollHeight - vh);

        /* Read phase: batch all bounding-rect reads before any style writes */
        const chapterValues: Array<[HTMLElement, string]> = [];
        for (const el of activeSet) {
          const rect = el.getBoundingClientRect();
          const raw = (rect.top + rect.height * 0.5 - vh * 0.5) / ((vh + rect.height) * 0.5);
          const p = Math.max(-1, Math.min(1, raw));
          chapterValues.push([el, p.toFixed(4)]);
        }

        /* Write phase: GPU-only CSS custom properties */
        railEl?.style.setProperty(
          '--rail-progress',
          Math.max(0, Math.min(1, scrollY / maxScroll)).toFixed(4)
        );
        for (const [el, p] of chapterValues) el.style.setProperty('--p', p);
      }

      /* Fast attack + smooth decay equalizer velocity (0 -> 1), zero layout reads on decay */
      const targetVelocity = Math.min(1, deltaY / 44);
      if (targetVelocity > velocity) {
        velocity += (targetVelocity - velocity) * 0.58;
      } else {
        velocity *= 0.85;
      }
      if (velocity < 0.008) velocity = 0;

      railEl?.style.setProperty('--rail-velocity', velocity.toFixed(3));
      lastScrollY = scrollY;

      if (velocity > 0) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    const schedule = () => {
      if (!rafId) rafId = window.requestAnimationFrame(updateProgress);
    };

    const scheduleFullSync = () => {
      needsLayoutSync = true;
      schedule();
    };

    const chapterObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) activeSet.add(el);
          else activeSet.delete(el);
        }
        scheduleFullSync();
      },
      { rootMargin: '80px 0px' }
    );
    chapters.forEach((ch) => chapterObs.observe(ch));

    updateProgress();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', scheduleFullSync, { passive: true });
    return () => {
      revealObs.disconnect();
      chapterObs.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', scheduleFullSync);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);
}
