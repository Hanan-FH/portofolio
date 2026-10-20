import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

/**
 * Consistent vertical rhythm and anchor offset for every major section.
 */
export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-[70px] py-[clamp(4.75rem,8vw,8rem)] ${className}`.trim()}
    >
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  index: string;
  label: string;
  note?: string;
}

/**
 * The recurring section rule: index, name, and a quiet piece of metadata.
 */
export function SectionHeading({ index, label, note }: SectionHeadingProps) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-line pt-4">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[0.68rem] tracking-[0.12em] text-signal">{index}</span>
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-mist">
          {label}
        </span>
      </div>
      {note && <span className="meta-label shrink-0 text-right">{note}</span>}
    </div>
  );
}
