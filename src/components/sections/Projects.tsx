import { portfolioData, type Project } from '../../data/portfolio';
import { MagneticTilt } from '../ui/MagneticTilt';
import { Section, SectionHeading } from '../ui/Section';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

const FRAME_DIMS: Record<number, { width: number; height: number; portrait?: boolean }> = {
  1: { width: 1150, height: 655 },
  2: { width: 328, height: 459, portrait: true },
  3: { width: 1912, height: 983 },
};

export function Projects({ onSelectProject }: ProjectsProps) {
  const { projects } = portfolioData;

  return (
    <Section id="projects" verticalLabel="作品集">
      <div className="container-site">
        <SectionHeading
          index="03"
          label="Selected Works Showcase"
          kanji="作品集"
          note={`0${projects.length} Widescreen Viewports`}
        />

        <div className="mt-12 divide-y divide-white/10">
          {projects.map((project, index) => {
            const number = String(index + 1).padStart(2, '0');
            const dims = FRAME_DIMS[project.id] ?? { width: 1280, height: 720 };
            const reverse = index % 2 === 1;

            return (
              <article
                key={project.id}
                className="grid items-center gap-8 py-12 first:pt-2 last:pb-0 lg:grid-cols-12 lg:gap-12 lg:py-16"
              >
                {/* 16:9 Cinematic Widescreen Viewport */}
                <div className={reverse ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7'}>
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    aria-label={`Inspect ${project.title}`}
                    className="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <MagneticTilt maxTilt={2.5}>
                      <div className="rim-horizon-panel overflow-hidden p-1.5">
                        <div className="relative aspect-video w-full overflow-hidden bg-[#050714]">
                          {dims.portrait ? (
                            <div
                              className="flex h-full w-full items-center justify-center p-4 sm:p-6"
                              style={{
                                background:
                                  'radial-gradient(circle at 50% 65%, rgba(124, 18, 74, 0.32) 0%, rgba(13, 19, 56, 0.45) 55%, #050714 100%)',
                              }}
                            >
                              <img
                                src={project.image}
                                alt={project.title}
                                width={dims.width}
                                height={dims.height}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-auto border border-white/15 object-contain shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
                              />
                            </div>
                          ) : (
                            <img
                              src={project.image}
                              alt={project.title}
                              width={dims.width}
                              height={dims.height}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
                            />
                          )}

                          {/* Atmospheric Depth Gradient that Recedes on Hover */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                            style={{
                              background:
                                'linear-gradient(180deg, rgba(13, 19, 56, 0.24) 0%, rgba(38, 20, 66, 0.16) 55%, rgba(5, 7, 20, 0.56) 100%)',
                            }}
                          />
                        </div>
                      </div>
                    </MagneticTilt>
                  </button>
                </div>

                {/* Editorial Details: Exact Title, Untouched Description & Links */}
                <div className={reverse ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5'}>
                  <div className="flex items-center gap-3">
                    <span className="astro-coord">REEL // {number}</span>
                    <span aria-hidden="true" className="h-2.5 w-px bg-white/20" />
                    <span className="astro-telemetry">
                      {project.category} · {project.year}
                    </span>
                  </div>

                  <h2 className="mincho-sub mt-3 text-xl text-white sm:text-2xl">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="text-left transition-opacity hover:text-amber-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      {project.title}
                    </button>
                  </h2>

                  <p className="mt-4 text-sm leading-[1.78] text-slate-200/90">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="twilight-chip px-2.5 py-1 font-mono text-[11px] text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="btn-crepuscular"
                    >
                      <span>Inspect Still</span>
                      <span className="link-arrow text-amber-200" aria-hidden="true">
                        ↗
                      </span>
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-tiamat"
                      >
                        <span>Live Demo</span>
                        <span className="link-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-crepuscular"
                      >
                        <span>GitHub</span>
                        <span className="link-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    )}
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
