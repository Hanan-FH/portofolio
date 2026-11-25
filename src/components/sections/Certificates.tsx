import { useEffect, useRef } from 'react';
import { portfolioData, type Certificate } from '../../data/portfolio';
import { prefersReducedMotionNow } from '../../hooks/useReducedMotion';
import { OptimizedPicture } from '../ui/OptimizedPicture';

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
    <section
      id="certificates"
      className="manga-chapter chapter-cut-top-alt relative z-[15] scroll-mt-12 bg-[#ECECF0] text-[#060608]"
    >
      {/* Back Layer: Halftone & Chapter Watermark */}
      <div aria-hidden="true" className="parallax-back pointer-events-none absolute inset-0 overflow-hidden">
        <div className="manga-halftone absolute inset-0 text-[#060608]" />
        <span className="absolute left-4 top-20 select-none font-display text-[clamp(9rem,22vw,19rem)] leading-none text-[#060608]/[0.04] sm:left-12">
          04
        </span>
      </div>

      <div className="container-site relative z-10">
        <div className="mb-10 sm:mb-14">
          <div className="parallax-front mb-4 inline-block">
            <span className="inline-block rotate-2 bg-[#060608] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#ECECF0]">
              <span className="text-[#584CE6]">CH.04</span> // CREDENTIALS
            </span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2
              data-cut
              className="parallax-mid text-[clamp(2.4rem,6.2vw,5.4rem)] uppercase tracking-[-0.035em] text-[#060608]"
            >
              <span className="line-mask">
                <span className="line-rise">VERIFIED</span>
              </span>
              <span className="line-mask">
                <span className="line-rise" style={{ '--d': '60ms' } as React.CSSProperties}>
                  CREDENTIALS
                </span>
              </span>
            </h2>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollByStep(-1)}
                aria-label="Previous certificates"
                className="btn-beat-dark min-h-10 px-4 py-2"
              >
                <span aria-hidden="true">←</span>
                <span>Prev</span>
              </button>
              <button
                type="button"
                onClick={() => scrollByStep(1)}
                aria-label="Next certificates"
                className="btn-beat-dark min-h-10 px-4 py-2"
              >
                <span>Next</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Film-Strip Manga Panels (Horizontal Scroll Snap) */}
      <div data-cut className="relative z-10">
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
          className="reveal-slice no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto pb-8 px-5 sm:px-8 lg:px-[max(2rem,calc((100vw-84rem)/2+3.5rem))]"
        >
          {certificates.map((cert, index) => {
            const number = String(index + 1).padStart(2, '0');
            return (
              <article
                key={cert.id}
                className="group flex w-[290px] shrink-0 snap-start flex-col justify-between sm:w-[356px] md:w-[392px]"
              >
                <div>
                  {/* Crisp Slashed Index Stamp */}
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-block bg-[#060608] px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#ECECF0] [clip-path:polygon(6px_0,100%_0,calc(100%-6px)_100%,0_100%)] group-hover:bg-[#584CE6]">
                      CERT // {number}
                    </span>
                    <span className="mono-stamp text-[#4E4E57]">{cert.year}</span>
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
                    {/* Angled Manga Film-Strip Viewport */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#060608] p-3 [clip-path:polygon(0_0,100%_0,97.5%_100%,0_98%)]">
                      <OptimizedPicture
                        src={cert.image}
                        alt={cert.title}
                        width={480}
                        height={330}
                        draggable={false}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="mt-4 pr-2">
                      <h3 className="text-base uppercase leading-[1.06] tracking-[-0.02em] text-[#060608] group-hover:text-[#584CE6] sm:text-lg">
                        {cert.title}
                      </h3>
                      <p className="mt-1.5 font-mono text-xs text-[#4E4E57]">{cert.issuer}</p>
                    </div>
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#060608]/15 pt-3">
                  <button
                    type="button"
                    onClick={() => onSelectCert(cert)}
                    className="mono-stamp inline-flex items-center gap-1.5 font-semibold text-[#060608] hover:text-[#584CE6] cursor-pointer"
                  >
                    <span>Open Lightbox</span>
                    <span className="beat-arrow" aria-hidden="true">→</span>
                  </button>

                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify ${cert.title} (opens in a new tab)`}
                      className="mono-stamp inline-flex items-center gap-1 text-[#4E4E57] hover:text-[#584CE6]"
                    >
                      <span>Verify</span>
                      <span className="beat-arrow" aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* #584CE6 Film-Strip Progress Trajectory */}
      <div className="container-site relative z-10 mt-2" aria-hidden="true">
        <div className="h-[2px] w-full bg-[#060608]/12">
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left bg-[#584CE6]"
            style={{ transform: 'scaleX(0)', willChange: 'transform' }}
          />
        </div>
      </div>
    </section>
  );
}

export default Certificates;
