import { useEffect, useRef, useState } from 'react';

const SESSION_KEY = 'tiamat_intro_executed';
const DURATION_SEC = 3.2;
const HANDOFF_SEC = 2.2;

interface ScintillatingStar {
  nx: number;
  ny: number;
  r: number;
  baseAlpha: number;
  freq: number;
  phase: number;
  hue: 'white' | 'cyan' | 'rose';
}

interface IonParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  tone: 'cyan' | 'rose' | 'magenta';
}

interface Vec2 {
  x: number;
  y: number;
}

export interface CinematicIntroProps {
  onHandoff?: () => void;
}

function shouldExecuteColdOpen(): boolean {
  if (typeof window === 'undefined') return false;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }

  try {
    if (window.sessionStorage.getItem(SESSION_KEY) === '1') {
      return false;
    }
  } catch {
    return false;
  }

  return true;
}

function commitSessionExecuted(): void {
  try {
    window.sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // Ignore restricted storage environments
  }
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function easeOutQuart(t: number): number {
  const c = clamp(t, 0, 1);
  return 1 - Math.pow(1 - c, 4);
}

function easeInOutCubic(t: number): number {
  const c = clamp(t, 0, 1);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}

/**
 * Unskippable 3.2-Second Optical Cold-Open Engine (Makoto Shinkai Katawaredoki Physics).
 * [0.0s - 0.8s] Deep Stratosphere Ignition & 190+ Scintillating Stars
 * [0.8s - 2.2s] Tiamat Dual-Nucleus Splintering Trajectory & Anamorphic Horizon Flare
 * [2.2s - 3.2s] Backlit Cloud Occlusion & Seamless Scale/Alpha Dissolve into Hero
 */
export function CinematicIntro({ onHandoff }: CinematicIntroProps) {
  const [mounted, setMounted] = useState<boolean>(shouldExecuteColdOpen);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onHandoffRef = useRef(onHandoff);

  useEffect(() => {
    onHandoffRef.current = onHandoff;
  }, [onHandoff]);

  useEffect(() => {
    if (!mounted) {
      commitSessionExecuted();
      onHandoffRef.current?.();
      return;
    }

    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) {
      commitSessionExecuted();
      onHandoffRef.current?.();
      setMounted(false);
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
      commitSessionExecuted();
      onHandoffRef.current?.();
      setMounted(false);
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const syncDimensions = () => {
      width = stage.clientWidth || window.innerWidth;
      height = stage.clientHeight || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    syncDimensions();

    const resizeObserver = new ResizeObserver(syncDimensions);
    resizeObserver.observe(stage);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        commitSessionExecuted();
        onHandoffRef.current?.();
        setMounted(false);
      }
    };
    motionQuery.addEventListener('change', onMotionChange);

    // 196 procedurally scintillating stars (> 180 requirement)
    const STAR_COUNT = 196;
    const stars: ScintillatingStar[] = Array.from({ length: STAR_COUNT }, () => {
      const pick = Math.random();
      const hue: ScintillatingStar['hue'] =
        pick < 0.24 ? 'cyan' : pick < 0.36 ? 'rose' : 'white';
      return {
        nx: Math.random(),
        ny: Math.pow(Math.random(), 1.38) * 0.84,
        r: 0.45 + Math.random() * 1.45,
        baseAlpha: 0.24 + Math.random() * 0.64,
        freq: 2.4 + Math.random() * 4.2,
        phase: Math.random() * Math.PI * 2,
        hue,
      };
    });

    const particles: IonParticle[] = [];
    const leadRibbon: Vec2[] = [];
    const fragmentRibbon: Vec2[] = [];

    let rafId = 0;
    const t0 = performance.now();
    let prevNow = t0;
    let handoffFired = false;
    let splitShockFired = false;

    const drawIonPlume = (
      pts: Vec2[],
      baseThickness: number,
      coreRgb: string,
      coronaRgb: string,
      intensity: number
    ) => {
      if (pts.length < 2) return;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 1; i < pts.length; i++) {
        const u = i / pts.length;
        const a = pts[i - 1];
        const b = pts[i];

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineWidth = baseThickness * u * 3.1;
        ctx.strokeStyle = `rgba(${coronaRgb}, ${(u * u * 0.34 * intensity).toFixed(3)})`;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineWidth = Math.max(0.75, baseThickness * Math.pow(u, 1.35));
        ctx.strokeStyle = `rgba(${coreRgb}, ${(Math.pow(u, 1.3) * 0.92 * intensity).toFixed(3)})`;
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawAnamorphicNucleus = (
      x: number,
      y: number,
      radius: number,
      coronaRgb: string,
      streakHalfWidth: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      // Multi-stop optical corona
      const radial = ctx.createRadialGradient(x, y, 0, x, y, radius * 10);
      radial.addColorStop(0, `rgba(255, 255, 255, ${(0.98 * alpha).toFixed(3)})`);
      radial.addColorStop(0.2, `rgba(${coronaRgb}, ${(0.85 * alpha).toFixed(3)})`);
      radial.addColorStop(0.55, `rgba(${coronaRgb}, ${(0.24 * alpha).toFixed(3)})`);
      radial.addColorStop(1, `rgba(${coronaRgb}, 0)`);
      ctx.fillStyle = radial;
      ctx.beginPath();
      ctx.arc(x, y, radius * 10, 0, Math.PI * 2);
      ctx.fill();

      // Chromatic-aberrated horizontal anamorphic lens flare
      const cyanStreak = ctx.createLinearGradient(x - streakHalfWidth, y, x + streakHalfWidth, y);
      cyanStreak.addColorStop(0, 'rgba(56, 189, 248, 0)');
      cyanStreak.addColorStop(0.5, `rgba(56, 189, 248, ${(0.65 * alpha).toFixed(3)})`);
      cyanStreak.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = cyanStreak;
      ctx.fillRect(x - streakHalfWidth, y - 1.6, streakHalfWidth * 2, 1.2);

      const goldStreak = ctx.createLinearGradient(x - streakHalfWidth, y, x + streakHalfWidth, y);
      goldStreak.addColorStop(0, 'rgba(254, 240, 138, 0)');
      goldStreak.addColorStop(0.5, `rgba(254, 240, 138, ${(0.58 * alpha).toFixed(3)})`);
      goldStreak.addColorStop(1, 'rgba(254, 240, 138, 0)');
      ctx.fillStyle = goldStreak;
      ctx.fillRect(x - streakHalfWidth, y + 0.5, streakHalfWidth * 2, 1.1);

      const coreStreak = ctx.createLinearGradient(
        x - streakHalfWidth * 0.75,
        y,
        x + streakHalfWidth * 0.75,
        y
      );
      coreStreak.addColorStop(0, 'rgba(255, 255, 255, 0)');
      coreStreak.addColorStop(0.5, `rgba(255, 255, 255, ${(0.96 * alpha).toFixed(3)})`);
      coreStreak.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = coreStreak;
      ctx.fillRect(x - streakHalfWidth * 0.75, y - 0.7, streakHalfWidth * 1.5, 1.4);

      // Crystalline white core
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawBacklitCloudHorizon = (wash: number) => {
      ctx.save();
      ctx.globalAlpha = wash;

      // Volumetric Crepuscular Rays (God Rays) cast upward from behind horizon clouds
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const originX = width * 0.68;
      const originY = height * 0.98;
      const rayAngles = [-0.95, -0.68, -0.42, -0.18, 0.08, 0.34];
      for (let r = 0; r < rayAngles.length; r++) {
        const ang = rayAngles[r] - Math.PI / 2;
        const spread = 0.055 + (r % 2) * 0.025;
        const len = Math.max(width, height) * 0.9;
        const rayGrad = ctx.createRadialGradient(originX, originY, 10, originX, originY, len * 0.78);
        rayGrad.addColorStop(0, 'rgba(254, 240, 138, 0.16)');
        rayGrad.addColorStop(0.35, 'rgba(217, 78, 22, 0.08)');
        rayGrad.addColorStop(1, 'rgba(124, 18, 74, 0)');

        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(originX + Math.cos(ang - spread) * len, originY + Math.sin(ang - spread) * len);
        ctx.lineTo(originX + Math.cos(ang + spread) * len, originY + Math.sin(ang + spread) * len);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Backlit Cumulus Silhouette Ridge (occludes descending comet trajectory)
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, height * 0.87);
      ctx.bezierCurveTo(
        width * 0.16,
        height * 0.83,
        width * 0.31,
        height * 0.89,
        width * 0.48,
        height * 0.84
      );
      ctx.bezierCurveTo(
        width * 0.63,
        height * 0.79,
        width * 0.77,
        height * 0.82,
        width * 0.9,
        height * 0.86
      );
      ctx.lineTo(width, height * 0.84);
      ctx.lineTo(width, height);
      ctx.closePath();

      const cloudFill = ctx.createLinearGradient(0, height * 0.79, 0, height);
      cloudFill.addColorStop(0, '#140e2e');
      cloudFill.addColorStop(0.55, '#07091c');
      cloudFill.addColorStop(1, '#050714');
      ctx.fillStyle = cloudFill;
      ctx.fill();

      // Sharp Crepuscular Solar-Gold Rim Highlight along Cloud Crest
      const rimStroke = ctx.createLinearGradient(0, 0, width, 0);
      rimStroke.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
      rimStroke.addColorStop(0.45, 'rgba(244, 63, 94, 0.68)');
      rimStroke.addColorStop(0.68, 'rgba(254, 240, 138, 0.95)');
      rimStroke.addColorStop(0.86, 'rgba(217, 78, 22, 0.75)');
      rimStroke.addColorStop(1, 'rgba(124, 18, 74, 0.4)');
      ctx.strokeStyle = rimStroke;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    const tick = (now: number) => {
      const elapsed = (now - t0) / 1000;
      const dt = Math.min((now - prevNow) / 1000, 0.05);
      prevNow = now;

      if (elapsed >= HANDOFF_SEC && !handoffFired) {
        handoffFired = true;
        commitSessionExecuted();
        onHandoffRef.current?.();
      }

      if (elapsed >= DURATION_SEC) {
        commitSessionExecuted();
        setMounted(false);
        return;
      }

      // [0.0s - 0.8s] Deep Stratosphere Ignition wash factor
      const ignition = easeOutQuart(elapsed / 0.8);

      // [2.2s - 3.2s] Seamless Horizon Scale & Alpha Dissolve
      if (elapsed >= HANDOFF_SEC) {
        const d = easeInOutCubic((elapsed - HANDOFF_SEC) / (DURATION_SEC - HANDOFF_SEC));
        const alpha = 1 - d;
        const scale = 1 + d * 0.042;
        stage.style.opacity = alpha.toFixed(3);
        stage.style.transform = `scale(${scale.toFixed(4)})`;
      }

      ctx.clearRect(0, 0, width, height);

      // Base Zenith Void
      ctx.fillStyle = '#050714';
      ctx.fillRect(0, 0, width, height);

      // Multi-stop Katawaredoki Rayleigh Scattering Wash
      const washHeight = height * (0.35 + 0.65 * ignition);
      ctx.save();
      ctx.globalAlpha = ignition;
      const sky = ctx.createLinearGradient(0, 0, 0, washHeight);
      sky.addColorStop(0.0, '#050714');
      sky.addColorStop(0.28, '#0d1338');
      sky.addColorStop(0.54, '#261442');
      sky.addColorStop(0.76, '#7c124a');
      sky.addColorStop(0.92, '#d94e16');
      sky.addColorStop(1.0, '#fef08a');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      // Solar Horizon Flare Radial Bloom
      const flareGlow = ctx.createRadialGradient(
        width * 0.68,
        height * 0.94,
        0,
        width * 0.68,
        height * 0.94,
        Math.max(width, height) * 0.52
      );
      flareGlow.addColorStop(0, 'rgba(254, 240, 138, 0.46)');
      flareGlow.addColorStop(0.24, 'rgba(217, 78, 22, 0.3)');
      flareGlow.addColorStop(0.58, 'rgba(124, 18, 74, 0.14)');
      flareGlow.addColorStop(1, 'rgba(5, 7, 20, 0)');
      ctx.fillStyle = flareGlow;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // 196 Scintillating Stars with Sine-Modulated Alpha
      ctx.save();
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const osc = Math.sin(elapsed * s.freq + s.phase) * 0.3;
        const a = clamp((s.baseAlpha + osc) * ignition, 0.04, 0.98);
        const sx = s.nx * width;
        const sy = s.ny * height;

        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        if (s.hue === 'cyan') {
          ctx.fillStyle = `rgba(56, 189, 248, ${a.toFixed(3)})`;
        } else if (s.hue === 'rose') {
          ctx.fillStyle = `rgba(244, 63, 94, ${a.toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${a.toFixed(3)})`;
        }
        ctx.fill();
      }
      ctx.restore();

      // [0.8s - 2.2s+] Tiamat Splintering Trajectory (descends behind cloud silhouette)
      if (elapsed >= 0.8) {
        // Normalized trajectory t: reaches 1.0 at 2.45s as nucleus dips behind backlit clouds
        const tNorm = clamp((elapsed - 0.8) / 1.65, 0, 1);

        const x0 = width * 0.08;
        const xEnd = width * 0.78;
        const y0 = height * 0.16;
        const yEnd = height * 0.91;
        const hArc = height * 0.18;

        // Exact Parabolic Vector Traversal Formula:
        // X(t) = X0 + (X_end - X0) * t
        // Y(t) = Y0 + (Y_end - Y0) * t^1.3 - H_arc * sin(PI * t)
        const leadX = x0 + (xEnd - x0) * tNorm;
        const leadY =
          y0 + (yEnd - y0) * Math.pow(tNorm, 1.3) - hArc * Math.sin(Math.PI * tNorm);

        const activeFlight = elapsed <= 2.48;

        if (activeFlight) {
          leadRibbon.push({ x: leadX, y: leadY });
          if (leadRibbon.length > 48) leadRibbon.shift();

          const emitCount = width < 640 ? 3 : 5;
          for (let e = 0; e < emitCount; e++) {
            particles.push({
              x: leadX + (Math.random() - 0.5) * 4,
              y: leadY + (Math.random() - 0.5) * 4,
              vx: -(46 + Math.random() * 82),
              vy: -(18 + Math.random() * 44),
              life: 0,
              maxLife: 0.48 + Math.random() * 0.65,
              size: 0.9 + Math.random() * 2.1,
              tone: 'cyan',
            });
          }
        } else if (leadRibbon.length > 0) {
          leadRibbon.shift();
        }

        // Secondary Ruby-Rose Fragment Splitting at t = 0.25
        const splitT = 0.25;
        if (tNorm >= splitT) {
          const s = (tNorm - splitT) / (1 - splitT);
          const fragX = leadX - s * (width * 0.068);
          const fragY = leadY + s * (height * 0.028) + s * s * (height * 0.095);

          if (!splitShockFired) {
            splitShockFired = true;
            for (let k = 0; k < 28; k++) {
              const theta = Math.random() * Math.PI * 2;
              const spd = 28 + Math.random() * 96;
              particles.push({
                x: leadX,
                y: leadY,
                vx: Math.cos(theta) * spd - 24,
                vy: Math.sin(theta) * spd,
                life: 0,
                maxLife: 0.55 + Math.random() * 0.75,
                size: 1.1 + Math.random() * 2.3,
                tone: k % 2 === 0 ? 'rose' : 'magenta',
              });
            }
          }

          if (activeFlight) {
            fragmentRibbon.push({ x: fragX, y: fragY });
            if (fragmentRibbon.length > 38) fragmentRibbon.shift();

            const fragCount = width < 640 ? 2 : 4;
            for (let f = 0; f < fragCount; f++) {
              particles.push({
                x: fragX + (Math.random() - 0.5) * 4,
                y: fragY + (Math.random() - 0.5) * 4,
                vx: -(36 + Math.random() * 64),
                vy: -(8 + Math.random() * 28),
                life: 0,
                maxLife: 0.5 + Math.random() * 0.72,
                size: 0.9 + Math.random() * 2.0,
                tone: Math.random() < 0.68 ? 'rose' : 'magenta',
              });
            }
          } else if (fragmentRibbon.length > 0) {
            fragmentRibbon.shift();
          }

          drawIonPlume(fragmentRibbon, 4.0, '255, 225, 236', '244, 63, 94', 0.95);
          if (activeFlight) {
            drawAnamorphicNucleus(
              fragX,
              fragY,
              3.2,
              '244, 63, 94',
              width < 640 ? 46 : 84,
              0.92
            );
          }
        }

        drawIonPlume(leadRibbon, 6.2, '255, 255, 255', '56, 189, 248', 1.0);
        if (activeFlight) {
          drawAnamorphicNucleus(
            leadX,
            leadY,
            4.8,
            '56, 189, 248',
            width < 640 ? 78 : 148,
            1.0
          );
        }

        // Peak-Velocity Full-Horizon Anamorphic Lens Streak Wipe (around 1.35s - 2.15s)
        if (elapsed >= 1.25 && elapsed <= 2.25) {
          const flareWave = Math.sin(((elapsed - 1.25) / 1.0) * Math.PI);
          const flareY = leadY;
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';

          const hGrad = ctx.createLinearGradient(0, flareY, width, flareY);
          hGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
          hGrad.addColorStop(0.25, `rgba(56, 189, 248, ${(0.42 * flareWave).toFixed(3)})`);
          hGrad.addColorStop(0.55, `rgba(255, 255, 255, ${(0.78 * flareWave).toFixed(3)})`);
          hGrad.addColorStop(0.82, `rgba(254, 240, 138, ${(0.48 * flareWave).toFixed(3)})`);
          hGrad.addColorStop(1, 'rgba(217, 78, 22, 0)');

          ctx.fillStyle = hGrad;
          ctx.fillRect(0, flareY - 1.1, width, 2.2);
          ctx.restore();
        }
      }

      // Aerodynamic-Drag Stardust & Ion Particles
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const drag = Math.exp(-2.1 * dt);
        p.vx *= drag;
        p.vy = p.vy * drag + 26 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const rem = 1 - p.life / p.maxLife;
        const alpha = rem * rem * 0.9;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.4 + 0.6 * rem), 0, Math.PI * 2);
        if (p.tone === 'cyan') {
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha.toFixed(3)})`;
        } else if (p.tone === 'rose') {
          ctx.fillStyle = `rgba(244, 63, 94, ${alpha.toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(192, 132, 252, ${alpha.toFixed(3)})`;
        }
        ctx.fill();
      }
      ctx.restore();

      // Foreground Backlit Cloud Silhouette & Crepuscular God Rays (occludes descending comet)
      drawBacklitCloudHorizon(ignition);

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      motionQuery.removeEventListener('change', onMotionChange);
      particles.length = 0;
      leadRibbon.length = 0;
      fragmentRibbon.length = 0;
      canvas.width = 0;
      canvas.height = 0;
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={stageRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[260] overflow-hidden bg-zenith-void select-none"
      style={{ willChange: 'transform, opacity' }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

export default CinematicIntro;
