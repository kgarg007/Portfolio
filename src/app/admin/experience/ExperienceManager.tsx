'use client';

import { useState } from 'react';
import { createExperienceAction, updateExperienceAction, deleteExperienceAction } from '@/lib/actions';
import { IExperience } from '@/types';
import { Plus, Edit, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface ExperienceManagerProps {
  initialExperiences: IExperience[];
}

export default function ExperienceManager({ initialExperiences }: ExperienceManagerProps) {
  const [experiences, setExperiences] = useState<IExperience[]>(initialExperiences);
  const [editingExp, setEditingExp] = useState<Partial<IExperience> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emptyForm: Partial<IExperience> = {
    organization: '',
    role: '',
    location: 'New Delhi',
    startDate: '2026',
    endDate: 'Present',
    isCurrent: true,
    description: ['Developed responsive user interfaces and backend integrations.'],
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
    published: true,
    displayOrder: 0,
  };

  const handleStartCreate = () => {
    setEditingExp(emptyForm);
    setIsCreating(true);
    setError('');
  };

  const handleStartEdit = (exp: IExperience) => {
    setEditingExp({ ...exp });
    setIsCreating(false);
    setError('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience entry?')) return;
    setLoading(true);
    try {
      const res = await deleteExperienceAction(id);
      if (res.success) {
        setExperiences((prev) => prev.filter((e) => e._id !== id));
        setSuccess('Experience entry deleted.');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete experience');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isCreating) {
        const res = await createExperienceAction(editingExp);
        if (!res.success) throw new Error(res.error);
        setExperiences((prev) => [...prev, res.experience]);
        setSuccess('Experience entry added successfully!');
      } else if (editingExp._id) {
        const res = await updateExperienceAction(editingExp._id, editingExp);
        if (!res.success) throw new Error(res.error);
        setExperiences((prev) => prev.map((e) => (e._id === editingExp._id ? res.experience : e)));
        setSuccess('Experience entry updated successfully!');
      }
      setEditingExp(null);
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
        <span className="text-zinc-400">Total Entries: {experiences.length}</span>
        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all text-xs"
        >
          <Plus className="w-4 h-4" /> Add Experience Entry
        </button>
      </div>

      {editingExp && (
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-zinc-900 border border-zinc-700 flex flex-col gap-6 shadow-2xl">
          <h2 className="text-xl font-bold text-zinc-100 font-sans border-b border-zinc-800 pb-3">
            {isCreating ? 'Add Experience Entry' : `Edit: ${editingExp.role} at ${editingExp.organization}`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Organization / Company *</label>
              <input
                type="text"
                required
                value={editingExp.organization || ''}
                onChange={(e) => setEditingExp({ ...editingExp, organization: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Role / Title *</label>
              <input
                type="text"
                required
                value={editingExp.role || ''}
                onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Start Date *</label>
              <input
                type="text"
                required
                placeholder="e.g. July 2025"
                value={editingExp.startDate || ''}
                onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">End Date</label>
              <input
                type="text"
                placeholder="e.g. Present"
                value={editingExp.endDate || ''}
                onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Display Order</label>
              <input
                type="number"
                value={editingExp.displayOrder || 0}
                onChange={(e) => setEditingExp({ ...editingExp, displayOrder: parseInt(e.target.value) || 0 })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Description Bullet Points (One per line) *</label>
            <textarea
              required
              rows={4}
              value={editingExp.description?.join('\n') || ''}
              onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value.split('\n').filter(Boolean) })}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans text-xs resize-y"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => setEditingExp(null)}
              className="px-4 py-2.5 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all font-sans text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all font-sans text-xs disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Experience'}
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
              <th className="p-4">Organization</th>
              <th className="p-4">Role</th>
              <th className="p-4">Dates</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs">
            {experiences.map((exp) => (
              <tr key={exp._id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="p-4 font-mono text-zinc-400">{exp.displayOrder}</td>
                <td className="p-4 font-sans font-bold text-zinc-200">{exp.organization}</td>
                <td className="p-4 font-mono text-indigo-400">{exp.role}</td>
                <td className="p-4 font-mono text-zinc-400">
                  {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                </td>
                <td className="p-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => handleStartEdit(exp)}
                      className="p-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp._id!)}
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
