interface MangaThunderProps {
  /** `ink` (#060608) for matte-paper chapters, `paper` (#ECECF0) for pitch-ink chapters. */
  tone?: 'ink' | 'paper';
  /**
   * `hero`  — multi-layered 2-stroke electric bolt (violet 3.5px + white 1.4px hot core)
   *           with 3 secondary forks + 5 micro-sparks hugging addo.jpg's top-right silhouette
   * `slash` — wide diagonal lightning cut for Intro Beat-2 flash & Pitch-Ink Chapter seams
   */
  variant?: 'hero' | 'slash';
  /**
   * `loop` — 5.5s double-strike cycle (invisible 0%–88%, 2-pulse electric strike 88%–100%)
   * `once` — immediate 280ms one-shot strike (Opening Intro Beat-2 impact frame)
   * `cut`  — 220ms one-shot hairline flash triggered when parent `.is-cut-in` activates
   */
  mode?: 'loop' | 'once' | 'cut';
  /** Legacy shorthand for `mode="once"`. */
  once?: boolean;
  /** Optional animation delay in seconds. */
  delay?: number;
  className?: string;
}

const HERO_PRIMARY = 'M192 10 L148 70 L176 64 L122 140 L156 132 L98 216 L128 208 L78 292';
const HERO_FORK_A = 'M148 70 L102 94 L116 99 L80 128';
const HERO_FORK_B = 'M156 132 L204 162 L188 168 L230 204';
const HERO_FORK_C = 'M128 208 L172 238 L158 244 L194 278';

/**
 * Kinetic Manga Lightning Strike — inline SVG + pure CSS keyframes (zero blur filters).
 * Uses a 2-layer stroke stack (#584CE6 3.5px outer electric violet beneath a #FFFFFF 1.4px hot core).
 */
export function MangaThunder({
  tone = 'ink',
  variant = 'hero',
  mode = 'loop',
  once = false,
  delay = 0,
  className = '',
}: MangaThunderProps) {
  const resolvedMode = once ? 'once' : mode;
  const modeClass =
    resolvedMode === 'once' ? 'is-once' : resolvedMode === 'cut' ? 'is-cut-trigger' : 'is-loop';

  if (variant === 'slash') {
    const slashSpine = 'M16 130 L166 80 L148 102 L302 48 L280 72 L458 26 L434 48 L624 14';
    return (
      <svg
        className={`manga-thunder ${modeClass} ${className}`}
        data-tone={tone}
        data-variant="slash"
        style={delay ? ({ '--strike-delay': `${delay}s` } as React.CSSProperties) : undefined}
        viewBox="0 0 640 160"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="mt-primary-outer"
          d={slashSpine}
          stroke="#584CE6"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          className="mt-primary-core"
          d={slashSpine}
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <g className="mt-forks">
          <path d="M226 70 L184 42 L212 48 L176 24" stroke="#584CE6" strokeWidth="2.2" />
          <path d="M226 70 L184 42 L212 48 L176 24" stroke="#FFFFFF" strokeWidth="0.9" />
          <path d="M418 48 L466 78 L436 73 L478 98" stroke="#584CE6" strokeWidth="2.2" />
          <path d="M418 48 L466 78 L436 73 L478 98" stroke="#FFFFFF" strokeWidth="0.9" />
        </g>
        <g className="mt-sparks">
          <path d="M312 24 L344 16 L320 34 Z" fill="currentColor" />
          <path d="M506 96 L538 106 L512 86 Z" fill="#584CE6" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      className={`manga-thunder ${modeClass} ${className}`}
      data-tone={tone}
      data-variant="hero"
      style={delay ? ({ '--strike-delay': `${delay}s` } as React.CSSProperties) : undefined}
      viewBox="0 0 260 320"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Primary Jagged Branching Bolt: 4px #584CE6 outer stroke + 1.5px #FFFFFF hot core */}
      <path
        className="mt-primary-outer"
        d={HERO_PRIMARY}
        stroke="#584CE6"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="miter"
      />
      <path
        className="mt-primary-core"
        d={HERO_PRIMARY}
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="miter"
      />

      {/* 3 Secondary Forks (ignite prominently during Strike 2 aftershock) */}
      <g className="mt-forks">
        <path d={HERO_FORK_A} stroke="#584CE6" strokeWidth="2.4" strokeLinecap="square" strokeLinejoin="miter" />
        <path d={HERO_FORK_A} stroke="#FFFFFF" strokeWidth="1.0" strokeLinecap="square" strokeLinejoin="miter" />

        <path d={HERO_FORK_B} stroke="#584CE6" strokeWidth="2.4" strokeLinecap="square" strokeLinejoin="miter" />
        <path d={HERO_FORK_B} stroke="#FFFFFF" strokeWidth="1.0" strokeLinecap="square" strokeLinejoin="miter" />

        <path d={HERO_FORK_C} stroke="#584CE6" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" />
        <path d={HERO_FORK_C} stroke="#FFFFFF" strokeWidth="0.95" strokeLinecap="square" strokeLinejoin="miter" />
      </g>

      {/* 5 Tiny Crisp Micro-Spark Fragments hugging the top-right silhouette */}
      <g className="mt-sparks">
        <path d="M208 32 L226 22 L215 39 Z" fill="#FFFFFF" stroke="#584CE6" strokeWidth="0.8" />
        <path d="M110 50 L92 43 L106 58 Z" fill="#584CE6" />
        <path d="M214 118 L234 112 L220 128 Z" fill="#FFFFFF" stroke="#584CE6" strokeWidth="0.8" />
        <path d="M84 168 L66 176 L82 181 Z" fill="#584CE6" />
        <path d="M150 268 L166 282 L144 275 Z" fill="#FFFFFF" stroke="#584CE6" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

export default MangaThunder;
