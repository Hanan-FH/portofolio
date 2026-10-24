import { useId } from 'react';
import { type Certificate } from '../data/portfolio';
import { Modal } from './ui/Modal';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const titleId = useId();

  if (!certificate) return null;

  const number = String(certificate.id).padStart(2, '0');
  const isPdfDocument = certificate.verificationUrl.toLowerCase().endsWith('.pdf');

  return (
    <Modal onClose={onClose} labelledBy={titleId} className="sm:max-w-4xl">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 pr-16">
        <span className="astro-label">Credential Vault // CERT-{number}</span>
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-amber-200/85">
          Issued {certificate.year}
        </span>
      </div>

      {/* Explicit aspect-ratio full-resolution inspection stage */}
      <div className="relative aspect-[16/11] w-full overflow-hidden border-b border-white/10 bg-[#050816] p-3 sm:p-5">
        <img
          src={certificate.image}
          alt={`Certificate: ${certificate.title}, issued by ${certificate.issuer}`}
          className="h-full w-full object-contain"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="p-6 sm:p-8">
        <h2
          id={titleId}
          className="editorial-heading text-xl font-semibold text-white sm:text-2xl"
        >
          {certificate.title}
        </h2>

        <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
          <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
            <dt className="astro-meta">Issuing Body</dt>
            <dd className="text-sm font-medium text-slate-100">{certificate.issuer}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
            <dt className="astro-meta">Issue Date</dt>
            <dd className="font-mono text-sm text-sky-200">{certificate.year}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
            <dt className="astro-meta">Archive ID</dt>
            <dd className="font-mono text-xs text-pink-200/90">CERT-{number} · VERIFIED RECORD</dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          {certificate.verificationUrl && (
            <a
              href={certificate.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-comet text-xs"
            >
              {isPdfDocument ? 'Open Verified PDF Credential' : 'Inspect Original Credential'}
              <span className="link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          )}
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-slate-400">
            Opens full document in a new tab
          </span>
        </div>
      </div>
    </Modal>
  );
}

export default CertificateModal;
