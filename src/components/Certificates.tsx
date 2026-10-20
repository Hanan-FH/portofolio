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

        <div className="mt-14 grid gap-x-12 lg:grid-cols-2">
          {certificates.map((certificate, index) => {
            const number = String(index + 1).padStart(2, '0');

            return (
              <button
                key={certificate.id}
                type="button"
                onClick={() => onSelectCert(certificate)}
                aria-label={`Open certificate ${number}: ${certificate.title}, issued by ${certificate.issuer} in ${certificate.year}`}
                className="group grid w-full grid-cols-[6rem_1fr] items-start gap-4 border-t border-line py-5 text-left transition-colors duration-200 hover:border-line-strong sm:grid-cols-[7.5rem_1fr] sm:gap-5"
              >
                <span className="aspect-[4/3] w-full overflow-hidden border border-line bg-white">
                  <img
                    src={certificate.image}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-contain"
                    width={240}
                    height={180}
                    loading="lazy"
                    decoding="async"
                  />
                </span>

                <span className="min-w-0">
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex items-baseline gap-2 font-mono text-[0.6rem] tracking-[0.08em] text-dim">
                      <span className="text-signal">{number}</span>
                      <span aria-hidden="true" className="h-2.5 w-px bg-line-strong" />
                      <span>{certificate.year}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-sm text-dim transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                    >
                      ↗
                    </span>
                  </span>

                  <span className="mt-2 block text-[0.92rem] font-medium leading-snug text-paper transition-colors duration-200 group-hover:text-signal">
                    {certificate.title}
                  </span>
                  <span className="mt-1.5 block text-[0.76rem] leading-relaxed text-dim">
                    {certificate.issuer}
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
