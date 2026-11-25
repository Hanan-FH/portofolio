import { useCallback, useEffect, useRef, useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import { MangaThunder } from '../manga/MangaThunder';

/**
 * One-line toggle: `false` plays on every fresh page load.
 * Set to `true` to play once per browser session (stored in sessionStorage).
 */
const PLAY_ONCE_PER_SESSION: boolean = false;

const SESSION_KEY = 'tiamat_intro_executed';

/* 3-beat MMV timeline (ms from mount) */
const T_TICKS = [100, 210, 320] as const;
const T_TITLE = 420;
const T_FLASH = 780;
const T_FLASH_END = 850; // ~70ms impact frame, snaps back to pitch ink right before Beat 3 split
const T_SPLIT = 900;
const SPLIT_TO_HANDOFF = 50; // hero fires at 0.95s, as the shutters part
const SPLIT_TO_UNMOUNT = 580; // overlay leaves the DOM at ~1.48s
const COUNTER_STEPS = ['001', '042', '089', '100'] as const;

type Phase = 'slash' | 'title' | 'flash' | 'split';

function shouldPlayIntro(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  if (PLAY_ONCE_PER_SESSION) {
    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === '1') return false;
    } catch {
      return true; // Storage unavailable — never block the opening
    }
  }
  return true;
}

function markSessionExecuted(): void {
  try {
    window.sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // Storage unavailable — intro simply replays next time
  }
}

function handOffToHero(): void {
  const html = document.documentElement;
  if (html.classList.contains('intro-complete')) return;
  html.classList.remove('intro-active');
  html.classList.add('intro-complete');
  window.dispatchEvent(new Event('intro-complete'));
  markSessionExecuted();
}

/*
 * Decided at module load (before React's first render) so the Hero's entrance
 * animations are created already paused underneath the overlay.
 */
const INTRO_SHOULD_PLAY = shouldPlayIntro();
if (INTRO_SHOULD_PLAY) {
  document.documentElement.classList.add('intro-active');
  markSessionExecuted();
}

/**
 * Kinetic Manga-Edit Opening Intro (~1.45s, 3 beats).
 * Pure CSS transform / opacity / clip-path + a handful of timers. Unmounts completely when done.
 */
export function MangaIntro() {
  const [mounted, setMounted] = useState<boolean>(INTRO_SHOULD_PLAY);
  const [phase, setPhase] = useState<Phase>('slash');
  const [struck, setStruck] = useState(false);
  const counterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const timersRef = useRef<number[]>([]);
  const splitRef = useRef(false);
  const { personal } = portfolioData;
  const firstName = personal.name.split(' ')[0];

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(window.setTimeout(fn, ms));
  }, []);

  /* Beat 3 — also the instant-skip path. Idempotent. */
  const triggerSplit = useCallback(() => {
    if (splitRef.current) return;
    splitRef.current = true;
    clearTimers();
    setPhase('split');
    schedule(handOffToHero, SPLIT_TO_HANDOFF);
    schedule(() => setMounted(false), SPLIT_TO_UNMOUNT);
  }, [clearTimers, schedule]);

  useEffect(() => {
    if (!mounted) {
      // Covers reduced motion, play-once sessions, and the post-intro unmount.
      handOffToHero();
      return;
    }

    const setCounter = (value: string) => {
      counterRefs.current.forEach((el) => {
        if (el) el.textContent = `CH.00 // ${value}`;
      });
    };

    T_TICKS.forEach((ms, i) => schedule(() => setCounter(COUNTER_STEPS[i + 1]), ms));
    schedule(() => setPhase('title'), T_TITLE);
    schedule(() => {
      setPhase('flash');
      setStruck(true);
    }, T_FLASH);
    schedule(() => setPhase('title'), T_FLASH_END);
    schedule(triggerSplit, T_SPLIT);

    /* Light scroll lock without touching body overflow — zero scrollbar/layout shift */
    const blockScroll = (event: Event) => event.preventDefault();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === ' ' || event.code === 'Space') {
        event.preventDefault();
        triggerSplit();
      } else if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener('wheel', blockScroll, { passive: false });
    window.addEventListener('touchmove', blockScroll, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      clearTimers();
      window.removeEventListener('wheel', blockScroll);
      window.removeEventListener('touchmove', blockScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mounted, schedule, clearTimers, triggerSplit]);

  if (!mounted) return null;

  /* Identical stage rendered inside both shutters so the title splits along the cut */
  const renderStage = (index: number) => (
    <div className="mi-stage">
      <div className="mi-speedlines manga-speedlines" />
      <div className="mi-flash-slash" />

      <div className="mi-slash-wrap">
        <div className="mi-slash" />
        <span
          ref={(el) => {
            counterRefs.current[index] = el;
          }}
          className="mi-counter"
        >
          CH.00 // {COUNTER_STEPS[0]}
        </span>
      </div>

      <div className="mi-title-wrap">
        <span className="mi-stamp">VOL.01 // CH.00</span>
        <span className="mi-title">{firstName}</span>
        <span className="mi-sub">
          {personal.name} — {personal.role}
        </span>
      </div>
    </div>
  );

  return (
    <div data-manga-intro="" data-phase={phase} className="mi-root" onClick={triggerSplit}>
      <div className="mi-shutter mi-shutter-top" aria-hidden="true">
        {renderStage(0)}
      </div>
      <div className="mi-shutter mi-shutter-bottom" aria-hidden="true">
        {renderStage(1)}
      </div>

      {/* Impact-frame thunder: 280ms diagonal strike cutting across Beat-2 flash before split */}
      {struck && <MangaThunder variant="slash" mode="once" className="mi-thunder" />}

      {/* Violet cut line exactly along the shutter seam (aspect-ratio independent) */}
      <svg className="mi-seam" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line
          x1="0"
          y1="56"
          x2="100"
          y2="44"
          stroke="#584CE6"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <button
        type="button"
        className="mi-skip"
        aria-label="Skip opening intro"
        onClick={(event) => {
          event.stopPropagation();
          triggerSplit();
        }}
      >
        [ SKIP ]
      </button>
    </div>
  );
}

export default MangaIntro;
