import { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import type { ThemePolarity } from '../../hooks/useThemePolarity';

interface NavbarProps {
  activeSection: string;
  polarity: ThemePolarity;
  onTogglePolarity: () => void;
  onNavigate?: (id: string) => void;
}

const NAV_ITEMS = [
  { id: 'about', index: '01', label: 'About' },
  { id: 'projects', index: '02', label: 'Projects' },
  { id: 'skills', index: '03', label: 'Skills' },
  { id: 'certificates', index: '04', label: 'Certificates' },
  { id: 'contact', index: '05', label: 'Contact' },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function Navbar({
  activeSection,
  polarity,
  onTogglePolarity,
  onNavigate,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const { personal } = portfolioData;

  /* GPU-composited scaleX() reading progress bar — zero React re-renders */
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
      <header className="sticky top-0 z-50 border-b-[1.5px] border-[var(--border-strong)] bg-[var(--bg-primary)]">
        <div className="container-site flex h-16 items-center justify-between gap-4">
          {/* Editorial Brand / Monogram */}
          <a
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              handleLinkClick('hero');
            }}
            aria-label={`${personal.name} — Return to top`}
            className="group inline-flex items-center gap-3 py-1"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-inverted)] font-display text-sm text-[var(--bg-primary)]">
              H
            </span>
            <span className="flex flex-col">
              <span className="font-display text-sm uppercase tracking-tight text-[var(--ink-primary)] sm:text-base">
                HANAN F.H.
              </span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)] sm:block">
                RPL // BOGOR
              </span>
            </span>
          </a>

          {/* Desktop Monospace Navigation with Instant Ink-Invert Hover */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  className={`px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.08em] ${
                    isActive
                      ? 'bg-[var(--bg-inverted)] text-[var(--bg-primary)]'
                      : 'text-[var(--ink-primary)] hover:bg-[var(--ink-primary)] hover:text-[var(--bg-primary)]'
                  }`}
                >
                  <span className="opacity-65">{item.index}</span> {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Controls: PAPER / INK Polarity Toggle + Mobile Menu Trigger */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onTogglePolarity}
              aria-label={`Switch theme polarity (currently ${polarity} mode)`}
              aria-pressed={polarity === 'ink'}
              className="inline-flex h-9 items-center border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-surface)] font-mono text-[11px] font-semibold uppercase tracking-[0.08em] cursor-pointer"
            >
              <span
                className={`flex h-full items-center gap-1.5 px-2.5 ${
                  polarity === 'paper'
                    ? 'bg-[var(--bg-inverted)] text-[var(--bg-primary)]'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
                }`}
              >
                {polarity === 'paper' && <span aria-hidden="true">■</span>}
                <span>Paper</span>
              </span>
              <span
                aria-hidden="true"
                className="h-full w-[1.5px] bg-[var(--border-strong)]"
              />
              <span
                className={`flex h-full items-center gap-1.5 px-2.5 ${
                  polarity === 'ink'
                    ? 'bg-[var(--bg-inverted)] text-[var(--bg-primary)]'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
                }`}
              >
                {polarity === 'ink' && <span aria-hidden="true">■</span>}
                <span>Ink</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="flex h-9 w-9 items-center justify-center border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--ink-primary)] hover:bg-[var(--bg-inverted)] hover:text-[var(--bg-primary)] lg:hidden"
            >
              {isMenuOpen ? (
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2.5 2.5L13.5 13.5M13.5 2.5L2.5 13.5" stroke="currentColor" strokeWidth="1.75" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.75" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 2px GPU-Composited Reading Progress Line */}
        <div aria-hidden="true" className="h-[2px] w-full bg-transparent">
          <div
            ref={progressRef}
            className="h-full w-full origin-left bg-[var(--accent-indigo)]"
            style={{ transform: 'scaleX(0)', willChange: 'transform' }}
          />
        </div>
      </header>

      {/* Accessible Mobile Editorial Index Sheet */}
      {isMenuOpen && (
        <div
          ref={drawerRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[180] flex flex-col bg-[var(--bg-primary)] lg:hidden"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b-[1.5px] border-[var(--border-strong)] px-4 sm:px-6">
            <span className="font-display text-sm uppercase tracking-tight text-[var(--ink-primary)]">
              INDEX // NAVIGATION
            </span>
            <button
              type="button"
              data-autofocus
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex h-9 items-center gap-1.5 border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ink-primary)] hover:bg-[var(--bg-inverted)] hover:text-[var(--bg-primary)]"
            >
              <span>Close</span>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.75" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center divide-y divide-[var(--border-subtle)] px-4 sm:px-6" aria-label="Mobile navigation">
            <a
              href="#hero"
              onClick={(event) => {
                event.preventDefault();
                handleLinkClick('hero');
              }}
              className={`flex items-baseline justify-between py-4 px-3 ${
                activeSection === 'hero'
                  ? 'bg-[var(--bg-inverted)] text-[var(--bg-primary)]'
                  : 'text-[var(--ink-primary)] hover:bg-[var(--ink-primary)] hover:text-[var(--bg-primary)]'
              }`}
            >
              <span className="font-mono text-xs uppercase tracking-[0.08em]">00 // COVER</span>
              <span className="font-display text-2xl uppercase">Home</span>
            </a>

            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  className={`flex items-baseline justify-between py-4 px-3 ${
                    isActive
                      ? 'bg-[var(--bg-inverted)] text-[var(--bg-primary)]'
                      : 'text-[var(--ink-primary)] hover:bg-[var(--ink-primary)] hover:text-[var(--bg-primary)]'
                  }`}
                >
                  <span className="font-mono text-xs uppercase tracking-[0.08em]">
                    {item.index} // SECTION
                  </span>
                  <span className="font-display text-2xl uppercase">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t-[1.5px] border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-4 sm:px-6">
            <a
              href={`mailto:${personal.email}`}
              className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-[var(--ink-primary)] underline underline-offset-4"
            >
              {personal.email} ↗
            </a>
            <button
              type="button"
              onClick={onTogglePolarity}
              className="border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-inverted)] px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--bg-primary)]"
            >
              Mode: {polarity}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
