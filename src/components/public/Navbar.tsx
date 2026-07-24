'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { INavigationItem, ISiteSettings } from '@/types';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  logoText?: string;
  items: INavigationItem[];
  settings?: ISiteSettings;
}

export default function Navbar({ logoText = 'KG.', items = [], settings }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const resumeUrl = settings?.resume?.fileUrl ? '/api/resume/download' : undefined;
  const resumeLabel = settings?.resume?.label || 'Resume';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60 py-3.5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono font-bold text-xl tracking-tighter text-zinc-100 hover:text-indigo-400 transition-colors"
        >
          {logoText}
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm text-zinc-400">
          {items.map((item) => (
            <a
              key={item._id || item.url}
              href={item.url}
              className="hover:text-zinc-100 transition-colors"
            >
              {item.label}
            </a>
          ))}
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-700/80 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-500 transition-all"
            >
              {resumeLabel} <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-zinc-300 hover:text-white p-2"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 p-6 flex flex-col gap-5 font-mono text-base text-zinc-300 z-40">
          {items.map((item) => (
            <a
              key={item._id || item.url}
              href={item.url}
              onClick={() => setMobileOpen(false)}
              className="hover:text-indigo-400 transition-colors py-1"
            >
              {item.label}
            </a>
          ))}
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
            >
              {resumeLabel} <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
