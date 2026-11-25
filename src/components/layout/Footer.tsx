import { portfolioData } from '../../data/portfolio';
import { prefersReducedMotionNow } from '../../hooks/useReducedMotion';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const { personal, social } = portfolioData;

  const scrollToTop = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotionNow() ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="border-t-2 border-[var(--border-strong)] bg-[var(--bg-inverted)] text-[var(--bg-primary)]">
      <div className="container-site py-12 sm:py-16">
        {/* Oversized Editorial Channel Strip */}
        <div className="grid border-[1.5px] border-[var(--border-inverted)] divide-y divide-[var(--border-inverted)] md:grid-cols-3 md:divide-x md:divide-y-0">
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 p-5 sm:p-6 hover:bg-[var(--bg-primary)] hover:text-[var(--bg-inverted)]"
            >
              <div>
                <span className="block font-mono text-xs uppercase tracking-[0.08em] opacity-70">
                  01 // REPOSITORY
                </span>
                <span className="mt-1 block font-display text-xl uppercase sm:text-2xl">
                  GitHub
                </span>
              </div>
              <span className="btn-arrow font-mono text-xl" aria-hidden="true">
                ↗
              </span>
            </a>
          )}

          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 p-5 sm:p-6 hover:bg-[var(--bg-primary)] hover:text-[var(--bg-inverted)]"
            >
              <div>
                <span className="block font-mono text-xs uppercase tracking-[0.08em] opacity-70">
                  02 // NETWORK
                </span>
                <span className="mt-1 block font-display text-xl uppercase sm:text-2xl">
                  LinkedIn
                </span>
              </div>
              <span className="btn-arrow font-mono text-xl" aria-hidden="true">
                ↗
              </span>
            </a>
          )}

          <a
            href={`mailto:${personal.email}`}
            className="group flex items-center justify-between gap-4 p-5 sm:p-6 hover:bg-[var(--bg-primary)] hover:text-[var(--bg-inverted)]"
          >
            <div className="min-w-0">
              <span className="block font-mono text-xs uppercase tracking-[0.08em] opacity-70">
                03 // DIRECT MAIL
              </span>
              <span className="mt-1 block truncate font-display text-lg uppercase sm:text-xl">
                {personal.email}
              </span>
            </div>
            <span className="btn-arrow shrink-0 font-mono text-xl" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        {/* Colophon & Back-to-Top Control */}
        <div className="mt-10 flex flex-col gap-6 border-t border-[var(--border-inverted)] pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-lg uppercase tracking-tight text-[var(--bg-primary)] sm:text-xl">
              {personal.name}
            </p>
            <p className="mt-1.5 font-sans text-sm opacity-80">
              {personal.role} · SMK Plus Pelita Nusantara · {personal.location}
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.08em] opacity-65">
              © {CURRENT_YEAR} {personal.name}. All rights reserved.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex h-11 shrink-0 items-center justify-center border-[1.5px] border-[var(--bg-primary)] bg-transparent px-4 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--bg-primary)] hover:bg-[var(--bg-primary)] hover:text-[var(--bg-inverted)] cursor-pointer"
          >
            [ ↑ TOP ]
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
