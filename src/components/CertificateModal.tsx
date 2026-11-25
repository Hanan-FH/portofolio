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
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECECF0]/15 px-6 py-4 pr-24">
        <div className="flex items-center gap-2.5">
          <span className="inline-block bg-[#584CE6] px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-white [clip-path:polygon(4px_0,100%_0,calc(100%-4px)_100%,0_100%)]">
            CERT {number}
          </span>
          <span className="mono-stamp text-[#ECECF0]">ACCREDITED RECORD</span>
        </div>
        <span className="mono-stamp text-[#A6A6B2]">{certificate.year}</span>
      </div>

      {/* 100% Original Color & Clarity */}
      <div className="relative aspect-[16/11] w-full overflow-hidden border-b border-[#ECECF0]/15 bg-[#101015] p-4 sm:p-6">
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
        <h2 id={titleId} className="text-xl uppercase leading-[1.0] tracking-[-0.03em] text-[#ECECF0] sm:text-2xl">
          {certificate.title}
        </h2>

        <dl className="mt-6 divide-y divide-[#ECECF0]/15 border-y border-[#ECECF0]/15 text-sm">
          <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
            <dt className="mono-stamp text-[#A6A6B2]">Issuer</dt>
            <dd className="font-medium text-[#ECECF0]">{certificate.issuer}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
            <dt className="mono-stamp text-[#A6A6B2]">Issued</dt>
            <dd className="font-mono text-xs font-semibold text-[#ECECF0]">{certificate.year}</dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          {certificate.verificationUrl && (
            <a
              href={certificate.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-beat-light"
            >
              <span>{isPdf ? 'Open Official PDF' : 'Open Full Certificate'}</span>
              <span className="beat-arrow" aria-hidden="true">↗</span>
            </a>
          )}

          {onStep && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Previous certificate"
                className="inline-flex h-10 items-center border border-[#ECECF0]/25 px-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#ECECF0] hover:bg-[#584CE6] hover:border-[#584CE6] cursor-pointer"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Next certificate"
                className="inline-flex h-10 items-center border border-[#ECECF0]/25 px-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#ECECF0] hover:bg-[#584CE6] hover:border-[#584CE6] cursor-pointer"
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
