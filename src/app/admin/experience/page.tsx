import { connectToDatabase } from '@/lib/db';
import Experience from '@/models/Experience';
import ExperienceManager from './ExperienceManager';

export const revalidate = 0;

export default async function AdminExperiencePage() {
  let experiences = [];

  try {
    await connectToDatabase();
    const docs = await Experience.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
    experiences = JSON.parse(JSON.stringify(docs));
  } catch (error: any) {
    console.error('Failed to load experiences in AdminExperiencePage:', error);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100 font-sans tracking-tight">
          Experience & Roles CMS
        </h1>
        <p className="text-sm font-mono text-zinc-400 mt-1">
          Manage work history, internships, leadership roles, and mentorship positions.
        </p>
      </div>

      <ExperienceManager initialExperiences={experiences} />
    </div>
  );
}
