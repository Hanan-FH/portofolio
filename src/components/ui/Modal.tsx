import { useEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  className?: string;
}

/**
 * Zero-dependency Native HTML <dialog> Lightbox Modal.
 * Supports ESC to close, backdrop click to close, and crisp brutalist framing with zero blur.
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
      className={`m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-4xl overflow-y-auto border-2 border-[var(--border-strong)] bg-[var(--bg-surface)] p-0 text-[var(--ink-primary)] shadow-[8px_8px_0px_var(--border-strong)] focus:outline-none ${className}`.trim()}
    >
      <div className="relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview modal"
          className="absolute right-3 top-3 z-20 inline-flex h-9 items-center gap-1.5 border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-surface)] px-2.5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ink-primary)] hover:bg-[var(--bg-inverted)] hover:text-[var(--bg-primary)]"
        >
          <span>ESC</span>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.75" />
          </svg>
        </button>
        {children}
      </div>
    </dialog>
  );
}

export default Modal;
