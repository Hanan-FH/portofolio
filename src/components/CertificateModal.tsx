import { useId } from 'react';
import { type Certificate } from '../data/portfolio';
import { Modal } from './ui/Modal';
import { OptimizedPicture } from './ui/OptimizedPicture';
import { RollingText } from './ui/RollingText';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
  onStep?: (delta: -1 | 1) => void;
}

export function CertificateModal({ certificate, onClose, onStep }: CertificateModalProps) {
  const titleId = useId();

  if (!certificate) return null;

  const number = String(certificate.id).padStart(2, '0');
  const isPdf = certificate.verificationUrl.toLowerCase().endsWith('.pdf');

  return (
    <Modal open={Boolean(certificate)} onClose={onClose} labelledBy={titleId}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line-hairline)] px-6 py-4 pr-24">
        <div className="flex items-center gap-2.5">
          <span className="mono-index font-semibold text-[var(--accent-purple)]">{number}</span>
          <span aria-hidden="true" className="mono-index text-[var(--ink-muted)]">/</span>
          <span className="mono-index text-[var(--ink-primary)]">CREDENTIAL</span>
        </div>
        <span className="mono-index text-[var(--ink-muted)]">{certificate.year}</span>
      </div>

      {/* Full Clarity Certificate Viewport — Never Grayscale */}
      <div className="editorial-halftone relative aspect-[16/11] w-full overflow-hidden border-b border-[var(--line-hairline)] bg-[var(--bg-subtle)] p-4 sm:p-6">
        <OptimizedPicture
          src={certificate.image}
          alt={`${certificate.title} — ${certificate.issuer}`}
          width={1600}
          height={1100}
          eager
          className="h-full w-full object-contain"
        />
      </div>

      <div className="p-6 sm:p-10">
        <h2 id={titleId} className="text-xl uppercase leading-[1.02] tracking-[-0.03em] sm:text-2xl">
          {certificate.title}
        </h2>

        <dl className="mt-6 divide-y divide-[var(--line-hairline)] border-y border-[var(--line-hairline)] text-sm">
          <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-4">
            <dt className="mono-index text-[var(--ink-muted)]">Issuer</dt>
            <dd className="font-medium text-[var(--ink-primary)]">{certificate.issuer}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-4">
            <dt className="mono-index text-[var(--ink-muted)]">Issued</dt>
            <dd className="font-mono text-xs font-medium text-[var(--ink-primary)]">
              {certificate.year}
            </dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          {certificate.verificationUrl && (
            <a
              href={certificate.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-kinetic-ink"
            >
              <RollingText text={isPdf ? 'Verify PDF Document' : 'Open Original Certificate'} />
              <span className="kinetic-arrow" aria-hidden="true">↗</span>
            </a>
          )}

          {onStep && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Previous certificate"
                className="roll-trigger inline-flex h-10 items-center border border-[var(--line-hairline)] px-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] hover:border-[var(--line-strong)] cursor-pointer"
              >
                <RollingText text="← Prev" />
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Next certificate"
                className="roll-trigger inline-flex h-10 items-center border border-[var(--line-hairline)] px-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] hover:border-[var(--line-strong)] cursor-pointer"
              >
                <RollingText text="Next →" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default CertificateModal;
