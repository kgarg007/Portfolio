'use client';

import { useState } from 'react';
import { IExperience } from '@/types';
import { Calendar, MapPin, ExternalLink, FileText } from 'lucide-react';
import CertificateModal from '@/components/ui/CertificateModal';

interface ExperienceSectionProps {
  content: Record<string, string>;
  experiences: IExperience[];
}

export default function ExperienceSection({ content, experiences }: ExperienceSectionProps) {
  const eyebrow = content.exp_eyebrow || 'EXPERIENCE';
  const heading = content.exp_heading || 'Work & Leadership Experience';
  const description =
    content.exp_description ||
    'Demonstrated experience in frontend web development, mentorship, and technical project leadership.';

  const [activeCertificate, setActiveCertificate] = useState<{ url: string; title: string } | null>(null);

  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="py-20 border-t border-zinc-800/60 bg-zinc-950/40 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12">
          <span className="font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 max-w-2xl font-sans">
            {heading}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl font-sans">
            {description}
          </p>
          <div className="w-10 h-1 bg-indigo-500 rounded-full mt-2" />
        </div>

        {/* Compact 2-Column Responsive Grid (Desktop 2-col, Mobile 1-col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp) => {
            const hasCertificate = Boolean(exp.certificate?.url);
            const dateDisplay = exp.startMonth && exp.startYear
              ? `${exp.startMonth} ${exp.startYear}${exp.isCurrent ? ' – Present' : (exp.endMonth && exp.endYear ? ` – ${exp.endMonth} ${exp.endYear}` : (exp.endDate ? ` – ${exp.endDate}` : ''))}`
              : `${exp.startDate}${exp.endDate || exp.isCurrent ? ` – ${exp.isCurrent ? 'Present' : exp.endDate}` : ''}`;

            return (
              <div
                key={exp._id || exp.organization + exp.role}
                className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-6 flex flex-col justify-between gap-4 hover:border-zinc-700 transition-all shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3 border-b border-zinc-800/80 pb-3">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100 font-sans tracking-tight leading-snug">
                        {exp.role}
                      </h3>
                      <span className="text-indigo-400 font-mono text-xs font-semibold block mt-0.5">
                        {exp.organization}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-zinc-400 shrink-0">
                      <Calendar className="w-3 h-3 text-indigo-400" />
                      {dateDisplay}
                    </span>
                  </div>

                  {exp.location && (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-500">
                      <MapPin className="w-3 h-3" /> {exp.location}
                    </span>
                  )}

                  {/* Bullet Points */}
                  <ul className="flex flex-col gap-2 font-sans text-xs sm:text-sm text-zinc-400">
                    {exp.description.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-400 font-bold shrink-0 mt-0.5">▸</span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Pills */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[11px]">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800/80 text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Certificate Action (Only if exists) */}
                {hasCertificate && (
                  <div className="pt-3 border-t border-zinc-800/60 font-mono text-xs mt-auto">
                    <button
                      onClick={() =>
                        setActiveCertificate({
                          url: exp.certificate!.url,
                          title: `${exp.role} Certificate — ${exp.organization}`,
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

        {/* Certificate Modal Lightbox */}
        {activeCertificate && (
          <CertificateModal
            isOpen={Boolean(activeCertificate)}
            onClose={() => setActiveCertificate(null)}
            title={activeCertificate.title}
            certificateUrl={activeCertificate.url}
          />
        )}
      </div>
    </section>
  );
}
