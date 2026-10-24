import { portfolioData } from '../../data/portfolio';
import { CloudHorizonBank } from '../atmosphere/CloudHorizonBank';
import { MagneticTilt } from '../ui/MagneticTilt';
import { OptimizedPicture } from '../ui/OptimizedPicture';

interface HeroProps {
  isAssembled?: boolean;
  onNavigate?: (id: string) => void;
}

const DEGREE_TICKS = Array.from({ length: 72 }, (_, i) => i * 5);

export function Hero({ isAssembled = true, onNavigate }: HeroProps) {
  const { personal, social } = portfolioData;

  const navigate = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate?.(id);
  };

  const staggerClass = (delayMs: number) => ({
    transitionDelay: isAssembled ? `${delayMs}ms` : '0ms',
  });

  return (
    <section
      id="hero"
      className="relative scroll-mt-[72px] overflow-hidden pt-24 sm:pt-28 lg:pt-32"
    >
      <div className="container-site relative z-10 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial Mincho Phototypesetting & Authentic Bio */}
          <div className="flex flex-col lg:col-span-7">
            {/* Micro-Badge: Astronomical Ephemeris Notation */}
            <div
              style={staggerClass(40)}
              className={`transition-[transform,opacity] duration-700 ${
                isAssembled ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <div className="twilight-chip inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5">
                <span className="beacon-pulse h-1.5 w-1.5 rounded-full bg-gradient-to-tr from-rose-500 to-amber-200" />
                <span className="ephemeris-label">
                  RA 20h 42m // DEC +45°16′ // KATAWARE_INTERVAL
                </span>
                <span aria-hidden="true" className="h-2.5 w-px bg-white/15" />
                <span className="font-mono text-[9px] uppercase tracking-[0.34em] text-amber-200/85">
                  {personal.eyebrow}
                </span>
              </div>
            </div>

            {/* Primary Display Heading: Restrained Morisawa-Inspired Serif */}
            <div
              style={staggerClass(120)}
              className={`mt-7 transition-[transform,opacity] duration-700 ${
                isAssembled ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
            >
              <h1 className="mincho-display text-[clamp(2rem,4.4vw,3.9rem)]">
                {personal.name}
              </h1>

              {/* 1px Anamorphic Horizon Rule */}
              <div className="my-5 max-w-md">
                <div className="anamorphic-streak" aria-hidden="true" />
              </div>

              <p className="mincho-sub text-base text-slate-200 sm:text-lg lg:text-xl">
                {personal.headline}
              </p>
            </div>

            {/* Verbatim Authentic Biographical Introduction */}
            <p
              style={staggerClass(200)}
              className={`mt-5 max-w-[36rem] text-[0.95rem] leading-[1.6] text-slate-300 transition-[transform,opacity] duration-700 sm:text-base ${
                isAssembled ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
            >
              {personal.shortBio}
            </p>

            {/* Primary Tiamat & Secondary Crepuscular Rim Action Controls */}
            <div
              style={staggerClass(280)}
              className={`mt-8 flex flex-wrap items-center gap-4 transition-[transform,opacity] duration-700 ${
                isAssembled ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
            >
              <a href="#projects" onClick={navigate('projects')} className="btn-tiamat">
                <span>Selected Works</span>
                <span className="link-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>

              <a href="#contact" onClick={navigate('contact')} className="btn-crepuscular">
                <span>Get in Touch</span>
                <span className="link-arrow text-amber-200" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>

            {/* Authentic Social Coordinates */}
            <div
              style={staggerClass(350)}
              className={`mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-4 transition-[transform,opacity] duration-700 ${
                isAssembled ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <span className="astro-coord">6.5950°S // 106.8166°E</span>

              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                  className="celestial-link group inline-flex min-h-9 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-slate-300 hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
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
                  className="celestial-link group inline-flex min-h-9 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-slate-300 hover:text-rose-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  LinkedIn
                  <span className="link-arrow text-rose-300" aria-hidden="true">
                    ↗
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Authentic Profile Photo in Astronomical Astrolabe Ring System */}
          <div
            style={staggerClass(160)}
            className={`relative mx-auto flex w-full max-w-[26rem] flex-col items-center transition-[transform,opacity] duration-700 lg:col-span-5 ${
              isAssembled ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}
          >
            <div className="relative flex w-full items-center justify-center py-6 sm:py-8">
              {/* Restrained Low-Angle Horizon Rim Backlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-8 opacity-65 blur-3xl"
                style={{
                  background:
                    'radial-gradient(circle at 50% 82%, rgba(253, 224, 71, 0.24) 0%, rgba(194, 65, 12, 0.22) 36%, rgba(109, 17, 70, 0.22) 66%, rgba(56, 189, 248, 0.14) 86%, transparent 100%)',
                }}
              />

              {/* Concentric Counter-Rotating Astronomical Astrolabe Rings */}
              <svg
                viewBox="0 0 460 460"
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[114%] w-[114%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
              >
                <defs>
                  <linearGradient id="astrolabeOuterRim" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fde047" stopOpacity="0.72" />
                    <stop offset="45%" stopColor="#6d1146" stopOpacity="0.52" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.68" />
                  </linearGradient>
                  <linearGradient id="astrolabeCounterArc" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#c2410c" stopOpacity="0.68" />
                    <stop offset="52%" stopColor="#e11d48" stopOpacity="0.46" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.58" />
                  </linearGradient>
                </defs>

                {/* Outer Celestial Coordinate Ring with 72 Ticks */}
                <g className="astrolabe-cw">
                  <circle
                    cx="230"
                    cy="230"
                    r="214"
                    fill="none"
                    stroke="url(#astrolabeOuterRim)"
                    strokeWidth="0.85"
                  />
                  {DEGREE_TICKS.map((deg) => {
                    const cardinal = deg % 90 === 0;
                    const major = deg % 30 === 0;
                    return (
                      <line
                        key={deg}
                        x1="230"
                        y1={cardinal ? '8' : major ? '12' : '15'}
                        x2="230"
                        y2="19"
                        stroke={cardinal ? '#fde047' : major ? '#e11d48' : '#38bdf8'}
                        strokeWidth={cardinal ? '1.25' : major ? '0.9' : '0.6'}
                        opacity={cardinal ? '0.85' : major ? '0.62' : '0.32'}
                        transform={`rotate(${deg} 230 230)`}
                      />
                    );
                  })}
                  <line
                    x1="214"
                    y1="16"
                    x2="246"
                    y2="16"
                    stroke="#38bdf8"
                    strokeWidth="0.85"
                    opacity="0.75"
                  />
                  <circle cx="230" cy="16" r="2.6" fill="#ffffff" />
                  <circle cx="230" cy="16" r="6" fill="#38bdf8" opacity="0.28" />
                </g>

                {/* Counter-Rotating Dashed Ecliptic Index Ring */}
                <g className="astrolabe-ccw">
                  <circle
                    cx="230"
                    cy="230"
                    r="195"
                    fill="none"
                    stroke="url(#astrolabeCounterArc)"
                    strokeWidth="0.9"
                    strokeDasharray="10 6 2 6"
                  />
                  <circle cx="399" cy="132" r="2.5" fill="#e11d48" />
                  <circle cx="61" cy="328" r="2.3" fill="#fde047" />
                </g>

                {/* Inner Vernier Meridian Ring */}
                <g className="astrolabe-slow">
                  <circle
                    cx="230"
                    cy="230"
                    r="177"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.14)"
                    strokeWidth="0.7"
                    strokeDasharray="32 16"
                  />
                </g>
              </svg>

              {/* Preserved Real Profile Photograph (100% Fidelity, Explicit 3:4 Aspect Ratio) */}
              <MagneticTilt maxTilt={3} className="relative z-10 w-[75%] max-w-[18.75rem]">
                <div className="rim-horizon-panel overflow-hidden p-2">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#050714]">
                    <OptimizedPicture
                      src={personal.profileImage}
                      alt={personal.name}
                      width={960}
                      height={1280}
                      eager
                      fetchPriority="high"
                      className="h-full w-full object-cover object-top"
                    />

                    {/* Subtle Low-Angle Horizon Rim Glaze */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, transparent 58%, rgba(5, 7, 20, 0.84) 100%)',
                      }}
                    />

                    {/* Minimalist Editorial Plate */}
                    <div className="absolute inset-x-0 bottom-0 border-t border-amber-200/18 bg-[#050714]/78 px-3.5 py-2.5 backdrop-blur-md">
                      <p className="astro-coord">{personal.role}</p>
                      <p className="mt-0.5 truncate text-xs text-slate-300">{personal.location}</p>
                    </div>
                  </div>
                </div>
              </MagneticTilt>
            </div>
          </div>
        </div>
      </div>

      {/* Backlit Cloud Horizon Silhouette & Volumetric Crepuscular God Rays */}
      <CloudHorizonBank variant="twilight" />
    </section>
  );
}

export default Hero;
