import { portfolioData } from '../../data/portfolio';
import { Section, SectionHeading } from '../ui/Section';

export function Skills() {
  const { skills } = portfolioData;

  const capabilityDomains = [
    {
      id: 'programming',
      coord: 'MAT // 01',
      title: 'Core Engineering & Languages',
      items: skills.programming,
    },
    {
      id: 'frontend',
      coord: 'MAT // 02',
      title: 'Frontend & Interface Architecture',
      items: skills.frontend,
    },
    {
      id: 'backend',
      coord: 'MAT // 03',
      title: 'Backend & Runtime Services',
      items: skills.backend,
    },
    {
      id: 'database',
      coord: 'MAT // 04',
      title: 'Relational Databases & Schemas',
      items: skills.database,
    },
    {
      id: 'design',
      coord: 'MAT // 05',
      title: 'Design Systems & Accessibility',
      items: skills.design,
    },
    {
      id: 'tools',
      coord: 'MAT // 06',
      title: 'Developer Tooling & Workflows',
      items: skills.tools,
    },
  ];

  return (
    <Section id="skills">
      <div className="container-site">
        <SectionHeading
          index="02"
          label="Technical Capabilities Matrix"
          kanji="技術体系"
          note="Verified Stack · Zero Arbitrary Meters"
        />

        <div className="mt-10 max-w-[46rem]">
          <h2 className="editorial-heading text-2xl font-semibold text-white sm:text-3xl lg:text-[2.2rem]">
            Programming languages, web architectures, and engineering tooling.
          </h2>
        </div>

        {/* 6-Domain Capabilities Matrix (Glass Badges Only — Zero Fake Progress Bars) */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilityDomains.map((domain) => (
            <div
              key={domain.id}
              className="crepuscular-card-interactive flex flex-col justify-between rounded-2xl p-6"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-pink-300/90">
                    {domain.coord}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                </div>

                <h3 className="editorial-heading mt-4 text-lg font-semibold text-white">
                  {domain.title}
                </h3>

                <div className="mt-5 flex flex-wrap gap-2">
                  {domain.items.map((tech) => (
                    <span
                      key={tech}
                      className="twilight-badge rounded-full px-3 py-1 font-mono text-xs text-slate-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 9 Authentic Curriculum Languages with Original SVG Assets */}
        <div className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="astro-label">Curriculum Language Registry</span>
              <h3 className="editorial-heading mt-2 text-xl font-semibold text-white sm:text-2xl">
                Core Languages Across Practical Coursework
              </h3>
            </div>
            <span className="astro-meta">09 Verified Languages</span>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.languages.map((language) => (
              <div
                key={language.name}
                className="crepuscular-card-interactive group flex items-start gap-4 rounded-2xl p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-[#070a18]/80 p-2.5 shadow-inner">
                  <img
                    src={language.image}
                    alt={language.name}
                    width={28}
                    height={28}
                    loading="lazy"
                    decoding="async"
                    className="h-7 w-7 object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-sans text-base font-semibold text-white group-hover:text-amber-200">
                      {language.name}
                    </h4>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-sky-200/75">
                      {language.tag}
                    </span>
                  </div>

                  <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-pink-300/85">
                    {language.category}
                  </p>

                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    {language.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Skills;
