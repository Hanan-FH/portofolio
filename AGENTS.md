# AGENTS.md — PERMANENT SYSTEM DIRECTIVES

## 1. Cinematic Heritage & Visual Language
This codebase follows an art-directed visual architecture inspired by Makoto Shinkai's *Kimi no Na wa.* (君の名は。).
- All visual components must strictly adhere to the Katawaredoki atmospheric palette (Zenith `#050714`, Dusk Rose `#7c124a`, Solar Amber `#d94e16`, Tiamat Cyan `#38bdf8`).
- Maintain anamorphic lens streaks, crepuscular rim highlights (1px borders), and authentic Mincho/Serif display typography.
- Avoid generic corporate SaaS cards, blurry purple blobs, and AI-slop design tropes.

## 2. Protected Data & Zero-Content-Mutation Rule
- Never modify, shorten, rewrite, or fabricate personal text, work history, project details, or credentials.
- Never delete, rename, or replace authentic profile images, certificate scans, or project media with stock photos or placeholders.
- Maintain existing contact form handlers, APIs, and social integrations without breaking functionality.

## 3. Motion & Animation Standards
- The opening cinematic sequence must remain unskippable on initial arrival (no skip buttons) and store completion in `sessionStorage` (`tiamat_intro_executed`).
- Always respect `prefers-reduced-motion: reduce`.
- Never introduce scroll hijacking. Animate only via `transform` and `opacity` to maintain 60fps locked performance.

## 4. Verification Requirements
- Every modification must compile cleanly via `npm run build` with zero type errors and zero broken imports.
