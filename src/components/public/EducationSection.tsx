import { IEducation } from '@/types';
import { GraduationCap, Award, BookOpen, Calendar } from 'lucide-react';

interface EducationSectionProps {
  content: Record<string, string>;
  education: IEducation[];
}

export default function EducationSection({ content, education }: EducationSectionProps) {
  const eyebrow = content.edu_eyebrow || 'ACADEMIC BACKGROUND';
  const heading = content.edu_heading || 'Education & Honors';

  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-24 border-t border-zinc-800/60 bg-zinc-950/40 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <span className="font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 max-w-2xl">
            {heading}
          </h2>
          <div className="w-12 h-1 bg-indigo-500 rounded-full mt-2" />
        </div>

        {/* Education Cards */}
        <div className="flex flex-col gap-8">
          {education.map((edu) => (
            <div
              key={edu._id || edu.institution}
              className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-8 sm:p-10 flex flex-col gap-6 hover:border-zinc-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-mono text-indigo-400 font-medium">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-400">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800 border border-zinc-700">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    {edu.startYear} – {edu.isCurrent ? 'Present' : edu.endYear}
                  </span>

                  {edu.grade && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                      <Award className="w-3.5 h-3.5" />
                      {edu.grade}
                    </span>
                  )}
                </div>
              </div>

              {edu.description && (
                <p className="text-base text-zinc-400 leading-relaxed font-sans">
                  {edu.description}
                </p>
              )}

              {/* Coursework Pills */}
              {edu.courses && edu.courses.length > 0 && (
                <div className="flex flex-col gap-3 pt-2">
                  <span className="font-mono text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Relevant Coursework
                  </span>
                  <div className="flex flex-wrap gap-2 font-mono text-xs">
                    {edu.courses.map((course) => (
                      <span
                        key={course}
                        className="px-3 py-1.5 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300"
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
