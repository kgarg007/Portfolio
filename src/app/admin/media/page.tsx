import { connectToDatabase } from '@/lib/db';
import Media from '@/models/Media';
import MediaManager from './MediaManager';

export const revalidate = 0;

export default async function AdminMediaPage() {
  await connectToDatabase();
  const docs = await Media.find().sort({ createdAt: -1 }).lean();
  const mediaItems = JSON.parse(JSON.stringify(docs));

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100 font-sans tracking-tight">
          Media Library CMS
        </h1>
        <p className="text-sm font-mono text-zinc-400 mt-1">
          Upload and manage Cloudinary media assets (project screenshots, certificates, profile images).
        </p>
      </div>

      <MediaManager initialMediaItems={mediaItems} />
    </div>
  );
}
