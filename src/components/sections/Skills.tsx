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

  const rowOne = Array.from(
    new Set([...skills.programming, ...skills.frontend, ...skills.backend])
  );
  const rowTwo = Array.from(
    new Set([...skills.database, ...skills.tools, ...skills.design])
  );

  const renderMarqueeWord = (word: string, index: number, prefix: string, hidden = false) => {
    const outlined = index % 2 === 1;
    return (
      <span
        key={`${prefix}-${word}-${index}`}
        aria-hidden={hidden || undefined}
        className="inline-flex shrink-0 items-center gap-6 px-4 py-2"
      >
        <span
          className={`text-[clamp(1.85rem,4.2vw,3.5rem)] uppercase leading-none tracking-[-0.04em] ${
            outlined
              ? 'marquee-outline-word'
              : 'font-display text-[var(--ink-primary)] hover:text-[var(--accent-purple)]'
          }`}
        >
          {word}
        </span>
        <span aria-hidden="true" className="font-mono text-xs text-[var(--ink-muted)]">
          /
        </span>
      </span>
    );
  };

  return (
    <Section id="skills" className="overflow-hidden">
      <div className="container-site">
        <SectionHeading
          index="03"
          label="SKILLS"
          title="Capabilities & Stack"
          note="09 LANGUAGES / 06 DOMAINS"
        />
      </div>

      {/* Dual-Direction Infinite CSS Velocity Marquee (Outlined-to-Solid Hover) */}
      <div
        data-reveal="up"
        className="marquee-track divide-y divide-[var(--line-hairline)] border-y border-[var(--line-hairline)] bg-[var(--bg-surface)]"
      >
        <div className="overflow-hidden py-2">
          <div className="animate-marquee-left items-center motion-reduce:justify-center motion-reduce:px-4">
            <div className="flex shrink-0 items-center motion-reduce:flex-wrap motion-reduce:justify-center">
              {rowOne.map((item, i) => renderMarqueeWord(item, i, 'r1a'))}
            </div>
            <div aria-hidden="true" className="flex shrink-0 items-center motion-reduce:hidden">
              {rowOne.map((item, i) => renderMarqueeWord(item, i, 'r1b', true))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden py-2">
          <div className="animate-marquee-right items-center motion-reduce:justify-center motion-reduce:px-4">
            <div className="flex shrink-0 items-center motion-reduce:flex-wrap motion-reduce:justify-center">
              {rowTwo.map((item, i) => renderMarqueeWord(item, i + 1, 'r2a'))}
            </div>
            <div aria-hidden="true" className="flex shrink-0 items-center motion-reduce:hidden">
              {rowTwo.map((item, i) => renderMarqueeWord(item, i + 1, 'r2b', true))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-site mt-20 space-y-20">
        {/* Open 6-Domain Architectural Matrix (1px Hairlines Only) */}
        <div
          data-reveal="up"
          className="grid border-t border-[var(--line-hairline)] sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((group, idx) => (
            <div
              key={group.id}
              className={`border-b border-[var(--line-hairline)] py-8 ${
                idx % 3 !== 0 ? 'lg:border-l lg:border-[var(--line-hairline)] lg:pl-8' : 'lg:pr-8'
              } ${
                idx % 3 === 1 ? 'lg:pr-8' : ''
              } ${
                idx % 2 !== 0
                  ? 'sm:max-lg:border-l sm:max-lg:border-[var(--line-hairline)] sm:max-lg:pl-6'
                  : 'sm:max-lg:pr-6'
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="mono-index text-[var(--ink-primary)]">
                  <span className="text-[var(--accent-purple)]">{group.id}</span> / {group.label}
                </span>
                <span className="mono-index text-[var(--ink-muted)]">
                  0{group.items.length}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span key={skill} className="editorial-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 9 Core Curriculum Languages with Intact SVG Icons */}
        <div>
          <div
            data-reveal="up"
            className="mb-8 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line-hairline)] pb-4"
          >
            <h3 className="mono-index text-[var(--ink-primary)]">
              CURRICULUM LEDGER / CORE LANGUAGES
            </h3>
            <span className="mono-index text-[var(--ink-muted)]">09 VERIFIED RECORDS</span>
          </div>

          <div className="grid border-t border-[var(--line-hairline)] sm:grid-cols-2 lg:grid-cols-3">
            {skills.languages.map((language, index) => (
              <article
                key={language.name}
                data-reveal="wipe"
                style={{ '--delay': `${(index % 3) * 70}ms` } as React.CSSProperties}
                className={`group flex items-start gap-4 border-b border-[var(--line-hairline)] py-7 ${
                  index % 3 !== 0 ? 'lg:border-l lg:border-[var(--line-hairline)] lg:pl-7' : 'lg:pr-7'
                } ${
                  index % 3 === 1 ? 'lg:pr-7' : ''
                } ${
                  index % 2 !== 0
                    ? 'sm:max-lg:border-l sm:max-lg:border-[var(--line-hairline)] sm:max-lg:pl-6'
                    : 'sm:max-lg:pr-6'
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--line-hairline)] bg-[var(--bg-surface)] p-2">
                  <img
                    src={language.image}
                    alt={language.name}
                    width={26}
                    height={26}
                    loading="lazy"
                    decoding="async"
                    className="h-6 w-6 object-contain grayscale group-hover:grayscale-0"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-lg uppercase leading-none tracking-[-0.03em]">
                      {language.name}
                    </h4>
                    <span className="mono-index text-[var(--ink-muted)] group-hover:text-[var(--accent-purple)]">
                      {language.tag}
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                    {language.category}
                  </p>
                  <p className="mt-2.5 text-sm leading-[1.6] text-[var(--ink-secondary)]">
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
