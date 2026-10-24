/**
 * Silhouetted Cloud Horizon Bank with Crepuscular Rays & 1px Solar Horizon Rim Shading.
 */
export function CloudHorizonBank({
  variant = 'twilight',
  className = '',
}: {
  variant?: 'twilight' | 'zenith';
  className?: string;
}) {
  const isZenith = variant === 'zenith';

  return (
    <div
      className={`pointer-events-none relative w-full overflow-hidden select-none leading-none ${className}`}
      aria-hidden="true"
    >
      <div className="mx-auto w-11/12 max-w-6xl opacity-60">
        <div className="anamorphic-streak" />
      </div>

      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="-mt-3 block h-[64px] w-full sm:h-[96px] lg:h-[120px]"
      >
        <defs>
          <linearGradient id={`horizonRim-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.28" />
            <stop offset="32%" stopColor="#6d1146" stopOpacity="0.58" />
            <stop offset="58%" stopColor="#fde047" stopOpacity={isZenith ? '0.38' : '0.88'} />
            <stop offset="78%" stopColor="#c2410c" stopOpacity="0.68" />
            <stop offset="100%" stopColor="#24123e" stopOpacity="0.32" />
          </linearGradient>
          <linearGradient id={`horizonBody-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isZenith ? '#0d1435' : '#24123e'} stopOpacity="0.72" />
            <stop offset="100%" stopColor="#050714" stopOpacity={isZenith ? '0.48' : '0.84'} />
          </linearGradient>
          <linearGradient id={`horizonRay-${variant}`} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#fde047" stopOpacity={isZenith ? '0.07' : '0.18'} />
            <stop offset="100%" stopColor="#c2410c" stopOpacity="0" />
          </linearGradient>
        </defs>

        <polygon points="880,145 640,0 760,0" fill={`url(#horizonRay-${variant})`} />
        <polygon points="880,145 830,0 950,0" fill={`url(#horizonRay-${variant})`} />
        <polygon points="880,145 1010,0 1130,0" fill={`url(#horizonRay-${variant})`} />

        <path
          d="M0,118 C110,96 190,68 290,82 C375,46 475,54 560,86 C655,44 775,28 885,68 C975,38 1085,48 1170,80 C1260,56 1350,70 1440,94 L1440,160 L0,160 Z"
          fill={`url(#horizonBody-${variant})`}
          stroke={`url(#horizonRim-${variant})`}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />

        <path
          d="M0,136 C150,116 275,128 410,110 C535,94 650,120 790,104 C920,88 1055,116 1195,104 C1295,96 1380,114 1440,124 L1440,160 L0,160 Z"
          fill="rgba(5, 7, 20, 0.72)"
          stroke="rgba(253, 224, 71, 0.2)"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export default CloudHorizonBank;
