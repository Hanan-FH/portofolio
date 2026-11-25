import { useMemo, useState } from 'react';
import { portfolioData, type Project } from '../../data/portfolio';
import { OptimizedPicture } from '../ui/OptimizedPicture';
import { RollingText } from '../ui/RollingText';
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
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [hasInteractedFilter, setHasInteractedFilter] = useState<boolean>(false);

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
    setHasInteractedFilter(true);
    setActiveCategory(category);
  };

  return (
    <Section id="projects">
      <div className="container-site">
        <SectionHeading
          index="02"
          label="PROJECTS"
          title="Selected Works"
          note={`0${projects.length} ARCHIVED WORKS`}
        />

        {/* Minimalist Hairline Category Filter Bar */}
        <div
          data-reveal="up"
          role="tablist"
          aria-label="Filter projects by category"
          className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-[var(--line-hairline)] pb-4"
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
                className={`roll-trigger relative inline-flex items-center gap-2 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.1em] cursor-pointer ${
                  isSelected
                    ? 'font-semibold text-[var(--ink-primary)]'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
                }`}
              >
                <RollingText text={category} />
                <span className={isSelected ? 'text-[var(--accent-purple)]' : 'opacity-60'}>
                  [{String(count).padStart(2, '0')}]
                </span>
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-[17px] left-0 h-[2px] w-full origin-left bg-[var(--accent-purple)] transition-transform duration-300 ${
                    isSelected ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Open Architectural Showcase Rows (1px Hairlines, Zero Clunky Drop Shadows) */}
        <div className="divide-y divide-[var(--line-hairline)] border-b border-[var(--line-hairline)]">
          {filteredProjects.map((project, index) => {
            const number = String(project.id).padStart(2, '0');
            const dims = FRAME_DIMS[project.id] ?? { width: 1280, height: 720 };
            const reverse = index % 2 === 1;

            return (
              <article
                key={project.id}
                data-reveal={hasInteractedFilter ? undefined : 'wipe'}
                style={
                  hasInteractedFilter
                    ? undefined
                    : ({ '--delay': `${index * 90}ms` } as React.CSSProperties)
                }
                className="project-card group grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-12 lg:gap-14"
              >
                {/* Framed 16:9 Editorial Viewport with Corner Crop-Marks & Hover Scale */}
                <div className={reverse ? 'lg:order-2 lg:col-span-7' : 'lg:col-span-7'}>
                  <button
                    type="button"
                    data-cursor="VIEW"
                    onClick={() => onSelectProject(project)}
                    aria-label={`Inspect ${project.title}`}
                    className="relative block w-full text-left cursor-pointer"
                  >
                    <div className="editorial-halftone relative aspect-video w-full overflow-hidden border border-[var(--line-hairline)] bg-[var(--bg-surface)]">
                      {dims.portrait ? (
                        <div className="flex h-full w-full items-center justify-center p-5 sm:p-8">
                          <OptimizedPicture
                            src={project.image}
                            alt={project.title}
                            width={dims.width}
                            height={dims.height}
                            pictureClassName="flex h-full items-center justify-center"
                            className="project-thumb h-full w-auto border border-[var(--line-hairline)] object-contain"
                          />
                        </div>
                      ) : (
                        <OptimizedPicture
                          src={project.image}
                          alt={project.title}
                          width={dims.width}
                          height={dims.height}
                          className="project-thumb h-full w-full object-cover object-top"
                        />
                      )}

                      {/* Sharp Corner Brackets Snapping Into View on Hover */}
                      <span aria-hidden="true" className="crop-corner crop-tl" />
                      <span aria-hidden="true" className="crop-corner crop-tr" />
                      <span aria-hidden="true" className="crop-corner crop-bl" />
                      <span aria-hidden="true" className="crop-corner crop-br" />
                    </div>
                  </button>
                </div>

                {/* Editorial Specification Column */}
                <div className={reverse ? 'lg:order-1 lg:col-span-5' : 'lg:col-span-5'}>
                  <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line-hairline)] pb-4">
                    <span className="font-display text-3xl leading-none text-[var(--ink-primary)] group-hover:text-[var(--accent-purple)] sm:text-4xl">
                      {number}
                    </span>
                    <span className="mono-index text-[var(--ink-muted)]">
                      {project.category} / {project.year}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl uppercase leading-[1.02] tracking-[-0.03em] sm:text-3xl">
                    <button
                      type="button"
                      data-cursor="VIEW"
                      onClick={() => onSelectProject(project)}
                      className="text-left transition-opacity hover:opacity-80 cursor-pointer"
                    >
                      {project.title}
                    </button>
                  </h3>

                  <p className="mt-4 text-base leading-[1.65] text-[var(--ink-secondary)]">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="editorial-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="btn-kinetic-ink"
                    >
                      <RollingText text="View Case" />
                      <span className="kinetic-arrow" aria-hidden="true">→</span>
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-kinetic-outline"
                      >
                        <RollingText text="Live Demo" />
                        <span className="kinetic-arrow" aria-hidden="true">↗</span>
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-kinetic-outline"
                      >
                        <RollingText text="GitHub" />
                        <span className="kinetic-arrow" aria-hidden="true">↗</span>
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
