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
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 pr-16">
        <span className="astro-label">Film Still // PRJ-{number}</span>
        <span className="truncate font-mono text-[0.68rem] uppercase tracking-[0.2em] text-sky-200/80">
          {project.category} · {project.year}
        </span>
      </div>

      {project.image && (
        <div className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-[#050816]">
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            className="h-full w-full object-contain p-2 sm:p-4"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <div className="p-6 sm:p-8">
        <h2
          id={titleId}
          className="editorial-heading text-2xl font-semibold text-white sm:text-3xl"
        >
          {project.title}
        </h2>

        <p className="mt-4 max-w-[46rem] text-[0.96rem] leading-relaxed text-slate-200/90">
          {project.description}
        </p>

        {project.technologies.length > 0 && (
          <div className="mt-7 border-t border-white/10 pt-5">
            <p className="astro-label">Technologies & Architecture</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="twilight-badge rounded-full px-3 py-1 font-mono text-xs text-sky-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-comet text-xs"
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
              className="btn-twilight text-xs"
            >
              GitHub Repository
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
              className="btn-twilight text-xs"
            >
              Open Full-Resolution Frame
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
