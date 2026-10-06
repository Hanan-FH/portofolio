# Production-Grade Developer Portfolio

A minimal, technical, editorial portfolio website engineered for Software Engineering and Computer Science students. Built from the ground up with **HTML5**, **Tailwind CSS**, **Vanilla JavaScript**, and **Vite**.

Designed with restraint, typography hierarchy, and a developer-oriented visual language inspired by modern editorial engineering sites.

---

## Key Highlights

- ⚡ **Zero-Framework Runtime Overhead**: Pure modern Vanilla JavaScript ES modules and Tailwind CSS.
- 📐 **Single Source of Truth**: All personal information, projects, certificates, skills, and links are managed in a single file (`src/data/portfolio.js`).
- 🎯 **Strict Constraints Enforced**:
  - **Exactly 3 Selected Projects** with intentional empty-state placeholders.
  - **Exactly 10 Certificates** with an accessible lightbox modal.
- 🌗 **Accessible Dark / Light Mode**: System preference detection, zero-flash inline script, and persistent `localStorage` toggle.
- ♿ **WCAG 2.2 AA Compliant**: Semantic landmark tags, accessible keyboard navigation, focus trap in modal, and `prefers-reduced-motion` support.
- 🚀 **Production Performance**: Ultra-compact production bundle (~25kB gzipped), zero layout shift (CLS), pre-warmed fonts, and lazy-loaded below-the-fold assets.

---

## Project Structure

```
├── public/
│   ├── favicon.svg             # Minimalist SVG code monogram favicon
│   ├── robots.txt              # Production search engine crawler rules
│   ├── site.webmanifest        # PWA / web application manifest
│   └── resume.pdf              # (Optional) Drop your PDF resume here
│
├── src/
│   ├── assets/
│   │   ├── profile/            # Store profile.webp here
│   │   ├── projects/           # Store project-01.webp, project-02.webp, etc.
│   │   └── certificates/       # Store certificate-01.webp through certificate-10.webp
│   │
│   ├── data/
│   │   └── portfolio.js        # Centralized configuration (Edit this file!)
│   │
│   ├── js/
│   │   ├── main.js             # Application orchestrator & icon hydration
│   │   ├── navigation.js       # Sticky navbar, mobile menu, theme toggle, CV
│   │   ├── projects.js         # Exact 3 projects renderer & empty states
│   │   ├── certificates.js     # Exact 10 certificates renderer & lightbox modal
│   │   └── animations.js       # Native IntersectionObserver scroll reveals
│   │
│   ├── styles/
│   │   └── main.css            # Custom CSS tokens, scrollbar, animations
│   │
│   └── index.html              # Main HTML markup and SEO meta tags
│
├── .gitignore
├── AGENTS.md                   # Source of truth for future AI coding agents
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### 1. Installation
Clone or open the repository in your terminal and install dependencies:
```bash
npm install
```

### 2. Local Development
Start the local Vite development server:
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the URL printed by Vite).

### 3. Production Build
Generate an optimized production build in the `dist/` directory:
```bash
npm run build
```

### 4. Preview Production Build
Test the generated build locally:
```bash
npm run preview
```

---

## How to Customize Your Portfolio

You do **not** need to edit the HTML markup or JavaScript logic to update your portfolio. Everything is configured in:

👉 `src/data/portfolio.js`

### 1. Personal Information & Socials
Update your name, role, headline, bio, and contact URLs in `src/data/portfolio.js`:
```javascript
personal: {
  name: "Hanan Fathurrozaq Hidayatullah",
  role: "Software Engineering Student",
  location: "Jakarta, Indonesia",
  email: "hananfh77@gmail.com",
  profileImage: "", // or "/src/assets/profile/profile.webp"
  resumeUrl: "", // or "/resume.pdf" to display Download CV
},
social: {
  github: "https://github.com/Hanan-FH",
  linkedin: "", // Leave empty until verified to auto-hide button
  email: "mailto:hananfh77@gmail.com",
},
contact: {
  recipientEmail: "hananfh77@gmail.com",
  formSubmitEndpoint: "https://formsubmit.co/ajax/hananfh77@gmail.com",
}
```

### 2. Adding Your 3 Projects
Edit the `projects` array in `src/data/portfolio.js`. Keep **exactly 3 items**:
```javascript
projects: [
  {
    id: 1,
    title: "Distributed Task Queue",
    category: "Systems & Backend",
    description: "Asynchronous background job worker with Redis persistence...",
    year: "2025",
    image: "/src/assets/projects/project-01.webp",
    technologies: ["Node.js", "Redis", "TypeScript", "Docker"],
    liveUrl: "",
    githubUrl: "",
  },
  // Projects 2 and 3...
]
```
*Note: If an image or link is left empty (`""`), an intentional, elegant placeholder is displayed automatically.*

### 3. Adding Your 10 Certificates
Edit the `certificates` array in `src/data/portfolio.js`. Keep **exactly 10 items**:
```javascript
certificates: [
  {
    id: 1,
    title: "Meta Front-End Developer Specialization",
    issuer: "Coursera / Meta",
    year: "2024",
    image: "/src/assets/certificates/certificate-01.webp",
    verificationUrl: "https://coursera.org/verify/...",
  },
  // Items 2 through 10...
]
```

---

## Contact Form Setup

The portfolio uses [FormSubmit](https://formsubmit.co/) as an AJAX form delivery service, requiring zero backend server, database, or API keys.

### 1. Where Configuration Lives
All contact destinations are centralized inside `src/data/portfolio.js`:
- `personal.email`: `"hananfh77@gmail.com"` (Used for mailto triggers, direct visible email link, and fallback)
- `contact.recipientEmail`: `"hananfh77@gmail.com"` (Form submission target)
- `social.github`: `"https://github.com/Hanan-FH"` (Single personal GitHub destination, rendered strictly in Hero)
- `social.linkedin`: `""` (Automatically hidden until a valid profile URL is entered)

### 2. Initial Email Activation (Important!)
FormSubmit uses double opt-in protection for new recipient addresses:
1. Submit your first test message through the contact form on your live or local website.
2. FormSubmit will immediately send an **Activation Email** to `hananfh77@gmail.com`.
3. Open the email and click the **"Activate Form"** button.
4. From that moment forward, all visitor submissions will be delivered directly to your inbox with direct reply-to enabled (`_replyto`).

### 3. How to Update the Destination Email Later
To change where contact messages are delivered:
1. Open `src/data/portfolio.js`.
2. Update `personal.email` and `contact.recipientEmail` with your new email.
3. Run `npm run build` or start your dev server.
4. Perform one test submission to activate the new address.

---

## Deployment

The project builds to a completely static `dist/` directory, making it compatible with any modern static web host.

### Vercel
1. Push your repository to GitHub.
2. Import the project in Vercel.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`
5. Output Directory: `dist`

### Netlify
1. Connect repository in Netlify.
2. Build Command: `npm run build`
3. Publish Directory: `dist`

### GitHub Pages
1. In `vite.config.js`, set `base: '/<repository-name>/'`.
2. Run `npm run build`.
3. Deploy the `dist` folder to your `gh-pages` branch or configure GitHub Actions.

---

## License
MIT License. Built for developers.
