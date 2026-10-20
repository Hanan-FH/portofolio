import { portfolioData } from '../data/portfolio';
import { Section, SectionHeading } from './ui/Section';

export function Skills() {
  const { skills } = portfolioData;

  const skillGroups = [
    {
      id: 'frontend',
      category: 'Frontend Engineering',
      description:
        'Building semantic, accessible, and high-performance user interfaces with modern client frameworks.',
      items: skills.frontend,
      telemetry: 'DOM · VDOM · CSS ENGINE',
    },
    {
      id: 'backend',
      category: 'Backend Architectures',
      description:
        'Engineering server-side routing, RESTful APIs, OOP business logic, and modular runtime services.',
      items: skills.backend,
      telemetry: 'REST · JSON · HTTP LIFECYCLE',
    },
    {
      id: 'databases',
      category: 'Databases & Query Logic',
      description:
        'Relational schema architecture, data normalization, indices, constraints, and structured SQL operations.',
      items: skills.database,
      telemetry: 'RDBMS · SCHEMAS · DDL / DML',
    },
    {
      id: 'tools',
      category: 'Tooling & DevOps Workflow',
      description:
        'Version control workflows, API debugging, command-line environments, and modular build systems.',
      items: skills.tools,
      telemetry: 'GIT · CLI · BUILD RUNTIMES',
    },
  ];

  return (
    <Section id="skills">
      <div className="container-site">
        <SectionHeading index="03" label="Technical Stack" note="Core Competencies" />

        <div className="mt-10 max-w-[44rem]">
          <h2 className="text-statement font-medium text-paper">
            Programming languages, web technologies, and developer tooling.
          </h2>
        </div>

        {/* 4 Core Competency Quadrants */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {skillGroups.map((group, index) => (
            <div
              key={group.id}
              className="group rounded-xs border border-line bg-panel/70 p-6 transition-all duration-300 hover:border-signal/45 hover:bg-panel hover:shadow-[0_8px_24px_rgba(0,209,255,0.08)] sm:p-7"
            >
              <div className="flex items-center justify-between border-b border-line/70 pb-3">
                <span className="font-mono text-[0.66rem] font-bold tracking-[0.14em] text-signal">
                  0{index + 1} // {group.telemetry}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-line-strong transition-colors group-hover:bg-signal" />
              </div>

              <h3 className="mt-4 text-lg font-medium text-paper transition-colors group-hover:text-signal">
                {group.category}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-xs border border-line/80 bg-panel-raised px-2.5 py-1 font-mono text-[0.68rem] tracking-[0.04em] text-paper transition-colors hover:border-signal/50"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-[0.84rem] leading-relaxed text-dim">
                {group.description}
              </p>
            </div>
          ))}
        </div>

        {/* Curriculum Languages Grid */}
        <div className="mt-20 border-t border-line pt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-signal">
                Curriculum Languages & Systems
              </span>
              <h3 className="mt-1 text-xl font-medium text-paper">
                Languages Studied Across Practical Coursework
              </h3>
            </div>
            <span className="font-mono text-[0.64rem] tracking-[0.08em] text-dim">
              9 CORE LANGUAGES VERIFIED
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.languages.map((language) => (
              <div
                key={language.name}
                className="group flex items-start gap-4 rounded-xs border border-line/70 bg-panel/50 p-4 transition-all duration-200 hover:border-signal/40 hover:bg-panel"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xs border border-line bg-panel-raised p-2 transition-colors group-hover:border-signal/50">
                  <img
                    src={language.image}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-contain filter transition duration-200 group-hover:brightness-110"
                    width={24}
                    height={24}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-paper transition-colors group-hover:text-signal">
                      {language.name}
                    </span>
                    <span className="font-mono text-[0.58rem] tracking-[0.06em] text-dim">
                      {language.tag}
                    </span>
                  </div>
                  <span className="mt-0.5 block font-mono text-[0.6rem] uppercase tracking-[0.06em] text-signal/80">
                    {language.category}
                  </span>
                  <p className="mt-1.5 text-xs leading-relaxed text-dim">
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
