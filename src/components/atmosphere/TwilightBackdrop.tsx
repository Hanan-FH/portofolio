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
  spike: boolean;
  hue: 'white' | 'cyan' | 'rose';
}

/**
 * Persistent Katawaredoki Atmosphere Engine (TwilightBackdrop).
 * Renders Rayleigh scattering stratosphere bands, two GPU-accelerated parallax star layers,
 * volumetric crepuscular rays, and high-altitude dual-ion Tiamat arcs, while smoothly
 * evolving from solar-amber Katawaredoki twilight into star-dense Zenith Night (#050714)
 * via passive GPU opacity/transform modulation.
 */
export function TwilightBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const twilightBandRef = useRef<HTMLDivElement | null>(null);
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
    let zenithRatio = 0;

    const stars: StratosphereStar[] = [];

    const seedStars = () => {
      stars.length = 0;
      const total = width < 768 ? 130 : 220;
      for (let i = 0; i < total; i++) {
        const c = Math.random();
        const r = 0.42 + Math.random() * 1.42;
        stars.push({
          x: Math.random() * width,
          y: Math.pow(Math.random(), 1.2) * height * 0.96,
          r,
          baseAlpha: 0.2 + Math.random() * 0.62,
          freq: 0.85 + Math.random() * 2.15,
          phase: Math.random() * Math.PI * 2,
          layer: i % 3 === 0 ? 1 : 0,
          spike: i % 22 === 0 || r > 1.62,
          hue: c < 0.24 ? 'cyan' : c < 0.36 ? 'rose' : 'white',
        });
      }
    };

    const updateAtmosphereScroll = () => {
      scrollOffset = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - height);
      zenithRatio = Math.max(0, Math.min(1, scrollOffset / maxScroll));

      // Smoothly transition Katawaredoki horizon glow into star-dense Zenith Night (#050714)
      if (twilightBandRef.current) {
        const twilightOpacity = Math.max(0.06, 1 - Math.pow(zenithRatio, 1.15) * 0.94);
        twilightBandRef.current.style.opacity = twilightOpacity.toFixed(3);
      }

      if (!prefersReducedMotion && farParallaxRef.current) {
        const shift = Math.min(scrollOffset * 0.065, 96);
        const rayOpacity = Math.max(0.18, 0.78 - zenithRatio * 0.58);
        farParallaxRef.current.style.transform = `translate3d(0, -${shift.toFixed(1)}px, 0)`;
        farParallaxRef.current.style.opacity = rayOpacity.toFixed(3);
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
      updateAtmosphereScroll();
    };

    resize();

    const drawStars = (tSec: number) => {
      ctx.clearRect(0, 0, width, height);

      // Stars intensify into crisp zenith night as twilight sets toward Contact & Footer
      const nightBoost = 1 + zenithRatio * 0.28;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const osc = prefersReducedMotion ? 0 : Math.sin(tSec * s.freq + s.phase) * 0.24;
        const alpha = Math.max(0.05, Math.min(0.98, (s.baseAlpha + osc) * nightBoost));
        const parallaxFactor = prefersReducedMotion ? 0 : s.layer === 1 ? 0.048 : 0.018;
        const py = (((s.y - scrollOffset * parallaxFactor) % height) + height) % height;

        const rgb =
          s.hue === 'cyan'
            ? '56, 189, 248'
            : s.hue === 'rose'
              ? '244, 63, 94'
              : '255, 255, 255';

        ctx.beginPath();
        ctx.arc(s.x, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
        ctx.fill();

        if (s.spike && alpha > 0.48) {
          const arm = s.r * 3.8;
          ctx.strokeStyle = `rgba(${rgb}, ${(alpha * 0.38).toFixed(3)})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - arm, py);
          ctx.lineTo(s.x + arm, py);
          ctx.moveTo(s.x, py - arm);
          ctx.lineTo(s.x, py + arm);
          ctx.stroke();
        }
      }
    };

    drawStars(0);

    const onScroll = () => {
      updateAtmosphereScroll();
      if (prefersReducedMotion) drawStars(0);
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
      {/* Base Upper Stratosphere Zenith Night (#050714 -> #0d1338) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 45% at 24% 14%, rgba(56, 189, 248, 0.08) 0%, transparent 72%), linear-gradient(180deg, #050714 0%, #070b22 52%, #0d1338 100%)',
        }}
      />

      {/* Multi-layered Rayleigh Scattering Katawaredoki Horizon (GPU Opacity Modulated) */}
      <div
        ref={twilightBandRef}
        className="absolute inset-0"
        style={{
          willChange: 'opacity',
          background: `
            radial-gradient(ellipse 92% 46% at 68% 98%, rgba(254, 240, 138, 0.24) 0%, rgba(217, 78, 22, 0.28) 28%, rgba(124, 18, 74, 0.24) 56%, transparent 78%),
            radial-gradient(ellipse 68% 38% at 22% 16%, rgba(56, 189, 248, 0.12) 0%, transparent 70%),
            linear-gradient(180deg, #050714 0%, #0d1338 28%, #261442 58%, #7c124a 84%, #d94e16 97%, #fef08a 100%)
          `,
        }}
      />

      {/* Far-Atmosphere Tiamat Dual-Ion Plume & Volumetric Crepuscular Rays */}
      <div
        ref={farParallaxRef}
        className="absolute inset-0 opacity-75"
        style={{ willChange: 'transform, opacity' }}
      >
        <svg
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="tiamatStratospherePlume" x1="10%" y1="16%" x2="78%" y2="82%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="38%" stopColor="#38bdf8" stopOpacity="0.34" />
              <stop offset="72%" stopColor="#ffffff" stopOpacity="0.66" />
              <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="tiamatRubySplit" x1="22%" y1="22%" x2="74%" y2="86%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0" />
              <stop offset="52%" stopColor="#f43f5e" stopOpacity="0.3" />
              <stop offset="86%" stopColor="#7c124a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#d94e16" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="crepuscularShaft" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.16" />
              <stop offset="45%" stopColor="#d94e16" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#261442" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Upward Volumetric Crepuscular Rays (God Rays) */}
          <polygon points="980,800 500,110 660,110" fill="url(#crepuscularShaft)" />
          <polygon points="980,800 770,70 930,70" fill="url(#crepuscularShaft)" />
          <polygon points="980,800 1050,130 1230,130" fill="url(#crepuscularShaft)" />

          {/* Dual-Ion Tiamat Parabolic Arcs */}
          <path
            d="M 140 110 Q 640 210 1110 720"
            fill="none"
            stroke="url(#tiamatStratospherePlume)"
            strokeWidth="1.9"
          />
          <path
            d="M 320 175 Q 670 300 1045 735"
            fill="none"
            stroke="url(#tiamatRubySplit)"
            strokeWidth="1.25"
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
      <div className="mx-auto w-11/12 max-w-6xl opacity-70">
        <div className="anamorphic-streak" />
      </div>

      <svg
        viewBox="0 0 1440 168"
        preserveAspectRatio="none"
        className="-mt-3 block h-[72px] w-full sm:h-[108px] lg:h-[134px]"
      >
        <defs>
          <linearGradient id={`shinkaiRim-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.36" />
            <stop offset="32%" stopColor="#7c124a" stopOpacity="0.68" />
            <stop offset="58%" stopColor="#fef08a" stopOpacity={isZenith ? '0.48' : '0.95'} />
            <stop offset="78%" stopColor="#d94e16" stopOpacity="0.76" />
            <stop offset="100%" stopColor="#261442" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id={`shinkaiAnvil-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isZenith ? '#0d1338' : '#7c124a'} stopOpacity="0.34" />
            <stop offset="100%" stopColor="#050714" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id={`shinkaiCloudBody-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isZenith ? '#0d1338' : '#261442'} stopOpacity="0.84" />
            <stop offset="100%" stopColor="#050714" stopOpacity={isZenith ? '0.68' : '0.94'} />
          </linearGradient>
          <linearGradient id={`shinkaiRidge-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#050714" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#050714" stopOpacity={isZenith ? '0.55' : '0.88'} />
          </linearGradient>
          <linearGradient id={`godRayUp-${variant}`} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity={isZenith ? '0.09' : '0.22'} />
            <stop offset="100%" stopColor="#d94e16" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Upward Crepuscular God Rays Behind Cloud Crest */}
        <polygon points="880,152 620,0 755,0" fill={`url(#godRayUp-${variant})`} />
        <polygon points="880,152 825,0 955,0" fill={`url(#godRayUp-${variant})`} />
        <polygon points="880,152 1005,0 1140,0" fill={`url(#godRayUp-${variant})`} />

        {/* Distant Towering Shinkai Cumulonimbus Anvil */}
        <path
          d="M0,104 C135,78 240,52 355,68 C450,28 575,36 675,70 C770,18 905,12 1010,58 C1115,30 1245,42 1345,68 L1440,82 L1440,168 L0,168 Z"
          fill={`url(#shinkaiAnvil-${variant})`}
        />

        {/* Mid-distance Backlit Cumulonimbus Bank with 1px Solar Rim */}
        <path
          d="M0,122 C110,98 190,70 290,84 C375,48 475,56 560,88 C655,46 775,30 885,70 C975,40 1085,50 1170,82 C1260,58 1350,72 1440,96 L1440,168 L0,168 Z"
          fill={`url(#shinkaiCloudBody-${variant})`}
          stroke={`url(#shinkaiRim-${variant})`}
          strokeWidth="1.5"
        />

        {/* Foreground Deep Stratosphere Ridge */}
        <path
          d="M0,138 C150,118 275,130 410,112 C535,96 650,122 790,106 C920,90 1055,118 1195,106 C1295,98 1380,116 1440,126 L1440,168 L0,168 Z"
          fill={`url(#shinkaiRidge-${variant})`}
          stroke="rgba(254, 240, 138, 0.26)"
          strokeWidth="0.9"
        />
      </svg>
    </div>
  );
}

export default TwilightBackdrop;
