import { useEffect } from 'react';
import { type Certificate } from '../data/portfolio';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (certificate) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('modal-locked');
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-locked');
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const num = String(certificate.id).padStart(2, '0');

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate details: ${certificate.title}`}
    >
      <div className="modal-container cert-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="modal-index">CREDENTIAL // {num}</span>
            <span className="modal-category">{certificate.issuer}</span>
            <span className="modal-year">{certificate.year}</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close certificate modal"
          >
            ✕
          </button>
        </div>

        {certificate.image && (
          <div className="modal-media-frame cert-media-frame">
            <img
              src={certificate.image}
              alt={`Certificate credential for ${certificate.title}`}
              className="modal-image cert-modal-image"
              loading="lazy"
            />
          </div>
        )}

        <div className="modal-body">
          <h2 className="modal-title">{certificate.title}</h2>
          <div className="modal-cert-meta">
            <div className="meta-item">
              <span className="meta-label">Issuing Authority</span>
              <span className="meta-value">{certificate.issuer}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Issued Year</span>
              <span className="meta-value">{certificate.year}</span>
            </div>
          </div>

          <div className="modal-footer">
            <div className="modal-links">
              {certificate.verificationUrl && (
                <a
                  href={certificate.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span>Open Full Document</span> ↗
                </a>
              )}
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificateModal;
