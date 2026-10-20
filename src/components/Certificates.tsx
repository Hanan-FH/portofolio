import { portfolioData, type Certificate } from '../data/portfolio';

interface CertificatesProps {
  onSelectCert: (certificate: Certificate) => void;
}

export function Certificates({ onSelectCert }: CertificatesProps) {
  const { certificates } = portfolioData;

  return (
    <section id="certificates" className="section-container">
      <div className="section-header">
        <div className="section-header-top">
          <span className="section-eyebrow">// 04 · CREDENTIALS &amp; CERTIFICATIONS</span>
          <span className="section-count">{certificates.length} Certificates</span>
        </div>
        <h2 className="section-heading">Workshops, technical webinars, and completed accreditations.</h2>
      </div>

      <div className="certificates-grid">
        {certificates.map((cert, idx) => {
          const num = String(idx + 1).padStart(2, '0');

          return (
            <article
              key={cert.id}
              className="cert-card"
              onClick={() => onSelectCert(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectCert(cert);
                }
              }}
              aria-label={`View Certificate ${num}: ${cert.title}`}
            >
              <div className="cert-top-row">
                <span className="cert-number">CERT // {num}</span>
                <span className="cert-year">{cert.year}</span>
              </div>

              <div className="cert-main">
                <div className="cert-issuer">{cert.issuer}</div>
                <h3 className="cert-title">{cert.title}</h3>
              </div>

              <div className="cert-bottom-row">
                <span className="cert-view-text">View Credential</span>
                <span className="cert-arrow" aria-hidden="true">↗</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Certificates;
