import { useId } from 'react';
import { type Project } from '../data/portfolio';
import { Modal } from './ui/Modal';
import { OptimizedPicture } from './ui/OptimizedPicture';
import { RollingText } from './ui/RollingText';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onStep?: (delta: -1 | 1) => void;
}

export function ProjectModal({ project, onClose, onStep }: ProjectModalProps) {
  const titleId = useId();

  if (!project) return null;

  const number = String(project.id).padStart(2, '0');

  return (
    <Modal open={Boolean(project)} onClose={onClose} labelledBy={titleId}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line-hairline)] px-6 py-4 pr-24">
        <div className="flex items-center gap-2.5">
          <span className="mono-index font-semibold text-[var(--accent-purple)]">{number}</span>
          <span aria-hidden="true" className="mono-index text-[var(--ink-muted)]">/</span>
          <span className="mono-index text-[var(--ink-primary)]">{project.category}</span>
        </div>
        <span className="mono-index text-[var(--ink-muted)]">{project.year}</span>
      </div>

      {project.image && (
        <div className="editorial-halftone relative aspect-video w-full overflow-hidden border-b border-[var(--line-hairline)] bg-[var(--bg-subtle)] p-4 sm:p-6">
          <OptimizedPicture
            src={project.image}
            alt={project.title}
            width={1280}
            height={720}
            eager
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <div className="p-6 sm:p-10">
        <h2 id={titleId} className="text-2xl uppercase leading-[0.98] tracking-[-0.03em] sm:text-3xl">
          {project.title}
        </h2>

        <p className="mt-4 text-base leading-[1.65] text-[var(--ink-secondary)]">
          {project.description}
        </p>

        {project.technologies.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2 border-t border-[var(--line-hairline)] pt-5">
            {project.technologies.map((tech) => (
              <span key={tech} className="editorial-pill">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line-hairline)] pt-6">
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-kinetic-ink"
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
            {project.image && (
              <a
                href={project.image}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-kinetic-outline"
              >
                <RollingText text="Full Resolution" />
                <span className="kinetic-arrow" aria-hidden="true">↗</span>
              </a>
            )}
          </div>

          {onStep && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Previous project"
                className="roll-trigger inline-flex h-10 items-center border border-[var(--line-hairline)] px-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] hover:border-[var(--line-strong)] cursor-pointer"
              >
                <RollingText text="← Prev" />
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Next project"
                className="roll-trigger inline-flex h-10 items-center border border-[var(--line-hairline)] px-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] hover:border-[var(--line-strong)] cursor-pointer"
              >
                <RollingText text="Next →" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ProjectModal;
