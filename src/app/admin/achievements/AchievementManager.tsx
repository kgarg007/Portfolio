'use client';

import { useState } from 'react';
import { createAchievementAction, updateAchievementAction, deleteAchievementAction } from '@/lib/actions';
import { IAchievement } from '@/types';
import { Plus, Edit, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface AchievementManagerProps {
  initialAchievements: IAchievement[];
}

export default function AchievementManager({ initialAchievements }: AchievementManagerProps) {
  const [achievements, setAchievements] = useState<IAchievement[]>(initialAchievements);
  const [editingAch, setEditingAch] = useState<Partial<IAchievement> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emptyForm: Partial<IAchievement> = {
    title: '',
    organization: '',
    event: '',
    position: '',
    date: '2026',
    description: '',
    featured: true,
    visible: true,
    displayOrder: 0,
  };

  const handleStartCreate = () => {
    setEditingAch(emptyForm);
    setIsCreating(true);
    setError('');
  };

  const handleStartEdit = (ach: IAchievement) => {
    setEditingAch({ ...ach });
    setIsCreating(false);
    setError('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this achievement?')) return;
    setLoading(true);
    try {
      const res = await deleteAchievementAction(id);
      if (res.success) {
        setAchievements((prev) => prev.filter((a) => a._id !== id));
        setSuccess('Achievement deleted.');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete achievement');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAch) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isCreating) {
        const res = await createAchievementAction(editingAch);
        if (!res.success) throw new Error(res.error);
        setAchievements((prev) => [...prev, res.achievement]);
        setSuccess('Achievement added!');
      } else if (editingAch._id) {
        const res = await updateAchievementAction(editingAch._id, editingAch);
        if (!res.success) throw new Error(res.error);
        setAchievements((prev) => prev.map((a) => (a._id === editingAch._id ? res.achievement : a)));
        setSuccess('Achievement updated!');
      }
      setEditingAch(null);
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
        <span className="text-zinc-400">Total Achievements: {achievements.length}</span>
        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all text-xs"
        >
          <Plus className="w-4 h-4" /> Add Achievement
        </button>
      </div>

      {editingAch && (
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-zinc-900 border border-zinc-700 flex flex-col gap-6 shadow-2xl">
          <h2 className="text-xl font-bold text-zinc-100 font-sans border-b border-zinc-800 pb-3">
            {isCreating ? 'Add Achievement' : `Edit: ${editingAch.title}`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Title / Rank *</label>
              <input
                type="text"
                required
                value={editingAch.title || ''}
                onChange={(e) => setEditingAch({ ...editingAch, title: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Organization / Institution *</label>
              <input
                type="text"
                required
                value={editingAch.organization || ''}
                onChange={(e) => setEditingAch({ ...editingAch, organization: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Event Name</label>
              <input
                type="text"
                value={editingAch.event || ''}
                onChange={(e) => setEditingAch({ ...editingAch, event: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Date / Year</label>
              <input
                type="text"
                value={editingAch.date || ''}
                onChange={(e) => setEditingAch({ ...editingAch, date: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Display Order</label>
              <input
                type="number"
                value={editingAch.displayOrder || 0}
                onChange={(e) => setEditingAch({ ...editingAch, displayOrder: parseInt(e.target.value) || 0 })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => setEditingAch(null)}
              className="px-4 py-2.5 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all font-sans text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all font-sans text-xs disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Achievement'}
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
              <th className="p-4">Title</th>
              <th className="p-4">Organization</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs">
            {achievements.map((ach) => (
              <tr key={ach._id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="p-4 font-mono text-zinc-400">{ach.displayOrder}</td>
                <td className="p-4 font-sans font-bold text-zinc-200">{ach.title}</td>
                <td className="p-4 font-mono text-indigo-400">{ach.organization}</td>
                <td className="p-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => handleStartEdit(ach)}
                      className="p-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(ach._id!)}
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
