import { useEffect, useState } from 'react';
import { type Certificate, type Project } from './data/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Certificates } from './components/Certificates';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CertificateModal } from './components/CertificateModal';

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
    <div className="min-h-screen overflow-x-clip bg-ink text-paper">
      <a
        href="#main-content"
        className="fixed left-4 top-[-100px] z-[300] bg-signal px-4 py-2 font-mono text-xs font-semibold text-black transition-[top] duration-200 focus:top-4"
      >
        Skip to main content
      </a>

      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Hero onNavigate={handleNavigate} />
        <About />
        <Projects onSelectProject={setSelectedProject} />
        <Skills />
        <Certificates onSelectCert={setSelectedCertificate} />
        <Contact />
      </main>

      <Footer />

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
}

export default App;
