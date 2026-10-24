import { useEffect, useRef, type RefObject } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type RGB = readonly [number, number, number];

const CYAN: RGB = [56, 189, 248];
const ROSE: RGB = [244, 63, 94];
const WHITE: RGB = [255, 255, 255];

/* 2.5D multi-plane cel parallax factors (relative to native document scroll) */
const SKY_FACTOR = 0.02;
const DISTANT_FACTOR = 0.08;
const MID_FACTOR = 0.18;
const SKY_MAX_SHIFT = 180;
const STAR_FACTORS = [0.02, 0.05] as const;

/* Velocity-vector stardust (Z planes: background micro / midground crystal / foreground bokeh) */
const PLANE_Z = [0.2, 1.0, 1.5] as const;
const MAX_STARDUST = 96;
const STARDUST_PX_PER_PARTICLE = 56;
const MIN_SPAWN_VELOCITY = 140;
const DOPPLER_STEPS = 5;

/* Musubi (結び) elastic thread — underdamped spring chain (ζ ≈ 0.26) */
const THREAD_NODES = 11;
const THREAD_SAMPLES = 72;
const THREAD_PAD = 40;
const THREAD_STIFFNESS = 38;
const THREAD_DAMPING = 3.2;
const THREAD_COUPLING = 22;
const THREAD_IMPULSE = 0.0042;
const THREAD_TAUT_VELOCITY = 2600;

/* Content-plane inertial pitch */
const MAX_PITCH_DEG = 1.2;
const PITCH_PER_VELOCITY = 0.0009;

/* SVG path coordinates in normalized 1440-wide design space */
const MOUNTAIN_FILL_D =
  'M0,220 C60,200 110,170 170,178 C230,186 260,140 330,128 C400,116 430,156 500,150 C570,144 600,104 680,96 C760,88 790,132 860,128 C930,124 960,84 1040,92 C1120,100 1150,146 1220,140 C1290,134 1330,112 1380,120 C1410,124 1430,136 1440,140 L1440,300 L0,300 Z';
const MOUNTAIN_RIM_D =
  'M0,220 C60,200 110,170 170,178 C230,186 260,140 330,128 C400,116 430,156 500,150 C570,144 600,104 680,96 C760,88 790,132 860,128 C930,124 960,84 1040,92 C1120,100 1150,146 1220,140 C1290,134 1330,112 1380,120 C1410,124 1430,136 1440,140';
const CUMULUS_FILL_D =
  'M0,150 C70,128 120,104 190,112 C240,82 320,78 370,108 C430,84 500,90 540,118 C600,96 660,70 740,90 C800,62 890,64 940,100 C1000,80 1080,86 1120,112 C1180,92 1260,96 1300,120 C1350,108 1400,116 1440,128 L1440,200 L0,200 Z';
const CUMULUS_RIM_D =
  'M0,150 C70,128 120,104 190,112 C240,82 320,78 370,108 C430,84 500,90 540,118 C600,96 660,70 740,90 C800,62 890,64 940,100 C1000,80 1080,86 1120,112 C1180,92 1260,96 1300,120 C1350,108 1400,116 1440,128';

interface SkyStar {
  nx: number;
  ny: number;
  r: number;
  baseAlpha: number;
  freq: number;
  phase: number;
  depth: 0 | 1;
  spike: boolean;
  rgb: string;
}

interface Stardust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  plane: 0 | 1 | 2;
  size: number;
  life: number;
  maxLife: number;
  v0: number;
  shift: number;
  phase: number;
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
}

type StyleProp = 'transform' | 'opacity' | 'transformOrigin';

export interface AtmosphericScrollEngineProps {
  /** Content plane receiving the ±1.2° velocity-driven inertial pitch (transform-only). */
  contentPlaneRef?: RefObject<HTMLElement | null>;
}

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

function mix(a: RGB, b: RGB, t: number): string {
  return `${Math.round(a[0] + (b[0] - a[0]) * t)}, ${Math.round(a[1] + (b[1] - a[1]) * t)}, ${Math.round(
    a[2] + (b[2] - a[2]) * t
  )}`;
}

function createRadialSprite(size: number, stops: ReadonlyArray<readonly [number, string]>) {
  const sprite = document.createElement('canvas');
  sprite.width = size;
  sprite.height = size;
  const g = sprite.getContext('2d');
  if (g) {
    const half = size / 2;
    const grad = g.createRadialGradient(half, half, 0, half, half, half);
    for (const [offset, color] of stops) grad.addColorStop(offset, color);
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
  }
  return sprite;
}

/**
 * Lightweight Consolidated Master Scroll & Atmosphere Engine.
 *
 * Uses ONE single DPR-capped (<=1.25x) HTML5 Canvas + adaptive idle sleep
 * to keep GPU/RAM usage ultra-low while delivering locked 60/120fps motion:
 *  - Plane 0 (0.02x): Katawaredoki Rayleigh sky, crepuscular rays & scintillating stars.
 *  - Ambient Tiamat dual-tail falling comet (behind the cloud planes).
 *  - Plane 1 (0.08x) & Plane 2 (0.18x): Path2D mountain range & rim-lit cumulus silhouettes.
 *  - Musubi (結び) elastic braided spline: Catmull-Rom spring-chain physics.
 *  - Doppler chromatic stardust dispersion across 3 DoF planes.
 *  - Content plane transient ±1.2° inertial pitch.
 */
export function AtmosphericScrollEngine({ contentPlaneRef }: AtmosphericScrollEngineProps) {
  const skyPlaneRef = useRef<HTMLDivElement | null>(null);
  const twilightRef = useRef<HTMLDivElement | null>(null);
  const raysRef = useRef<SVGSVGElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = !reduceMotion;
    const contentPlane = contentPlaneRef?.current ?? null;

    /* Pre-rendered compact optical sprites (zero per-frame shadowBlur) */
    const bokehSprites = Array.from({ length: DOPPLER_STEPS }, (_, i) => {
      const rgb = mix(ROSE, CYAN, i / (DOPPLER_STEPS - 1));
      return createRadialSprite(44, [
        [0, `rgba(${rgb}, 0.5)`],
        [0.6, `rgba(${rgb}, 0.34)`],
        [0.82, `rgba(${rgb}, 0.62)`],
        [1, `rgba(${rgb}, 0)`],
      ]);
    });
    const cometSprite = createRadialSprite(44, [
      [0, 'rgba(255, 255, 255, 1)'],
      [0.22, 'rgba(56, 189, 248, 0.75)'],
      [0.6, 'rgba(56, 189, 248, 0.16)'],
      [1, 'rgba(56, 189, 248, 0)'],
    ]);
    const knotSprite = createRadialSprite(36, [
      [0, 'rgba(253, 224, 71, 0.95)'],
      [0.3, 'rgba(245, 158, 11, 0.45)'],
      [1, 'rgba(225, 29, 72, 0)'],
    ]);

    const mountainFillPath = new Path2D(MOUNTAIN_FILL_D);
    const mountainRimPath = new Path2D(MOUNTAIN_RIM_D);
    const cumulusFillPath = new Path2D(CUMULUS_FILL_D);
    const cumulusRimPath = new Path2D(CUMULUS_RIM_D);

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = 1;
    let docHeight = document.documentElement.scrollHeight;
    let planeTop = 0;
    let threadBaseX = 0;
    let restAmp = 16;
    let distantH = 1;
    let midH = 1;
    let threadGradient: CanvasGradient | null = null;
    let threadHalo: CanvasGradient | null = null;
    let mountainGrad: CanvasGradient | null = null;
    let cumulusGrad: CanvasGradient | null = null;
    let cumulusRimGrad: CanvasGradient | null = null;

    const stars: SkyStar[] = [];
    const dust: Stardust[] = [];
    const nodeOffset = new Float32Array(THREAD_NODES);
    const nodeVelocity = new Float32Array(THREAD_NODES);
    const sampleX = new Float32Array(THREAD_SAMPLES + 1);
    const sampleY = new Float32Array(THREAD_SAMPLES + 1);

    let scrollY = window.scrollY;
    let lastScrollY = scrollY;
    let velocity = 0;
    let accel = 0;
    let pitch = 0;
    let tiltApplied = false;
    let spawnAccumulator = 0;
    let comet: Comet | null = null;
    let nextCometAt = 5 + Math.random() * 5;
    let elapsed = 0;

    const styleCache = new WeakMap<Element, Partial<Record<StyleProp, string>>>();
    const setStyle = (el: HTMLElement | SVGElement | null, prop: StyleProp, value: string) => {
      if (!el) return;
      let cache = styleCache.get(el);
      if (!cache) {
        cache = {};
        styleCache.set(el, cache);
      }
      if (cache[prop] === value) return;
      cache[prop] = value;
      el.style[prop] = value;
    };

    const measureDocument = () => {
      docHeight = document.documentElement.scrollHeight;
      planeTop = contentPlane?.offsetTop ?? 0;
    };

    const seedStars = () => {
      stars.length = 0;
      const total = width < 768 ? 92 : 148;
      for (let i = 0; i < total; i++) {
        const c = Math.random();
        const r = 0.44 + Math.random() * 1.38;
        stars.push({
          nx: Math.random(),
          ny: Math.pow(Math.random(), 1.2) * 0.96,
          r,
          baseAlpha: 0.22 + Math.random() * 0.6,
          freq: 0.85 + Math.random() * 2.0,
          phase: Math.random() * Math.PI * 2,
          depth: i % 3 === 0 ? 1 : 0,
          spike: i % 24 === 0 || r > 1.6,
          rgb: c < 0.24 ? '56, 189, 248' : c < 0.36 ? '244, 63, 94' : '255, 255, 255',
        });
      }
    };

    const restShape = (i: number, breathe: number) =>
      restAmp * Math.sin((Math.PI * i) / (THREAD_NODES - 1)) * breathe;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      // Cap DPR at 1.25x to keep backing buffer ~61% lighter than 2.0x with crisp antialiasing
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const containerWidth = Math.min(width, 1248);
      const gutter = (width - containerWidth) / 2;
      threadBaseX = width < 768 ? 10 : gutter > 80 ? gutter * 0.5 : Math.max(18, width * 0.025);
      restAmp = width < 768 ? 7 : 16;
      distantH = height * 0.3;
      midH = height * 0.18;

      threadGradient = ctx.createLinearGradient(0, 0, 0, height);
      threadGradient.addColorStop(0, 'rgba(225, 29, 72, 0)');
      threadGradient.addColorStop(0.16, 'rgba(225, 29, 72, 0.62)');
      threadGradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.88)');
      threadGradient.addColorStop(0.84, 'rgba(225, 29, 72, 0.62)');
      threadGradient.addColorStop(1, 'rgba(225, 29, 72, 0)');

      threadHalo = ctx.createLinearGradient(0, 0, 0, height);
      threadHalo.addColorStop(0, 'rgba(225, 29, 72, 0)');
      threadHalo.addColorStop(0.5, 'rgba(245, 158, 11, 0.14)');
      threadHalo.addColorStop(1, 'rgba(225, 29, 72, 0)');

      mountainGrad = ctx.createLinearGradient(0, 0, 0, 300);
      mountainGrad.addColorStop(0, 'rgba(109, 17, 70, 0.5)');
      mountainGrad.addColorStop(0.45, 'rgba(36, 18, 62, 0.84)');
      mountainGrad.addColorStop(1, 'rgba(13, 20, 53, 1)');

      cumulusGrad = ctx.createLinearGradient(0, 0, 0, 200);
      cumulusGrad.addColorStop(0, 'rgba(36, 18, 62, 0.92)');
      cumulusGrad.addColorStop(1, 'rgba(5, 7, 20, 1)');

      cumulusRimGrad = ctx.createLinearGradient(0, 0, 1440, 0);
      cumulusRimGrad.addColorStop(0, 'rgba(56, 189, 248, 0.3)');
      cumulusRimGrad.addColorStop(0.35, 'rgba(244, 63, 94, 0.55)');
      cumulusRimGrad.addColorStop(0.65, 'rgba(253, 224, 71, 0.9)');
      cumulusRimGrad.addColorStop(0.85, 'rgba(194, 65, 12, 0.7)');
      cumulusRimGrad.addColorStop(1, 'rgba(36, 18, 62, 0.35)');

      seedStars();
      measureDocument();
    };

    /* ---------------------------------------------------------------- Musubi thread */
    const stepThread = (dt: number): number => {
      const taut = clamp(Math.abs(velocity) / THREAD_TAUT_VELOCITY, 0, 1);
      const lag = clamp(velocity * 0.0025, -7, 7);
      const force = clamp(accel, -40000, 40000) * THREAD_IMPULSE;
      const steps = Math.max(1, Math.ceil(dt * 120));
      const h = dt / steps;
      const last = THREAD_NODES - 1;
      let maxNodeVel = 0;

      for (let s = 0; s < steps; s++) {
        for (let i = 1; i < last; i++) {
          const u = i / last;
          const envelope = Math.sin(Math.PI * u);
          const breathe = 0.7 + 0.3 * Math.sin(elapsed * 0.55 + u * 3.1);
          const target =
            restAmp * envelope * breathe * (1 - 0.88 * taut) + lag * Math.sin(2 * Math.PI * u);
          const coupling =
            (nodeOffset[i - 1] + nodeOffset[i + 1] - 2 * nodeOffset[i]) * THREAD_COUPLING;
          const a =
            -THREAD_STIFFNESS * (nodeOffset[i] - target) -
            THREAD_DAMPING * nodeVelocity[i] +
            coupling -
            force * envelope;
          nodeVelocity[i] += a * h;
          nodeOffset[i] = clamp(nodeOffset[i] + nodeVelocity[i] * h, -restAmp * 3, restAmp * 3);
          const absV = Math.abs(nodeVelocity[i]);
          if (absV > maxNodeVel) maxNodeVel = absV;
        }
      }
      return maxNodeVel;
    };

    const sampleThread = () => {
      const last = THREAD_NODES - 1;
      const span = height + THREAD_PAD * 2;
      for (let s = 0; s <= THREAD_SAMPLES; s++) {
        const t = (s / THREAD_SAMPLES) * last;
        const i = Math.min(Math.floor(t), last - 1);
        const f = t - i;
        const p0 = nodeOffset[Math.max(i - 1, 0)];
        const p1 = nodeOffset[i];
        const p2 = nodeOffset[i + 1];
        const p3 = nodeOffset[Math.min(i + 2, last)];
        const f2 = f * f;
        const f3 = f2 * f;
        const offset =
          0.5 *
          (2 * p1 +
            (-p0 + p2) * f +
            (2 * p0 - 5 * p1 + 4 * p2 - p3) * f2 +
            (-p0 + 3 * p1 - 3 * p2 + p3) * f3);
        sampleX[s] = threadBaseX + offset;
        sampleY[s] = -THREAD_PAD + (s / THREAD_SAMPLES) * span;
      }
    };

    const traceThread = (offsetFn?: (s: number) => number) => {
      ctx.beginPath();
      for (let s = 0; s <= THREAD_SAMPLES; s++) {
        const x = sampleX[s] + (offsetFn ? offsetFn(s) : 0);
        const y = sampleY[s];
        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
    };

    const drawThread = (progress: number) => {
      sampleThread();
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (threadHalo) {
        traceThread();
        ctx.strokeStyle = threadHalo;
        ctx.lineWidth = 4.5;
        ctx.stroke();
      }

      if (threadGradient) {
        traceThread();
        ctx.strokeStyle = threadGradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      const braidPhase = scrollY * 0.012 + elapsed * 0.45;
      const strands = [
        [1, 'rgba(245, 158, 11, 0.42)'],
        [-1, 'rgba(225, 29, 72, 0.4)'],
      ] as const;
      for (const [sign, color] of strands) {
        traceThread((s) => Math.sin(sampleY[s] * 0.045 + braidPhase) * 2.4 * sign);
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      const ky = height * (0.08 + progress * 0.84);
      const idx = clamp(
        Math.round(((ky + THREAD_PAD) / (height + THREAD_PAD * 2)) * THREAD_SAMPLES),
        0,
        THREAD_SAMPLES
      );
      const kx = sampleX[idx];
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.9;
      ctx.drawImage(knotSprite, kx - 10, ky - 10, 20, 20);
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'rgba(255, 247, 214, 0.95)';
      ctx.beginPath();
      ctx.arc(kx, ky, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    /* ---------------------------------------------------------------- Doppler stardust */
    const spawnStardust = (v: number) => {
      const down = v > 0;
      const roll = Math.random();
      const plane: 0 | 1 | 2 = roll < 0.55 ? 0 : roll < 0.88 ? 1 : 2;
      const z = PLANE_Z[plane];
      const x = Math.random() * width;
      const y = (0.08 + Math.random() * 0.84) * height;
      let vx: number;
      let vy: number;
      let size: number;
      let maxLife: number;

      if (plane === 0) {
        vx = (Math.random() - 0.5) * 12;
        vy = -(14 + Math.random() * 22) - v * 0.012;
        size = 0.5 + Math.random() * 0.7;
        maxLife = 1.5 + Math.random() * 1.1;
      } else if (plane === 1) {
        const angle = Math.atan2(y - height * 0.5, x - width * 0.5) + (Math.random() - 0.5) * 0.6;
        const radial = (50 + Math.random() * 90) * z;
        vx = Math.cos(angle) * radial;
        vy = Math.sin(angle) * radial - v * 0.14;
        size = 0.9 + Math.random() * 1.3;
        maxLife = 0.85 + Math.random() * 0.75;
      } else {
        vx = (Math.random() - 0.5) * 60;
        vy = -v * 0.42;
        size = 5 + Math.random() * 8;
        maxLife = 0.5 + Math.random() * 0.45;
      }

      dust.push({
        x,
        y,
        vx,
        vy,
        plane,
        size,
        life: 0,
        maxLife,
        v0: Math.hypot(vx, vy) || 1,
        shift: down ? 1 : 0.3,
        phase: Math.random() * Math.PI * 2,
      });
    };

    const updateAndDrawStardust = (dt: number) => {
      const speed = Math.abs(velocity);
      if (speed > MIN_SPAWN_VELOCITY) {
        spawnAccumulator += (speed * dt) / STARDUST_PX_PER_PARTICLE;
        while (spawnAccumulator >= 1) {
          spawnAccumulator -= 1;
          if (dust.length < MAX_STARDUST) spawnStardust(velocity);
        }
      } else {
        spawnAccumulator = 0;
      }

      if (dust.length === 0) return;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = dust.length - 1; i >= 0; i--) {
        const p = dust[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          dust[i] = dust[dust.length - 1];
          dust.pop();
          continue;
        }

        const drag = Math.exp(-(p.plane === 2 ? 0.9 : 1.7) * dt);
        p.vx *= drag;
        p.vy *= drag;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const lr = p.life / p.maxLife;
        const envelope = lr < 0.12 ? lr / 0.12 : Math.pow(1 - (lr - 0.12) / 0.88, 2);
        const speedRatio = clamp(Math.hypot(p.vx, p.vy) / p.v0, 0, 1);
        const doppler = clamp(p.shift * (0.35 + 0.65 * speedRatio) * (1 - lr * 0.55), 0, 1);

        if (p.plane === 0) {
          ctx.globalAlpha = envelope * 0.7;
          ctx.fillStyle = `rgb(${mix(WHITE, doppler > 0.5 ? CYAN : ROSE, 0.45)})`;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        } else if (p.plane === 1) {
          const rgb = mix(ROSE, CYAN, doppler);
          const glint = 0.75 + 0.25 * Math.sin(elapsed * 18 + p.phase);
          ctx.globalAlpha = envelope * glint;
          ctx.fillStyle = `rgb(${rgb})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
          const arm = p.size * 3.2;
          ctx.globalAlpha = envelope * glint * 0.55;
          ctx.strokeStyle = `rgb(${rgb})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x - arm, p.y);
          ctx.lineTo(p.x + arm, p.y);
          ctx.moveTo(p.x, p.y - arm);
          ctx.lineTo(p.x, p.y + arm);
          ctx.stroke();
        } else {
          const sprite = bokehSprites[Math.round(doppler * (DOPPLER_STEPS - 1))];
          ctx.globalAlpha = envelope * 0.32;
          ctx.drawImage(sprite, p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
        }
      }
      ctx.restore();
    };

    /* ---------------------------------------------------------------- Ambient Tiamat comet */
    const updateComet = (dt: number) => {
      if (!comet) {
        if (elapsed < nextCometAt) return;
        const scale = clamp(width / 1440, 0.6, 1.2);
        comet = {
          x: width * (0.62 + Math.random() * 0.34),
          y: height * Math.random() * 0.18,
          vx: -(240 + Math.random() * 160) * scale,
          vy: (140 + Math.random() * 90) * scale,
          life: 0,
          maxLife: 2.4 + Math.random() * 1.2,
          length: (150 + Math.random() * 110) * scale,
        };
        return;
      }

      comet.x += comet.vx * dt;
      comet.y += comet.vy * dt;
      comet.life += dt;
      if (comet.life >= comet.maxLife || comet.x < -260 || comet.y > height + 260) {
        comet = null;
        nextCometAt = elapsed + 10 + Math.random() * 12;
      }
    };

    const drawComet = (c: Comet) => {
      const lr = c.life / c.maxLife;
      const env = Math.min(1, c.life / 0.2) * (lr > 0.55 ? 1 - (lr - 0.55) / 0.45 : 1);
      if (env <= 0) return;
      const speed = Math.hypot(c.vx, c.vy) || 1;
      const dx = c.vx / speed;
      const dy = c.vy / speed;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';

      const tx = c.x - dx * c.length;
      const ty = c.y - dy * c.length;
      const ion = ctx.createLinearGradient(c.x, c.y, tx, ty);
      ion.addColorStop(0, `rgba(255, 255, 255, ${env.toFixed(3)})`);
      ion.addColorStop(0.18, `rgba(56, 189, 248, ${(0.85 * env).toFixed(3)})`);
      ion.addColorStop(0.65, `rgba(244, 63, 94, ${(0.35 * env).toFixed(3)})`);
      ion.addColorStop(1, 'rgba(244, 63, 94, 0)');
      ctx.strokeStyle = ion;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(c.x, c.y);
      ctx.lineTo(tx, ty);
      ctx.stroke();

      const rot = 0.09;
      const fdx = dx * Math.cos(rot) - dy * Math.sin(rot);
      const fdy = dx * Math.sin(rot) + dy * Math.cos(rot);
      const fx2 = c.x - fdx * c.length * 0.62;
      const fy2 = c.y - fdy * c.length * 0.62;
      const frag = ctx.createLinearGradient(c.x, c.y, fx2, fy2);
      frag.addColorStop(0, `rgba(244, 63, 94, ${(0.5 * env).toFixed(3)})`);
      frag.addColorStop(1, 'rgba(109, 17, 70, 0)');
      ctx.strokeStyle = frag;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(c.x, c.y);
      ctx.lineTo(fx2, fy2);
      ctx.stroke();

      ctx.globalAlpha = env;
      ctx.drawImage(cometSprite, c.x - 13, c.y - 13, 26, 26);
      const streak = ctx.createLinearGradient(c.x - 26, c.y, c.x + 26, c.y);
      streak.addColorStop(0, 'rgba(56, 189, 248, 0)');
      streak.addColorStop(0.5, 'rgba(255, 255, 255, 0.55)');
      streak.addColorStop(1, 'rgba(253, 224, 71, 0)');
      ctx.fillStyle = streak;
      ctx.fillRect(c.x - 26, c.y - 0.5, 52, 1);
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(c.x, c.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    /* ---------------------------------------------------------------- Consolidated Scene Render */
    const drawParallaxSilhouettes = () => {
      const distantShift = animate ? scrollY * DISTANT_FACTOR : 0;
      const distantOpacity = clamp(1 - distantShift / (distantH * 0.85), 0, 1);
      if (distantOpacity > 0.005 && mountainGrad) {
        const topY = height - distantH - distantShift;
        const sx = width / 1440;
        const sy = distantH / 300;
        ctx.save();
        ctx.globalAlpha = distantOpacity;
        ctx.translate(0, topY);
        ctx.scale(sx, sy);
        ctx.fillStyle = mountainGrad;
        ctx.fill(mountainFillPath);
        ctx.strokeStyle = 'rgba(253, 224, 71, 0.26)';
        ctx.lineWidth = 1 / Math.max(sx, sy);
        ctx.stroke(mountainRimPath);
        ctx.restore();
        if (topY + distantH < height) {
          ctx.save();
          ctx.globalAlpha = distantOpacity;
          ctx.fillStyle = '#0d1435';
          ctx.fillRect(0, topY + distantH - 1, width, height - (topY + distantH) + 2);
          ctx.restore();
        }
      }

      const midShift = animate ? scrollY * MID_FACTOR : 0;
      const midOpacity = clamp(1 - midShift / (midH * 0.85), 0, 1);
      if (midOpacity > 0.005 && cumulusGrad && cumulusRimGrad) {
        const topY = height - midH - midShift;
        const sx = width / 1440;
        const sy = midH / 200;
        ctx.save();
        ctx.globalAlpha = midOpacity;
        ctx.translate(0, topY);
        ctx.scale(sx, sy);
        ctx.fillStyle = cumulusGrad;
        ctx.fill(cumulusFillPath);
        ctx.strokeStyle = cumulusRimGrad;
        ctx.lineWidth = 1 / Math.max(sx, sy);
        ctx.stroke(cumulusRimPath);
        ctx.restore();
        if (topY + midH < height) {
          ctx.save();
          ctx.globalAlpha = midOpacity;
          ctx.fillStyle = '#050714';
          ctx.fillRect(0, topY + midH - 1, width, height - (topY + midH) + 2);
          ctx.restore();
        }
      }
    };

    const drawSkyAndClouds = (zenith: number) => {
      ctx.clearRect(0, 0, width, height);
      const nightBoost = 1 + zenith * 0.3;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const osc = animate ? Math.sin(elapsed * s.freq + s.phase) * 0.24 : 0;
        const alpha = clamp((s.baseAlpha + osc) * nightBoost, 0.05, 0.98);
        const factor = animate ? STAR_FACTORS[s.depth] : 0;
        const py = (((s.ny * height - scrollY * factor) % height) + height) % height;
        const sx = s.nx * width;

        ctx.fillStyle = `rgba(${s.rgb}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(sx, py, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (s.spike && alpha > 0.48) {
          const arm = s.r * 3.6;
          ctx.strokeStyle = `rgba(${s.rgb}, ${(alpha * 0.38).toFixed(3)})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(sx - arm, py);
          ctx.lineTo(sx + arm, py);
          ctx.moveTo(sx, py - arm);
          ctx.lineTo(sx, py + arm);
          ctx.stroke();
        }
      }

      if (comet) drawComet(comet);
      drawParallaxSilhouettes();
    };

    const updateSkyDom = (zenith: number) => {
      const skyShift = animate ? Math.min(scrollY * SKY_FACTOR, SKY_MAX_SHIFT) : 0;
      setStyle(skyPlaneRef.current, 'transform', `translate3d(0, ${(-skyShift).toFixed(1)}px, 0)`);
      setStyle(
        twilightRef.current,
        'opacity',
        Math.max(0.06, 1 - Math.pow(zenith, 1.15) * 0.94).toFixed(3)
      );
      setStyle(raysRef.current, 'opacity', Math.max(0.16, 0.78 - zenith * 0.6).toFixed(3));
    };

    const updateTilt = (dt: number) => {
      if (!contentPlane) return;
      const target = clamp(-velocity * PITCH_PER_VELOCITY, -MAX_PITCH_DEG, MAX_PITCH_DEG);
      pitch += (target - pitch) * (1 - Math.exp(-dt * 7));

      if (Math.abs(pitch) < 0.01) {
        if (tiltApplied) {
          contentPlane.style.transform = '';
          contentPlane.style.transformOrigin = '';
          tiltApplied = false;
        }
        pitch = 0;
        return;
      }

      contentPlane.style.transformOrigin = `50% ${(scrollY - planeTop + height * 0.5).toFixed(0)}px`;
      contentPlane.style.transform = `perspective(1800px) rotateX(${pitch.toFixed(3)}deg)`;
      tiltApplied = true;
    };

    const zenithRatio = () => clamp(scrollY / Math.max(1, docHeight - height), 0, 1);

    /* ---------------------------------------------------------------- Bootstrap */
    resize();
    for (let i = 0; i < THREAD_NODES; i++) {
      nodeOffset[i] = restShape(i, 0.85);
      nodeVelocity[i] = 0;
    }

    const docObserver = new ResizeObserver(measureDocument);
    docObserver.observe(document.body);

    if (!animate) {
      let pending = 0;
      const renderStatic = () => {
        pending = 0;
        scrollY = window.scrollY;
        const zenith = zenithRatio();
        updateSkyDom(zenith);
        drawSkyAndClouds(zenith);
        drawThread(zenith);
      };
      const schedule = () => {
        if (!pending) pending = window.requestAnimationFrame(renderStatic);
      };
      const onResize = () => {
        resize();
        schedule();
      };

      renderStatic();
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });

      return () => {
        if (pending) window.cancelAnimationFrame(pending);
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', onResize);
        docObserver.disconnect();
        canvas.width = 0;
        canvas.height = 0;
      };
    }

    let rafId = 0;
    let idleTimerId = 0;
    let mode: 'stopped' | 'active' | 'idle' = 'stopped';
    let lastTime = performance.now();

    const enterIdle = () => {
      if (mode !== 'active') return;
      mode = 'idle';
      window.cancelAnimationFrame(rafId);
      rafId = 0;

      const idleTick = () => {
        if (mode !== 'idle') return;
        const now = performance.now();
        const dt = Math.min((now - lastTime) / 1000, 0.25);
        lastTime = now;
        elapsed += dt;
        scrollY = window.scrollY;

        updateComet(dt);
        if (comet || Math.abs(scrollY - lastScrollY) > 0.5) {
          wakeActive();
          return;
        }

        const zenith = zenithRatio();
        stepThread(Math.min(dt, 1 / 30));
        drawSkyAndClouds(zenith);
        drawThread(zenith);
        idleTimerId = window.setTimeout(idleTick, 180);
      };

      idleTimerId = window.setTimeout(idleTick, 180);
    };

    const frame = (now: number) => {
      if (mode !== 'active') return;
      const dt = Math.max(1 / 240, Math.min((now - lastTime) / 1000, 1 / 20));
      lastTime = now;
      elapsed += dt;

      scrollY = window.scrollY;
      const raw = clamp((scrollY - lastScrollY) / dt, -6000, 6000);
      lastScrollY = scrollY;
      const prevVelocity = velocity;
      velocity += (raw - velocity) * (1 - Math.exp(-dt * 14));
      accel = (velocity - prevVelocity) / dt;

      const zenith = zenithRatio();
      updateSkyDom(zenith);
      updateTilt(dt);
      const maxNodeVel = stepThread(dt);
      updateComet(dt);

      drawSkyAndClouds(zenith);
      updateAndDrawStardust(dt);
      drawThread(zenith);

      const isQuiet =
        Math.abs(velocity) < 0.8 &&
        Math.abs(raw) < 0.8 &&
        !tiltApplied &&
        dust.length === 0 &&
        !comet &&
        maxNodeVel < 0.35;

      if (isQuiet) {
        velocity = 0;
        accel = 0;
        enterIdle();
        return;
      }

      rafId = window.requestAnimationFrame(frame);
    };

    const wakeActive = () => {
      if (document.hidden || mode === 'active') return;
      if (idleTimerId) {
        window.clearTimeout(idleTimerId);
        idleTimerId = 0;
      }
      mode = 'active';
      lastTime = performance.now();
      rafId = window.requestAnimationFrame(frame);
    };

    const stopAll = () => {
      mode = 'stopped';
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
      if (idleTimerId) {
        window.clearTimeout(idleTimerId);
        idleTimerId = 0;
      }
    };

    const onVisibility = () => {
      if (document.hidden) stopAll();
      else {
        lastScrollY = window.scrollY;
        wakeActive();
      }
    };

    const onResize = () => {
      resize();
      wakeActive();
    };

    window.addEventListener('scroll', wakeActive, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    if (!document.hidden) wakeActive();

    return () => {
      stopAll();
      window.removeEventListener('scroll', wakeActive);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      docObserver.disconnect();
      dust.length = 0;
      canvas.width = 0;
      canvas.height = 0;
      for (const s of bokehSprites) {
        s.width = 0;
        s.height = 0;
      }
      cometSprite.width = 0;
      cometSprite.height = 0;
      knotSprite.width = 0;
      knotSprite.height = 0;
      if (contentPlane) {
        contentPlane.style.transform = '';
        contentPlane.style.transformOrigin = '';
      }
    };
  }, [reduceMotion, contentPlaneRef]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Plane 0 — Deep space & Katawaredoki Rayleigh sky (0.02x) */}
      <div
        ref={skyPlaneRef}
        className="absolute inset-x-0 top-0"
        style={{ height: `calc(100% + ${SKY_MAX_SHIFT}px)` }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 45% at 24% 14%, rgba(56, 189, 248, 0.07) 0%, transparent 72%), linear-gradient(180deg, #050714 0%, #080c26 50%, #0e1438 100%)',
          }}
        />
        <div
          ref={twilightRef}
          className="absolute inset-x-0 top-0 h-screen"
          style={{
            background: `
              radial-gradient(ellipse 92% 42% at 68% 90%, rgba(253, 224, 71, 0.2) 0%, rgba(194, 65, 12, 0.24) 30%, rgba(109, 17, 70, 0.2) 58%, transparent 80%),
              linear-gradient(180deg, #050714 0%, #0d1435 34%, #24123e 60%, #6d1146 78%, #c2410c 90%, #fde047 97%)
            `,
          }}
        >
          <svg
            ref={raysRef}
            viewBox="0 0 1440 800"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            style={{ opacity: 0.78 }}
          >
            <defs>
              <linearGradient id="engineShaft" x1="50%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#fde047" stopOpacity="0.15" />
                <stop offset="45%" stopColor="#c2410c" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#24123e" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="enginePlume" x1="10%" y1="16%" x2="78%" y2="82%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.3" />
                <stop offset="72%" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="engineRuby" x1="22%" y1="22%" x2="74%" y2="86%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0" />
                <stop offset="55%" stopColor="#f43f5e" stopOpacity="0.26" />
                <stop offset="100%" stopColor="#6d1146" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points="980,800 500,110 660,110" fill="url(#engineShaft)" />
            <polygon points="980,800 770,70 930,70" fill="url(#engineShaft)" />
            <polygon points="980,800 1050,130 1230,130" fill="url(#engineShaft)" />
            <path
              d="M 140 110 Q 640 210 1110 720"
              fill="none"
              stroke="url(#enginePlume)"
              strokeWidth="1.6"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M 320 175 Q 670 300 1045 735"
              fill="none"
              stroke="url(#engineRuby)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>

      {/* Consolidated Single Canvas: Stars, Comet, 2.5D Cloud Silhouettes, Stardust & Musubi Thread */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

export default AtmosphericScrollEngine;
