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

## 8. Dual-Theme Color System — "Lifted Obsidian (Dark)" & "Professional Warm Gold (Light)"
The website implements a **dual-theme architecture** switched via `document.documentElement[data-theme="dark" | "light"]`, persisted in `localStorage` (`portfolio-theme`), with an anti-flash inline script in `index.html` and an accessible header toggle (`GOLD ☀` / `DARK ☾`).

All design tokens live in `src/index.css`. **Do not add hardcoded hex values** in `src/App.css` or inline styles in `src/App.tsx` — always reference a CSS variable so both themes adapt seamlessly.

### 8.1 Theme 1 — Dark Theme: "Lifted Obsidian" (`:root`, `[data-theme="dark"]`)
A softened dark charcoal/obsidian canvas (brighter than pure `#000000` so surfaces breathe, while preserving a rich dark-mode aesthetic) paired with crisp neutral light typography.

| Token | Value | Contrast / Role |
|---|---|---|
| `--bg-primary` | `#18181D` | Page canvas, scrollbar track (`site.webmanifest` theme color) |
| `--bg-surface` | `#212128` | Cards, panels, modals, form container, scroll buttons |
| `--bg-elevated` | `#1C1C23` | Inputs, image wells, avatar backdrop |
| `--bg-footer` | `#141419` | Footer band |
| `--bg-header` / `--bg-drawer` | `rgba(24,24,29,0.88)` / `rgba(24,24,29,0.98)` | Translucent blurred navigation bars |
| `--border-subtle` / `--border-strong` | `rgba(255,255,255,0.08)` / `rgba(255,255,255,0.16)` | Hairline grid lines, dividers, card & badge borders |
| `--text-heading` | `#F4F4F6` | **16.1:1** on primary, **14.6:1** on surface — `h1–h4`, hero display, section/project titles |
| `--text-primary` | `#E6E6EB` | **14.2:1** on primary, **12.9:1** on surface — Body default, links, buttons, nav items |
| `--text-secondary` | `#A6A6B4` | **7.4:1** on primary, **6.7:1** on surface — Paragraphs, descriptions, nav links |
| `--text-label` | `#9090A0` | **5.6:1** on primary, **5.1:1** on surface — Mono uppercase labels, eyebrows, form labels |
| `--text-muted` | `#8B8B9B` | **5.3:1** on primary, **4.8:1** on surface — Dates, meta info, footer, status pills |
| `--text-faint` | `#626272` | Decorative / `aria-hidden` text only |
| `--accent` / `--accent-hover` | `#FF3366` / `#E02456` | Crimson primary accent & interactive hover |
| `--accent-cyan` | `#00D2FF` | Hero decorative circle & name dot |

### 8.2 Theme 2 — Light Theme: "Professional Warm Gold" (`[data-theme="light"]`)
Instead of a sterile white light mode, the light theme uses a **multi-layered editorial warm gold / champagne yellow surface system** paired with **deep obsidian-black professional ink typography**.

#### Gold Surface Scale
| Token | Value | Usage |
|---|---|---|
| `--gold-canvas-50` (`--bg-surface`) | `#FDF7E2` | Elevated cards, panels, modals, form container, buttons |
| `--gold-canvas-100` (`--bg-primary`) | `#F6ECC9` | Primary page canvas & scrollbar track |
| `--gold-canvas-200` (`--bg-elevated`) | `#EFE2B4` | Recessed inputs, image wells, avatar backdrop |
| `--bg-footer` | `#EADBA6` | Footer band |
| `--gold-canvas-300` / `--gold-canvas-400` | `#E5D396` / `#D4BC6A` | Active fills & structural gold accents |
| `--bg-header` / `--bg-drawer` | `rgba(246,236,201,0.88)` / `rgba(246,236,201,0.98)` | Translucent warm gold navigation bars |
| `--border-subtle` / `--border-strong` | `rgba(28,25,18,0.12)` / `rgba(28,25,18,0.24)` | Warm ink structural hairlines & card borders |

#### Professional Black / Obsidian Ink Typography (measured against `--bg-primary` `#F6ECC9` / `--bg-surface` `#FDF7E2`)
| Token | Value | Contrast (Canvas / Surface) | Used for |
|---|---|---|---|
| `--text-heading` | `#161512` | **15.4:1 / 17.0:1** | `h1–h4`, hero display, section/project/expertise titles, brand monogram, avatar name |
| `--text-primary` | `#1F1D18` | **14.2:1 / 15.7:1** | Body copy, links, card titles, buttons, input values |
| `--text-secondary` | `#474134` | **8.6:1 / 9.4:1** | Warm charcoal paragraphs, descriptions, navigation links |
| `--text-label` | `#5E5338` | **6.4:1 / 7.1:1** | Mono uppercase labels: Connect label, telemetry titles/labels, certificate issuer, form labels |
| `--text-muted` | `#665D47` | **5.5:1 / 6.1:1** | Dates, meta info, footer, status pills |
| `--text-faint` | `#8A7F64` | **3.4:1 / 3.7:1** | **Decorative / `aria-hidden` text only** (marginal running text, arrows, separators) |
| `--accent` / `--accent-hover` | `#C9184A` / `#A4133C` | **4.8:1 / 5.3:1** | Deep editorial crimson tuned for high contrast on warm gold surfaces |
| `--accent-cyan` | `#007799` | Deep teal accent for hero circle & dot on gold canvas |

---

## 9. Accessibility (WCAG 2.2 AA)
- Single `<h1>` on the page; logical `<h2>` and `<h3>` hierarchy.
- Visible theme-aware focus rings (`:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }`).
- All readable text tokens (`heading`, `primary`, `secondary`, `label`, `muted`) maintain ≥ 4.5:1 contrast on both `--bg-primary` and `--bg-surface` in **both** Dark and Light (Gold) themes; `--text-faint` is strictly limited to decorative/`aria-hidden` elements.
- Screen reader skip link at the top of `index.html`.
- ARIA landmarks (`role="dialog"`, `aria-modal="true"`, `aria-expanded`).
- `prefers-reduced-motion` compliance in both CSS and JavaScript.

---

## 10. Contact & Social Configuration
- **Primary Email**: `hananfh77@gmail.com`. Must be used consistently across personal config, mailto CTA, contact form recipient, and footer.
- **GitHub Integration**: Configured as `https://github.com/Hanan-FH` in `src/data/portfolio.js` (Username: `Hanan-FH`). **CRITICAL REQUIREMENT**: The personal GitHub link appears **EXACTLY ONCE** across the entire website, located **EXCLUSIVELY in the Hero section** (`aria-label="Visit Hanan-FH on GitHub"`, `target="_blank" rel="noopener noreferrer"`). GitHub must NEVER appear in Navbar, Mobile Drawer, Contact, or Footer. Project repository URLs (`project.githubUrl`) remain empty (`""`) until projects are configured.
- **LinkedIn Integration**: Configured as `portfolioData.social.linkedin: "https://www.linkedin.com/in/hanan-fathurrozaq-3a643b427"` (verified URL provided by the owner). Appears **EXCLUSIVELY in the Hero section** (`aria-label="Visit Hanan Fathurrozaq on LinkedIn"`, `target="_blank" rel="noopener noreferrer"`). Never add it to Navbar, Mobile Drawer, Contact, or Footer.
- **Hero "Connect" Row**: Contains exactly two links in this order — **GitHub ↗** then **LinkedIn ↗**. The former hero "Email" link was replaced by LinkedIn; email remains reachable via the Contact section (Direct Email box + form), the mobile drawer, and the footer.
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
7. **Preserve the Dual-Theme System**: Maintain both `"Lifted Obsidian"` (`[data-theme="dark"]`) and `"Professional Warm Gold"` (`[data-theme="light"]`) in `src/index.css`. Never introduce pure white (`#FFFFFF`) page backgrounds or pure black (`#000000`) canvases, and always use semantic CSS variables (`--bg-*`, `--text-*`, `--border-*`) so both themes render with WCAG 2.2 AA contrast.

