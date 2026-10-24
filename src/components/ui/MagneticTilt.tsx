import React, { useRef, useState, useEffect } from 'react';

interface MagneticTiltProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;
  className?: string;
}

function checkCanHover(): boolean {
  if (typeof window === 'undefined') return false;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasHoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  return !prefersReduced && hasHoverPointer;
}

export function MagneticTilt({
  children,
  maxTilt = 3,
  className = '',
  style,
  ...rest
}: MagneticTiltProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(checkCanHover);

  useEffect(() => {
    const handleMediaChange = () => {
      setCanHover(checkCanHover());
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    motionQuery.addEventListener('change', handleMediaChange);
    pointerQuery.addEventListener('change', handleMediaChange);

    return () => {
      motionQuery.removeEventListener('change', handleMediaChange);
      pointerQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    const rotX = (-relY * maxTilt).toFixed(2);
    const rotY = (relX * maxTilt).toFixed(2);

    setTransform(`perspective(1100px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(0, -2px, 0)`);
  };

  const handleMouseEnter = () => {
    if (!canHover) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!canHover) return;
    setIsHovered(false);
    setTransform('perspective(1100px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: canHover ? transform : undefined,
        transition: isHovered
          ? 'transform 140ms cubic-bezier(0.16, 1, 0.3, 1)'
          : 'transform 520ms cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: canHover && isHovered ? 'transform' : 'auto',
      }}
      className={`relative ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}

export default MagneticTilt;
