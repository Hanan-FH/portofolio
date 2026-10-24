# AGENTS.md — PERMANENT REPOSITORY INSTRUCTIONS

## 1. Visual Identity & Atmosphere
This repository follows an atmospheric visual direction inspired by Makoto Shinkai's *Kimi no Na wa.* (君の名は。).
- All new UI must adhere to the Katawaredoki color tokens (Zenith Abyss `#070A18`, Dusk Rose `#881A58`, Solar Amber `#EA580C`, Tiamat Cyan `#38BDF8`).
- Maintain crepuscular rim lighting (1px gradient borders) and cloud horizon depth.
- Do not revert to generic flat dark mode, monochrome SaaS cards, or ungrounded gradient blobs.

## 2. Inviolable Asset & Content Preservation Rules
- Never delete, overwrite, downscale, or replace original profile photos, certificate scans, project screenshots, or resumes.
- User biographic details, employment records, project titles, repository links, and live URLs are immutable real-world data. Never edit, rephrase, or fabricate content.
- Maintain `src/data/portfolio.ts` as the single source of truth with exact counts (3 projects, 10 accredited certificates, 4 SMK Plus Pelita Nusantara foundation competencies, 9 curriculum languages).
- Working integrations (FormSubmit AJAX contact endpoint `https://formsubmit.co/ajax/hananfh77@gmail.com`, `mailto:hananfh77@gmail.com` fallback, social links) must remain fully operational across future redesigns.

## 3. Cinematic Intro Sequence Governance
- The canvas opening sequence must remain skippable via keyboard `[Esc]` and an on-screen button.
- The intro must check `sessionStorage` (`kimi_intro_seen`) and never execute repeatedly during normal navigation or subsequent tab sessions.
- In headless test environments or when `prefers-reduced-motion` is active, the intro must bypass immediately.

## 4. Performance & Quality Standards
- Preserve zero-CLS layout stability: all image and media containers must declare explicit aspect ratios.
- Keep third-party bundle weight minimal: prefer native CSS and HTML5 Canvas over heavy external animation or 3D libraries.
- All production builds must compile cleanly without type errors or broken asset references.
