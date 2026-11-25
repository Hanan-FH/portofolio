import { useId } from 'react';
import { type Certificate } from '../data/portfolio';
import { Modal } from './ui/Modal';
import { OptimizedPicture } from './ui/OptimizedPicture';

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
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-[var(--border-strong)] bg-[var(--bg-primary)] px-5 py-3.5 pr-24">
        <span className="inline-flex bg-[var(--bg-inverted)] px-2 py-0.5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--bg-primary)]">
          CERTIFICATE {number}
        </span>
        <span className="mono-label text-[var(--ink-secondary)]">
          ISSUED // {certificate.year}
        </span>
      </div>

      <div className="halftone-surface relative aspect-[16/11] w-full overflow-hidden border-b-[1.5px] border-[var(--border-strong)] bg-[var(--bg-subtle)] p-3 sm:p-6">
        <OptimizedPicture
          src={certificate.image}
          alt={`${certificate.title} — ${certificate.issuer}`}
          width={1600}
          height={1100}
          eager
          className="h-full w-full object-contain"
        />
      </div>

      <div className="p-6 sm:p-8">
        <h2 id={titleId} className="display-card text-xl sm:text-2xl">
          {certificate.title}
        </h2>

        <dl className="mt-5 divide-y divide-[var(--border-subtle)] border-y-[1.5px] border-[var(--border-strong)] text-sm">
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
            <dt className="mono-label text-[var(--ink-muted)]">Issuer</dt>
            <dd className="font-medium text-[var(--ink-primary)]">{certificate.issuer}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
            <dt className="mono-label text-[var(--ink-muted)]">Year</dt>
            <dd className="font-mono text-xs font-semibold text-[var(--ink-primary)]">
              {certificate.year}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          {certificate.verificationUrl && (
            <a
              href={certificate.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink"
            >
              <span>{isPdf ? 'Open Official PDF' : 'Open Full Certificate'}</span>
              <span className="btn-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          )}

          {onStep && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Previous certificate"
                className="inline-flex h-10 items-center border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-primary)] px-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] hover:bg-[var(--bg-inverted)] hover:text-[var(--bg-primary)]"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Next certificate"
                className="inline-flex h-10 items-center border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-primary)] px-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] hover:bg-[var(--bg-inverted)] hover:text-[var(--bg-primary)]"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default CertificateModal;
