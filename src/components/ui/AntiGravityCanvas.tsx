import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number; // depth: 0.5 to 1.5
  baseRadius: number;
  baseVx: number;
  baseVy: number;
  vx: number;
  vy: number;
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

export function AntiGravityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

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

    // Restrained particle count for subtle technical atmosphere
    const count = width < 768 ? 16 : 32;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const z = 0.6 + Math.random() * 0.9;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        baseRadius: (1.1 + Math.random() * 1.8) * z,
        baseVx: (Math.random() - 0.5) * 0.22,
        baseVy: -(0.25 + Math.random() * 0.45) * z,
        vx: 0,
        vy: 0,
        alpha: 0.2 + Math.random() * 0.35,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
      });
    }

    // Mouse coordinates for zero-gravity repulsion & dispersion
    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseOnScreen = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOnScreen = true;
    };

    const handleMouseLeave = () => {
      isMouseOnScreen = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let isDocumentVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isDocumentVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Render faint connection lines between close particles for technical coherence
      const maxConnectDist = 80;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.08 * particles[i].z;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 209, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Update & render particles
      for (const p of particles) {
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.pulsePhase) * 0.08;

        // Zero-gravity upward drift
        p.x += p.baseVx + p.vx;
        p.y += p.baseVy + p.vy;

        // Fluid spring dampening on velocity offsets (Apple-style spring return)
        p.vx *= 0.92;
        p.vy *= 0.92;

        // Mouse interaction: dynamic dispersion
        if (isMouseOnScreen) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.hypot(dx, dy);
          const pushRadius = 130;

          if (dist < pushRadius && dist > 0) {
            const force = (1 - dist / pushRadius) * 1.5 * p.z;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Screen wrap-around for endless zero-gravity environment
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        } else if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        if (p.x < -10) {
          p.x = width + 10;
        } else if (p.x > width + 10) {
          p.x = -10;
        }

        // Render glowing Electric Cyan node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);

        // Core cyan highlight
        ctx.fillStyle = `rgba(0, 209, 255, ${Math.max(0.08, currentAlpha)})`;
        ctx.fill();

        // Subtle soft outer glow for closer nodes
        if (p.z > 1.0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.baseRadius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 209, 255, ${currentAlpha * 0.22})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
    />
  );
}

export default AntiGravityCanvas;
