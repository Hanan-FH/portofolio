import { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import type { ThemePolarity } from '../../hooks/useThemePolarity';
import { RollingText } from '../ui/RollingText';

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

  /* Razor-thin 2px GPU-composited scroll progress bar at top of viewport */
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
      <header className="sticky top-0 z-50 border-b border-[var(--line-hairline)] bg-[var(--bg-primary)]">
        {/* Razor-Thin 2px Top Scroll Progress Line */}
        <div aria-hidden="true" className="h-[2px] w-full bg-transparent">
          <div
            ref={progressRef}
            className="h-full w-full origin-left bg-[var(--accent-purple)]"
            style={{ transform: 'scaleX(0)', willChange: 'transform' }}
          />
        </div>

        <div className="container-site flex h-16 items-center justify-between gap-4">
          {/* Minimalist Editorial Brand Lockup */}
          <a
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              handleLinkClick('hero');
            }}
            aria-label={`${personal.name} — Return to top`}
            className="roll-trigger inline-flex items-baseline gap-2.5 py-1"
          >
            <span className="font-display text-base uppercase tracking-[-0.04em] text-[var(--ink-primary)] sm:text-lg">
              <RollingText text="HANAN F.H." />
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--ink-muted)] sm:inline">
              / BOGOR
            </span>
          </a>

          {/* Kinetic Rolling-Text Navigation */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
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
                  className={`roll-trigger relative inline-flex items-center gap-1.5 py-1 font-mono text-[0.72rem] uppercase tracking-[0.1em] ${
                    isActive
                      ? 'font-semibold text-[var(--ink-primary)]'
                      : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
                  }`}
                >
                  <span
                    className={`text-[10px] ${
                      isActive ? 'text-[var(--accent-purple)]' : 'text-[var(--ink-muted)]'
                    }`}
                  >
                    {item.index}
                  </span>
                  <RollingText text={item.label} />
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1 left-0 h-[1.5px] w-full origin-left bg-[var(--accent-purple)] transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right Controls: PAPER / INK Polarity Switch + Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onTogglePolarity}
              aria-label={`Switch theme polarity (currently ${polarity} mode)`}
              aria-pressed={polarity === 'ink'}
              className="roll-trigger inline-flex h-8 items-center border border-[var(--line-hairline)] bg-[var(--bg-surface)] font-mono text-[10px] font-medium uppercase tracking-[0.1em] hover:border-[var(--line-strong)] cursor-pointer"
            >
              <span
                className={`flex h-full items-center px-2.5 transition-opacity ${
                  polarity === 'paper'
                    ? 'bg-[var(--bg-ink)] font-semibold text-[var(--bg-primary)]'
                    : 'text-[var(--ink-muted)]'
                }`}
              >
                Paper
              </span>
              <span aria-hidden="true" className="h-full w-px bg-[var(--line-hairline)]" />
              <span
                className={`flex h-full items-center px-2.5 transition-opacity ${
                  polarity === 'ink'
                    ? 'bg-[var(--bg-ink)] font-semibold text-[var(--bg-primary)]'
                    : 'text-[var(--ink-muted)]'
                }`}
              >
                Ink
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="flex h-8 w-8 items-center justify-center border border-[var(--line-hairline)] text-[var(--ink-primary)] hover:border-[var(--line-strong)] lg:hidden"
            >
              {isMenuOpen ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2.5 2.5L13.5 13.5M13.5 2.5L2.5 13.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 4.5H14M2 8H14M2 11.5H14" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Editorial Navigation Sheet */}
      {isMenuOpen && (
        <div
          ref={drawerRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[180] flex flex-col bg-[var(--bg-primary)] lg:hidden"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--line-hairline)] px-5">
            <span className="mono-index text-[var(--ink-muted)]">INDEX / NAVIGATION</span>
            <button
              type="button"
              data-autofocus
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex h-8 items-center gap-1.5 border border-[var(--line-hairline)] px-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--ink-primary)]"
            >
              <span>Close</span>
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center divide-y divide-[var(--line-hairline)] px-5" aria-label="Mobile navigation">
            <a
              href="#hero"
              onClick={(event) => {
                event.preventDefault();
                handleLinkClick('hero');
              }}
              className="flex items-baseline justify-between py-4"
            >
              <span className="mono-index text-[var(--accent-purple)]">00</span>
              <span className="font-display text-3xl uppercase tracking-[-0.04em]">Cover</span>
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
                  className="flex items-baseline justify-between py-4"
                >
                  <span
                    className={`mono-index ${
                      isActive ? 'text-[var(--accent-purple)]' : 'text-[var(--ink-muted)]'
                    }`}
                  >
                    {item.index}
                  </span>
                  <span
                    className={`font-display text-3xl uppercase tracking-[-0.04em] ${
                      isActive ? 'text-[var(--accent-purple)]' : 'text-[var(--ink-primary)]'
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line-hairline)] px-5 py-5">
            <a
              href={`mailto:${personal.email}`}
              className="mono-index text-[var(--ink-primary)] underline underline-offset-4"
            >
              {personal.email} ↗
            </a>
            <button
              type="button"
              onClick={onTogglePolarity}
              className="border border-[var(--line-strong)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em]"
            >
              Polarity: {polarity}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
