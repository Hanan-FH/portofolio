export interface SectionHeadingProps {
  index: string;
  label: string;
  kanji?: string;
  note?: string;
  className?: string;
}

/**
 * Shinkai Theatrical Section Header with Kumihimo Braided Trajectory Line
 * and Monospaced Astronomical Coordinate Metadata.
 */
export function SectionHeading({
  index,
  label,
  kanji,
  note,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`relative ${className}`.trim()}>
      {/* Kumihimo (組紐) Braided 1px Chromatic Accent */}
      <svg
        viewBox="0 0 1200 8"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="mb-4 block h-[6px] w-full overflow-visible opacity-90"
      >
        <defs>
          <linearGradient id={`kumihimoA-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#f43f5e" stopOpacity="0.7" />
            <stop offset="82%" stopColor="#fef08a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#d94e16" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`kumihimoB-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#7c124a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 4 Q 180 0.5 360 4 T 720 4 T 1200 4"
          fill="none"
          stroke={`url(#kumihimoA-${index})`}
          strokeWidth="1"
        />
        <path
          d="M 0 4 Q 180 7.5 360 4 T 720 4 T 1200 4"
          fill="none"
          stroke={`url(#kumihimoB-${index})`}
          strokeWidth="0.75"
        />
      </svg>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-amber-200/90">
            {index}
          </span>
          <span aria-hidden="true" className="h-2.5 w-px bg-white/20" />
          <span className="astro-coord">{label}</span>
          {kanji && (
            <span
              aria-hidden="true"
              className="hidden font-serif text-[11px] tracking-[0.28em] text-sky-200/65 sm:inline"
            >
              {kanji}
            </span>
          )}
        </div>

        {note && <span className="astro-telemetry">{note}</span>}
      </div>
    </div>
  );
}

export default SectionHeading;
