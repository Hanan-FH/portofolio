import { portfolioData } from '../../data/portfolio';
import { Section, SectionHeading } from '../ui/Section';

interface MarqueeSkillItem {
  name: string;
  category: string;
  accent: 'rose' | 'cyan' | 'amber';
}

function buildUniqueSkills(
  entries: ReadonlyArray<{ items: readonly string[]; category: string; accent: MarqueeSkillItem['accent'] }>
): MarqueeSkillItem[] {
  const seen = new Set<string>();
  const out: MarqueeSkillItem[] = [];
  for (const group of entries) {
    for (const item of group.items) {
      if (seen.has(item)) continue;
      seen.add(item);
      out.push({ name: item, category: group.category, accent: group.accent });
    }
  }
  return out;
}

/**
 * Infinite Skills Marquee Ribbon & Authentic Curriculum Language Ledger.
 * Executes continuous loop via hardware-accelerated CSS translate3d(-50%, 0, 0)
 * while preserving 100% of verified skill records and SVG language icons.
 */
export function Skills() {
  const { skills } = portfolioData;

  const primaryRibbon = buildUniqueSkills([
    { items: skills.programming, category: 'Engineering', accent: 'cyan' },
    { items: skills.frontend, category: 'Frontend', accent: 'rose' },
    { items: skills.backend, category: 'Backend', accent: 'amber' },
  ]);

  const secondaryRibbon = buildUniqueSkills([
    { items: skills.database, category: 'Data', accent: 'cyan' },
    { items: skills.tools, category: 'Tooling', accent: 'amber' },
    { items: skills.design, category: 'Creative', accent: 'rose' },
  ]);

  const dotClass = (accent: MarqueeSkillItem['accent']) =>
    accent === 'cyan'
      ? 'bg-sky-400/90'
      : accent === 'amber'
        ? 'bg-amber-300/90'
        : 'bg-rose-400/90';

  const renderMarqueeChip = (skill: MarqueeSkillItem, key: string, hidden = false) => (
    <div
      key={key}
      aria-hidden={hidden || undefined}
      className="twilight-chip flex shrink-0 items-center gap-3 px-4 py-2.5 cursor-default"
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass(skill.accent)}`} aria-hidden="true" />
      <span className="font-sans text-xs tracking-wide text-slate-100 sm:text-[13px]">
        {skill.name}
      </span>
      <span className="border-l border-white/10 pl-2.5 font-mono text-[9px] uppercase tracking-[0.26em] text-slate-400">
        {skill.category}
      </span>
    </div>
  );

  return (
    <Section id="skills" className="overflow-hidden">
      <div className="container-site">
        <SectionHeading
          index="02"
          label="Capabilities"
          ephemeris="COMPETENCIES // RUNTIME CAPABILITIES"
          note="09 Languages · Verified Stack"
        />

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="mincho-editorial text-2xl sm:text-4xl">Technical Architecture</h2>
          <p className="ephemeris-label">CONTINUOUS RIBBON // TRANSLATE3D</p>
        </div>
      </div>

      {/* Hardware-Accelerated Dual Infinite Marquee Ribbons */}
      <div className="mt-9 space-y-3.5">
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee gap-3.5 py-1 hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-6">
            {primaryRibbon.map((skill) => renderMarqueeChip(skill, `p-a-${skill.name}`))}
            <div className="flex gap-3.5 motion-reduce:hidden" aria-hidden="true">
              {primaryRibbon.map((skill) => renderMarqueeChip(skill, `p-b-${skill.name}`, true))}
            </div>
          </div>
        </div>

        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee-reverse gap-3.5 py-1 hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-6">
            {secondaryRibbon.map((skill) => renderMarqueeChip(skill, `s-a-${skill.name}`))}
            <div className="flex gap-3.5 motion-reduce:hidden" aria-hidden="true">
              {secondaryRibbon.map((skill) => renderMarqueeChip(skill, `s-b-${skill.name}`, true))}
            </div>
          </div>
        </div>
      </div>

      {/* 9 Authentic Curriculum Languages with Preserved SVG Assets */}
      <div className="container-site mt-14">
        <div className="border-t border-white/10 pt-10">
          <div className="flex items-center justify-between gap-4">
            <span className="ephemeris-label">CORE CURRICULUM LANGUAGES</span>
            <span className="astro-telemetry">09 VERIFIED RECORDS</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.languages.map((language) => (
              <div key={language.name} className="kumihimo-panel flex items-start gap-3.5 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px] border border-white/10 bg-[#050714] p-2">
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
                    <h3 className="text-sm font-medium text-slate-100">{language.name}</h3>
                    <span className="font-mono text-[9px] tracking-[0.22em] text-amber-200/75">
                      {language.tag}
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.26em] text-slate-400">
                    {language.category}
                  </p>
                  <p className="mt-1.5 text-xs leading-[1.6] text-slate-300/90">
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
