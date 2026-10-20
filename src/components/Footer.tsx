import { portfolioData } from '../data/portfolio';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const { personal } = portfolioData;

  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-paper">{personal.name}</p>
          <p className="mt-1 text-xs text-dim">
            Software Engineering Student · SMK Plus Pelita Nusantara · Bogor, West Java
          </p>
          <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-dim">
            © {CURRENT_YEAR} — Engineered with React, TypeScript & Tailwind CSS
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3" aria-label="Footer navigation">
          <a
            href={`mailto:${personal.email}`}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-mist transition-colors hover:text-signal"
          >
            Email
            <span className="link-arrow text-dim group-hover:text-signal" aria-hidden="true">
              ↗
            </span>
          </a>
          <a
            href="#hero"
            className="inline-flex min-h-11 items-center font-mono text-xs text-dim transition-colors hover:text-paper"
          >
            Back to top ↑
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
