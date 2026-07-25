'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { INavigationItem, ISiteSettings } from '@/types';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';

interface NavbarProps {
  logoText?: string;
  items?: INavigationItem[];
  settings?: ISiteSettings;
}

export default function Navbar({ logoText = 'KG.', items = [], settings }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  const defaultNavItems = [
    { label: 'About', url: '#about' },
    { label: 'Work', url: '#projects' },
    { label: 'Experience', url: '#experience' },
    { label: 'Achievements', url: '#achievements' },
    { label: 'Contact', url: '#contact' },
  ];

  const navLinks = items.length > 0
    ? items.filter((i) => ['#about', '#projects', '#experience', '#achievements', '#contact'].includes(i.url))
    : defaultNavItems;

  const displayLinks = navLinks.length > 0 ? navLinks : defaultNavItems;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['about', 'projects', 'experience', 'achievements', 'contact'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35, rootMargin: '-80px 0px -40% 0px' }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const resumeUrl = settings?.resume?.fileUrl ? '/api/resume/download' : undefined;
  const resumeLabel = settings?.resume?.label || 'Download Resume';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#101012]/90 backdrop-blur-md border-b border-[#202024] py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-sans font-bold text-lg tracking-tight text-[#FAFAFA] hover:text-indigo-400 transition-colors"
        >
          {logoText}
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 font-mono text-xs tracking-wide">
          {displayLinks.map((item) => {
            const sectionId = item.url.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.url}
                href={item.url}
                className={`transition-all py-1 border-b-2 ${
                  isActive
                    ? 'text-indigo-400 border-indigo-500 font-medium'
                    : 'text-zinc-400 border-transparent hover:text-[#FAFAFA]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button - Resume */}
        <div className="hidden md:flex items-center">
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3.5 py-1.5 rounded-lg bg-[#161618] border border-[#202024] text-zinc-200 hover:bg-[#1C1C20] hover:border-white/20 hover:text-white transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400/80" />
              <span>{resumeLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          ) : (
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3.5 py-1.5 rounded-lg bg-[#161618] border border-[#202024] text-zinc-200 hover:text-white hover:bg-[#1C1C20] transition-all"
            >
              Get in Touch
            </a>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-zinc-300 hover:text-white p-2"
          aria-label="Toggle Mobile Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[56px] bg-[#101012]/95 backdrop-blur-xl border-b border-[#202024] p-6 flex flex-col gap-4 font-mono text-sm text-zinc-300 z-40 shadow-2xl">
          {displayLinks.map((item) => {
            const sectionId = item.url.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.url}
                href={item.url}
                onClick={() => setMobileOpen(false)}
                className={`py-2 px-3 rounded-lg transition-colors ${
                  isActive ? 'bg-indigo-500/10 text-indigo-400 font-bold border-l-2 border-indigo-500' : 'hover:bg-[#161618] hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg bg-indigo-600/90 text-white hover:bg-indigo-600 transition-colors"
            >
              <FileText className="w-4 h-4" /> {resumeLabel} <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </header>
  );
}
