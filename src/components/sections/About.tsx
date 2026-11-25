import { portfolioData } from '../../data/portfolio';
import { Section, SectionHeading } from '../ui/Section';

export function About() {
  const { about, education, personal } = portfolioData;

  return (
    <Section id="about">
      <div className="container-site">
        <SectionHeading
          index="01"
          label="ABOUT"
          title="Profile & Curriculum"
          note={about.location}
        />

        <div data-reveal className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left Column: Editorial Statement, Verbatim Bio & Specification Table */}
          <div className="lg:col-span-5">
            <h3 className="display-card text-2xl sm:text-3xl">
              {about.heading}
            </h3>

            <div className="mt-5 space-y-4 text-base leading-[1.65] text-[var(--ink-secondary)]">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <dl className="manga-card mt-8 divide-y divide-[var(--border-subtle)] text-sm">
              <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                <dt className="mono-label text-[var(--ink-muted)]">Status</dt>
                <dd className="font-semibold text-[var(--ink-primary)]">{about.status}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                <dt className="mono-label text-[var(--ink-muted)]">Focus</dt>
                <dd className="leading-[1.6] text-[var(--ink-secondary)]">{about.currentFocus}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                <dt className="mono-label text-[var(--ink-muted)]">Location</dt>
                <dd className="text-[var(--ink-primary)]">{about.location}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                <dt className="mono-label text-[var(--ink-muted)]">Email</dt>
                <dd>
                  <a
                    href={`mailto:${personal.email}`}
                    className="font-mono text-xs font-semibold text-[var(--ink-primary)] underline underline-offset-4 hover:bg-[var(--bg-inverted)] hover:text-[var(--bg-primary)]"
                  >
                    {personal.email} ↗
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Academic Record & 4 Foundation Competencies Matrix */}
          <div className="space-y-6 lg:col-span-7">
            {education.map((item, index) => (
              <article key={`${item.institution}-${index}`} className="manga-card overflow-hidden">
                <div className="halftone-surface flex flex-wrap items-center justify-between gap-2 border-b-[1.5px] border-[var(--border-strong)] bg-[var(--bg-primary)] px-5 py-3">
                  <span className="mono-label text-[var(--ink-primary)]">
                    EDUCATION // {item.period}
                  </span>
                  <span className="inline-flex bg-[var(--bg-inverted)] px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--bg-primary)]">
                    {item.status}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="display-card text-xl sm:text-2xl">{item.program}</h3>
                  <p className="mt-1.5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ink-muted)]">
                    {item.institution}
                  </p>
                  <p className="mt-3 text-base leading-[1.65] text-[var(--ink-secondary)]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}

            {/* 2x2 Manga-Panel Grid of 4 SMK Plus Pelita Nusantara Foundation Competencies */}
            <div className="grid gap-4 sm:grid-cols-2">
              {about.fundamentals.map((comp) => (
                <article key={comp.id} className="manga-card flex flex-col justify-between p-5">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 border-b border-[var(--border-subtle)] pb-2.5">
                      <span className="font-display text-2xl leading-none text-[var(--ink-primary)]">
                        {comp.id}
                      </span>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--ink-muted)]">
                        {comp.localTitle}
                      </span>
                    </div>

                    <h4 className="display-card mt-3.5 text-lg">{comp.title}</h4>
                    <p className="mt-2.5 text-sm leading-[1.65] text-[var(--ink-secondary)]">
                      {comp.description}
                    </p>
                  </div>
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
