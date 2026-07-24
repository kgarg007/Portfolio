import { connectToDatabase } from '@/lib/db';
import SocialLink from '@/models/SocialLink';
import SocialManager from './SocialManager';

export const revalidate = 0;

export default async function AdminSocialPage() {
  await connectToDatabase();
  const docs = await SocialLink.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
  const socialLinks = JSON.parse(JSON.stringify(docs));

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100 font-sans tracking-tight">
          Social Links CMS
        </h1>
        <p className="text-sm font-mono text-zinc-400 mt-1">
          Manage dynamic professional social channels (GitHub, LinkedIn, Email, Phone, LeetCode, etc.).
        </p>
      </div>

      <SocialManager initialSocialLinks={socialLinks} />
    </div>
  );
}
