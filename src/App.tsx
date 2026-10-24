import { useEffect, useState } from 'react';
import type { Certificate, Project } from './data/portfolio';
import { CinematicIntro } from './components/atmosphere/CinematicIntro';
import { KatawareSkyBackdrop } from './components/atmosphere/KatawareSkyBackdrop';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Certificates } from './components/sections/Certificates';
import { Contact } from './components/sections/Contact';
import { ProjectModal } from './components/ProjectModal';
import { CertificateModal } from './components/CertificateModal';

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'certificates', 'contact'];

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const marker = window.scrollY + 140;
      let next = 'hero';

      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top + window.scrollY <= marker) {
          next = id;
        }
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8
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
    window.addEventListener('resize', handleScroll, { passive: true });

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
    <div className="relative min-h-screen overflow-x-clip bg-zenith-abyss text-starlight">
      {/* Accessible Skip-to-Content Link */}
      <a
        href="#main-content"
        className="fixed left-4 top-[-100px] z-[300] rounded-full bg-sky-300 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#070a18] shadow-lg transition-[top] duration-200 focus:top-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
      >
        Skip to main content
      </a>

      {/* Self-Contained HTML5 Canvas Kimi no Na wa. Opening Engine */}
      <CinematicIntro />

      {/* Persistent Atmospheric Rayleigh Scattering Sky & Zenith Starfield */}
      <KatawareSkyBackdrop />

      {/* Floating Twilight Glass Navigation Bar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
        <Hero onNavigate={handleNavigate} />
        <About />
        <Skills />
        <Projects onSelectProject={setSelectedProject} />
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
