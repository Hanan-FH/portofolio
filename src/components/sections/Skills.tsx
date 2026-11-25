import { portfolioData } from '../../data/portfolio';
import { Section, SectionHeading } from '../ui/Section';

export function Skills() {
  const { skills } = portfolioData;

  const skillCategories = [
    { id: '01', label: 'FRONTEND', items: skills.frontend },
    { id: '02', label: 'BACKEND', items: skills.backend },
    { id: '03', label: 'DATABASE', items: skills.database },
    { id: '04', label: 'PROGRAMMING', items: skills.programming },
    { id: '05', label: 'TOOLS & WORKFLOW', items: skills.tools },
    { id: '06', label: 'DESIGN & ARCHITECTURE', items: skills.design },
  ];

  const marqueeItems = Array.from(
    new Set([
      ...skills.programming,
      ...skills.frontend,
      ...skills.backend,
      ...skills.database,
      ...skills.tools,
      ...skills.design,
    ])
  );

  return (
    <Section id="skills" defer className="overflow-hidden">
      <div className="container-site">
        <SectionHeading
          index="03"
          label="SKILLS"
          title="Technical Stack & Languages"
          note="09 LANGUAGES // 06 DOMAINS"
        />
      </div>

      {/* Pure-CSS Infinite Marquee Ribbon (translate3d, pauses on hover, disabled on reduced motion) */}
      <div
        data-reveal
        className="border-y-[1.5px] border-[var(--border-strong)] bg-[var(--bg-inverted)] py-3 text-[var(--bg-primary)]"
      >
        <div className="overflow-hidden">
          <div className="animate-marquee items-center motion-reduce:justify-center motion-reduce:gap-2 motion-reduce:px-4">
            <div className="flex shrink-0 items-center motion-reduce:flex-wrap motion-reduce:justify-center">
              {marqueeItems.map((item) => (
                <span
                  key={`a-${item}`}
                  className="inline-flex items-center gap-4 px-4 py-1 font-mono text-xs font-semibold uppercase tracking-[0.08em]"
                >
                  <span>{item}</span>
                  <span aria-hidden="true" className="opacity-45">
                    //
                  </span>
                </span>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="flex shrink-0 items-center motion-reduce:hidden"
            >
              {marqueeItems.map((item) => (
                <span
                  key={`b-${item}`}
                  className="inline-flex items-center gap-4 px-4 py-1 font-mono text-xs font-semibold uppercase tracking-[0.08em]"
                >
                  <span>{item}</span>
                  <span className="opacity-45">//</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-site mt-12 space-y-12">
        {/* Categorized Editorial Matrix (Preserves 100% of Frontend, Backend, Database, Programming, Tools, Design) */}
        <div
          data-reveal
          className="manga-frame grid divide-y divide-[var(--border-subtle)] sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((group, idx) => (
            <div
              key={group.id}
              className={`p-5 sm:p-6 ${
                idx % 3 !== 0 ? 'lg:border-l lg:border-[var(--border-subtle)]' : ''
              } ${idx % 2 !== 0 ? 'sm:max-lg:border-l sm:max-lg:border-[var(--border-subtle)]' : ''}`}
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
                <span className="mono-label font-semibold text-[var(--ink-primary)]">
                  {group.id} // {group.label}
                </span>
                <span className="font-mono text-[11px] text-[var(--ink-muted)]">
                  [{String(group.items.length).padStart(2, '0')}]
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span key={skill} className="mono-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 9 Core Curriculum Languages with Intact SVG Assets */}
        <div data-reveal>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b-[1.5px] border-[var(--border-strong)] pb-2.5">
            <h3 className="mono-label font-semibold text-[var(--ink-primary)]">
              INDEX // CORE CURRICULUM LANGUAGES
            </h3>
            <span className="mono-label text-[var(--ink-muted)]">
              09 VERIFIED RECORDS
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.languages.map((language) => (
              <article
                key={language.name}
                className="manga-card group flex items-start gap-4 p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-primary)] p-2">
                  <img
                    src={language.image}
                    alt={language.name}
                    width={28}
                    height={28}
                    loading="lazy"
                    decoding="async"
                    className="editorial-media h-7 w-7 object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="display-card text-lg">{language.name}</h4>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--ink-muted)]">
                      {language.tag}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--ink-muted)]">
                    {language.category}
                  </p>
                  <p className="mt-2 text-sm leading-[1.6] text-[var(--ink-secondary)]">
                    {language.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Skills;
