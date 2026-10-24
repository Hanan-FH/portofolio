import { portfolioData, type Project } from '../../data/portfolio';
import { MagneticTilt } from '../ui/MagneticTilt';
import { Section, SectionHeading } from '../ui/Section';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

const IMAGE_DIMENSIONS: Record<number, { width: number; height: number; portrait?: boolean }> = {
  1: { width: 1150, height: 655 },
  2: { width: 328, height: 459, portrait: true },
  3: { width: 1912, height: 983 },
};

export function Projects({ onSelectProject }: ProjectsProps) {
  const { projects } = portfolioData;

  return (
    <Section id="projects">
      <div className="container-site">
        <SectionHeading
          index="03"
          label="Selected Works Showcase"
          kanji="作品集"
          note={`0${projects.length} Widescreen Stills`}
        />

        <div className="mt-10 max-w-[46rem]">
          <h2 className="editorial-heading text-2xl font-semibold text-white sm:text-3xl lg:text-[2.2rem]">
            Software applications, simulations, and fullstack web architectures.
          </h2>
        </div>

        <div className="mt-14 space-y-16 lg:mt-16 lg:space-y-24">
          {projects.map((project, index) => {
            const number = String(index + 1).padStart(2, '0');
            const dims = IMAGE_DIMENSIONS[project.id] ?? { width: 1280, height: 720 };
            const isReversed = index % 2 === 1;

            return (
              <article
                key={project.id}
                className="crepuscular-card group overflow-hidden rounded-3xl p-5 sm:p-8 lg:p-10"
              >
                {/* Top Astronomical Film Frame Metadata Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.26em] text-amber-200">
                      REEL // {number}
                    </span>
                    <span aria-hidden="true" className="h-3 w-px bg-white/20" />
                    <span className="font-mono text-xs uppercase tracking-[0.22em] text-pink-300/90">
                      {project.category}
                    </span>
                  </div>

                  <span className="twilight-badge rounded-full px-3 py-0.5 font-mono text-xs tracking-[0.18em] text-sky-200">
                    {project.year}
                  </span>
                </div>

                <div className="mt-8 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
                  {/* 16:9 Widescreen Film Still Viewport */}
                  <div className={isReversed ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7'}>
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      aria-label={`Inspect widescreen view for ${project.title}`}
                      className="group/still block w-full rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      <MagneticTilt maxTilt={2.5}>
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-[#060919] shadow-[0_20px_50px_rgba(7,10,24,0.85)]">
                          {dims.portrait ? (
                            /* Portrait desktop GUI centered cleanly inside 16:9 cinematic frame */
                            <div
                              className="flex h-full w-full items-center justify-center p-4 sm:p-6"
                              style={{
                                background:
                                  'radial-gradient(circle at 50% 45%, rgba(56, 189, 248, 0.14) 0%, rgba(82, 25, 79, 0.22) 48%, #060919 100%)',
                              }}
                            >
                              <img
                                src={project.image}
                                alt={project.title}
                                width={dims.width}
                                height={dims.height}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-auto rounded-lg border border-white/20 object-contain shadow-[0_16px_40px_rgba(0,0,0,0.75)] transition-transform duration-500 group-hover/still:scale-[1.03]"
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
                              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover/still:scale-[1.025]"
                            />
                          )}

                          {/* Atmospheric Katawaredoki Depth Vignette (Clears Smoothly on Hover) */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 transition-opacity duration-300 group-hover/still:opacity-0"
                            style={{
                              background:
                                'linear-gradient(180deg, rgba(14, 20, 51, 0.22) 0%, rgba(46, 24, 71, 0.14) 55%, rgba(7, 10, 24, 0.52) 100%)',
                            }}
                          />

                          {/* Crepuscular Inner Rim Highlight */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-amber-200/20 group-hover/still:ring-sky-300/45"
                          />

                          {/* Film Frame Corner Tag */}
                          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/20 bg-[#070a18]/80 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-sky-200 backdrop-blur-md transition-opacity duration-200 group-hover/still:border-amber-200/60 group-hover/still:text-amber-200">
                            16:9 Still · Click to Inspect ↗
                          </span>
                        </div>
                      </MagneticTilt>
                    </button>
                  </div>

                  {/* Editorial Narrative, Verbatim Copy, Tech Stack & Links */}
                  <div className={isReversed ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5'}>
                    <h3 className="editorial-heading text-2xl font-semibold text-white sm:text-[1.75rem]">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="rounded text-left transition-colors duration-200 hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                      >
                        {project.title}
                      </button>
                    </h3>

                    <p className="mt-4 text-[0.96rem] leading-[1.8] text-slate-200/90">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="twilight-badge rounded-full px-3 py-1 font-mono text-xs text-slate-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-3.5">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="btn-comet text-xs"
                      >
                        <span>Inspect Film Dossier</span>
                        <span className="link-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-twilight text-xs"
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
                          className="btn-twilight text-xs"
                        >
                          <span>GitHub Repo</span>
                          <span className="link-arrow" aria-hidden="true">
                            ↗
                          </span>
                        </a>
                      )}
                    </div>
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
