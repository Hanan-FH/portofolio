# Design Spec — tombrown.design design language (measured)

Measured with headless Chromium (Playwright, run from a scratch folder outside this repo) on the live site at 1440 / 1024 / 390 px, pages `/`, `/work`, `/about`, `/work/hotlord-records`. Values come from `getComputedStyle` and `getBoundingClientRect`.

- **MEASURED** = read directly from computed styles / layout boxes.
- **ESTIMATED** = inferred visually or from defaults (Framer drives most motion in JS, so durations and easings can't be read from CSS).

No text, images, video or logos from the reference are used in this project. The reference screenshots were kept outside the repo for that reason.

> [!IMPORTANT]
> **Adaptation rule for this project.** `AGENTS.md` fixes the palette (pure black `#000`, cyan `#00D1FF`, white, cool gray) and the fonts (Inter, JetBrains Mono). The reference is a light site. Only the **structure, typographic scale and metrics, spacing, component styling and motion character** are borrowed. Colour roles are remapped onto the `AGENTS.md` palette, and the remapping is listed below.

## 1. Fonts (MEASURED)

| Role | Reference | Licence | This project |
| :--- | :--- | :--- | :--- |
| Sans (all text, headline, italic) | **Geist** (static + variable files in network log) | SIL OFL, free | **Inter** (required by `AGENTS.md`, SIL OFL) |
| Labels / metadata | **Geist Mono**, 12 px, uppercase | SIL OFL, free | **JetBrains Mono** (required by `AGENTS.md`, SIL OFL) |
| Italic emphasis | **Same family, true italic** (Geist 400 / 600 italic faces), no change of family | — | Inter italic (same-family italic) |

Inter is slightly wider than Geist. I use slightly less negative letter-spacing than measured, to avoid collisions.

## 2. Type scale (MEASURED at 1440 / 390; 1024 for the fluid check)

| Token | 1440 | 1024 | 390 | Weight | Line-height | Letter-spacing | Used for |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Display | 123.9 px | 123.9 px (hero) | 50 px | 400 (hero), 600 (footer) | 0.96 | −6 % | Hero headline, footer closing statement |
| Page title | 120 px / 87 px | — | — | 500 | 0.98 / 1.0 | −6 % / −5 % | `/work` and `/about` page titles |
| Section title | 67 px | 52 px | 37 px | 500 | 1.0 | −5 % | "Recent Projects" etc. |
| Statement | 51 px | 40 px | 28 px | 400 | 1.05 | −4 % | Long sentence intros, project summary |
| Subtitle | 28 px / 21 px | 22 px | — | 400 / 500 | 1.15 / 1.2 | −2.5 % / −2 % | Linked project title, body-large |
| Body-large | 21 px | — | — | 500 | 1.2 | −2 % | Quotes, intro paragraphs |
| Body | 16–18 px | — | 16 px | 500 | 1.33–1.4 | −1 % to −3 % | Paragraphs |
| Caption | 14 px | — | 14 px | 400 | 1.3 | −2 % | Card captions, nav links, "All work" |
| Label | 12 px | — | 12 px | 400 | 1.1 | normal | Uppercase mono labels ("Latest Project", legal row) |

- **Fluid mapping.** Display 50→124 px and statement 28→51 px are fitted between 390 and 1440. Fitting to the 1024 measurements gives a rough check; the reference steps its sizes by breakpoint rather than scaling them smoothly.
- **Italic device.** The italic word has the same size, weight, line-height and letter-spacing as the upright text. Only `font-style` differs.
- **Two-tone statement (MEASURED).** The first words of a statement are `#A6A6A6` and the rest are `#111`. This is optional and needs a span, so it is not applied.

## 3. Colour (MEASURED, with remap)

| Role | Reference (light) | Remapped here (`AGENTS.md`) |
| :--- | :--- | :--- |
| Page background | `#FFFFFF` | `#000000` |
| Surface / media block | light grey blocks | `#0B0B0B` (ESTIMATED lift) |
| Text | `#111111` / `#2A2A2A` | `#FFFFFF` |
| Text muted | `#A6A6A6` / `#6B6B6B` / `#B5B5B5` | `#A0AEC0` |
| Footer block | near-black `#111`, white text, `#6B6B6B` muted | surface lifted from black |
| Borders | no visible dividers, whitespace only | neutral hairline at rest, `#00D1FF` on hover / active |
| Accent | none (monochrome) | `#00D1FF` |

Selection colour and hover colours are **ESTIMATED**: selection stays cyan on black (as in the current site), hovers use cyan.

## 4. Layout (MEASURED)

| Property | Value |
| :--- | :--- |
| Outer page margin | 10 px at 1440 (20 px for headline and footer) |
| Grid | 12 columns, 10 px gutter. At 1440 a 3-up card is 467 px wide |
| Section offset | Statements and body columns start on the 5th or 7th column (x = 483–505, 725, 745) |
| Card media | Square corners (radius 0). Aspect 3:2 (467×311) for video / landscape, 0.81 (467×579) for portrait |
| Avatar | Square, 60 × 60, radius 0 |
| Header | Fixed, 45 px tall, transparent. Left wordmark, centre text links, right CTA text link. All 14 px / 500 |
| Scroll | `scroll-behavior: auto` (no smoothing) |
| Hero | Statement block on top, then the oversized headline bottom-aligned. A small flat "latest project" card sits at the right, aligned to the headline baseline |
| Vertical rhythm | Large gaps (~100–180 px) between sections, no rules or borders |
| Footer | Rounded-less inset block, giant headline bottom-left, link columns on the right, mono legal row at the bottom |

Adaptation: the header stays at 70 px with the blur from `AGENTS.md`. The portfolio keeps a centred container (max 1344 px) so the fixed side telemetry text stays in the margins.

## 5. Components (MEASURED unless marked)

- **Project index.** 3-up grid, 10 px gap. Media first, caption row below with name (left), discipline and year (right) at 14 px / 400, muted. "All work ↗" text links above and below. Autoplaying looped video previews.
- **Latest project card.** Flat tinted block, media on top, mono label, large linked title with ↗.
- **Testimonials.** Rows with a 60 px square avatar, name 18 px / 500, role 16 px muted. Quote 21 px / 500 in muted tone.
- **FAQ.** Single column, 18 px questions with a `+` marker, no borders.
- **Buttons / links (ESTIMATED).** Text links with an arrow `↗` and no underline. Hover shifts the colour. Button radius is ESTIMATED (the reference buttons weren't captured as filled boxes).
- **Focus, cursor, accordion easing:** ESTIMATED.

## 6. Motion (ESTIMATED)

Framer animates through JS springs, so CSS durations can't be read.

| Item | Chosen value |
| :--- | :--- |
| Easing | `cubic-bezier(0.16, 1, 0.3, 1)` (also mandated by `AGENTS.md`) |
| Hover / link / button transitions | 200–300 ms |
| Scroll reveal | 700–900 ms, fade plus 24 px rise, once |
| Media hover | 700 ms, scale ≤ 1.03 |
| Reduced motion | all non-essential animation disabled |

## 7. Token table (implemented in `src/styles/tokens.css`)

See that file. It is the single source of truth. Every component rule references tokens only.

## 8. Unverified

All items marked ESTIMATED above: surface lift, selection and hover colours, button radius, focus style, all motion durations and easings, accordion behaviour (the portfolio has no accordion, so it is skipped).
