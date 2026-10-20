import { useEffect, useState } from 'react';
import type { Certificate, Project } from './data/portfolio';
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
import { Starfield } from './components/galaxy/Starfield';
import { CometCursor } from './components/galaxy/CometCursor';

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'certificates', 'contact'];

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const marker = window.scrollY + 110;
      let next = 'hero';

      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top + window.scrollY <= marker) {
          next = id;
        }
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      ) {
        next = 'contact';
      }

      setActiveSection((current) => (current === next ? current : next));
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (!target) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink text-paper selection:bg-signal selection:text-black">
      <a
        href="#main-content"
        className="fixed left-4 top-[-100px] z-[300] bg-signal px-4 py-2 font-mono text-xs font-semibold text-black transition-[top] duration-200 focus:top-4"
      >
        Skip to main content
      </a>

      {/* Galactic Comet Cursor with zero-lag rAF interpolation */}
      <CometCursor />

      {/* Atmospheric depth-layered galaxy starfield */}
      <Starfield />

      {/* Sticky architectural navigation bar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
        <Hero onNavigate={handleNavigate} />
        <About />
        <Projects onSelectProject={setSelectedProject} />
        <Skills />
        <Certificates onSelectCert={setSelectedCertificate} />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
}

export default App;
