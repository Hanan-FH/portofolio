# AGENTS.md - System & Design Specifications

## 1. Executive Summary & Brand Identity
- **Brand Identity:** HANAN Personal Portfolio & Professional Hub.
- **Color Palette Strategy:**
  - **Primary Base:** Deep Navy Blue (`#0B192C` / `#1E3A8A`) replacing all legacy yellow/gold accents.
  - **Secondary / Accent:** Tech Cyan / Electric Blue (`#3B82F6` / `#06B6D4`) for highlights and active UI states.
  - **Text Colors:**
    - High contrast Crisp White (`#FFFFFF`) for key headlines and primary navigation links.
    - Soft Muted Blue-Gray (`#94A3B8`) for secondary descriptive text and metadata.
  - **Background / Canvas:** Dark Slate Navy (`#020617` / `#0F172A`) to ensure a polished dark-mode aesthetic.

---

## 2. Navigation Bar UI/UX Specification

### Layout & Placement
- **Header Structure:** Sticky / Fixed Top Bar (`height: 70px`, `backdrop-filter: blur(12px)` with semi-transparent navy background).
- **Left Alignment (Brand Logo):**
  - Place the logo/text `"HANAN"` at the absolute far-left section with clean padding (`padding-left: 2rem` or `32px`).
  - Maintain a modern geometric typography scale with an integrated blue icon mark.
- **Right Alignment (Navigation Links):**
  - Links: `Home`, `Profile`, `Portfolio`, `Contact`.
  - Right padding (`padding-right: 2rem`).
  - Active state marker (`Portfolio` active): Subtly highlighted with electric blue text and a smooth bottom glow border (`2px solid #3B82F6`).

---

## 3. Anti-Gravity / Complex UI Physics Animation Engine

### Key Features
1. **Entrance Transition to Portfolio Section:**
   - **Trigger:** Page load / Scroll entrance / Tab selection.
   - **Physics Effect:** Interactive Anti-Gravity Floating Particle Burst.
   - **Behavior:** 3D UI cards, code blocks, and project tiles float gently upward in a zero-gravity environment with fluid motion, subtle depth-of-field blur, and mouse-parallax responsiveness.

2. **Animation Specs (CSS / Three.js / Motion Canvas):**
   - **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (Fluid Apple-style spring physics).
   - **Particle Dispersion:** 3D glowing nodes disperse dynamically from the desktop workspace upon interaction, floating outwards before settling into structured grid alignment.
   - **Hover Interaction:** High-precision magnetic tilt on desktop view cards with smooth drop-shadow lighting response (`box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15)`).

---

## 4. Academic & Professional Foundation Integration

### Core Module: SMK Plus Pelita Nusantara Fundamentals
Integrate a dedicated floating badge or structured glassmorphic card showcasing foundational technical competencies from **SMK Plus Pelita Nusantara**:

1. **Advanced Software Development (Pemrograman Lanjut):** Modern Web Architectures, OOP, API Integration, Clean Code Standards.
2. **Professional Graphic & UI/UX Design (Desain Grafis Profesional):** Visual Hierarchy, Layout Design, Typography, Color Theory, Motion Graphics.
3. **Networking & System Security (Jaringan & Keamanan Sistem):** Network Protocols, Cybersecurity Fundamentals, Server Management.
4. **Work Ethics & Professionalism (Etika Kerja & Profesionalisme):** Agile Collaboration, Industry Standard Workflows, Technical Documentation.

---

## 5. Technical Implementation Guidelines

### Front-End Code Architecture
```css
/* Color Palette Variables */
:root {
  --bg-primary: #020617;
  --nav-bg: rgba(11, 25, 44, 0.85);
  --text-primary: #ffffff;
  --text-secondary: #94a3b8;
  --accent-blue: #3b82f6;
  --accent-cyan: #06b6d4;
}

/* Navbar Layout Settings */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2.5rem;
  background: var(--nav-bg);
  backdrop-filter: blur(12px);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: 0.05em;
}
```

---

## 6. Portfolio Data & Content Integrity Rules
- **Single Source of Truth (`src/data/portfolio.ts`):** All dynamic content (personal info, social links, SMK Plus Pelita Nusantara fundamentals, skills, education, projects, certificates) is centralized in `src/data/portfolio.ts`.
- **Exact Counts:** Maintain **EXACTLY 3 PROJECTS** (IDs 1–3) and **EXACTLY 10 CERTIFICATES** (IDs 1–10).
- **Hero Connect Links:** Located exclusively in the Hero section in the order **GitHub ↗** (`https://github.com/Hanan-FH`) and **LinkedIn ↗** (`https://www.linkedin.com/in/hanan-fathurrozaq-3a643b427`).
- **Contact Form:** Powered by FormSubmit AJAX (`https://formsubmit.co/ajax/hananfh77@gmail.com`) with accessible status states and `mailto:hananfh77@gmail.com` fallback.
