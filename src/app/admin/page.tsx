import Link from 'next/link';
import { connectToDatabase } from '@/lib/db';
import Project from '@/models/Project';
import Experience from '@/models/Experience';
import Skill from '@/models/Skill';
import Hackathon from '@/models/Hackathon';
import ContactMessage from '@/models/ContactMessage';
import { FolderKanban, Briefcase, Wrench, Medal, MessageSquare, ArrowUpRight, Plus, Eye } from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  await connectToDatabase();

  const [totalProjects, publishedProjects, totalExp, totalSkills, totalHackathons, unreadMessages, recentMessages] =
    await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ published: true }),
      Experience.countDocuments(),
      Skill.countDocuments(),
      Hackathon.countDocuments(),
      ContactMessage.countDocuments({ read: false }),
      ContactMessage.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 font-sans tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm font-mono text-zinc-400 mt-1">
            Krishna Garg Portfolio Admin CMS & Content Management
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 hover:bg-zinc-800 font-mono text-xs font-semibold transition-all"
          >
            <Eye className="w-4 h-4 text-indigo-400" /> View Live Site <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Real Analytics & Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col gap-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="font-mono text-xs uppercase">Projects</span>
            <FolderKanban className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-3xl font-bold text-zinc-100 font-sans">{totalProjects}</span>
          <span className="font-mono text-xs text-emerald-400">{publishedProjects} Published</span>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col gap-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="font-mono text-xs uppercase">Experiences</span>
            <Briefcase className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-3xl font-bold text-zinc-100 font-sans">{totalExp}</span>
          <span className="font-mono text-xs text-zinc-500">Work & Leadership</span>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col gap-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="font-mono text-xs uppercase">Skills</span>
            <Wrench className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-3xl font-bold text-zinc-100 font-sans">{totalSkills}</span>
          <span className="font-mono text-xs text-zinc-500">Tech Capabilities</span>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col gap-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="font-mono text-xs uppercase">Hackathons</span>
            <Medal className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-3xl font-bold text-zinc-100 font-sans">{totalHackathons}</span>
          <span className="font-mono text-xs text-zinc-500">Competitions</span>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col gap-2">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="font-mono text-xs uppercase">Messages</span>
            <MessageSquare className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-3xl font-bold text-zinc-100 font-sans">{unreadMessages}</span>
          <span className="font-mono text-xs text-indigo-400">Unread Inquiries</span>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-4">
        <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-bold">
          Quick Administrative Actions
        </h3>
        <div className="flex flex-wrap gap-3 font-mono text-xs">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all"
          >
            <Plus className="w-4 h-4" /> Manage Projects
          </Link>
          <Link
            href="/admin/content"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700 transition-all"
          >
            Edit Website Copy
          </Link>
          <Link
            href="/admin/resume"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700 transition-all"
          >
            Update Resume PDF
          </Link>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 hover:bg-zinc-700 transition-all"
          >
            Section Visibility Toggles
          </Link>
        </div>
      </div>

      {/* Recent Contact Messages Preview */}
      <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-bold">
            Recent Contact Inquiries
          </h3>
          <Link href="/admin/messages" className="font-mono text-xs text-indigo-400 hover:underline">
            View All Inbox →
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <p className="font-mono text-xs text-zinc-500 py-4">No contact messages received yet.</p>
        ) : (
          <div className="flex flex-col gap-3 font-mono text-xs">
            {recentMessages.map((msg: any) => (
              <div
                key={msg._id.toString()}
                className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4"
              >
                <div>
                  <span className="font-bold text-zinc-200 block font-sans text-sm">{msg.name}</span>
                  <span className="text-zinc-500 block">{msg.email}</span>
                  <p className="text-zinc-400 font-sans text-xs mt-1 line-clamp-1">{msg.message}</p>
                </div>
                <span className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold shrink-0 ${
                  msg.read ? 'bg-zinc-900 text-zinc-500' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                }`}>
                  {msg.read ? 'Read' : 'New'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
