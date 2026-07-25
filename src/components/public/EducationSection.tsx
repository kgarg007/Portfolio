import { IEducation } from '@/types';
import { GraduationCap, Award, BookOpen, Calendar } from 'lucide-react';

interface EducationSectionProps {
  content: Record<string, string>;
  education: IEducation[];
}

export default function EducationSection({ content, education }: EducationSectionProps) {
  const eyebrow = content.edu_eyebrow || 'ACADEMIC BACKGROUND';
  const heading = content.edu_heading || 'Education & Academic Details';

  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-16 border-t border-zinc-800/60 bg-zinc-950/40 relative">
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

        {/* Education Compact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu) => (
            <div
              key={edu._id || edu.institution}
              className="rounded-xl bg-zinc-900/50 border border-zinc-800/80 p-6 flex flex-col gap-4 hover:border-zinc-700 transition-all shadow-sm"
            >
              <div className="flex items-start justify-between gap-3 border-b border-zinc-800 pb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-100 font-sans leading-snug">
                      {edu.degree}
                    </h3>
                    <p className="text-xs font-mono text-indigo-400 font-semibold mt-0.5">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 font-mono text-xs text-zinc-400 shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800">
                    <Calendar className="w-3 h-3 text-indigo-400" />
                    {edu.startYear} – {edu.isCurrent ? 'Present' : edu.endYear}
                  </span>

                  {edu.grade && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-[11px]">
                      <Award className="w-3 h-3" />
                      {edu.grade}
                    </span>
                  )}
                </div>
              </div>

              {edu.description && (
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                  {edu.description}
                </p>
              )}

              {/* Coursework Pills */}
              {edu.courses && edu.courses.length > 0 && (
                <div className="flex flex-col gap-2 pt-2 border-t border-zinc-800/60 font-mono text-xs">
                  <span className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Relevant Coursework
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.courses.map((course) => (
                      <span
                        key={course}
                        className="px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800/80 text-zinc-300 text-[11px]"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
