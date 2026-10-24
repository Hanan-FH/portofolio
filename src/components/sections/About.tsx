import { portfolioData } from '../../data/portfolio';
import { Section, SectionHeading } from '../ui/Section';

export function About() {
  const { about, education, personal } = portfolioData;

  return (
    <Section id="about">
      <div className="container-site">
        <SectionHeading
          index="01"
          label="The Journey & Narrative"
          kanji="軌跡"
          note={about.location}
        />

        {/* Editorial Bio & Astronomical Telemetry Split */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="editorial-heading text-2xl font-semibold text-white sm:text-3xl lg:text-[2.2rem]">
              {about.heading}
            </h2>

            <div className="mt-7 space-y-5 text-[1.02rem] leading-[1.85] text-slate-200/90">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Right Column: Twilight Observatory Dossier */}
          <div className="lg:col-span-5">
            <div className="crepuscular-card rounded-2xl p-6 sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="astro-label">Observatory Dossier</span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-sky-300">
                  ● Active Node
                </span>
              </div>

              <dl className="divide-y divide-white/10">
                <div className="py-4">
                  <dt className="astro-meta">Current Status</dt>
                  <dd className="mt-1.5 flex items-center gap-2.5 text-sm font-medium text-white">
                    <span className="beacon-pulse h-2 w-2 rounded-full bg-gradient-to-tr from-rose-500 to-amber-200 shadow-[0_0_10px_rgba(244,63,94,0.85)]" />
                    {about.status}
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="astro-meta">Core Focus</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-slate-200">
                    {about.currentFocus}
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="astro-meta">Coordinates</dt>
                  <dd className="mt-1.5 text-sm text-slate-200">{about.location}</dd>
                </div>

                <div className="pt-4">
                  <dt className="astro-meta">Direct Dispatch</dt>
                  <dd className="mt-1.5">
                    <a
                      href={`mailto:${personal.email}`}
                      className="inline-flex items-center gap-1.5 rounded font-mono text-sm text-sky-300 underline decoration-sky-400/40 underline-offset-4 transition-colors hover:text-amber-200 hover:decoration-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      {personal.email}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Vertical Twilight Guide Line & Glowing Planetary Nodes (Education + Vocational Foundations) */}
        <div className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="astro-label">Academic &amp; Engineering Trajectory</span>
              <h3 className="editorial-heading mt-2 text-xl font-semibold text-white sm:text-2xl">
                SMK Plus Pelita Nusantara — Software Engineering (RPL)
              </h3>
            </div>
            <span className="astro-meta">Orbital Timeline // 05 Nodes</span>
          </div>

          <div className="relative mt-10 pl-8 sm:pl-12">
            {/* Continuous Vertical Twilight Guide Line */}
            <div
              aria-hidden="true"
              className="absolute bottom-4 left-[11px] top-2 w-px sm:left-[15px]"
              style={{
                background:
                  'linear-gradient(180deg, #fef08a 0%, #38bdf8 28%, #f43f5e 68%, rgba(192, 132, 252, 0.18) 100%)',
              }}
            />

            <div className="space-y-8">
              {/* Primary Education Record(s) */}
              {education.map((item, idx) => (
                <article
                  key={`${item.institution}-${idx}`}
                  className="crepuscular-card-interactive relative rounded-2xl p-6 sm:p-7"
                >
                  {/* Glowing Planetary Cyan-Gold Node */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-[27px] top-7 flex h-4 w-4 items-center justify-center rounded-full border border-amber-200/80 bg-[#070a18] shadow-[0_0_18px_rgba(56,189,248,0.9)] sm:-left-[39px]"
                  >
                    <span className="h-2 w-2 rounded-full bg-sky-300" />
                  </span>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-amber-200">
                      {item.period}
                    </span>
                    <span className="twilight-badge rounded-full px-3 py-0.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-sky-200">
                      ● {item.status}
                    </span>
                  </div>

                  <h4 className="editorial-heading mt-3 text-xl font-semibold text-white">
                    {item.program}
                  </h4>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-pink-200/85">
                    {item.institution}
                  </p>
                  <p className="mt-3 max-w-[46rem] text-[0.95rem] leading-relaxed text-slate-200/90">
                    {item.description}
                  </p>
                </article>
              ))}

              {/* 4 SMK Plus Pelita Nusantara Foundation Competencies */}
              <div className="grid gap-6 pt-2 md:grid-cols-2">
                {about.fundamentals.map((comp) => (
                  <article
                    key={comp.id}
                    className="crepuscular-card-interactive relative rounded-2xl p-6"
                  >
                    {/* Glowing Planetary Rose-Violet Node */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-[25px] top-7 h-3 w-3 rounded-full border border-pink-200/80 bg-rose-400 shadow-[0_0_14px_rgba(244,63,94,0.85)] md:hidden sm:-left-[37px]"
                    />

                    <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                      <span className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-pink-300">
                        DISC // {comp.id}
                      </span>
                      <span className="font-mono text-[0.68rem] tracking-[0.12em] text-amber-200/85">
                        {comp.localTitle}
                      </span>
                    </div>

                    <h4 className="editorial-heading mt-4 text-lg font-semibold text-white">
                      {comp.title}
                    </h4>

                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                      {comp.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default About;
