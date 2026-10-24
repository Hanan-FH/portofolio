import type { ReactNode } from 'react';
export { SectionHeading, type SectionHeadingProps } from './SectionHeading';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

/**
 * Editorial Section Landmark.
 */
export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-[72px] py-[clamp(4.5rem,7.5vw,7rem)] ${className}`.trim()}
    >
      {children}
    </section>
  );
}

export default Section;
