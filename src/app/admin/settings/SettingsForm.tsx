'use client';

import { useState } from 'react';
import { updateSiteSettingsAction } from '@/lib/actions';
import { ISiteSettings } from '@/types';
import { Save, CheckCircle, AlertCircle, Eye, Sliders } from 'lucide-react';

interface SettingsFormProps {
  initialSettings: ISiteSettings;
}

export default function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [settings, setSettings] = useState<ISiteSettings>({
    sectionVisibility: initialSettings.sectionVisibility || {
      hero: true,
      about: true,
      projects: true,
      experience: true,
      skills: true,
      achievements: true,
      hackathons: true,
      education: true,
      contact: true,
      whatsapp: true,
    },
    whatsappNumber: initialSettings.whatsappNumber || '+917982874404',
    whatsappMessage: initialSettings.whatsappMessage || 'Hi Krishna, I visited your portfolio!',
    seo: initialSettings.seo || {
      siteTitle: 'Krishna Garg — Full Stack Developer & Data Analyst',
      metaDescription: 'Personal portfolio and software engineering showcase of Krishna Garg, B.Tech CSE student at GGSIPU (MSIT).',
      keywords: ['Krishna Garg', 'Full Stack Developer', 'React', 'Next.js', 'Data Analyst'],
    },
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = (key: keyof typeof settings.sectionVisibility) => {
    setSettings((prev) => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [key]: !prev.sectionVisibility[key],
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError('');

    try {
      const res = await updateSiteSettingsAction(settings);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3500);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 font-mono text-sm">
      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Section visibility & site settings updated in MongoDB Atlas!</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Section Visibility Toggles */}
      <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-6">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Eye className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-bold text-zinc-100 font-sans">
            Public Section Visibility Controls
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-sans text-sm">
          {Object.entries(settings.sectionVisibility).map(([sectionKey, isVisible]) => (
            <div
              key={sectionKey}
              onClick={() => handleToggle(sectionKey as any)}
              className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                isVisible
                  ? 'bg-zinc-900 border-indigo-500/40 text-zinc-100'
                  : 'bg-zinc-950/60 border-zinc-800 text-zinc-500'
              }`}
            >
              <span className="capitalize font-semibold">{sectionKey} Section</span>
              <span
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold uppercase ${
                  isVisible ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                {isVisible ? 'Visible' : 'Hidden'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. WhatsApp Settings */}
      <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-6">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Sliders className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-zinc-100 font-sans">
            WhatsApp Direct Action Configuration
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">WhatsApp Mobile Number</label>
            <input
              type="text"
              value={settings.whatsappNumber || ''}
              onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Pre-filled Message</label>
            <input
              type="text"
              value={settings.whatsappMessage || ''}
              onChange={(e) => setSettings({ ...settings, whatsappMessage: e.target.value })}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
            />
          </div>
        </div>
      </div>

      {/* 2b. Currently Building Settings */}
      <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-6">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
          <Sliders className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-bold text-zinc-100 font-sans">
            Currently Building Status (Hero Pill)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Currently Building Title / Project Name</label>
            <input
              type="text"
              placeholder="e.g. Swasti Foundation MVP"
              value={settings.currentlyBuilding || ''}
              onChange={(e) => setSettings({ ...settings, currentlyBuilding: e.target.value })}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Project Link URL (Optional)</label>
            <input
              type="url"
              placeholder="https://..."
              value={settings.currentlyBuildingUrl || ''}
              onChange={(e) => setSettings({ ...settings, currentlyBuildingUrl: e.target.value })}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
            />
          </div>
        </div>
      </div>

      {/* 3. SEO Settings */}
      <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-6">
        <h2 className="text-base font-bold text-zinc-100 font-sans border-b border-zinc-800 pb-3">
          SEO & Meta Information
        </h2>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-zinc-400 uppercase">Default Site Page Title</label>
          <input
            type="text"
            value={settings.seo?.siteTitle || ''}
            onChange={(e) =>
              setSettings({ ...settings, seo: { ...settings.seo!, siteTitle: e.target.value } })
            }
            className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs text-zinc-400 uppercase">Meta Description</label>
          <textarea
            rows={3}
            value={settings.seo?.metaDescription || ''}
            onChange={(e) =>
              setSettings({ ...settings, seo: { ...settings.seo!, metaDescription: e.target.value } })
            }
            className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans resize-none"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="sticky bottom-6 p-4 rounded-xl bg-zinc-900/90 border border-zinc-700 shadow-2xl backdrop-blur-md flex items-center justify-between">
        <span className="text-xs text-zinc-400">Apply settings to MongoDB Atlas</span>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all font-sans text-sm disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  );
}
