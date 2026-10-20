import { portfolioData, type Project } from '../data/portfolio';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export function Projects({ onSelectProject }: ProjectsProps) {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="section-container">
      <div className="section-header">
        <div className="section-header-top">
          <span className="section-eyebrow">// 02 · SELECTED WORKS</span>
          <span className="section-count">{projects.length} Projects</span>
        </div>
        <h2 className="section-heading">Software applications and technical prototypes.</h2>
      </div>

      <div className="projects-list">
        {projects.map((proj, idx) => {
          const num = String(idx + 1).padStart(2, '0');

          return (
            <article key={proj.id} className="project-row">
              <div
                className="project-media-wrap"
                onClick={() => onSelectProject(proj)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectProject(proj);
                  }
                }}
                aria-label={`View preview for ${proj.title}`}
              >
                {proj.image ? (
                  <img
                    src={proj.image}
                    alt={`Screenshot of ${proj.title}`}
                    className="project-image"
                    loading="lazy"
                    width={560}
                    height={350}
                  />
                ) : (
                  <div className="project-placeholder">
                    <span>Project {num} Preview Pending</span>
                  </div>
                )}
                <div className="project-media-overlay">
                  <span className="media-zoom-hint">Preview Details ↗</span>
                </div>
              </div>

              <div className="project-details">
                <div className="project-meta-line">
                  <span className="project-index">PROJECT // {num}</span>
                  <span className="project-category">{proj.category}</span>
                  <span className="project-year">{proj.year}</span>
                </div>

                <h3 className="project-title">
                  <button
                    type="button"
                    className="project-title-btn"
                    onClick={() => onSelectProject(proj)}
                  >
                    {proj.title}
                  </button>
                </h3>

                <p className="project-description">{proj.description}</p>

                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="tech-tags" aria-label="Technologies used">
                    {proj.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="project-actions">
                  <button
                    type="button"
                    className="btn-link"
                    onClick={() => onSelectProject(proj)}
                  >
                    <span>View Specifications</span>
                    <span className="btn-arrow" aria-hidden="true">↗</span>
                  </button>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-link"
                    >
                      <span>Source Code</span>
                      <span className="btn-arrow" aria-hidden="true">↗</span>
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-link"
                    >
                      <span>Live Demo</span>
                      <span className="btn-arrow" aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Projects;
