import { connectToDatabase } from '@/lib/db';
import Hackathon from '@/models/Hackathon';
import HackathonManager from './HackathonManager';

export const revalidate = 0;

export default async function AdminHackathonsPage() {
  await connectToDatabase();
  const docs = await Hackathon.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
  const hackathons = JSON.parse(JSON.stringify(docs));

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100 font-sans tracking-tight">
          Hackathons CMS
        </h1>
        <p className="text-sm font-mono text-zinc-400 mt-1">
          Manage hackathon entries, event details, project names, and team roles.
        </p>
      </div>

      <HackathonManager initialHackathons={hackathons} />
    </div>
  );
}
