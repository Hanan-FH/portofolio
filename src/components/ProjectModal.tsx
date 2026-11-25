import { useId } from 'react';
import { type Project } from '../data/portfolio';
import { Modal } from './ui/Modal';
import { OptimizedPicture } from './ui/OptimizedPicture';

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
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-[var(--border-strong)] bg-[var(--bg-primary)] px-5 py-3.5 pr-24">
        <span className="inline-flex bg-[var(--bg-inverted)] px-2 py-0.5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--bg-primary)]">
          PANEL {number}
        </span>
        <span className="mono-label text-[var(--ink-secondary)]">
          {project.category} // {project.year}
        </span>
      </div>

      {project.image && (
        <div className="halftone-surface relative aspect-video w-full overflow-hidden border-b-[1.5px] border-[var(--border-strong)] bg-[var(--bg-subtle)] p-4 sm:p-6">
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

      <div className="p-6 sm:p-8">
        <h2 id={titleId} className="display-card text-2xl sm:text-3xl">
          {project.title}
        </h2>

        <p className="mt-4 text-base leading-[1.65] text-[var(--ink-secondary)]">
          {project.description}
        </p>

        {project.technologies.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2 border-t border-[var(--border-subtle)] pt-5">
            {project.technologies.map((tech) => (
              <span key={tech} className="mono-pill">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t-[1.5px] border-[var(--border-strong)] pt-5">
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink"
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
            {project.image && (
              <a
                href={project.image}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-paper"
              >
                <span>Open Full Image</span>
                <span className="btn-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            )}
          </div>

          {onStep && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Previous project"
                className="inline-flex h-10 items-center border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-primary)] px-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] hover:bg-[var(--bg-inverted)] hover:text-[var(--bg-primary)]"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Next project"
                className="inline-flex h-10 items-center border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-primary)] px-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] hover:bg-[var(--bg-inverted)] hover:text-[var(--bg-primary)]"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ProjectModal;
