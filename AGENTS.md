# AGENTS.md — PERMANENT SYSTEM DIRECTIVES

## 1. Editorial Aesthetic & Typographic Discipline
- Adhere strictly to the Shinkai visual universe: high-contrast Japanese-influenced editorial serif headings paired with clean, unembellished geometric sans body copy.
- No kitschy, glowing anime pseudo-fonts. Keep typography restrained, sophisticated, and legible.
- Color hierarchy is strictly Katawaredoki: Zenith Abyss `#050714`, Twilight Indigo `#0D1435`, Kataware Rose `#6D1146`, Solar Horizon Flare `#C2410C` to `#FDE047`, and Tiamat Cyan `#38BDF8`.

## 2. Inviolable Preservation Policy
- Never modify, shorten, rephrase, or fabricate user bio text, project records, or credentials.
- Never delete, downscale, or replace authentic certificates, profile photos, or project screenshots with stock imagery or AI placeholders.
- Maintain existing contact forms, API endpoints, analytics, and social routes without disruption.

## 3. Motion & Animation Standards
- Opening sequence is unskippable on initial session arrival (no skip buttons) and recorded in `sessionStorage` (`tiamat_intro_executed`).
- The scroll engine must run via `AtmosphericScrollEngine`: elastic Musubi spline guide, Doppler chromatic stardust dispersion, and ambient falling comet generation.
- The Certificates section must remain a lightweight horizontal slide-scroll with CSS scroll snap.
- The Skills section must run as an infinite marquee using hardware-accelerated CSS translation (`translate3d`).
- Always respect `prefers-reduced-motion: reduce`.

## 4. Performance & Core Web Vitals
- Zero Cumulative Layout Shift (CLS = 0). All media containers and canvases must declare fixed aspect ratios or dimensions.
- Target locked 60fps/120fps motion. All animations must execute strictly on `transform` and `opacity`.
- Mandatory build verification: Every automated session must execute `npm run build` and resolve all TypeScript/lint warnings before completion.
