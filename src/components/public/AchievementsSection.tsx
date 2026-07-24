import { IAchievement, IHackathon, ICertification } from '@/types';
import { Trophy, Award, Medal, CheckCircle2 } from 'lucide-react';

interface AchievementsSectionProps {
  content: Record<string, string>;
  achievements: IAchievement[];
  hackathons: IHackathon[];
  certifications: ICertification[];
}

export default function AchievementsSection({
  content,
  achievements = [],
  hackathons = [],
  certifications = [],
}: AchievementsSectionProps) {
  const eyebrow = content.ach_eyebrow || 'RECOGNITION';
  const heading = content.ach_heading || 'Achievements & Certifications';

  const hasContent = achievements.length > 0 || hackathons.length > 0 || certifications.length > 0;
  if (!hasContent) return null;

  return (
    <section id="achievements" className="py-24 border-t border-zinc-800/60 bg-zinc-950/80 relative">
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

        {/* Achievements Grid */}
        {achievements.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {achievements.map((ach) => (
              <div
                key={ach._id || ach.title}
                className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-6 flex flex-col gap-4 hover:border-zinc-700 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-indigo-400 block mb-1">
                    {ach.organization} {ach.event ? `· ${ach.event}` : ''}
                  </span>
                  <h3 className="text-lg font-bold text-zinc-100 font-sans leading-snug">
                    {ach.title}
                  </h3>
                </div>
                {ach.description && (
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {ach.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Hackathons Timeline Grid */}
        {hackathons.length > 0 && (
          <div className="flex flex-col gap-4 mb-12">
            <h3 className="font-mono text-sm text-zinc-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <Medal className="w-4 h-4 text-indigo-400" /> Hackathon Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-sm">
              {hackathons.map((hack) => (
                <div
                  key={hack._id || hack.title}
                  className="rounded-lg bg-zinc-900/40 border border-zinc-800/80 p-5 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between text-xs text-indigo-400">
                    <span>{hack.event}</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold">
                      {hack.result}
                    </span>
                  </div>
                  <span className="text-base font-bold text-zinc-100 font-sans">
                    {hack.title}
                  </span>
                  {hack.projectName && (
                    <span className="text-xs text-zinc-400">
                      Project: <strong className="text-zinc-300 font-normal">{hack.projectName}</strong>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Pills */}
        {certifications.length > 0 && (
          <div className="flex flex-col gap-4 pt-4 border-t border-zinc-800/80">
            <h3 className="font-mono text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400" /> Certifications & Event Honors
            </h3>
            <div className="flex flex-wrap gap-3 font-mono text-xs">
              {certifications.map((cert) => (
                <div
                  key={cert._id || cert.name}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{cert.name}</span>
                  {cert.issuer && <span className="text-zinc-500">({cert.issuer})</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
