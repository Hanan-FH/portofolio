import { portfolioData } from '../data/portfolio';
import { MagneticTilt } from './ui/MagneticTilt';

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
    <section id="hero" className="relative scroll-mt-[70px] overflow-hidden border-b border-line bg-structural-grid">
      <div className="container-site pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-40">
        {/* Top Architectural Telemetry Bar */}
        <div
          className="hero-rise flex flex-wrap items-center justify-between gap-y-3 border-b border-line pb-4"
          style={{ animationDelay: '40ms' }}
        >
          <div className="flex items-center gap-3">
            <span className="beacon-pulse h-2 w-2 rounded-full bg-signal shadow-[0_0_8px_rgba(0,209,255,0.8)]" />
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-paper">
              Open to Internship & Engineering Roles
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[0.62rem] tracking-[0.1em] text-dim">
            <span>BOGOR, ID // 6.5950°S, 106.8166°E</span>
            <span aria-hidden="true" className="h-2 w-px bg-line-strong" />
            <span className="text-signal/90">WIB · UTC+7</span>
          </div>
        </div>

        {/* Main Hero Split Grid */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          {/* Left Column: Giant Name, Identity, and CTAs */}
          <div className="flex flex-col lg:col-span-7">
            <div className="hero-rise" style={{ animationDelay: '100ms' }}>
              <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-signal">
                SOFTWARE ENGINEERING STUDENT // RPL
              </span>
              <h1
                className="mt-4 text-display font-semibold tracking-[-0.045em] text-paper"
                aria-label={personal.name}
              >
                <span className="block transition-transform duration-300 hover:translate-x-1">
                  Hanan
                </span>
                <span className="block transition-transform duration-300 hover:translate-x-1">
                  Fathurrozaq
                </span>
                <span className="block text-mist transition-transform duration-300 hover:translate-x-1 hover:text-paper">
                  Hidayatullah
                </span>
              </h1>
            </div>

            <p
              className="hero-rise mt-8 font-mono text-sm text-paper"
              style={{ animationDelay: '180ms' }}
            >
              SMK Plus Pelita Nusantara
              <span className="text-dim"> — Rekayasa Perangkat Lunak (RPL)</span>
            </p>

            <p
              className="hero-rise mt-3 max-w-[38rem] text-lede text-mist"
              style={{ animationDelay: '240ms' }}
            >
              Engineering responsive web applications, desktop systems, and interactive software with
              a focus on programming logic, clean architectures, and modern web standards.
            </p>

            {/* Action Array */}
            <div
              className="hero-rise mt-9 flex flex-wrap items-center gap-4 sm:gap-6"
              style={{ animationDelay: '300ms' }}
            >
              <a
                href="#projects"
                onClick={navigate('projects')}
                className="btn-solid"
              >
                Inspect Selected Work [03]
                <span className="link-arrow text-black" aria-hidden="true">
                  ↗
                </span>
              </a>

              <a
                href="#contact"
                onClick={navigate('contact')}
                className="btn-quiet"
              >
                Direct Message
                <span className="link-arrow text-dim" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>

            {/* Hero Connect Links (Exclusively in Hero per AGENTS.md Rule 6) */}
            <div
              className="hero-rise mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 lg:mt-16"
              style={{ animationDelay: '360ms' }}
            >
              <span className="meta-label">Connect</span>
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 font-mono text-xs font-medium text-paper transition-colors hover:text-signal"
                  aria-label="GitHub profile (opens in a new tab)"
                >
                  GitHub
                  <span className="link-arrow text-dim group-hover:text-signal" aria-hidden="true">
                    ↗
                  </span>
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 font-mono text-xs font-medium text-paper transition-colors hover:text-signal"
                  aria-label="LinkedIn profile (opens in a new tab)"
                >
                  LinkedIn
                  <span className="link-arrow text-dim group-hover:text-signal" aria-hidden="true">
                    ↗
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Architectural Profile Photograph Showcase */}
          <div
            className="hero-rise mx-auto w-full max-w-[24rem] sm:max-w-[26rem] lg:col-span-5 lg:col-start-8 lg:mx-0"
            style={{ animationDelay: '220ms' }}
          >
            <div className="relative">
              {/* Corner crosshairs for architectural staging */}
              <span className="absolute -left-2 -top-2 font-mono text-[0.7rem] leading-none text-signal/70" aria-hidden="true">+</span>
              <span className="absolute -right-2 -top-2 font-mono text-[0.7rem] leading-none text-signal/70" aria-hidden="true">+</span>
              <span className="absolute -bottom-2 -left-2 font-mono text-[0.7rem] leading-none text-signal/70" aria-hidden="true">+</span>
              <span className="absolute -bottom-2 -right-2 font-mono text-[0.7rem] leading-none text-signal/70" aria-hidden="true">+</span>

              <MagneticTilt
                maxTilt={4}
                enableGlow={true}
                className="overflow-hidden rounded-xs border border-line bg-panel p-2 shadow-2xl transition-all duration-300 hover:border-signal/50"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1px] bg-[#0c0d10]">
                  <img
                    src={personal.profileImage}
                    alt="Hanan Fathurrozaq Hidayatullah seated at a keyboard in a green-curtained room."
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-fluid hover:scale-[1.02]"
                    width={960}
                    height={1280}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="absolute bottom-2.5 right-2.5 rounded-xs border border-line/80 bg-black/85 px-2 py-0.5 font-mono text-[0.58rem] tracking-[0.1em] text-signal backdrop-blur-md">
                    SENSOR // 960×1280
                  </div>
                </div>
              </MagneticTilt>

              <div className="mt-3 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.1em] text-dim">
                <span>Hanan at the keyboard</span>
                <span>Bogor, West Java</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
