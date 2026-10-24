import { useCallback, useEffect, useRef, useState } from 'react';
import { portfolioData, type Certificate } from '../../data/portfolio';
import { OptimizedPicture } from '../ui/OptimizedPicture';
import { Section, SectionHeading } from '../ui/Section';

interface CertificatesProps {
  onSelectCert: (certificate: Certificate) => void;
}

/**
 * Minimalist Horizontal Scroll Vault (Gallery-Grade Slide-Scroll with CSS Scroll Snap).
 * Responds to native horizontal gestures, pointer drag, and keyboard navigation,
 * with a GPU transform-only Celestial Progress Trajectory.
 */
export function Certificates({ onSelectCert }: CertificatesProps) {
  const { certificates } = portfolioData;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const meterRef = useRef<HTMLDivElement | null>(null);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [meterWidth, setMeterWidth] = useState(0);
  const dragStateRef = useRef({ active: false, startX: 0, startScrollLeft: 0, moved: false });

  const updateScrollRatio = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollRatio(max > 0 ? Math.max(0, Math.min(1, el.scrollLeft / max)) : 0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    const meter = meterRef.current;
    if (!el) return;

    updateScrollRatio();
    if (meter) setMeterWidth(meter.clientWidth);

    const onResize = () => {
      updateScrollRatio();
      if (meterRef.current) setMeterWidth(meterRef.current.clientWidth);
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(el);
    if (meter) ro.observe(meter);

    el.addEventListener('scroll', updateScrollRatio, { passive: true });
    return () => {
      el.removeEventListener('scroll', updateScrollRatio);
      ro.disconnect();
    };
  }, [updateScrollRatio]);

  const scrollByStep = (direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const step = Math.min(el.clientWidth * 0.82, 420);
    el.scrollBy({
      left: direction * step,
      behavior: reduce ? 'auto' : 'smooth',
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

  const knotTranslateX = Math.max(0, meterWidth - 8) * scrollRatio;

  return (
    <Section id="certificates" className="overflow-hidden">
      <div className="container-site mb-10">
        <SectionHeading
          index="04"
          label="Credentials"
          ephemeris="RA 20h 42m // DEC +45°16′ // ARCHIVE_VAULT"
          note={`${certificates.length} Accredited`}
        />

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <h2 className="mincho-editorial text-2xl sm:text-4xl">Verified Honors</h2>

          <div className="flex items-center gap-3">
            <span className="ephemeris-label hidden sm:inline">HORIZONTAL TRAVERSE →</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollByStep(-1)}
                aria-label="Scroll credentials left"
                className="twilight-chip flex h-9 w-9 items-center justify-center font-mono text-xs text-slate-200 hover:text-amber-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollByStep(1)}
                aria-label="Scroll credentials right"
                className="twilight-chip flex h-9 w-9 items-center justify-center font-mono text-xs text-slate-200 hover:text-amber-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal CSS Scroll-Snap Gallery Reel */}
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
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 px-6 md:px-[max(1.5rem,calc((100vw-76rem)/2+3.25rem))] focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
      >
        {certificates.map((cert, index) => {
          const number = String(index + 1).padStart(2, '0');
          return (
            <article
              key={cert.id}
              className="kumihimo-panel group flex w-[288px] shrink-0 snap-center flex-col justify-between p-3.5 sm:w-[356px] md:w-[404px]"
            >
              <button
                type="button"
                onClick={() => {
                  if (dragStateRef.current.moved) {
                    dragStateRef.current.moved = false;
                    return;
                  }
                  onSelectCert(cert);
                }}
                aria-label={`Open credential ${number}: ${cert.title}`}
                className="block w-full text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
              >
                <div className="relative mb-3.5 aspect-[16/10] w-full overflow-hidden rounded-[2px] border border-white/10 bg-[#050714]">
                  <OptimizedPicture
                    src={cert.image}
                    alt={cert.title}
                    width={480}
                    height={300}
                    draggable={false}
                    scrollRootRef={scrollRef}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050714]/75 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-0"
                  />
                </div>

                <div className="mb-1.5 flex items-center justify-between">
                  <span className="ephemeris-label">INDEX // {number}</span>
                  <span className="astro-telemetry">{cert.year}</span>
                </div>

                <h3 className="mincho-sub line-clamp-2 text-sm text-slate-100 group-hover:text-amber-100 sm:text-[15px]">
                  {cert.title}
                </h3>

                <p className="mt-1 truncate text-xs text-slate-400">{cert.issuer}</p>
              </button>

              <div className="mt-3.5 flex items-center justify-between border-t border-white/10 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectCert(cert)}
                  className="celestial-link inline-flex min-h-9 items-center font-mono text-[9px] uppercase tracking-[0.3em] text-sky-300 hover:text-amber-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
                >
                  Inspect Still
                </button>

                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verify ${cert.title} (opens in a new tab)`}
                    className="celestial-link inline-flex min-h-9 items-center font-mono text-[9px] uppercase tracking-[0.3em] text-slate-300 hover:text-rose-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
                  >
                    Verify ↗
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Celestial Progress Trajectory (Strictly Transform-Driven — Zero Layout Reflow) */}
      <div className="mx-auto mt-4 max-w-xs px-6" aria-hidden="true">
        <div ref={meterRef} className="relative h-px w-full bg-white/12">
          <div
            className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-rose-500/70 via-amber-300/80 to-sky-300/70 transition-transform duration-100"
            style={{ transform: `scaleX(${scrollRatio.toFixed(4)})` }}
          />
          <div
            className="absolute left-0 top-1/2 h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_8px_rgba(253,224,71,0.75)] transition-transform duration-100"
            style={{ transform: `translate3d(${knotTranslateX.toFixed(1)}px, -50%, 0)` }}
          />
        </div>
      </div>
    </Section>
  );
}

export default Certificates;
