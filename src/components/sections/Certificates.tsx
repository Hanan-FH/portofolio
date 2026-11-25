import { useEffect, useRef } from 'react';
import { portfolioData, type Certificate } from '../../data/portfolio';
import { prefersReducedMotionNow } from '../../hooks/useReducedMotion';
import { OptimizedPicture } from '../ui/OptimizedPicture';
import { RollingText } from '../ui/RollingText';
import { Section, SectionHeading } from '../ui/Section';

interface CertificatesProps {
  onSelectCert: (certificate: Certificate) => void;
}

function attachMagnetic(el: HTMLButtonElement | null): () => void {
  if (!el || typeof window === 'undefined' || !window.matchMedia) return () => {};
  if (!window.matchMedia('(pointer: fine)').matches || prefersReducedMotionNow()) return () => {};

  const onMove = (event: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.22;
    const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.22;
    el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
  };
  const onLeave = () => {
    el.style.transform = 'translate3d(0, 0, 0)';
  };

  el.addEventListener('pointermove', onMove, { passive: true });
  el.addEventListener('pointerleave', onLeave);
  return () => {
    el.removeEventListener('pointermove', onMove);
    el.removeEventListener('pointerleave', onLeave);
  };
}

export function Certificates({ onSelectCert }: CertificatesProps) {
  const { certificates } = portfolioData;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const prevBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
  const dragStateRef = useRef({ active: false, startX: 0, startScrollLeft: 0, moved: false });

  useEffect(() => {
    const cleanPrev = attachMagnetic(prevBtnRef.current);
    const cleanNext = attachMagnetic(nextBtnRef.current);
    return () => {
      cleanPrev();
      cleanNext();
    };
  }, []);

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
    <Section id="certificates" className="overflow-hidden">
      <div className="container-site">
        <SectionHeading
          index="04"
          label="CERTIFICATES"
          title="Verified Credentials"
          note={`${certificates.length} ACCREDITED`}
        />

        <div data-reveal="up" className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="mono-index text-[var(--ink-muted)]">
            SELECT ANY CREDENTIAL FOR FULL-CLARITY LIGHTBOX VIEW
          </p>

          <div className="flex items-center gap-2.5">
            <button
              ref={prevBtnRef}
              type="button"
              onClick={() => scrollByStep(-1)}
              aria-label="Previous certificates"
              className="btn-kinetic-outline min-h-10 px-4 py-2 transition-transform duration-150"
            >
              <span aria-hidden="true">←</span>
              <RollingText text="Prev" />
            </button>
            <button
              ref={nextBtnRef}
              type="button"
              onClick={() => scrollByStep(1)}
              aria-label="Next certificates"
              className="btn-kinetic-outline min-h-10 px-4 py-2 transition-transform duration-150"
            >
              <RollingText text="Next" />
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal CSS Scroll-Snap Editorial Gallery */}
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
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 px-5 sm:px-8 lg:px-[max(2rem,calc((100vw-84rem)/2+3.5rem))]"
      >
        {certificates.map((cert, index) => {
          const number = String(index + 1).padStart(2, '0');
          return (
            <article
              key={cert.id}
              data-reveal="wipe"
              style={{ '--delay': `${Math.min(index, 4) * 60}ms` } as React.CSSProperties}
              className="cert-card group flex w-[288px] shrink-0 snap-start flex-col justify-between border border-[var(--line-hairline)] bg-[var(--bg-surface)] sm:w-[360px] md:w-[400px]"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[var(--line-hairline)] px-5 py-3">
                  <span className="mono-index font-semibold text-[var(--ink-primary)] transition-colors group-hover:text-[var(--accent-purple)]">
                    {number}
                  </span>
                  <span className="mono-index text-[var(--ink-muted)]">{cert.year}</span>
                </div>

                <button
                  type="button"
                  data-cursor="VIEW"
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
                  <div className="editorial-halftone relative aspect-[16/11] w-full overflow-hidden border-b border-[var(--line-hairline)] bg-[var(--bg-subtle)] p-4">
                    <OptimizedPicture
                      src={cert.image}
                      alt={cert.title}
                      width={480}
                      height={330}
                      draggable={false}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span aria-hidden="true" className="crop-corner crop-tl" />
                    <span aria-hidden="true" className="crop-corner crop-tr" />
                    <span aria-hidden="true" className="crop-corner crop-bl" />
                    <span aria-hidden="true" className="crop-corner crop-br" />
                  </div>

                  <div className="p-5">
                    <h3 className="text-base uppercase leading-[1.08] tracking-[-0.02em] sm:text-lg">
                      {cert.title}
                    </h3>
                    <p className="mt-2 font-mono text-xs text-[var(--ink-muted)]">
                      {cert.issuer}
                    </p>
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--line-hairline)] px-5 py-3.5">
                <button
                  type="button"
                  onClick={() => onSelectCert(cert)}
                  className="roll-trigger inline-flex items-center gap-1.5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[var(--ink-primary)] hover:text-[var(--accent-purple)] cursor-pointer"
                >
                  <RollingText text="Inspect" />
                  <span className="kinetic-arrow" aria-hidden="true">→</span>
                </button>

                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verify ${cert.title} (opens in a new tab)`}
                    className="roll-trigger inline-flex items-center gap-1 font-mono text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                  >
                    <RollingText text="Verify" />
                    <span className="kinetic-arrow" aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Hairline Scroll Progress Track */}
      <div className="container-site mt-2" aria-hidden="true">
        <div className="h-px w-full bg-[var(--line-hairline)]">
          <div
            ref={progressBarRef}
            className="h-[2px] -mt-[0.5px] w-full origin-left bg-[var(--accent-purple)]"
            style={{ transform: 'scaleX(0)', willChange: 'transform' }}
          />
        </div>
      </div>
    </Section>
  );
}

export default Certificates;
