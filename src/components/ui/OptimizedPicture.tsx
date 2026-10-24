import { useEffect, useRef, useState, type RefObject } from 'react';

export interface OptimizedPictureProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  pictureClassName?: string;
  eager?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
  draggable?: boolean;
  /** Optional horizontal scroll container ref for carousel-level lazy gating */
  scrollRootRef?: RefObject<HTMLElement | null>;
}

function toWebpSrc(src: string): string | null {
  if (!src.startsWith('/') || src.startsWith('/webp/')) return null;
  if (!/\.(png|jpe?g)$/i.test(src)) return null;
  return `/webp${src.replace(/\.(png|jpe?g)$/i, '.webp')}`;
}

/**
 * Bandwidth- & Memory-Optimized Picture Element.
 * Serves 1:1 full-resolution WebP companions (-75% to -96% payload) while keeping
 * authentic original PNG/JPG assets intact as fallback, gated by IntersectionObserver
 * so off-screen media consumes zero network data and zero decoded RGBA memory.
 */
export function OptimizedPicture({
  src,
  alt,
  width,
  height,
  className = '',
  pictureClassName = 'block h-full w-full',
  eager = false,
  fetchPriority,
  draggable,
  scrollRootRef,
}: OptimizedPictureProps) {
  const [inVerticalRange, setInVerticalRange] = useState<boolean>(eager);
  const [shouldLoad, setShouldLoad] = useState<boolean>(eager);
  const holderRef = useRef<HTMLSpanElement | null>(null);

  // Stage 1: Observe vertical proximity to viewport (220px margin)
  useEffect(() => {
    if (inVerticalRange) return;
    const el = holderRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInVerticalRange(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInVerticalRange(true);
          io.disconnect();
        }
      },
      { rootMargin: '220px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [inVerticalRange]);

  // Stage 2: If inside a horizontal scroll reel, also gate by horizontal visibility
  useEffect(() => {
    if (shouldLoad || !inVerticalRange) return;
    const rootEl = scrollRootRef?.current ?? null;
    const el = holderRef.current;

    if (!rootEl || !el || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { root: rootEl, rootMargin: '0px 260px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [inVerticalRange, scrollRootRef, shouldLoad]);

  const webpSrc = toWebpSrc(src);

  if (!shouldLoad) {
    return (
      <span
        ref={holderRef}
        aria-hidden="true"
        className="block h-full w-full bg-[#050714]"
      />
    );
  }

  return (
    <picture className={pictureClassName}>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={fetchPriority}
        decoding="async"
        draggable={draggable}
        className={className}
      />
    </picture>
  );
}

export default OptimizedPicture;
