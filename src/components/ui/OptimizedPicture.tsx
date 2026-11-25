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
}

function toWebpSrc(src: string): string | null {
  if (!src.startsWith('/') || src.startsWith('/webp/')) return null;
  if (!src.startsWith('/projects/') && !src.startsWith('/certificates/') && src !== '/profile.jpg') {
    return null;
  }
  if (!/\.(png|jpe?g)$/i.test(src)) return null;
  return `/webp${src.replace(/\.(png|jpe?g)$/i, '.webp')}`;
}

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
}: OptimizedPictureProps) {
  const webpSrc = toWebpSrc(src);

  return (
    <picture className={pictureClassName}>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        fetchPriority={fetchPriority}
        draggable={draggable}
        className={className}
      />
    </picture>
  );
}

export default OptimizedPicture;
