import fs from 'node:fs';
import path from 'node:path';
import { portfolioData } from '../src/data/portfolio.ts';
import { personalData, aboutData } from '../src/data/profile.ts';
import { projectsData } from '../src/data/projects.ts';
import { certificatesData } from '../src/data/certificates.ts';

console.log('--- ARCHITECTURAL & DATA INTEGRITY VERIFICATION ---');

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
assert(portfolioData.projects.length === 3, `portfolioData.projects length is 3`);

// 2. Certificates Count (Exactly 10)
assert(certificatesData.length === 10, `Expected exactly 10 certificates, got ${certificatesData.length}`);
assert(portfolioData.certificates.length === 10, `portfolioData.certificates length is 10`);

// 3. Profile Photo on disk
const profilePath = path.resolve('public', 'profile.jpg');
assert(fs.existsSync(profilePath), `Profile photo exists at ${profilePath}`);

// 4. Verify Project Images on disk
for (const prj of projectsData) {
  const imgPath = path.resolve('public', prj.image.replace(/^\//, ''));
  assert(fs.existsSync(imgPath), `Project image exists: ${prj.image}`);
}

// 5. Verify Certificate Images on disk
for (const cert of certificatesData) {
  const imgPath = path.resolve('public', cert.image.replace(/^\//, ''));
  assert(fs.existsSync(imgPath), `Certificate image exists: ${cert.image}`);
}

// 6. SMK Plus Pelita Nusantara Foundations (4 disciplines)
assert(aboutData.fundamentals.length === 4, `Expected 4 foundation competencies, got ${aboutData.fundamentals.length}`);
assert(aboutData.fundamentals[0].id === '01', 'Discipline 01 present');
assert(aboutData.fundamentals[1].id === '02', 'Discipline 02 present');
assert(aboutData.fundamentals[2].id === '03', 'Discipline 03 present');
assert(aboutData.fundamentals[3].id === '04', 'Discipline 04 present');

// 7. Hero Connect Links
assert(personalData.name === 'Hanan Fathurrozaq Hidayatullah', 'Developer name correct');
assert(portfolioData.social.github === 'https://github.com/Hanan-FH', 'GitHub link present');
assert(portfolioData.social.linkedin.includes('hanan-fathurrozaq'), 'LinkedIn link present');

// 8. Contact Endpoint
assert(portfolioData.contact.formSubmitEndpoint === 'https://formsubmit.co/ajax/hananfh77@gmail.com', 'FormSubmit endpoint correct');

// 9. Component file structure
const requiredFiles = [
  'src/hooks/useReducedMotion.ts',
  'src/hooks/usePointerCapability.ts',
  'src/data/profile.ts',
  'src/data/projects.ts',
  'src/data/certificates.ts',
  'src/data/portfolio.ts',
  'src/components/layout/Navbar.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/sections/Hero.tsx',
  'src/components/sections/About.tsx',
  'src/components/sections/Skills.tsx',
  'src/components/sections/Projects.tsx',
  'src/components/sections/Certificates.tsx',
  'src/components/sections/Contact.tsx',
  'src/components/galaxy/GalaxyScene.tsx',
  'src/components/galaxy/SceneFallback.tsx',
  'src/components/galaxy/Starfield.tsx',
  'src/components/galaxy/CometCursor.tsx',
  'src/components/galaxy/GalaxyErrorBoundary.tsx',
  'src/components/ui/Button.tsx',
  'src/components/ui/SectionHeading.tsx',
  'src/components/ui/LoadingIndicator.tsx',
  'src/styles/globals.css',
];

for (const f of requiredFiles) {
  assert(fs.existsSync(path.resolve(f)), `Architecture component exists: ${f}`);
}

if (hasFailure) {
  console.error('\nVerification failed!');
  process.exit(1);
} else {
  console.log('\nAll architectural verification checks passed successfully!');
}
