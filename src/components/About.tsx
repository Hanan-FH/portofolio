import { portfolioData } from '../data/portfolio';
import { Section, SectionHeading } from './ui/Section';
import { MagneticTilt } from './ui/MagneticTilt';

export function About() {
  const { about, education, personal } = portfolioData;

  return (
    <Section id="about">
      <div className="container-site">
        <SectionHeading index="01" label="Profile & Background" note="Bogor, West Java" />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Main Statement & Narrative */}
          <div className="lg:col-span-7">
            <h2 className="text-statement font-medium text-paper">
              {about.heading}
            </h2>
            <div className="mt-9 grid max-w-[38rem] gap-5 text-[1.02rem] leading-[1.8] text-mist">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Academic Track Record */}
            <div className="mt-14 border-t border-line pt-8">
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-signal">
                Academic Trajectory
              </span>
              <div className="mt-5 space-y-6">
                {education.map((item, index) => (
                  <div key={index} className="rounded-xs border border-line/80 bg-panel/60 p-5 backdrop-blur-md">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[0.72rem] font-semibold text-signal">
                        {item.period}
                      </span>
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-dim">
                        ● {item.status}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-paper">{item.program}</h3>
                    <p className="font-mono text-xs text-mist">{item.institution}</p>
                    <p className="mt-3 text-sm leading-relaxed text-dim">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Telemetry */}
          <div className="lg:col-span-5">
            <div className="rounded-xs border border-line bg-panel/90 p-6 shadow-xl backdrop-blur-md sm:p-7">
              <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-[0.65rem] tracking-[0.12em] text-dim">
                <span>SYSTEM STATUS</span>
                <span className="text-signal">LIVE BEACON // 01</span>
              </div>

              <dl className="divide-y divide-line/70">
                <div className="py-4">
                  <dt className="meta-label">Current Status</dt>
                  <dd className="mt-1 flex items-center gap-2 text-sm text-paper">
                    <span className="beacon-pulse h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_8px_rgba(0,209,255,0.8)]" />
                    {about.status}
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="meta-label">Engineering Focus</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-mist">
                    {about.currentFocus}
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="meta-label">Geographic Base</dt>
                  <dd className="mt-1 text-sm text-mist">{about.location}</dd>
                </div>

                <div className="py-4">
                  <dt className="meta-label">Direct Communication</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${personal.email}`}
                      className="font-mono text-sm text-paper underline decoration-line-strong underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
                    >
                      {personal.email} ↗
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Foundation Dossier: SMK Plus Pelita Nusantara Technical Syllabus */}
        <div className="mt-20 border-t border-line pt-12">
          <MagneticTilt
            maxTilt={2}
            enableGlow={true}
            className="rounded-xs border border-line bg-panel/85 p-6 backdrop-blur-md transition-all duration-300 hover:border-signal/40 sm:p-10"
          >
            {/* Dossier Header */}
            <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-signal">
                  Vocational Engineering Matrix // SMK Plus Pelita Nusantara
                </span>
                <h3 className="mt-2 text-xl font-medium tracking-tight text-paper sm:text-2xl">
                  Core Software Engineering Foundations
                </h3>
              </div>
              <span className="font-mono text-[0.66rem] tracking-[0.08em] text-dim">
                REKAYASA PERANGKAT LUNAK (RPL)
              </span>
            </div>

            {/* Linear Syllabus Registry */}
            <div className="mt-6 divide-y divide-line/60">
              {about.fundamentals.map((item) => (
                <div
                  key={item.id}
                  className="group grid gap-4 py-6 transition-colors sm:grid-cols-12 sm:items-baseline sm:gap-6 hover:bg-white/[0.015]"
                >
                  {/* Discipline Code & Indonesian Curriculum Subject */}
                  <div className="sm:col-span-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[0.68rem] font-bold tracking-[0.12em] text-signal">
                        DISC-{item.id}
                      </span>
                      <span aria-hidden="true" className="h-2.5 w-px bg-line-strong" />
                      <span className="font-mono text-[0.72rem] tracking-[0.04em] text-paper">
                        {item.localTitle}
                      </span>
                    </div>
                  </div>

                  {/* English Discipline Title & Competency Scope */}
                  <div className="sm:col-span-8">
                    <h4 className="text-[1.05rem] font-medium text-paper transition-colors duration-200 group-hover:text-signal">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-mist">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-4 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-dim">
              <span>Standard Vocational Curriculum Alignment</span>
              <span className="text-signal/90">Bogor, West Java · Active Curriculum</span>
            </div>
          </MagneticTilt>
        </div>
      </div>
    </Section>
  );
}

export default About;
