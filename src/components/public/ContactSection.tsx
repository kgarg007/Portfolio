'use client';

import { useState } from 'react';
import { Mail, Send, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { ISiteSettings, ISocialLink } from '@/types';

interface ContactSectionProps {
  content: Record<string, string>;
  settings?: ISiteSettings;
  socialLinks?: ISocialLink[];
}

export default function ContactSection({ content, settings, socialLinks = [] }: ContactSectionProps) {
  const eyebrow = content.contact_eyebrow || 'GET IN TOUCH';
  const heading = content.contact_heading || "Let's connect";
  const description =
    content.contact_description ||
    "I'm open to software engineering internships, full-stack web developer roles, and technical collaborations. Reach out via email or send a direct message!";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. You can email me directly instead.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappEnabled = settings?.sectionVisibility?.whatsapp !== false && settings?.whatsappNumber;
  const whatsappUrl = `https://wa.me/${settings?.whatsappNumber?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    settings?.whatsappMessage || 'Hi Krishna!'
  )}`;

  return (
    <section id="contact" className="py-20 border-t border-[#202024] bg-[#101012] relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12">
          <span className="font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA] max-w-2xl font-sans">
            {heading}
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] max-w-xl font-sans">
            {description}
          </p>
          <div className="w-10 h-1 bg-indigo-500 rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col gap-4 font-mono text-xs">
            {/* Primary Contacts */}
            <a
              href="mailto:kgarg5448@gmail.com"
              className="flex items-center gap-4 p-4.5 rounded-xl bg-[#161618] border border-[#202024] hover:border-white/20 hover:bg-[#1C1C20] transition-all group shadow-sm"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-[#71717A] uppercase block font-mono">Email Address</span>
                <span className="text-[#FAFAFA] font-sans text-sm font-medium truncate block">kgarg5448@gmail.com</span>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/krishna-garg-56117a324"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4.5 rounded-xl bg-[#161618] border border-[#202024] hover:border-white/20 hover:bg-[#1C1C20] transition-all group shadow-sm"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform shrink-0">
                <LinkedinIcon className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-[#71717A] uppercase block font-mono">LinkedIn</span>
                <span className="text-[#FAFAFA] font-sans text-sm font-medium truncate block">krishna-garg-56117a324</span>
              </div>
            </a>

            {/* Secondary Contact: GitHub */}
            <a
              href="https://github.com/kgarg007"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4.5 rounded-xl bg-[#161618] border border-[#202024] hover:border-white/20 hover:bg-[#1C1C20] transition-all group shadow-sm"
            >
              <div className="w-9 h-9 rounded-lg bg-[#101012] border border-[#202024] flex items-center justify-center text-zinc-300 group-hover:scale-110 transition-transform shrink-0">
                <GithubIcon className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-[#71717A] uppercase block font-mono">GitHub Profile</span>
                <span className="text-[#FAFAFA] font-sans text-sm font-medium truncate block">github.com/kgarg007</span>
              </div>
            </a>

            {/* WhatsApp Action Button */}
            {whatsappEnabled && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/40 font-mono text-xs font-semibold transition-all mt-1 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" /> Direct WhatsApp Message
              </a>
            )}
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 rounded-xl bg-[#161618] border border-[#202024] p-6 sm:p-8 shadow-md">
            <h3 className="text-lg font-bold text-[#FAFAFA] font-sans mb-5">
              Send a Direct Message
            </h3>

            {success ? (
              <div className="p-5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 font-mono text-xs">
                <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
                <div>
                  <strong className="block font-bold text-sm font-sans text-emerald-200">Thanks — your message was sent successfully.</strong>
                  I will review your message and reply via email as soon as possible.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-mono text-xs">
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {error && (
                  <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-rose-300 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-[#A1A1AA] uppercase">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-3.5 py-2.5 rounded-lg bg-[#101012] border border-[#202024] text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-indigo-500 transition-colors font-sans text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-[#A1A1AA] uppercase">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="px-3.5 py-2.5 rounded-lg bg-[#101012] border border-[#202024] text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-indigo-500 transition-colors font-sans text-xs"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-[#A1A1AA] uppercase">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="px-3.5 py-2.5 rounded-lg bg-[#101012] border border-[#202024] text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-indigo-500 transition-colors font-sans text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-[#A1A1AA] uppercase">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your project, role, or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="px-3.5 py-2.5 rounded-lg bg-[#101012] border border-[#202024] text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-indigo-500 transition-colors font-sans text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all disabled:opacity-50 text-xs shadow-sm font-sans"
                >
                  {loading ? (
                    'Sending Message...'
                  ) : (
                    <>
                      Send Message <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
