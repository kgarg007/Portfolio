import Link from 'next/link';
import Image from 'next/image';
import { IProject } from '@/types';
import { ExternalLink, ArrowRight, Code2 } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

interface ProjectsSectionProps {
  content: Record<string, string>;
  projects: IProject[];
}

export default function ProjectsSection({ content, projects }: ProjectsSectionProps) {
  const eyebrow = content.projects_eyebrow || 'SELECTED WORK';
  const heading = content.projects_heading || 'Engineering Projects & Case Studies';
  const description =
    content.projects_description ||
    'Selected full-stack web applications, hackathon prototypes, and technical projects.';

  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-20 border-t border-[#202024] bg-[#101012] relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12">
          <span className="font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA] max-w-2xl font-sans">
            {heading}
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] max-w-xl font-sans">
            {description}
          </p>
          <div className="w-10 h-1 bg-indigo-500 rounded-full mt-2" />
        </div>

        {/* Compact 2-Column Responsive Grid (Desktop/Tablet 2-col, Mobile 1-col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const hasCaseStudy = Boolean(
              project.fullDescription || project.problem || project.solution || project.challenges
            );
            const coverUrl = typeof project.coverImage === 'string' ? project.coverImage : project.coverImage?.url;
            const coverAlt = typeof project.coverImage === 'object' ? (project.coverImage?.altText || project.name) : project.name;

            return (
              <div
                key={project._id || project.slug}
                className="group rounded-xl bg-[#161618] border border-[#202024] p-6 hover:bg-[#1C1C20] hover:border-white/20 transition-all duration-300 flex flex-col justify-between gap-5 shadow-sm"
              >
                {/* Thumbnail / Fallback Visual */}
                <div className="w-full h-44 relative rounded-lg overflow-hidden border border-[#202024] bg-[#101012] flex items-center justify-center shrink-0">
                  {coverUrl ? (
                    <Image
                      src={coverUrl}
                      alt={coverAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 text-zinc-600 font-mono text-xs p-4 text-center">
                      <Code2 className="w-8 h-8 text-zinc-700 group-hover:text-indigo-400 transition-colors" />
                      <span className="text-zinc-500 font-semibold">{project.name}</span>
                    </div>
                  )}

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-10 font-mono text-[11px]">
                    <span className="px-2.5 py-1 rounded bg-[#101012]/90 border border-[#202024] text-zinc-300 backdrop-blur-md">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-1 rounded bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-semibold backdrop-blur-md">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col gap-2.5 flex-1">
                  <h3 className="text-xl font-bold text-[#FAFAFA] group-hover:text-indigo-300 transition-colors font-sans tracking-tight">
                    {project.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-sans line-clamp-2">
                    {project.shortDescription}
                  </p>

                  {/* Tech Stack Pills */}
                  {project.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[11px]">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-[#101012] border border-[#202024] text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#202024] font-mono text-xs mt-auto">
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#101012] border border-[#202024] text-zinc-300 hover:text-white hover:border-white/20 hover:bg-[#161618] transition-all text-xs"
                      >
                        <GithubIcon className="w-3.5 h-3.5" /> Code
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#101012] border border-[#202024] text-zinc-300 hover:text-white hover:border-white/20 hover:bg-[#161618] transition-all text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live
                      </a>
                    )}
                  </div>

                  {hasCaseStudy && (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors font-semibold text-xs ml-auto"
                    >
                      View Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
