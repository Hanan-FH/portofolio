import { portfolioData } from '../../data/portfolio';
import { Section, SectionHeading } from '../ui/Section';

export function Skills() {
  const { skills } = portfolioData;

  // Deduplicated authentic skill groups across the 4 editorial matrix pillars (Zero Fake Meters)
  const engineeringItems = Array.from(new Set([...skills.programming, ...skills.frontend]));
  const architectureItems = Array.from(new Set([...skills.backend, ...skills.database]));

  const matrixPillars = [
    {
      id: 'engineering',
      coord: 'MAT // 01',
      label: 'Engineering',
      items: engineeringItems,
    },
    {
      id: 'architecture',
      coord: 'MAT // 02',
      label: 'Architecture & Data',
      items: architectureItems,
    },
    {
      id: 'tooling',
      coord: 'MAT // 03',
      label: 'Tooling',
      items: skills.tools,
    },
    {
      id: 'creative',
      coord: 'MAT // 04',
      label: 'Creative & Interface',
      items: skills.design,
    },
  ];

  return (
    <Section id="skills" verticalLabel="技術体系">
      <div className="container-site">
        <SectionHeading
          index="02"
          label="Technical Capability Matrix"
          kanji="技術体系"
          note="09 Languages · Verified Stack"
        />

        {/* 4-Pillar Categorical Matrix (Refined Twilight Badges — Zero Arbitrary Percentage Bars) */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {matrixPillars.map((pillar) => (
            <div key={pillar.id} className="rim-horizon-panel flex flex-col p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="astro-coord">{pillar.coord}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.85)]" />
              </div>

              <h2 className="mincho-sub mt-3.5 text-base text-white">{pillar.label}</h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {pillar.items.map((item) => (
                  <span
                    key={item}
                    className="twilight-chip px-2.5 py-1 font-mono text-[11px] tracking-[0.04em] text-slate-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 9 Authentic Curriculum Languages with Original SVG Assets */}
        <div className="mt-14 border-t border-white/10 pt-10">
          <div className="flex items-center justify-between gap-4">
            <span className="astro-coord">Core Curriculum Languages</span>
            <span className="astro-telemetry">09 Records</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.languages.map((language) => (
              <div
                key={language.name}
                className="kumihimo-panel flex items-start gap-3.5 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px] border border-white/15 bg-[#050714] p-2">
                  <img
                    src={language.image}
                    alt={language.name}
                    width={24}
                    height={24}
                    loading="lazy"
                    decoding="async"
                    className="h-6 w-6 object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-white">{language.name}</h3>
                    <span className="font-mono text-[10px] tracking-[0.16em] text-amber-200/75">
                      {language.tag}
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-pink-300/80">
                    {language.category}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300/90">
                    {language.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Skills;
