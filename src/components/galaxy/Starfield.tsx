import { useEffect, useRef } from 'react';

interface StarNode {
  x: number;
  y: number;
  z: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: 'white' | 'cyan';
  vy: number;
}

export interface StarfieldProps {
  className?: string;
  particleCount?: number;
}

/**
 * Atmospheric Monochrome Galaxy Starfield.
 * Generates an ultra-lightweight depth-layered starfield with subtle cyan pulsars,
 * zero-overhead canvas rendering, and tab visibility suspension.
 */
export function Starfield({ className = '', particleCount }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Balanced star count: 48 on mobile, 96 on desktop
    const count = particleCount ?? (width < 768 ? 42 : 88);
    const stars: StarNode[] = [];

    for (let i = 0; i < count; i++) {
      const z = 0.2 + Math.random() * 0.8;
      const isCyan = Math.random() < 0.28; // 28% Electric Cyan stars
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        radius: (0.7 + Math.random() * 1.5) * z,
        alpha: 0.15 + Math.random() * 0.45,
        baseAlpha: 0.15 + Math.random() * 0.45,
        twinkleSpeed: 0.01 + Math.random() * 0.025,
        twinklePhase: Math.random() * Math.PI * 2,
        color: isCyan ? 'cyan' : 'white',
        vy: (0.05 + Math.random() * 0.12) * z,
      });
    }

    let isVisible = !document.hidden;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        if (!prefersReducedMotion) {
          star.twinklePhase += star.twinkleSpeed;
          star.alpha = star.baseAlpha + Math.sin(star.twinklePhase) * 0.18;
          star.y -= star.vy * delta * 60;
          if (star.y < -5) star.y = height + 5;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        if (star.color === 'cyan') {
          ctx.fillStyle = `rgba(0, 209, 255, ${Math.max(0.05, Math.min(star.alpha * 1.2, 0.9))})`;
          ctx.shadowColor = '#00d1ff';
          ctx.shadowBlur = star.radius * 3;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, Math.min(star.alpha, 0.85))})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
          ctx.shadowBlur = star.radius * 2;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 h-full w-full opacity-65 ${className}`}
      aria-hidden="true"
    />
  );
}

export default Starfield;
