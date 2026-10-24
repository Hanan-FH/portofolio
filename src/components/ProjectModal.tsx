import { useId } from 'react';
import { type Project } from '../data/portfolio';
import { Modal } from './ui/Modal';
import { OptimizedPicture } from './ui/OptimizedPicture';

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
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 pr-16">
        <span className="astro-coord">PRJ // {number}</span>
        <span className="astro-telemetry">
          {project.category} · {project.year}
        </span>
      </div>

      {project.image && (
        <div className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-[#050714]">
          <OptimizedPicture
            src={project.image}
            alt={project.title}
            eager
            className="h-full w-full object-contain p-3 sm:p-5"
          />
        </div>
      )}

      <div className="p-6 sm:p-8">
        <h2 id={titleId} className="mincho-sub text-xl text-white sm:text-2xl">
          {project.title}
        </h2>

        <p className="mt-4 max-w-[46rem] text-sm leading-relaxed text-slate-200/90">
          {project.description}
        </p>

        {project.technologies.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="twilight-chip px-2.5 py-1 font-mono text-[11px] tracking-[0.06em] text-sky-100"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-3.5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tiamat"
            >
              Live Demo
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
              GitHub
              <span className="link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          )}
          {project.image && (
            <a
              href={project.image}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-crepuscular"
            >
              Original Frame
              <span className="link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ProjectModal;
