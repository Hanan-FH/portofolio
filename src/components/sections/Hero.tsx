import { portfolioData } from '../../data/portfolio';
import { OptimizedPicture } from '../ui/OptimizedPicture';

interface HeroProps {
  onNavigate?: (id: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { personal, social } = portfolioData;

  const navigate = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate?.(id);
  };

  return (
    <section id="hero" className="relative scroll-mt-16 py-8 sm:py-12 lg:py-16">
      <div className="container-site">
        {/* Asymmetrical Manga / Swiss Editorial Cover Frame */}
        <div className="border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-[6px_6px_0px_var(--border-strong)]">
          {/* Top Publication Masthead Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-[1.5px] border-[var(--border-strong)] bg-[var(--bg-primary)] px-4 py-2.5 sm:px-8">
            <span className="mono-label text-[var(--ink-primary)]">
              {personal.eyebrow}
            </span>
            <span className="mono-label text-[var(--ink-muted)]">
              {personal.location}
            </span>
          </div>

          <div className="grid lg:grid-cols-12">
            {/* Left Column: Oversized Editorial Display Typography & Bio */}
            <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-7 lg:p-14">
              <div>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-block h-[3px] w-7 bg-[var(--accent-indigo)]"
                  />
                  <span className="mono-label text-[var(--ink-muted)]">
                    COVER // PORTFOLIO MONOGRAPH
                  </span>
                </div>

                <h1 className="display-hero mt-5 text-[clamp(1.85rem,5vw,4.5rem)] uppercase">
                  {personal.name}
                </h1>

                <div
                  aria-hidden="true"
                  className="my-6 h-[1.5px] w-full bg-[var(--border-strong)]"
                />

                <p className="font-sans text-lg font-bold leading-snug text-[var(--ink-primary)] sm:text-xl">
                  {personal.headline}
                </p>

                <p className="mt-4 text-base leading-[1.65] text-[var(--ink-secondary)]">
                  {personal.shortBio}
                </p>

                {/* Primary & Secondary Brutalist CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a href="#projects" onClick={navigate('projects')} className="btn-ink">
                    <span>Selected Works</span>
                    <span className="btn-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>

                  <a href="#contact" onClick={navigate('contact')} className="btn-paper">
                    <span>Get in Touch</span>
                    <span className="btn-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </div>
              </div>

              {/* Authentic Social & Contact Ledger */}
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--border-subtle)] pt-6">
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile (opens in a new tab)"
                    className="inline-flex items-center gap-1.5 px-2 py-1 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ink-primary)] hover:bg-[var(--bg-inverted)] hover:text-[var(--bg-primary)]"
                  >
                    <span>GitHub</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}

                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile (opens in a new tab)"
                    className="inline-flex items-center gap-1.5 px-2 py-1 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ink-primary)] hover:bg-[var(--bg-inverted)] hover:text-[var(--bg-primary)]"
                  >
                    <span>LinkedIn</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}

                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-1.5 px-2 py-1 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ink-primary)] hover:bg-[var(--bg-inverted)] hover:text-[var(--bg-primary)]"
                >
                  <span>{personal.email}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {/* Right Column: Manga Splash Portrait Panel on Pure CSS Halftone Field */}
            <div className="halftone-surface flex flex-col items-center justify-center border-t-[1.5px] border-[var(--border-strong)] p-6 sm:p-10 lg:col-span-5 lg:border-l-[1.5px] lg:border-t-0">
              <figure className="manga-card group w-full max-w-[21rem] p-3">
                <div className="mb-2.5 flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                  <span className="mono-label text-[var(--ink-primary)]">
                    FIG. 01 // PORTRAIT
                  </span>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--ink-muted)]">
                    RPL
                  </span>
                </div>

                <div className="relative aspect-[3/4] w-full overflow-hidden border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-subtle)]">
                  <OptimizedPicture
                    src={personal.profileImage}
                    alt={personal.name}
                    width={960}
                    height={1280}
                    eager
                    fetchPriority="high"
                    className="editorial-media h-full w-full object-cover object-top"
                  />
                </div>

                <figcaption className="mt-3 border-t-[1.5px] border-[var(--border-strong)] pt-2.5">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ink-primary)]">
                    {personal.role}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-[var(--ink-secondary)]">
                    {personal.status}
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
