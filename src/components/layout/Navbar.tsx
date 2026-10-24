import { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../../data/portfolio';

interface NavbarProps {
  activeSection: string;
  onNavigate?: (id: string) => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'Profile' },
  { id: 'skills', label: 'Capabilities' },
  { id: 'projects', label: 'Portfolio' },
  { id: 'certificates', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function BrandAstrolabeMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="brandOrbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <circle
        cx="14"
        cy="14"
        r="11.5"
        stroke="url(#brandOrbitGrad)"
        strokeWidth="1.15"
        strokeDasharray="3 2.5"
        opacity="0.85"
      />
      <path
        d="M9.5 8.5v11M9.5 14h9"
        stroke="#f8fafc"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M18.5 8.5v11"
        stroke="#38bdf8"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <circle cx="18.5" cy="8.5" r="2" fill="#fef08a" />
    </svg>
  );
}

/**
 * Floating Twilight Glass Navigation Bar with chromatic crepuscular border,
 * authentic HANAN monogram, section anchors, and pulsing rose-gold celestial beacon.
 */
export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { personal } = portfolioData;

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
        (element) => element.offsetParent !== null
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
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
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <div className="crepuscular-card mx-auto flex h-[62px] max-w-[78rem] items-center justify-between rounded-full px-4 sm:px-6">
          {/* Authentic Brand Monogram */}
          <a
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              handleLinkClick('hero');
            }}
            className="group flex items-center gap-3 rounded-full py-1 pr-2 text-slate-50 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label={`${personal.name} — Return to top`}
          >
            <BrandAstrolabeMark />
            <div className="flex items-baseline gap-2">
              <span className="font-display text-sm font-semibold tracking-[0.24em] text-white sm:text-[0.95rem]">
                HANAN
              </span>
              <span
                aria-hidden="true"
                className="hidden font-serif text-[0.7rem] tracking-[0.18em] text-pink-200/75 xl:inline"
              >
                黄昏時
              </span>
            </div>
          </a>

          {/* Primary Navigation Links */}
          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            <nav className="flex items-center gap-1 xl:gap-2" aria-label="Primary navigation">
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
                    className={`relative rounded-full px-3.5 py-1.5 font-sans text-[0.82rem] font-medium tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      isActive
                        ? 'bg-white/10 text-white shadow-[inset_0_1px_0_rgba(254,240,138,0.35)]'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3.5 -bottom-[2px] h-[2px] rounded-full bg-gradient-to-r from-amber-200 via-rose-400 to-sky-400"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            <span aria-hidden="true" className="h-4 w-px bg-white/15" />

            {/* Celestial Status Indicator (Pulsing Rose-Gold Dot) */}
            <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#070a18]/55 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-pink-100/90">
              <span className="beacon-pulse h-2 w-2 rounded-full bg-gradient-to-tr from-rose-500 to-amber-300 shadow-[0_0_10px_rgba(244,63,94,0.85)]" />
              <span>RPL · Bogor</span>
            </div>
          </div>

          {/* Mobile Drawer Toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-100 transition-colors hover:border-sky-300/60 hover:text-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 lg:hidden"
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-[1.8px] w-5 rounded-full bg-current transition-transform duration-300 ${
                  isMenuOpen ? 'translate-y-[6px] rotate-45 text-sky-300' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] h-[1.8px] w-5 rounded-full bg-current transition-opacity duration-200 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[1.8px] w-5 rounded-full bg-current transition-transform duration-300 ${
                  isMenuOpen ? '-translate-y-[6px] -rotate-45 text-sky-300' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Responsive Mobile Twilight Glass Drawer */}
      {isMenuOpen && (
        <div
          ref={drawerRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="drawer-enter fixed inset-0 z-[180] flex flex-col bg-[#070a18]/92 backdrop-blur-2xl lg:hidden"
        >
          <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-6">
            <a
              href="#hero"
              onClick={(event) => {
                event.preventDefault();
                handleLinkClick('hero');
              }}
              className="flex items-center gap-3 rounded-full py-1 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label={`${personal.name} — Return to top`}
            >
              <BrandAstrolabeMark />
              <span className="font-display text-sm font-semibold tracking-[0.24em]">HANAN</span>
            </a>

            <button
              type="button"
              data-autofocus
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-100 transition-colors hover:border-sky-300 hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col justify-center overflow-y-auto px-6 py-8"
            aria-label="Mobile navigation"
          >
            {NAV_ITEMS.map((item, index) => {
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
                  className="group flex items-baseline gap-5 border-b border-white/10 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <span className="font-mono text-xs tracking-[0.24em] text-pink-300/85">
                    0{index + 1}
                  </span>
                  <span
                    className={`editorial-heading text-2xl font-medium transition-colors duration-200 ${
                      isActive ? 'text-amber-200' : 'text-white group-hover:text-sky-200'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto font-mono text-base text-slate-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-300"
                  >
                    ↗
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="shrink-0 border-t border-white/10 bg-[#070a18]/80 px-6 py-6">
            <p className="astro-label mb-2">Direct Transmission</p>
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 font-mono text-sm text-sky-200 transition-colors hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              {personal.email}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
