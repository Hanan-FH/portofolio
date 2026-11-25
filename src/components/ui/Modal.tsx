import { useEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  className?: string;
}

/**
 * Zero-Dependency Native HTML <dialog> Lightbox.
 * Crisp snap-in animation, zero blur, ESC & backdrop click dismiss.
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
      className={`m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] max-w-4xl overflow-y-auto border border-[#ECECF0]/25 bg-[#060608] p-0 text-[#ECECF0] focus:outline-none ${className}`.trim()}
    >
      <div className="relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview modal"
          className="absolute right-4 top-3.5 z-20 inline-flex h-8 items-center gap-1.5 bg-[#ECECF0] px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#060608] [clip-path:polygon(6px_0,100%_0,100%_100%,0_100%)] hover:bg-[#584CE6] hover:text-white cursor-pointer"
        >
          <span>ESC</span>
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.75" />
          </svg>
        </button>
        {children}
      </div>
    </dialog>
  );
}

export default Modal;
