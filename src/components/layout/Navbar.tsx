import { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../../data/portfolio';

interface NavbarProps {
  activeSection: string;
  isAssembled?: boolean;
  onNavigate?: (id: string) => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'Journey' },
  { id: 'skills', label: 'Capabilities' },
  { id: 'projects', label: 'Works' },
  { id: 'certificates', label: 'Vault' },
  { id: 'contact', label: 'Contact' },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Atmospheric Kumihimo Glass Navigation Bar.
 * Ultra-thin fixed top bar with deep indigo twilight glass (backdrop-blur-md)
 * and a 1px bottom border catching horizon amber.
 */
export function Navbar({ activeSection, isAssembled = true, onNavigate }: NavbarProps) {
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
      <header
        className={`fixed inset-x-0 top-0 z-50 h-14 bg-[#080c24]/75 backdrop-blur-md transition-[transform,opacity] duration-700 ${
          isAssembled ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
        }`}
      >
        <div className="container-site flex h-full items-center justify-between">
          {/* Minimalist Editorial Monogram */}
          <a
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              handleLinkClick('hero');
            }}
            aria-label={`${personal.name} — Return to top`}
            className="group flex items-center gap-3 py-1 text-white transition-opacity hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-[2px] border border-amber-200/35 bg-[#0d1435]/80 font-serif text-xs tracking-normal text-amber-100">
              H
            </span>
            <span className="mincho-display text-xs font-medium tracking-[0.26em]">
              HANAN
            </span>
          </a>

          {/* Clean Anchor Links & Animated Rose-Gold Celestial Status Dot */}
          <div className="hidden items-center gap-7 lg:flex">
            <nav className="flex items-center gap-6" aria-label="Primary navigation">
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
                    className={`relative py-1 font-mono text-[11px] uppercase tracking-[0.22em] transition-opacity duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      isActive ? 'text-amber-100 opacity-100' : 'text-slate-300 opacity-75 hover:opacity-100'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-[9px] h-[1.5px] bg-gradient-to-r from-sky-400 via-rose-400 to-amber-200 transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            <span aria-hidden="true" className="h-3.5 w-px bg-white/15" />

            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.34em] text-slate-300">
              <span className="beacon-pulse h-1.5 w-1.5 rounded-full bg-gradient-to-tr from-rose-500 to-amber-200" />
              <span>RPL · Bogor</span>
            </div>
          </div>

          {/* Mobile Drawer Trigger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="flex h-9 w-9 items-center justify-center rounded-[2px] border border-white/15 bg-white/5 text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 lg:hidden"
          >
            <span className="relative block h-3 w-4.5" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-4.5 bg-current transition-transform duration-300 ${
                  isMenuOpen ? 'translate-y-[5px] rotate-45 text-amber-200' : ''
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] w-4.5 bg-current transition-transform duration-300 ${
                  isMenuOpen ? '-translate-y-[5.5px] -rotate-45 text-amber-200' : ''
                }`}
              />
            </span>
          </button>
        </div>

        {/* 1px Bottom Border Catching Horizon Amber */}
        <div
          aria-hidden="true"
          className="h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, rgba(56, 189, 248, 0.24) 0%, rgba(109, 17, 70, 0.52) 38%, rgba(194, 65, 12, 0.62) 68%, rgba(253, 224, 71, 0.58) 86%, rgba(56, 189, 248, 0.18) 100%)',
          }}
        />
      </header>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div
          ref={drawerRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="drawer-enter fixed inset-0 z-[180] flex flex-col bg-[#050714]/95 backdrop-blur-xl lg:hidden"
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-6">
            <span className="mincho-display text-xs tracking-[0.26em]">HANAN</span>
            <button
              type="button"
              data-autofocus
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation"
              className="flex h-9 w-9 items-center justify-center rounded-[2px] border border-white/20 text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-6" aria-label="Mobile navigation">
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
                  <span className="astro-coord">0{index + 1}</span>
                  <span
                    className={`mincho-sub text-2xl ${
                      isActive ? 'text-amber-200' : 'text-slate-100'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span aria-hidden="true" className="ml-auto font-mono text-sm text-sky-300">
                    ↗
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="border-t border-white/10 px-6 py-5">
            <a
              href={`mailto:${personal.email}`}
              className="font-mono text-xs tracking-[0.14em] text-sky-200 hover:text-amber-200"
            >
              {personal.email} ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
