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
  shortBio: "Hello, I am Hanan Fathurrozaq Hidayatullah. A Software Engineering student at SMK Plus Pelita Nusantara focused on modern web development and programming.",
  location: "Bogor, Indonesia",
  status: "Software Engineering Student at SMK Plus Pelita Nusantara",
  email: "hananfh77@gmail.com",
  profileImage: "/profile.jpg",
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
  subheading: "Open for project inquiries, open-source collaboration, and internship opportunities. Feel free to contact me using the form below or via direct email.",
  recipientEmail: "hananfh77@gmail.com",
  formSubmitEndpoint: "https://formsubmit.co/ajax/hananfh77@gmail.com",
};

export const aboutData = {
  heading: "Focusing on programming logic and modern web development.",
  paragraphs: [
    "I am a Software Engineering student at SMK Plus Pelita Nusantara. I study core programming fundamentals, data structures, and the engineering of clean, responsive web applications.",
    "I enjoy exploring new technologies and writing structured, maintainable code with attention to detail and performance.",
  ],
  status: "Active Software Engineering Student",
  currentFocus: "Web Application Development, TypeScript, React, Node.js & Databases",
  location: "Bogor, West Java, Indonesia",
  fundamentals: [
    {
      id: "01",
      title: "Advanced Software Development",
      localTitle: "Pemrograman Lanjut",
      description: "Modern web architectures, Object-Oriented Programming (OOP), RESTful API integration, and clean code standards.",
    },
    {
      id: "02",
      title: "Professional Graphic & UI/UX Design",
      localTitle: "Desain Grafis Profesional",
      description: "Visual hierarchy, grid layouts, typography principles, color theory, and responsive design systems.",
    },
    {
      id: "03",
      title: "Networking & System Security",
      localTitle: "Jaringan & Keamanan Sistem",
      description: "Network protocols, cybersecurity fundamentals, server environments, and client-server communication.",
    },
    {
      id: "04",
      title: "Work Ethics & Professionalism",
      localTitle: "Etika Kerja & Profesionalisme",
      description: "Agile collaboration, industry standard workflows, version control with Git, and technical documentation.",
    },
  ] as FoundationCompetency[],
};

export const skillsData = {
  languages: [
    {
      name: "Python",
      category: "PROGRAMMING LANGUAGE",
      description: "Desktop GUI (Tkinter), scripting, algorithms, and applied machine learning.",
      image: "/skills/python.svg",
      tag: "LANG // 01",
    },
    {
      name: "JavaScript",
      category: "PROGRAMMING LANGUAGE",
      description: "Modern web development, ES6+, DOM manipulation, and asynchronous architectures.",
      image: "/skills/javascript.svg",
      tag: "LANG // 02",
    },
    {
      name: "TypeScript",
      category: "TYPED LANGUAGE",
      description: "Static typing, scalable interfaces, and robust full-stack development.",
      image: "/skills/typescript.svg",
      tag: "LANG // 03",
    },
    {
      name: "PHP",
      category: "BACKEND LANGUAGE",
      description: "Server-side scripting, OOP architecture, database CRUD, and RESTful APIs.",
      image: "/skills/php.svg",
      tag: "LANG // 04",
    },
    {
      name: "Java",
      category: "OBJECT-ORIENTED LANGUAGE",
      description: "Object-Oriented Programming (OOP), data abstraction, and algorithmic structures.",
      image: "/skills/java.svg",
      tag: "LANG // 05",
    },
    {
      name: "C / C++",
      category: "SYSTEMS LANGUAGE",
      description: "Systems programming, memory management, and low-level algorithmic problem solving.",
      image: "/skills/cpp.svg",
      tag: "LANG // 06",
    },
    {
      name: "HTML5",
      category: "MARKUP LANGUAGE",
      description: "Semantic web structure, search engine optimization (SEO), and WCAG accessibility standards.",
      image: "/skills/html5.svg",
      tag: "LANG // 07",
    },
    {
      name: "CSS3",
      category: "STYLESHEET LANGUAGE",
      description: "Modern responsive design, Flexbox, Grid, CSS animations, and token-based theming.",
      image: "/skills/css3.svg",
      tag: "LANG // 08",
    },
    {
      name: "SQL",
      category: "DATABASE QUERY LANGUAGE",
      description: "Relational queries, database normalization, schema design, and index optimization.",
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
    description: "Comprehensive coursework covering web engineering, databases, algorithms, data structures, and modern software architectures.",
    status: "Active Student",
  },
];
