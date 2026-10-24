export interface SectionHeadingProps {
  index: string;
  label: string;
  ephemeris?: string;
  note?: string;
  className?: string;
}

/**
 * Editorial Roadshow Section Header with 1px Kumihimo Chromatic Cord
 * and Monospaced Astronomical Ephemeris Indices.
 */
export function SectionHeading({
  index,
  label,
  ephemeris,
  note,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`relative ${className}`.trim()}>
      <svg
        viewBox="0 0 1200 6"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="mb-4 block h-[5px] w-full overflow-visible opacity-80"
      >
        <defs>
          <linearGradient id={`kumihimoCordA-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.72" />
            <stop offset="46%" stopColor="#e11d48" stopOpacity="0.62" />
            <stop offset="82%" stopColor="#fde047" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#c2410c" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`kumihimoCordB-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.5" />
            <stop offset="52%" stopColor="#38bdf8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6d1146" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 3 Q 180 0.5 360 3 T 720 3 T 1200 3"
          fill="none"
          stroke={`url(#kumihimoCordA-${index})`}
          strokeWidth="1"
        />
        <path
          d="M 0 3 Q 180 5.5 360 3 T 720 3 T 1200 3"
          fill="none"
          stroke={`url(#kumihimoCordB-${index})`}
          strokeWidth="0.65"
        />
      </svg>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="ephemeris-label text-amber-200/80">
            ARCHIVE // {index} — {label}
          </span>
          {ephemeris && (
            <>
              <span aria-hidden="true" className="hidden h-2.5 w-px bg-white/15 sm:inline-block" />
              <span className="astro-telemetry hidden sm:inline">{ephemeris}</span>
            </>
          )}
        </div>

        {note && <span className="astro-telemetry">{note}</span>}
      </div>
    </div>
  );
}

export default SectionHeading;
