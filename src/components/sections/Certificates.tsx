import { useEffect, useRef } from 'react';
import { portfolioData, type Certificate } from '../../data/portfolio';
import { prefersReducedMotionNow } from '../../hooks/useReducedMotion';
import { OptimizedPicture } from '../ui/OptimizedPicture';
import { Section, SectionHeading } from '../ui/Section';

interface CertificatesProps {
  onSelectCert: (certificate: Certificate) => void;
}

export function Certificates({ onSelectCert }: CertificatesProps) {
  const { certificates } = portfolioData;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef({ active: false, startX: 0, startScrollLeft: 0, moved: false });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    let rafId = 0;

    const syncProgress = () => {
      rafId = 0;
      const ratio = maxScroll > 0 ? Math.max(0, Math.min(1, el.scrollLeft / maxScroll)) : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${ratio.toFixed(4)})`;
      }
    };

    const scheduleSync = () => {
      if (!rafId) rafId = window.requestAnimationFrame(syncProgress);
    };

    const measure = () => {
      maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
      syncProgress();
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    el.addEventListener('scroll', scheduleSync, { passive: true });
    return () => {
      el.removeEventListener('scroll', scheduleSync);
      ro.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollByStep = (direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.85, 420);
    el.scrollBy({
      left: direction * step,
      behavior: prefersReducedMotionNow() ? 'auto' : 'smooth',
    });
  };

  const handleTrackKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollByStep(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollByStep(-1);
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || event.button !== 0) return;
    dragStateRef.current = {
      active: true,
      startX: event.pageX,
      startScrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    const state = dragStateRef.current;
    if (!el || !state.active) return;
    const dx = event.pageX - state.startX;
    if (Math.abs(dx) > 5) {
      state.moved = true;
      el.scrollLeft = state.startScrollLeft - dx;
    }
  };

  const endMouseDrag = () => {
    dragStateRef.current.active = false;
  };

  return (
    <Section id="certificates" defer className="overflow-hidden">
      <div className="container-site">
        <SectionHeading
          index="04"
          label="CERTIFICATES"
          title="Credentials & Achievements"
          note={`${certificates.length} ACCREDITED CERTIFICATES`}
        />

        <div data-reveal className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="mono-label text-[var(--ink-secondary)]">
            CLICK ANY CERTIFICATE TO OPEN FULL-RESOLUTION LIGHTBOX
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByStep(-1)}
              aria-label="Previous certificates"
              className="btn-paper min-h-10 px-3.5 py-1.5"
            >
              <span aria-hidden="true">←</span>
              <span>Prev</span>
            </button>
            <button
              type="button"
              onClick={() => scrollByStep(1)}
              aria-label="Next certificates"
              className="btn-paper min-h-10 px-3.5 py-1.5"
            >
              <span>Next</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal CSS Scroll-Snap Track */}
      <div
        ref={scrollRef}
        tabIndex={0}
        role="region"
        aria-label="Accredited certificates gallery"
        onKeyDown={handleTrackKeyDown}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endMouseDrag}
        onMouseLeave={endMouseDrag}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pt-2 pb-6 px-4 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+3rem))]"
      >
        {certificates.map((cert, index) => {
          const number = String(index + 1).padStart(2, '0');
          return (
            <article
              key={cert.id}
              className="manga-card-interactive group flex w-[292px] shrink-0 snap-start flex-col justify-between sm:w-[360px] md:w-[396px]"
            >
              <div>
                <div className="flex items-center justify-between border-b-[1.5px] border-[var(--border-strong)] bg-[var(--bg-primary)] px-4 py-2">
                  <span className="inline-flex bg-[var(--bg-inverted)] px-2 py-0.5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--bg-primary)]">
                    CERT // {number}
                  </span>
                  <span className="mono-label text-[var(--ink-muted)]">{cert.year}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (dragStateRef.current.moved) {
                      dragStateRef.current.moved = false;
                      return;
                    }
                    onSelectCert(cert);
                  }}
                  aria-label={`Preview certificate ${number}: ${cert.title}`}
                  className="block w-full text-left cursor-pointer"
                >
                  <div className="halftone-surface relative aspect-[16/11] w-full overflow-hidden border-b-[1.5px] border-[var(--border-strong)] bg-[var(--bg-subtle)] p-2.5">
                    <OptimizedPicture
                      src={cert.image}
                      alt={cert.title}
                      width={480}
                      height={330}
                      draggable={false}
                      className="editorial-media h-full w-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] object-contain"
                    />
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className="display-card text-base sm:text-lg group-hover:underline underline-offset-4">
                      {cert.title}
                    </h3>
                    <p className="mt-2 font-mono text-xs text-[var(--ink-secondary)]">
                      {cert.issuer}
                    </p>
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--border-subtle)] px-4 py-3 sm:px-5">
                <button
                  type="button"
                  onClick={() => onSelectCert(cert)}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ink-primary)] hover:bg-[var(--bg-inverted)] hover:text-[var(--bg-primary)] px-2 py-1 cursor-pointer"
                >
                  <span>Preview</span>
                  <span className="btn-arrow" aria-hidden="true">
                    →
                  </span>
                </button>

                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verify ${cert.title} (opens in a new tab)`}
                    className="inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ink-secondary)] hover:bg-[var(--bg-inverted)] hover:text-[var(--bg-primary)] px-2 py-1"
                  >
                    <span>Verify</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* GPU Transform-Only Scroll Progress Line */}
      <div className="container-site mt-4" aria-hidden="true">
        <div className="h-[3px] w-full border border-[var(--border-strong)] bg-[var(--bg-surface)]">
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left bg-[var(--ink-primary)]"
            style={{ transform: 'scaleX(0)', willChange: 'transform' }}
          />
        </div>
      </div>
    </Section>
  );
}

export default Certificates;
