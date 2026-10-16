export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  year: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  year: string;
  image: string;
  verificationUrl: string;
}

export interface SkillLanguage {
  name: string;
  category: string;
  description: string;
  image: string;
  tag: string;
}

export const portfolioData = {
  personal: {
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
  },

  social: {
    github: "https://github.com/Hanan-FH",
    linkedin: "https://www.linkedin.com/in/hanan-fathurrozaq-3a643b427",
    instagram: "",
    email: "mailto:hananfh77@gmail.com",
  },

  contact: {
    heading: "Get in Touch",
    subheading: "Open for project inquiries, open-source collaboration, and internship opportunities. Feel free to contact me using the form below or via direct email.",
    recipientEmail: "hananfh77@gmail.com",
    formSubmitEndpoint: "https://formsubmit.co/ajax/hananfh77@gmail.com",
  },

  about: {
    heading: "Focusing on programming logic and modern web development.",
    paragraphs: [
      "I am a Software Engineering student at SMK Plus Pelita Nusantara. I study core programming fundamentals, data structures, and the engineering of clean, responsive web applications.",
      "I enjoy exploring new technologies and writing structured, maintainable code with attention to detail and performance.",
    ],
    status: "Active Software Engineering Student",
    currentFocus: "Web Application Development, TypeScript, React, Node.js & Databases",
    location: "Bogor, West Java, Indonesia",
  },

  skills: {
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
    ],
    frontend: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React", "Tailwind CSS"],
    backend: ["Node.js", "Express", "PHP", "Laravel", "Python", "REST APIs"],
    database: ["PostgreSQL", "MySQL", "SQLite", "Database Normalization"],
    programming: ["JavaScript", "TypeScript", "Python", "PHP", "Java", "C / C++"],
    tools: ["Git", "GitHub", "VS Code", "Postman", "Linux / Bash", "npm / pnpm"],
    design: ["Figma", "UI/UX Architecture", "WCAG 2.2 AA", "Design Systems"],
  },

  education: [
    {
      period: "2023 — Present",
      institution: "SMK Plus Pelita Nusantara",
      program: "Software Engineering (RPL)",
      description: "Comprehensive coursework covering web engineering, databases, algorithms, data structures, and modern software architectures.",
      status: "Active Student",
    },
  ],

  // Exactly 3 Projects
  projects: [
    {
      id: 1,
      title: "Mini Shop — 2D Store Simulator (Godot)",
      category: "GAME DEVELOPMENT",
      description: "A 2D store simulation game built with Godot Engine and GDScript. Features inventory management, daily store cycle mechanics, shelf and checkout interactions, WASD character navigation, and a streamlined operational loop.",
      year: "2026",
      image: "/projects/mini-shop-godot.png",
      technologies: ["Godot Engine", "GDScript", "2D Pixel Art", "Game Loop"],
      liveUrl: "",
      githubUrl: "",
    },
    {
      id: 2,
      title: "Simple Calculator — Desktop GUI (Python)",
      category: "PYTHON DEVELOPMENT",
      description: "A desktop calculator application engineered in Python using the Tkinter GUI library. Features arithmetic operations (addition, subtraction, multiplication, division), clear memory functions, and precise expression evaluation.",
      year: "2026",
      image: "/projects/kalkulator-python.png",
      technologies: ["Python", "Tkinter", "Desktop GUI", "OOP"],
      liveUrl: "",
      githubUrl: "",
    },
    {
      id: 3,
      title: "SIPANDU — School Incident & Complaint Portal (Web CRUD)",
      category: "FULLSTACK WEB APPLICATION",
      description: "An integrated school complaint and incident management system featuring comprehensive ticket lifecycles (CRUD). Includes an administrative analytics dashboard, automated urgency classification, category tracking, live activity feeds, and report generation.",
      year: "2026",
      image: "/projects/sipandu-layanan-pengaduan-sekolah.png",
      technologies: ["PHP", "MySQL", "Tailwind CSS", "JavaScript", "CRUD Architecture", "Analytics Dashboard"],
      liveUrl: "",
      githubUrl: "",
    },
  ] as Project[],

  // Exactly 10 Certificates
  certificates: [
    {
      id: 1,
      title: "National Webinar: The Art of Responding Wisely for Constructive Communication",
      issuer: "Yayasan Galeria Potensi Indonesia",
      year: "2026",
      image: "/certificates/sertifikat-webinar-komunikasi-seni-merespons.png",
      verificationUrl: "/certificates/sertifikat-webinar-komunikasi-seni-merespons.png",
    },
    {
      id: 2,
      title: "National Webinar: Mindful Communication and Wise Responses",
      issuer: "Yayasan Galeria Potensi Indonesia",
      year: "2026",
      image: "/certificates/sertifikat-webinar-komunikasi-bijak-merespons.png",
      verificationUrl: "/certificates/sertifikat-webinar-komunikasi-bijak-merespons.png",
    },
    {
      id: 3,
      title: "Micro-Frontend 101: Build, Deploy, and Communicate Between Apps",
      issuer: "Google Developer Group - Binus University Online",
      year: "2026",
      image: "/certificates/sertifikat-gdg-binus-micro-frontend.png",
      verificationUrl: "/certificates/sertifikat-gdg-binus-micro-frontend.png",
    },
    {
      id: 4,
      title: "Cloud Computing Utilization in the Education Sector",
      issuer: "LPPM STT Terpadu Nurul Fikri",
      year: "2025",
      image: "/certificates/sertifikat-cloud-computing-stt-nf.png",
      verificationUrl: "/certificates/sertifikat-cloud-computing-stt-nf.pdf",
    },
    {
      id: 5,
      title: "AI Skill Fest: Building Intelligent Chatbots with Microsoft Azure",
      issuer: "Trainocate",
      year: "2025",
      image: "/certificates/sertifikat-trainocate-ai-skill-fest-azure.png",
      verificationUrl: "/certificates/sertifikat-trainocate-ai-skill-fest-azure.png",
    },
    {
      id: 6,
      title: "Flutter in the Age of AI: From Developer to Product Thinker",
      issuer: "Google Developer Group - Binus University Online",
      year: "2026",
      image: "/certificates/sertifikat-gdg-binus-flutter-ai.png",
      verificationUrl: "/certificates/sertifikat-gdg-binus-flutter-ai.png",
    },
    {
      id: 7,
      title: "Data to Decisions: Navigating and Thriving in the Massive AI Shift",
      issuer: "Google Developer Group - Binus University Online",
      year: "2026",
      image: "/certificates/sertifikat-gdg-binus-data-to-decisions-ai.png",
      verificationUrl: "/certificates/sertifikat-gdg-binus-data-to-decisions-ai.png",
    },
    {
      id: 8,
      title: "Introduction to Capture the Flag (CTF)",
      issuer: "ID-Networkers (IDN.ID)",
      year: "2025",
      image: "/certificates/sertifikat-id-networkers-introduction-to-ctf.png",
      verificationUrl: "/certificates/sertifikat-id-networkers-introduction-to-ctf.png",
    },
    {
      id: 9,
      title: "Game Design: From Hobby to Hook - Hooked in Minutes, Engaged for Days",
      issuer: "Code Lamp Indonesia",
      year: "2025",
      image: "/certificates/sertifikat-codelamp-game-design.png",
      verificationUrl: "/certificates/sertifikat-codelamp-game-design.pdf",
    },
    {
      id: 10,
      title: "From Vision to Version 1.0: Roadmapping Your Game Effectively",
      issuer: "Code Lamp Indonesia",
      year: "2025",
      image: "/certificates/sertifikat-codelamp-roadmapping-your-game.png",
      verificationUrl: "/certificates/sertifikat-codelamp-roadmapping-your-game.pdf",
    },
  ] as Certificate[],
};
