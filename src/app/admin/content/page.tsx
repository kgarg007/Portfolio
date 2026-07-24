import { connectToDatabase } from '@/lib/db';
import SiteContent from '@/models/SiteContent';
import ContentForm from './ContentForm';

export const revalidate = 0;

export default async function AdminContentPage() {
  await connectToDatabase();
  const docs = await SiteContent.find().lean();
  
  const contentMap: Record<string, string> = {};
  docs.forEach((d: any) => {
    contentMap[d.key] = d.value;
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100 font-sans tracking-tight">
          Site Content CMS
        </h1>
        <p className="text-sm font-mono text-zinc-400 mt-1">
          Manage all public website copy, hero headlines, section descriptions, and CTA text without code modification.
        </p>
      </div>

      <ContentForm initialContent={contentMap} />
    </div>
  );
}
