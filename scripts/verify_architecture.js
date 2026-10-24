import fs from 'node:fs';
import path from 'node:path';
import { personalData, aboutData, socialData, contactData, skillsData } from '../src/data/profile.ts';
import { projectsData } from '../src/data/projects.ts';
import { certificatesData } from '../src/data/certificates.ts';

console.log('--- SHINKAI KATAWAREDOKI ENGINE & DATA INTEGRITY AUDIT ---');

let hasFailure = false;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    hasFailure = true;
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

// 1. Exact Data Counts
assert(projectsData.length === 3, `Expected exactly 3 projects, got ${projectsData.length}`);
assert(certificatesData.length === 10, `Expected exactly 10 certificates, got ${certificatesData.length}`);
assert(skillsData.languages.length === 9, `Expected exactly 9 curriculum languages, got ${skillsData.languages.length}`);
assert(aboutData.fundamentals.length === 4, `Expected 4 foundation competencies, got ${aboutData.fundamentals.length}`);

// 2. Authentic Media Assets on Disk
assert(fs.existsSync(path.resolve('public', 'profile.jpg')), 'Profile photo exists (/profile.jpg)');

for (const prj of projectsData) {
  const imgPath = path.resolve('public', prj.image.replace(/^\//, ''));
  assert(fs.existsSync(imgPath), `Project image exists: ${prj.image}`);
}

for (const cert of certificatesData) {
  const imgPath = path.resolve('public', cert.image.replace(/^\//, ''));
  const docPath = path.resolve('public', cert.verificationUrl.replace(/^\//, ''));
  assert(fs.existsSync(imgPath), `Certificate image exists: ${cert.image}`);
  assert(fs.existsSync(docPath), `Certificate verification document exists: ${cert.verificationUrl}`);
}

for (const lang of skillsData.languages) {
  const iconPath = path.resolve('public', lang.image.replace(/^\//, ''));
  assert(fs.existsSync(iconPath), `Language icon exists: ${lang.image}`);
}

// 3. Preserved Endpoints & Socials
assert(personalData.name === 'Hanan Fathurrozaq Hidayatullah', 'Developer name preserved');
assert(socialData.github === 'https://github.com/Hanan-FH', 'GitHub link preserved');
assert(socialData.linkedin.includes('hanan-fathurrozaq'), 'LinkedIn link preserved');
assert(contactData.formSubmitEndpoint === 'https://formsubmit.co/ajax/hananfh77@gmail.com', 'FormSubmit AJAX endpoint preserved');

// 4. Cold-Open & Motion Engine Governance Checks
const introSource = fs.readFileSync(path.resolve('src/components/atmosphere/CinematicIntro.tsx'), 'utf8');
assert(introSource.includes('tiamat_intro_executed'), 'CinematicIntro persists tiamat_intro_executed in sessionStorage');
assert(!/Skip Intro|<button/i.test(introSource), 'CinematicIntro is strictly unskippable (zero skip buttons)');

const appSource = fs.readFileSync(path.resolve('src/App.tsx'), 'utf8');
assert(appSource.includes('AtmosphericScrollEngine'), 'App.tsx mounts AtmosphericScrollEngine');

const certsSource = fs.readFileSync(path.resolve('src/components/sections/Certificates.tsx'), 'utf8');
assert(
  certsSource.includes('snap-x') && certsSource.includes('snap-mandatory'),
  'Certificates.tsx uses lightweight CSS horizontal scroll snap'
);

const skillsSource = fs.readFileSync(path.resolve('src/components/sections/Skills.tsx'), 'utf8');
assert(
  skillsSource.includes('animate-marquee'),
  'Skills.tsx runs hardware-accelerated CSS marquee ribbon'
);

// 5. Required Engine & Component Files
const requiredFiles = [
  'AGENTS.md',
  'src/hooks/useReducedMotion.ts',
  'src/data/profile.ts',
  'src/data/projects.ts',
  'src/data/certificates.ts',
  'src/data/portfolio.ts',
  'src/components/atmosphere/CinematicIntro.tsx',
  'src/components/atmosphere/AtmosphericScrollEngine.tsx',
  'src/components/atmosphere/CloudHorizonBank.tsx',
  'src/components/layout/Navbar.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/sections/Hero.tsx',
  'src/components/sections/About.tsx',
  'src/components/sections/Skills.tsx',
  'src/components/sections/Projects.tsx',
  'src/components/sections/Certificates.tsx',
  'src/components/sections/Contact.tsx',
  'src/components/ProjectModal.tsx',
  'src/components/CertificateModal.tsx',
  'src/components/ui/Modal.tsx',
  'src/components/ui/Section.tsx',
  'src/components/ui/SectionHeading.tsx',
  'src/components/ui/MagneticTilt.tsx',
  'src/index.css',
];

for (const f of requiredFiles) {
  assert(fs.existsSync(path.resolve(f)), `Component exists: ${f}`);
}

if (hasFailure) {
  console.error('\nVerification failed!');
  process.exit(1);
} else {
  console.log('\nAll Shinkai Katawaredoki Engine & Data Integrity checks passed!');
}
