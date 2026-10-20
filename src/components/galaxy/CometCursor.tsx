import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { usePointerCapability } from '../../hooks/usePointerCapability';

const TRAIL_LENGTH = 8;

/**
 * High-performance Galactic Comet Cursor.
 * Renders a glowing head with a lagging celestial particle trail.
 * Operates completely outside React's render cycle using direct DOM transforms and rAF.
 * Automatically deactivates on touch screens, reduced-motion mode, or inactive window.
 */
export function CometCursor() {
  const prefersReducedMotion = useReducedMotion();
  const { canHover, isTouchOnly } = usePointerCapability();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Abort on touch-only devices or reduced motion
    if (prefersReducedMotion || isTouchOnly || !canHover) return;

    let targetX = -100;
    let targetY = -100;
    let isVisible = false;
    let lastMoveTime = performance.now();

    // Position buffers for smooth spring trail
    const positions = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: -100,
      y: -100,
    }));

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      lastMoveTime = performance.now();
      if (!isVisible) {
        isVisible = true;
        if (containerRef.current) {
          containerRef.current.style.opacity = '1';
        }
      }
    };

    const onPointerLeave = () => {
      isVisible = false;
      if (containerRef.current) {
        containerRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    let animationFrameId = 0;

    const tick = (now: number) => {
      // Fade out trail when pointer has been stationary for over 2.5s
      if (now - lastMoveTime > 2500 && isVisible) {
        isVisible = false;
        if (containerRef.current) {
          containerRef.current.style.opacity = '0';
        }
      }

      // Update head
      if (headRef.current) {
        headRef.current.style.transform = `translate3d(${targetX - 5}px, ${targetY - 5}px, 0)`;
      }

      // Update trail segments with fluid spring interpolation
      let prevX = targetX;
      let prevY = targetY;

      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const p = positions[i];
        p.x += (prevX - p.x) * 0.38;
        p.y += (prevY - p.y) * 0.38;

        const el = trailRefs.current[i];
        if (el) {
          const sizeOffset = (TRAIL_LENGTH - i) * 0.5;
          el.style.transform = `translate3d(${p.x - sizeOffset}px, ${p.y - sizeOffset}px, 0)`;
        }

        prevX = p.x;
        prevY = p.y;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
    };
  }, [prefersReducedMotion, isTouchOnly, canHover]);

  if (prefersReducedMotion || isTouchOnly || !canHover) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden opacity-0 transition-opacity duration-300"
      aria-hidden="true"
    >
      {/* Comet Leading Head */}
      <div
        ref={headRef}
        className="absolute top-0 left-0 h-2.5 w-2.5 rounded-full bg-signal shadow-[0_0_12px_#00d1ff,0_0_20px_#00d1ff]"
        style={{ willChange: 'transform' }}
      />

      {/* Lagging Comet Tail Particles */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => {
        const factor = (TRAIL_LENGTH - i) / TRAIL_LENGTH;
        const sizePx = Math.max(2, Math.round(factor * 7));
        const opacity = Math.max(0.1, factor * 0.65);

        return (
          <div
            key={i}
            ref={(el) => {
              trailRefs.current[i] = el;
            }}
            className="absolute top-0 left-0 rounded-full bg-signal"
            style={{
              width: `${sizePx}px`,
              height: `${sizePx}px`,
              opacity,
              boxShadow: i < 3 ? '0 0 6px rgba(0, 209, 255, 0.6)' : 'none',
              willChange: 'transform',
            }}
          />
        );
      })}
    </div>
  );
}

export default CometCursor;
