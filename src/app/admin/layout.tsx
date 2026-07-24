'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { adminLogoutAction } from '@/lib/actions';
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Briefcase,
  Wrench,
  GraduationCap,
  Trophy,
  Medal,
  Award,
  Share2,
  Navigation,
  Image as ImageIcon,
  FileDown,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const adminNavItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Site Content', href: '/admin/content', icon: FileText },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase },
  { label: 'Skills', href: '/admin/skills', icon: Wrench },
  { label: 'Education', href: '/admin/education', icon: GraduationCap },
  { label: 'Achievements', href: '/admin/achievements', icon: Trophy },
  { label: 'Hackathons', href: '/admin/hackathons', icon: Medal },
  { label: 'Certifications', href: '/admin/certifications', icon: Award },
  { label: 'Social Links', href: '/admin/social', icon: Share2 },
  { label: 'Navigation', href: '/admin/navigation', icon: Navigation },
  { label: 'Media', href: '/admin/media', icon: ImageIcon },
  { label: 'Resume', href: '/admin/resume', icon: FileDown },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Do not render layout wrapper on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await adminLogoutAction();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans selection:bg-indigo-500 selection:text-white">
      {/* Mobile Top Nav Bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 h-16 bg-zinc-900 border-b border-zinc-800 z-40 px-4 flex items-center justify-between">
        <span className="font-mono font-bold text-lg text-zinc-100">
          KG Admin CMS
        </span>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 text-zinc-400 hover:text-white"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sidebar / Mobile Overlay */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } pt-16 lg:pt-0`}
      >
        <div className="p-6 flex flex-col gap-6 overflow-y-auto">
          {/* Brand Header */}
          <div className="hidden lg:flex items-center gap-3 border-b border-zinc-800 pb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-mono font-bold text-white text-sm">
              KG
            </div>
            <div>
              <span className="font-bold text-sm text-zinc-100 block">Krishna Garg</span>
              <span className="text-xs font-mono text-zinc-500">Portfolio CMS Admin</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 font-mono text-xs">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-indigo-600/15 border border-indigo-500/30 text-indigo-300 font-semibold'
                      : 'text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-200'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Logout Button */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/80">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-rose-500/30 font-mono text-xs font-semibold transition-all"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-6 sm:p-10 pt-24 lg:pt-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
