import { connectToDatabase } from '@/lib/db';
import SiteSettings from '@/models/SiteSettings';
import ResumeManager from './ResumeManager';

export const revalidate = 0;

export default async function AdminResumePage() {
  await connectToDatabase();
  const settingsDoc = await SiteSettings.findOne().lean();
  const settings = JSON.parse(JSON.stringify(settingsDoc || {}));

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100 font-sans tracking-tight">
          Resume Manager CMS
        </h1>
        <p className="text-sm font-mono text-zinc-400 mt-1">
          Upload, replace, view, or remove your resume PDF; update public CTA button label.
        </p>
      </div>

      <ResumeManager currentResume={settings.resume} />
    </div>
  );
}
