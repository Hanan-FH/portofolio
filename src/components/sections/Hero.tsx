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
    <section
      id="hero"
      className="manga-chapter relative z-[11] flex min-h-[100svh] items-center bg-[#ECECF0] pt-20 pb-[calc(var(--cut)+3.5rem)] text-[#060608]"
    >
      {/* Back Layer: Subtle Radial Speedlines & Oversized Watermark Chapter Number */}
      <div aria-hidden="true" className="parallax-back pointer-events-none absolute inset-0 overflow-hidden">
        <div className="manga-speedlines absolute inset-0 text-[#060608]" />
        <span className="absolute -bottom-8 left-4 select-none font-display text-[clamp(9rem,22vw,20rem)] leading-none text-[#060608]/[0.04] sm:left-10">
          00
        </span>
      </div>

      {/* Front Layer: Vertical & Tilted Electric-Violet (#584CE6) Stamps Echoing addo.jpg */}
      <div
        aria-hidden="true"
        className="parallax-front pointer-events-none absolute right-3 top-24 z-30 hidden xl:block"
      >
        <span className="vertical-stamp font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#584CE6]">
          CH.00 // OPENING SPREAD — BOGOR
        </span>
      </div>

      <div className="container-site relative z-20 w-full">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
          {/* Left Focal Zone: Kinetic Line-Rise Display Title, Bio & Beat-Drop CTAs */}
          <div className="parallax-mid relative z-20 lg:col-span-6">
            {/* Tilted #584CE6 Chapter Stamp */}
            <div className="hero-cut-fade mb-5 flex flex-wrap items-center gap-3" style={{ '--d': '40ms' } as React.CSSProperties}>
              <span className="inline-block -rotate-2 bg-[#584CE6] px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white">
                CH.00 // OPENING
              </span>
              <span className="mono-stamp text-[#4E4E57]">{personal.eyebrow}</span>
            </div>

            {/* Tight 60ms Staggered Kinetic Line-Rise Display Name */}
            <h1 aria-label={personal.name} className="uppercase tracking-[-0.035em] text-[#060608]">
              <span className="hero-line-mask">
                <span
                  style={{ '--d': '60ms' } as React.CSSProperties}
                  className="hero-line-rise text-[clamp(3.1rem,7.2vw,6.4rem)] leading-[0.9]"
                >
                  HANAN
                </span>
              </span>
              <span className="hero-line-mask">
                <span
                  style={{ '--d': '120ms' } as React.CSSProperties}
                  className="hero-line-rise text-[clamp(1.95rem,4.4vw,3.95rem)] leading-[0.92]"
                >
                  FATHURROZAQ
                </span>
              </span>
              <span className="hero-line-mask">
                <span
                  style={{ '--d': '180ms' } as React.CSSProperties}
                  className="hero-line-rise flex items-baseline gap-3 text-[clamp(1.8rem,4.1vw,3.65rem)] leading-[0.92]"
                >
                  <span>HIDAYATULLAH</span>
                  <span
                    aria-hidden="true"
                    className="-rotate-6 font-mono text-xs font-semibold tracking-[0.08em] text-[#584CE6] sm:text-sm"
                  >
                    //26
                  </span>
                </span>
              </span>
            </h1>

            <div
              style={{ '--d': '240ms' } as React.CSSProperties}
              className="hero-cut-fade mt-6 max-w-xl"
            >
              <p className="font-sans text-lg font-bold leading-snug text-[#060608] sm:text-xl">
                {personal.headline}
              </p>

              <p className="mt-3 text-base leading-[1.65] text-[#4E4E57]">
                {personal.shortBio}
              </p>

              {/* Beat-Drop Action Links */}
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a href="#projects" onClick={navigate('projects')} className="btn-beat-dark">
                  <span>Selected Works</span>
                  <span className="beat-arrow" aria-hidden="true">→</span>
                </a>

                <a href="#contact" onClick={navigate('contact')} className="btn-beat-ghost">
                  <span>Get in Touch</span>
                  <span className="beat-arrow" aria-hidden="true">→</span>
                </a>
              </div>

              {/* Authentic Social & Direct Coordinates */}
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
                <span className="mono-stamp text-[#584CE6]">{personal.location}</span>
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile (opens in a new tab)"
                    className="mono-stamp inline-flex items-center gap-1 text-[#060608] hover:text-[#584CE6]"
                  >
                    <span>GitHub</span>
                    <span className="beat-arrow" aria-hidden="true">↗</span>
                  </a>
                )}
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile (opens in a new tab)"
                    className="mono-stamp inline-flex items-center gap-1 text-[#060608] hover:text-[#584CE6]"
                  >
                    <span>LinkedIn</span>
                    <span className="beat-arrow" aria-hidden="true">↗</span>
                  </a>
                )}
                <a
                  href={`mailto:${personal.email}`}
                  className="mono-stamp inline-flex items-center gap-1 text-[#4E4E57] hover:text-[#584CE6]"
                >
                  <span>{personal.email}</span>
                  <span className="beat-arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Focal Zone: Frameless Seamlessly-Blended addo.jpg Opening Spread Centerpiece */}
          <div className="relative z-10 lg:col-span-6">
            <figure className="relative lg:-ml-8 lg:w-[calc(100%+2.5rem)]">
              {/* Floating Tilted Violet Stamp */}
              <div
                aria-hidden="true"
                className="parallax-front pointer-events-none absolute -top-4 right-2 z-20"
              >
                <span className="inline-block rotate-2 bg-[#060608] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ECECF0]">
                  <span className="text-[#584CE6]">//</span> {personal.role}
                </span>
              </div>

              {/* 0.65s Opening Slice + Punch-Zoom Impact Seamlessly Masked into #ECECF0 */}
              <div className="hero-opening-slice hero-art-mask relative aspect-[16/9.4] w-full overflow-hidden bg-[#ECECF0]">
                <OptimizedPicture
                  src={personal.profileImage}
                  alt={`${personal.name} — Opening manga illustration`}
                  width={736}
                  height={414}
                  eager
                  fetchPriority="high"
                  className="hero-opening-punch h-full w-full object-cover [object-position:55%_35%] contrast-[1.06]"
                />
              </div>

              <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">
                <span className="mono-stamp font-semibold text-[#060608]">
                  <span className="text-[#584CE6]">/</span> {personal.role}
                </span>
                <span className="mono-stamp text-[#4E4E57]">{personal.status}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
