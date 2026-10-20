import { portfolioData, type Project } from '../data/portfolio';
import { Section, SectionHeading } from './ui/Section';
import { MagneticTilt } from './ui/MagneticTilt';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

const PROJECT_LAYOUT = [
  { copy: 'lg:col-span-5', media: 'lg:col-span-7' },
  { copy: 'lg:col-span-6', media: 'lg:col-span-5 lg:col-start-8' },
  { copy: 'lg:col-span-5', media: 'lg:col-span-7' },
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

        <div className="mt-16 flex flex-col gap-24 lg:mt-20 lg:gap-32">
          {projects.map((project, index) => {
            const number = String(index + 1).padStart(2, '0');
            const layout = PROJECT_LAYOUT[index] ?? PROJECT_LAYOUT[0];
            const dimensions = IMAGE_DIMENSIONS[project.id] ?? { width: 1200, height: 800 };

            return (
              <article key={project.id} className="border-t border-line pt-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[0.68rem] font-semibold tracking-[0.12em] text-signal">
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

                <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
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

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-xs border border-line bg-panel-raised px-2.5 py-1 font-mono text-[0.65rem] tracking-[0.04em] text-mist"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="btn-quiet mt-8 w-fit text-[0.82rem]"
                    >
                      View project file
                      <span className="link-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </button>
                  </div>

                  <div
                    className={`${layout.media} ${
                      index === 1 ? 'mx-auto w-full max-w-[20rem] lg:mx-0 lg:max-w-none' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      aria-label={`Open project file for ${project.title}`}
                      className="group/media block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                    >
                      <MagneticTilt
                        maxTilt={3.5}
                        enableGlow={true}
                        className="overflow-hidden border border-line bg-panel transition-colors duration-300 group-hover/media:border-signal/45"
                      >
                        {project.image ? (
                          <div
                            className={
                              index === 1
                                ? 'flex items-center justify-center bg-black/40 p-4'
                                : ''
                            }
                          >
                            <img
                              src={project.image}
                              alt={`Screenshot of ${project.title}`}
                              className={`h-auto transition-transform duration-500 ease-fluid group-hover/media:scale-[1.01] ${
                                index === 1
                                  ? 'max-h-[380px] w-auto rounded-xs object-contain shadow-md'
                                  : 'w-full object-cover'
                              }`}
                              width={dimensions.width}
                              height={dimensions.height}
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        ) : (
                          <span className="flex aspect-[16/10] items-center justify-center font-mono text-[0.68rem] uppercase tracking-[0.1em] text-dim">
                            Preview pending
                          </span>
                        )}
                      </MagneticTilt>
                      <span className="mt-3 flex items-center justify-between gap-4">
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-dim">
                          Project screenshot
                        </span>
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-dim transition-colors duration-200 group-hover/media:text-signal">
                          Open full inspection ↗
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
