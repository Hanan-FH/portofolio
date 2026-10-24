import { portfolioData } from '../../data/portfolio';
import { Section, SectionHeading } from '../ui/Section';

export function About() {
  const { about, education, personal } = portfolioData;

  return (
    <Section id="about">
      <div className="container-site">
        <SectionHeading
          index="01"
          label="Narrative & Trajectory"
          ephemeris="EPOCH // ACADEMIC & ENGINEERING MILESTONES"
          note={about.location}
        />

        {/* Editorial Split Layout: Authentic Bio Left // Luminous Vertical Timeline Right */}
        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left Column: Mincho Statement, Verbatim Bio & Compact Specs */}
          <div className="lg:col-span-5">
            <h2 className="mincho-editorial text-2xl sm:text-[1.85rem]">{about.heading}</h2>

            <div className="mt-6 space-y-4 text-[0.95rem] leading-[1.6] text-slate-300">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <dl className="rim-horizon-panel mt-8 divide-y divide-white/10 p-5 text-xs">
              <div className="flex items-baseline justify-between gap-4 pb-3">
                <dt className="astro-telemetry">Status</dt>
                <dd className="text-right text-slate-100">{about.status}</dd>
              </div>
              <div className="py-3">
                <dt className="astro-telemetry">Focus</dt>
                <dd className="mt-1.5 leading-[1.6] text-slate-300">{about.currentFocus}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3">
                <dt className="astro-telemetry">Location</dt>
                <dd className="text-right text-slate-200">{about.location}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 pt-3">
                <dt className="astro-telemetry">Email</dt>
                <dd>
                  <a
                    href={`mailto:${personal.email}`}
                    className="font-mono text-sky-300 transition-opacity hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    {personal.email} ↗
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Split Timeline with Restrained Planetary Nodes */}
          <div className="relative pl-7 sm:pl-10 lg:col-span-7">
            {/* Vertical Katawaredoki Horizon Track */}
            <div
              aria-hidden="true"
              className="absolute bottom-3 left-[7px] top-2 w-px sm:left-[11px]"
              style={{
                background:
                  'linear-gradient(180deg, #38bdf8 0%, #6d1146 46%, #c2410c 78%, rgba(253, 224, 71, 0.24) 100%)',
              }}
            />

            <div className="space-y-6">
              {/* Primary Education Milestone */}
              {education.map((item, index) => (
                <article
                  key={`${item.institution}-${index}`}
                  className="kumihimo-panel relative p-5 sm:p-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[25px] top-6 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-sky-300/80 bg-[#050714] sm:-left-[33px]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-200" />
                  </span>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="astro-coord">{item.period}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-amber-200/85">
                      ● {item.status}
                    </span>
                  </div>

                  <h3 className="mincho-sub mt-2.5 text-lg sm:text-xl">{item.program}</h3>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-sky-200/80">
                    {item.institution}
                  </p>
                  <p className="mt-3 text-sm leading-[1.6] text-slate-300">{item.description}</p>
                </article>
              ))}

              {/* 4 Authentic SMK Plus Pelita Nusantara Foundation Milestones */}
              {about.fundamentals.map((comp) => (
                <article key={comp.id} className="kumihimo-panel relative p-5">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[23px] top-6 h-2.5 w-2.5 rounded-full border border-amber-200/75 bg-rose-500 sm:-left-[31px]"
                  />

                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="astro-coord">MILESTONE // {comp.id}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-amber-200/75">
                      {comp.localTitle}
                    </span>
                  </div>

                  <h3 className="mincho-sub mt-2 text-base">{comp.title}</h3>
                  <p className="mt-2 text-xs leading-[1.6] text-slate-300/90">{comp.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default About;
