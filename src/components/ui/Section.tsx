import type { ReactNode } from 'react';
export { SectionHeading, type SectionHeadingProps } from './SectionHeading';

interface SectionProps {
  id: string;
  children: ReactNode;
  verticalLabel?: string;
  className?: string;
}

/**
 * Editorial Section Landmark with optional Japanese theatrical vertical margin ornament.
 */
export function Section({ id, children, verticalLabel, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-[72px] py-[clamp(4.5rem,7.5vw,7.25rem)] ${className}`.trim()}
    >
      {verticalLabel && (
        <span
          aria-hidden="true"
          className="vertical-kanji pointer-events-none absolute right-3 top-20 hidden text-[11px] text-pink-200/35 select-none 2xl:block"
        >
          {verticalLabel}
        </span>
      )}
      {children}
    </section>
  );
}

export default Section;
