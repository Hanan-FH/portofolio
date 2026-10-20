import type { ReactNode } from 'react';
export { SectionHeading, type SectionHeadingProps } from './SectionHeading';

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

export default Section;
