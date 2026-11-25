export interface FoundationCompetency {
  id: string;
  title: string;
  localTitle: string;
  description: string;
}

export interface SkillLanguage {
  name: string;
  category: string;
  description: string;
  image: string;
  tag: string;
}

export interface EducationItem {
  period: string;
  institution: string;
  program: string;
  description: string;
  status: string;
}

export const personalData = {
  name: "Hanan Fathurrozaq Hidayatullah",
  role: "Software Engineering Student",
  eyebrow: "SOFTWARE ENGINEERING · SMK PLUS PELITA NUSANTARA",
  headline: "Software Engineering Student based in Bogor, Indonesia.",
  shortBio: "Software Engineering student at SMK Plus Pelita Nusantara building clean, fast web applications and structured software.",
  location: "Bogor, Indonesia",
  status: "Software Engineering Student at SMK Plus Pelita Nusantara",
  email: "hananfh77@gmail.com",
  profileImage: "/profile.jpg?v=addo",
  resumeUrl: "",
};

export const socialData = {
  github: "https://github.com/Hanan-FH",
  linkedin: "https://www.linkedin.com/in/hanan-fathurrozaq-3a643b427",
  instagram: "",
  email: "mailto:hananfh77@gmail.com",
};

export const contactData = {
  heading: "Get in Touch",
  subheading: "Open for software projects, open-source collaboration, and internship opportunities. Reach out below or via direct email.",
  recipientEmail: "hananfh77@gmail.com",
  formSubmitEndpoint: "https://formsubmit.co/ajax/hananfh77@gmail.com",
};

export const aboutData = {
  heading: "Clean logic. Fast, maintainable web software.",
  paragraphs: [
    "Focused on core algorithms, data structures, and full-stack engineering with sharp attention to interface craft and runtime speed.",
  ],
  status: "Active Software Engineering Student",
  currentFocus: "Web Application Development, TypeScript, React, Node.js & Databases",
  location: "Bogor, West Java, Indonesia",
  fundamentals: [
    {
      id: "01",
      title: "Advanced Software Development",
      localTitle: "Pemrograman Lanjut",
      description: "Object-oriented architecture, REST APIs, and clean, maintainable full-stack code.",
    },
    {
      id: "02",
      title: "Professional Graphic & UI/UX Design",
      localTitle: "Desain Grafis Profesional",
      description: "Editorial grids, high-contrast typography, and responsive interface systems.",
    },
    {
      id: "03",
      title: "Networking & System Security",
      localTitle: "Jaringan & Keamanan Sistem",
      description: "Network protocols, client-server architecture, and core system security.",
    },
    {
      id: "04",
      title: "Work Ethics & Professionalism",
      localTitle: "Etika Kerja & Profesionalisme",
      description: "Git workflows, concise documentation, and disciplined team delivery.",
    },
  ] as FoundationCompetency[],
};

export const skillsData = {
  languages: [
    {
      name: "Python",
      category: "PROGRAMMING LANGUAGE",
      description: "Tkinter desktop GUIs, automation scripts, and core algorithms.",
      image: "/skills/python.svg",
      tag: "LANG // 01",
    },
    {
      name: "JavaScript",
      category: "PROGRAMMING LANGUAGE",
      description: "ES6+ interactivity, async workflows, and modern DOM engineering.",
      image: "/skills/javascript.svg",
      tag: "LANG // 02",
    },
    {
      name: "TypeScript",
      category: "TYPED LANGUAGE",
      description: "Strict static typing for predictable, scalable web applications.",
      image: "/skills/typescript.svg",
      tag: "LANG // 03",
    },
    {
      name: "PHP",
      category: "BACKEND LANGUAGE",
      description: "Server-side OOP, MySQL CRUD systems, and REST endpoints.",
      image: "/skills/php.svg",
      tag: "LANG // 04",
    },
    {
      name: "Java",
      category: "OBJECT-ORIENTED LANGUAGE",
      description: "Object-oriented design, data abstraction, and algorithmic logic.",
      image: "/skills/java.svg",
      tag: "LANG // 05",
    },
    {
      name: "C / C++",
      category: "SYSTEMS LANGUAGE",
      description: "Low-level memory fundamentals and fast algorithmic problem solving.",
      image: "/skills/cpp.svg",
      tag: "LANG // 06",
    },
    {
      name: "HTML5",
      category: "MARKUP LANGUAGE",
      description: "Semantic document structure, SEO, and WCAG-compliant markup.",
      image: "/skills/html5.svg",
      tag: "LANG // 07",
    },
    {
      name: "CSS3",
      category: "STYLESHEET LANGUAGE",
      description: "Responsive grid layouts, token theming, and 60fps GPU motion.",
      image: "/skills/css3.svg",
      tag: "LANG // 08",
    },
    {
      name: "SQL",
      category: "DATABASE QUERY LANGUAGE",
      description: "Normalized relational schemas, joins, and indexed query design.",
      image: "/skills/sql.svg",
      tag: "LANG // 09",
    },
  ] as SkillLanguage[],
  frontend: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React", "Tailwind CSS"],
  backend: ["Node.js", "Express", "PHP", "Laravel", "Python", "REST APIs"],
  database: ["PostgreSQL", "MySQL", "SQLite", "Database Normalization"],
  programming: ["JavaScript", "TypeScript", "Python", "PHP", "Java", "C / C++"],
  tools: ["Git", "GitHub", "VS Code", "Postman", "Linux / Bash", "npm / pnpm"],
  design: ["Figma", "UI/UX Architecture", "WCAG 2.2 AA", "Design Systems"],
};

export const educationData: EducationItem[] = [
  {
    period: "2023 — Present",
    institution: "SMK Plus Pelita Nusantara",
    program: "Software Engineering (RPL)",
    description: "Hands-on training in full-stack web engineering, relational databases, algorithms, and software architecture.",
    status: "Active Student",
  },
];
