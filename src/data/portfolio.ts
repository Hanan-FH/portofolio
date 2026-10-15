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
    eyebrow: "REKAYASA PERANGKAT LUNAK · SMK PLUS PELITA NUSANTARA",
    headline: "Software Engineering Student based in Bogor, Indonesia.",
    shortBio: "Halo, saya Hanan Fathurrozaq Hidayatullah. Siswa SMK Plus Pelita Nusantara jurusan Rekayasa Perangkat Lunak yang berfokus pada web development dan pemrograman.",
    location: "Bogor, Indonesia",
    status: "Siswa SMK Plus Pelita Nusantara",
    email: "hananfh77@gmail.com",
    profileImage: "/profile.jpg",
    resumeUrl: "",
  },

  social: {
    github: "https://github.com/Hanan-FH",
    linkedin: "",
    instagram: "",
    email: "mailto:hananfh77@gmail.com",
  },

  contact: {
    heading: "Hubungi Saya",
    subheading: "Terbuka untuk diskusi proyek, kolaborasi open-source, dan kesempatan magang. Silakan hubungi saya melalui formulir di bawah ini atau email langsung.",
    recipientEmail: "hananfh77@gmail.com",
    formSubmitEndpoint: "https://formsubmit.co/ajax/hananfh77@gmail.com",
  },

  about: {
    heading: "Fokus pada logika pemrograman dan pengembangan web.",
    paragraphs: [
      "Saya adalah siswa SMK Plus Pelita Nusantara jurusan Rekayasa Perangkat Lunak. Saya mempelajari dasar-dasar pemrograman, struktur data, dan pembuatan aplikasi web yang bersih serta responsif.",
      "Saya suka mencoba hal-hal baru dalam pemrograman dan mempraktikkan kode dengan struktur yang rapi dan mudah dirawat.",
    ],
    status: "Siswa Aktif SMK Plus Pelita Nusantara",
    currentFocus: "Pengembangan Aplikasi Web, HTML, CSS, JavaScript, React & Database",
    location: "Bogor, Jawa Barat, Indonesia",
  },

  expertise: [
    {
      number: "01",
      title: "Web Development",
      description: "Developing semantic, responsive, and high-performance web applications using modern HTML5, standard CSS, Vanilla JavaScript, React, and TypeScript.",
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

  skills: {
    languages: [
      {
        name: "Python",
        category: "PROGRAMMING LANGUAGE",
        description: "Desktop GUI (Tkinter), scripting, algoritma pemrograman, dan machine learning.",
        image: "/skills/python.svg",
        tag: "LANG // 01",
      },
      {
        name: "JavaScript",
        category: "PROGRAMMING LANGUAGE",
        description: "Web development modern, ES6+, DOM manipulation, dan asynchronous programming.",
        image: "/skills/javascript.svg",
        tag: "LANG // 02",
      },
      {
        name: "TypeScript",
        category: "TYPED LANGUAGE",
        description: "Static typing, modular interfaces, dan scalable frontend/backend development.",
        image: "/skills/typescript.svg",
        tag: "LANG // 03",
      },
      {
        name: "PHP",
        category: "BACKEND LANGUAGE",
        description: "Server-side scripting, OOP architecture, database CRUD, dan RESTful API.",
        image: "/skills/php.svg",
        tag: "LANG // 04",
      },
      {
        name: "Java",
        category: "OBJECT-ORIENTED LANGUAGE",
        description: "Konsep Object-Oriented Programming (OOP), abstraksi data, dan struktur logika.",
        image: "/skills/java.svg",
        tag: "LANG // 05",
      },
      {
        name: "C / C++",
        category: "SYSTEMS LANGUAGE",
        description: "Pemrograman sistem tingkat rendah, alokasi memori, dan penyelesaian masalah logis.",
        image: "/skills/cpp.svg",
        tag: "LANG // 06",
      },
      {
        name: "HTML5",
        category: "MARKUP LANGUAGE",
        description: "Struktur semantik web modern, SEO-friendly, dan standar aksesibilitas WCAG.",
        image: "/skills/html5.svg",
        tag: "LANG // 07",
      },
      {
        name: "CSS3",
        category: "STYLESHEET LANGUAGE",
        description: "Desain web responsif, Flexbox, Grid, animasi CSS, dan dark/light theming.",
        image: "/skills/css3.svg",
        tag: "LANG // 08",
      },
      {
        name: "SQL",
        category: "DATABASE QUERY LANGUAGE",
        description: "Query relasional, normalisasi basis data, JOIN, dan optimasi data relasional.",
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
      period: "2023 — Sekarang",
      institution: "SMK Plus Pelita Nusantara",
      program: "Rekayasa Perangkat Lunak (RPL)",
      description: "Mempelajari pemrograman web, basis data, algoritma & struktur data, serta pengembangan perangkat lunak.",
      status: "Siswa Aktif",
    },
  ],

  // Exactly 3 Projects
  projects: [
    {
      id: 1,
      title: "Mini Shop — 2D Store Simulator (Godot)",
      category: "GAME DEVELOPMENT",
      description: "Game simulasi toko 2D berbasis Godot Engine dengan tema Mini Shop. Dilengkapi mekanik manajemen inventaris, sistem buka/tutup toko, interaksi rak dan kasir, kontrol karakter WASD, serta alur operasional toko harian.",
      year: "2026",
      image: "/projects/mini-shop-godot.png",
      technologies: ["Godot Engine", "GDScript", "2D Pixel Art", "Game Loop"],
      liveUrl: "",
      githubUrl: "",
    },
    {
      id: 2,
      title: "Kalkulator Sederhana — Desktop GUI (Python)",
      category: "PYTHON DEVELOPMENT",
      description: "Aplikasi kalkulator berbasis desktop dengan antarmuka grafis (GUI) yang dibangun menggunakan bahasa pemrograman Python dan library Tkinter. Dilengkapi tombol angka, operasi aritmatika dasar (tambah, kurang, kali, bagi), tombol clear (C), dan evaluasi hasil perhitungan.",
      year: "2026",
      image: "/projects/kalkulator-python.png",
      technologies: ["Python", "Tkinter", "Desktop GUI", "OOP"],
      liveUrl: "",
      githubUrl: "",
    },
    {
      id: 3,
      title: "SIPANDU — Layanan Pengaduan Sekolah (Web CRUD)",
      category: "FULLSTACK CRUD WEB APP",
      description: "Sistem informasi layanan pengaduan sekolah terpadu berbasis web dengan pengelolaan tiket pengaduan komprehensif (CRUD). Dilengkapi dashboard analitik admin, monitoring distribusi kategori (Sarpras, Bullying, Akademik), klasifikasi tingkat urgensi otomatis, live feed tiket pengaduan, dan rekap pelaporan.",
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
      title: "Webinar Nasional: Seni Merespons Dengan Bijak untuk Membangun Komunikasi yang Nyaman",
      issuer: "Yayasan Galeria Potensi Indonesia",
      year: "2026",
      image: "/certificates/sertifikat-webinar-komunikasi-seni-merespons.png",
      verificationUrl: "/certificates/sertifikat-webinar-komunikasi-seni-merespons.png",
    },
    {
      id: 2,
      title: "Webinar Nasional: Bijak dalam Merespons untuk Membangun Komunikasi yang Nyaman",
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
      title: "Pemanfaatan Cloud Computing di Sektor Pendidikan",
      issuer: "LPPM STT Terpadu Nurul Fikri",
      year: "2025",
      image: "/certificates/sertifikat-cloud-computing-stt-nf.png",
      verificationUrl: "/certificates/sertifikat-cloud-computing-stt-nf.pdf",
    },
    {
      id: 5,
      title: "AI Skill Fest: Bangun Chatbot Buatanmu Sendiri dengan Microsoft Azure!",
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
      title: "Introduction to Capture the Flag",
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
