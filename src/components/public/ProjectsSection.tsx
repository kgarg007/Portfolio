import Link from 'next/link';
import { IProject } from '@/types';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

interface ProjectsSectionProps {
  content: Record<string, string>;
  projects: IProject[];
}

export default function ProjectsSection({ content, projects }: ProjectsSectionProps) {
  const eyebrow = content.projects_eyebrow || 'SELECTED WORK';
  const heading = content.projects_heading || 'Featured Engineering Case Studies';
  const description =
    content.projects_description ||
    'A curated selection of full-stack web applications, hackathon entries, and foundation projects built with modern web technologies.';

  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 border-t border-zinc-800/60 bg-zinc-950/80 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <span className="font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 max-w-2xl">
            {heading}
          </h2>
          <p className="text-base text-zinc-400 max-w-xl">
            {description}
          </p>
          <div className="w-12 h-1 bg-indigo-500 rounded-full mt-2" />
        </div>

        {/* Projects Editorial Cards */}
        <div className="flex flex-col gap-12">
          {projects.map((project, index) => (
            <div
              key={project._id || project.slug}
              className="group relative rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-8 sm:p-10 hover:border-zinc-700 transition-all duration-300 flex flex-col lg:flex-row gap-8 justify-between items-start"
            >
              {/* Project Main Content */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-indigo-400">
                    0{index + 1}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 font-mono text-xs text-zinc-300">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/30 font-mono text-xs text-indigo-300">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100 group-hover:text-indigo-300 transition-colors">
                  {project.name}
                </h3>

                <p className="text-base text-zinc-400 leading-relaxed max-w-2xl font-sans">
                  {project.shortDescription}
                </p>

                {/* Tech Stack Pills */}
                {project.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Links */}
              <div className="flex sm:flex-col items-center sm:items-end gap-4 shrink-0 pt-4 lg:pt-0 w-full sm:w-auto border-t sm:border-t-0 border-zinc-800 font-mono text-sm">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-100 text-zinc-950 font-semibold hover:bg-white transition-all text-xs"
                >
                  View Case Study <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all text-xs"
                  >
                    <GithubIcon className="w-3.5 h-3.5" /> GitHub
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all text-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
