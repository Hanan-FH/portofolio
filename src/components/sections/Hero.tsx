import { useEffect, useRef } from 'react';
import { portfolioData } from '../../data/portfolio';
import { OptimizedPicture } from '../ui/OptimizedPicture';
import { RollingText } from '../ui/RollingText';

interface HeroProps {
  onNavigate?: (id: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { personal, social } = portfolioData;
  const stageRef = useRef<HTMLDivElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  /* Subtle 60fps desktop mouse-reactive parallax (max ±8px via rAF, zero re-renders) */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    const stage = stageRef.current;
    const targetEl = parallaxRef.current;
    if (!stage || !targetEl) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const step = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      targetEl.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.08 || Math.abs(targetY - currentY) > 0.08) {
        rafId = window.requestAnimationFrame(step);
      } else {
        rafId = 0;
      }
    };

    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = Math.max(-8, Math.min(8, nx * 16));
      targetY = Math.max(-8, Math.min(8, ny * 16));
      if (!rafId) rafId = window.requestAnimationFrame(step);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!rafId) rafId = window.requestAnimationFrame(step);
    };

    stage.addEventListener('pointermove', onMove, { passive: true });
    stage.addEventListener('pointerleave', onLeave);
    return () => {
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const navigate = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate?.(id);
  };

  return (
    <section id="hero" className="editorial-grain relative scroll-mt-16 pb-20 pt-10 sm:pb-28 sm:pt-14 lg:pb-36 lg:pt-16">
      <div className="container-site">
        {/* Top Architectural Metadata Strip */}
        <div
          style={{ '--delay': '100ms' } as React.CSSProperties}
          className="hero-stagger-fade flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line-hairline)] pb-4"
        >
          <div className="flex items-center gap-2.5">
            <span className="mono-index font-semibold text-[var(--accent-purple)]">00</span>
            <span aria-hidden="true" className="mono-index text-[var(--ink-muted)]">/</span>
            <span className="mono-index text-[var(--ink-primary)]">{personal.eyebrow}</span>
          </div>
          <span className="mono-index text-[var(--ink-muted)]">{personal.location}</span>
        </div>

        {/* Monumental Masked Editorial Display Headline */}
        <div className="mt-8 sm:mt-12">
          <h1 aria-label={personal.name} className="uppercase tracking-[-0.04em]">
            <span className="hero-mask-line">
              <span
                style={{ '--delay': '140ms' } as React.CSSProperties}
                className="hero-mask-inner flex items-start gap-3 text-[clamp(3.1rem,9vw,8.5rem)] leading-[0.9]"
              >
                <span>HANAN</span>
                <span
                  aria-hidden="true"
                  className="mt-2 font-mono text-xs font-medium tracking-[0.1em] text-[var(--accent-purple)] sm:text-sm"
                >
                  [ED.26]
                </span>
              </span>
            </span>
            <span className="hero-mask-line">
              <span
                style={{ '--delay': '220ms' } as React.CSSProperties}
                className="hero-mask-inner text-[clamp(2rem,6vw,5.8rem)] leading-[0.92]"
              >
                FATHURROZAQ
              </span>
            </span>
            <span className="hero-mask-line">
              <span
                style={{ '--delay': '300ms' } as React.CSSProperties}
                className="hero-mask-inner text-[clamp(1.9rem,5.6vw,5.4rem)] leading-[0.92] text-[var(--ink-secondary)]"
              >
                HIDAYATULLAH
              </span>
            </span>
          </h1>
        </div>

        {/* Asymmetrical 12-Column Editorial Split: Copy Left // Interactive addo.jpg Centerpiece Right */}
        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:items-end lg:gap-14">
          {/* Left Column: Bio, Liquid Ink-Wipe CTAs & Social Index */}
          <div
            style={{ '--delay': '380ms' } as React.CSSProperties}
            className="hero-stagger-fade flex flex-col justify-between lg:col-span-5"
          >
            <div className="border-t border-[var(--line-hairline)] pt-6">
              <p className="font-sans text-lg font-semibold leading-snug text-[var(--ink-primary)] sm:text-xl">
                {personal.headline}
              </p>

              <p className="mt-4 text-base leading-[1.65] text-[var(--ink-secondary)]">
                {personal.shortBio}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a href="#projects" onClick={navigate('projects')} className="btn-kinetic-ink">
                  <RollingText text="Selected Works" />
                  <span className="kinetic-arrow" aria-hidden="true">→</span>
                </a>

                <a href="#contact" onClick={navigate('contact')} className="btn-kinetic-outline">
                  <RollingText text="Get in Touch" />
                  <span className="kinetic-arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--line-hairline)] pt-5">
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                  className="roll-trigger inline-flex items-center gap-1.5 py-1 font-mono text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[var(--ink-primary)] hover:text-[var(--accent-purple)]"
                >
                  <RollingText text="GitHub" />
                  <span className="kinetic-arrow" aria-hidden="true">↗</span>
                </a>
              )}

              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in a new tab)"
                  className="roll-trigger inline-flex items-center gap-1.5 py-1 font-mono text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[var(--ink-primary)] hover:text-[var(--accent-purple)]"
                >
                  <RollingText text="LinkedIn" />
                  <span className="kinetic-arrow" aria-hidden="true">↗</span>
                </a>
              )}

              <a
                href={`mailto:${personal.email}`}
                className="roll-trigger inline-flex items-center gap-1.5 py-1 font-mono text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[var(--ink-secondary)] hover:text-[var(--accent-purple)]"
              >
                <RollingText text={personal.email} />
                <span className="kinetic-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Dramatic Asymmetrical Frame Anchored by addo.jpg */}
          <div className="lg:col-span-7">
            <figure ref={stageRef} className="hero-art-stage relative">
              <div ref={parallaxRef} className="relative will-change-transform">
                {/* Subtle Electric-Purple Ink Offset Plate on Hover */}
                <div
                  aria-hidden="true"
                  className="hero-ink-plate pointer-events-none absolute inset-0 bg-[var(--accent-purple)]"
                />

                {/* Sharp Corner Registration Crop-Marks */}
                <span aria-hidden="true" className="hero-crop hero-crop-tl -left-2 -top-2 border-l-[1.5px] border-t-[1.5px]" />
                <span aria-hidden="true" className="hero-crop hero-crop-tr -right-2 -top-2 border-r-[1.5px] border-t-[1.5px]" />
                <span aria-hidden="true" className="hero-crop hero-crop-bl -bottom-2 -left-2 border-b-[1.5px] border-l-[1.5px]" />
                <span aria-hidden="true" className="hero-crop hero-crop-br -bottom-2 -right-2 border-b-[1.5px] border-r-[1.5px]" />

                {/* Main 16:9 Editorial Art Frame */}
                <div className="hero-panel-reveal relative aspect-[16/9] w-full overflow-hidden border-[1.5px] border-[var(--line-strong)] bg-[#090909]">
                  <OptimizedPicture
                    src={personal.profileImage}
                    alt={`${personal.name} — Editorial cover illustration`}
                    width={736}
                    height={414}
                    eager
                    fetchPriority="high"
                    className="hero-image-entrance h-full w-full object-cover"
                  />
                </div>
              </div>

              <figcaption
                style={{ '--delay': '440ms' } as React.CSSProperties}
                className="hero-stagger-fade mt-4 flex flex-wrap items-baseline justify-between gap-2"
              >
                <span className="mono-index text-[var(--ink-primary)]">
                  {personal.role}
                </span>
                <span className="mono-index text-[var(--ink-muted)]">
                  {personal.status}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
