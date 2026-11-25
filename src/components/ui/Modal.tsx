import { useEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  className?: string;
}

/**
 * Animated Zero-Dependency Native HTML <dialog> Lightbox.
 * Opens with crisp scale(0.95 -> 1) + opacity entrance, zero blur, ESC & backdrop dismiss.
 */
export function Modal({ open, onClose, labelledBy, children, className = '' }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;

    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (!dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault();
        onCloseRef.current();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onCloseRef.current();
        }
      }}
      className={`m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-4xl overflow-y-auto border-[1.5px] border-[var(--line-strong)] bg-[var(--bg-surface)] p-0 text-[var(--ink-primary)] focus:outline-none ${className}`.trim()}
    >
      <div className="relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview modal"
          className="roll-trigger absolute right-4 top-3 z-20 inline-flex h-8 items-center gap-2 border border-[var(--line-hairline)] bg-[var(--bg-surface)] px-3 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--ink-primary)] hover:border-[var(--accent-purple)] hover:bg-[var(--accent-purple)] hover:text-white cursor-pointer"
        >
          <span>ESC</span>
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        {children}
      </div>
    </dialog>
  );
}

export default Modal;
