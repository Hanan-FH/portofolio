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
    <footer className="mt-20 border-t border-[#ECECF0]/15 pt-14 sm:mt-28 sm:pt-16">
      {/* Oversized Kinetic Contact & Social Links with #584CE6 Slash Hover */}
      <div className="divide-y divide-[#ECECF0]/12 border-b border-[#ECECF0]/15">
        {social.github && (
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 py-5 sm:py-7"
          >
            <div className="flex items-baseline gap-3 sm:gap-6">
              <span className="font-display text-xl text-[#584CE6] transition-transform duration-150 group-hover:translate-x-1 sm:text-2xl">
                //
              </span>
              <span className="font-display text-[clamp(1.75rem,4.4vw,3.6rem)] uppercase leading-none tracking-[-0.03em] text-[#ECECF0] group-hover:text-[#584CE6]">
                GITHUB
              </span>
            </div>
            <span className="beat-arrow font-mono text-2xl text-[#A6A6B2] group-hover:text-[#584CE6]" aria-hidden="true">
              ↗
            </span>
          </a>
        )}

        {social.linkedin && (
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 py-5 sm:py-7"
          >
            <div className="flex items-baseline gap-3 sm:gap-6">
              <span className="font-display text-xl text-[#584CE6] transition-transform duration-150 group-hover:translate-x-1 sm:text-2xl">
                //
              </span>
              <span className="font-display text-[clamp(1.75rem,4.4vw,3.6rem)] uppercase leading-none tracking-[-0.03em] text-[#ECECF0] group-hover:text-[#584CE6]">
                LINKEDIN
              </span>
            </div>
            <span className="beat-arrow font-mono text-2xl text-[#A6A6B2] group-hover:text-[#584CE6]" aria-hidden="true">
              ↗
            </span>
          </a>
        )}

        <a
          href={`mailto:${personal.email}`}
          className="group flex items-center justify-between gap-4 py-5 sm:py-7"
        >
          <div className="flex min-w-0 items-baseline gap-3 sm:gap-6">
            <span className="shrink-0 font-display text-xl text-[#584CE6] transition-transform duration-150 group-hover:translate-x-1 sm:text-2xl">
              //
            </span>
            <span className="truncate font-display text-[clamp(1rem,3.4vw,3rem)] uppercase leading-none tracking-[-0.03em] text-[#ECECF0] group-hover:text-[#584CE6]">
              {personal.email}
            </span>
          </div>
          <span className="beat-arrow shrink-0 font-mono text-2xl text-[#A6A6B2] group-hover:text-[#584CE6]" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>

      {/* Existing Credits & Crisp [ ↑ CH.00 ] Scroll-to-Top Button */}
      <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg uppercase tracking-[-0.025em] text-[#ECECF0] sm:text-xl">
            {personal.name}
          </p>
          <p className="mt-1.5 font-sans text-sm text-[#A6A6B2]">
            {personal.role} · SMK Plus Pelita Nusantara · {personal.location}
          </p>
          <p className="mt-3 mono-stamp text-[#A6A6B2]">
            © {CURRENT_YEAR} {personal.name}
          </p>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="btn-beat-light shrink-0"
        >
          <span>[ ↑ CH.00 ]</span>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
