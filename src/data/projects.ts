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

// Exactly 3 Real Projects (IDs 1-3)
export const projectsData: Project[] = [
  {
    id: 1,
    title: "Mini Shop — 2D Store Simulator (Godot)",
    category: "GAME DEVELOPMENT",
    description: "2D store simulator built in Godot and GDScript featuring daily inventory cycles, shelf restocking, and interactive checkout gameplay.",
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
    description: "Clean Python and Tkinter desktop calculator built for fast arithmetic, memory controls, and accurate expression evaluation.",
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
    description: "Full-stack school complaint portal with end-to-end CRUD ticketing, automated urgency triage, live status tracking, and admin analytics.",
    year: "2026",
    image: "/projects/sipandu-layanan-pengaduan-sekolah.png",
    technologies: ["PHP", "MySQL", "Tailwind CSS", "JavaScript", "CRUD Architecture", "Analytics Dashboard"],
    liveUrl: "",
    githubUrl: "",
  },
];
