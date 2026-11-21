import { useCallback, useEffect, useRef, useState } from 'react';
import type { Certificate, Project } from './data/portfolio';
import { prefersReducedMotionNow } from './hooks/useReducedMotion';
import { CinematicIntro } from './components/atmosphere/CinematicIntro';
import { AtmosphericScrollEngine } from './components/atmosphere/AtmosphericScrollEngine';
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

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'certificates', 'contact'] as const;

function isAlreadyAssembled(): boolean {
  if (typeof window === 'undefined') return true;
  if (prefersReducedMotionNow()) return true;
  try {
    return window.sessionStorage.getItem('tiamat_intro_executed') === '1';
  } catch {
    return true;
  }
}

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isAssembled, setIsAssembled] = useState<boolean>(isAlreadyAssembled);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  const handleHandoff = useCallback(() => {
    setIsAssembled(true);
  }, []);

  useEffect(() => {
    let frame = 0;
    let offsets: Array<{ id: string; top: number }> = [];
    let bottomLimit = 0;

    const measureSections = () => {
      const scrollTop = window.scrollY;
      offsets = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        return { id, top: el ? el.getBoundingClientRect().top + scrollTop : Infinity };
      });
      bottomLimit = document.documentElement.scrollHeight - 8;
    };

    const updateActiveSection = () => {
      frame = 0;
      const scrollY = window.scrollY;
      const marker = scrollY + 120;
      let next = 'hero';

      for (let i = 0; i < offsets.length; i++) {
        if (offsets[i].top <= marker) next = offsets[i].id;
      }

      if (window.innerHeight + scrollY >= bottomLimit) {
        next = 'contact';
      }

      setActiveSection((current) => (current === next ? current : next));
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    const handleResize = () => {
      measureSections();
      handleScroll();
    };

    measureSections();
    updateActiveSection();

    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) {
        measureSections();
        updateActiveSection();
      }
    });

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(handleResize) : null;
    if (ro && mainRef.current) ro.observe(mainRef.current);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelled = true;
      ro?.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (!target) return;

    target.scrollIntoView({
      behavior: prefersReducedMotionNow() ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-zenith-void text-slate-50">
      {/* GPU Transform-Only Skip-to-Content Link */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[300] -translate-y-28 rounded-[2px] bg-sky-300 px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#050714] transition-transform duration-200 focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
      >
        Skip to main content
      </a>

      {/* Unskippable 3.2s Optical Cold-Open Engine */}
      <CinematicIntro onHandoff={handleHandoff} />

      {/* Master Katawaredoki Atmosphere, Elastic Musubi Spline & Doppler Stardust Engine */}
      <AtmosphericScrollEngine contentPlaneRef={mainRef} paused={!isAssembled} />

      {/* Atmospheric Kumihimo Glass Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        isAssembled={isAssembled}
        onNavigate={handleNavigate}
      />

      <main
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        className="relative z-10 focus:outline-none"
      >
        <Hero isAssembled={isAssembled} onNavigate={handleNavigate} />
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
