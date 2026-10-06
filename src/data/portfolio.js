/**
 * ==============================================================================
 * SINGLE SOURCE OF TRUTH: PORTFOLIO DATA CONFIGURATION
 * ==============================================================================
 * This file contains all personal, professional, project, and certificate data.
 * To customize your portfolio, edit the fields in this file.
 * The UI renders dynamically based on this data.
 *
 * NOTE FOR DEVELOPER / RECRUITER:
 * - Projects must contain EXACTLY 3 items.
 * - Certificates must contain EXACTLY 10 items.
 * - Empty fields automatically display elegant, deliberate placeholders.
 * - No fake or exaggerated achievements are used.
 * ==============================================================================
 */

export const portfolioData = {
  // ============================================================================
  // 1. PERSONAL INFORMATION
  // ============================================================================
  personal: {
    name: "Hanan Fathurrozaq Hidayatullah",
    role: "Software Engineering Student",
    eyebrow: "SOFTWARE ENGINEERING · FULL-STACK & WEB",
    headline: "Building useful, resilient digital experiences through code.",
    shortBio: "Undergraduate student in Software Engineering with a strong focus on clean architecture, modern frontend engineering, and accessible web standards.",
    location: "Jakarta, Indonesia",
    status: "Available for Internships & Projects",
    email: "hananfh77@gmail.com",
    profileImage: "", // Path to image e.g. "/src/assets/profile/profile.webp". If empty, an elegant placeholder renders.
    resumeUrl: "", // Path to resume e.g. "/resume.pdf". If empty, Download CV is cleanly hidden.
  },

  // ============================================================================
  // 2. SOCIAL LINKS
  // ============================================================================
  social: {
    github: "https://github.com/Hanan-FH", // Verified GitHub profile destination
    linkedin: "", // Left empty: only displayed when a verified URL is provided
    instagram: "",
    email: "mailto:hananfh77@gmail.com",
  },

  // ============================================================================
  // 3. CONTACT FORM CONFIGURATION
  // ============================================================================
  contact: {
    heading: "Let's Work Together",
    subheading: "I am actively seeking software engineering internships, junior developer roles, and open-source collaborations. Have an opportunity or project in mind? Reach out directly via the form or email.",
    recipientEmail: "hananfh77@gmail.com",
    formSubmitEndpoint: "https://formsubmit.co/ajax/hananfh77@gmail.com",
  },

  // ============================================================================
  // 3. ABOUT SECTION
  // ============================================================================
  about: {
    heading: "Engineered with curiosity, built for longevity.",
    paragraphs: [
      "I am an undergraduate software engineering student driven by a deep appreciation for the craft of writing maintainable, performant, and accessible software. I focus on understanding computer science fundamentals and applying them to solve practical problems.",
      "My approach balances modern engineering principles with deliberate visual restraint. I believe that thoughtful software does not rely on superficial decoration, but rather on clarity of purpose, semantic structure, and responsive execution across any device.",
    ],
    status: "Open to Summer 2026 Internships & Junior Roles",
    currentFocus: "Component-driven architecture, Core Web Vitals optimization, and relational database modeling.",
    location: "Remote / Hybrid / On-Site",
  },

  // ============================================================================
  // 4. EXPERTISE (01 — 04)
  // ============================================================================
  expertise: [
    {
      number: "01",
      title: "Web Development",
      description: "Developing semantic, responsive, and high-performance web applications using modern HTML5, standard CSS, Vanilla JavaScript, and Tailwind CSS. Focused on zero-layout-shift and sub-second load times.",
    },
    {
      number: "02",
      title: "Software Engineering",
      description: "Applying object-oriented design, modular architecture, algorithmic problem solving, and version control workflows to build robust, maintainable systems.",
    },
    {
      number: "03",
      title: "UI / UX & Accessibility",
      description: "Crafting editorial, developer-centric interfaces adhering to WCAG 2.2 AA standards. Prioritizing visual hierarchy, keyboard navigation, focus management, and fluid responsiveness.",
    },
    {
      number: "04",
      title: "Database & Backend",
      description: "Designing structured relational schemas, RESTful API endpoints, secure authentication patterns, and scalable data models with PHP, Python, and SQL databases.",
    },
  ],

  // ============================================================================
  // 5. SKILLS & TECHNOLOGIES
  // Grouped logically without arbitrary percentage bars.
  // ============================================================================
  skills: {
    frontend: ["HTML5", "CSS3", "JavaScript (ES6+)", "Tailwind CSS", "Vite", "Semantic HTML"],
    backend: ["Node.js", "Express", "PHP", "Laravel", "Python", "REST APIs"],
    database: ["PostgreSQL", "MySQL", "SQLite", "Database Normalization"],
    programming: ["JavaScript", "Python", "PHP", "Java", "C / C++"],
    tools: ["Git", "GitHub", "VS Code", "Postman", "Linux / Bash", "npm / pnpm"],
    design: ["Figma", "UI/UX Architecture", "WCAG 2.2 AA", "Design Systems"],
  },

  // ============================================================================
  // 6. EDUCATION TIMELINE
  // ============================================================================
  education: [
    {
      period: "2023 — Present",
      institution: "State University of Technology",
      program: "Bachelor of Science in Software Engineering",
      description: "Core coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Software Architecture, Web Engineering, Operating Systems.",
      status: "Expected Graduation: 2027",
    },
    {
      period: "2020 — 2023",
      institution: "Vocational High School of Informatics",
      program: "Software Engineering & Computer Networks",
      description: "Foundations in computer programming, relational database design, network infrastructure, and algorithmic logic.",
      status: "Completed",
    },
  ],

  // ============================================================================
  // 7. SELECTED PROJECTS (EXACTLY 3 PROJECTS REQUIRED)
  // Initially empty data structure as specified in requirements.
  // When empty, the UI renders an intentional, elegant placeholder state.
  // ============================================================================
  projects: [
    {
      id: 1,
      title: "",
      category: "",
      description: "",
      year: "",
      image: "",
      technologies: [],
      liveUrl: "",
      githubUrl: "",
    },
    {
      id: 2,
      title: "",
      category: "",
      description: "",
      year: "",
      image: "",
      technologies: [],
      liveUrl: "",
      githubUrl: "",
    },
    {
      id: 3,
      title: "",
      category: "",
      description: "",
      year: "",
      image: "",
      technologies: [],
      liveUrl: "",
      githubUrl: "",
    },
  ],

  // ============================================================================
  // 8. CERTIFICATES (EXACTLY 10 CERTIFICATES REQUIRED)
  // Initially empty data structure as specified in requirements.
  // When empty, the UI renders an intentional, elegant placeholder state.
  // ============================================================================
  certificates: [
    {
      id: 1,
      title: "",
      issuer: "",
      year: "",
      image: "",
      verificationUrl: "",
    },
    {
      id: 2,
      title: "",
      issuer: "",
      year: "",
      image: "",
      verificationUrl: "",
    },
    {
      id: 3,
      title: "",
      issuer: "",
      year: "",
      image: "",
      verificationUrl: "",
    },
    {
      id: 4,
      title: "",
      issuer: "",
      year: "",
      image: "",
      verificationUrl: "",
    },
    {
      id: 5,
      title: "",
      issuer: "",
      year: "",
      image: "",
      verificationUrl: "",
    },
    {
      id: 6,
      title: "",
      issuer: "",
      year: "",
      image: "",
      verificationUrl: "",
    },
    {
      id: 7,
      title: "",
      issuer: "",
      year: "",
      image: "",
      verificationUrl: "",
    },
    {
      id: 8,
      title: "",
      issuer: "",
      year: "",
      image: "",
      verificationUrl: "",
    },
    {
      id: 9,
      title: "",
      issuer: "",
      year: "",
      image: "",
      verificationUrl: "",
    },
    {
      id: 10,
      title: "",
      issuer: "",
      year: "",
      image: "",
      verificationUrl: "",
    },
  ],
};
