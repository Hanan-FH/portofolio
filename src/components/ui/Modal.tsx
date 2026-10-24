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
 * Accessible Twilight Lightbox Modal: portal, scroll lock, focus entry/return,
 * Escape to close, backdrop click, and cyclic keyboard Tab focus loop.
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
      className="modal-backdrop-enter fixed inset-0 z-[220] flex items-end justify-center overflow-y-auto bg-[#050714]/85 p-0 backdrop-blur-xl sm:items-center sm:p-6"
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
        className={`modal-panel-enter crepuscular-card relative max-h-[92dvh] w-full overflow-y-auto rounded-t-2xl focus:outline-none sm:max-w-3xl sm:rounded-2xl ${className}`.trim()}
      >
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          aria-label="Close inspection lightbox"
          className="absolute right-3.5 top-3.5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-[#070a18]/80 text-slate-100 backdrop-blur-md transition-transform duration-200 hover:scale-105 hover:border-sky-300/70 hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
