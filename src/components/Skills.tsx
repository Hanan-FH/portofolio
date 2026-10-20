import { portfolioData } from '../data/portfolio';
import { Section, SectionHeading } from './ui/Section';

export function Skills() {
  const { skills } = portfolioData;

  const skillGroups = [
    {
      id: 'frontend',
      category: 'Frontend development',
      description:
        'Building accessible, semantic, and responsive user interfaces with modern client frameworks.',
      items: skills.frontend,
    },
    {
      id: 'backend',
      category: 'Backend development',
      description:
        'Engineering server-side routing, RESTful APIs, OOP business logic, and backend runtime environments.',
      items: skills.backend,
    },
    {
      id: 'databases',
      category: 'Databases & query architecture',
      description:
        'Designing relational schemas, data normalization, indices, and performing structured SQL queries.',
      items: skills.database,
    },
    {
      id: 'tools',
      category: 'Tools & workflow',
      description:
        'Version control workflows, API debugging, command-line environments, and modular build tooling.',
      items: skills.tools,
    },
  ];

  return (
    <Section id="skills">
      <div className="container-site">
        <SectionHeading index="03" label="Technical stack" note="Core competencies" />

        <div className="mt-10 max-w-[44rem]">
          <h2 className="text-statement font-medium text-paper">
            Programming languages, web technologies, and developer tooling.
          </h2>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {skillGroups.map((group, index) => (
            <div key={group.id} className="border-t border-line pt-5">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[0.95rem] font-medium text-paper">{group.category}</h3>
                <span className="font-mono text-[0.62rem] tracking-[0.1em] text-dim">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-paper">
                {group.items.join(' · ')}
              </p>
              <p className="mt-3 text-[0.82rem] leading-relaxed text-dim">{group.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 border-t border-line pt-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <h3 className="meta-label">Languages studied</h3>
            <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-dim">
              Core languages covered across the curriculum and project work.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:col-span-8 lg:col-start-5">
            {skills.languages.map((language) => (
              <li key={language.name} className="group flex items-center gap-3" title={language.description}>
                <img
                  src={language.image}
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 opacity-55 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  width={16}
                  height={16}
                  loading="lazy"
                  decoding="async"
                />
                <span className="text-sm text-mist transition-colors duration-200 group-hover:text-paper">
                  {language.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default Skills;
