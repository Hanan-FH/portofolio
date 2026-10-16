import { useState, useRef, useEffect, useId } from 'react';
import './App.css';
import { portfolioData, type Project, type Certificate } from './data/portfolio';

const CURRENT_YEAR = new Date().getFullYear();

export function App() {
  const { personal, social, about, skills, education, projects, certificates, contact } = portfolioData;

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('portfolio-theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem('portfolio-theme', theme);
    } catch {
      // Ignore storage write errors in restricted browsing modes
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Accessible unique IDs for form controls
  const nameInputId = useId();
  const emailInputId = useId();
  const subjectInputId = useId();
  const messageInputId = useId();

  // Carousel refs
  const certScrollRef = useRef<HTMLDivElement>(null);
  const skillScrollRef = useRef<HTMLDivElement>(null);

  const scrollCerts = (direction: 'left' | 'right') => {
    if (certScrollRef.current) {
      const scrollAmount = direction === 'left' ? -310 : 310;
      certScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollSkills = (direction: 'left' | 'right') => {
    if (skillScrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      skillScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Keyboard Escape listener for modals and mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setSelectedCert(null);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu or modal is open
  useEffect(() => {
    if (isMobileMenuOpen || selectedProject || selectedCert) {
      document.body.classList.add('scroll-locked');
      document.documentElement.classList.add('scroll-locked');
    } else {
      document.body.classList.remove('scroll-locked');
      document.documentElement.classList.remove('scroll-locked');
    }
    return () => {
      document.body.classList.remove('scroll-locked');
      document.documentElement.classList.remove('scroll-locked');
    };
  }, [isMobileMenuOpen, selectedProject, selectedCert]);

  // FormSubmit AJAX state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honey: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'activation_required'>('idle');
  const [formErrorMsg, setFormErrorMsg] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honey.trim() !== '') {
      return; // Anti-bot honeypot caught
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || formData.message.trim().length < 10) {
      setFormErrorMsg('Harap lengkapi semua bidang dengan benar (pesan minimal 10 karakter).');
      return;
    }

    setFormErrorMsg('');
    setFormStatus('sending');

    try {
      const res = await fetch(contact.formSubmitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          _replyto: formData.email.trim(),
          subject: formData.subject.trim(),
          _subject: `New Portfolio Contact — ${formData.subject.trim()}`,
          message: formData.message.trim(),
          _captcha: 'false',
        }),
      });

      const data = await res.json().catch(() => null);

      if (data && (data.success === 'true' || data.success === true || (res.ok && res.status === 200))) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', honey: '' });
      } else if (data && data.message && data.message.toLowerCase().includes('activation')) {
        // FormSubmit requires a one-time activation link to be clicked by the inbox owner
        setFormStatus('activation_required');
      } else {
        const errorDetail = data?.message || (res.status ? `Error status ${res.status}` : 'Pengiriman gagal');
        throw new Error(errorDetail);
      }
    } catch (err: unknown) {
      setFormStatus('error');
      const msg = err instanceof Error ? err.message : 'Terjadi kendala saat menghubungi server.';
      setFormErrorMsg(msg);
    }
  };

  return (
    <div className="portfolio-container">
      {/* Background Structural Vertical Grid Lines */}
      <div className="grid-lines" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="grid-line-col" />
        ))}
      </div>

      {/* Left Marginal Telemetry */}
      <div className="marginal-left" aria-hidden="true">
        <span className="line" />
        <span>SOFTWARE ENGINEERING STUDENT BASED IN BOGOR, INDONESIA</span>
      </div>

      {/* Right Marginal Navigation Shortcuts */}
      <div className="marginal-right" aria-hidden="true">
        <a href="#contact">EMAIL</a>
        <a href="#projects">PROJECTS</a>
        <a href="#certificates">CERTIFICATES</a>
        <a href="#about">ABOUT</a>
      </div>

      {/* Fixed Site Header */}
      <header className="header">
        <div className="header-inner">
          <a href="#" className="brand" aria-label="Hanan Fathurrozaq Hidayatullah Home">
            <span className="brand-monogram">
              Hanan<span>.</span>
            </span>
            <span className="brand-badge">{personal.location.split(',')[0]}, ID</span>
          </a>

          <nav className="nav-menu" aria-label="Main Navigation">
            <a href="#about" className="nav-link">About</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#education" className="nav-link">Education</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#certificates" className="nav-link">Certificates</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Professional Gold (Light) theme' : 'Switch to Lifted Obsidian (Dark) theme'}
              title={theme === 'dark' ? 'Switch to Gold Theme' : 'Switch to Dark Theme'}
            >
              <span className="theme-toggle-dot" aria-hidden="true" />
              <span>{theme === 'dark' ? 'GOLD ☀' : 'DARK ☾'}</span>
            </button>

            <button
              type="button"
              className="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? 'CLOSE ✕' : 'MENU ☰'}
            </button>
          </div>
        </div>

        {/* Minimalist Developer Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-drawer" role="dialog" aria-label="Mobile Navigation" aria-modal="true">
            <div className="mobile-nav-links">
              <a href="#about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="mobile-nav-left">
                  <span className="mobile-nav-num">// 01</span>
                  <span className="mobile-nav-text">About</span>
                </span>
                <span className="mobile-nav-arrow">↗</span>
              </a>
              <a href="#skills" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="mobile-nav-left">
                  <span className="mobile-nav-num">// 02</span>
                  <span className="mobile-nav-text">Skills</span>
                </span>
                <span className="mobile-nav-arrow">↗</span>
              </a>
              <a href="#education" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="mobile-nav-left">
                  <span className="mobile-nav-num">// 03</span>
                  <span className="mobile-nav-text">Education</span>
                </span>
                <span className="mobile-nav-arrow">↗</span>
              </a>
              <a href="#projects" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="mobile-nav-left">
                  <span className="mobile-nav-num">// 04</span>
                  <span className="mobile-nav-text">Projects</span>
                </span>
                <span className="mobile-nav-arrow">↗</span>
              </a>
              <a href="#certificates" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="mobile-nav-left">
                  <span className="mobile-nav-num">// 05</span>
                  <span className="mobile-nav-text">Certificates</span>
                </span>
                <span className="mobile-nav-arrow">↗</span>
              </a>
              <a href="#contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="mobile-nav-left">
                  <span className="mobile-nav-num">// 06</span>
                  <span className="mobile-nav-text">Contact</span>
                </span>
                <span className="mobile-nav-arrow">↗</span>
              </a>
            </div>

            <div className="mobile-drawer-footer">
              <div className="mobile-drawer-status">
                <span className="dot" />
                <span>{personal.status}</span>
              </div>
              <a
                href={`mailto:${personal.email}`}
                className="mobile-drawer-email"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>{personal.email}</span> ↗
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ====================================================================
            HERO SECTION
            ==================================================================== */}
        <section id="hero" className="hero-section">
          <div className="hero-content">
            <div className="status-badge">
              <span className="pulse-indicator">
                <span className="ping" />
                <span className="solid" />
              </span>
              <span>{personal.status}</span>
            </div>

            <div className="hero-display">
              <div className="line-1">
                <span>Hello</span>
                <span className="circle-cyan" />
                <span className="circle-crimson" />
                <span className="text-accent">.</span>
              </div>
              <div>I am</div>
              <div className="text-accent">
                Hanan<span style={{ color: 'var(--accent-cyan)' }}>.</span>
              </div>
            </div>

            <p className="hero-bio">{personal.shortBio}</p>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                VIEW PROJECTS ↗
              </a>
              <a href="#contact" className="btn-secondary">
                CONTACT ME
              </a>
            </div>

            <div className="hero-connect">
              <span className="connect-label">Connect</span>
              <div className="connect-links">
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="connect-link"
                    aria-label="Visit Hanan-FH on GitHub"
                  >
                    <span>GitHub</span> ↗
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
                    <span>LinkedIn</span> ↗
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Profile Card Container with Crimson Ambient Glow */}
          <div className="hero-card-col">
            <div className="profile-card">
              <div className="profile-card-top">
                <span>PROFILE PHOTO</span>
                <span className="text-accent">{personal.profileImage ? '[ONLINE]' : '[IN PROGRESS]'}</span>
              </div>

              <div className="profile-avatar-box">
                {personal.profileImage ? (
                  <div className="avatar-image-wrapper">
                    <img
                      src={personal.profileImage}
                      alt={personal.name}
                      className="avatar-img"
                    />
                  </div>
                ) : (
                  <div className="avatar-initials">HF</div>
                )}
                <div className="avatar-name">{personal.name}</div>
                <div className="avatar-desc">{personal.role}</div>
              </div>

              <div className="profile-card-bottom">
                <span>Location: {personal.location}</span>
                <span style={{ color: 'var(--text-heading)', fontWeight: 600 }}>SMK Plus Pelita Nusantara</span>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            ABOUT SECTION
            ==================================================================== */}
        <section id="about">
          <div className="section-tag">
            <span className="dot" />
            <span>// 01 About</span>
          </div>

          <div className="about-grid">
            <div className="about-narrative">
              <h3 className="section-title">{about.heading}</h3>
              {about.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="about-telemetry">
              <div className="telemetry-card">
                <div className="telemetry-title">System Telemetry &amp; Specs</div>
                <div className="telemetry-item">
                  <span className="label">STATUS</span>
                  <span className="val">{about.status}</span>
                </div>
                <div className="telemetry-item">
                  <span className="label">LOCATION</span>
                  <span className="val">{about.location}</span>
                </div>
                <div className="telemetry-item">
                  <span className="label">CORE FOCUS</span>
                  <span className="val">{about.currentFocus}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SKILLS SECTION (Horizontal Scroll Carousel — Programming & Tech Languages)
            ==================================================================== */}
        <section id="skills">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div className="section-tag" style={{ marginBottom: 0 }}>
              <span className="dot" />
              <span>// 02 Skills &amp; Languages</span>
            </div>

            <div className="skill-header-actions">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                {skills.languages.length} Languages (Scroll →)
              </span>
              <div className="skill-controls">
                <button
                  type="button"
                  className="scroll-btn"
                  onClick={() => scrollSkills('left')}
                  aria-label="Scroll languages left"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="scroll-btn"
                  onClick={() => scrollSkills('right')}
                  aria-label="Scroll languages right"
                >
                  →
                </button>
              </div>
            </div>
          </div>
          <h2 className="section-title">Programming languages and core software technologies.</h2>

          <div ref={skillScrollRef} className="skill-carousel">
            {skills.languages.map((lang) => (
              <div key={lang.name} className="skill-card" title={lang.name}>
                <div className="skill-preview">
                  <img
                    src={lang.image}
                    alt={lang.name}
                    className="skill-icon-img"
                    loading="lazy"
                  />
                </div>
                <div className="skill-footer-label">
                  <span>{lang.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====================================================================
            EDUCATION SECTION
            ==================================================================== */}
        <section id="education">
          <div className="section-tag">
            <span className="dot" />
            <span>// 03 Education</span>
          </div>
          <h2 className="section-title">Academic foundation and vocational software engineering background.</h2>

          <div className="timeline">
            {education.map((item, idx) => (
              <div key={idx} className="timeline-item">
                <span className="timeline-bullet" />
                <span className="timeline-period">{item.period}</span>
                <h3 className="timeline-title">{item.program}</h3>
                <div className="timeline-subtitle">
                  {item.institution} {item.status && `· ${item.status}`}
                </div>
                <p className="timeline-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ====================================================================
            PROJECTS SECTION (Horizontal Container Blocks)
            ==================================================================== */}
        <section id="projects">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div className="section-tag" style={{ marginBottom: 0 }}>
              <span className="dot" />
              <span>// 04 Selected Projects</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
              EXACTLY 3 PROJECTS
            </span>
          </div>
          <h2 className="section-title">A showcase of software projects and development initiatives.</h2>

          <div className="projects-stack">
            {projects.map((proj, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const displayTitle = proj.title.trim() || `Project ${num} — Development Pending`;
              const displayCat = proj.category.trim() || 'SOFTWARE DEVELOPMENT';
              const displayYear = proj.year.trim() || 'IN DEVELOPMENT';
              const displayDesc =
                proj.description.trim() ||
                'Ringkasan arsitektur teknis dan dokumentasi modul proyek akan ditampilkan di sini setelah rilis publik.';

              return (
                <article key={proj.id} className="project-block">
                  <div className="project-left">
                    {proj.image ? (
                      <div className="project-thumbnail-box">
                        <img src={proj.image} alt={displayTitle} className="project-thumb-img" />
                        <span className="project-badge-overlay">PRJ {num}</span>
                      </div>
                    ) : (
                      <div className="project-badge">PRJ {num}</div>
                    )}
                    <div className="project-info">
                      <div className="project-meta">
                        <span className="project-category">{displayCat}</span>
                        <span style={{ color: 'var(--text-faint)' }}>•</span>
                        <span className="project-status">{displayYear}</span>
                      </div>
                      <h3 className="project-title">{displayTitle}</h3>
                      <p className="project-desc">{displayDesc}</p>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <div className="chips" style={{ marginTop: 6 }}>
                          {proj.technologies.map((tech) => (
                            <span key={tech} className="chip" style={{ fontSize: 10, padding: '2px 8px' }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="project-btn"
                    onClick={() => setSelectedProject(proj)}
                    aria-label={`Detail selengkapnya untuk Project ${num}`}
                  >
                    <span>DETAIL SELENGKAPNYA</span> ↗
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* ====================================================================
            CERTIFICATES SECTION (Horizontal Scroll Carousel)
            ==================================================================== */}
        <section id="certificates">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div className="section-tag" style={{ marginBottom: 0 }}>
              <span className="dot" />
              <span>// 05 Certifications</span>
            </div>

            <div className="cert-header-actions">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                10 Credentials (Scroll →)
              </span>
              <div className="cert-controls">
                <button
                  type="button"
                  className="scroll-btn"
                  onClick={() => scrollCerts('left')}
                  aria-label="Scroll left"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="scroll-btn"
                  onClick={() => scrollCerts('right')}
                  aria-label="Scroll right"
                >
                  →
                </button>
              </div>
            </div>
          </div>
          <h2 className="section-title">Technical certifications and completed coursework.</h2>

          <div ref={certScrollRef} className="cert-carousel">
            {certificates.map((cert, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const displayTitle = cert.title.trim() || `Certificate ${num}`;
              const displayIssuer = cert.issuer.trim() || 'Accreditation Pending';
              const displayYear = cert.year.trim() || '—';

              return (
                <div
                  key={cert.id}
                  className="cert-card"
                  onClick={() => setSelectedCert(cert)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedCert(cert);
                    }
                  }}
                  aria-label={`View Certificate ${num} details`}
                >
                  <div className="cert-preview">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={displayTitle}
                        className="cert-img"
                        loading="lazy"
                      />
                    ) : (
                      <>
                        <span className="cert-badge">CERT {num}</span>
                        <span className="cert-pending">Preview Pending</span>
                      </>
                    )}
                  </div>
                  <div className="cert-body">
                    <span className="cert-issuer">{displayIssuer}</span>
                    <h4 className="cert-name">{displayTitle}</h4>
                    <div className="cert-footer">
                      <span>View Details →</span>
                      <span>{displayYear}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ====================================================================
            CONTACT SECTION
            ==================================================================== */}
        <section id="contact">
          <div className="section-tag">
            <span className="dot" />
            <span>// 06 Contact</span>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <h3 className="section-title">{contact.heading}</h3>
              <p>{contact.subheading}</p>

              <div>
                <span className="connect-label">Direct Email</span>
                <a
                  href={`mailto:${contact.recipientEmail}?subject=Portfolio%20Inquiry`}
                  className="direct-email-box"
                  aria-label={`Send email to ${contact.recipientEmail}`}
                >
                  <span className="text-accent">✉</span>
                  <span>{contact.recipientEmail}</span> ↗
                </a>
              </div>
            </div>

            <div>
              <form className="contact-form" onSubmit={handleFormSubmit} noValidate>
                {/* Anti-spam Honeypot */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="honey">Leave blank</label>
                  <input
                    id="honey"
                    type="text"
                    value={formData.honey}
                    onChange={(e) => setFormData({ ...formData, honey: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={nameInputId}>Your Name *</label>
                  <input
                    id={nameInputId}
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={emailInputId}>Your Email Address *</label>
                  <input
                    id={emailInputId}
                    name="email"
                    type="email"
                    required
                    placeholder="e.g. jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={subjectInputId}>Subject *</label>
                  <input
                    id={subjectInputId}
                    name="subject"
                    type="text"
                    required
                    placeholder="e.g. Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={messageInputId}>Message *</label>
                  <textarea
                    id={messageInputId}
                    name="message"
                    required
                    rows={4}
                    placeholder="Briefly describe your project or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {formErrorMsg && formStatus !== 'activation_required' && formStatus !== 'error' && (
                  <div className="alert-box alert-error" role="alert" aria-live="polite">
                    {formErrorMsg}
                  </div>
                )}

                {formStatus === 'activation_required' && (
                  <div className="alert-box alert-warning" role="alert" aria-live="polite">
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>
                      ⚠️ Aktivasi Formulir Diperlukan (1x Saja)
                    </div>
                    <div style={{ lineHeight: 1.5 }}>
                      FormSubmit telah mengirimkan email konfirmasi ke <strong>{contact.recipientEmail}</strong>. Silakan buka kotak masuk / spam Gmail Anda, lalu klik tautan <strong>"Activate Form"</strong> agar pesan berikutnya langsung terkirim otomatis.
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <a
                        href={`mailto:${contact.recipientEmail}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`)}`}
                        className="btn-secondary"
                        style={{ display: 'inline-flex', padding: '6px 14px', fontSize: 12 }}
                      >
                        Kirim Sekarang via Aplikasi Email ↗
                      </a>
                    </div>
                  </div>
                )}

                {formStatus === 'success' && (
                  <div className="alert-box alert-success" role="status" aria-live="polite">
                    ✓ Pesan Anda telah terkirim dengan sukses. Terima kasih telah menghubungi saya!
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="alert-box alert-error" role="alert" aria-live="polite">
                    <div style={{ lineHeight: 1.5 }}>
                      {formErrorMsg || 'Terjadi kendala saat mengirimkan pesan.'} Silakan coba lagi atau kirim pesan Anda langsung:
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <a
                        href={`mailto:${contact.recipientEmail}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`)}`}
                        className="btn-secondary"
                        style={{ display: 'inline-flex', padding: '6px 14px', fontSize: 12 }}
                      >
                        Kirim via Aplikasi Email ↗
                      </a>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={formStatus === 'sending'}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {formStatus === 'sending' && 'SENDING MESSAGE...'}
                  {formStatus === 'success' && 'MESSAGE SENT! ✓'}
                  {formStatus === 'error' && 'FAILED — TRY AGAIN ↻'}
                  {formStatus === 'activation_required' && 'ACTIVATION REQUIRED ⚠'}
                  {formStatus === 'idle' && 'SEND MESSAGE ✉'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-inner">
          <div>
            © {CURRENT_YEAR} {personal.name}. All rights reserved.
            <div style={{ marginTop: 4, fontSize: 11, color: 'var(--text-faint)' }}>
              Software Engineering Student · SMK Plus Pelita Nusantara, Bogor.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a href={`mailto:${personal.email}`}>{personal.email}</a>
            <a href="#hero" style={{ color: 'var(--accent)' }}>Back to Top ↑</a>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          ACCESSIBLE PROJECT DETAIL MODAL
          ==================================================================== */}
      {selectedProject && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Project details"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            {selectedProject.image ? (
              <div className="modal-image-container">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title || `Project 0${selectedProject.id}`}
                  className="modal-cert-img"
                />
              </div>
            ) : (
              <div className="modal-image-placeholder">
                <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 12 }}>
                  [PROJECT 0{selectedProject.id} // PREVIEW]
                </span>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                  IMAGE TO BE ADDED
                </span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 11, marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
                {selectedProject.category || 'SOFTWARE ARCHITECTURE'}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>{selectedProject.year || 'IN DEVELOPMENT'}</span>
            </div>

            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.02em' }}>
              {selectedProject.title || `Project 0${selectedProject.id} — Development In Progress`}
            </h3>

            {selectedProject.technologies && selectedProject.technologies.length > 0 && (
              <div className="chips" style={{ marginBottom: 16 }}>
                {selectedProject.technologies.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
              {selectedProject.description ||
                'Dokumentasi rinci proyek, skema arsitektur, dan ringkasan implementasi teknis akan dirilis setelah tahap pengujian selesai.'}
            </p>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
              <span>PRJ ID: // 0{selectedProject.id}</span>
              {selectedProject.image ? (
                <a
                  href={selectedProject.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent)', textDecoration: 'none' }}
                >
                  Buka Gambar Penuh ↗
                </a>
              ) : (
                <span>Source code &amp; live demonstration pending</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          ACCESSIBLE CERTIFICATE LIGHTBOX MODAL
          ==================================================================== */}
      {selectedCert && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedCert(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Certificate details"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedCert(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            {selectedCert.image ? (
              <div className="modal-image-container">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title || `Certificate ${selectedCert.id}`}
                  className="modal-cert-img"
                />
              </div>
            ) : (
              <div className="modal-image-placeholder">
                <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 12 }}>
                  [CERTIFICATE 0{selectedCert.id} // PREVIEW]
                </span>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                  IMAGE TO BE ADDED
                </span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 11, marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
                Issuer: {selectedCert.issuer || 'SMK Plus Pelita Nusantara / Verified Issuer'}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>Issued: {selectedCert.year || 'Year Pending'}</span>
            </div>

            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, lineHeight: 1.4 }}>
              {selectedCert.title || `Certificate 0${selectedCert.id} — Accreditation In Progress`}
            </h3>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
              <span>Credential #{String(selectedCert.id).padStart(2, '0')}</span>
              {selectedCert.image ? (
                <a
                  href={selectedCert.verificationUrl || selectedCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent)', textDecoration: 'none' }}
                >
                  Buka Berkas Penuh ↗
                </a>
              ) : (
                <span>Verification Pending</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;