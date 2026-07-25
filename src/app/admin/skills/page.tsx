import { connectToDatabase } from '@/lib/db';
import Skill from '@/models/Skill';
import SkillManager from './SkillManager';

export const revalidate = 0;

export default async function AdminSkillsPage() {
  let skills = [];

  try {
    await connectToDatabase();
    const docs = await Skill.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
    skills = JSON.parse(JSON.stringify(docs));
  } catch (error: any) {
    console.error('Failed to load skills in AdminSkillsPage:', error);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100 font-sans tracking-tight">
          Skills & Technologies CMS
        </h1>
        <p className="text-sm font-mono text-zinc-400 mt-1">
          Add, edit, or categorize technical skills without percentage bars.
        </p>
      </div>

      <SkillManager initialSkills={skills} />
    </div>
  );
}
