interface MangaSideRailsProps {
  activeSection: string;
  onNavigate?: (id: string) => void;
}

interface RailChapter {
  id: string;
  code: string;
  kanji: string;
  label: string;
}

/* Formal Japanese Daiji numerals: CH.00 → 零, CH.01 → 壱, CH.02 → 弐, CH.03 → 参, CH.04 → 肆, FINAL → 終 */
const RAIL_CHAPTERS: RailChapter[] = [
  { id: 'hero', code: 'CH.00', kanji: '零', label: 'Opening' },
  { id: 'about', code: 'CH.01', kanji: '壱', label: 'About' },
  { id: 'projects', code: 'CH.02', kanji: '弐', label: 'Works' },
  { id: 'skills', code: 'CH.03', kanji: '参', label: 'Skills' },
  { id: 'certificates', code: 'CH.04', kanji: '肆', label: 'Certificates' },
  { id: 'contact', code: 'FINAL', kanji: '終', label: 'Contact' },
];

/* Asymmetric studio-equalizer curve across the 5 hairline ticks (stretches 1.0 -> 2.4x on fast scroll) */
const EQUALIZER_WEIGHTS = [0.95, 1.35, 1.4, 1.2, 0.85] as const;

const TICKER_STREAM = '電光石火 // VELOCITY // 創作 // ARCHIVE // KINETIC // 記録 //';

/**
 * Desktop-only 38px Kinetic Manga Margin Rails (`@media (min-width: 1024px)`).
 * Rendered in `#FFFFFF` with `mix-blend-mode: difference` so they invert cleanly
 * across both Matte Paper (`#ECECF0`) and Pitch Ink (`#060608`) chapters.
 * Driven by `--rail-progress` and `--rail-velocity` from the existing passive `rAF` engine.
 */
export function MangaSideRails({ activeSection, onNavigate }: MangaSideRailsProps) {
  const active = RAIL_CHAPTERS.find((chapter) => chapter.id === activeSection) ?? RAIL_CHAPTERS[0];

  const navigate = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate?.(id);
  };

  return (
    <>
      {/* Left Rail: Live Chapter Spine, Progress Needle & Scroll-Velocity Equalizer */}
      <aside className="manga-side-rail manga-rail-left" aria-hidden="true">
        <div className="rail-top-mark">
          <span className="rail-monogram">H.FH</span>
          <span className="rail-monogram-sub">MMV</span>
        </div>

        <div className="rail-spine">
          <div className="rail-kanji-viewport">
            <span key={active.id} className="rail-kanji-slot font-kanji">
              {active.kanji}
            </span>
          </div>

          <div className="rail-progress-track">
            <span className="rail-progress-fill" />
            <span className="rail-needle" />
          </div>

          <span className="rail-code">{active.code}</span>
        </div>

        <div className="rail-ticks-group">
          <span className="rail-ticks-label">VEL</span>
          <div className="rail-ticks">
            {EQUALIZER_WEIGHTS.map((weight, index) => (
              <span
                key={index}
                className="rail-tick"
                style={{ '--w': weight } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* Right Rail: Vertical Editorial Ticker, Hairline Electric Spark & Chapter Jump Dots */}
      <nav className="manga-side-rail manga-rail-right" aria-label="Chapter margin index">
        {/* Periodic 2px x 24px electric spark shooting down the right rail's inner hairline */}
        <span className="rail-spark" aria-hidden="true" />

        <div className="rail-ticker" aria-hidden="true">
          <div className="rail-ticker-track">
            <span className="rail-ticker-copy">{TICKER_STREAM}</span>
            <span className="rail-ticker-copy" aria-hidden="true">
              {TICKER_STREAM}
            </span>
          </div>
        </div>

        <ul className="rail-dots">
          {RAIL_CHAPTERS.map((chapter) => {
            const isActive = chapter.id === activeSection;
            return (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  onClick={navigate(chapter.id)}
                  aria-label={`Jump to ${chapter.label} (${chapter.code})`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`rail-dot-link ${isActive ? 'is-active' : ''}`}
                >
                  <span className="rail-dot-label font-kanji" aria-hidden="true">
                    {chapter.kanji}
                  </span>
                  <span className="rail-dot" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default MangaSideRails;
