export interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  note?: string;
  className?: string;
}

export function SectionHeading({
  index,
  label,
  title,
  note,
  className = '',
}: SectionHeadingProps) {
  return (
    <header data-reveal className={`mb-10 sm:mb-12 ${className}`.trim()}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t-[1.5px] border-[var(--border-strong)] pt-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center bg-[var(--bg-inverted)] px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--bg-primary)]">
            {index} // {label}
          </span>
        </div>
        {note && (
          <span className="mono-label text-[var(--ink-muted)]">
            {note}
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="display-section text-[clamp(2rem,4.2vw,3.35rem)] uppercase">
          {title}
        </h2>
        <div
          aria-hidden="true"
          className="hidden h-[3px] w-12 shrink-0 bg-[var(--ink-primary)] sm:block"
        />
      </div>
    </header>
  );
}

export default SectionHeading;
