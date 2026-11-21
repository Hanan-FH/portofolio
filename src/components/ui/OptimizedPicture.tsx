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
 * Serves 1:1 full-resolution WebP companions while keeping authentic PNG/JPG assets
 * as fallback, gated by IntersectionObserver so off-screen media consumes zero
 * network bandwidth and zero decoded RGBA memory until scrolled near view.
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
  const [shouldLoad, setShouldLoad] = useState<boolean>(eager);
  const holderRef = useRef<HTMLPictureElement | null>(null);

  useEffect(() => {
    if (shouldLoad) return;
    const el = holderRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    let horizObserver: IntersectionObserver | null = null;
    const vertObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        vertObserver.disconnect();

        const rootEl = scrollRootRef?.current ?? null;
        if (!rootEl) {
          setShouldLoad(true);
          return;
        }

        horizObserver = new IntersectionObserver(
          (hEntries) => {
            if (!hEntries.some((entry) => entry.isIntersecting)) return;
            horizObserver?.disconnect();
            setShouldLoad(true);
          },
          { root: rootEl, rootMargin: '0px 260px' }
        );
        horizObserver.observe(el);
      },
      { rootMargin: '220px 0px' }
    );

    vertObserver.observe(el);
    return () => {
      vertObserver.disconnect();
      horizObserver?.disconnect();
    };
  }, [scrollRootRef, shouldLoad]);

  const webpSrc = toWebpSrc(src);

  return (
    <picture
      ref={shouldLoad ? undefined : holderRef}
      className={pictureClassName}
      style={!shouldLoad && width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
    >
      {shouldLoad && webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      {shouldLoad && (
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
      )}
    </picture>
  );
}

export default OptimizedPicture;
