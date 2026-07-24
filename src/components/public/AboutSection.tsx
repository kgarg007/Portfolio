import Image from 'next/image';
import { MapPin, GraduationCap, Mail, Phone, FileText } from 'lucide-react';
import { ISiteSettings } from '@/types';

interface AboutSectionProps {
  content: Record<string, string>;
  settings?: ISiteSettings;
}

export default function AboutSection({ content, settings }: AboutSectionProps) {
  const eyebrow = content.about_eyebrow || 'ABOUT ME';
  const heading = content.about_heading || 'Architecting scalable web applications & data systems';
  const intro =
    content.about_intro ||
    "I'm a motivated B.Tech CSE student at GGSIPU with a stellar CGPA of 9.4. I have expertise in frontend development, full stack engineering, and data analysis.";
  const description =
    content.about_description ||
    'Passionate about building scalable web applications and solving real-world problems through technology. I serve as Deputy Head of the Incubation Department at E-Cell MSIT.';

  const profilePhotoUrl = settings?.profilePhoto?.url;
  const resumeUrl = settings?.resume?.fileUrl ? '/api/resume/download' : undefined;

  return (
    <section id="about" className="py-24 border-t border-zinc-800/60 bg-zinc-950/40 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12">
          <span className="font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 max-w-2xl">
            {heading}
          </h2>
          <div className="w-12 h-1 bg-indigo-500 rounded-full mt-2" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Optional Profile Image Container */}
          {profilePhotoUrl ? (
            <div className="lg:col-span-4 relative group">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
                <Image
                  src={profilePhotoUrl}
                  alt={settings?.profilePhoto?.altText || 'Krishna Garg'}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ) : null}

          {/* Biography Text & Key Details */}
          <div className={`${profilePhotoUrl ? 'lg:col-span-8' : 'lg:col-span-12'} flex flex-col gap-6`}>
            <p className="text-lg sm:text-xl text-zinc-200 leading-relaxed font-sans">
              {intro}
            </p>
            <p className="text-base text-zinc-400 leading-relaxed font-sans">
              {description}
            </p>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800/80 font-mono text-sm">
              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <span className="text-xs text-zinc-500 block uppercase">Location</span>
                  <span className="text-zinc-200 font-sans font-medium">Chattarpur, New Delhi</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <span className="text-xs text-zinc-500 block uppercase">University</span>
                  <span className="text-zinc-200 font-sans font-medium">GGSIPU (MSIT)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <span className="text-xs text-zinc-500 block uppercase">Email</span>
                  <a href="mailto:kgarg5448@gmail.com" className="text-zinc-200 font-sans font-medium hover:text-indigo-400 transition-colors">
                    kgarg5448@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <span className="text-xs text-zinc-500 block uppercase">Phone</span>
                  <a href="tel:+917982874404" className="text-zinc-200 font-sans font-medium hover:text-indigo-400 transition-colors">
                    +91 7982874404
                  </a>
                </div>
              </div>
            </div>

            {resumeUrl && (
              <div className="pt-2">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-sm font-mono font-medium text-zinc-200 hover:bg-zinc-800 transition-all w-fit"
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
