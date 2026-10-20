import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';

interface NavbarProps {
  activeSection: string;
  onNavigate?: (id: string) => void;
}

const NAV_ITEMS = [
  { id: 'about', label: 'About', num: '// 01' },
  { id: 'projects', label: 'Projects', num: '// 02' },
  { id: 'skills', label: 'Skills', num: '// 03' },
  { id: 'certificates', label: 'Certificates', num: '// 04' },
  { id: 'contact', label: 'Contact', num: '// 05' },
];

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { personal } = portfolioData;

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('drawer-locked');
    } else {
      document.body.classList.remove('drawer-locked');
    }
    return () => {
      document.body.classList.remove('drawer-locked');
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a
          href="#hero"
          className="nav-brand"
          aria-label="Hanan Fathurrozaq Hidayatullah - Home"
          onClick={() => handleLinkClick('hero')}
        >
          <span className="nav-brand-mark" aria-hidden="true">H</span>
          <span className="nav-brand-text">HANAN</span>
        </a>

        <nav className="nav-menu" aria-label="Primary Navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link${activeSection === item.id ? ' active' : ''}`}
              onClick={() => handleLinkClick(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? 'CLOSE ✕' : 'MENU ☰'}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="mobile-drawer"
          role="dialog"
          aria-label="Mobile Navigation Drawer"
          aria-modal="true"
        >
          <div className="mobile-nav-links">
            <a
              href="#hero"
              className="mobile-nav-link"
              onClick={() => handleLinkClick('hero')}
            >
              <span className="mobile-nav-left">
                <span className="mobile-nav-num">// 00</span>
                <span className="mobile-nav-text">Home</span>
              </span>
              <span className="mobile-nav-arrow" aria-hidden="true">↗</span>
            </a>

            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`mobile-nav-link${activeSection === item.id ? ' active' : ''}`}
                onClick={() => handleLinkClick(item.id)}
              >
                <span className="mobile-nav-left">
                  <span className="mobile-nav-num">{item.num}</span>
                  <span className="mobile-nav-text">{item.label}</span>
                </span>
                <span className="mobile-nav-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>

          <div className="mobile-drawer-footer">
            <div className="mobile-drawer-status">
              <span className="status-dot-pulse" aria-hidden="true" />
              <span>{personal.status}</span>
            </div>
            <a
              href={`mailto:${personal.email}`}
              className="mobile-drawer-email"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>{personal.email}</span> ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
