import { portfolioData, type Project } from '../../data/portfolio';
import { Section, SectionHeading } from '../ui/Section';
import { MagneticTilt } from '../ui/MagneticTilt';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

const RUNTIME_SPECS: Record<
  number,
  { title: string; meta: string; executionType: string; status: string }
> = {
  1: {
    title: 'godot-runtime // mini-shop-v1.0.pck [2D Viewport]',
    meta: 'GDScript · 60 FPS · 2D Engine',
    executionType: 'GAME SIMULATOR',
    status: 'ACTIVE BUILD',
  },
  2: {
    title: 'python3 calc.py --framework=tkinter --strict-eval',
    meta: 'Python 3.12 · Tkinter GUI · OOP',
    executionType: 'DESKTOP APPLICATION',
    status: 'STANDALONE GUI',
  },
  3: {
    title: 'http://localhost/sipandu/admin/dashboard.php [200 OK]',
    meta: 'PHP 8.2 · MySQL · CRUD Engine',
    executionType: 'FULLSTACK PORTAL',
    status: 'DATABASE CONNECTED',
  },
};

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
            const runtime = RUNTIME_SPECS[project.id] ?? {
              title: `${project.title} // runtime`,
              meta: project.technologies.slice(0, 2).join(' · '),
              executionType: project.category,
              status: 'READY',
            };
            const dimensions = IMAGE_DIMENSIONS[project.id] ?? { width: 1200, height: 800 };

            return (
              <article key={project.id} className="border-t border-line pt-7">
                {/* Meta registry bar */}
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[0.68rem] font-bold tracking-[0.14em] text-signal">
                      PRJ-{number}
                    </span>
                    <span aria-hidden="true" className="h-2.5 w-px bg-line-strong" />
                    <span className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-dim">
                      {runtime.executionType}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[0.62rem] text-dim">
                    <span className="hidden sm:inline-block text-signal/80">● {runtime.status}</span>
                    <span aria-hidden="true" className="hidden sm:inline h-2 w-px bg-line" />
                    <span>{project.year}</span>
                  </div>
                </div>

                <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
                  {/* Left Column: Description & Metadata */}
                  <div className="flex flex-col justify-center lg:col-span-5">
                    <h3 className="text-[1.55rem] font-medium leading-[1.18] tracking-[-0.025em] text-paper sm:text-[1.8rem]">
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

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-xs border border-line bg-panel-raised px-2.5 py-1 font-mono text-[0.64rem] tracking-[0.04em] text-mist transition-colors hover:border-signal/40 hover:text-paper"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex items-center gap-6">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="btn-quiet text-[0.82rem]"
                      >
                        Inspect project dossier
                        <span className="link-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Distinctive Software Execution Viewport */}
                  <div className="lg:col-span-7">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      aria-label={`Open project file for ${project.title}`}
                      className="group/media block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                    >
                      <MagneticTilt
                        maxTilt={3}
                        enableGlow={true}
                        className="overflow-hidden rounded-xs border border-line bg-panel transition-all duration-300 group-hover/media:border-signal/50"
                      >
                        {/* Realistic Software Window Chrome Header */}
                        <div className="flex items-center justify-between border-b border-line/80 bg-panel-raised/90 px-3.5 py-2.5 backdrop-blur-md">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-white/25 transition-colors group-hover/media:bg-signal/80" />
                            <span className="h-2 w-2 rounded-full bg-white/15" />
                            <span className="h-2 w-2 rounded-full bg-white/15" />
                            <span className="ml-2 font-mono text-[0.62rem] tracking-[0.06em] text-dim transition-colors group-hover/media:text-mist">
                              {runtime.title}
                            </span>
                          </div>
                          <span className="hidden font-mono text-[0.58rem] tracking-[0.06em] text-dim/75 sm:block">
                            {runtime.meta}
                          </span>
                        </div>

                        {/* Staged Screenshot Canvas */}
                        {project.image ? (
                          index === 1 ? (
                            /* Project 2: Tailored Python Desktop Application Workbench */
                            <div className="grid bg-[#07080a] p-5 sm:grid-cols-12 sm:items-center sm:gap-6 sm:p-7">
                              <div className="mx-auto flex justify-center sm:col-span-6">
                                <div className="overflow-hidden rounded-xs border border-line/90 bg-black shadow-[0_12px_28px_rgba(0,0,0,0.6)]">
                                  <img
                                    src={project.image}
                                    alt={`Screenshot of ${project.title}`}
                                    className="h-auto max-h-[340px] w-auto object-contain transition-transform duration-500 ease-fluid group-hover/media:scale-[1.02]"
                                    width={dimensions.width}
                                    height={dimensions.height}
                                    loading="lazy"
                                    decoding="async"
                                  />
                                </div>
                              </div>
                              <div className="mt-5 border-t border-line/60 pt-4 sm:col-span-6 sm:mt-0 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                                <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-signal">
                                  Application Architecture
                                </span>
                                <ul className="mt-3 space-y-2 font-mono text-[0.66rem] text-mist">
                                  <li className="flex items-start gap-2">
                                    <span className="text-signal">›</span>
                                    <span>Tkinter Native Frame & Button Matrix</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-signal">›</span>
                                    <span>Real-time decimal buffer & operator state</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-signal">›</span>
                                    <span>Safe string evaluation & error recovery</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="text-signal">›</span>
                                    <span>Cross-platform Windows & Linux runtime</span>
                                  </li>
                                </ul>
                                <span className="mt-4 block font-mono text-[0.58rem] uppercase tracking-[0.08em] text-dim">
                                  Native Compact Resolution: 328 × 459 px
                                </span>
                              </div>
                            </div>
                          ) : (
                            /* Project 1 & 3: Wide Full Viewport Display */
                            <div className="overflow-hidden bg-black">
                              <img
                                src={project.image}
                                alt={`Screenshot of ${project.title}`}
                                className="h-auto w-full object-cover transition-transform duration-500 ease-fluid group-hover/media:scale-[1.012]"
                                width={dimensions.width}
                                height={dimensions.height}
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                          )
                        ) : (
                          <span className="flex aspect-[16/10] items-center justify-center font-mono text-[0.68rem] uppercase tracking-[0.1em] text-dim">
                            Preview pending
                          </span>
                        )}
                      </MagneticTilt>

                      <div className="mt-3 flex items-center justify-between gap-4 font-mono text-[0.62rem] tracking-[0.1em] text-dim">
                        <span>PRJ // {project.technologies.slice(0, 3).join(' · ')}</span>
                        <span className="transition-colors duration-200 group-hover/media:text-signal">
                          Click to inspect full view ↗
                        </span>
                      </div>
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
