import { useState } from 'react';
import { prefersReducedMotionNow } from '../../hooks/useReducedMotion';

/**
 * Snappy ~0.75s Non-Blocking Manga-Panel Ink Curtain.
 * Wipes cleanly upward via GPU-friendly clip-path: inset(0 0 100% 0)
 * and unmounts itself immediately upon completion.
 */
export function InkCurtain() {
  const [visible, setVisible] = useState<boolean>(() => !prefersReducedMotionNow());

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      onAnimationEnd={() => setVisible(false)}
      className="ink-curtain pointer-events-none fixed inset-0 z-[260] flex flex-col justify-end bg-[#090909]"
    >
      <div className="h-[2px] w-full bg-[#5B58EB]" />
    </div>
  );
}

export default InkCurtain;
