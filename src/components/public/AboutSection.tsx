'use client';

import Image from 'next/image';
import { MapPin, GraduationCap, Mail, FileText, Code } from 'lucide-react';
import { ISiteSettings, IEducation } from '@/types';

interface AboutSectionProps {
  content: Record<string, string>;
  settings?: ISiteSettings;
  education?: IEducation[];
}

export default function AboutSection({ content, settings, education = [] }: AboutSectionProps) {
  const eyebrow = content.about_eyebrow || 'ABOUT ME';
  const heading = content.about_heading || 'Engineering responsive web applications & data systems';
  const intro =
    content.about_intro ||
    "I'm a Computer Science student at MSIT (GGSIPU, New Delhi). I build full-stack web applications and analyze data to solve practical campus and business problems.";
  const description =
    content.about_description ||
    'I focus on clean code, modern web performance, and functional UI design. As Deputy Head of Incubation at E-Cell MSIT, I also evaluate early-stage MVP architectures and mentor fellow student developers.';

  const profilePhotoUrl = settings?.profilePhoto?.url;
  const resumeUrl = settings?.resume?.fileUrl ? '/api/resume/download' : undefined;

  // Extract primary education from DB documents (Single Source of Truth)
  const primaryEdu = education.length > 0 ? education[0] : null;

  return (
    <section id="about" className="py-20 border-t border-zinc-800/60 bg-zinc-950/40 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-10">
          <span className="font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 max-w-2xl font-sans">
            {heading}
          </h2>
          <div className="w-10 h-1 bg-indigo-500 rounded-full mt-2" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {profilePhotoUrl && (
            <div className="lg:col-span-4 relative group">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl">
                <Image
                  src={profilePhotoUrl}
                  alt={settings?.profilePhoto?.altText || 'Profile photo'}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          )}

          <div className={`${profilePhotoUrl ? 'lg:col-span-8' : 'lg:col-span-12'} flex flex-col gap-6`}>
            <p className="text-lg text-zinc-200 leading-relaxed font-sans font-medium">
              {intro}
            </p>
            <p className="text-base text-zinc-400 leading-relaxed font-sans">
              {description}
            </p>

            {/* Dynamic Metadata Cards (Loaded from DB) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-zinc-900/70 border border-zinc-800/80">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] text-zinc-500 block uppercase font-mono">Location</span>
                  <span className="text-zinc-200 font-sans font-medium">New Delhi, India</span>
                </div>
              </div>

              {primaryEdu && (
                <div className="flex items-center gap-3 p-3.5 rounded-lg bg-zinc-900/70 border border-zinc-800/80">
                  <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-zinc-500 block uppercase font-mono">Education</span>
                    <span className="text-zinc-200 font-sans font-medium truncate block">
                      {primaryEdu.degree} ({primaryEdu.startYear}–{primaryEdu.endYear || 'Present'})
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-zinc-900/70 border border-zinc-800/80">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] text-zinc-500 block uppercase font-mono">Contact Email</span>
                  <a href="mailto:kgarg5448@gmail.com" className="text-zinc-200 font-sans font-medium hover:text-indigo-400 transition-colors truncate block">
                    kgarg5448@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Resume Button */}
            {resumeUrl && (
              <div className="pt-2">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-xs font-mono font-medium text-zinc-200 hover:bg-zinc-800 hover:border-zinc-500 transition-all w-fit"
                >
                  <FileText className="w-4 h-4 text-indigo-400" /> Download Resume PDF
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
