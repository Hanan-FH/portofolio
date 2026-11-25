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
  const [cleanPath, query] = src.split('?');
  if (!cleanPath.startsWith('/') || cleanPath.startsWith('/webp/')) return null;
  if (
    !cleanPath.startsWith('/projects/') &&
    !cleanPath.startsWith('/certificates/') &&
    cleanPath !== '/profile.jpg' &&
    cleanPath !== '/addo.jpg'
  ) {
    return null;
  }
  if (!/\.(png|jpe?g)$/i.test(cleanPath)) return null;
  const webpPath = `/webp${cleanPath.replace(/\.(png|jpe?g)$/i, '.webp')}`;
  return query ? `${webpPath}?${query}` : webpPath;
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
