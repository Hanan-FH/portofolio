import { portfolioData } from '../data/portfolio';

export function Skills() {
  const { skills } = portfolioData;

  const skillGroups = [
    {
      id: 'frontend',
      category: 'Frontend Development',
      description: 'Building accessible, semantic, and responsive user interfaces with modern client frameworks.',
      items: skills.frontend,
    },
    {
      id: 'backend',
      category: 'Backend Development',
      description: 'Engineering server-side routing, RESTful APIs, OOP business logic, and backend runtime environments.',
      items: skills.backend,
    },
    {
      id: 'databases',
      category: 'Databases & Query Architecture',
      description: 'Designing relational schemas, data normalization, indices, and performing structured SQL queries.',
      items: skills.database,
    },
    {
      id: 'tools',
      category: 'Tools & Engineering Workflow',
      description: 'Version control workflows, API debugging, command-line environments, and modular build tooling.',
      items: skills.tools,
    },
  ];

  return (
    <section id="skills" className="section-container">
      <div className="section-header">
        <div className="section-header-top">
          <span className="section-eyebrow">// 03 · TECHNICAL STACK</span>
          <span className="section-count">Core Competencies</span>
        </div>
        <h2 className="section-heading">Programming languages, web technologies, and developer tooling.</h2>
      </div>

      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div key={group.id} className="skill-group-card">
            <div className="skill-group-header">
              <h3 className="skill-group-title">{group.category}</h3>
              <p className="skill-group-desc">{group.description}</p>
            </div>

            <ul className="skill-items-list" aria-label={`Skills in ${group.category}`}>
              {group.items.map((item) => (
                <li key={item} className="skill-item">
                  <span className="skill-item-bullet" aria-hidden="true" />
                  <span className="skill-item-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Languages Foundation Overview */}
      <div className="languages-strip">
        <div className="languages-strip-header">
          <span className="languages-strip-label">LANGUAGES STUDIED IN CURRICULUM</span>
        </div>
        <div className="languages-pills">
          {skills.languages.map((lang) => (
            <div key={lang.name} className="lang-pill" title={lang.description}>
              <span className="lang-name">{lang.name}</span>
              <span className="lang-category">{lang.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
