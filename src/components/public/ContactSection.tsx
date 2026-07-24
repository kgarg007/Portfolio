'use client';

import { useState } from 'react';
import { Mail, Phone, Send, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { ISiteSettings, ISocialLink } from '@/types';

interface ContactSectionProps {
  content: Record<string, string>;
  settings?: ISiteSettings;
  socialLinks?: ISocialLink[];
}

export default function ContactSection({ content, settings, socialLinks = [] }: ContactSectionProps) {
  const eyebrow = content.contact_eyebrow || 'GET IN TOUCH';
  const heading = content.contact_heading || "HAVE AN IDEA? LET'S BUILD SOMETHING EXTRAORDINARY.";
  const description =
    content.contact_description ||
    "I'm currently open to internships, full-stack development roles, and engineering collaborations. Drop a message or reach out directly!";

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
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappEnabled = settings?.sectionVisibility?.whatsapp !== false && settings?.whatsappNumber;
  const whatsappUrl = `https://wa.me/${settings?.whatsappNumber?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    settings?.whatsappMessage || 'Hi Krishna!'
  )}`;

  return (
    <section id="contact" className="py-24 border-t border-zinc-800/60 bg-zinc-950/40 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16">
          <span className="font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100 max-w-3xl leading-tight">
            {heading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mt-2 font-sans">
            {description}
          </p>
          <div className="w-12 h-1 bg-indigo-500 rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 font-mono text-sm">
            <a
              href="mailto:kgarg5448@gmail.com"
              className="flex items-center gap-4 p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-zinc-500 uppercase block">Email Address</span>
                <span className="text-zinc-200 font-sans text-base font-medium">kgarg5448@gmail.com</span>
              </div>
            </a>

            <a
              href="tel:+917982874404"
              className="flex items-center gap-4 p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-zinc-500 uppercase block">Phone / Mobile</span>
                <span className="text-zinc-200 font-sans text-base font-medium">+91 7982874404</span>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/krishna-garg-56117a324"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-zinc-500 uppercase block">LinkedIn</span>
                <span className="text-zinc-200 font-sans text-base font-medium">krishna-garg-56117a324</span>
              </div>
            </a>

            <a
              href="https://github.com/kgarg007"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <GithubIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-zinc-500 uppercase block">GitHub</span>
                <span className="text-zinc-200 font-sans text-base font-medium">kgarg007</span>
              </div>
            </a>

            {/* Optional WhatsApp Button */}
            {whatsappEnabled && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/40 font-mono text-sm font-semibold transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" /> Direct WhatsApp Action
              </a>
            )}
          </div>

          {/* Interactive Form Column */}
          <div className="lg:col-span-7 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-8 sm:p-10">
            <h3 className="text-xl font-bold text-zinc-100 font-sans mb-6">
              Send a Direct Message
            </h3>

            {success ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-4 text-emerald-300 font-mono text-sm">
                <CheckCircle className="w-6 h-6 shrink-0 text-emerald-400" />
                <div>
                  <strong className="block font-bold">Message Delivered!</strong>
                  Thank you for reaching out. Krishna will get back to you shortly.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-mono text-sm">
                {/* Honeypot field for bot protection */}
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
                  <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-zinc-400 uppercase">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-zinc-400 uppercase">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-zinc-400 uppercase">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors font-sans"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-zinc-400 uppercase">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
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
