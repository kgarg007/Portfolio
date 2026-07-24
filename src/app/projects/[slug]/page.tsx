import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import { getProjectBySlug, getAllPublishedProjectSlugs } from '@/lib/data';
import { ArrowLeft, ExternalLink, Calendar, UserCheck, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export async function generateStaticParams() {
  const slugs = await getAllPublishedProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.name} — Krishna Garg Case Study`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.name} — Technical Case Study`,
      description: project.shortDescription,
      images: project.coverImage?.url ? [{ url: project.coverImage.url }] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar logoText="KG." items={[]} />

      <main className="pt-32 pb-24 max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-mono text-indigo-400 hover:text-indigo-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Selected Work
        </Link>

        {/* Header Metadata */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-indigo-400 font-semibold uppercase">
              {project.category}
            </span>
            {project.startDate && (
              <span className="flex items-center gap-1 text-zinc-500">
                <Calendar className="w-3.5 h-3.5" /> {project.startDate} {project.endDate ? `– ${project.endDate}` : ''}
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-100">
            {project.name}
          </h1>

          <p className="text-xl text-zinc-300 leading-relaxed font-sans">
            {project.shortDescription}
          </p>

          {/* Role & Links Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-zinc-800/80 py-4 font-mono text-sm">
            {project.role && (
              <div className="flex items-center gap-2 text-zinc-400">
                <UserCheck className="w-4 h-4 text-indigo-400" />
                <span>Role: <strong className="text-zinc-200 font-normal">{project.role}</strong></span>
              </div>
            )}

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-700 text-zinc-200 hover:bg-zinc-800 transition-all text-xs"
                >
                  <GithubIcon className="w-3.5 h-3.5" /> GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all text-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {project.coverImage?.url && (
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-800 mb-12 bg-zinc-900">
            <Image
              src={project.coverImage.url}
              alt={project.coverImage.altText || project.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Tech Stack Pills */}
        {project.techStack?.length > 0 && (
          <div className="flex flex-col gap-3 mb-12 p-6 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <span className="font-mono text-xs uppercase text-zinc-500 font-semibold">Technologies Used</span>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Problem & Solution Grid */}
        {(project.problem || project.solution) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 font-sans">
            {project.problem && (
              <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col gap-2">
                <span className="font-mono text-xs font-bold text-indigo-400 uppercase">The Challenge</span>
                <p className="text-zinc-300 text-sm leading-relaxed">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col gap-2">
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase">The Solution</span>
                <p className="text-zinc-300 text-sm leading-relaxed">{project.solution}</p>
              </div>
            )}
          </div>
        )}

        {/* Key Features List */}
        {project.features && project.features.length > 0 && (
          <div className="mb-12 flex flex-col gap-4">
            <h3 className="font-mono text-sm font-bold uppercase text-zinc-400">Key Engineering Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Case Study Markdown Body */}
        <div className="prose prose-invert max-w-none prose-headings:font-sans prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-zinc-300 prose-p:leading-relaxed prose-li:text-zinc-300 border-t border-zinc-800/80 pt-12">
          <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
            {project.fullDescription}
          </ReactMarkdown>
        </div>
      </main>

      <Footer content={{ footer_copy: 'Krishna Garg Portfolio Case Study', footer_copyright: 'All rights reserved.' }} />
    </div>
  );
}
