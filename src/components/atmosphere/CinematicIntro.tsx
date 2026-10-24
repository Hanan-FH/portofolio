import { useCallback, useEffect, useRef, useState } from 'react';
import { personalData } from '../../data/portfolio';

const INTRO_STORAGE_KEY = 'kimi_intro_seen';
const TOTAL_DURATION_SEC = 4.8;

interface Star {
  nx: number;
  ny: number;
  radius: number;
  baseAlpha: number;
  freq: number;
  phase: number;
  tint: 'white' | 'cyan' | 'rose';
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  palette: 'cyan' | 'rose' | 'violet';
}

interface TrailPoint {
  x: number;
  y: number;
}

function shouldPlayIntro(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('intro') === 'force') {
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  } catch {
    // Ignore URL parsing issues
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }

  // Bypass immediately in automated headless browsers (Lighthouse / Playwright / CDP)
  if (
    navigator.webdriver ||
    /HeadlessChrome|PhantomJS|Playwright|Puppeteer/i.test(navigator.userAgent)
  ) {
    return false;
  }

  try {
    if (window.sessionStorage.getItem(INTRO_STORAGE_KEY) === '1') {
      return false;
    }
  } catch {
    return false;
  }

  return true;
}

function markIntroSeen(): void {
  try {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, '1');
  } catch {
    // Ignore storage quota / privacy mode restrictions
  }
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function easeOutCubic(t: number): number {
  const c = clamp(t, 0, 1);
  return 1 - Math.pow(1 - c, 3);
}

function easeInOutSine(t: number): number {
  const c = clamp(t, 0, 1);
  return -(Math.cos(Math.PI * c) - 1) / 2;
}

/**
 * Self-contained HTML5 Canvas Cinematic Opening Engine inspired by Kimi no Na wa. (君の名は。).
 * Choreographs atmospheric Rayleigh ignition, Tiamat dual-nucleus comet splintering,
 * authentic identity reveal, and seamless horizon dissolve.
 */
export function CinematicIntro() {
  const [isActive, setIsActive] = useState<boolean>(shouldPlayIntro);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const identityRef = useRef<HTMLDivElement | null>(null);

  const finishIntro = useCallback(() => {
    markIntroSeen();
    setIsActive(false);
  }, []);

  useEffect(() => {
    if (!isActive) {
      markIntroSeen();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      finishIntro();
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
      finishIntro();
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        finishIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) finishIntro();
    };
    motionMedia.addEventListener('change', handleMotionChange);

    // Generate deterministic-feeling procedural zenith starfield
    const starCount = width < 640 ? 90 : 150;
    const stars: Star[] = Array.from({ length: starCount }, () => {
      const roll = Math.random();
      const tint: Star['tint'] = roll < 0.22 ? 'cyan' : roll < 0.34 ? 'rose' : 'white';
      return {
        nx: Math.random(),
        ny: Math.pow(Math.random(), 1.35) * 0.82,
        radius: 0.55 + Math.random() * 1.45,
        baseAlpha: 0.22 + Math.random() * 0.62,
        freq: 1.8 + Math.random() * 3.4,
        phase: Math.random() * Math.PI * 2,
        tint,
      };
    });

    const sparks: SparkParticle[] = [];
    const primaryTrail: TrailPoint[] = [];
    const fragmentTrail: TrailPoint[] = [];

    const startTime = performance.now();
    let lastTime = startTime;
    let rafId = 0;
    let splitBurstTriggered = false;

    const drawTaperedRibbon = (
      points: TrailPoint[],
      headWidth: number,
      coreRgb: string,
      glowRgb: string,
      alphaScale: number
    ) => {
      if (points.length < 2) return;
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 1; i < points.length; i++) {
        const ratio = i / points.length;
        const p0 = points[i - 1];
        const p1 = points[i];

        // Outer plasma corona ribbon
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineWidth = headWidth * ratio * 2.8;
        ctx.strokeStyle = `rgba(${glowRgb}, ${(ratio * ratio * 0.28 * alphaScale).toFixed(3)})`;
        ctx.stroke();

        // Inner incandescent core ribbon
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineWidth = Math.max(0.8, headWidth * Math.pow(ratio, 1.35));
        ctx.strokeStyle = `rgba(${coreRgb}, ${(Math.pow(ratio, 1.4) * 0.88 * alphaScale).toFixed(3)})`;
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawNucleus = (
      x: number,
      y: number,
      coreRadius: number,
      coronaColor: string,
      flareSpan: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      const halo = ctx.createRadialGradient(x, y, 0, x, y, coreRadius * 9);
      halo.addColorStop(0, `rgba(255, 255, 255, ${(0.98 * alpha).toFixed(3)})`);
      halo.addColorStop(0.18, `rgba(${coronaColor}, ${(0.72 * alpha).toFixed(3)})`);
      halo.addColorStop(0.5, `rgba(${coronaColor}, ${(0.22 * alpha).toFixed(3)})`);
      halo.addColorStop(1, `rgba(${coronaColor}, 0)`);

      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(x, y, coreRadius * 9, 0, Math.PI * 2);
      ctx.fill();

      // Shinkai anamorphic horizontal lens streak
      const streak = ctx.createLinearGradient(x - flareSpan, y, x + flareSpan, y);
      streak.addColorStop(0, `rgba(${coronaColor}, 0)`);
      streak.addColorStop(0.42, `rgba(${coronaColor}, ${(0.45 * alpha).toFixed(3)})`);
      streak.addColorStop(0.5, `rgba(255, 255, 255, ${(0.95 * alpha).toFixed(3)})`);
      streak.addColorStop(0.58, `rgba(${coronaColor}, ${(0.45 * alpha).toFixed(3)})`);
      streak.addColorStop(1, `rgba(${coronaColor}, 0)`);

      ctx.fillStyle = streak;
      ctx.fillRect(x - flareSpan, y - 1.3, flareSpan * 2, 2.6);

      // Pure white nucleus core
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, y, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const renderFrame = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (elapsed >= TOTAL_DURATION_SEC) {
        finishIntro();
        return;
      }

      // Phase 1: Atmospheric Ignition (0.0s - 1.0s)
      const ignition = easeOutCubic(elapsed / 1.0);
      // Phase 4: Horizon Dissolve (3.8s - 4.8s)
      const dissolve = elapsed >= 3.8 ? 1 - easeInOutSine((elapsed - 3.8) / 1.0) : 1;

      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = dissolve.toFixed(3);
      }

      // Phase 3: Celestial Identity Reveal (2.2s - 4.0s)
      if (identityRef.current) {
        const revealProgress = easeOutCubic((elapsed - 2.2) / 1.25);
        const translateY = (1 - revealProgress) * 18;
        identityRef.current.style.opacity = revealProgress.toFixed(3);
        identityRef.current.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Base Abyss Fill
      ctx.fillStyle = '#050713';
      ctx.fillRect(0, 0, width, height);

      // 2. Katawaredoki Rayleigh Scattering Vertical Gradient
      ctx.save();
      ctx.globalAlpha = ignition;
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0.0, '#070a18');
      skyGrad.addColorStop(0.24, '#0e1433');
      skyGrad.addColorStop(0.46, '#181d4a');
      skyGrad.addColorStop(0.64, '#2e1847');
      skyGrad.addColorStop(0.78, '#52194f');
      skyGrad.addColorStop(0.89, '#881a58');
      skyGrad.addColorStop(0.96, '#b51a69');
      skyGrad.addColorStop(1.0, '#ea580c');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Crepuscular Solar Horizon Bloom
      const sunX = width * 0.62;
      const sunY = height * 1.02;
      const solarBloom = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, Math.max(width, height) * 0.58);
      solarBloom.addColorStop(0, 'rgba(254, 240, 138, 0.42)');
      solarBloom.addColorStop(0.22, 'rgba(245, 158, 11, 0.28)');
      solarBloom.addColorStop(0.52, 'rgba(181, 26, 105, 0.14)');
      solarBloom.addColorStop(1, 'rgba(7, 10, 24, 0)');
      ctx.fillStyle = solarBloom;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // 3. Sine-Modulated Starfield
      ctx.save();
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = Math.sin(elapsed * s.freq + s.phase) * 0.28;
        const alpha = clamp((s.baseAlpha + twinkle) * ignition, 0.04, 0.96);
        const sx = s.nx * width;
        const sy = s.ny * height;

        ctx.beginPath();
        ctx.arc(sx, sy, s.radius, 0, Math.PI * 2);
        if (s.tint === 'cyan') {
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha.toFixed(3)})`;
        } else if (s.tint === 'rose') {
          ctx.fillStyle = `rgba(244, 114, 182, ${alpha.toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        }
        ctx.fill();
      }
      ctx.restore();

      // 4. Phase 2: Tiamat Comet Splintering (0.8s - 3.2s, lingering trail decay to 4.2s)
      if (elapsed >= 0.8) {
        const cometWindow = 2.4;
        const tRaw = (elapsed - 0.8) / cometWindow;
        const t = clamp(tRaw, 0, 1);

        // Exact parabolic trajectory P(t):
        // X(t) = X0 + (Xend - X0) * t
        // Y(t) = Y0 + (Yend - Y0) * t^1.3 - Harc * sin(pi * t)
        const x0 = -width * 0.06;
        const xEnd = width * 1.06;
        const y0 = height * 0.54;
        const yEnd = height * 0.17;
        const hArc = height * 0.21;

        const leadX = x0 + (xEnd - x0) * t;
        const leadY = y0 + (yEnd - y0) * Math.pow(t, 1.3) - hArc * Math.sin(Math.PI * t);

        const cometVisibility = tRaw <= 1 ? 1 : clamp(1 - (tRaw - 1) * 1.4, 0, 1);

        if (tRaw <= 1.02) {
          primaryTrail.push({ x: leadX, y: leadY });
          if (primaryTrail.length > 56) primaryTrail.shift();

          // Emit ionized cyan-white drag particles
          const emitCount = width < 640 ? 2 : 4;
          for (let k = 0; k < emitCount; k++) {
            sparks.push({
              x: leadX + (Math.random() - 0.5) * 5,
              y: leadY + (Math.random() - 0.5) * 5,
              vx: -(38 + Math.random() * 68),
              vy: 10 + (Math.random() - 0.35) * 34,
              life: 0,
              maxLife: 0.55 + Math.random() * 0.75,
              size: 1.0 + Math.random() * 2.1,
              palette: 'cyan',
            });
          }
        } else if (primaryTrail.length > 0) {
          primaryTrail.shift();
        }

        // Secondary Nucleus (Ruby-Rose / Violet Fragment splitting at t = 0.24)
        const splitStart = 0.24;
        if (t >= splitStart) {
          const s = (t - splitStart) / (1 - splitStart);
          // Offset gravity divergence vector
          const fragX = leadX - s * (width * 0.055);
          const fragY = leadY + s * (height * 0.035) + s * s * (height * 0.145);

          if (!splitBurstTriggered) {
            splitBurstTriggered = true;
            for (let b = 0; b < 22; b++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = 24 + Math.random() * 90;
              sparks.push({
                x: leadX,
                y: leadY,
                vx: Math.cos(angle) * speed - 30,
                vy: Math.sin(angle) * speed + 18,
                life: 0,
                maxLife: 0.65 + Math.random() * 0.85,
                size: 1.2 + Math.random() * 2.4,
                palette: b % 2 === 0 ? 'rose' : 'violet',
              });
            }
          }

          if (tRaw <= 1.02) {
            fragmentTrail.push({ x: fragX, y: fragY });
            if (fragmentTrail.length > 44) fragmentTrail.shift();

            const fragSparks = width < 640 ? 2 : 3;
            for (let k = 0; k < fragSparks; k++) {
              sparks.push({
                x: fragX + (Math.random() - 0.5) * 4,
                y: fragY + (Math.random() - 0.5) * 4,
                vx: -(30 + Math.random() * 56),
                vy: 16 + Math.random() * 42,
                life: 0,
                maxLife: 0.55 + Math.random() * 0.8,
                size: 0.9 + Math.random() * 2.0,
                palette: Math.random() < 0.65 ? 'rose' : 'violet',
              });
            }
          } else if (fragmentTrail.length > 0) {
            fragmentTrail.shift();
          }

          drawTaperedRibbon(fragmentTrail, 4.2, '255, 228, 238', '244, 63, 94', cometVisibility);

          if (tRaw <= 1.02) {
            drawNucleus(
              fragX,
              fragY,
              3.4,
              '244, 63, 94',
              width < 640 ? 34 : 56,
              cometVisibility * 0.95
            );
          }
        }

        // Draw primary cyan-white comet ribbon & nucleus on top
        drawTaperedRibbon(primaryTrail, 6.4, '255, 255, 255', '56, 189, 248', cometVisibility);

        if (tRaw <= 1.02) {
          drawNucleus(
            leadX,
            leadY,
            4.8,
            '56, 189, 248',
            width < 640 ? 58 : 105,
            cometVisibility
          );
        }
      }

      // 5. Update & Render Drifting Ionized Sparks with Physics Drag
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          sparks.splice(i, 1);
          continue;
        }

        const drag = Math.pow(0.24, dt);
        p.vx *= drag;
        p.vy = p.vy * drag + 22 * dt; // Gentle celestial gravity drift
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const lifeLeft = 1 - p.life / p.maxLife;
        const alpha = lifeLeft * lifeLeft * 0.85;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.45 + 0.55 * lifeLeft), 0, Math.PI * 2);
        if (p.palette === 'cyan') {
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha.toFixed(3)})`;
        } else if (p.palette === 'rose') {
          ctx.fillStyle = `rgba(244, 63, 94, ${alpha.toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(192, 132, 252, ${alpha.toFixed(3)})`;
        }
        ctx.fill();
      }
      ctx.restore();

      // 6. Distant Horizon Silhouette Ridge at Bottom Edge
      ctx.save();
      ctx.globalAlpha = ignition;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, height * 0.91);
      ctx.bezierCurveTo(
        width * 0.22,
        height * 0.87,
        width * 0.42,
        height * 0.94,
        width * 0.64,
        height * 0.89
      );
      ctx.bezierCurveTo(
        width * 0.82,
        height * 0.85,
        width * 0.92,
        height * 0.9,
        width,
        height * 0.88
      );
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = '#070a18';
      ctx.fill();

      ctx.strokeStyle = 'rgba(254, 240, 138, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      rafId = window.requestAnimationFrame(renderFrame);
    };

    rafId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
      motionMedia.removeEventListener('change', handleMotionChange);
      sparks.length = 0;
      primaryTrail.length = 0;
      fragmentTrail.length = 0;
      canvas.width = 0;
      canvas.height = 0;
    };
  }, [isActive, finishIntro]);

  if (!isActive) return null;

  return (
    <div
      ref={wrapperRef}
      role="region"
      aria-label="Cinematic introduction sequence"
      className="fixed inset-0 z-[260] flex items-center justify-center overflow-hidden bg-zenith-abyss select-none"
      style={{ willChange: 'opacity' }}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {/* Phase 3: Celestial Identity Reveal Overlay */}
      <div
        ref={identityRef}
        className="pointer-events-none relative z-10 mx-auto max-w-4xl px-6 text-center opacity-0"
        style={{ willChange: 'transform, opacity' }}
      >
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.34em] text-pink-200/90 sm:text-xs">
          黄昏時 — Between Twilight and the Stars
        </p>

        <h2 className="editorial-display mt-4 text-2xl font-semibold tracking-[0.14em] text-white drop-shadow-[0_4px_28px_rgba(56,189,248,0.35)] sm:text-4xl md:text-5xl">
          {personalData.name}
        </h2>

        <div
          aria-hidden="true"
          className="mx-auto my-4 h-px w-40 bg-gradient-to-r from-transparent via-amber-200/75 to-transparent sm:w-64"
        />

        <p className="font-mono text-xs uppercase tracking-[0.28em] text-sky-200/90 sm:text-sm">
          {personalData.role}
        </p>
      </div>

      {/* Persistent Keyboard-Accessible Skip Control */}
      <button
        type="button"
        onClick={finishIntro}
        aria-label="Skip cinematic introduction (Escape)"
        className="btn-twilight fixed bottom-6 right-6 z-20 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-100 shadow-lg focus-visible:ring-2 focus-visible:ring-sky-400 sm:bottom-8 sm:right-8"
      >
        <span>Skip Intro</span>
        <kbd className="rounded border border-white/25 bg-white/10 px-1.5 py-0.5 font-mono text-[0.65rem] text-amber-200">
          Esc
        </kbd>
      </button>
    </div>
  );
}

export default CinematicIntro;
