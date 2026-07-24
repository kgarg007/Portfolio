'use client';

import dynamic from 'next/dynamic';
import { ArrowDownRight, FileText, Sparkles } from 'lucide-react';
import HeroFallback from '../3d/HeroFallback';
import { ISiteSettings } from '@/types';

const Hero3DCanvas = dynamic(() => import('../3d/Hero3DCanvas'), {
  ssr: false,
  loading: () => <HeroFallback />,
});

interface HeroSectionProps {
  content: Record<string, string>;
  settings?: ISiteSettings;
}

export default function HeroSection({ content, settings }: HeroSectionProps) {
  const eyebrow = content.hero_eyebrow || 'OPEN TO OPPORTUNITIES';
  const name = content.hero_name || 'Krishna Garg';
  const title = content.hero_title || 'Full Stack Developer & Data Analyst';
  const headline = content.hero_headline || 'Building intelligent digital products that solve real-world problems.';
  const description =
    content.hero_description ||
    'B.Tech CSE student at GGSIPU (MSIT) with CGPA 9.4 / 10. Passionate about web engineering, data analytics, and startup incubation.';
  const primaryCtaLabel = content.hero_primary_cta_label || 'Explore Featured Work';
  const primaryCtaDest = content.hero_primary_cta_dest || '#projects';
  const secondaryCtaLabel = content.hero_secondary_cta_label || 'Download CV';
  const secondaryCtaDest = settings?.resume?.fileUrl ? '/api/resume/download' : content.hero_secondary_cta_dest || '#resume';

  return (
    <section id="hero" className="relative min-h-[90vh] pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column — Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-indigo-400 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>{eyebrow}</span>
          </div>

          {/* Name & Title */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-100 font-sans">
              {name}
            </h1>
            <p className="text-xl sm:text-2xl font-mono text-indigo-400/90 font-medium">
              {title}
            </p>
          </div>

          {/* Editorial Headline & Paragraph */}
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-300 leading-snug">
            {headline}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl">
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-sm">
            <a
              href={primaryCtaDest}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-zinc-100 text-zinc-950 font-semibold hover:bg-white hover:shadow-lg hover:shadow-indigo-500/10 transition-all"
            >
              {primaryCtaLabel} <ArrowDownRight className="w-4 h-4" />
            </a>

            {secondaryCtaDest && (
              <a
                href={secondaryCtaDest}
                target={secondaryCtaDest.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-300 font-medium hover:bg-zinc-800 hover:text-zinc-100 transition-all"
              >
                <FileText className="w-4 h-4 text-indigo-400" /> {secondaryCtaLabel}
              </a>
            )}
          </div>

          {/* Quick Academic Stat Pill */}
          <div className="flex items-center gap-6 pt-4 border-t border-zinc-800/80 font-mono text-xs text-zinc-500">
            <div>
              <span className="text-zinc-200 font-bold text-base block font-sans">9.4 / 10</span>
              CGPA at GGSIPU (MSIT)
            </div>
            <div className="h-6 w-px bg-zinc-800" />
            <div>
              <span className="text-zinc-200 font-bold text-base block font-sans">B.Tech CSE</span>
              2024 – 2028 Batch
            </div>
          </div>
        </div>

        {/* Right Column — 3D Abstract Sculpture */}
        <div className="lg:col-span-5 h-[380px] sm:h-[450px] relative flex items-center justify-center">
          <Hero3DCanvas />
        </div>
      </div>
    </section>
  );
}
