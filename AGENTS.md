# AGENTS.md - High-Fidelity UI/UX & Motion Specifications

## 1. Core Identity & Visual Language (Crucial Update)

### A. Reverted Color Palette (Dynamic Duo)
Instruksi Utama: Kembalikan skema warna ke identitas asli yang *bold* dan kontras tinggi. Warna profesional biru tua sebelumnya **DIPHASE-OUT** dan diganti dengan kombinasi dinamis Hitam dan Biru Terang.

| Element | Hex Code | Usage context |
| :--- | :--- | :--- |
| **Primary Base** | `#000000` (Pure Black) | Background utama, area kanvas portfolio, container navbar. |
| **Accent Tech** | `#00D1FF` (Electric Cyan Blue) | Glow highlights, active states, hover effects, particle colors, borders. |
| **Text Primary** | `#FFFFFF` (Pure White) | Headings, primary links (nav), main descriptions. |
| **Text Secondary**| `#A0AEC0` (Cool Gray) | Metadata, sub-points, inactive states. |

### B. Typography & Brand
- **Font:** Inter atau Montserrat (Geometric Sans-Serif), dikombinasikan dengan JetBrains Mono untuk label teknis.
- **Brand Identity:** HANAN Personal Portfolio & Professional Hub.

---

## 2. Navigation Bar UI/UX Specification

### Layout & Placement
- **Header Structure:** Sticky / Fixed Top Bar (`height: 70px`, `backdrop-filter: blur(12px)` dengan background semi-transparan Pure Black `rgba(0, 0, 0, 0.88)`).
- **Left Alignment (Brand Logo):**
  - Place the logo/text `"HANAN"` at the absolute far-left section with clean padding (`padding-left: 2rem` or `32px`).
  - Maintain a modern geometric typography scale with an integrated Electric Cyan Blue (`#00D1FF`) icon mark.
- **Right Alignment (Navigation Links):**
  - Links: `Home`, `Profile`, `Portfolio`, `Contact`.
  - Right padding (`padding-right: 2rem`).
  - Active state marker (`Portfolio` active): Highlighted with Electric Cyan Blue (`#00D1FF`) text and a smooth bottom glow border (`2px solid #00D1FF`).

---

## 3. Anti-Gravity / Complex UI Physics Animation Engine

### Key Features
1. **Entrance Transition to Portfolio Section:**
   - **Trigger:** Page load / Scroll entrance / Tab selection.
   - **Physics Effect:** Interactive Anti-Gravity Floating Particle Burst.
   - **Behavior:** 3D UI cards, code blocks, and project tiles float gently upward in a zero-gravity environment with fluid motion, subtle depth-of-field blur, and mouse-parallax responsiveness.

2. **Animation Specs (CSS / Three.js / Motion Canvas):**
   - **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (Fluid Apple-style spring physics).
   - **Particle Dispersion:** 3D glowing Electric Cyan (`#00D1FF`) nodes disperse dynamically from the desktop workspace upon interaction, floating outwards before settling into structured grid alignment.
   - **Hover Interaction:** High-precision magnetic tilt on desktop view cards with smooth drop-shadow lighting response (`box-shadow: 0 20px 40px rgba(0, 209, 255, 0.18)`).

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
/* Color Palette Variables (Dynamic Duo) */
:root {
  --bg-primary: #000000;
  --nav-bg: rgba(0, 0, 0, 0.88);
  --text-primary: #ffffff;
  --text-secondary: #a0aec0;
  --accent-tech: #00d1ff;
  --accent-blue: #00d1ff;
  --accent-cyan: #00d1ff;
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
