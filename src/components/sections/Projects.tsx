import { useMemo, useState } from 'react';
import { portfolioData, type Project } from '../../data/portfolio';
import { OptimizedPicture } from '../ui/OptimizedPicture';

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
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [hasFiltered, setHasFiltered] = useState<boolean>(false);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ['ALL', ...unique];
  }, [projects]);

  const filteredProjects = useMemo(
    () =>
      activeCategory === 'ALL'
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory, projects]
  );

  const handleSelectCategory = (category: string) => {
    setHasFiltered(true);
    setActiveCategory(category);
  };

  return (
    <section
      id="projects"
      className="manga-chapter chapter-cut-top-alt relative z-[13] scroll-mt-12 bg-[#ECECF0] text-[#060608]"
    >
      {/* Back Layer: Halftone Screentone & Oversized Chapter Watermark */}
      <div aria-hidden="true" className="parallax-back pointer-events-none absolute inset-0 overflow-hidden">
        <div className="manga-halftone absolute inset-0 text-[#060608]" />
        <span className="absolute left-4 top-20 select-none font-display text-[clamp(9rem,22vw,19rem)] leading-none text-[#060608]/[0.04] sm:left-12">
          02
        </span>
      </div>

      {/* Front Layer: Vertical #584CE6 Accent Stamp */}
      <div
        aria-hidden="true"
        className="parallax-front pointer-events-none absolute right-3 top-36 z-20 hidden xl:block"
      >
        <span className="vertical-stamp font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#584CE6]">
          CH.02 // SELECTED WORKS ARCHIVE
        </span>
      </div>

      <div className="container-site relative z-10">
        {/* Chapter Masthead */}
        <div className="mb-12 sm:mb-16">
          <div className="parallax-front mb-4 inline-block">
            <span className="inline-block rotate-2 bg-[#060608] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#ECECF0]">
              <span className="text-[#584CE6]">CH.02</span> // WORKS
            </span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2
              data-cut
              className="parallax-mid text-[clamp(2.5rem,6.5vw,5.6rem)] uppercase tracking-[-0.035em] text-[#060608]"
            >
              <span className="line-mask">
                <span className="line-rise">SELECTED</span>
              </span>
              <span className="line-mask">
                <span className="line-rise" style={{ '--d': '60ms' } as React.CSSProperties}>
                  WORKS
                </span>
              </span>
            </h2>

            {/* Sharp Slashed Monospace Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="flex flex-wrap items-center gap-2"
            >
              {categories.map((category) => {
                const isSelected = activeCategory === category;
                const count =
                  category === 'ALL'
                    ? projects.length
                    : projects.filter((p) => p.category === category).length;

                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleSelectCategory(category)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] [clip-path:polygon(8px_0,100%_0,calc(100%-8px)_100%,0_100%)] cursor-pointer ${
                      isSelected
                        ? 'bg-[#584CE6] text-white'
                        : 'bg-[#060608]/[0.07] text-[#060608] hover:bg-[#060608] hover:text-[#ECECF0]'
                    }`}
                  >
                    <span>{category}</span>
                    <span className="opacity-70">/{String(count).padStart(2, '0')}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Staggered Asymmetric Manga Spreads (ZERO Boxy Rectangular Cards) */}
        <div className="space-y-20 sm:space-y-28">
          {filteredProjects.map((project, index) => {
            const number = String(project.id).padStart(2, '0');
            const dims = FRAME_DIMS[project.id] ?? { width: 1280, height: 720 };
            const reverse = index % 2 === 1;
            const wideLead = project.id === 3 && activeCategory === 'ALL';
            const panelClip = reverse
              ? '[clip-path:polygon(2.2%_2.5%,100%_0,98%_100%,0_97.5%)]'
              : '[clip-path:polygon(0_0,98.5%_2.5%,100%_97.5%,1.5%_100%)]';

            return (
              <article
                key={project.id}
                className="project-spread group grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
              >
                {/* Slanted Manga Panel Visual (.reveal-slice + .reveal-punch) */}
                <div
                  className={
                    reverse
                      ? 'lg:order-2 lg:col-span-7'
                      : wideLead
                        ? 'lg:col-span-8'
                        : 'lg:col-span-7'
                  }
                >
                  <button
                    type="button"
                    data-cut={hasFiltered ? undefined : ''}
                    onClick={() => onSelectProject(project)}
                    aria-label={`Open spread for ${project.title}`}
                    className={`block w-full text-left cursor-pointer ${hasFiltered ? 'is-cut-in' : ''}`}
                  >
                    <div className="reveal-slice">
                      <div
                        className={`relative aspect-video w-full overflow-hidden bg-[#060608] ${panelClip}`}
                      >
                        <div className="reveal-punch h-full w-full">
                          {dims.portrait ? (
                            <div className="relative flex h-full w-full items-center justify-center p-5 sm:p-8">
                              <div className="manga-halftone absolute inset-0 text-[#ECECF0]" aria-hidden="true" />
                              <OptimizedPicture
                                src={project.image}
                                alt={project.title}
                                width={dims.width}
                                height={dims.height}
                                pictureClassName="relative z-10 flex h-full items-center justify-center"
                                className="spread-img h-full w-auto object-contain"
                              />
                            </div>
                          ) : (
                            <OptimizedPicture
                              src={project.image}
                              alt={project.title}
                              width={dims.width}
                              height={dims.height}
                              className="spread-img h-full w-full object-cover object-top"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Unboxed Editorial Spread Copy */}
                <div
                  className={
                    reverse
                      ? 'lg:order-1 lg:col-span-5'
                      : wideLead
                        ? 'lg:col-span-4'
                        : 'lg:col-span-5'
                  }
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-5xl leading-none text-[#060608] group-hover:text-[#584CE6] sm:text-6xl">
                      {number}
                    </span>
                    <span className="mono-stamp text-[#584CE6]">//</span>
                    <span className="mono-stamp text-[#4E4E57]">
                      {project.category} · {project.year}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl uppercase leading-[0.98] tracking-[-0.03em] text-[#060608] sm:text-3xl">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="text-left hover:text-[#584CE6] cursor-pointer"
                    >
                      {project.title}
                    </button>
                  </h3>

                  <p className="mt-4 text-base leading-[1.65] text-[#4E4E57]">
                    {project.description}
                  </p>

                  {/* Unboxed Slash-Separated Tech Tags */}
                  <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-xs font-medium uppercase tracking-[0.06em] text-[#060608]">
                    {project.technologies.map((tech, idx) => (
                      <span key={tech} className="inline-flex items-center gap-2.5">
                        {idx > 0 && <span aria-hidden="true" className="text-[#584CE6]">/</span>}
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>

                  {/* Sharp Invert-Fill Action Links */}
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="btn-beat-dark"
                    >
                      <span>Inspect Spread</span>
                      <span className="beat-arrow" aria-hidden="true">→</span>
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-beat-ghost"
                      >
                        <span>Live Demo</span>
                        <span className="beat-arrow" aria-hidden="true">↗</span>
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-beat-ghost"
                      >
                        <span>GitHub</span>
                        <span className="beat-arrow" aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Projects;
