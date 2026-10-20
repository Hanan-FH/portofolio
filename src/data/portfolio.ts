import {
  aboutData,
  contactData,
  educationData,
  personalData,
  skillsData,
  socialData,
  type EducationItem,
  type FoundationCompetency,
  type SkillLanguage,
} from './profile';
import { projectsData, type Project } from './projects';
import { certificatesData, type Certificate } from './certificates';

export type {
  FoundationCompetency,
  SkillLanguage,
  EducationItem,
  Project,
  Certificate,
};

export {
  personalData,
  socialData,
  contactData,
  aboutData,
  skillsData,
  educationData,
  projectsData,
  certificatesData,
};

export const portfolioData = {
  personal: personalData,
  social: socialData,
  contact: contactData,
  about: aboutData,
  skills: skillsData,
  education: educationData,
  projects: projectsData,
  certificates: certificatesData,
};

export default portfolioData;
