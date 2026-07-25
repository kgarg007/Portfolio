'use client';

import { useState } from 'react';
import { createSkillAction, updateSkillAction, deleteSkillAction } from '@/lib/actions';
import { ISkill } from '@/types';
import { Plus, Edit, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface SkillManagerProps {
  initialSkills: ISkill[];
}

export default function SkillManager({ initialSkills }: SkillManagerProps) {
  const [skills, setSkills] = useState<ISkill[]>(initialSkills);
  const [editingSkill, setEditingSkill] = useState<Partial<ISkill> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emptyForm: Partial<ISkill> = {
    name: '',
    category: 'Frontend',
    visible: true,
    displayOrder: 0,
  };

  const handleStartCreate = () => {
    setEditingSkill(emptyForm);
    setIsCreating(true);
    setError('');
  };

  const handleStartEdit = (skill: ISkill) => {
    setEditingSkill({ ...skill });
    setIsCreating(false);
    setError('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    setLoading(true);
    try {
      const res = await deleteSkillAction(id);
      if (res.success) {
        setSkills((prev) => prev.filter((s) => s._id !== id));
        setSuccess('Skill deleted.');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete skill');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isCreating) {
        const res = await createSkillAction(editingSkill);
        if (!res.success) throw new Error(res.error);
        setSkills((prev) => [...prev, res.skill]);
        setSuccess('Skill added!');
      } else if (editingSkill._id) {
        const res = await updateSkillAction(editingSkill._id, editingSkill);
        if (!res.success) throw new Error(res.error);
        setSkills((prev) => prev.map((s) => (s._id === editingSkill._id ? res.skill : s)));
        setSuccess('Skill updated!');
      }
      setEditingSkill(null);
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
        <span className="text-zinc-400">Total Skills: {skills.length}</span>
        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all text-xs"
        >
          <Plus className="w-4 h-4" /> Add Skill Tag
        </button>
      </div>

      {editingSkill && (
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-zinc-900 border border-zinc-700 flex flex-col gap-6 shadow-2xl">
          <h2 className="text-xl font-bold text-zinc-100 font-sans border-b border-zinc-800 pb-3">
            {isCreating ? 'Add New Skill Tag' : `Edit Skill: ${editingSkill.name}`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Skill Name *</label>
              <input
                type="text"
                required
                value={editingSkill.name || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Category *</label>
              <select
                value={editingSkill.category || 'Frontend'}
                onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              >
                <option value="Frontend">Frontend</option>
                <option value="Languages">Languages</option>
                <option value="Data Analysis">Data Analysis</option>
                <option value="Tools & Soft Skills">Tools & Soft Skills</option>
                <option value="Backend">Backend</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Proficiency Level</label>
              <select
                value={editingSkill.level || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, level: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              >
                <option value="">(None / General)</option>
                <option value="Core">Core</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Familiar">Familiar</option>
                <option value="Learning">Learning</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Display Order</label>
              <input
                type="number"
                value={editingSkill.displayOrder || 0}
                onChange={(e) => setEditingSkill({ ...editingSkill, displayOrder: parseInt(e.target.value) || 0 })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => setEditingSkill(null)}
              className="px-4 py-2.5 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all font-sans text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all font-sans text-xs disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Skill'}
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
              <th className="p-4">Skill Name</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs">
            {skills.map((s) => (
              <tr key={s._id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="p-4 font-mono text-zinc-400">{s.displayOrder}</td>
                <td className="p-4 font-sans font-bold text-zinc-200">{s.name}</td>
                <td className="p-4 font-mono text-indigo-400">{s.category}</td>
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
