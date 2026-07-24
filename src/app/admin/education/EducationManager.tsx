'use client';

import { useState } from 'react';
import { createEducationAction, updateEducationAction, deleteEducationAction } from '@/lib/actions';
import { IEducation } from '@/types';
import { Plus, Edit, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface EducationManagerProps {
  initialEducation: IEducation[];
}

export default function EducationManager({ initialEducation }: EducationManagerProps) {
  const [education, setEducation] = useState<IEducation[]>(initialEducation);
  const [editingEdu, setEditingEdu] = useState<Partial<IEducation> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emptyForm: Partial<IEducation> = {
    institution: 'Guru Gobind Singh Indraprastha University (GGSIPU)',
    degree: 'B.Tech — Computer Science & Engineering',
    field: 'Computer Science & Engineering',
    startYear: '2024',
    endYear: '2028',
    isCurrent: true,
    grade: 'CGPA: 9.4 / 10',
    description: 'Currently in 4th Semester at Maharaja Surajmal Institute of Technology (MSIT), New Delhi.',
    courses: ['Web Technologies', 'Object Oriented Programming', 'DSA in Java', 'C Programming', 'C++', 'DBMS'],
    displayOrder: 0,
    visible: true,
  };

  const handleStartCreate = () => {
    setEditingEdu(emptyForm);
    setIsCreating(true);
    setError('');
  };

  const handleStartEdit = (edu: IEducation) => {
    setEditingEdu({ ...edu });
    setIsCreating(false);
    setError('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this education entry?')) return;
    setLoading(true);
    try {
      const res = await deleteEducationAction(id);
      if (res.success) {
        setEducation((prev) => prev.filter((e) => e._id !== id));
        setSuccess('Education deleted.');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete education');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isCreating) {
        const res = await createEducationAction(editingEdu);
        if (!res.success) throw new Error(res.error);
        setEducation((prev) => [...prev, res.education]);
        setSuccess('Education added!');
      } else if (editingEdu._id) {
        const res = await updateEducationAction(editingEdu._id, editingEdu);
        if (!res.success) throw new Error(res.error);
        setEducation((prev) => prev.map((e) => (e._id === editingEdu._id ? res.education : e)));
        setSuccess('Education updated!');
      }
      setEditingEdu(null);
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
        <span className="text-zinc-400">Total Education Entries: {education.length}</span>
        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all text-xs"
        >
          <Plus className="w-4 h-4" /> Add Education Entry
        </button>
      </div>

      {editingEdu && (
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-zinc-900 border border-zinc-700 flex flex-col gap-6 shadow-2xl">
          <h2 className="text-xl font-bold text-zinc-100 font-sans border-b border-zinc-800 pb-3">
            {isCreating ? 'Add Education Entry' : `Edit: ${editingEdu.degree}`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Institution / University *</label>
              <input
                type="text"
                required
                value={editingEdu.institution || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Degree Title *</label>
              <input
                type="text"
                required
                value={editingEdu.degree || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Start Year *</label>
              <input
                type="text"
                required
                value={editingEdu.startYear || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, startYear: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">End Year</label>
              <input
                type="text"
                value={editingEdu.endYear || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, endYear: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">CGPA / Grade</label>
              <input
                type="text"
                placeholder="e.g. CGPA: 9.4 / 10"
                value={editingEdu.grade || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, grade: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Relevant Coursework (Comma separated)</label>
            <input
              type="text"
              value={editingEdu.courses?.join(', ') || ''}
              onChange={(e) => setEditingEdu({ ...editingEdu, courses: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => setEditingEdu(null)}
              className="px-4 py-2.5 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all font-sans text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all font-sans text-xs disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Education'}
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900 text-xs text-zinc-400 uppercase font-mono">
              <th className="p-4">Institution</th>
              <th className="p-4">Degree</th>
              <th className="p-4">Grade</th>
              <th className="p-4 font-right text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs">
            {education.map((edu) => (
              <tr key={edu._id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="p-4 font-sans font-bold text-zinc-200">{edu.institution}</td>
                <td className="p-4 font-mono text-indigo-400">{edu.degree}</td>
                <td className="p-4 font-mono text-emerald-400">{edu.grade}</td>
                <td className="p-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => handleStartEdit(edu)}
                      className="p-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(edu._id!)}
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
