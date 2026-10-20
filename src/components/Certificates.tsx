import { portfolioData, type Certificate } from '../data/portfolio';
import { Section, SectionHeading } from './ui/Section';

interface CertificatesProps {
  onSelectCert: (certificate: Certificate) => void;
}

export function Certificates({ onSelectCert }: CertificatesProps) {
  const { certificates } = portfolioData;

  return (
    <Section id="certificates">
      <div className="container-site">
        <SectionHeading index="04" label="Credentials" note="10 certificates" />

        <div className="mt-10 max-w-[44rem]">
          <h2 className="text-statement font-medium text-paper">
            Workshops, technical webinars, and completed accreditations.
          </h2>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-6 lg:grid-cols-2">
          {certificates.map((certificate, index) => {
            const number = String(index + 1).padStart(2, '0');

            return (
              <button
                key={certificate.id}
                type="button"
                onClick={() => onSelectCert(certificate)}
                aria-label={`Open certificate ${number}: ${certificate.title}, issued by ${certificate.issuer} in ${certificate.year}`}
                className="group grid w-full grid-cols-[6.5rem_1fr] items-start gap-4 rounded-xs border border-line/70 bg-panel/50 p-4 text-left transition-all duration-200 hover:border-signal/45 hover:bg-panel hover:shadow-[0_8px_24px_rgba(0,209,255,0.08)] sm:grid-cols-[8.5rem_1fr] sm:gap-5 focus:outline-none focus-visible:ring-1 focus-visible:ring-signal"
              >
                {/* Calibrated Studio Matte Thumbnail */}
                <span className="aspect-[16/11] w-full overflow-hidden rounded-[2px] border border-line/80 bg-[#0d0f13] p-1 shadow-sm transition-all duration-300 group-hover:border-signal/50">
                  <img
                    src={certificate.image}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover object-top transition-transform duration-500 ease-fluid group-hover:scale-[1.04]"
                    width={272}
                    height={187}
                    loading="lazy"
                    decoding="async"
                  />
                </span>

                <span className="min-w-0 flex flex-col justify-between self-stretch">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-baseline gap-2 font-mono text-[0.62rem] tracking-[0.08em] text-dim">
                        <span className="font-semibold text-signal">CERT-{number}</span>
                        <span aria-hidden="true" className="h-2 w-px bg-line-strong" />
                        <span>{certificate.year}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs text-dim transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                      >
                        ↗
                      </span>
                    </div>

                    <span className="mt-2 block text-[0.92rem] font-medium leading-snug text-paper transition-colors duration-200 group-hover:text-signal">
                      {certificate.title}
                    </span>
                    <span className="mt-1.5 block text-[0.76rem] leading-relaxed text-dim">
                      {certificate.issuer}
                    </span>
                  </div>

                  <span className="mt-3 flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-signal/70 group-hover:text-signal">
                    <span className="h-1 w-1 rounded-full bg-signal" />
                    Verified Accreditation
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export default Certificates;
