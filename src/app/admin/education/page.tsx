import { connectToDatabase } from '@/lib/db';
import Education from '@/models/Education';
import EducationManager from './EducationManager';

export const revalidate = 0;

export default async function AdminEducationPage() {
  await connectToDatabase();
  const docs = await Education.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
  const education = JSON.parse(JSON.stringify(docs));

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100 font-sans tracking-tight">
          Education CMS
        </h1>
        <p className="text-sm font-mono text-zinc-400 mt-1">
          Manage degrees, university affiliations, CGPA grades, and coursework displayed on the homepage.
        </p>
      </div>

      <EducationManager initialEducation={education} />
    </div>
  );
}
