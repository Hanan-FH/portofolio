import { useMemo, useState } from 'react';
import { portfolioData, type Project } from '../../data/portfolio';
import { OptimizedPicture } from '../ui/OptimizedPicture';
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

  return (
    <Section id="projects">
      <div className="container-site">
        <SectionHeading
          index="02"
          label="PROJECTS"
          title="Selected Works"
          note={`0${projects.length} ARCHIVED WORKS`}
        />

        {/* Sharp Monospace Category Filter Tabs */}
        <div
          data-reveal
          role="tablist"
          aria-label="Filter projects by category"
          className="mb-8 flex flex-wrap items-center gap-2"
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
                onClick={() => setActiveCategory(category)}
                className={`inline-flex min-h-9 items-center gap-2 border-[1.5px] border-[var(--border-strong)] px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.08em] cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--bg-inverted)] text-[var(--bg-primary)]'
                    : 'bg-[var(--bg-surface)] text-[var(--ink-primary)] hover:bg-[var(--ink-primary)] hover:text-[var(--bg-primary)]'
                }`}
              >
                <span>{category}</span>
                <span className="opacity-65">[{String(count).padStart(2, '0')}]</span>
              </button>
            );
          })}
        </div>

        {/* Asymmetrical Manga-Panel Editorial Grid */}
        <div data-reveal className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {filteredProjects.map((project) => {
            const number = String(project.id).padStart(2, '0');
            const dims = FRAME_DIMS[project.id] ?? { width: 1280, height: 720 };
            const isWideSpread = activeCategory !== 'ALL' || project.id === 3;
            const colSpanClass = isWideSpread
              ? 'lg:col-span-12'
              : project.id === 1
                ? 'lg:col-span-7'
                : 'lg:col-span-5';

            return (
              <article
                key={project.id}
                className={`manga-card-interactive group flex flex-col justify-between overflow-hidden ${colSpanClass}`}
              >
                {/* Manga Panel Index Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-[1.5px] border-[var(--border-strong)] bg-[var(--bg-primary)] px-4 py-2.5 sm:px-5">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex bg-[var(--bg-inverted)] px-2 py-0.5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--bg-primary)]">
                      {number}
                    </span>
                    <span className="mono-label text-[var(--ink-primary)]">
                      {project.category}
                    </span>
                  </div>
                  <span className="mono-label text-[var(--ink-muted)]">{project.year}</span>
                </div>

                <div
                  className={
                    isWideSpread
                      ? 'grid flex-1 lg:grid-cols-12'
                      : 'flex flex-1 flex-col justify-between'
                  }
                >
                  {/* Framed Thumbnail Viewport */}
                  <div
                    className={
                      isWideSpread
                        ? 'border-b-[1.5px] border-[var(--border-strong)] lg:col-span-7 lg:border-b-0 lg:border-r-[1.5px]'
                        : 'border-b-[1.5px] border-[var(--border-strong)]'
                    }
                  >
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      aria-label={`Open preview for ${project.title}`}
                      className="block h-full w-full text-left cursor-pointer"
                    >
                      <div className="halftone-surface relative aspect-video w-full overflow-hidden bg-[var(--bg-subtle)]">
                        {dims.portrait ? (
                          <div className="flex h-full w-full items-center justify-center p-4 sm:p-6">
                            <OptimizedPicture
                              src={project.image}
                              alt={project.title}
                              width={dims.width}
                              height={dims.height}
                              pictureClassName="flex h-full items-center justify-center"
                              className="editorial-media h-full w-auto border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-surface)] object-contain shadow-[4px_4px_0px_var(--border-strong)]"
                            />
                          </div>
                        ) : (
                          <OptimizedPicture
                            src={project.image}
                            alt={project.title}
                            width={dims.width}
                            height={dims.height}
                            className="editorial-media h-full w-full object-cover object-top"
                          />
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Project Copy, Monospace Tech Stack Pills & Crisp Action Links */}
                  <div
                    className={`flex flex-col justify-between p-5 sm:p-6 ${
                      isWideSpread ? 'lg:col-span-5 lg:p-8' : 'flex-1'
                    }`}
                  >
                    <div>
                      <h3 className="display-card text-xl sm:text-2xl">
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className="text-left hover:underline underline-offset-4 cursor-pointer"
                        >
                          {project.title}
                        </button>
                      </h3>

                      <p className="mt-3.5 text-sm leading-[1.65] text-[var(--ink-secondary)] sm:text-base">
                        {project.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="mono-pill">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-4">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="btn-ink"
                      >
                        <span>Details</span>
                        <span className="btn-arrow" aria-hidden="true">
                          →
                        </span>
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-paper"
                        >
                          <span>Live Demo</span>
                          <span className="btn-arrow" aria-hidden="true">
                            ↗
                          </span>
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-paper"
                        >
                          <span>GitHub</span>
                          <span className="btn-arrow" aria-hidden="true">
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
