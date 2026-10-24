import { useState } from 'react';
import { portfolioData, type Certificate } from '../../data/portfolio';
import { Section, SectionHeading } from '../ui/Section';

interface CertificatesProps {
  onSelectCert: (certificate: Certificate) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Credentials (10)' },
  { id: 'ai-cloud', label: 'AI & Cloud Systems', ids: [4, 5, 6, 7] },
  { id: 'web', label: 'Web & Communication', ids: [1, 2, 3] },
  { id: 'specialized', label: 'Security & Game Dev', ids: [8, 9, 10] },
];

export function Certificates({ onSelectCert }: CertificatesProps) {
  const { certificates } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCertificates = certificates.filter((cert) => {
    if (activeFilter === 'all') return true;
    const cat = CATEGORIES.find((c) => c.id === activeFilter);
    return cat?.ids?.includes(cert.id) ?? true;
  });

  return (
    <Section id="certificates">
      <div className="container-site">
        <SectionHeading
          index="04"
          label="Credential Vault"
          kanji="認定証"
          note={`${certificates.length} Accredited Records`}
        />

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[44rem]">
            <h2 className="editorial-heading text-2xl font-semibold text-white sm:text-3xl lg:text-[2.2rem]">
              Technical certifications, workshops, and verified accreditations.
            </h2>
          </div>

          {/* Twilight Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter credentials">
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`min-h-9 rounded-full px-4 py-1.5 font-mono text-xs tracking-[0.08em] transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    isActive
                      ? 'btn-comet min-h-9 px-4 py-1.5 text-xs'
                      : 'twilight-badge text-slate-300 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Credential Gallery with Twilight Glass Frames */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCertificates.map((certificate) => {
            const number = String(certificate.id).padStart(2, '0');

            return (
              <article
                key={certificate.id}
                className="crepuscular-card-interactive group flex flex-col justify-between overflow-hidden rounded-2xl p-4 sm:p-5"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => onSelectCert(certificate)}
                    aria-label={`Inspect full-resolution certificate ${number}: ${certificate.title}`}
                    className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    {/* Explicit 16:11 Aspect-Ratio Certificate Frame */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-white/15 bg-[#060919]">
                      <img
                        src={certificate.image}
                        alt={certificate.title}
                        width={480}
                        height={330}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.035]"
                      />

                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(7, 10, 24, 0.08) 0%, rgba(7, 10, 24, 0.38) 100%)',
                        }}
                      />

                      <span className="pointer-events-none absolute right-2.5 top-2.5 rounded-full border border-white/20 bg-[#070a18]/80 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-amber-200 backdrop-blur-md">
                        Lightbox ↗
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-pink-300">
                        CERT-{number}
                      </span>
                      <span className="font-mono text-[0.66rem] tracking-[0.18em] text-sky-200/80">
                        {certificate.year}
                      </span>
                    </div>

                    <h3 className="mt-2 text-[0.98rem] font-semibold leading-snug text-white transition-colors group-hover:text-amber-200">
                      {certificate.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-relaxed text-slate-300/85">
                      {certificate.issuer}
                    </p>
                  </button>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3.5">
                  <button
                    type="button"
                    onClick={() => onSelectCert(certificate)}
                    className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-sky-300 transition-colors hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    Inspect Full View
                  </button>

                  {certificate.verificationUrl && (
                    <a
                      href={certificate.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify original document for ${certificate.title} (opens in a new tab)`}
                      className="inline-flex items-center gap-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slate-300 transition-colors hover:text-pink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      Verify
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export default Certificates;
