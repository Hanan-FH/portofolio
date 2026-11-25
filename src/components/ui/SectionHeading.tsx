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
    <header className={`mb-14 sm:mb-20 ${className}`.trim()}>
      {/* Architectural Hairline Draw */}
      <div
        data-reveal="line"
        aria-hidden="true"
        className="h-px w-full bg-[var(--line-strong)] opacity-25"
      />

      <div data-reveal="up" className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="mono-index font-semibold text-[var(--accent-purple)]">
            {index}
          </span>
          <span aria-hidden="true" className="mono-index text-[var(--ink-muted)]">
            /
          </span>
          <span className="mono-index text-[var(--ink-primary)]">{label}</span>
        </div>

        {note && <span className="mono-index text-[var(--ink-muted)]">{note}</span>}
      </div>

      <div data-reveal="mask" className="mt-6 sm:mt-8">
        <h2 className="reveal-mask-child text-[clamp(2.4rem,6.2vw,5.4rem)] uppercase leading-[0.92] tracking-[-0.04em]">
          {title}
        </h2>
      </div>
    </header>
  );
}

export default SectionHeading;
