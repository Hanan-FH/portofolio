import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotionNow } from '../../hooks/useReducedMotion';

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
  spike: boolean;
  hue: 0 | 1 | 2; // 0: white, 1: cyan, 2: rose
}

interface IonParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  tone: 0 | 1 | 2 | 3; // 0: cyan, 1: rose, 2: magenta, 3: gold
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
  if (prefersReducedMotionNow()) return false;

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

function makeOffscreen(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function createGlowDotSprite(size: number, rgb: string, coreRatio = 0.35): HTMLCanvasElement {
  const c = makeOffscreen(size, size);
  const g = c.getContext('2d');
  if (g) {
    const half = size / 2;
    const grad = g.createRadialGradient(half, half, 0, half, half, half);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(coreRatio, `rgba(${rgb}, 0.92)`);
    grad.addColorStop(0.72, `rgba(${rgb}, 0.25)`);
    grad.addColorStop(1, `rgba(${rgb}, 0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
  }
  return c;
}

function createNucleusSprite(coronaRgb: string): HTMLCanvasElement {
  const w = 360;
  const h = 120;
  const c = makeOffscreen(w, h);
  const g = c.getContext('2d');
  if (!g) return c;

  const cx = w / 2;
  const cy = h / 2;
  g.globalCompositeOperation = 'lighter';

  const radial = g.createRadialGradient(cx, cy, 0, cx, cy, 56);
  radial.addColorStop(0, 'rgba(255, 255, 255, 0.99)');
  radial.addColorStop(0.18, `rgba(${coronaRgb}, 0.88)`);
  radial.addColorStop(0.52, `rgba(${coronaRgb}, 0.26)`);
  radial.addColorStop(1, `rgba(${coronaRgb}, 0)`);
  g.fillStyle = radial;
  g.beginPath();
  g.arc(cx, cy, 56, 0, Math.PI * 2);
  g.fill();

  const cyanStreak = g.createLinearGradient(0, cy, w, cy);
  cyanStreak.addColorStop(0, 'rgba(56, 189, 248, 0)');
  cyanStreak.addColorStop(0.5, 'rgba(56, 189, 248, 0.68)');
  cyanStreak.addColorStop(1, 'rgba(56, 189, 248, 0)');
  g.fillStyle = cyanStreak;
  g.fillRect(0, cy - 1.7, w, 1.2);

  const goldStreak = g.createLinearGradient(0, cy, w, cy);
  goldStreak.addColorStop(0, 'rgba(254, 240, 138, 0)');
  goldStreak.addColorStop(0.5, 'rgba(254, 240, 138, 0.62)');
  goldStreak.addColorStop(1, 'rgba(254, 240, 138, 0)');
  g.fillStyle = goldStreak;
  g.fillRect(0, cy + 0.5, w, 1.15);

  const coreStreak = g.createLinearGradient(cx - w * 0.39, cy, cx + w * 0.39, cy);
  coreStreak.addColorStop(0, 'rgba(255, 255, 255, 0)');
  coreStreak.addColorStop(0.5, 'rgba(255, 255, 255, 0.97)');
  coreStreak.addColorStop(1, 'rgba(255, 255, 255, 0)');
  g.fillStyle = coreStreak;
  g.fillRect(cx - w * 0.39, cy - 0.7, w * 0.78, 1.45);

  g.fillStyle = '#ffffff';
  g.beginPath();
  g.arc(cx, cy, 5, 0, Math.PI * 2);
  g.fill();

  return c;
}

/**
 * Unskippable 3.2-Second Optical Cold-Open Engine (Makoto Shinkai Katawaredoki Physics).
 * [0.0s - 0.8s] Deep Stratosphere Ignition & 212 Scintillating Stars
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
    let dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    /* Pre-rendered optical sprites & cached backdrop surfaces (zero per-frame gradient allocation) */
    const starSprites = [
      createGlowDotSprite(16, '255, 255, 255', 0.45),
      createGlowDotSprite(16, '56, 189, 248', 0.4),
      createGlowDotSprite(16, '244, 63, 94', 0.4),
    ];
    const particleSprites = [
      createGlowDotSprite(16, '56, 189, 248', 0.35),
      createGlowDotSprite(16, '244, 63, 94', 0.35),
      createGlowDotSprite(16, '192, 132, 252', 0.35),
      createGlowDotSprite(16, '254, 240, 138', 0.35),
    ];
    const leadNucleusSprite = createNucleusSprite('56, 189, 248');
    const fragNucleusSprite = createNucleusSprite('244, 63, 94');

    const skyGradCache = makeOffscreen(1, 256);
    {
      const sg = skyGradCache.getContext('2d');
      if (sg) {
        const sky = sg.createLinearGradient(0, 0, 0, 256);
        sky.addColorStop(0.0, '#050714');
        sky.addColorStop(0.34, '#0d1435');
        sky.addColorStop(0.6, '#24123e');
        sky.addColorStop(0.78, '#6d1146');
        sky.addColorStop(0.91, '#c2410c');
        sky.addColorStop(1.0, '#fde047');
        sg.fillStyle = sky;
        sg.fillRect(0, 0, 1, 256);
      }
    }

    let nebulaCache = makeOffscreen(1, 1);
    let cloudCache = makeOffscreen(1, 1);
    let horizonStreakGrad: CanvasGradient | null = null;

    const rebuildCaches = () => {
      const cw = Math.max(1, Math.floor(width * dpr));
      const ch = Math.max(1, Math.floor(height * dpr));

      nebulaCache = makeOffscreen(cw, ch);
      const ng = nebulaCache.getContext('2d');
      if (ng) {
        ng.setTransform(dpr, 0, 0, dpr, 0, 0);
        const nebula = ng.createLinearGradient(width * 0.05, 0, width * 0.82, height * 0.85);
        nebula.addColorStop(0, 'rgba(56, 189, 248, 0.09)');
        nebula.addColorStop(0.45, 'rgba(124, 18, 74, 0.11)');
        nebula.addColorStop(1, 'rgba(254, 240, 138, 0)');
        ng.fillStyle = nebula;
        ng.fillRect(0, 0, width, height);

        const flareGlow = ng.createRadialGradient(
          width * 0.68,
          height * 0.94,
          0,
          width * 0.68,
          height * 0.94,
          Math.max(width, height) * 0.54
        );
        flareGlow.addColorStop(0, 'rgba(254, 240, 138, 0.48)');
        flareGlow.addColorStop(0.24, 'rgba(217, 78, 22, 0.32)');
        flareGlow.addColorStop(0.58, 'rgba(124, 18, 74, 0.15)');
        flareGlow.addColorStop(1, 'rgba(5, 7, 20, 0)');
        ng.fillStyle = flareGlow;
        ng.fillRect(0, 0, width, height);
      }

      cloudCache = makeOffscreen(cw, ch);
      const cg = cloudCache.getContext('2d');
      if (cg) {
        cg.setTransform(dpr, 0, 0, dpr, 0, 0);

        cg.save();
        cg.globalCompositeOperation = 'lighter';
        const originX = width * 0.68;
        const originY = height * 0.98;
        const rayAngles = [-1.02, -0.74, -0.48, -0.22, 0.04, 0.28, 0.52];
        const len = Math.max(width, height) * 0.94;
        const rayGrad = cg.createRadialGradient(originX, originY, 10, originX, originY, len * 0.8);
        rayGrad.addColorStop(0, 'rgba(254, 240, 138, 0.18)');
        rayGrad.addColorStop(0.35, 'rgba(217, 78, 22, 0.09)');
        rayGrad.addColorStop(1, 'rgba(124, 18, 74, 0)');
        cg.fillStyle = rayGrad;

        for (let r = 0; r < rayAngles.length; r++) {
          const ang = rayAngles[r] - Math.PI / 2;
          const spread = 0.052 + (r % 2) * 0.026;
          cg.beginPath();
          cg.moveTo(originX, originY);
          cg.lineTo(originX + Math.cos(ang - spread) * len, originY + Math.sin(ang - spread) * len);
          cg.lineTo(originX + Math.cos(ang + spread) * len, originY + Math.sin(ang + spread) * len);
          cg.closePath();
          cg.fill();
        }
        cg.restore();

        cg.beginPath();
        cg.moveTo(0, height);
        cg.lineTo(0, height * 0.84);
        cg.bezierCurveTo(width * 0.18, height * 0.78, width * 0.34, height * 0.85, width * 0.54, height * 0.77);
        cg.bezierCurveTo(width * 0.69, height * 0.71, width * 0.83, height * 0.76, width, height * 0.81);
        cg.lineTo(width, height);
        cg.closePath();
        const distantCloud = cg.createLinearGradient(0, height * 0.71, 0, height);
        distantCloud.addColorStop(0, 'rgba(38, 20, 66, 0.85)');
        distantCloud.addColorStop(0.5, 'rgba(13, 19, 56, 0.95)');
        distantCloud.addColorStop(1, '#050714');
        cg.fillStyle = distantCloud;
        cg.fill();

        cg.beginPath();
        cg.moveTo(0, height);
        cg.lineTo(0, height * 0.88);
        cg.bezierCurveTo(width * 0.16, height * 0.84, width * 0.31, height * 0.9, width * 0.48, height * 0.845);
        cg.bezierCurveTo(width * 0.63, height * 0.795, width * 0.77, height * 0.825, width * 0.9, height * 0.865);
        cg.lineTo(width, height * 0.845);
        cg.lineTo(width, height);
        cg.closePath();

        const cloudFill = cg.createLinearGradient(0, height * 0.79, 0, height);
        cloudFill.addColorStop(0, '#120d2b');
        cloudFill.addColorStop(0.55, '#07091c');
        cloudFill.addColorStop(1, '#050714');
        cg.fillStyle = cloudFill;
        cg.fill();

        const rimStroke = cg.createLinearGradient(0, 0, width, 0);
        rimStroke.addColorStop(0, 'rgba(56, 189, 248, 0.38)');
        rimStroke.addColorStop(0.42, 'rgba(244, 63, 94, 0.72)');
        rimStroke.addColorStop(0.68, 'rgba(254, 240, 138, 0.96)');
        rimStroke.addColorStop(0.86, 'rgba(217, 78, 22, 0.78)');
        rimStroke.addColorStop(1, 'rgba(124, 18, 74, 0.42)');
        cg.strokeStyle = rimStroke;
        cg.lineWidth = 1.5;
        cg.stroke();
      }

      horizonStreakGrad = ctx.createLinearGradient(0, 0, width, 0);
      horizonStreakGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
      horizonStreakGrad.addColorStop(0.24, 'rgba(56, 189, 248, 0.46)');
      horizonStreakGrad.addColorStop(0.55, 'rgba(255, 255, 255, 0.84)');
      horizonStreakGrad.addColorStop(0.82, 'rgba(254, 240, 138, 0.52)');
      horizonStreakGrad.addColorStop(1, 'rgba(217, 78, 22, 0)');
    };

    const syncDimensions = () => {
      width = stage.clientWidth || window.innerWidth;
      height = stage.clientHeight || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildCaches();
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

    // 212 procedurally scintillating stars (> 180 requirement)
    const STAR_COUNT = 212;
    const stars: ScintillatingStar[] = Array.from({ length: STAR_COUNT }, (_, idx) => {
      const pick = Math.random();
      const hue: ScintillatingStar['hue'] = pick < 0.25 ? 1 : pick < 0.38 ? 2 : 0;
      const r = 0.42 + Math.random() * 1.48;
      return {
        nx: Math.random(),
        ny: Math.pow(Math.random(), 1.38) * 0.85,
        r,
        baseAlpha: 0.24 + Math.random() * 0.66,
        freq: 2.3 + Math.random() * 4.4,
        phase: Math.random() * Math.PI * 2,
        spike: idx % 17 === 0 || r > 1.68,
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
    let splitShockElapsed = -1;
    let splitOriginX = 0;
    let splitOriginY = 0;

    const drawDustComaFan = (pts: Vec2[]) => {
      if (pts.length < 6) return;
      const head = pts[pts.length - 1];
      const tail = pts[0];
      const mid = pts[Math.floor(pts.length * 0.45)];

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const comaGrad = ctx.createLinearGradient(head.x, head.y, tail.x, tail.y);
      comaGrad.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
      comaGrad.addColorStop(0.28, 'rgba(56, 189, 248, 0.18)');
      comaGrad.addColorStop(0.65, 'rgba(254, 240, 138, 0.08)');
      comaGrad.addColorStop(1, 'rgba(124, 18, 74, 0)');

      ctx.fillStyle = comaGrad;
      ctx.beginPath();
      ctx.moveTo(head.x, head.y);
      ctx.quadraticCurveTo(mid.x - 18, mid.y - 34, tail.x - 42, tail.y - 52);
      ctx.lineTo(tail.x - 8, tail.y + 8);
      ctx.quadraticCurveTo(mid.x - 4, mid.y + 4, head.x, head.y);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawIonPlume = (
      pts: Vec2[],
      baseThickness: number,
      coreRgb: string,
      coronaRgb: string
    ) => {
      if (pts.length < 2) return;
      const bands = 8;
      const totalSegs = pts.length - 1;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let b = 0; b < bands; b++) {
        const startIdx = Math.floor((b * totalSegs) / bands);
        const endIdx = Math.min(totalSegs, Math.floor(((b + 1) * totalSegs) / bands));
        if (endIdx <= startIdx) continue;
        const u = (b + 1) / bands;

        ctx.beginPath();
        ctx.moveTo(pts[startIdx].x, pts[startIdx].y);
        for (let i = startIdx + 1; i <= endIdx; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }

        ctx.lineWidth = baseThickness * u * 3.3;
        ctx.strokeStyle = `rgba(${coronaRgb}, ${(u * u * 0.36).toFixed(2)})`;
        ctx.stroke();

        ctx.lineWidth = Math.max(0.8, baseThickness * Math.pow(u, 1.35));
        ctx.strokeStyle = `rgba(${coreRgb}, ${(Math.pow(u, 1.28) * 0.94).toFixed(2)})`;
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawAnamorphicNucleus = (
      sprite: HTMLCanvasElement,
      x: number,
      y: number,
      scale: number,
      streakHalfWidth: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = alpha;
      const drawW = streakHalfWidth * 2;
      const drawH = 120 * scale;
      ctx.drawImage(sprite, x - streakHalfWidth, y - drawH * 0.5, drawW, drawH);
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

      const ignition = easeOutQuart(elapsed / 0.8);

      if (elapsed >= HANDOFF_SEC) {
        const d = easeInOutCubic((elapsed - HANDOFF_SEC) / (DURATION_SEC - HANDOFF_SEC));
        stage.style.opacity = (1 - d).toFixed(3);
        stage.style.transform = `scale(${(1 + d * 0.045).toFixed(4)})`;
      }

      // Base Zenith Void + Cached Rayleigh Sky & Nebula Wash
      ctx.fillStyle = '#050714';
      ctx.fillRect(0, 0, width, height);

      const washHeight = height * (0.35 + 0.65 * ignition);
      ctx.save();
      ctx.globalAlpha = ignition;
      ctx.drawImage(skyGradCache, 0, 0, width, washHeight);
      ctx.drawImage(nebulaCache, 0, 0, width, height);
      ctx.restore();

      // 212 Scintillating Stars using pre-rendered sprites + batched diffraction spikes
      ctx.save();
      const spikePath = new Path2D();
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const osc = Math.sin(elapsed * s.freq + s.phase) * 0.3;
        const a = clamp((s.baseAlpha + osc) * ignition, 0.04, 0.98);
        const sx = s.nx * width;
        const sy = s.ny * height;
        const size = s.r * 3.8;

        ctx.globalAlpha = a;
        ctx.drawImage(starSprites[s.hue], sx - size * 0.5, sy - size * 0.5, size, size);

        if (s.spike && a > 0.45) {
          const arm = s.r * 4.2;
          spikePath.moveTo(sx - arm, sy);
          spikePath.lineTo(sx + arm, sy);
          spikePath.moveTo(sx, sy - arm);
          spikePath.lineTo(sx, sy + arm);
        }
      }
      ctx.globalAlpha = 0.36 * ignition;
      ctx.strokeStyle = '#e0f2fe';
      ctx.lineWidth = 0.65;
      ctx.stroke(spikePath);
      ctx.restore();

      // [0.8s - 2.2s+] Tiamat Splintering Trajectory (descends behind cloud silhouette)
      if (elapsed >= 0.8) {
        const tNorm = clamp((elapsed - 0.8) / 1.65, 0, 1);

        const x0 = width * 0.08;
        const xEnd = width * 0.78;
        const y0 = height * 0.16;
        const yEnd = height * 0.91;
        const hArc = height * 0.18;

        // Exact Parabolic Vector Traversal Formula
        const leadX = x0 + (xEnd - x0) * tNorm;
        const leadY =
          y0 + (yEnd - y0) * Math.pow(tNorm, 1.3) - hArc * Math.sin(Math.PI * tNorm);

        const activeFlight = elapsed <= 2.48;

        if (activeFlight) {
          leadRibbon.push({ x: leadX, y: leadY });
          if (leadRibbon.length > 52) leadRibbon.shift();

          const emitCount = width < 640 ? 3 : 5;
          for (let e = 0; e < emitCount; e++) {
            if (particles.length >= 160) break;
            particles.push({
              x: leadX + (Math.random() - 0.5) * 4,
              y: leadY + (Math.random() - 0.5) * 4,
              vx: -(46 + Math.random() * 86),
              vy: -(18 + Math.random() * 46),
              life: 0,
              maxLife: 0.48 + Math.random() * 0.66,
              size: 0.9 + Math.random() * 2.1,
              tone: e === 0 ? 3 : 0,
            });
          }
        } else if (leadRibbon.length > 0) {
          leadRibbon.shift();
        }

        const splitT = 0.25;
        if (tNorm >= splitT) {
          const s = (tNorm - splitT) / (1 - splitT);
          const fragX = leadX - s * (width * 0.072);
          const fragY = leadY + s * (height * 0.028) + s * s * (height * 0.098);

          if (splitShockElapsed < 0) {
            splitShockElapsed = elapsed;
            splitOriginX = leadX;
            splitOriginY = leadY;
            for (let k = 0; k < 32; k++) {
              const theta = Math.random() * Math.PI * 2;
              const spd = 28 + Math.random() * 98;
              particles.push({
                x: leadX,
                y: leadY,
                vx: Math.cos(theta) * spd - 24,
                vy: Math.sin(theta) * spd,
                life: 0,
                maxLife: 0.55 + Math.random() * 0.78,
                size: 1.1 + Math.random() * 2.3,
                tone: k % 3 === 0 ? 3 : k % 2 === 0 ? 1 : 2,
              });
            }
          }

          const shockAge = elapsed - splitShockElapsed;
          if (shockAge >= 0 && shockAge < 0.75) {
            const pShock = shockAge / 0.75;
            const ringR = 6 + easeOutQuart(pShock) * (width < 640 ? 48 : 88);
            const ringAlpha = (1 - pShock) * 0.65;
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.beginPath();
            ctx.arc(splitOriginX, splitOriginY, ringR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(244, 63, 94, ${ringAlpha.toFixed(2)})`;
            ctx.lineWidth = 1.4 * (1 - pShock * 0.6);
            ctx.stroke();
            ctx.restore();
          }

          if (activeFlight) {
            fragmentRibbon.push({ x: fragX, y: fragY });
            if (fragmentRibbon.length > 40) fragmentRibbon.shift();

            const fragCount = width < 640 ? 2 : 4;
            for (let f = 0; f < fragCount; f++) {
              if (particles.length >= 160) break;
              particles.push({
                x: fragX + (Math.random() - 0.5) * 4,
                y: fragY + (Math.random() - 0.5) * 4,
                vx: -(36 + Math.random() * 66),
                vy: -(8 + Math.random() * 28),
                life: 0,
                maxLife: 0.52 + Math.random() * 0.72,
                size: 0.9 + Math.random() * 2.0,
                tone: Math.random() < 0.68 ? 1 : 2,
              });
            }
          } else if (fragmentRibbon.length > 0) {
            fragmentRibbon.shift();
          }

          drawIonPlume(fragmentRibbon, 4.1, '255, 225, 236', '244, 63, 94');
          if (activeFlight) {
            drawAnamorphicNucleus(
              fragNucleusSprite,
              fragX,
              fragY,
              0.68,
              width < 640 ? 48 : 88,
              0.92
            );
          }
        }

        drawDustComaFan(leadRibbon);
        drawIonPlume(leadRibbon, 6.4, '255, 255, 255', '56, 189, 248');
        if (activeFlight) {
          drawAnamorphicNucleus(
            leadNucleusSprite,
            leadX,
            leadY,
            1.0,
            width < 640 ? 82 : 156,
            1.0
          );
        }

        // Peak-Velocity Full-Horizon Anamorphic Lens Streak Wipe & Optical Ghosts (1.20s - 2.25s)
        if (elapsed >= 1.2 && elapsed <= 2.25 && horizonStreakGrad) {
          const flareWave = Math.sin(((elapsed - 1.2) / 1.05) * Math.PI);
          const flareY = leadY;
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          ctx.globalAlpha = flareWave;
          ctx.fillStyle = horizonStreakGrad;
          ctx.fillRect(0, flareY - 1.2, width, 2.4);

          const cx = width * 0.5;
          const cy = height * 0.5;
          const ghost1X = cx + (cx - leadX) * 0.45;
          const ghost1Y = cy + (cy - leadY) * 0.45;
          const ghost2X = cx + (cx - leadX) * 0.82;
          const ghost2Y = cy + (cy - leadY) * 0.82;

          ctx.globalAlpha = flareWave * 0.1;
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(ghost1X, ghost1Y, 18, 0, Math.PI * 2);
          ctx.fill();

          ctx.globalAlpha = flareWave * 0.12;
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(ghost2X, ghost2Y, 32, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      // Aerodynamic-Drag Stardust & Ion Particles (O(1) swap-pop, sprite-blitted)
      if (particles.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.life += dt;
          if (p.life >= p.maxLife) {
            particles[i] = particles[particles.length - 1];
            particles.pop();
            continue;
          }

          const drag = Math.exp(-2.1 * dt);
          p.vx *= drag;
          p.vy = p.vy * drag + 26 * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;

          const rem = 1 - p.life / p.maxLife;
          const size = p.size * (0.4 + 0.6 * rem) * 3.4;
          ctx.globalAlpha = rem * rem * 0.92;
          ctx.drawImage(particleSprites[p.tone], p.x - size * 0.5, p.y - size * 0.5, size, size);
        }
        ctx.restore();
      }

      // Cached Foreground Backlit Cloud Silhouette & Crepuscular God Rays
      ctx.save();
      ctx.globalAlpha = ignition;
      ctx.drawImage(cloudCache, 0, 0, width, height);
      ctx.restore();

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
      skyGradCache.width = 0;
      nebulaCache.width = 0;
      cloudCache.width = 0;
      leadNucleusSprite.width = 0;
      fragNucleusSprite.width = 0;
      for (const s of starSprites) s.width = 0;
      for (const s of particleSprites) s.width = 0;
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
