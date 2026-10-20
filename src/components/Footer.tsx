import { portfolioData } from '../data/portfolio';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const { personal, social } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-brand">
            <span className="footer-name">{personal.name}</span>
          </div>
          <p className="footer-role">
            Software Engineering Student · SMK Plus Pelita Nusantara, Bogor.
          </p>
          <div className="footer-copyright">
            © {CURRENT_YEAR} {personal.name}. All rights reserved.
          </div>
        </div>

        <div className="footer-right">
          <nav className="footer-nav" aria-label="Footer Navigation">
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub ↗
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                LinkedIn ↗
              </a>
            )}
            <a
              href={`mailto:${personal.email}`}
              className="footer-link"
            >
              Email ↗
            </a>
            <button
              type="button"
              className="footer-top-btn"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              Back to Top ↑
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
