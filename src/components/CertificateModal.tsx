import { useId } from 'react';
import { type Certificate } from '../data/portfolio';
import { Modal } from './ui/Modal';
import { OptimizedPicture } from './ui/OptimizedPicture';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const titleId = useId();

  if (!certificate) return null;

  const number = String(certificate.id).padStart(2, '0');
  const isPdf = certificate.verificationUrl.toLowerCase().endsWith('.pdf');

  return (
    <Modal onClose={onClose} labelledBy={titleId} className="sm:max-w-4xl">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 pr-16">
        <span className="astro-coord">CREDENTIAL // {number}</span>
        <span className="astro-telemetry">{certificate.year}</span>
      </div>

      <div className="relative aspect-[16/11] w-full overflow-hidden border-b border-white/10 bg-[#050714] p-3 sm:p-5">
        <OptimizedPicture
          src={certificate.image}
          alt={`${certificate.title} — ${certificate.issuer}`}
          eager
          className="h-full w-full object-contain"
        />
      </div>

      <div className="p-6 sm:p-8">
        <h2 id={titleId} className="mincho-sub text-lg text-white sm:text-xl">
          {certificate.title}
        </h2>

        <dl className="mt-5 divide-y divide-white/10 border-y border-white/10 text-sm">
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
            <dt className="astro-telemetry">Issuer</dt>
            <dd className="text-slate-100">{certificate.issuer}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
            <dt className="astro-telemetry">Issued</dt>
            <dd className="font-mono text-xs text-amber-200">{certificate.year}</dd>
          </div>
        </dl>

        {certificate.verificationUrl && (
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={certificate.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tiamat"
            >
              {isPdf ? 'Verify PDF Document' : 'Verify Credential'}
              <span className="link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default CertificateModal;
