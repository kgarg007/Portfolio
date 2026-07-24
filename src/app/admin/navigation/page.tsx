import { connectToDatabase } from '@/lib/db';
import NavigationItem from '@/models/NavigationItem';
import NavigationManager from './NavigationManager';

export const revalidate = 0;

export default async function AdminNavigationPage() {
  await connectToDatabase();
  const docs = await NavigationItem.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
  const navItems = JSON.parse(JSON.stringify(docs));

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100 font-sans tracking-tight">
          Navbar & Menu Links CMS
        </h1>
        <p className="text-sm font-mono text-zinc-400 mt-1">
          Manage header navigation links, section anchors, visibility, and display ordering.
        </p>
      </div>

      <NavigationManager initialNavItems={navItems} />
    </div>
  );
}
