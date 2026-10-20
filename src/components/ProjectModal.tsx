import { useEffect } from 'react';
import { type Project } from '../data/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('modal-locked');
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-locked');
    };
  }, [project, onClose]);

  if (!project) return null;

  const num = String(project.id).padStart(2, '0');

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Project details for ${project.title}`}
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="modal-index">PROJECT // {num}</span>
            <span className="modal-category">{project.category}</span>
            <span className="modal-year">{project.year}</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close project modal"
          >
            ✕
          </button>
        </div>

        {project.image && (
          <div className="modal-media-frame">
            <img
              src={project.image}
              alt={project.title}
              className="modal-image"
              loading="lazy"
            />
          </div>
        )}

        <div className="modal-body">
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-description">{project.description}</p>

          {project.technologies && project.technologies.length > 0 && (
            <div className="modal-tech-section">
              <span className="modal-tech-label">TECHNOLOGIES &amp; TOOLS</span>
              <div className="tech-tags">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="modal-footer">
            <div className="modal-links">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span>Repository</span> ↗
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <span>Live Demo</span> ↗
                </a>
              )}
              {project.image && (
                <a
                  href={project.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-link"
                >
                  <span>Open Full Screenshot</span> ↗
                </a>
              )}
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
