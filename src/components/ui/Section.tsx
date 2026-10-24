import type { ReactNode } from 'react';
export { SectionHeading, type SectionHeadingProps } from './SectionHeading';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

/**
 * Semantic section landmark with consistent anchor offset and editorial vertical cadence.
 */
export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-[84px] py-[clamp(4.75rem,8vw,7.75rem)] ${className}`.trim()}
    >
      {children}
    </section>
  );
}

export default Section;
