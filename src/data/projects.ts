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
];
