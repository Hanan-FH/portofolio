import { useEffect, useState } from 'react';

export interface PointerCapability {
  hasFinePointer: boolean;
  canHover: boolean;
  isTouchOnly: boolean;
}

/**
 * Hook to inspect device pointer capabilities.
 * Distinguishes precision mouse/trackpad environments from touch screens.
 */
export function usePointerCapability(): PointerCapability {
  const [capability, setCapability] = useState<PointerCapability>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return { hasFinePointer: true, canHover: true, isTouchOnly: false };
    }
    const hasFine = window.matchMedia('(pointer: fine)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    return {
      hasFinePointer: hasFine,
      canHover,
      isTouchOnly: isCoarse && !hasFine,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const fineQuery = window.matchMedia('(pointer: fine)');
    const hoverQuery = window.matchMedia('(hover: hover)');
    const coarseQuery = window.matchMedia('(pointer: coarse)');

    const updateCapabilities = () => {
      const hasFine = fineQuery.matches;
      const canHover = hoverQuery.matches;
      const isCoarse = coarseQuery.matches;
      setCapability({
        hasFinePointer: hasFine,
        canHover,
        isTouchOnly: isCoarse && !hasFine,
      });
    };

    fineQuery.addEventListener('change', updateCapabilities);
    hoverQuery.addEventListener('change', updateCapabilities);
    coarseQuery.addEventListener('change', updateCapabilities);

    return () => {
      fineQuery.removeEventListener('change', updateCapabilities);
      hoverQuery.removeEventListener('change', updateCapabilities);
      coarseQuery.removeEventListener('change', updateCapabilities);
    };
  }, []);

  return capability;
}

export default usePointerCapability;
