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
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECECF0]/15 px-6 py-4 pr-24">
        <div className="flex items-center gap-2.5">
          <span className="inline-block bg-[#584CE6] px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-white [clip-path:polygon(4px_0,100%_0,calc(100%-4px)_100%,0_100%)]">
            SPREAD {number}
          </span>
          <span className="mono-stamp text-[#ECECF0]">{project.category}</span>
        </div>
        <span className="mono-stamp text-[#A6A6B2]">{project.year}</span>
      </div>

      {project.image && (
        <div className="relative aspect-video w-full overflow-hidden border-b border-[#ECECF0]/15 bg-[#101015] p-4 sm:p-6">
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
        <h2 id={titleId} className="text-2xl uppercase leading-[0.96] tracking-[-0.03em] text-[#ECECF0] sm:text-3xl">
          {project.title}
        </h2>

        <p className="mt-4 text-base leading-[1.65] text-[#A6A6B2]">
          {project.description}
        </p>

        {project.technologies.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[#ECECF0]/15 pt-5 font-mono text-xs uppercase tracking-[0.06em] text-[#ECECF0]">
            {project.technologies.map((tech, idx) => (
              <span key={tech} className="inline-flex items-center gap-3">
                {idx > 0 && <span aria-hidden="true" className="text-[#584CE6]">/</span>}
                <span>{tech}</span>
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#ECECF0]/15 pt-6">
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-beat-light"
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
                className="btn-beat-light"
              >
                <span>GitHub</span>
                <span className="beat-arrow" aria-hidden="true">↗</span>
              </a>
            )}
            {project.image && (
              <a
                href={project.image}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-beat-light"
              >
                <span>Full Image</span>
                <span className="beat-arrow" aria-hidden="true">↗</span>
              </a>
            )}
          </div>

          {onStep && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Previous project"
                className="inline-flex h-10 items-center border border-[#ECECF0]/25 px-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#ECECF0] hover:bg-[#584CE6] hover:border-[#584CE6] cursor-pointer"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Next project"
                className="inline-flex h-10 items-center border border-[#ECECF0]/25 px-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#ECECF0] hover:bg-[#584CE6] hover:border-[#584CE6] cursor-pointer"
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
