import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SkyStar {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  speed: number;
  phase: number;
  color: 'white' | 'cyan' | 'rose';
}

/**
 * Persistent Katawaredoki atmospheric sky canvas & Rayleigh scattering dome.
 * Renders a twinkling zenith starfield and subtle crepuscular light gradients
 * while respecting prefers-reduced-motion and tab visibility.
 */
export function KatawareSkyBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const stars: SkyStar[] = [];

    const populateStars = () => {
      stars.length = 0;
      const count = width < 768 ? 65 : 130;
      for (let i = 0; i < count; i++) {
        const cRoll = Math.random();
        stars.push({
          x: Math.random() * width,
          y: Math.pow(Math.random(), 1.25) * height * 0.88,
          r: 0.5 + Math.random() * 1.35,
          baseAlpha: 0.18 + Math.random() * 0.55,
          speed: 0.8 + Math.random() * 1.9,
          phase: Math.random() * Math.PI * 2,
          color: cRoll < 0.2 ? 'cyan' : cRoll < 0.32 ? 'rose' : 'white',
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
      populateStars();
    };

    resize();

    const drawStaticFrame = (timeSec: number) => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const mod = prefersReducedMotion ? 0 : Math.sin(timeSec * s.speed + s.phase) * 0.22;
        const alpha = Math.max(0.06, Math.min(0.92, s.baseAlpha + mod));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        if (s.color === 'cyan') {
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha.toFixed(3)})`;
        } else if (s.color === 'rose') {
          ctx.fillStyle = `rgba(244, 114, 182, ${alpha.toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        }
        ctx.fill();
      }
    };

    drawStaticFrame(0);

    const onResize = () => {
      resize();
      if (prefersReducedMotion) {
        drawStaticFrame(0);
      }
    };

    window.addEventListener('resize', onResize, { passive: true });

    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }

    let isVisible = !document.hidden;
    const onVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibility);

    let rafId = 0;
    const start = performance.now();

    const loop = (now: number) => {
      if (isVisible) {
        drawStaticFrame((now - start) / 1000);
      }
      rafId = window.requestAnimationFrame(loop);
    };

    rafId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Multi-stop Rayleigh Scattering Atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 85% 48% at 72% 96%, rgba(234, 88, 12, 0.22) 0%, rgba(181, 26, 105, 0.16) 38%, transparent 72%),
            radial-gradient(ellipse 65% 42% at 24% 18%, rgba(56, 189, 248, 0.11) 0%, transparent 68%),
            linear-gradient(180deg, #070a18 0%, #0e1433 28%, #181d4a 52%, #2e1847 76%, #52194f 92%, #881a58 100%)
          `,
        }}
      />

      {/* Frozen Distant Tiamat Comet Ion Trail Across Upper Sky */}
      <svg
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-[46vh] w-full opacity-55"
      >
        <defs>
          <linearGradient id="tiamatDistantArc" x1="12%" y1="78%" x2="86%" y2="12%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="48%" stopColor="#38bdf8" stopOpacity="0.24" />
            <stop offset="82%" stopColor="#e0f2fe" stopOpacity="0.52" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="tiamatRoseArc" x1="20%" y1="82%" x2="84%" y2="20%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0" />
            <stop offset="58%" stopColor="#f43f5e" stopOpacity="0.2" />
            <stop offset="90%" stopColor="#c084fc" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 140 390 Q 680 120 1240 68"
          fill="none"
          stroke="url(#tiamatDistantArc)"
          strokeWidth="2.2"
        />
        <path
          d="M 280 398 Q 740 165 1215 108"
          fill="none"
          stroke="url(#tiamatRoseArc)"
          strokeWidth="1.3"
        />
      </svg>

      {/* Procedural Sine-Modulated Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

/**
 * Layered Shinkai Cloud Horizon Silhouette Divider with Crepuscular Backlit Rim Edges.
 * Grounds atmospheric sections in distance and scale.
 */
export function CloudHorizonSilhouette({
  variant = 'hero',
  className = '',
}: {
  variant?: 'hero' | 'nightfall';
  className?: string;
}) {
  const isNightfall = variant === 'nightfall';

  return (
    <div
      className={`pointer-events-none relative w-full overflow-hidden select-none leading-none ${className}`}
      aria-hidden="true"
    >
      {/* Ambient Solar / Crepuscular Horizon Glow Behind Clouds */}
      <div
        className="mx-auto h-16 w-4/5 rounded-full blur-3xl"
        style={{
          background: isNightfall
            ? 'radial-gradient(ellipse at center, rgba(136, 26, 88, 0.34) 0%, rgba(56, 189, 248, 0.14) 55%, transparent 80%)'
            : 'radial-gradient(ellipse at center, rgba(254, 240, 138, 0.28) 0%, rgba(234, 88, 12, 0.24) 45%, rgba(181, 26, 105, 0.18) 75%, transparent 100%)',
        }}
      />

      <svg
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
        className="-mt-10 block h-[72px] w-full sm:h-[108px] lg:h-[132px]"
      >
        <defs>
          <linearGradient id={`cloudRim-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.28" />
            <stop offset="32%" stopColor="#f43f5e" stopOpacity="0.58" />
            <stop offset="56%" stopColor="#fef08a" stopOpacity={isNightfall ? '0.45' : '0.88'} />
            <stop offset="78%" stopColor="#ea580c" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id={`cloudMidFill-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isNightfall ? '#181d4a' : '#52194f'} stopOpacity="0.72" />
            <stop offset="100%" stopColor="#070a18" stopOpacity="0.96" />
          </linearGradient>
        </defs>

        {/* Distant High Cumulus Layer with Golden-Rose Rim */}
        <path
          d="M0,112 C95,94 165,68 255,78 C335,44 430,52 515,82 C605,48 725,30 825,66 C915,38 1025,46 1110,76 C1205,54 1320,68 1440,92 L1440,150 L0,150 Z"
          fill={`url(#cloudMidFill-${variant})`}
          stroke={`url(#cloudRim-${variant})`}
          strokeWidth="1.6"
        />

        {/* Foreground Deep Abyss Cloud & Ridge Silhouette */}
        <path
          d="M0,126 C140,108 260,118 390,102 C510,86 620,112 760,96 C890,82 1030,108 1175,98 C1285,90 1375,108 1440,116 L1440,150 L0,150 Z"
          fill="#070a18"
          stroke="rgba(254, 240, 138, 0.22)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

export default KatawareSkyBackdrop;
