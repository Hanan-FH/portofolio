# AGENTS.md — System Source of Truth for AI Coding Agents

## 1. Project Overview
This repository contains a high-performance, accessible, production-grade personal developer portfolio website designed for an undergraduate Software Engineering / Computer Science student. It is built with visual restraint, editorial typography, and high technical quality, avoiding generic SaaS templates or AI-generated design clichés.

---

## 2. Design Philosophy
- **Minimalist & Restrained**: Every visual element serves a purpose. No superfluous glow effects, purple gradients, giant rounded cards, or floating decorative blobs.
- **Editorial Typography**: Inter for clean body copy, JetBrains Mono for system metrics, numbers, code tags, and dates. Clear typographic hierarchy.
- **Developer-Oriented Visual Language**: Technical status indicators, monospaced system telemetry, numbered sections (`// 01`, `PRJ 01`, `CERT 01`), and subtle geometric dividers.
- **High Performance & Accessibility**: Zero heavy framework dependencies, WCAG 2.2 AA compliant contrast and navigation, native browser APIs.

---

## 3. Technology Stack
- **HTML5**: Semantic markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<dialog>`, `<footer>`).
- **Tailwind CSS (v3)**: Configured via PostCSS. Light mode and Dark mode using the `class` strategy.
- **Vanilla JavaScript (ES6+ Modules)**: Modular architecture with zero framework runtime overhead.
- **Vite (v6)**: Fast local development server, ES module bundling, and optimized production builds.
- **Lucide Icons**: Featherweight vector icons instantiated via standard SVG injection.

> **CRITICAL RULE**: Do NOT introduce React, Vue, Angular, jQuery, Tailwind CDN, or heavyweight animation libraries (e.g. GSAP, Framer Motion) into this project.

---

## 4. Folder Structure & Directory Map
```
website/
├── public/
│   ├── favicon.svg             # Minimalist SVG code monogram favicon
│   ├── robots.txt              # Production search engine crawler rules
│   ├── site.webmanifest        # PWA / web application manifest
│   └── resume.pdf              # (Optional) User's PDF resume download
│
├── src/
│   ├── assets/
│   │   ├── profile/
│   │   │   └── profile.webp    # User's professional portrait (800x1000px WebP)
│   │   ├── projects/
│   │   │   ├── project-01.webp # Project 01 screenshot (800x480px WebP)
│   │   │   ├── project-02.webp # Project 02 screenshot (800x480px WebP)
│   │   │   └── project-03.webp # Project 03 screenshot (800x480px WebP)
│   │   └── certificates/
│   │       ├── certificate-01.webp through certificate-10.webp
│   │
│   ├── data/
│   │   └── portfolio.js        # SINGLE SOURCE OF TRUTH for all dynamic content
│   │
│   ├── js/
│   │   ├── main.js             # Orchestrator: DOM hydration, Lucide icons
│   │   ├── navigation.js       # Sticky scroll, mobile menu, theme toggle, CV
│   │   ├── projects.js         # EXACTLY 3 projects dynamic renderer
│   │   ├── certificates.js     # EXACTLY 10 certificates renderer & modal
│   │   └── animations.js       # Native IntersectionObserver scroll reveals
│   │
│   ├── styles/
│   │   └── main.css            # Tailwind directives, CSS theme variables, reset
│   │
│   └── index.html              # Core HTML structure & SEO metadata
│
├── .gitignore                  # Git ignore rules
├── AGENTS.md                   # This instruction file
├── package.json                # Project dependencies and build scripts
├── postcss.config.js           # PostCSS Tailwind and Autoprefixer config
├── tailwind.config.js          # Tailwind theme tokens & color palette
├── vite.config.js              # Vite bundler configuration
└── README.md                   # User setup and deployment documentation
```

---

## 5. Single Source of Truth (`src/data/portfolio.js`)
All editable content is centralized inside `src/data/portfolio.js`.
The HTML template must NEVER contain hardcoded personal data or duplicated project/certificate cards.

### Core Data Keys:
1. `personal`: Full name, role, eyebrow, headline, shortBio, location, status, email, profileImage, resumeUrl.
2. `social`: GitHub, LinkedIn, Instagram, Email.
3. `about`: Editorial headline, paragraphs, system telemetry specs.
4. `expertise`: Exactly 4 specializations (01 Web Dev, 02 Software Dev, 03 UI/UX, 04 Database & Backend).
5. `skills`: Grouped by category (`frontend`, `backend`, `database`, `programming`, `tools`, `design`). No fake progress bars.
6. `education`: Minimal academic history timeline items.
7. `projects`: **EXACTLY 3 PROJECTS** (IDs 1, 2, 3).
8. `certificates`: **EXACTLY 10 CERTIFICATES** (IDs 1 through 10).

---

## 6. The Exact 3 Projects Rule
- The portfolio must ALWAYS render **EXACTLY 3 PROJECTS**. Never 2, never 4, never 6.
- If a project's fields are empty, the renderer in `src/js/projects.js` MUST display an intentional, elegant placeholder (`[PROJECT 01 // PREVIEW] IMAGE TO BE ADDED`).
- Never invent project names, descriptions, or fake links.
- Broken images, `undefined`, or non-functional fake URLs are strictly prohibited.

---

## 7. The Exact 10 Certificates Rule
- The portfolio must ALWAYS render **EXACTLY 10 CERTIFICATES** (01 through 10).
- If certificate fields are empty, display deliberate placeholders (`CERTIFICATE 01`, `Accreditation Pending`).
- Never create fake certificates, issuers, or stock images.
- Clicking any certificate opens an accessible modal with:
  - Large preview image (or deliberate placeholder)
  - Full title, issuer, year, and verification button (hidden if empty)
  - Keyboard ESC support
  - Click-outside-to-close
  - Focus trap and body scroll locking

---

## 8. Color System & Theming
- **Light Theme**:
  - Canvas / Background: `#F7F7F5`
  - Primary Text: `#111111`
  - Secondary Text: `#666666`
  - Borders: `#DADADA`
  - Accent: `#1D4ED8`
- **Dark Theme**:
  - Canvas / Background: `#0A0A0A`
  - Primary Text: `#F5F5F5`
  - Secondary Text: `#A3A3A3`
  - Borders: `#262626`
  - Accent: `#60A5FA`
- **Anti-Flash Implementation**: An inline script in `<head>` checks `localStorage` and `prefers-color-scheme` before the page renders, completely eliminating white/dark flashes.

---

## 9. Accessibility (WCAG 2.2 AA)
- Single `<h1>` on the page; logical `<h2>` and `<h3>` hierarchy.
- Visible focus rings (`focus-visible:ring-2 focus-visible:ring-blue-600`).
- Screen reader skip link at the top of `index.html`.
- ARIA landmarks (`role="dialog"`, `aria-modal="true"`, `aria-expanded`).
- `prefers-reduced-motion` compliance in both CSS and JavaScript.

---

## 10. Contact & Social Configuration
- **Primary Email**: `hananfh77@gmail.com`. Must be used consistently across personal config, mailto CTA, contact form recipient, and footer.
- **GitHub Integration**: Configured as `https://github.com/Hanan-FH` in `src/data/portfolio.js` (Username: `Hanan-FH`). **CRITICAL REQUIREMENT**: The personal GitHub link appears **EXACTLY ONCE** across the entire website, located **EXCLUSIVELY in the Hero section** (`aria-label="Visit Hanan-FH on GitHub"`, `target="_blank" rel="noopener noreferrer"`). GitHub must NEVER appear in Navbar, Mobile Drawer, Contact, or Footer. Project repository URLs (`project.githubUrl`) remain empty (`""`) until projects are configured.
- **LinkedIn Integration**: Configured as `portfolioData.social.linkedin: ""`. Strictly kept empty until a verified URL is provided. When configured, it appears exclusively in the Hero section.
- **CV / Resume Button**: Configured as `portfolioData.personal.resumeUrl: ""`. Strictly hidden across all navigation and action bars when empty. Never provide a dummy or broken file path.
- **Contact Form Architecture**:
  - **Provider**: FormSubmit AJAX endpoint (`https://formsubmit.co/ajax/hananfh77@gmail.com`).
  - **Method**: Asynchronous `fetch()` POST with `headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }`.
  - **Payload**: `name`, `email`, `subject`, `message`, `_replyto` (visitor's email), `_subject` (`New Portfolio Contact — [subject]`), and `_honey` (anti-spam honeypot).
  - **Form States**:
    - `DEFAULT`: Send Message button active with send icon.
    - `SUBMITTING`: Button disabled with "Sending Message..." and spinner state.
    - `SUCCESS`: Form reset, button shows "Message Sent!", accessible status banner rendered with `aria-live="polite"`.
    - `ERROR`: Button displays "Failed — Try Again", accessible error banner rendered with direct fallback link to `mailto:hananfh77@gmail.com`.
  - **First-Time Activation**: FormSubmit requires clicking an initial confirmation link sent to `hananfh77@gmail.com` after the first test submission before submissions begin forwarding automatically.

---

## 11. Rules for Future AI Coding Agents
1. **Preserve the Architecture**: Do not restructure data flow or bypass `src/data/portfolio.js`.
2. **Preserve Counts**: Maintain exactly 3 projects and exactly 10 certificates.
3. **No Fake Data**: Never invent fake companies, fake testimonials, fake client metrics, or fake skill bars.
4. **Never Invent Social URLs**: Never create fake LinkedIn handles, fabricated GitHub usernames, or dead links.
5. **No Dependencies**: Do not add UI libraries, CSS frameworks, or animation libraries.
6. **Maintain Performance**: Ensure `npm run build` generates clean assets without errors or warnings.

