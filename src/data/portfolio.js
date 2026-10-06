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
    eyebrow: "REKAYASA PERANGKAT LUNAK · SMK PLUS PELITA NUSANTARA",
    headline: "Software Engineering Student based in Bogor, Indonesia.",
    shortBio: "Halo, saya Hanan Fathurrozaq Hidayatullah. Siswa SMK Plus Pelita Nusantara jurusan Rekayasa Perangkat Lunak yang berfokus pada web development dan pemrograman.",
    location: "Bogor, Indonesia",
    status: "Siswa SMK Plus Pelita Nusantara",
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
    heading: "Hubungi Saya",
    subheading: "Terbuka untuk diskusi proyek, kolaborasi open-source, dan kesempatan magang. Silakan hubungi saya melalui formulir di bawah ini atau email langsung.",
    recipientEmail: "hananfh77@gmail.com",
    formSubmitEndpoint: "https://formsubmit.co/ajax/hananfh77@gmail.com",
  },

  // ============================================================================
  // 3. ABOUT SECTION
  // ============================================================================
  about: {
    heading: "Fokus pada logika pemrograman dan pengembangan web.",
    paragraphs: [
      "Saya adalah siswa SMK Plus Pelita Nusantara jurusan Rekayasa Perangkat Lunak. Saya mempelajari dasar-dasar pemrograman, struktur data, dan pembuatan aplikasi web yang bersih serta responsif.",
      "Saya suka mencoba hal-hal baru dalam pemrograman dan mempraktikkan kode dengan struktur yang rapi dan mudah dirawat.",
    ],
    status: "Siswa Aktif SMK Plus Pelita Nusantara",
    currentFocus: "Pengembangan Aplikasi Web, HTML, CSS, JavaScript & Database",
    location: "Bogor, Jawa Barat, Indonesia",
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
      period: "2023 — Sekarang",
      institution: "SMK Plus Pelita Nusantara",
      program: "Rekayasa Perangkat Lunak (RPL)",
      description: "Mempelajari pemrograman web, basis data, algoritma & struktur data, serta pengembangan perangkat lunak.",
      status: "Siswa Aktif",
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
