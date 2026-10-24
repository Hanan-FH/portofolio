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
    <footer className="relative border-t border-white/10 bg-[#070a18]/95 backdrop-blur-md">
      {/* Subtle Crepuscular Top Hairline */}
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.35) 28%, rgba(244, 63, 94, 0.4) 55%, rgba(254, 240, 138, 0.32) 78%, transparent 100%)',
        }}
      />

      <div className="container-site flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="beacon-pulse h-2 w-2 rounded-full bg-gradient-to-tr from-rose-500 to-amber-200 shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
            <p className="editorial-heading text-base font-semibold tracking-[0.14em] text-white">
              {personal.name}
            </p>
          </div>
          <p className="mt-2 text-sm text-slate-300/85">
            {personal.role} · SMK Plus Pelita Nusantara · {personal.location}
          </p>
          <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-slate-400">
            © {CURRENT_YEAR} {personal.name} — 黄昏時 Katawaredoki Edition
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3" aria-label="Footer navigation">
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] text-slate-300 transition-colors hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              GitHub
              <span className="link-arrow text-slate-400 group-hover:text-sky-300" aria-hidden="true">
                ↗
              </span>
            </a>
          )}

          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] text-slate-300 transition-colors hover:text-pink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              LinkedIn
              <span className="link-arrow text-slate-400 group-hover:text-pink-300" aria-hidden="true">
                ↗
              </span>
            </a>
          )}

          <a
            href={`mailto:${personal.email}`}
            className="group inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] text-slate-300 transition-colors hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            {personal.email}
            <span className="link-arrow text-slate-400 group-hover:text-amber-200" aria-hidden="true">
              ↗
            </span>
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex min-h-10 items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-sky-200 transition-colors hover:border-sky-300/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Back to Top ↑
          </button>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
