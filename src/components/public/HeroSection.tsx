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
    <section id="hero" className="relative pt-32 pb-16 min-h-[82vh] flex items-center justify-center overflow-hidden bg-[#101012]">
      {/* Background Subtle Mesh / Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        {/* Left Column — Clean Typographic Hierarchy */}
        <div className="lg:col-span-7 flex flex-col text-left">
          {/* Availability Pill & Building Tag */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161618] border border-[#202024] text-xs font-mono text-zinc-300 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="tracking-wide text-zinc-300 font-medium uppercase text-[11px]">{eyebrow}</span>
            </div>

            {currentlyBuilding && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-[11px] w-fit">
                <Sparkles className="w-3 h-3 text-indigo-400 shrink-0" />
                <span>Building: <strong>{currentlyBuilding}</strong></span>
                {currentlyBuildingUrl && (
                  <a
                    href={currentlyBuildingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-0.5 ml-0.5 text-indigo-400"
                  >
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* 1. Name (Primary Visual Anchor) */}
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#FAFAFA] font-sans">
            {name}
          </h1>

          {/* 2. Role (Subdued Accent) */}
          <p className="text-base sm:text-lg font-sans text-indigo-400/90 font-medium mt-1">
            {title}
          </p>

          {/* 3. Positioning Statement (Controlled Width, Smaller than Name) */}
          <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-zinc-300 leading-snug font-sans max-w-lg mt-4">
            {headline}
          </h2>

          {/* 4. Description (Narrower Measure, Secondary) */}
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md font-sans mt-2">
            {description}
          </p>

          {/* 5. Compact Refined CTAs */}
          <div className="flex flex-wrap items-center gap-3 mt-6 font-mono text-xs">
            {/* Primary CTA */}
            <a
              href={primaryCtaDest}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-indigo-600/90 hover:bg-indigo-600 text-white font-medium text-xs transition-colors shadow-sm"
            >
              {primaryCtaLabel} <ArrowDownRight className="w-3.5 h-3.5" />
            </a>

            {/* Secondary CTA */}
            {secondaryCtaDest && (
              <a
                href={secondaryCtaDest}
                target={secondaryCtaDest.startsWith('http') || secondaryCtaDest.includes('/api/resume') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#161618] border border-[#202024] text-zinc-300 hover:text-white hover:bg-[#1C1C20] hover:border-white/20 font-medium text-xs transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400/80" /> {secondaryCtaLabel}
              </a>
            )}
          </div>
        </div>

        {/* Right Column — Layered Atmospheric 3D Canvas + Refined developer.ts Card */}
        <div className="lg:col-span-5 relative w-full h-[360px] sm:h-[420px] flex items-center justify-center">
          {profilePhotoUrl ? (
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-[#202024] bg-[#161618] shadow-xl group">
              <Image
                src={profilePhotoUrl}
                alt={settings?.profilePhoto?.altText || name}
                fill
                sizes="(max-width: 640px) 256px, 320px"
                priority
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ) : (
            <>
              {/* Atmospheric 3D Canvas Layer in Background */}
              <div className="absolute inset-0 z-0 opacity-70">
                <Hero3DCanvas />
              </div>

              {/* Quiet, Premium Editor Card (developer.ts) */}
              <div className="w-full max-w-sm sm:max-w-md rounded-xl bg-[#161618]/60 border border-[#202024] p-4 sm:p-5 flex flex-col gap-3 font-mono text-xs shadow-xl backdrop-blur-md relative z-10 pointer-events-auto hover:border-white/20 transition-all">
                <div className="flex items-center justify-between border-b border-[#202024] pb-2 text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">developer.ts</span>
                </div>

                <div className="space-y-1.5 text-zinc-300 leading-relaxed font-mono text-xs">
                  <div className="text-zinc-500 text-[11px]">// Dynamic Portfolio State</div>
                  <div>
                    <span className="text-indigo-400/80">const</span> <span className="text-zinc-200">developer</span> = &#123;
                  </div>
                  <div className="pl-4">
                    <span className="text-zinc-400">name:</span> <span className="text-emerald-400/80">"{name}"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-zinc-400">role:</span> <span className="text-emerald-400/80">"{title}"</span>,
                  </div>
                  {primaryEdu?.grade && (
                    <div className="pl-4">
                      <span className="text-zinc-400">cgpa:</span> <span className="text-emerald-400/80">"{primaryEdu.grade}"</span>,
                    </div>
                  )}
                  <div className="pl-4">
                    <span className="text-zinc-400">focus:</span> [<span className="text-zinc-300">"React"</span>, <span className="text-zinc-300">"Next.js"</span>, <span className="text-zinc-300">"Python"</span>],
                  </div>
                  <div className="pl-4">
                    <span className="text-zinc-400">status:</span> <span className="text-emerald-400/80">"{currentlyBuilding ? `Building ${currentlyBuilding}` : 'Open to Roles'}"</span>,
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
