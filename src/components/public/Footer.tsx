import React from 'react';
import { ISocialLink } from '@/types';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '@/components/ui/Icons';
import { Mail, MessageCircle, Globe } from 'lucide-react';

interface FooterProps {
  content: Record<string, string>;
  socialLinks?: ISocialLink[];
}

export default function Footer({ content, socialLinks = [] }: FooterProps) {
  const logoText = content.navbar_logo || 'KG.';
  const subtext = content.footer_subtext || 'Building applications, learning continuously.';
  const footerCopy = content.footer_copy || 'Designed & Built by Krishna Garg';
  const copyright = content.footer_copyright || `© ${new Date().getFullYear()}`;

  // Filter visible social links that have a valid URL and filter out raw phone entries
  const visibleSocials = socialLinks
    .filter((link) => link.visible !== false && link.url && link.url.trim() !== '' && !link.platform.toLowerCase().includes('phone number'))
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  // Helper to resolve icon component based on platform name
  const renderSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('github')) return <GithubIcon className="w-4 h-4" />;
    if (p.includes('linkedin')) return <LinkedinIcon className="w-4 h-4" />;
    if (p.includes('leetcode')) return <LeetCodeIcon className="w-4 h-4" />;
    if (p.includes('mail') || p.includes('email')) return <Mail className="w-4 h-4" />;
    if (p.includes('whatsapp')) return <MessageCircle className="w-4 h-4 text-emerald-400" />;
    return <Globe className="w-4 h-4" />;
  };

  return (
    <footer className="bg-zinc-950 text-zinc-100 border-t border-zinc-900 py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-8">
        {/* Main Content Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Left Side — Logo & Short Closing Sentence */}
          <div className="flex flex-col gap-1.5">
            <span className="font-bold text-xl text-zinc-100 tracking-tight font-sans">
              {logoText}
            </span>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans">
              {subtext}
            </p>
          </div>

          {/* Right Side — Compact Clickable Brand Icons Only */}
          {visibleSocials.length > 0 && (
            <div className="flex items-center gap-2.5">
              {visibleSocials.map((link) => {
                const label = link.platform.toLowerCase().includes('whatsapp') ? 'WhatsApp' : (link.label || link.platform);
                return (
                  <a
                    key={link._id || link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 hover:bg-zinc-800 transition-all"
                  >
                    {renderSocialIcon(link.platform)}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Thin Divider */}
        <div className="h-px w-full bg-zinc-900" />

        {/* Bottom Metadata Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-zinc-500">
          <span>{footerCopy}</span>
          <span>{copyright}</span>
        </div>
      </div>
    </footer>
  );
}
