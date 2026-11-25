import type { ReactNode } from 'react';
export { SectionHeading, type SectionHeadingProps } from './SectionHeading';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  defer?: boolean;
}

export function Section({ id, children, className = '', defer = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-16 border-t border-[var(--border-subtle)] py-16 sm:py-20 lg:py-24 ${
        defer ? 'section-defer' : ''
      } ${className}`.trim()}
    >
      {children}
    </section>
  );
}

export default Section;
