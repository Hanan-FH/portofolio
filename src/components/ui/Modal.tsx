import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  className?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible dialog shell: portal, scroll lock, focus entry/return,
 * Escape to close, backdrop click, and a simple focus loop.
 */
export function Modal({ onClose, labelledBy, children, className = '' }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    const initialFocus = panel?.querySelector<HTMLElement>('[data-autofocus]');
    initialFocus?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab' || !panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null
      );

      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, []);

  return createPortal(
    <div
      className="modal-backdrop-enter fixed inset-0 z-[200] flex items-end justify-center overflow-y-auto bg-black/80 p-0 backdrop-blur-md sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={`modal-panel-enter relative max-h-[92dvh] w-full overflow-y-auto border border-line-strong bg-panel shadow-[0_24px_80px_rgba(0,0,0,0.7)] focus:outline-none sm:max-w-3xl ${className}`.trim()}
      >
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center border border-white/25 bg-black/70 text-white backdrop-blur-md transition-colors duration-200 hover:border-signal hover:text-signal focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
