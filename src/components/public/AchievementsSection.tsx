'use client';

import { useState } from 'react';
import { IAchievement, IHackathon, ICertification } from '@/types';
import { Trophy, Award, Medal, CheckCircle2, FileText } from 'lucide-react';
import CertificateModal from '@/components/ui/CertificateModal';

interface AchievementsSectionProps {
  content: Record<string, string>;
  achievements?: IAchievement[];
  hackathons?: IHackathon[];
  certifications?: ICertification[];
}

export default function AchievementsSection({
  content,
  achievements = [],
  hackathons = [],
  certifications = [],
}: AchievementsSectionProps) {
  const eyebrow = content.ach_eyebrow || 'ACHIEVEMENTS';
  const heading = content.ach_heading || 'Recognition & Competition Honors';

  const [activeProof, setActiveProof] = useState<{ url: string; title: string } | null>(null);

  const hasContent = achievements.length > 0 || hackathons.length > 0 || certifications.length > 0;
  if (!hasContent) return null;

  return (
    <section id="achievements" className="py-20 border-t border-zinc-800/60 bg-zinc-950/80 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12">
          <span className="font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 max-w-2xl font-sans">
            {heading}
          </h2>
          <div className="w-10 h-1 bg-indigo-500 rounded-full mt-2" />
        </div>

        {/* Achievements Compact Grid (Desktop 2-3 col, Mobile 1 col) */}
        {achievements.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {achievements.map((ach) => {
              const hasProof = Boolean(ach.certificate?.url || ach.certificateUrl);
              const proofUrl = ach.certificate?.url || ach.certificateUrl || '';

              return (
                <div
                  key={ach._id || ach.title}
                  className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-5 flex flex-col justify-between gap-4 hover:border-zinc-700 transition-all shadow-sm"
                >
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-indigo-400 font-semibold truncate max-w-[70%]">
                        {ach.organization} {ach.event ? `· ${ach.event}` : ''}
                      </span>
                      {ach.date && <span className="text-zinc-500">{ach.date}</span>}
                    </div>

                    <h3 className="text-base font-bold text-zinc-100 font-sans leading-snug">
                      {ach.title}
                    </h3>

                    {ach.description && (
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2">
                        {ach.description}
                      </p>
                    )}
                  </div>

                  {hasProof && (
                    <div className="pt-2 border-t border-zinc-800/60 font-mono text-xs mt-auto">
                      <button
                        onClick={() =>
                          setActiveProof({
                            url: proofUrl,
                            title: `${ach.title} — ${ach.organization}`,
                          })
                        }
                        className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" /> View Certificate ↗
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Hackathon Compact Highlights Grid */}
        {hackathons.length > 0 && (
          <div className="flex flex-col gap-4 mb-10">
            <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-semibold flex items-center gap-2">
              <Medal className="w-4 h-4 text-indigo-400" /> Hackathon Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {hackathons.map((hack) => (
                <div
                  key={hack._id || hack.title}
                  className="rounded-lg bg-zinc-900/40 border border-zinc-800/80 p-4 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between text-xs text-indigo-400">
                    <span>{hack.event}</span>
                    {hack.result && (
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold text-[11px]">
                        {hack.result}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-bold text-zinc-100 font-sans">
                    {hack.title}
                  </span>
                  {hack.projectName && (
                    <span className="text-[11px] text-zinc-400">
                      Project: <strong className="text-zinc-300 font-normal">{hack.projectName}</strong>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Compact Badges */}
        {certifications.length > 0 && (
          <div className="flex flex-col gap-3 pt-2 border-t border-zinc-800/60">
            <h3 className="font-mono text-xs text-zinc-500 font-semibold uppercase tracking-wider flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-indigo-400" /> Certifications & Event Honors
            </h3>
            <div className="flex flex-wrap gap-2.5 font-mono text-xs">
              {certifications.map((cert) => (
                <div
                  key={cert._id || cert.name}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{cert.name}</span>
                  {cert.issuer && <span className="text-zinc-500">({cert.issuer})</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox / Proof Modal */}
        {activeProof && (
          <CertificateModal
            isOpen={Boolean(activeProof)}
            onClose={() => setActiveProof(null)}
            title={activeProof.title}
            certificateUrl={activeProof.url}
          />
        )}
      </div>
    </section>
  );
}
