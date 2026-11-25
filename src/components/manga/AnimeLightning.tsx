import { useEffect, useRef, type RefObject } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AnimeLightningProps {
  /** Reference to the addo.jpg wrapper element for click-to-strike & 60ms contrast kick. */
  targetRef: RefObject<HTMLElement | null>;
}

interface Point {
  x: number;
  y: number;
}

interface BoltGeometry {
  main: Point[];
  branches: Point[][];
  sparks: Point[][];
}

/**
 * 3-pass "Amaterasu / Black Flash" high-contrast ink stack (outer -> inner):
 * 1. Outer Violet-Ink Distortion Halo: rgba(88, 76, 230, 0.55) — 8.5px main / 3.8px branch
 * 2. Razor-Thin White Edge Rim: #ECECF0 — 5.2px main / 2.4px branch (pops over black hair)
 * 3. Dominant Pitch-Black Amaterasu Core: #060608 — 3.4px main / 1.4px branch (pops over paper)
 */
const AMATERASU_PASSES = [
  { color: 'rgba(88, 76, 230, 0.55)', mainWidth: 8.5, branchWidth: 3.8 },
  { color: '#ECECF0', mainWidth: 5.2, branchWidth: 2.4 },
  { color: '#060608', mainWidth: 3.4, branchWidth: 1.4 },
] as const;

function subdivideSegment(p1: Point, p2: Point, disp: number, depth: number, out: Point[]): void {
  if (depth <= 0) {
    out.push(p2);
    return;
  }
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.hypot(dx, dy) || 1;
  const offset = (Math.random() - Math.random()) * disp;
  const mid: Point = {
    x: (p1.x + p2.x) * 0.5 + (-dy / len) * offset,
    y: (p1.y + p2.y) * 0.5 + (dx / len) * offset,
  };
  subdivideSegment(p1, mid, disp * 0.53, depth - 1, out);
  subdivideSegment(mid, p2, disp * 0.53, depth - 1, out);
}

/**
 * Clean midpoint-displacement fractal bolt generator (~50 lines).
 * Subdivides 5–6 times with decaying perpendicular offsets, spawns 2–4 secondary
 * branches at 25°–45°, plus 6–10 jagged electric spark ticks near impact points.
 */
function generateAnimeBolt(startX: number, startY: number, endX: number, endY: number): BoltGeometry {
  const totalLen = Math.hypot(endX - startX, endY - startY);
  const depth = Math.random() < 0.5 ? 5 : 6;
  const main: Point[] = [{ x: startX, y: startY }];
  subdivideSegment({ x: startX, y: startY }, { x: endX, y: endY }, totalLen * 0.17, depth, main);

  const branches: Point[][] = [];
  const branchCount = 2 + Math.floor(Math.random() * 3); // 2–4 branches
  const sideBias = Math.random() < 0.5 ? 1 : -1;

  for (let i = 0; i < branchCount; i++) {
    const t = 0.16 + ((i + 0.25 + Math.random() * 0.5) / branchCount) * 0.62;
    const splitIdx = Math.min(main.length - 3, Math.max(2, Math.floor(t * main.length)));
    const origin = main[splitIdx];
    const lookIdx = Math.min(main.length - 1, splitIdx + Math.max(2, Math.floor(main.length * 0.12)));
    const baseAngle = Math.atan2(main[lookIdx].y - origin.y, main[lookIdx].x - origin.x);
    const sign = (i % 2 === 0 ? 1 : -1) * sideBias;
    const deg = (25 + Math.random() * 20) * (Math.PI / 180); // 25°–45°
    const angle = baseAngle + sign * deg;
    const branchLen = totalLen * (0.26 + Math.random() * 0.2);
    const tip: Point = {
      x: origin.x + Math.cos(angle) * branchLen,
      y: origin.y + Math.sin(angle) * branchLen,
    };
    const branchPts: Point[] = [origin];
    subdivideSegment(origin, tip, branchLen * 0.19, 4, branchPts);
    branches.push(branchPts);
  }

  const sparks: Point[][] = [];
  const sparkCount = 6 + Math.floor(Math.random() * 5); // 6–10 spark ticks
  const anchors: Point[] = [
    { x: endX, y: endY },
    { x: startX, y: startY },
    ...branches.map((b) => b[b.length - 1]),
  ];

  for (let i = 0; i < sparkCount; i++) {
    const anchor = i < 4 ? anchors[0] : anchors[i % anchors.length];
    const theta = Math.random() * Math.PI * 2;
    const gap = 5 + Math.random() * 18;
    const sparkLen = 10 + Math.random() * 15;
    const s1: Point = {
      x: anchor.x + Math.cos(theta) * gap,
      y: anchor.y + Math.sin(theta) * gap,
    };
    const s2: Point = {
      x: s1.x + Math.cos(theta + (Math.random() - 0.5) * 0.7) * sparkLen,
      y: s1.y + Math.sin(theta + (Math.random() - 0.5) * 0.7) * sparkLen,
    };
    const sparkPts: Point[] = [s1];
    subdivideSegment(s1, s2, sparkLen * 0.28, 2, sparkPts);
    sparks.push(sparkPts);
  }

  return { main, branches, sparks };
}

function tracePolyline(ctx: CanvasRenderingContext2D, pts: Point[]): void {
  if (pts.length < 2) return;
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    ctx.lineTo(pts[i].x, pts[i].y);
  }
}

function strokeBoltLayer(
  ctx: CanvasRenderingContext2D,
  bolt: BoltGeometry,
  mainWidth: number,
  branchWidth: number
): void {
  ctx.lineWidth = mainWidth;
  ctx.beginPath();
  tracePolyline(ctx, bolt.main);
  ctx.stroke();

  ctx.lineWidth = branchWidth;
  ctx.beginPath();
  for (let i = 0; i < bolt.branches.length; i++) {
    tracePolyline(ctx, bolt.branches[i]);
  }
  for (let i = 0; i < bolt.sparks.length; i++) {
    tracePolyline(ctx, bolt.sparks[i]);
  }
  ctx.stroke();
}

function drawBoltCrisp(
  ctx: CanvasRenderingContext2D,
  bolt: BoltGeometry,
  width: number,
  height: number,
  dpr: number,
  alpha: number
): void {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.lineCap = 'square';
  ctx.lineJoin = 'bevel';
  ctx.miterLimit = 4;

  for (let p = 0; p < AMATERASU_PASSES.length; p++) {
    const pass = AMATERASU_PASSES[p];
    // During alpha decay (< 1), carve the inner channel first so the #060608 core never muddies with #ECECF0
    if (p > 0 && alpha < 0.999) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = 1;
      strokeBoltLayer(ctx, bolt, pass.mainWidth, pass.branchWidth);
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = pass.color;
    strokeBoltLayer(ctx, bolt, pass.mainWidth, pass.branchWidth);
  }
  ctx.globalCompositeOperation = 'source-over';
}

function pickEndpoints(width: number, height: number, clickPt?: Point): [Point, Point] {
  if (clickPt) {
    const crown: Point = {
      x: width * (0.86 + Math.random() * 0.08),
      y: height * (0.03 + Math.random() * 0.05),
    };
    if (Math.hypot(clickPt.x - crown.x, clickPt.y - crown.y) >= Math.min(width, height) * 0.36) {
      return [crown, clickPt];
    }
    return [
      clickPt,
      {
        x: width * (0.58 + Math.random() * 0.14),
        y: height * (0.82 + Math.random() * 0.12),
      },
    ];
  }

  const variant = Math.floor(Math.random() * 3);
  if (variant === 0) {
    // Top-right paper margin arcing down across black hair silhouette into lower cheek/paper edge
    return [
      { x: width * (0.86 + Math.random() * 0.08), y: height * (0.03 + Math.random() * 0.05) },
      { x: width * (0.62 + Math.random() * 0.12), y: height * (0.78 + Math.random() * 0.15) },
    ];
  }
  if (variant === 1) {
    // Diagonal snap from upper crown paper seam across the top-right black hair corner
    return [
      { x: width * (0.54 + Math.random() * 0.12), y: height * (0.03 + Math.random() * 0.05) },
      { x: width * (0.9 + Math.random() * 0.06), y: height * (0.58 + Math.random() * 0.18) },
    ];
  }
  // Right outer paper margin slashing diagonally across dark hair silhouette
  return [
    { x: width * (0.92 + Math.random() * 0.05), y: height * (0.1 + Math.random() * 0.1) },
    { x: width * (0.58 + Math.random() * 0.14), y: height * (0.84 + Math.random() * 0.1) },
  ];
}

export function AnimeLightning({ targetRef }: AnimeLightningProps) {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let cssWidth = 0;
    let cssHeight = 0;
    let dpr = 1;
    let rafId = 0;
    let timerId = 0;
    let isVisible = true;
    let isLit = false;

    const setArtworkLit = (lit: boolean) => {
      if (isLit === lit) return;
      isLit = lit;
      const el = targetRef.current;
      if (!el) return;
      if (lit) {
        el.classList.add('is-lightning-lit');
      } else {
        el.classList.remove('is-lightning-lit');
      }
    };

    const syncCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const nextDpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const nextW = Math.round(rect.width * nextDpr);
      const nextH = Math.round(rect.height * nextDpr);
      cssWidth = rect.width;
      cssHeight = rect.height;
      dpr = nextDpr;
      if (canvas.width !== nextW || canvas.height !== nextH) {
        canvas.width = nextW;
        canvas.height = nextH;
      }
    };

    const stopActiveStrike = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
      setArtworkLit(false);
      if (cssWidth > 0 && cssHeight > 0) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, cssWidth, cssHeight);
      }
    };

    const clearNextTimer = () => {
      if (timerId) {
        window.clearTimeout(timerId);
        timerId = 0;
      }
    };

    const scheduleNextStrike = () => {
      clearNextTimer();
      if (!isVisible || document.hidden) return;
      const delayMs = 3500 + Math.random() * 2000; // 3.5s – 5.5s randomized
      timerId = window.setTimeout(() => {
        timerId = 0;
        fireStrike();
      }, delayMs);
    };

    const fireStrike = (clickPt?: Point) => {
      if (!isVisible || document.hidden) return;
      if (cssWidth <= 0 || cssHeight <= 0) syncCanvasSize();
      if (cssWidth <= 0 || cssHeight <= 0) return;

      stopActiveStrike();

      const [start, end] = pickEndpoints(cssWidth, cssHeight, clickPt);
      const boltA = generateAnimeBolt(start.x, start.y, end.x, end.y);
      const boltB = generateAnimeBolt(
        start.x + (Math.random() - 0.5) * 6,
        start.y + (Math.random() - 0.5) * 6,
        end.x + (Math.random() - 0.5) * 8,
        end.y + (Math.random() - 0.5) * 8
      );

      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;

        // 0ms – 60ms: Illuminate addo.jpg (brightness 1.18, contrast 1.15)
        setArtworkLit(elapsed < 60);

        if (elapsed < 90) {
          drawBoltCrisp(ctx, boltA, cssWidth, cssHeight, dpr, 1);
          rafId = window.requestAnimationFrame(tick);
          return;
        }

        if (elapsed < 140) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, cssWidth, cssHeight);
          rafId = window.requestAnimationFrame(tick);
          return;
        }

        if (elapsed < 240) {
          drawBoltCrisp(ctx, boltB, cssWidth, cssHeight, dpr, 1);
          rafId = window.requestAnimationFrame(tick);
          return;
        }

        if (elapsed < 420) {
          const progress = (elapsed - 240) / 180;
          const alpha = Math.max(0, (1 - progress) * (1 - progress));
          drawBoltCrisp(ctx, boltB, cssWidth, cssHeight, dpr, alpha);
          rafId = window.requestAnimationFrame(tick);
          return;
        }

        // >= 420ms: Clean exit — cancel rAF immediately for 0% idle CPU/GPU cost
        rafId = 0;
        setArtworkLit(false);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, cssWidth, cssHeight);
        scheduleNextStrike();
      };

      rafId = window.requestAnimationFrame(tick);
    };

    syncCanvasSize();

    const resizeObserver = new ResizeObserver(() => {
      syncCanvasSize();
    });
    resizeObserver.observe(canvas);

    const heroSection = canvas.closest('section') ?? canvas;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isVisible = entry.isIntersecting;
        if (!isVisible) {
          clearNextTimer();
          stopActiveStrike();
        } else if (!rafId && !timerId) {
          scheduleNextStrike();
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(heroSection);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearNextTimer();
        stopActiveStrike();
      } else if (isVisible && !rafId && !timerId) {
        scheduleNextStrike();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const targetEl = targetRef.current;
    const handleTargetClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickPt: Point | undefined =
        rect.width > 0 && rect.height > 0
          ? { x: event.clientX - rect.left, y: event.clientY - rect.top }
          : undefined;
      clearNextTimer();
      fireStrike(clickPt);
    };
    targetEl?.addEventListener('click', handleTargetClick);

    scheduleNextStrike();

    return () => {
      clearNextTimer();
      stopActiveStrike();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      targetEl?.removeEventListener('click', handleTargetClick);
    };
  }, [prefersReducedMotion, targetRef]);

  if (prefersReducedMotion) return null;

  return <canvas ref={canvasRef} aria-hidden="true" className="anime-lightning-canvas" />;
}

export default AnimeLightning;
