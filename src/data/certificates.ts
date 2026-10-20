export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  year: string;
  image: string;
  verificationUrl: string;
}

// Exactly 10 Accredited Certificates (IDs 1-10)
export const certificatesData: Certificate[] = [
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
];
