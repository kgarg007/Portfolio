'use client';

import { useState } from 'react';
import { updateMultipleSiteContentsAction } from '@/lib/actions';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

interface ContentFormProps {
  initialContent: Record<string, string>;
}

export default function ContentForm({ initialContent }: ContentFormProps) {
  const [content, setContent] = useState<Record<string, string>>({
    navbar_logo: initialContent.navbar_logo || 'KG.',
    hero_eyebrow: initialContent.hero_eyebrow || 'OPEN TO OPPORTUNITIES',
    hero_name: initialContent.hero_name || 'Krishna Garg',
    hero_title: initialContent.hero_title || 'Full Stack Developer & Data Analyst',
    hero_headline: initialContent.hero_headline || 'Building intelligent digital products that solve real-world problems.',
    hero_description: initialContent.hero_description || 'B.Tech CSE student at GGSIPU (MSIT) with CGPA 9.4 / 10. Passionate about web engineering, data analytics, and startup incubation.',
    hero_primary_cta_label: initialContent.hero_primary_cta_label || 'Explore Featured Work',
    hero_primary_cta_dest: initialContent.hero_primary_cta_dest || '#projects',
    hero_secondary_cta_label: initialContent.hero_secondary_cta_label || 'Download CV',
    hero_secondary_cta_dest: initialContent.hero_secondary_cta_dest || '#resume',

    about_eyebrow: initialContent.about_eyebrow || 'ABOUT ME',
    about_heading: initialContent.about_heading || 'Architecting scalable web applications & data systems',
    about_intro: initialContent.about_intro || "I'm a motivated B.Tech CSE student at GGSIPU (MSIT, New Delhi) holding a 9.4 CGPA. Skilled in HTML, CSS, JavaScript, React, Python, SQL, Pandas, and NumPy.",
    about_description: initialContent.about_description || 'Deeply passionate about modern web performance, full-stack engineering, and data analysis. I serve as Deputy Head of the Incubation Department at E-Cell MSIT, where I mentor student startups and evaluate MVP architectures.',

    projects_eyebrow: initialContent.projects_eyebrow || 'SELECTED WORK',
    projects_heading: initialContent.projects_heading || 'Featured Engineering Case Studies',
    projects_description: initialContent.projects_description || 'A curated selection of full-stack web applications, hackathon entries, and foundation projects built with modern web technologies.',

    exp_eyebrow: initialContent.exp_eyebrow || 'CAREER & LEADERSHIP',
    exp_heading: initialContent.exp_heading || 'Work Experience & Incubations',
    exp_description: initialContent.exp_description || 'Demonstrated experience in frontend web development, mentorship, hackathon evaluation, and technical leadership.',

    skills_eyebrow: initialContent.skills_eyebrow || 'TECHNICAL PROFICIENCY',
    skills_heading: initialContent.skills_heading || 'Tech Stack & Core Capabilities',
    skills_description: initialContent.skills_description || 'Core engineering languages, frontend frameworks, data science toolkits, and developer workflow tools.',

    edu_eyebrow: initialContent.edu_eyebrow || 'ACADEMIC BACKGROUND',
    edu_heading: initialContent.edu_heading || 'Education & Honors',

    ach_eyebrow: initialContent.ach_eyebrow || 'RECOGNITION',
    ach_heading: initialContent.ach_heading || 'Achievements & Certifications',

    contact_eyebrow: initialContent.contact_eyebrow || 'GET IN TOUCH',
    contact_heading: initialContent.contact_heading || "HAVE AN IDEA? LET'S BUILD SOMETHING EXTRAORDINARY.",
    contact_description: initialContent.contact_description || "I'm currently open to internships, full-stack development roles, and engineering collaborations. Drop a message or reach out directly!",

    footer_subtext: initialContent.footer_subtext || 'Building products, learning continuously.',
    footer_copy: initialContent.footer_copy || 'Designed & Built by Krishna Garg',
    footer_copyright: initialContent.footer_copyright || '© 2026',
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError('');

    const payload = Object.entries(content).map(([key, value]) => ({
      key,
      value,
      group: key.split('_')[0],
    }));

    try {
      const res = await updateMultipleSiteContentsAction(payload);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update website copy.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 font-mono text-sm">
      {/* Toast Feedback */}
      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Website copy successfully updated in MongoDB! Public site is updated.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Navbar & Brand Section */}
      <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-4">
        <h2 className="text-base font-bold text-zinc-100 font-sans border-b border-zinc-800 pb-3">
          Navbar & Logo
        </h2>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-zinc-400 uppercase">Logo Text</label>
          <input
            type="text"
            value={content.navbar_logo}
            onChange={(e) => handleChange('navbar_logo', e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
          />
        </div>
      </div>

      {/* 2. Hero Copy */}
      <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-4">
        <h2 className="text-base font-bold text-zinc-100 font-sans border-b border-zinc-800 pb-3">
          Hero Section Copy
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Hero Eyebrow Badge</label>
            <input
              type="text"
              value={content.hero_eyebrow}
              onChange={(e) => handleChange('hero_eyebrow', e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Hero Name</label>
            <input
              type="text"
              value={content.hero_name}
              onChange={(e) => handleChange('hero_name', e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-zinc-400 uppercase">Hero Title Subhead</label>
          <input
            type="text"
            value={content.hero_title}
            onChange={(e) => handleChange('hero_title', e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-zinc-400 uppercase">Hero Main Headline</label>
          <input
            type="text"
            value={content.hero_headline}
            onChange={(e) => handleChange('hero_headline', e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-zinc-400 uppercase">Hero Description Paragraph</label>
          <textarea
            rows={3}
            value={content.hero_description}
            onChange={(e) => handleChange('hero_description', e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Primary CTA Label</label>
            <input
              type="text"
              value={content.hero_primary_cta_label}
              onChange={(e) => handleChange('hero_primary_cta_label', e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Secondary CTA Label</label>
            <input
              type="text"
              value={content.hero_secondary_cta_label}
              onChange={(e) => handleChange('hero_secondary_cta_label', e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
            />
          </div>
        </div>
      </div>

      {/* 3. About Copy */}
      <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-4">
        <h2 className="text-base font-bold text-zinc-100 font-sans border-b border-zinc-800 pb-3">
          About Section Copy
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">About Eyebrow</label>
            <input
              type="text"
              value={content.about_eyebrow}
              onChange={(e) => handleChange('about_eyebrow', e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">About Heading</label>
            <input
              type="text"
              value={content.about_heading}
              onChange={(e) => handleChange('about_heading', e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-zinc-400 uppercase">About Introduction Paragraph</label>
          <textarea
            rows={3}
            value={content.about_intro}
            onChange={(e) => handleChange('about_intro', e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans resize-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-zinc-400 uppercase">About Full Description Paragraph</label>
          <textarea
            rows={3}
            value={content.about_description}
            onChange={(e) => handleChange('about_description', e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans resize-none"
          />
        </div>
      </div>

      {/* 4. Section Titles Copy */}
      <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-4">
        <h2 className="text-base font-bold text-zinc-100 font-sans border-b border-zinc-800 pb-3">
          Section Headings & Descriptions
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Projects Heading</label>
            <input
              type="text"
              value={content.projects_heading}
              onChange={(e) => handleChange('projects_heading', e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Experience Heading</label>
            <input
              type="text"
              value={content.exp_heading}
              onChange={(e) => handleChange('exp_heading', e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Skills Heading</label>
            <input
              type="text"
              value={content.skills_heading}
              onChange={(e) => handleChange('skills_heading', e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Contact Heading</label>
            <input
              type="text"
              value={content.contact_heading}
              onChange={(e) => handleChange('contact_heading', e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
            />
          </div>
        </div>
      </div>

      {/* 5. Footer Section Copy */}
      <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-4">
        <h2 className="text-base font-bold text-zinc-100 font-sans border-b border-zinc-800 pb-3">
          Footer Section Copy
        </h2>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-zinc-400 uppercase">Footer Short Developer Closing Sentence</label>
          <input
            type="text"
            value={content.footer_subtext}
            onChange={(e) => handleChange('footer_subtext', e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Footer Credit Text</label>
            <input
              type="text"
              value={content.footer_copy}
              onChange={(e) => handleChange('footer_copy', e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Copyright Text</label>
            <input
              type="text"
              value={content.footer_copyright}
              onChange={(e) => handleChange('footer_copyright', e.target.value)}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="sticky bottom-6 p-4 rounded-xl bg-zinc-900/90 border border-zinc-700 shadow-2xl backdrop-blur-md flex items-center justify-between">
        <span className="text-xs text-zinc-400">Save all text modifications to MongoDB Atlas</span>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all font-sans text-sm disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save All Copy Changes'}
        </button>
      </div>
    </form>
  );
}
