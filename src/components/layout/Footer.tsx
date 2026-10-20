import { portfolioData } from '../../data/portfolio';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const { personal } = portfolioData;

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="border-t border-line bg-black">
      <div className="container-site flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-signal" />
            <p className="font-mono text-sm font-semibold tracking-wider text-paper">
              {personal.name.toUpperCase()}
            </p>
          </div>
          <p className="mt-2 text-xs text-mist">
            Software Engineering Student · SMK Plus Pelita Nusantara · Bogor, West Java
          </p>
          <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-dim">
            © {CURRENT_YEAR} — Engineered with React 19, TypeScript & Tailwind CSS v4
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-8 gap-y-3" aria-label="Footer navigation">
          <a
            href={`mailto:${personal.email}`}
            className="group inline-flex min-h-11 items-center gap-1.5 rounded-xs px-2 -mx-2 font-mono text-xs font-medium text-mist transition-colors hover:text-signal focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            Email Dispatch
            <span className="link-arrow text-dim group-hover:text-signal" aria-hidden="true">
              ↗
            </span>
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex min-h-11 items-center font-mono text-xs text-dim transition-colors hover:text-signal focus:outline-none"
          >
            Back to Top ↑
          </button>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
