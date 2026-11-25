import { portfolioData } from '../../data/portfolio';
import { MangaThunder } from '../manga/MangaThunder';

export function About() {
  const { about, education, personal } = portfolioData;

  return (
    <section
      id="about"
      className="manga-chapter chapter-cut-top relative z-[12] scroll-mt-12 bg-[#060608] text-[#ECECF0]"
    >
      {/* One-shot 220ms hairline lightning flash along the diagonal pitch-ink cut */}
      <div data-cut aria-hidden="true" className="chapter-cut-arc pointer-events-none">
        <MangaThunder tone="paper" variant="slash" mode="cut" className="chapter-cut-thunder" />
      </div>

      {/* Back Layer: Faint Manga Halftone & Masthead-Scoped Chapter + Kanji Watermark */}
      <div aria-hidden="true" className="parallax-back pointer-events-none absolute inset-0 overflow-hidden">
        <div className="manga-halftone absolute inset-0 text-[#ECECF0]" />
        <div className="absolute right-4 top-14 flex items-baseline gap-3 select-none sm:right-12 lg:right-16">
          <span className="font-kanji text-[clamp(5.5rem,13vw,11.5rem)] font-black leading-none text-[#ECECF0]/[0.065]">
            壱
          </span>
          <span className="font-display text-[clamp(7.5rem,18vw,16rem)] leading-none text-[#ECECF0]/[0.035]">
            01
          </span>
        </div>
      </div>

      <div className="container-site relative z-10">
        {/* Floating Parallax #584CE6 Chapter Stamp & Kinetic Line-Rise Masthead */}
        <div className="mb-14 sm:mb-20">
          <div className="parallax-front mb-4 inline-block">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block -rotate-2 bg-[#584CE6] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-white">
                CH.01 // ABOUT
              </span>
              <span aria-hidden="true" className="kanji-stamp font-kanji">
                壱
              </span>
            </span>
          </div>

          <h2 data-cut className="parallax-mid text-[clamp(2.5rem,6.5vw,5.6rem)] uppercase tracking-[-0.035em] text-[#ECECF0]">
            <span className="line-mask">
              <span className="line-rise">NARRATIVE &amp;</span>
            </span>
            <span className="line-mask">
              <span className="line-rise" style={{ '--d': '60ms' } as React.CSSProperties}>
                TRAJECTORY
              </span>
            </span>
          </h2>
        </div>

        {/* Open Asymmetrical Ink Spread (35%+ Negative Space, Zero Rectangular Boxes) */}
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-16">
          {/* Left Column: Confident Editorial Bio & Unboxed Dossier */}
          <div data-cut className="lg:col-span-5">
            <div className="reveal-slice">
              {/* Preserved opening-spread bio, relocated from Hero so no content is lost */}
              <p className="mono-stamp text-[#584CE6]">// {personal.eyebrow}</p>
              <p className="mt-4 text-xl font-bold leading-snug text-[#ECECF0] sm:text-2xl">
                {personal.headline}
              </p>
              <p className="mt-3 text-base leading-[1.65] text-[#A6A6B2]">{personal.shortBio}</p>

              <h3 className="mt-10 text-2xl uppercase leading-[1.02] tracking-[-0.03em] text-[#ECECF0] sm:text-3xl">
                {about.heading}
              </h3>

              <div className="mt-6 space-y-4 text-base leading-[1.65] text-[#A6A6B2]">
                {about.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <dl className="mt-10 space-y-4 border-l-2 border-[#584CE6] pl-5 text-sm">
                <div>
                  <dt className="mono-stamp text-[#584CE6]">STATUS</dt>
                  <dd className="mt-0.5 font-medium text-[#ECECF0]">{about.status}</dd>
                </div>
                <div>
                  <dt className="mono-stamp text-[#584CE6]">CURRENT FOCUS</dt>
                  <dd className="mt-0.5 leading-[1.6] text-[#A6A6B2]">{about.currentFocus}</dd>
                </div>
                <div>
                  <dt className="mono-stamp text-[#584CE6]">LOCATION</dt>
                  <dd className="mt-0.5 text-[#ECECF0]">{about.location}</dd>
                </div>
                <div>
                  <dt className="mono-stamp text-[#584CE6]">DIRECT CHANNEL</dt>
                  <dd className="mt-0.5">
                    <a
                      href={`mailto:${personal.email}`}
                      className="font-mono text-xs font-semibold text-[#ECECF0] hover:text-[#584CE6]"
                    >
                      {personal.email} ↗
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Column: Unboxed Education Milestone & 4 Foundation Competencies */}
          <div className="lg:col-span-7">
            {education.map((item, index) => (
              <article
                key={`${item.institution}-${index}`}
                data-cut
                className="border-b border-[#ECECF0]/14 pb-10"
              >
                <div className="reveal-slice">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="mono-stamp text-[#584CE6]">// {item.period}</span>
                    <span className="mono-stamp text-[#A6A6B2]">{item.status}</span>
                  </div>

                  <h3 className="mt-3 text-2xl uppercase leading-[0.98] tracking-[-0.03em] text-[#ECECF0] sm:text-3xl">
                    {item.program}
                  </h3>
                  <p className="mt-1.5 mono-stamp text-[#A6A6B2]">{item.institution}</p>
                  <p className="mt-4 text-base leading-[1.65] text-[#A6A6B2]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}

            <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {about.fundamentals.map((comp, index) => (
                <article key={comp.id} data-cut>
                  <div
                    style={{ '--d': `${index * 60}ms` } as React.CSSProperties}
                    className="reveal-slice group"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-3xl leading-none text-[#584CE6]">
                        {comp.id}
                      </span>
                      <span className="mono-stamp text-[#A6A6B2]">/ {comp.localTitle}</span>
                    </div>

                    <h4 className="mt-3 text-lg uppercase leading-[1.04] tracking-[-0.025em] text-[#ECECF0]">
                      {comp.title}
                    </h4>
                    <p className="mt-2.5 text-sm leading-[1.65] text-[#A6A6B2]">
                      {comp.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
