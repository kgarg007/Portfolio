'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowDownRight, FileText, Sparkles, ExternalLink } from 'lucide-react';
import { ISiteSettings, IEducation } from '@/types';

// Dynamically import 3D Canvas to avoid SSR issues and ensure high client performance
const Hero3DCanvas = dynamic(() => import('@/components/3d/Hero3DCanvas'), {
  ssr: false,
});

interface HeroSectionProps {
  content: Record<string, string>;
  settings?: ISiteSettings;
  education?: IEducation[];
}

export default function HeroSection({ content, settings, education = [] }: HeroSectionProps) {
  const eyebrow = content.hero_eyebrow || 'OPEN TO OPPORTUNITIES';
  const name = content.hero_name || 'Krishna Garg';
  const title = content.hero_title || 'Full Stack Developer';
  const headline = content.hero_headline || 'Computer Science Student & Full Stack Web Developer';
  const description =
    content.hero_description ||
    'B.Tech CSE student at GGSIPU (MSIT) with strong foundations in React, Next.js, Python, and Data Analysis. Active hackathon participant and incubation department leader.';

  const primaryCtaLabel = content.hero_primary_cta_label || 'See my work';
  const primaryCtaDest = content.hero_primary_cta_dest || '#projects';
  const secondaryCtaLabel = content.hero_secondary_cta_label || 'Download CV';
  const secondaryCtaDest = settings?.resume?.fileUrl ? '/api/resume/download' : content.hero_secondary_cta_dest || '#contact';

  const profilePhotoUrl = settings?.profilePhoto?.url;
  const primaryEdu = education.length > 0 ? education[0] : null;
  const currentlyBuilding = settings?.currentlyBuilding;
  const currentlyBuildingUrl = settings?.currentlyBuildingUrl;

  return (
    <section id="hero" className="relative pt-32 pb-16 min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Subtle Mesh / Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        {/* Left Column — Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col gap-5 text-left">
          {/* Availability Pill & Optional Currently Building Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 w-fit shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="tracking-wide text-zinc-300 font-medium uppercase text-[11px]">{eyebrow}</span>
            </div>

            {currentlyBuilding && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-[11px] w-fit">
                <Sparkles className="w-3 h-3 text-indigo-400 shrink-0" />
                <span>Building: <strong>{currentlyBuilding}</strong></span>
                {currentlyBuildingUrl && (
                  <a
                    href={currentlyBuildingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-0.5 ml-1 text-indigo-400"
                  >
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Name & Title */}
          <div className="flex flex-col gap-1.5">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-100 font-sans">
              {name}
            </h1>
            <p className="text-lg sm:text-xl font-mono text-indigo-400 font-medium">
              {title}
            </p>
          </div>

          {/* Headline & Concise Description */}
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-200 leading-snug font-sans">
            {headline}
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed max-w-xl font-sans">
            {description}
          </p>

          {/* Distinct CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
            {/* Primary CTA (High-emphasis solid) */}
            <a
              href={primaryCtaDest}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20"
            >
              {primaryCtaLabel} <ArrowDownRight className="w-4 h-4" />
            </a>

            {/* Secondary CTA (Ghost / Outline) */}
            {secondaryCtaDest && (
              <a
                href={secondaryCtaDest}
                target={secondaryCtaDest.startsWith('http') || secondaryCtaDest.includes('/api/resume') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium hover:bg-zinc-800 hover:text-zinc-100 hover:border-zinc-700 transition-all"
              >
                <FileText className="w-4 h-4 text-indigo-400" /> {secondaryCtaLabel}
              </a>
            )}
          </div>
        </div>

        {/* Right Column — Layered 3D Canvas + Semi-Transparent Code Card */}
        <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[450px] flex items-center justify-center">
          {profilePhotoUrl ? (
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group">
              <Image
                src={profilePhotoUrl}
                alt={settings?.profilePhoto?.altText || name}
                fill
                priority
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ) : (
            <>
              {/* Primary 3D Visual Layer in Background */}
              <div className="absolute inset-0 z-0">
                <Hero3DCanvas />
              </div>

              {/* Foreground Semi-Transparent Developer Card */}
              <div className="w-full max-w-sm sm:max-w-md rounded-xl bg-zinc-950/40 border border-zinc-800/80 p-4 sm:p-5 flex flex-col gap-3 font-mono text-xs shadow-2xl backdrop-blur-md relative z-10 pointer-events-auto hover:border-zinc-700/80 transition-all">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5 text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">developer.ts</span>
                </div>

                <div className="space-y-1.5 text-zinc-300 leading-relaxed font-mono text-xs">
                  <div className="text-zinc-500 text-[11px]">// Dynamic Portfolio State</div>
                  <div>
                    <span className="text-indigo-400">const</span> <span className="text-zinc-100">developer</span> = &#123;
                  </div>
                  <div className="pl-4">
                    name: <span className="text-emerald-400">"{name}"</span>,
                  </div>
                  <div className="pl-4">
                    role: <span className="text-emerald-400">"{title}"</span>,
                  </div>
                  {primaryEdu?.grade && (
                    <div className="pl-4">
                      cgpa: <span className="text-emerald-400">"{primaryEdu.grade}"</span>,
                    </div>
                  )}
                  <div className="pl-4">
                    focus: [<span className="text-amber-300">"React"</span>, <span className="text-amber-300">"Next.js"</span>, <span className="text-amber-300">"Python"</span>],
                  </div>
                  <div className="pl-4">
                    status: <span className="text-emerald-400">"{currentlyBuilding ? `Building ${currentlyBuilding}` : 'Open to Roles'}"</span>,
                  </div>
                  <div>&#125;;</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
