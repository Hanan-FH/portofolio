import React, { useEffect, useRef, useSyncExternalStore } from 'react';

interface MagneticTiltProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;
  className?: string;
}

const REDUCED_MOTION_Q = '(prefers-reduced-motion: reduce)';
const HOVER_POINTER_Q = '(hover: hover) and (pointer: fine)';

function computeCanHover(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return !window.matchMedia(REDUCED_MOTION_Q).matches && window.matchMedia(HOVER_POINTER_Q).matches;
}

let cachedCanHover: boolean | null = null;
const hoverListeners = new Set<() => void>();
let mqlCleanup: (() => void) | null = null;

function getCanHoverSnapshot(): boolean {
  if (cachedCanHover === null) cachedCanHover = computeCanHover();
  return cachedCanHover;
}

function subscribeCanHover(cb: () => void): () => void {
  hoverListeners.add(cb);
  if (!mqlCleanup && typeof window !== 'undefined' && window.matchMedia) {
    const mqMotion = window.matchMedia(REDUCED_MOTION_Q);
    const mqPointer = window.matchMedia(HOVER_POINTER_Q);
    const onChange = () => {
      cachedCanHover = computeCanHover();
      hoverListeners.forEach((fn) => fn());
    };
    mqMotion.addEventListener('change', onChange);
    mqPointer.addEventListener('change', onChange);
    mqlCleanup = () => {
      mqMotion.removeEventListener('change', onChange);
      mqPointer.removeEventListener('change', onChange);
      mqlCleanup = null;
    };
  }
  return () => {
    hoverListeners.delete(cb);
    if (hoverListeners.size === 0) mqlCleanup?.();
  };
}

export function MagneticTilt({
  children,
  maxTilt = 3,
  className = '',
  style,
  ...rest
}: MagneticTiltProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const canHover = useSyncExternalStore(subscribeCanHover, getCanHoverSnapshot, () => false);

  useEffect(() => {
    const el = cardRef.current;
    if (!canHover && el) {
      el.style.transform = '';
      el.style.transition = '';
      el.style.willChange = 'auto';
    }
    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [canHover]);

  const handleMouseEnter = () => {
    const el = cardRef.current;
    if (!canHover || !el) return;
    rectRef.current = el.getBoundingClientRect();
    el.style.transition = 'transform 140ms cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.willChange = 'transform';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !cardRef.current) return;
    pointerRef.current.x = e.clientX;
    pointerRef.current.y = e.clientY;
    if (rafRef.current) return;

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = 0;
      const el = cardRef.current;
      const rect = rectRef.current;
      if (!el || !rect || rect.width === 0 || rect.height === 0) return;

      const relX = (pointerRef.current.x - rect.left) / rect.width - 0.5;
      const relY = (pointerRef.current.y - rect.top) / rect.height - 0.5;
      const rotX = (-relY * maxTilt).toFixed(2);
      const rotY = (relX * maxTilt).toFixed(2);

      el.style.transform = `perspective(1100px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(0, -2px, 0)`;
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    rectRef.current = null;
    const el = cardRef.current;
    if (!canHover || !el) return;
    el.style.transition = 'transform 520ms cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
    el.style.willChange = 'auto';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}

export default MagneticTilt;
