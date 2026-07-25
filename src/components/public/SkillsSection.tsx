import { ISkill } from '@/types';

interface SkillsSectionProps {
  content: Record<string, string>;
  skills: ISkill[];
}

export default function SkillsSection({ content, skills }: SkillsSectionProps) {
  const eyebrow = content.skills_eyebrow || 'TECHNICAL PROFICIENCY';
  const heading = content.skills_heading || 'Skills & Technologies';

  if (!skills || skills.length === 0) return null;

  // Group skills dynamically by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="py-16 border-t border-zinc-800/60 bg-zinc-950/80 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-10">
          <span className="font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 max-w-2xl font-sans">
            {heading}
          </h2>
          <div className="w-10 h-1 bg-indigo-500 rounded-full mt-1.5" />
        </div>

        {/* Compact Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const catSkills = skills.filter((s) => s.category === cat);
            return (
              <div
                key={cat}
                className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 p-5 flex flex-col gap-4 hover:border-zinc-700 transition-all shadow-sm"
              >
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                  <div className="w-1.5 h-4 bg-indigo-500 rounded-full" />
                  <h3 className="text-base font-bold text-zinc-200 font-sans tracking-tight">
                    {cat}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {catSkills.map((skill) => (
                    <span
                      key={skill._id || skill.name}
                      className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800/90 text-zinc-300 hover:border-indigo-500/40 hover:text-indigo-300 transition-all cursor-default inline-flex items-center gap-1.5"
                    >
                      <span>{skill.name}</span>
                      {skill.level && (
                        <span className="text-[10px] text-indigo-400 font-semibold px-1.5 py-0.2 bg-indigo-500/10 border border-indigo-500/20 rounded">
                          {skill.level}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
