import { useCallback, useEffect, useState } from 'react';

export type ThemePolarity = 'paper' | 'ink';

const STORAGE_KEY = 'theme-polarity';

function readInitialPolarity(): ThemePolarity {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.dataset.theme;
    if (attr === 'ink' || attr === 'paper') return attr;
  }
  if (typeof window !== 'undefined') {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'ink' || saved === 'paper') return saved;
    } catch {
      // Ignore storage access errors
    }
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'ink';
    }
  }
  return 'paper';
}

function applyDocumentPolarity(mode: ThemePolarity): void {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = mode;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', mode === 'ink' ? '#0A0A0A' : '#F4F4F1');
  }
}

export function useThemePolarity() {
  const [polarity, setPolarityState] = useState<ThemePolarity>(readInitialPolarity);

  useEffect(() => {
    applyDocumentPolarity(polarity);
  }, [polarity]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved === 'ink' || saved === 'paper') return;
      } catch {
        // Ignore storage errors
      }
      const next: ThemePolarity = event.matches ? 'ink' : 'paper';
      setPolarityState(next);
      applyDocumentPolarity(next);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const setPolarity = useCallback((next: ThemePolarity) => {
    setPolarityState(next);
    applyDocumentPolarity(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const togglePolarity = useCallback(() => {
    setPolarityState((prev) => {
      const next: ThemePolarity = prev === 'paper' ? 'ink' : 'paper';
      applyDocumentPolarity(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, []);

  return { polarity, setPolarity, togglePolarity };
}
