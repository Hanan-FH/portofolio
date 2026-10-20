import { portfolioData } from '../data/portfolio';
import { Section, SectionHeading } from './ui/Section';

export function About() {
  const { about, education, personal } = portfolioData;

  return (
    <Section id="about">
      <div className="container-site">
        <SectionHeading index="01" label="Profile" note="Bogor, West Java" />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 className="max-w-[19ch] text-statement font-medium text-paper">{about.heading}</h2>
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
                    className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 bg-signal"
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

        <div className="mt-20 grid gap-6 border-t border-line pt-6 lg:grid-cols-12 lg:gap-8">
          <h3 className="meta-label lg:col-span-3">Academic path</h3>
          <div className="lg:col-span-8 lg:col-start-5">
            {education.map((item, index) => (
              <div key={index}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-mono text-[0.66rem] tracking-[0.08em] text-signal">
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

        <div className="mt-16 grid gap-6 border-t border-line pt-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <h3 className="meta-label">Foundation</h3>
            <p className="mt-3 max-w-[15rem] text-sm leading-relaxed text-dim">
              Core disciplines from the SMK Plus Pelita Nusantara software engineering curriculum.
            </p>
          </div>

          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8 lg:col-start-5">
            {about.fundamentals.map((item) => (
              <article key={item.id} className="border-t border-line pt-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.62rem] tracking-[0.1em] text-signal">
                    {item.id}
                  </span>
                  <h4 className="text-[0.95rem] font-medium leading-snug text-paper">
                    {item.title}
                  </h4>
                </div>
                <p className="mt-1 pl-7 font-mono text-[0.66rem] text-dim">{item.localTitle}</p>
                <p className="mt-3 pl-7 text-[0.84rem] leading-relaxed text-mist">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default About;
