import fs from 'node:fs';
import path from 'node:path';
import { personalData, aboutData, socialData, contactData, skillsData } from '../src/data/profile.ts';
import { projectsData } from '../src/data/projects.ts';
import { certificatesData } from '../src/data/certificates.ts';

console.log('--- ARCHITECTURAL & DATA INTEGRITY VERIFICATION (KATAWAREDOKI) ---');

let hasFailure = false;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    hasFailure = true;
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

// 1. Projects Count (Exactly 3)
assert(projectsData.length === 3, `Expected exactly 3 projects, got ${projectsData.length}`);

// 2. Certificates Count (Exactly 10)
assert(certificatesData.length === 10, `Expected exactly 10 certificates, got ${certificatesData.length}`);

// 3. Curriculum Languages Count (Exactly 9)
assert(skillsData.languages.length === 9, `Expected exactly 9 curriculum languages, got ${skillsData.languages.length}`);

// 4. Profile Photo on disk
const profilePath = path.resolve('public', 'profile.jpg');
assert(fs.existsSync(profilePath), `Profile photo exists at ${profilePath}`);

// 5. Verify Project Images on disk
for (const prj of projectsData) {
  const imgPath = path.resolve('public', prj.image.replace(/^\//, ''));
  assert(fs.existsSync(imgPath), `Project image exists: ${prj.image}`);
}

// 6. Verify Certificate Images & Documents on disk
for (const cert of certificatesData) {
  const imgPath = path.resolve('public', cert.image.replace(/^\//, ''));
  const docPath = path.resolve('public', cert.verificationUrl.replace(/^\//, ''));
  assert(fs.existsSync(imgPath), `Certificate image exists: ${cert.image}`);
  assert(fs.existsSync(docPath), `Certificate verification document exists: ${cert.verificationUrl}`);
}

// 7. Verify Skill SVG Icons on disk
for (const lang of skillsData.languages) {
  const iconPath = path.resolve('public', lang.image.replace(/^\//, ''));
  assert(fs.existsSync(iconPath), `Language icon exists: ${lang.image}`);
}

// 8. SMK Plus Pelita Nusantara Foundations (4 disciplines)
assert(aboutData.fundamentals.length === 4, `Expected 4 foundation competencies, got ${aboutData.fundamentals.length}`);
assert(aboutData.fundamentals[0].id === '01', 'Discipline 01 present');
assert(aboutData.fundamentals[1].id === '02', 'Discipline 02 present');
assert(aboutData.fundamentals[2].id === '03', 'Discipline 03 present');
assert(aboutData.fundamentals[3].id === '04', 'Discipline 04 present');

// 9. Hero Connect Links
assert(personalData.name === 'Hanan Fathurrozaq Hidayatullah', 'Developer name preserved');
assert(socialData.github === 'https://github.com/Hanan-FH', 'GitHub link preserved');
assert(socialData.linkedin.includes('hanan-fathurrozaq'), 'LinkedIn link preserved');

// 10. Contact Endpoint
assert(contactData.formSubmitEndpoint === 'https://formsubmit.co/ajax/hananfh77@gmail.com', 'FormSubmit endpoint preserved');

// 11. Component file structure
const requiredFiles = [
  'AGENTS.md',
  'src/hooks/useReducedMotion.ts',
  'src/data/profile.ts',
  'src/data/projects.ts',
  'src/data/certificates.ts',
  'src/data/portfolio.ts',
  'src/components/atmosphere/CinematicIntro.tsx',
  'src/components/atmosphere/KatawareSkyBackdrop.tsx',
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
  assert(fs.existsSync(path.resolve(f)), `Architecture component exists: ${f}`);
}

if (hasFailure) {
  console.error('\nVerification failed!');
  process.exit(1);
} else {
  console.log('\nAll architectural & data integrity verification checks passed!');
}
