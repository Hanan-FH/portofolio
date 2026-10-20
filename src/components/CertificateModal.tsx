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

  return (
    <Modal onClose={onClose} labelledBy={titleId} className="sm:max-w-3xl">
      <div className="flex items-center justify-between gap-6 border-b border-line px-5 py-4 pr-16">
        <span className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-signal">
          Credential {number}
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-dim">
          {certificate.year}
        </span>
      </div>

      <div className="border-b border-line bg-[#0c0d0f] p-3 sm:p-5">
        <img
          src={certificate.image}
          alt={`Certificate: ${certificate.title}, issued by ${certificate.issuer}`}
          className="mx-auto max-h-[58vh] w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="p-5 sm:p-8">
        <h2
          id={titleId}
          className="max-w-[36ch] text-xl font-medium leading-[1.25] tracking-[-0.02em] text-paper sm:text-2xl"
        >
          {certificate.title}
        </h2>

        <dl className="mt-6 border-t border-line">
          <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line/70 py-3">
            <dt className="meta-label">Issuer</dt>
            <dd className="text-sm text-mist">{certificate.issuer}</dd>
          </div>
          <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-3">
            <dt className="meta-label">Year</dt>
            <dd className="text-sm text-mist">{certificate.year}</dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          {certificate.verificationUrl && (
            <a
              href={certificate.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid text-xs"
            >
              Open original document
              <span aria-hidden="true">↗</span>
            </a>
          )}
          <span className="font-mono text-[0.6rem] text-dim">Opens in a new tab.</span>
        </div>
      </div>
    </Modal>
  );
}

export default CertificateModal;
