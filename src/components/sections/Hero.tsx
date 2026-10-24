import { portfolioData } from '../../data/portfolio';
import { CloudHorizonSilhouette } from '../atmosphere/KatawareSkyBackdrop';
import { MagneticTilt } from '../ui/MagneticTilt';

interface HeroProps {
  onNavigate?: (id: string) => void;
}

const ORBITAL_TICKS = Array.from({ length: 36 }, (_, i) => i * 10);

export function Hero({ onNavigate }: HeroProps) {
  const { personal, social } = portfolioData;

  const navigate = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate?.(id);
  };

  return (
    <section id="hero" className="relative scroll-mt-[84px] overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="container-site relative z-10 pb-12 sm:pb-16 lg:pb-20">
        {/* Top Astronomical Coordinate & Horizon Telemetry Strip */}
        <div
          className="hero-rise flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4"
          style={{ animationDelay: '40ms' }}
        >
          <span className="astro-label">{personal.eyebrow}</span>

          <div className="flex flex-wrap items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-sky-200/80">
            <span>6.5950°S · 106.8166°E</span>
            <span aria-hidden="true" className="h-2.5 w-px bg-white/20" />
            <span className="text-amber-200/90">黄昏時 · Katawaredoki</span>
          </div>
        </div>

        {/* Main Horizon Crossing Split Layout */}
        <div className="mt-10 grid items-center gap-14 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial Typography & Authentic Bio */}
          <div className="flex flex-col lg:col-span-7">
            {/* Atmospheric Status Pill */}
            <div className="hero-rise" style={{ animationDelay: '90ms' }}>
              <div className="twilight-badge inline-flex items-center gap-2.5 rounded-full px-4 py-1.5">
                <span className="beacon-pulse h-2 w-2 rounded-full bg-gradient-to-tr from-rose-500 to-amber-200 shadow-[0_0_12px_rgba(244,63,94,0.9)]" />
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-pink-100">
                  Available for engineering &amp; design
                </span>
              </div>
            </div>

            {/* Cinematic Editorial Display Name & Headline */}
            <div className="hero-rise mt-7" style={{ animationDelay: '150ms' }}>
              <h1 className="editorial-display text-[clamp(2.35rem,5.2vw,4.5rem)] font-semibold text-white drop-shadow-[0_8px_32px_rgba(7,10,24,0.75)]">
                {personal.name}
              </h1>

              <p className="editorial-heading mt-4 text-lg font-medium text-amber-100/95 sm:text-xl lg:text-2xl">
                {personal.headline}
              </p>
            </div>

            {/* Verbatim Authentic Bio Paragraph */}
            <p
              className="hero-rise mt-6 max-w-[39rem] text-[1.05rem] leading-[1.82] text-slate-200/92 sm:text-[1.12rem]"
              style={{ animationDelay: '220ms' }}
            >
              {personal.shortBio}
            </p>

            {/* Primary Comet-Glow & Secondary Glass Action Buttons */}
            <div
              className="hero-rise mt-9 flex flex-wrap items-center gap-4"
              style={{ animationDelay: '290ms' }}
            >
              <a href="#projects" onClick={navigate('projects')} className="btn-comet">
                <span>Explore Selected Works</span>
                <span className="link-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>

              <a href="#contact" onClick={navigate('contact')} className="btn-twilight">
                <span>Get in Touch</span>
                <span className="link-arrow text-sky-200" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>

            {/* Official Connect Links (GitHub ↗ & LinkedIn ↗) */}
            <div
              className="hero-rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-5"
              style={{ animationDelay: '350ms' }}
            >
              <span className="astro-label">Celestial Links</span>

              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                  className="group inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.16em] text-slate-100 transition-colors hover:bg-white/5 hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  GitHub
                  <span className="link-arrow text-sky-300" aria-hidden="true">
                    ↗
                  </span>
                </a>
              )}

              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in a new tab)"
                  className="group inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.16em] text-slate-100 transition-colors hover:bg-white/5 hover:text-pink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  LinkedIn
                  <span className="link-arrow text-pink-300" aria-hidden="true">
                    ↗
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Astronomical Astrolabe Portrait Frame */}
          <div
            className="hero-rise relative mx-auto flex w-full max-w-[27rem] flex-col items-center lg:col-span-5"
            style={{ animationDelay: '180ms' }}
          >
            <div className="relative flex w-full items-center justify-center py-6 sm:py-8">
              {/* Atmospheric Crepuscular Rim Backlighting Halo */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-4 rounded-full opacity-80 blur-3xl"
                style={{
                  background:
                    'radial-gradient(circle at 32% 28%, rgba(254, 240, 138, 0.32) 0%, rgba(244, 63, 94, 0.28) 42%, rgba(56, 189, 248, 0.24) 74%, transparent 100%)',
                }}
              />

              {/* Concentric Rotating Astronomical Astrolabe Rings (SVG) */}
              <svg
                viewBox="0 0 440 440"
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
              >
                <defs>
                  <linearGradient id="astrolabeGoldCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" stopOpacity="0.72" />
                    <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.48" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.68" />
                  </linearGradient>
                  <linearGradient id="astrolabeRoseArc" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
                    <stop offset="55%" stopColor="#c084fc" stopOpacity="0.42" />
                    <stop offset="100%" stopColor="#ea580c" stopOpacity="0.58" />
                  </linearGradient>
                </defs>

                {/* Outer Degree Ring + Orbital Ticks */}
                <g className="astrolabe-ring-cw">
                  <circle
                    cx="220"
                    cy="220"
                    r="204"
                    fill="none"
                    stroke="url(#astrolabeGoldCyan)"
                    strokeWidth="0.9"
                    opacity="0.75"
                  />
                  {ORBITAL_TICKS.map((deg) => {
                    const isMajor = deg % 30 === 0;
                    return (
                      <line
                        key={deg}
                        x1="220"
                        y1={isMajor ? '10' : '14'}
                        x2="220"
                        y2="19"
                        stroke={isMajor ? '#fef08a' : '#38bdf8'}
                        strokeWidth={isMajor ? '1.3' : '0.75'}
                        opacity={isMajor ? '0.8' : '0.42'}
                        transform={`rotate(${deg} 220 220)`}
                      />
                    );
                  })}
                  {/* Leading Tiamat Cyan Orbital Node */}
                  <circle cx="220" cy="16" r="3.5" fill="#ffffff" />
                  <circle cx="220" cy="16" r="7" fill="#38bdf8" opacity="0.38" />
                </g>

                {/* Middle Counter-Rotating Dashed Ecliptic Ring */}
                <g className="astrolabe-ring-ccw">
                  <circle
                    cx="220"
                    cy="220"
                    r="186"
                    fill="none"
                    stroke="url(#astrolabeRoseArc)"
                    strokeWidth="1.1"
                    strokeDasharray="8 6 2 6"
                  />
                  {/* Secondary Ruby-Rose Fragment Node */}
                  <circle cx="381" cy="127" r="3" fill="#f43f5e" />
                  <circle cx="381" cy="127" r="6.5" fill="#f43f5e" opacity="0.32" />
                </g>

                {/* Inner Celestial Meridian Arcs */}
                <g className="astrolabe-ring-slow">
                  <circle
                    cx="220"
                    cy="220"
                    r="168"
                    fill="none"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="0.75"
                    strokeDasharray="24 14"
                  />
                  <line
                    x1="220"
                    y1="38"
                    x2="220"
                    y2="58"
                    stroke="#fef08a"
                    strokeWidth="1"
                    opacity="0.65"
                  />
                  <line
                    x1="220"
                    y1="382"
                    x2="220"
                    y2="402"
                    stroke="#38bdf8"
                    strokeWidth="1"
                    opacity="0.65"
                  />
                </g>
              </svg>

              {/* Authentic Profile Photograph Framed in Crepuscular Glass */}
              <MagneticTilt maxTilt={3.5} className="relative z-10 w-[76%] max-w-[19.5rem]">
                <div className="crepuscular-card overflow-hidden rounded-[1.75rem] p-2.5">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.25rem] bg-[#070a18]">
                    <img
                      src={personal.profileImage}
                      alt={personal.name}
                      width={960}
                      height={1280}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className="h-full w-full object-cover object-top"
                    />

                    {/* Subtle Crepuscular Horizon Sheen Along Portrait Edge */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-[1.25rem] ring-1 ring-inset ring-amber-200/25"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(254,240,138,0.06) 0%, transparent 38%, rgba(7,10,24,0.58) 100%)',
                      }}
                    />

                    {/* Astronomical Coordinate Caption Overlay */}
                    <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/15 bg-[#070a18]/75 px-3.5 py-2.5 backdrop-blur-md">
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-amber-200/90">
                        {personal.role}
                      </p>
                      <p className="mt-0.5 truncate text-xs font-medium text-white">
                        {personal.status}
                      </p>
                      <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-sky-200/80">
                        {personal.location}
                      </p>
                    </div>
                  </div>
                </div>
              </MagneticTilt>
            </div>
          </div>
        </div>
      </div>

      {/* Layered Backlit Cloud Horizon Silhouette */}
      <CloudHorizonSilhouette variant="hero" />
    </section>
  );
}

export default Hero;
