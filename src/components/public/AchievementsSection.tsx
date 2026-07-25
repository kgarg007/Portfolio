'use client';

import { useState } from 'react';
import { IAchievement, IHackathon, ICertification } from '@/types';
import { FileText } from 'lucide-react';
import CertificateModal from '@/components/ui/CertificateModal';

interface UnifiedItem {
  id: string;
  title: string;
  organization: string;
  date?: string;
  description?: string;
  certificateUrl?: string;
  displayOrder: number;
}

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
  const eyebrow = content.ach_eyebrow || 'RECOGNITION';
  const heading = content.ach_heading || 'Achievements & Certifications';

  const [activeProof, setActiveProof] = useState<{ url: string; title: string } | null>(null);

  // Unified items list across achievements, hackathons, and certifications
  const items: UnifiedItem[] = [];

  // Add items from Achievement collection
  achievements.forEach((ach) => {
    items.push({
      id: ach._id || ach.title,
      title: ach.title,
      organization: ach.organization + (ach.event ? ` · ${ach.event}` : ''),
      date: ach.date || '',
      description: ach.description || '',
      certificateUrl: ach.certificate?.url || ach.certificateUrl || '',
      displayOrder: ach.displayOrder ?? 0,
    });
  });

  // Add items from Hackathon collection if not already in achievements
  hackathons.forEach((hack) => {
    const title = hack.result ? `${hack.title} (${hack.result})` : hack.title;
    const exists = items.some((i) => i.title.toLowerCase().includes(hack.title.toLowerCase()));
    if (!exists) {
      items.push({
        id: hack._id || hack.title,
        title,
        organization: hack.organization || hack.event || 'Hackathon',
        date: hack.date || (hack as any).year || '',
        description: hack.description || (hack.projectName ? `Project: ${hack.projectName}` : ''),
        certificateUrl: (hack as any).certificate?.url || hack.certificateUrl || '',
        displayOrder: hack.displayOrder ?? 0,
      });
    }
  });

  // Add items from Certification collection if not already in achievements
  certifications.forEach((cert) => {
    const exists = items.some((i) => i.title.toLowerCase().includes(cert.name.toLowerCase()));
    if (!exists) {
      items.push({
        id: cert._id || cert.name,
        title: cert.name,
        organization: cert.issuer || 'Certification',
        date: cert.issueDate || (cert as any).date || '',
        description: cert.description || '',
        certificateUrl: (cert as any).certificate?.url || (cert as any).certificateUrl || (cert as any).credentialUrl || '',
        displayOrder: cert.displayOrder ?? 0,
      });
    }
  });

  if (items.length === 0) return null;

  // Sort items cleanly by displayOrder
  items.sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="achievements" className="py-20 border-t border-[#202024] bg-[#101012] relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Section Header */}
        <div className="flex flex-col gap-2 mb-12">
          <span className="font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA] max-w-2xl font-sans">
            {heading}
          </h2>
          <div className="w-10 h-1 bg-indigo-500 rounded-full mt-2" />
        </div>

        {/* Single Unified Grid (3-col desktop, 2-col tablet, 1-col mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="group rounded-xl bg-[#161618] border border-[#202024] p-5 flex flex-col justify-between gap-4 hover:bg-[#1C1C20] hover:border-white/20 transition-all shadow-sm"
            >
              <div className="flex flex-col gap-2.5">
                {/* Header: Organization / Event on Left, Date on Right */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-indigo-400 font-semibold truncate max-w-[70%]">
                    {item.organization}
                  </span>
                  {item.date && <span className="text-zinc-500">{item.date}</span>}
                </div>

                {/* Achievement Title */}
                <h3 className="text-base font-bold text-[#FAFAFA] font-sans leading-snug group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>

                {/* Short Description */}
                {item.description && (
                  <p className="text-xs text-[#A1A1AA] leading-relaxed font-sans line-clamp-3">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Certificate / Proof Action Button */}
              {item.certificateUrl && (
                <div className="pt-3 border-t border-[#202024] font-mono text-xs mt-auto">
                  <button
                    onClick={() =>
                      setActiveProof({
                        url: item.certificateUrl!,
                        title: `${item.title} — ${item.organization}`,
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" /> View Certificate ↗
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

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
