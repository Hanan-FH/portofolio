export interface SectionHeadingProps {
  index: string;
  label: string;
  kanji?: string;
  note?: string;
  className?: string;
}

/**
 * Astronomical coordinate section header with crepuscular horizon hairline.
 */
export function SectionHeading({
  index,
  label,
  kanji,
  note,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`relative pt-5 ${className}`.trim()}>
      <div
        aria-hidden="true"
        className="mb-5 h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, rgba(254, 240, 138, 0.52) 0%, rgba(244, 63, 94, 0.42) 34%, rgba(56, 189, 248, 0.34) 72%, rgba(56, 189, 248, 0.04) 100%)',
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.28em] text-amber-200/90">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.85)]" />
            {index}
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-white/20" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-pink-300/85">
            {label}
          </span>
          {kanji && (
            <span
              aria-hidden="true"
              className="hidden font-serif text-xs tracking-[0.22em] text-sky-200/65 sm:inline"
            >
              · {kanji}
            </span>
          )}
        </div>

        {note && (
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-sky-200/70">
            {note}
          </span>
        )}
      </div>
    </div>
  );
}

export default SectionHeading;
