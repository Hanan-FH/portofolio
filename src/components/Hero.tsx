import { portfolioData } from '../data/portfolio';

interface HeroProps {
  onNavigate?: (id: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { personal, social } = portfolioData;

  const handleActionClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="status-pill">
            <span className="status-dot-pulse" aria-hidden="true" />
            <span className="status-pill-text">{personal.status}</span>
          </div>

          <div className="hero-title-group">
            <span className="hero-eyebrow">{personal.eyebrow}</span>
            <h1 className="hero-name">{personal.name}</h1>
          </div>

          <p className="hero-lead">
            Software Engineering student with a strong focus on modern web architectures,
            programming logic, and building practical digital solutions.
          </p>

          <p className="hero-subtext">
            Studying Software Engineering (Rekayasa Perangkat Lunak) at SMK Plus Pelita Nusantara in Bogor.
            Committed to writing clean, structured code and continuously expanding full-stack engineering skills.
          </p>

          <div className="hero-actions">
            <a
              href="#projects"
              className="btn-primary"
              onClick={() => handleActionClick('projects')}
            >
              <span>View Projects</span>
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </a>
            <a
              href="#contact"
              className="btn-secondary"
              onClick={() => handleActionClick('contact')}
            >
              <span>Contact Me</span>
            </a>
          </div>

          <div className="hero-connect">
            <span className="connect-label">Connect:</span>
            <div className="connect-links">
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="connect-link"
                  aria-label="Visit Hanan Fathurrozaq on GitHub"
                >
                  <span>GitHub</span>
                  <span className="connect-arrow" aria-hidden="true">↗</span>
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="connect-link"
                  aria-label="Visit Hanan Fathurrozaq on LinkedIn"
                >
                  <span>LinkedIn</span>
                  <span className="connect-arrow" aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="profile-card">
            <div className="profile-card-header">
              <span className="profile-card-tag">// DEVELOPER PROFILE</span>
              <span className="profile-card-badge">ACTIVE</span>
            </div>

            <div className="profile-photo-wrapper">
              <img
                src={personal.profileImage}
                alt={personal.name}
                className="profile-photo"
                width={380}
                height={380}
                loading="eager"
              />
            </div>

            <div className="profile-card-details">
              <div className="profile-card-name">{personal.name}</div>
              <div className="profile-card-role">{personal.role}</div>

              <div className="profile-meta-list">
                <div className="profile-meta-row">
                  <span className="profile-meta-key">Institution</span>
                  <span className="profile-meta-val">SMK Plus Pelita Nusantara</span>
                </div>
                <div className="profile-meta-row">
                  <span className="profile-meta-key">Department</span>
                  <span className="profile-meta-val">Rekayasa Perangkat Lunak (RPL)</span>
                </div>
                <div className="profile-meta-row">
                  <span className="profile-meta-key">Location</span>
                  <span className="profile-meta-val">{personal.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
