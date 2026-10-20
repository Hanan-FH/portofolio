import { useId } from 'react';
import { type Project } from '../data/portfolio';
import { Modal } from './ui/Modal';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const titleId = useId();

  if (!project) return null;

  const number = String(project.id).padStart(2, '0');

  return (
    <Modal onClose={onClose} labelledBy={titleId} className="sm:max-w-4xl">
      <div className="flex items-center justify-between gap-6 border-b border-line px-5 py-4 pr-16">
        <span className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-signal">
          Project {number}
        </span>
        <span className="truncate font-mono text-[0.6rem] uppercase tracking-[0.1em] text-dim">
          {project.category} · {project.year}
        </span>
      </div>

      {project.image && (
        <div className="border-b border-line bg-black/50 p-3 sm:p-4">
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            className="mx-auto max-h-[52vh] w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <div className="p-5 sm:p-8">
        <h2
          id={titleId}
          className="max-w-[30ch] text-2xl font-medium leading-[1.15] tracking-[-0.025em] text-paper sm:text-3xl"
        >
          {project.title}
        </h2>
        <p className="mt-4 max-w-[44rem] text-[0.92rem] leading-[1.75] text-mist">
          {project.description}
        </p>

        {project.technologies.length > 0 && (
          <div className="mt-7 border-t border-line pt-4">
            <p className="meta-label">Technologies</p>
            <p className="mt-2 font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.06em] text-mist">
              {project.technologies.join(' · ')}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid text-xs"
            >
              Repository
              <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid text-xs"
            >
              Live demo
              <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.image && (
            <a
              href={project.image}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-quiet text-xs"
            >
              Open full screenshot
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ProjectModal;
