import { connectToDatabase } from '@/lib/db';
import Project from '@/models/Project';
import ProjectManager from './ProjectManager';

export const revalidate = 0;

export default async function AdminProjectsPage() {
  await connectToDatabase();
  const docs = await Project.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
  const projects = JSON.parse(JSON.stringify(docs));

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100 font-sans tracking-tight">
          Projects CMS & Case Studies
        </h1>
        <p className="text-sm font-mono text-zinc-400 mt-1">
          Create, edit, publish, or delete engineering projects and Markdown case studies.
        </p>
      </div>

      <ProjectManager initialProjects={projects} />
    </div>
  );
}
