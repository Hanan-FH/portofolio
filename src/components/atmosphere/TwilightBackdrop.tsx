import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface StratosphereStar {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  freq: number;
  phase: number;
  layer: 0 | 1;
  hue: 'white' | 'cyan' | 'rose';
}

/**
 * Persistent Katawaredoki Atmosphere Engine (TwilightBackdrop).
 * Renders Rayleigh scattering stratosphere bands, two GPU-accelerated parallax star layers,
 * volumetric crepuscular rays, and anamorphic dual-ion comet remnants.
 */
export function TwilightBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const farParallaxRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let scrollOffset = window.scrollY;

    const stars: StratosphereStar[] = [];

    const seedStars = () => {
      stars.length = 0;
      const total = width < 768 ? 110 : 190;
      for (let i = 0; i < total; i++) {
        const c = Math.random();
        stars.push({
          x: Math.random() * width,
          y: Math.pow(Math.random(), 1.28) * height * 0.92,
          r: 0.45 + Math.random() * 1.35,
          baseAlpha: 0.18 + Math.random() * 0.6,
          freq: 0.9 + Math.random() * 2.1,
          phase: Math.random() * Math.PI * 2,
          layer: i % 3 === 0 ? 1 : 0,
          hue: c < 0.22 ? 'cyan' : c < 0.34 ? 'rose' : 'white',
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars();
    };

    resize();

    const drawStars = (tSec: number) => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const osc = prefersReducedMotion ? 0 : Math.sin(tSec * s.freq + s.phase) * 0.24;
        const alpha = Math.max(0.05, Math.min(0.95, s.baseAlpha + osc));
        const parallaxFactor = prefersReducedMotion ? 0 : s.layer === 1 ? 0.045 : 0.018;
        const py = (((s.y - scrollOffset * parallaxFactor) % height) + height) % height;

        ctx.beginPath();
        ctx.arc(s.x, py, s.r, 0, Math.PI * 2);
        if (s.hue === 'cyan') {
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha.toFixed(3)})`;
        } else if (s.hue === 'rose') {
          ctx.fillStyle = `rgba(244, 63, 94, ${alpha.toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        }
        ctx.fill();
      }
    };

    drawStars(0);

    const onScroll = () => {
      scrollOffset = window.scrollY;
      if (!prefersReducedMotion && farParallaxRef.current) {
        const shift = Math.min(scrollOffset * 0.06, 90);
        farParallaxRef.current.style.transform = `translate3d(0, -${shift.toFixed(1)}px, 0)`;
      }
    };

    const onResize = () => {
      resize();
      if (prefersReducedMotion) drawStars(0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      };
    }

    let visible = !document.hidden;
    const onVisChange = () => {
      visible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisChange);

    let rafId = 0;
    const start = performance.now();
    const animate = (now: number) => {
      if (visible) {
        drawStars((now - start) / 1000);
      }
      rafId = window.requestAnimationFrame(animate);
    };
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisChange);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Multi-layered Rayleigh Scattering Atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 44% at 68% 98%, rgba(254, 240, 138, 0.20) 0%, rgba(217, 78, 22, 0.24) 28%, rgba(124, 18, 74, 0.22) 56%, transparent 78%),
            radial-gradient(ellipse 68% 38% at 22% 16%, rgba(56, 189, 248, 0.10) 0%, transparent 70%),
            linear-gradient(180deg, #050714 0%, #0d1338 30%, #261442 60%, #7c124a 86%, #d94e16 100%)
          `,
        }}
      />

      {/* Far-Atmosphere Tiamat Dual-Ion Plume & Volumetric Crepuscular Rays */}
      <div
        ref={farParallaxRef}
        className="absolute inset-0"
        style={{ willChange: 'transform' }}
      >
        <svg
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          className="h-full w-full opacity-75"
        >
          <defs>
            <linearGradient id="tiamatStratospherePlume" x1="10%" y1="16%" x2="78%" y2="82%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="38%" stopColor="#38bdf8" stopOpacity="0.32" />
              <stop offset="72%" stopColor="#ffffff" stopOpacity="0.62" />
              <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="tiamatRubySplit" x1="22%" y1="22%" x2="74%" y2="86%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0" />
              <stop offset="52%" stopColor="#f43f5e" stopOpacity="0.28" />
              <stop offset="86%" stopColor="#7c124a" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#d94e16" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="crepuscularShaft" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.14" />
              <stop offset="45%" stopColor="#d94e16" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#261442" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Upward Volumetric Crepuscular Rays (God Rays) */}
          <polygon points="980,800 540,120 690,120" fill="url(#crepuscularShaft)" />
          <polygon points="980,800 790,80 940,80" fill="url(#crepuscularShaft)" />
          <polygon points="980,800 1060,140 1230,140" fill="url(#crepuscularShaft)" />

          {/* Dual-Ion Tiamat Parabolic Arcs */}
          <path
            d="M 140 110 Q 640 210 1110 720"
            fill="none"
            stroke="url(#tiamatStratospherePlume)"
            strokeWidth="1.8"
          />
          <path
            d="M 320 175 Q 670 300 1045 735"
            fill="none"
            stroke="url(#tiamatRubySplit)"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* Parallax Scintillating Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

/**
 * Silhouetted Cloud Horizon Bank with Crepuscular God Rays & Solar White-Gold Rim Shading.
 */
export function CloudHorizonBank({
  variant = 'twilight',
  className = '',
}: {
  variant?: 'twilight' | 'zenith';
  className?: string;
}) {
  const isZenith = variant === 'zenith';

  return (
    <div
      className={`pointer-events-none relative w-full overflow-hidden select-none leading-none ${className}`}
      aria-hidden="true"
    >
      {/* Anamorphic Horizon Flare Line */}
      <div className="mx-auto w-11/12 max-w-6xl opacity-65">
        <div className="anamorphic-streak" />
      </div>

      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="-mt-3 block h-[68px] w-full sm:h-[104px] lg:h-[128px]"
      >
        <defs>
          <linearGradient id={`shinkaiRim-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.32" />
            <stop offset="32%" stopColor="#7c124a" stopOpacity="0.65" />
            <stop offset="58%" stopColor="#fef08a" stopOpacity={isZenith ? '0.45' : '0.92'} />
            <stop offset="78%" stopColor="#d94e16" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#261442" stopOpacity="0.38" />
          </linearGradient>
          <linearGradient id={`shinkaiCloudBody-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isZenith ? '#0d1338' : '#261442'} stopOpacity="0.82" />
            <stop offset="100%" stopColor="#050714" stopOpacity="0.98" />
          </linearGradient>
          <linearGradient id={`godRayUp-${variant}`} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity={isZenith ? '0.08' : '0.2'} />
            <stop offset="100%" stopColor="#d94e16" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Subtle Upward Crepuscular God Rays Behind Cloud Crest */}
        <polygon points="880,145 640,0 760,0" fill={`url(#godRayUp-${variant})`} />
        <polygon points="880,145 830,0 950,0" fill={`url(#godRayUp-${variant})`} />
        <polygon points="880,145 1010,0 1130,0" fill={`url(#godRayUp-${variant})`} />

        {/* Mid-distance Backlit Cumulonimbus Bank */}
        <path
          d="M0,118 C110,96 190,68 290,82 C375,46 475,54 560,86 C655,44 775,28 885,68 C975,38 1085,48 1170,80 C1260,56 1350,70 1440,94 L1440,160 L0,160 Z"
          fill={`url(#shinkaiCloudBody-${variant})`}
          stroke={`url(#shinkaiRim-${variant})`}
          strokeWidth="1.5"
        />

        {/* Foreground Deep Stratosphere Ridge */}
        <path
          d="M0,134 C150,114 275,126 410,108 C535,92 650,118 790,102 C920,86 1055,114 1195,102 C1295,94 1380,112 1440,122 L1440,160 L0,160 Z"
          fill="#050714"
          stroke="rgba(254, 240, 138, 0.24)"
          strokeWidth="0.9"
        />
      </svg>
    </div>
  );
}

export default TwilightBackdrop;
