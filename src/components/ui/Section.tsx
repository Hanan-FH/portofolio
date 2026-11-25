import type { ReactNode } from 'react';
export { SectionHeading, type SectionHeadingProps } from './SectionHeading';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-16 py-24 sm:py-28 lg:py-36 ${className}`.trim()}
    >
      {children}
    </section>
  );
}

export default Section;
