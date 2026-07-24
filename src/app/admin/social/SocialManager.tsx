'use client';

import { useState } from 'react';
import { createSocialLinkAction, updateSocialLinkAction, deleteSocialLinkAction } from '@/lib/actions';
import { ISocialLink } from '@/types';
import { Plus, Edit, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface SocialManagerProps {
  initialSocialLinks: ISocialLink[];
}

export default function SocialManager({ initialSocialLinks }: SocialManagerProps) {
  const [socials, setSocials] = useState<ISocialLink[]>(initialSocialLinks);
  const [editingSocial, setEditingSocial] = useState<Partial<ISocialLink> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emptyForm: Partial<ISocialLink> = {
    platform: 'GitHub',
    label: 'kgarg007',
    url: 'https://github.com/kgarg007',
    visible: true,
    displayOrder: 0,
  };

  const handleStartCreate = () => {
    setEditingSocial(emptyForm);
    setIsCreating(true);
    setError('');
  };

  const handleStartEdit = (soc: ISocialLink) => {
    setEditingSocial({ ...soc });
    setIsCreating(false);
    setError('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete social link?')) return;
    setLoading(true);
    try {
      const res = await deleteSocialLinkAction(id);
      if (res.success) {
        setSocials((prev) => prev.filter((s) => s._id !== id));
        setSuccess('Social link deleted.');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete social link');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSocial) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isCreating) {
        const res = await createSocialLinkAction(editingSocial);
        if (!res.success) throw new Error(res.error);
        setSocials((prev) => [...prev, res.social]);
        setSuccess('Social link added!');
      } else if (editingSocial._id) {
        const res = await updateSocialLinkAction(editingSocial._id, editingSocial);
        if (!res.success) throw new Error(res.error);
        setSocials((prev) => prev.map((s) => (s._id === editingSocial._id ? res.social : s)));
        setSuccess('Social link updated!');
      }
      setEditingSocial(null);
      setTimeout(() => setSuccess(''), 3500);
    } catch (err: any) {
      setError(err.message || 'Operation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 font-mono text-sm">
      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-zinc-400">Total Social Links: {socials.length}</span>
        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all text-xs"
        >
          <Plus className="w-4 h-4" /> Add Social Link
        </button>
      </div>

      {editingSocial && (
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-zinc-900 border border-zinc-700 flex flex-col gap-6 shadow-2xl">
          <h2 className="text-xl font-bold text-zinc-100 font-sans border-b border-zinc-800 pb-3">
            {isCreating ? 'Add Social Link' : `Edit: ${editingSocial.platform}`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Platform Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. GitHub, LinkedIn"
                value={editingSocial.platform || ''}
                onChange={(e) => setEditingSocial({ ...editingSocial, platform: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Label / Handle *</label>
              <input
                type="text"
                required
                placeholder="e.g. kgarg007"
                value={editingSocial.label || ''}
                onChange={(e) => setEditingSocial({ ...editingSocial, label: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Destination URL *</label>
              <input
                type="text"
                required
                placeholder="https://..."
                value={editingSocial.url || ''}
                onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Display Order</label>
              <input
                type="number"
                value={editingSocial.displayOrder || 0}
                onChange={(e) => setEditingSocial({ ...editingSocial, displayOrder: parseInt(e.target.value) || 0 })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => setEditingSocial(null)}
              className="px-4 py-2.5 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all font-sans text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all font-sans text-xs disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Social Link'}
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900 text-xs text-zinc-400 uppercase font-mono">
              <th className="p-4">Order</th>
              <th className="p-4">Platform</th>
              <th className="p-4">Label</th>
              <th className="p-4">URL</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs">
            {socials.map((s) => (
              <tr key={s._id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="p-4 font-mono text-zinc-400">{s.displayOrder}</td>
                <td className="p-4 font-sans font-bold text-zinc-200">{s.platform}</td>
                <td className="p-4 font-mono text-indigo-400">{s.label}</td>
                <td className="p-4 font-mono text-zinc-400 truncate max-w-xs">{s.url}</td>
                <td className="p-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => handleStartEdit(s)}
                      className="p-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(s._id!)}
                      className="p-1.5 rounded bg-rose-950 border border-rose-800 text-rose-300 hover:bg-rose-900"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
