import { portfolioData } from '../../data/portfolio';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const { personal, social } = portfolioData;

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="relative bg-[#050714]/82 backdrop-blur-sm">
      <div className="anamorphic-streak opacity-65" aria-hidden="true" />

      <div className="container-site flex flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="beacon-pulse h-1.5 w-1.5 rounded-full bg-gradient-to-tr from-rose-500 to-amber-200 shadow-[0_0_10px_rgba(244,63,94,0.85)]" />
            <p className="mincho-editorial text-sm text-white">{personal.name}</p>
          </div>
          <p className="mt-1.5 text-xs text-slate-400">
            {personal.role} · SMK Plus Pelita Nusantara · {personal.location}
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.26em] text-slate-500">
            © {CURRENT_YEAR} {personal.name}
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Footer navigation">
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="celestial-link group inline-flex min-h-9 items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-300 hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              GitHub
              <span className="link-arrow text-sky-300" aria-hidden="true">
                ↗
              </span>
            </a>
          )}

          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="celestial-link group inline-flex min-h-9 items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-300 hover:text-pink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              LinkedIn
              <span className="link-arrow text-pink-300" aria-hidden="true">
                ↗
              </span>
            </a>
          )}

          <a
            href={`mailto:${personal.email}`}
            className="celestial-link group inline-flex min-h-9 items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-300 hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Email
            <span className="link-arrow text-amber-200" aria-hidden="true">
              ↗
            </span>
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="twilight-chip min-h-9 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Top ↑
          </button>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
