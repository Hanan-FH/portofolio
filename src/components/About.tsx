import { portfolioData } from '../data/portfolio';
import { Section, SectionHeading } from './ui/Section';
import { MagneticTilt } from './ui/MagneticTilt';

export function About() {
  const { about, education, personal } = portfolioData;

  return (
    <Section id="about">
      <div className="container-site">
        <SectionHeading index="01" label="Profile" note="Bogor, West Java" />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 className="max-w-[20ch] text-statement font-medium text-paper">{about.heading}</h2>
            <div className="mt-9 grid max-w-[38rem] gap-5 text-[0.98rem] leading-[1.75] text-mist">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="border-t border-line">
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line/70 py-4">
                <dt className="meta-label">Status</dt>
                <dd className="flex items-start gap-2 text-sm text-paper">
                  <span
                    aria-hidden="true"
                    className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 bg-signal shadow-[0_0_8px_rgba(0,209,255,0.7)]"
                  />
                  {about.status}
                </dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line/70 py-4">
                <dt className="meta-label">Focus</dt>
                <dd className="text-sm leading-relaxed text-mist">{about.currentFocus}</dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line/70 py-4">
                <dt className="meta-label">Based in</dt>
                <dd className="text-sm text-mist">{about.location}</dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 py-4">
                <dt className="meta-label">Email</dt>
                <dd>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-sm text-paper underline decoration-line-strong underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
                  >
                    {personal.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Academic path */}
        <div className="mt-20 grid gap-6 border-t border-line pt-8 lg:grid-cols-12 lg:gap-8">
          <h3 className="meta-label lg:col-span-3">Academic path</h3>
          <div className="lg:col-span-8 lg:col-start-5">
            {education.map((item, index) => (
              <div key={index}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-mono text-[0.66rem] font-semibold tracking-[0.08em] text-signal">
                    {item.period}
                  </span>
                  <span aria-hidden="true" className="h-2.5 w-px bg-line-strong" />
                  <span className="meta-label">{item.status}</span>
                </div>
                <h4 className="mt-3 text-xl font-medium tracking-[-0.02em] text-paper">
                  {item.program}
                </h4>
                <p className="mt-1 text-sm text-mist">{item.institution}</p>
                <p className="mt-4 max-w-[42rem] text-sm leading-relaxed text-dim">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Foundation Dossier: SMK Plus Pelita Nusantara Technical Syllabus */}
        <div className="mt-16 border-t border-line pt-10">
          <MagneticTilt
            maxTilt={2}
            enableGlow={true}
            className="rounded-xs border border-line bg-panel/75 p-6 backdrop-blur-md transition-all duration-300 hover:border-signal/40 sm:p-9"
          >
            {/* Dossier Header */}
            <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-signal">
                  Core Curriculum Matrix // SMK Plus Pelita Nusantara
                </span>
                <h3 className="mt-2 text-xl font-medium tracking-tight text-paper sm:text-2xl">
                  Vocational Software Engineering Foundations
                </h3>
              </div>
              <span className="font-mono text-[0.64rem] tracking-[0.08em] text-dim">
                REKAYASA PERANGKAT LUNAK (RPL)
              </span>
            </div>

            {/* Linear Syllabus Registry (High-End Technical Aesthetic) */}
            <div className="mt-6 divide-y divide-line/60">
              {about.fundamentals.map((item) => (
                <div
                  key={item.id}
                  className="group grid gap-4 py-5 transition-colors sm:grid-cols-12 sm:items-baseline sm:gap-6 hover:bg-white/[0.015]"
                >
                  {/* Discipline Code & Indonesian Curriculum Subject */}
                  <div className="sm:col-span-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[0.66rem] font-bold tracking-[0.12em] text-signal">
                        DISC-{item.id}
                      </span>
                      <span aria-hidden="true" className="h-2 w-px bg-line-strong" />
                      <span className="font-mono text-[0.68rem] tracking-[0.04em] text-paper">
                        {item.localTitle}
                      </span>
                    </div>
                  </div>

                  {/* English Discipline Title & Competency Scope */}
                  <div className="sm:col-span-8">
                    <h4 className="text-[0.96rem] font-medium text-paper transition-colors duration-200 group-hover:text-signal">
                      {item.title}
                    </h4>
                    <p className="mt-1.5 text-[0.85rem] leading-relaxed text-mist">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-4 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-dim">
              <span>Standard Vocational Curriculum Alignment</span>
              <span className="text-signal/80">Bogor, West Java · Active Certification</span>
            </div>
          </MagneticTilt>
        </div>
      </div>
    </Section>
  );
}

export default About;
