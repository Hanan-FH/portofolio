import { portfolioData } from '../data/portfolio';

export function About() {
  const { about, education } = portfolioData;

  return (
    <section id="about" className="section-container">
      <div className="section-header">
        <span className="section-eyebrow">// 01 · ABOUT &amp; BACKGROUND</span>
        <h2 className="section-heading">{about.heading}</h2>
      </div>

      <div className="about-layout">
        <div className="about-bio-column">
          <div className="about-narrative">
            {about.paragraphs.map((p, idx) => (
              <p key={idx} className="about-paragraph">{p}</p>
            ))}
          </div>

          <div className="education-block">
            <h3 className="sub-heading">Academic Path</h3>
            <div className="timeline-card">
              {education.map((item, idx) => (
                <div key={idx} className="timeline-entry">
                  <div className="timeline-badge-row">
                    <span className="timeline-period">{item.period}</span>
                    <span className="timeline-status-tag">{item.status}</span>
                  </div>
                  <h4 className="timeline-title">{item.program}</h4>
                  <div className="timeline-institution">{item.institution}</div>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="about-spec-column">
          <div className="spec-card">
            <h3 className="spec-card-title">Technical Competencies</h3>
            <p className="spec-card-subtitle">
              Foundational software engineering disciplines cultivated at SMK Plus Pelita Nusantara.
            </p>

            <div className="competencies-grid">
              {about.fundamentals.map((comp) => (
                <div key={comp.id} className="competency-item">
                  <div className="competency-number">{comp.id}</div>
                  <div className="competency-body">
                    <h4 className="competency-title">{comp.title}</h4>
                    <span className="competency-local">({comp.localTitle})</span>
                    <p className="competency-desc">{comp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
