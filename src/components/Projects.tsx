import { portfolioData, type Project } from '../data/portfolio';
import { Section, SectionHeading } from './ui/Section';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

const PROJECT_LAYOUT = [
  { copy: 'lg:col-span-4', media: 'lg:col-span-7 lg:col-start-6' },
  { copy: 'lg:col-span-5', media: 'lg:col-span-4 lg:col-start-9' },
  { copy: 'lg:col-span-4', media: 'lg:col-span-8 lg:col-start-5' },
];

const IMAGE_DIMENSIONS: Record<number, { width: number; height: number }> = {
  1: { width: 1150, height: 655 },
  2: { width: 328, height: 459 },
  3: { width: 1912, height: 983 },
};

export function Projects({ onSelectProject }: ProjectsProps) {
  const { projects } = portfolioData;

  return (
    <Section id="projects">
      <div className="container-site">
        <SectionHeading index="02" label="Selected work" note="03 projects" />

        <div className="mt-10 max-w-[44rem]">
          <h2 className="text-statement font-medium text-paper">
            Software applications and technical prototypes.
          </h2>
        </div>

        <div className="mt-16 flex flex-col gap-20 lg:mt-20 lg:gap-28">
          {projects.map((project, index) => {
            const number = String(index + 1).padStart(2, '0');
            const layout = PROJECT_LAYOUT[index] ?? PROJECT_LAYOUT[0];
            const dimensions = IMAGE_DIMENSIONS[project.id] ?? { width: 1200, height: 800 };

            return (
              <article key={project.id} className="border-t border-line pt-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[0.68rem] tracking-[0.12em] text-signal">
                      {number}
                    </span>
                    <span className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-dim">
                      {project.category}
                    </span>
                  </div>
                  <span className="font-mono text-[0.64rem] tracking-[0.08em] text-dim">
                    {project.year}
                  </span>
                </div>

                <div className="mt-7 grid gap-10 lg:grid-cols-12 lg:gap-8">
                  <div className={`${layout.copy} flex flex-col justify-center`}>
                    <h3 className="text-[1.55rem] font-medium leading-[1.15] tracking-[-0.025em] text-paper sm:text-[1.75rem]">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="text-left transition-colors duration-200 hover:text-signal"
                      >
                        {project.title}
                      </button>
                    </h3>

                    <p className="mt-4 max-w-[34rem] text-[0.95rem] leading-[1.75] text-mist">
                      {project.description}
                    </p>

                    <p className="mt-5 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.06em] text-dim">
                      {project.technologies.join(' · ')}
                    </p>

                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="btn-quiet mt-7 w-fit text-[0.82rem]"
                    >
                      View project file
                      <span className="link-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </button>
                  </div>

                  <div
                    className={`${layout.media} ${
                      index === 1 ? 'mx-auto w-full max-w-[22rem] lg:mx-0 lg:max-w-none' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      aria-label={`Open project file for ${project.title}`}
                      className="group/media block w-full text-left"
                    >
                      <span className="block overflow-hidden border border-line bg-panel transition-colors duration-300 group-hover/media:border-line-strong">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={`Screenshot of ${project.title}`}
                            className="h-auto w-full transition-transform duration-500 ease-fluid group-hover/media:scale-[1.008]"
                            width={dimensions.width}
                            height={dimensions.height}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <span className="flex aspect-[16/10] items-center justify-center font-mono text-[0.68rem] uppercase tracking-[0.1em] text-dim">
                            Preview pending
                          </span>
                        )}
                      </span>
                      <span className="mt-3 flex items-center justify-between gap-4">
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-dim">
                          Project screenshot
                        </span>
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-dim transition-colors duration-200 group-hover/media:text-signal">
                          Open full view ↗
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export default Projects;
