import { portfolioData } from '../../data/portfolio';
import { prefersReducedMotionNow } from '../../hooks/useReducedMotion';
import { RollingText } from '../ui/RollingText';

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
    <footer className="border-t border-[rgba(244,244,241,0.16)] bg-[#090909] text-[#F4F4F1]">
      <div className="container-site py-20 sm:py-24">
        <div className="mb-10 flex items-center justify-between">
          <span className="mono-index text-[#5B58EB]">COLOPHON / DIRECTORY</span>
          <span className="mono-index text-[#8A8A84]">{personal.location}</span>
        </div>

        {/* Oversized Kinetic Editorial Links */}
        <div className="divide-y divide-[rgba(244,244,241,0.16)] border-y border-[rgba(244,244,241,0.16)]">
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="roll-trigger group flex items-center justify-between gap-4 py-6 sm:py-8"
            >
              <div className="flex items-baseline gap-4 sm:gap-8">
                <span className="mono-index text-[#8A8A84] group-hover:text-[#5B58EB]">
                  01
                </span>
                <span className="font-display text-[clamp(1.75rem,4vw,3.5rem)] uppercase leading-none tracking-[-0.04em] text-[#F4F4F1]">
                  <RollingText text="GitHub" />
                </span>
              </div>
              <span className="kinetic-arrow font-mono text-2xl text-[#8A8A84] group-hover:text-[#5B58EB]" aria-hidden="true">
                ↗
              </span>
            </a>
          )}

          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="roll-trigger group flex items-center justify-between gap-4 py-6 sm:py-8"
            >
              <div className="flex items-baseline gap-4 sm:gap-8">
                <span className="mono-index text-[#8A8A84] group-hover:text-[#5B58EB]">
                  02
                </span>
                <span className="font-display text-[clamp(1.75rem,4vw,3.5rem)] uppercase leading-none tracking-[-0.04em] text-[#F4F4F1]">
                  <RollingText text="LinkedIn" />
                </span>
              </div>
              <span className="kinetic-arrow font-mono text-2xl text-[#8A8A84] group-hover:text-[#5B58EB]" aria-hidden="true">
                ↗
              </span>
            </a>
          )}

          <a
            href={`mailto:${personal.email}`}
            className="roll-trigger group flex items-center justify-between gap-4 py-6 sm:py-8"
          >
            <div className="flex min-w-0 items-baseline gap-3 sm:gap-8">
              <span className="mono-index shrink-0 text-[#8A8A84] group-hover:text-[#5B58EB]">
                03
              </span>
              <span className="min-w-0 overflow-hidden font-display text-[clamp(0.92rem,3.2vw,3rem)] uppercase leading-none tracking-[-0.04em] text-[#F4F4F1]">
                <RollingText text={personal.email} />
              </span>
            </div>
            <span className="kinetic-arrow shrink-0 font-mono text-2xl text-[#8A8A84] group-hover:text-[#5B58EB]" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        {/* Credits & Smooth Back-to-Top */}
        <div className="mt-14 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-lg uppercase tracking-[-0.03em] text-[#F4F4F1] sm:text-xl">
              {personal.name}
            </p>
            <p className="mt-2 font-sans text-sm text-[#BEBEB8]">
              {personal.role} · SMK Plus Pelita Nusantara · {personal.location}
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[#8A8A84]">
              © {CURRENT_YEAR} {personal.name}
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="roll-trigger inline-flex h-11 shrink-0 items-center gap-2.5 border border-[rgba(244,244,241,0.3)] px-5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[#F4F4F1] hover:border-[#5B58EB] hover:bg-[#5B58EB] hover:text-white cursor-pointer"
          >
            <RollingText text="Back to Top" />
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
