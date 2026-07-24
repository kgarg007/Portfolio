import { IExperience } from '@/types';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface ExperienceSectionProps {
  content: Record<string, string>;
  experiences: IExperience[];
}

export default function ExperienceSection({ content, experiences }: ExperienceSectionProps) {
  const eyebrow = content.exp_eyebrow || 'CAREER & LEADERSHIP';
  const heading = content.exp_heading || 'Work Experience & Incubations';
  const description =
    content.exp_description ||
    'Demonstrated experience in frontend web development, mentorship, hackathon evaluation, and technical leadership.';

  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="py-24 border-t border-zinc-800/60 bg-zinc-950/40 relative">
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

        {/* Timeline Layout */}
        <div className="relative pl-6 sm:pl-8 border-l border-zinc-800 flex flex-col gap-12">
          {experiences.map((exp) => (
            <div key={exp._id || exp.organization + exp.role} className="relative group">
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-zinc-900 border-2 border-indigo-500 group-hover:scale-125 group-hover:bg-indigo-500 transition-all duration-300" />

              <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-6 sm:p-8 hover:border-zinc-700 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans">
                      {exp.role}
                    </h3>
                    <span className="text-indigo-400 font-mono text-sm font-semibold">
                      {exp.organization}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs text-zinc-400 shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                    {exp.location && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-zinc-500">
                        <MapPin className="w-3.5 h-3.5" /> {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="flex flex-col gap-2 font-sans text-sm sm:text-base text-zinc-400">
                  {exp.description.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-indigo-400 font-bold shrink-0 mt-1">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-zinc-800/60 font-mono text-xs">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
