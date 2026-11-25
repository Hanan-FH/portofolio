import { useEffect, useRef } from 'react';

/**
 * Minimalist 60fps Difference-Blend Custom Cursor (Desktop @media (pointer: fine) only).
 * Animates strictly transform & opacity — zero layout property transitions, zero React re-renders.
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    const root = rootRef.current;
    const label = labelRef.current;
    if (!root || !label) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId = 0;
    let active = false;
    let mode: 'dot' | 'ring' | 'view' = 'dot';

    const applyMode = (nextMode: 'dot' | 'ring' | 'view', text = 'VIEW') => {
      if (mode === nextMode && (nextMode !== 'view' || label.textContent === text)) return;
      mode = nextMode;
      root.dataset.mode = nextMode;
      if (nextMode === 'view') {
        label.textContent = `[ ${text} ]`;
      }
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.34;
      currentY += (targetY - currentY) * 0.34;
      root.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.15 || Math.abs(targetY - currentY) > 0.15) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!active) {
        active = true;
        currentX = targetX;
        currentY = targetY;
        root.style.opacity = '1';
      }

      const target = event.target instanceof Element ? event.target : null;
      const viewEl = target?.closest<HTMLElement>('[data-cursor]');
      if (viewEl) {
        applyMode('view', viewEl.dataset.cursor || 'VIEW');
      } else if (target?.closest('a, button, [role="tab"]')) {
        applyMode('ring');
      } else {
        applyMode('dot');
      }

      if (!rafId) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const onPointerLeave = () => {
      active = false;
      root.style.opacity = '0';
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-mode="dot"
      style={{ opacity: 0, transform: 'translate3d(-100px, -100px, 0)' }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden mix-blend-difference transition-opacity duration-200 [@media(pointer:fine)]:block"
    >
      {/* 14px Solid Dot */}
      <span className="absolute left-0 top-0 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-[transform,opacity] duration-200 [[data-mode=dot]_&]:scale-100 [[data-mode=dot]_&]:opacity-100 [[data-mode=ring]_&]:scale-0 [[data-mode=ring]_&]:opacity-0 [[data-mode=view]_&]:scale-0 [[data-mode=view]_&]:opacity-0" />

      {/* 36px Interactive Ring */}
      <span className="absolute left-0 top-0 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white transition-[transform,opacity] duration-200 [[data-mode=dot]_&]:scale-50 [[data-mode=dot]_&]:opacity-0 [[data-mode=ring]_&]:scale-100 [[data-mode=ring]_&]:opacity-100 [[data-mode=view]_&]:scale-50 [[data-mode=view]_&]:opacity-0" />

      {/* [ VIEW ] Pill */}
      <span
        ref={labelRef}
        className="absolute left-0 top-0 flex h-7 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-[#090909] transition-[transform,opacity] duration-200 [[data-mode=dot]_&]:scale-75 [[data-mode=dot]_&]:opacity-0 [[data-mode=ring]_&]:scale-75 [[data-mode=ring]_&]:opacity-0 [[data-mode=view]_&]:scale-100 [[data-mode=view]_&]:opacity-100"
      >
        [ VIEW ]
      </span>
    </div>
  );
}

export default CustomCursor;
