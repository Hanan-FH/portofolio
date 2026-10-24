import { useState } from 'react';
import { portfolioData, type Certificate } from '../../data/portfolio';
import { Section, SectionHeading } from '../ui/Section';

interface CertificatesProps {
  onSelectCert: (certificate: Certificate) => void;
}

const FILTERS = [
  { id: 'all', label: 'All (10)' },
  { id: 'ai-cloud', label: 'AI & Cloud', ids: [4, 5, 6, 7] },
  { id: 'web', label: 'Web & Comm', ids: [1, 2, 3] },
  { id: 'specialized', label: 'Security & Game', ids: [8, 9, 10] },
];

export function Certificates({ onSelectCert }: CertificatesProps) {
  const { certificates } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = certificates.filter((cert) => {
    if (activeFilter === 'all') return true;
    const cat = FILTERS.find((c) => c.id === activeFilter);
    return cat?.ids?.includes(cert.id) ?? true;
  });

  return (
    <Section id="certificates" verticalLabel="認定証">
      <div className="container-site">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <SectionHeading
              index="04"
              label="Credential Vault"
              kanji="認定証"
              note={`${certificates.length} Accredited`}
            />
          </div>
        </div>

        {/* Minimalist Filter Bar */}
        <div
          className="mt-8 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter credentials"
        >
          {FILTERS.map((cat) => {
            const active = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveFilter(cat.id)}
                className={`min-h-9 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  active ? 'btn-tiamat min-h-9 px-3.5 py-1.5 text-[10px]' : 'twilight-chip text-slate-300'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 10-Certificate Architectural Vault Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((certificate) => {
            const number = String(certificate.id).padStart(2, '0');

            return (
              <article
                key={certificate.id}
                className="kumihimo-panel group flex flex-col justify-between p-4"
              >
                <button
                  type="button"
                  onClick={() => onSelectCert(certificate)}
                  aria-label={`Open certificate ${number}: ${certificate.title}`}
                  className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <div className="relative aspect-[16/11] w-full overflow-hidden border border-white/10 bg-[#050714]">
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      width={480}
                      height={330}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                      style={{
                        background:
                          'linear-gradient(180deg, transparent 45%, rgba(5, 7, 20, 0.45) 100%)',
                      }}
                    />
                  </div>

                  <div className="mt-3.5 flex items-center justify-between gap-2">
                    <span className="astro-coord">CERT-{number}</span>
                    <span className="astro-telemetry">{certificate.year}</span>
                  </div>

                  <h2 className="mt-2 text-sm font-medium leading-snug text-white group-hover:text-amber-100">
                    {certificate.title}
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">{certificate.issuer}</p>
                </button>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectCert(certificate)}
                    className="celestial-link inline-flex min-h-9 items-center font-mono text-[10px] uppercase tracking-[0.22em] text-sky-300 hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    Lightbox
                  </button>

                  {certificate.verificationUrl && (
                    <a
                      href={certificate.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify ${certificate.title} (opens in a new tab)`}
                      className="celestial-link inline-flex min-h-9 items-center font-mono text-[10px] uppercase tracking-[0.22em] text-slate-300 hover:text-pink-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      Verify ↗
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
