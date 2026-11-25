import { useCallback, useEffect, useRef, useState } from 'react';
import { portfolioData, type Certificate, type Project } from './data/portfolio';
import { prefersReducedMotionNow } from './hooks/useReducedMotion';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useThemePolarity } from './hooks/useThemePolarity';
import { InkCurtain } from './components/ui/InkCurtain';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Certificates } from './components/sections/Certificates';
import { Contact } from './components/sections/Contact';
import { ProjectModal } from './components/ProjectModal';
import { CertificateModal } from './components/CertificateModal';

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'certificates', 'contact'] as const;

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  const { polarity, togglePolarity } = useThemePolarity();
  useScrollReveal();

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const scrollY = window.scrollY;
      const marker = scrollY + 140;
      let next = 'hero';

      for (let i = 0; i < SECTION_IDS.length; i++) {
        const id = SECTION_IDS[i];
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (top <= marker) next = id;
      }

      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 12) {
        next = 'contact';
      }

      setActiveSection((current) => (current === next ? current : next));
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (!target) return;

    target.scrollIntoView({
      behavior: prefersReducedMotionNow() ? 'auto' : 'smooth',
      block: 'start',
    });
  }, []);

  const handleStepProject = useCallback((delta: -1 | 1) => {
    setSelectedProject((current) => {
      if (!current) return null;
      const list = portfolioData.projects;
      const idx = list.findIndex((p) => p.id === current.id);
      if (idx === -1) return current;
      const nextIdx = (idx + delta + list.length) % list.length;
      return list[nextIdx];
    });
  }, []);

  const handleStepCertificate = useCallback((delta: -1 | 1) => {
    setSelectedCertificate((current) => {
      if (!current) return null;
      const list = portfolioData.certificates;
      const idx = list.findIndex((c) => c.id === current.id);
      if (idx === -1) return current;
      const nextIdx = (idx + delta + list.length) % list.length;
      return list[nextIdx];
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--bg-primary)] text-[var(--ink-primary)]">
      {/* Snappy ~0.75s Non-Blocking Manga Ink Curtain */}
      <InkCurtain />

      {/* Minimalist 60fps Difference-Blend Custom Cursor (@media (pointer: fine)) */}
      <CustomCursor />

      {/* Keyboard Skip-to-Content Link */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[300] -translate-y-28 bg-[var(--accent-purple)] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-white transition-transform duration-150 focus:translate-y-0"
      >
        Skip to main content
      </a>

      <Navbar
        activeSection={activeSection}
        polarity={polarity}
        onTogglePolarity={togglePolarity}
        onNavigate={handleNavigate}
      />

      <main
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        className="focus:outline-none"
      >
        <Hero onNavigate={handleNavigate} />
        <About />
        <Projects onSelectProject={setSelectedProject} />
        <Skills />
        <Certificates onSelectCert={setSelectedCertificate} />
        <Contact />
      </main>

      <Footer />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStep={handleStepProject}
      />
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
        onStep={handleStepCertificate}
      />
    </div>
  );
}

export default App;
