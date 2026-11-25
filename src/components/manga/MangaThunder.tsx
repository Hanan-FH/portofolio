interface MangaThunderProps {
  /** `ink` (#060608) for matte-paper chapters, `paper` (#ECECF0) for pitch-ink chapters. */
  tone?: 'ink' | 'paper';
  /**
   * `bolt`  — sharp vertical/angled manga strike (6 paths)
   * `arc`   — asymmetrical silhouette crackle arc (6 paths)
   * `slash` — wide diagonal/divider lightning cut for Intro & Chapter seams (6 paths)
   */
  variant?: 'bolt' | 'arc' | 'slash';
  /**
   * `loop` — calm 5.2s recurring cycle (~260ms stepped strike + long pause)
   * `once` — immediate 280ms one-shot strike (Opening Intro Beat-2 impact frame)
   * `cut`  — 220ms one-shot hairline flash triggered when parent `.is-cut-in` activates
   */
  mode?: 'loop' | 'once' | 'cut';
  /** Legacy shorthand for `mode="once"`. */
  once?: boolean;
  /** Stagger recurring strikes in seconds so multiple arcs never fire in unison. */
  delay?: number;
  className?: string;
}

/**
 * Ultra-lightweight inline manga-ink lightning (< 8 `<path>` nodes, zero blur, zero filters).
 * Pure CSS stepped opacity + stroke-dashoffset animation.
 */
export function MangaThunder({
  tone = 'ink',
  variant = 'bolt',
  mode = 'loop',
  once = false,
  delay = 0,
  className = '',
}: MangaThunderProps) {
  const resolvedMode = once ? 'once' : mode;
  const modeClass =
    resolvedMode === 'once' ? 'is-once' : resolvedMode === 'cut' ? 'is-cut-trigger' : '';

  if (variant === 'slash') {
    return (
      <svg
        className={`manga-thunder ${modeClass} ${className}`}
        data-tone={tone}
        data-variant="slash"
        style={{ '--strike-delay': `${delay}s` } as React.CSSProperties}
        viewBox="0 0 640 160"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        {/* Tapered manga brush-ink diagonal lightning spine */}
        <path
          className="mt-bolt"
          d="M12 128 164 78l-18 22 152-54-22 24 178-46-24 22 188-34-156 45 22-21-174 51 20-23-156 54 16-20Z"
          fill="currentColor"
        />
        {/* Razor-thin 1.5px #584CE6 electric offset trace */}
        <path
          className="mt-accent"
          d="M16 132 166 82l-16 20 150-53-20 22 176-45-22 20 182-32"
          stroke="#584CE6"
          strokeWidth="1.5"
          strokeLinejoin="miter"
        />
        {/* Sharp secondary forked manga cracks */}
        <path className="mt-crack" d="m226 68-42-28 29 6-36-24" stroke="currentColor" strokeWidth="1.6" />
        <path className="mt-crack" d="m418 48 48 30-31-5 41 25" stroke="#584CE6" strokeWidth="1.5" />
        {/* Crisp editorial ink shards */}
        <path className="mt-shard" d="M312 24l36-8-27 19Z" fill="currentColor" />
        <path className="mt-shard" d="M506 96l34 10-28-19Z" fill="#584CE6" />
      </svg>
    );
  }

  if (variant === 'arc') {
    return (
      <svg
        className={`manga-thunder ${modeClass} ${className}`}
        data-tone={tone}
        data-variant="arc"
        style={{ '--strike-delay': `${delay}s` } as React.CSSProperties}
        viewBox="0 0 200 280"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        {/* Asymmetrical jagged silhouette crackle */}
        <path
          className="mt-bolt"
          d="M152 10 92 78l28-6-52 76 26-7-58 92 76-78-25 6 54-78-27 5Z"
          fill="currentColor"
        />
        <path
          className="mt-accent"
          d="M152 10 92 78l28-6-52 76 26-7-58 92"
          stroke="#584CE6"
          strokeWidth="1.5"
          transform="translate(5 3)"
        />
        <path className="mt-crack" d="m96 74-34 18 20 4-28 24" stroke="currentColor" strokeWidth="1.75" />
        <path className="mt-crack" d="m88 152 36 22-21 3 26 26" stroke="#584CE6" strokeWidth="1.5" />
        <path className="mt-shard" d="M164 48l26-14-18 23Z" fill="#584CE6" />
        <path className="mt-shard" d="M34 198l-24 14 17-22Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      className={`manga-thunder ${modeClass} ${className}`}
      data-tone={tone}
      data-variant="bolt"
      style={{ '--strike-delay': `${delay}s` } as React.CSSProperties}
      viewBox="0 0 220 320"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Main jagged manga-ink bolt */}
      <path
        className="mt-bolt"
        d="M132 8 92 102l32-11-40 94 26-9-36 92 74-122-31 10 42-104-31 8Z"
        fill="currentColor"
      />
      {/* Razor-thin 1.5px #584CE6 electric offset stroke */}
      <path
        className="mt-accent"
        d="M132 8 92 102l32-11-40 94 26-9-36 92 74-122-31 10 42-104-31 8Z"
        stroke="#584CE6"
        strokeWidth="1.5"
        transform="translate(6 3)"
      />
      {/* Sharp angular branch cracks */}
      <path className="mt-crack" d="m116 76-28 40 20-5-26 50" stroke="currentColor" strokeWidth="2" />
      <path className="mt-crack" d="m106 196-25 36 18-4-21 42" stroke="#584CE6" strokeWidth="1.5" />
      {/* High-contrast print shards (zero soft glow) */}
      <path className="mt-shard" d="M168 58l34-20-24 30Z" fill="currentColor" />
      <path className="mt-shard" d="M42 218l-30 18 22-26Z" fill="#584CE6" />
    </svg>
  );
}

export default MangaThunder;
