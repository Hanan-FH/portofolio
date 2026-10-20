import { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../data/portfolio';

interface NavbarProps {
  activeSection: string;
  onNavigate?: (id: string) => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'Profile' },
  { id: 'projects', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function resolveActiveSection(section: string) {
  if (section === 'skills') return 'about';
  if (section === 'certificates') return 'projects';
  return section;
}

function BrandMark() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" aria-hidden="true">
      <path d="M3 2v20M3 12h11" stroke="currentColor" strokeWidth="2" />
      <path d="M14 2v20" stroke="#00D1FF" strokeWidth="2" />
    </svg>
  );
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { personal } = portfolioData;
  const current = resolveActiveSection(activeSection);

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
      <header className="fixed inset-x-0 top-0 z-50 h-[70px] border-b border-line bg-black/[0.88] backdrop-blur-[12px]">
        <div className="flex h-full items-center justify-between px-6 sm:px-8">
          <a
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              handleLinkClick('hero');
            }}
            className="group flex items-center gap-3 text-paper transition-opacity hover:opacity-90"
            aria-label="Hanan Fathurrozaq Hidayatullah — back to top"
          >
            <BrandMark />
            <span className="text-[1.05rem] font-bold tracking-[0.1em] text-paper">HANAN</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = current === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  className={`group relative py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-signal' : 'text-mist hover:text-paper'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-1 h-[2px] origin-left bg-signal transition-transform duration-300 ease-fluid ${
                      isActive
                        ? 'scale-x-100 shadow-[0_0_10px_rgba(0,209,255,0.55)]'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-paper md:hidden"
          >
            <span className="relative block h-3.5 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-300 ease-fluid ${
                  isMenuOpen ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-6 bg-current transition-transform duration-300 ease-fluid ${
                  isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div
          ref={drawerRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="drawer-enter fixed inset-0 z-[150] flex flex-col bg-black md:hidden"
        >
          <div className="flex h-[70px] shrink-0 items-center justify-between border-b border-line px-6">
            <a
              href="#hero"
              onClick={(event) => {
                event.preventDefault();
                handleLinkClick('hero');
              }}
              className="flex items-center gap-3 text-paper"
              aria-label="Hanan Fathurrozaq Hidayatullah — back to top"
            >
              <BrandMark />
              <span className="text-[1.05rem] font-bold tracking-[0.1em]">HANAN</span>
            </a>
            <button
              type="button"
              data-autofocus
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="-mr-2 flex h-11 w-11 items-center justify-center text-paper transition-colors hover:text-signal"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-6" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  handleLinkClick(item.id);
                }}
                aria-current={current === item.id ? 'location' : undefined}
                className="group flex items-baseline gap-5 border-b border-line py-5"
              >
                <span className="font-mono text-[0.68rem] tracking-[0.12em] text-signal">
                  0{index + 1}
                </span>
                <span
                  className={`text-[2rem] font-medium tracking-[-0.03em] transition-colors duration-200 ${
                    current === item.id ? 'text-signal' : 'text-paper group-hover:text-mist'
                  }`}
                >
                  {item.label}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto text-lg text-dim transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                >
                  ↗
                </span>
              </a>
            ))}
          </nav>

          <div className="shrink-0 border-t border-line px-6 py-6">
            <p className="meta-label mb-2">Direct contact</p>
            <a
              href={`mailto:${personal.email}`}
              className="text-sm text-mist transition-colors hover:text-signal"
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
