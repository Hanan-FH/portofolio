import { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../../data/portfolio';

interface NavbarProps {
  activeSection: string;
  onNavigate?: (id: string) => void;
}

const CHAPTERS = [
  { id: 'about', code: 'CH.01', label: 'About' },
  { id: 'projects', code: 'CH.02', label: 'Works' },
  { id: 'skills', code: 'CH.03', label: 'Skills' },
  { id: 'certificates', code: 'CH.04', label: 'Certs' },
  { id: 'contact', code: 'FINAL', label: 'Contact' },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const { personal, social } = portfolioData;

  /* Razor-thin 2px #584CE6 GPU-composited scroll progress bar */
  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const bar = progressRef.current;
      if (!bar) return;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      bar.style.transform = `scaleX(${ratio.toFixed(4)})`;
    };

    const onScrollOrResize = () => {
      if (!rafId) rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  /* Mobile menu focus trap & Escape handling */
  useEffect(() => {
    if (!isMenuOpen) return;

    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = drawerRef.current;
    const initialFocus = panel?.querySelector<HTMLElement>('[data-autofocus]');
    initialFocus?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [isMenuOpen]);

  const handleLinkClick = (id: string) => {
    setIsMenuOpen(false);
    onNavigate?.(id);
  };

  return (
    <>
      {/* 2px #584CE6 Top Edge Scroll Progress Bar */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-[2px]">
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-[#584CE6]"
          style={{ transform: 'scaleX(0)', willChange: 'transform' }}
        />
      </div>

      {/* Minimal Floating Manga Header (No Clunky Full-Width Bar) */}
      <header className="pointer-events-none fixed inset-x-0 top-3.5 z-[110]">
        <div className="container-site flex items-center justify-between gap-4">
          {/* Slashed Brand Stamp */}
          <a
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              handleLinkClick('hero');
            }}
            aria-label={`${personal.name} — Return to CH.00`}
            className="pointer-events-auto inline-flex items-center gap-2 border border-[#ECECF0]/20 bg-[#060608] px-3.5 py-2 text-[#ECECF0] [clip-path:polygon(0_0,100%_0,calc(100%-8px)_100%,0_100%)] hover:bg-[#584CE6]"
          >
            <span className="font-display text-sm uppercase tracking-tight">H.FH</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#A6A6B2]">
              // CH.00
            </span>
          </a>

          {/* Desktop Floating Chapter Strip with Instant Ink-Invert Hover */}
          <nav
            aria-label="Chapter navigation"
            className="pointer-events-auto hidden items-center border border-[#ECECF0]/20 bg-[#060608] px-1.5 py-1 [clip-path:polygon(8px_0,100%_0,calc(100%-8px)_100%,0_100%)] lg:flex"
          >
            {CHAPTERS.map((ch) => {
              const isActive = activeSection === ch.id;
              return (
                <a
                  key={ch.id}
                  href={`#${ch.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleLinkClick(ch.id);
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  className={`px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] ${
                    isActive
                      ? 'bg-[#584CE6] text-white'
                      : 'text-[#ECECF0] hover:bg-[#ECECF0] hover:text-[#060608]'
                  }`}
                >
                  <span className="opacity-65">{ch.code}</span> {ch.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close chapter menu' : 'Open chapter menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-chapter-menu"
            className="pointer-events-auto inline-flex h-9 items-center gap-2 border border-[#ECECF0]/25 bg-[#060608] px-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[#ECECF0] [clip-path:polygon(6px_0,100%_0,100%_100%,0_100%)] hover:bg-[#584CE6] lg:hidden"
          >
            <span>INDEX</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 4.5H14M4 8H14M2 11.5H14" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Pitch-Ink Chapter Sheet */}
      {isMenuOpen && (
        <div
          ref={drawerRef}
          id="mobile-chapter-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Chapter index"
          className="fixed inset-0 z-[180] flex flex-col bg-[#060608] text-[#ECECF0] lg:hidden"
        >
          <div className="manga-speedlines absolute inset-0 text-[#ECECF0]" aria-hidden="true" />

          <div className="relative z-10 flex h-16 shrink-0 items-center justify-between border-b border-[#ECECF0]/15 px-5">
            <span className="mono-stamp text-[#584CE6]">CHAPTER INDEX // MMV</span>
            <button
              type="button"
              data-autofocus
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close chapter menu"
              className="inline-flex h-8 items-center gap-1.5 bg-[#ECECF0] px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#060608] [clip-path:polygon(6px_0,100%_0,100%_100%,0_100%)]"
            >
              <span>ESC</span>
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.75" />
              </svg>
            </button>
          </div>

          <nav
            className="relative z-10 flex flex-1 flex-col justify-center divide-y divide-[#ECECF0]/12 px-5"
            aria-label="Mobile chapter navigation"
          >
            <a
              href="#hero"
              onClick={(event) => {
                event.preventDefault();
                handleLinkClick('hero');
              }}
              className="flex items-baseline justify-between py-4"
            >
              <span className="mono-stamp text-[#584CE6]">CH.00</span>
              <span className="font-display text-3xl uppercase tracking-tight">Opening</span>
            </a>

            {CHAPTERS.map((ch) => {
              const isActive = activeSection === ch.id;
              return (
                <a
                  key={ch.id}
                  href={`#${ch.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleLinkClick(ch.id);
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  className="flex items-baseline justify-between py-4"
                >
                  <span className={`mono-stamp ${isActive ? 'text-[#584CE6]' : 'text-[#A6A6B2]'}`}>
                    {ch.code}
                  </span>
                  <span
                    className={`font-display text-3xl uppercase tracking-tight ${
                      isActive ? 'text-[#584CE6]' : 'text-[#ECECF0]'
                    }`}
                  >
                    {ch.label}
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#ECECF0]/15 px-5 py-5">
            <a
              href={`mailto:${personal.email}`}
              className="mono-stamp text-[#ECECF0] hover:text-[#584CE6]"
            >
              {personal.email} ↗
            </a>
            <div className="flex items-center gap-4">
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-stamp text-[#A6A6B2] hover:text-[#584CE6]"
                >
                  GitHub ↗
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-stamp text-[#A6A6B2] hover:text-[#584CE6]"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
