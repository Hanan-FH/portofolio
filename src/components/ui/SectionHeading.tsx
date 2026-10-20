export interface SectionHeadingProps {
  index: string;
  label: string;
  note?: string;
  className?: string;
}

/**
 * Standard architectural section heading with index marker, section label, and metadata note.
 */
export function SectionHeading({ index, label, note, className = '' }: SectionHeadingProps) {
  return (
    <div className={`flex items-baseline justify-between gap-6 border-t border-line pt-4 ${className}`.trim()}>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[0.68rem] font-bold tracking-[0.12em] text-signal">{index}</span>
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-mist">
          {label}
        </span>
      </div>
      {note && <span className="meta-label shrink-0 text-right">{note}</span>}
    </div>
  );
}

export default SectionHeading;
