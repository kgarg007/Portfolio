import { ISkill } from '@/types';

interface SkillsSectionProps {
  content: Record<string, string>;
  skills: ISkill[];
}

export default function SkillsSection({ content, skills }: SkillsSectionProps) {
  const eyebrow = content.skills_eyebrow || 'TECHNICAL PROFICIENCY';
  const heading = content.skills_heading || 'Tech Stack & Core Capabilities';
  const description =
    content.skills_description ||
    'Core engineering languages, frontend frameworks, data science toolkits, and developer workflow tools.';

  if (!skills || skills.length === 0) return null;

  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="py-24 border-t border-zinc-800/60 bg-zinc-950/80 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <span className="font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 max-w-2xl">
            {heading}
          </h2>
          <p className="text-base text-zinc-400 max-w-xl">
            {description}
          </p>
          <div className="w-12 h-1 bg-indigo-500 rounded-full mt-2" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => {
            const catSkills = skills.filter((s) => s.category === cat);
            return (
              <div
                key={cat}
                className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-8 flex flex-col gap-6 hover:border-zinc-700 transition-all"
              >
                <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                  <div className="w-2 h-6 bg-indigo-500 rounded-full" />
                  <h3 className="text-xl font-bold text-zinc-100 font-sans tracking-tight">
                    {cat}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3 font-mono text-sm">
                  {catSkills.map((skill) => (
                    <span
                      key={skill._id || skill.name}
                      className="px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800/90 text-zinc-200 hover:border-indigo-500/50 hover:text-indigo-300 transition-all cursor-default"
                    >
                      {skill.name}
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
