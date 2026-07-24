import { connectToDatabase } from '@/lib/db';
import SiteSettings from '@/models/SiteSettings';
import SettingsForm from './SettingsForm';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  await connectToDatabase();
  const doc = await SiteSettings.findOne().lean();
  const settings = JSON.parse(JSON.stringify(doc || {}));

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100 font-sans tracking-tight">
          Site Settings & Section Visibility
        </h1>
        <p className="text-sm font-mono text-zinc-400 mt-1">
          Enable or disable public website sections, configure WhatsApp actions, and update SEO metadata.
        </p>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  );
}
