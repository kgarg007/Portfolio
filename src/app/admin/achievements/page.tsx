import { connectToDatabase } from '@/lib/db';
import Achievement from '@/models/Achievement';
import AchievementManager from './AchievementManager';

export const revalidate = 0;

export default async function AdminAchievementsPage() {
  await connectToDatabase();
  const docs = await Achievement.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
  const achievements = JSON.parse(JSON.stringify(docs));

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100 font-sans tracking-tight">
          Achievements & Awards CMS
        </h1>
        <p className="text-sm font-mono text-zinc-400 mt-1">
          Manage hackathon ranks, special mentions, and leadership awards.
        </p>
      </div>

      <AchievementManager initialAchievements={achievements} />
    </div>
  );
}
