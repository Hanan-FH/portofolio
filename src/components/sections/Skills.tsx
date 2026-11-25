import { portfolioData } from '../../data/portfolio';

export function Skills() {
  const { skills } = portfolioData;

  const skillCategories = [
    { id: '01', label: 'FRONTEND', items: skills.frontend },
    { id: '02', label: 'BACKEND', items: skills.backend },
    { id: '03', label: 'DATABASE', items: skills.database },
    { id: '04', label: 'PROGRAMMING', items: skills.programming },
    { id: '05', label: 'TOOLS & WORKFLOW', items: skills.tools },
    { id: '06', label: 'DESIGN & ARCHITECTURE', items: skills.design },
  ];

  const rowOne = Array.from(
    new Set([...skills.programming, ...skills.frontend, ...skills.backend])
  );
  const rowTwo = Array.from(
    new Set([...skills.database, ...skills.tools, ...skills.design])
  );

  const renderMarqueeWord = (word: string, index: number, prefix: string, hidden = false) => {
    const outlined = index % 2 === 1;
    return (
      <span
        key={`${prefix}-${word}-${index}`}
        aria-hidden={hidden || undefined}
        className="inline-flex shrink-0 items-center gap-6 px-4 py-1.5"
      >
        <span
          className={`text-[clamp(1.9rem,4.4vw,3.6rem)] uppercase leading-none tracking-[-0.035em] ${
            outlined
              ? 'ink-marquee-outline'
              : 'font-display text-[#ECECF0] hover:text-[#584CE6]'
          }`}
        >
          {word}
        </span>
        <span aria-hidden="true" className="font-mono text-sm font-semibold text-[#584CE6]">
          //
        </span>
      </span>
    );
  };

  return (
    <section
      id="skills"
      className="manga-chapter chapter-cut-top relative z-[14] scroll-mt-12 bg-[#060608] text-[#ECECF0]"
    >
      {/* Back Layer: Halftone & Oversized Chapter Watermark */}
      <div aria-hidden="true" className="parallax-back pointer-events-none absolute inset-0 overflow-hidden">
        <div className="manga-halftone absolute inset-0 text-[#ECECF0]" />
        <span className="absolute right-4 top-20 select-none font-display text-[clamp(9rem,22vw,19rem)] leading-none text-[#ECECF0]/[0.035] sm:right-12">
          03
        </span>
      </div>

      <div className="container-site relative z-10">
        <div className="mb-12 sm:mb-16">
          <div className="parallax-front mb-4 inline-block">
            <span className="inline-block -rotate-2 bg-[#584CE6] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-white">
              CH.03 // SKILLS
            </span>
          </div>

          <h2
            data-cut
            className="parallax-mid text-[clamp(2.5rem,6.5vw,5.6rem)] uppercase tracking-[-0.035em] text-[#ECECF0]"
          >
            <span className="line-mask">
              <span className="line-rise">TECHNICAL</span>
            </span>
            <span className="line-mask">
              <span className="line-rise" style={{ '--d': '60ms' } as React.CSSProperties}>
                ARSENAL
              </span>
            </span>
          </h2>
        </div>
      </div>

      {/* Dual-Direction Pure-CSS Infinite Typographic Marquee */}
      <div className="mmv-marquee-wrap relative z-10 border-y border-[#ECECF0]/14 py-3">
        <div className="overflow-hidden py-1">
          <div className="mmv-marquee-fwd items-center motion-reduce:justify-center motion-reduce:px-4">
            <div className="flex shrink-0 items-center motion-reduce:flex-wrap motion-reduce:justify-center">
              {rowOne.map((item, i) => renderMarqueeWord(item, i, 'f1'))}
            </div>
            <div aria-hidden="true" className="flex shrink-0 items-center motion-reduce:hidden">
              {rowOne.map((item, i) => renderMarqueeWord(item, i, 'f2', true))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden border-t border-[#ECECF0]/10 py-1">
          <div className="mmv-marquee-rev items-center motion-reduce:justify-center motion-reduce:px-4">
            <div className="flex shrink-0 items-center motion-reduce:flex-wrap motion-reduce:justify-center">
              {rowTwo.map((item, i) => renderMarqueeWord(item, i + 1, 'r1'))}
            </div>
            <div aria-hidden="true" className="flex shrink-0 items-center motion-reduce:hidden">
              {rowTwo.map((item, i) => renderMarqueeWord(item, i + 1, 'r2', true))}
            </div>
          </div>
        </div>
      </div>

      {/* Clean, Scannable Unboxed Skill Index */}
      <div className="container-site relative z-10 mt-16 space-y-20 sm:mt-20">
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((group, idx) => (
            <div key={group.id} data-cut>
              <div
                style={{ '--d': `${(idx % 3) * 60}ms` } as React.CSSProperties}
                className="reveal-slice border-l-2 border-[#584CE6] pl-5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="mono-stamp font-semibold text-[#ECECF0]">
                    <span className="text-[#584CE6]">{group.id}</span> // {group.label}
                  </span>
                </div>

                <div className="mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-xs text-[#A6A6B2]">
                  {group.items.map((skill, sIdx) => (
                    <span key={skill} className="inline-flex items-center gap-2.5">
                      {sIdx > 0 && <span aria-hidden="true" className="text-[#584CE6]">/</span>}
                      <span className="text-[#ECECF0]">{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 9 Core Curriculum Languages — Unboxed Editorial Stream with Intact SVGs */}
        <div>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-2 border-b border-[#ECECF0]/14 pb-3">
            <h3 className="mono-stamp text-[#ECECF0]">
              <span className="text-[#584CE6]">//</span> CORE CURRICULUM LANGUAGES
            </h3>
            <span className="mono-stamp text-[#A6A6B2]">09 VERIFIED RECORDS</span>
          </div>

          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {skills.languages.map((language, index) => (
              <article key={language.name} data-cut>
                <div
                  style={{ '--d': `${(index % 3) * 60}ms` } as React.CSSProperties}
                  className="reveal-slice group flex items-start gap-4"
                >
                  <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center bg-[#101015] p-2 [clip-path:polygon(6px_0,100%_0,calc(100%-6px)_100%,0_100%)]">
                    <img
                      src={language.image}
                      alt={language.name}
                      width={26}
                      height={26}
                      loading="lazy"
                      decoding="async"
                      className="h-6 w-6 object-contain grayscale group-hover:grayscale-0"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-lg uppercase leading-none tracking-[-0.025em] text-[#ECECF0] group-hover:text-[#584CE6]">
                        {language.name}
                      </h4>
                      <span className="mono-stamp text-[#584CE6]">{language.tag}</span>
                    </div>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#A6A6B2]">
                      {language.category}
                    </p>
                    <p className="mt-2 text-sm leading-[1.6] text-[#A6A6B2]">
                      {language.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
