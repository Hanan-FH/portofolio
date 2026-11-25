import { portfolioData } from '../../data/portfolio';
import { RollingText } from '../ui/RollingText';
import { Section, SectionHeading } from '../ui/Section';

export function About() {
  const { about, education, personal } = portfolioData;

  return (
    <Section id="about">
      <div className="container-site">
        <SectionHeading
          index="01"
          label="ABOUT"
          title="Narrative & Discipline"
          note={about.location}
        />

        {/* Open 12-Column Editorial Spread — Generous Whitespace & 1px Hairlines */}
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-16">
          {/* Left Column: Statement, Bio & Clean Hairline Dossier */}
          <div data-reveal="up" className="lg:col-span-5">
            <h3 className="text-2xl uppercase leading-[1.04] tracking-[-0.03em] sm:text-3xl">
              {about.heading}
            </h3>

            <div className="mt-6 space-y-4 text-base leading-[1.65] text-[var(--ink-secondary)]">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-10 divide-y divide-[var(--line-hairline)] border-y border-[var(--line-hairline)] text-sm">
              <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                <dt className="mono-index text-[var(--ink-muted)]">Status</dt>
                <dd className="font-medium text-[var(--ink-primary)]">{about.status}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                <dt className="mono-index text-[var(--ink-muted)]">Focus</dt>
                <dd className="leading-[1.6] text-[var(--ink-secondary)]">{about.currentFocus}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                <dt className="mono-index text-[var(--ink-muted)]">Location</dt>
                <dd className="text-[var(--ink-primary)]">{about.location}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                <dt className="mono-index text-[var(--ink-muted)]">Direct</dt>
                <dd>
                  <a
                    href={`mailto:${personal.email}`}
                    className="roll-trigger inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--ink-primary)] hover:text-[var(--accent-purple)]"
                  >
                    <RollingText text={personal.email} />
                    <span className="kinetic-arrow" aria-hidden="true">↗</span>
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Academic Record & Open 2x2 Curriculum Grid */}
          <div className="lg:col-span-7">
            {education.map((item, index) => (
              <article
                key={`${item.institution}-${index}`}
                data-reveal="wipe"
                className="border-t border-[var(--line-hairline)] pb-10 pt-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="mono-index text-[var(--ink-muted)]">
                    EDUCATION / {item.period}
                  </span>
                  <span className="mono-index font-semibold text-[var(--accent-purple)]">
                    {item.status}
                  </span>
                </div>

                <h3 className="mt-3 text-2xl uppercase leading-[1.02] tracking-[-0.03em] sm:text-3xl">
                  {item.program}
                </h3>
                <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                  {item.institution}
                </p>
                <p className="mt-4 text-base leading-[1.65] text-[var(--ink-secondary)]">
                  {item.description}
                </p>
              </article>
            ))}

            {/* 4 Authentic SMK Plus Pelita Nusantara Foundation Competencies */}
            <div className="grid border-t border-[var(--line-hairline)] sm:grid-cols-2">
              {about.fundamentals.map((comp, index) => (
                <article
                  key={comp.id}
                  data-reveal="wipe"
                  style={{ '--delay': `${index * 70}ms` } as React.CSSProperties}
                  className={`group border-b border-[var(--line-hairline)] py-7 ${
                    index % 2 === 0 ? 'sm:pr-8' : 'sm:border-l sm:border-[var(--line-hairline)] sm:pl-8'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-2xl leading-none text-[var(--ink-primary)] group-hover:text-[var(--accent-purple)]">
                      {comp.id}
                    </span>
                    <span className="mono-index text-[var(--ink-muted)]">
                      {comp.localTitle}
                    </span>
                  </div>

                  <h4 className="mt-4 text-lg uppercase leading-[1.06] tracking-[-0.03em]">
                    {comp.title}
                  </h4>
                  <p className="mt-2.5 text-sm leading-[1.65] text-[var(--ink-secondary)]">
                    {comp.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default About;
