import { portfolioData } from '../../data/portfolio';
import { MagneticTilt } from '../ui/MagneticTilt';
import { GalaxyScene } from '../galaxy/GalaxyScene';

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
      <div className="container-site pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-40">
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
            <span aria-hidden="true" className="hidden sm:inline h-2 w-px bg-line-strong" />
            <span className="hidden sm:inline font-mono text-dim/80">RENDER: THREE.JS // WEBGL 2.0</span>
          </div>
        </div>

        {/* Main Hero Split Grid: Typography & Portrait Left // Prominent 3D WebGL Centerpiece Right */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* Left Column: Developer Identity, Typography, Bio, Profile & Actions */}
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
              className="hero-rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5"
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

            {/* Architectural Profile Portrait Card */}
            <div
              className="hero-rise mt-12 grid grid-cols-1 items-center gap-6 rounded-xs border border-line bg-panel/70 p-4 sm:grid-cols-12 sm:p-5"
              style={{ animationDelay: '420ms' }}
            >
              <div className="relative mx-auto w-full max-w-[11rem] sm:col-span-4 sm:mx-0">
                <MagneticTilt
                  maxTilt={4}
                  enableGlow={true}
                  className="overflow-hidden rounded-xs border border-line bg-black"
                >
                  <img
                    src={personal.profileImage}
                    alt="Hanan Fathurrozaq Hidayatullah seated at a keyboard in a green-curtained room."
                    className="aspect-[3/4] w-full object-cover object-top"
                    width={960}
                    height={1280}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </MagneticTilt>
              </div>

              <div className="sm:col-span-8">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-signal">
                  Developer Identity // Real Portrait
                </span>
                <h3 className="mt-1 text-base font-medium text-paper">Hanan Fathurrozaq Hidayatullah</h3>
                <p className="mt-1 text-xs text-mist">
                  Photographed seated at the development keyboard in Bogor, West Java.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[0.58rem] text-dim">
                  <span className="rounded-xs border border-line px-2 py-0.5">SENSOR // 960×1280</span>
                  <span className="rounded-xs border border-line px-2 py-0.5">LOCATION // BOGOR, ID</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Interactive 3D WebGL Centerpiece */}
          <div
            className="hero-rise flex flex-col lg:col-span-5"
            style={{ animationDelay: '200ms' }}
          >
            <div className="relative overflow-hidden rounded-xs border border-line bg-panel shadow-2xl transition-all duration-300 hover:border-signal/50">
              {/* 3D Viewport Header Bar */}
              <div className="flex items-center justify-between border-b border-line/80 bg-panel-raised/95 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_8px_#00d1ff]" />
                  <span className="font-mono text-[0.65rem] font-semibold tracking-[0.08em] text-paper">
                    PROCEDURAL CODE NEXUS // 3D
                  </span>
                </div>
                <span className="font-mono text-[0.58rem] tracking-[0.06em] text-dim">
                  THREE.JS · WEBGL
                </span>
              </div>

              {/* The Genuine Interactive 3D WebGL Canvas */}
              <div className="relative h-[380px] w-full sm:h-[440px] lg:h-[520px]">
                <GalaxyScene className="h-full w-full" />
              </div>

              {/* 3D Telemetry Footer */}
              <div className="border-t border-line/70 bg-panel-raised/80 px-4 py-3 font-mono text-[0.6rem] text-dim">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-signal/90">PBR PHYSICAL CLEARCOAT // 0.95 METALNESS</span>
                  <span>GYROSCOPIC TRIPLE TORUS</span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-line/40 pt-2 text-[0.58rem]">
                  <span>INTERACTIVE 360° WEBGL PERSPECTIVE</span>
                  <span className="text-mist">DRAG TO ROTATE & ILLUMINATE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
