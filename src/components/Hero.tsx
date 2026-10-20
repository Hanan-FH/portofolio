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
    <section id="hero" className="relative scroll-mt-[70px]">
      <div className="container-site grid gap-14 pb-20 pt-32 md:pt-40 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-28">
        <div className="flex flex-col lg:col-span-7">
          <div
            className="hero-rise flex flex-wrap items-center gap-x-4 gap-y-2"
            style={{ animationDelay: '40ms' }}
          >
            <span className="inline-flex items-center gap-2.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-paper">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 bg-signal shadow-[0_0_8px_rgba(0,209,255,0.7)]"
              />
              Open to internship opportunities
            </span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-line-strong sm:block" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-dim">
              Bogor, Indonesia
            </span>
          </div>

          <h1
            className="hero-rise mt-10 text-display font-semibold text-paper"
            style={{ animationDelay: '100ms' }}
            aria-label={personal.name}
          >
            <span className="block">Hanan</span>
            <span className="block">Fathurrozaq</span>
            <span className="block">Hidayatullah</span>
          </h1>

          <p
            className="hero-rise mt-7 text-sm font-medium text-paper"
            style={{ animationDelay: '170ms' }}
          >
            Software Engineering Student
            <span className="text-mist"> — SMK Plus Pelita Nusantara</span>
          </p>

          <p
            className="hero-rise mt-3 max-w-[36rem] text-lede text-mist"
            style={{ animationDelay: '220ms' }}
          >
            I build web applications, desktop tools, and interactive software. My current focus is
            TypeScript, React, server-side architectures, and structured databases.
          </p>

          <div
            className="hero-rise mt-9 flex flex-wrap items-center gap-x-7 gap-y-4"
            style={{ animationDelay: '280ms' }}
          >
            <a
              href="#projects"
              onClick={navigate('projects')}
              className="btn-solid"
            >
              View selected work
              <span className="link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a href="#contact" onClick={navigate('contact')} className="btn-quiet">
              Contact
            </a>
          </div>

          <div
            className="hero-rise mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-4 lg:mt-auto lg:pt-5"
            style={{ animationDelay: '340ms' }}
          >
            <span className="meta-label">Connect</span>
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-paper transition-colors hover:text-signal"
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
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-paper transition-colors hover:text-signal"
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

        <figure
          className="hero-rise mx-auto w-full max-w-[26rem] lg:col-span-5 lg:col-start-9 lg:mx-0"
          style={{ animationDelay: '200ms' }}
        >
          <MagneticTilt
            maxTilt={5}
            enableGlow={true}
            className="overflow-hidden border border-line bg-panel transition-colors duration-300 hover:border-signal/40"
          >
            <img
              src={personal.profileImage}
              alt="Hanan Fathurrozaq Hidayatullah seated at a keyboard in a green-curtained room."
              className="h-auto w-full object-cover"
              width={960}
              height={1280}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </MagneticTilt>
          <figcaption className="mt-3 flex items-center justify-between gap-4 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-dim">
            <span>Hanan at the keyboard</span>
            <span>Bogor, West Java</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default Hero;
