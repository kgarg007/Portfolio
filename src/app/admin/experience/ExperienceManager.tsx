'use client';

import { useState } from 'react';
import { createExperienceAction, updateExperienceAction, deleteExperienceAction, removeExperienceCertificateAction } from '@/lib/actions';
import { IExperience } from '@/types';
import { Plus, Edit, Trash2, CheckCircle, AlertCircle, Upload, X, FileText, ExternalLink } from 'lucide-react';

interface ExperienceManagerProps {
  initialExperiences: IExperience[];
}

export default function ExperienceManager({ initialExperiences }: ExperienceManagerProps) {
  const [experiences, setExperiences] = useState<IExperience[]>(initialExperiences);
  const [editingExp, setEditingExp] = useState<Partial<IExperience> | null>(null);
  const [certificateBase64, setCertificateBase64] = useState<string>('');
  const [certificateName, setCertificateName] = useState<string>('Certificate');
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emptyForm: Partial<IExperience> = {
    organization: '',
    role: '',
    location: 'Remote',
    startDate: 'Jan 2025',
    endDate: 'Apr 2025',
    isCurrent: false,
    description: ['Developed responsive user interfaces and production pages.'],
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    published: true,
    displayOrder: 0,
  };

  const handleStartCreate = () => {
    setEditingExp(emptyForm);
    setCertificateBase64('');
    setIsCreating(true);
    setError('');
  };

  const handleStartEdit = (exp: IExperience) => {
    setEditingExp({ ...exp });
    setCertificateBase64('');
    setIsCreating(false);
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF, JPG, PNG, or WEBP file.');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError('Certificate file must be smaller than 4MB.');
      return;
    }

    setCertificateName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setCertificateBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCertificate = async () => {
    if (certificateBase64) {
      setCertificateBase64('');
      return;
    }
    if (editingExp?._id && editingExp.certificate?.url) {
      setLoading(true);
      try {
        const res = await removeExperienceCertificateAction(editingExp._id);
        if (res.success) {
          setEditingExp((prev) => (prev ? { ...prev, certificate: { url: '', publicId: '', name: '' } } : null));
          setExperiences((prev) => prev.map((e) => (e._id === editingExp._id ? res.experience : e)));
          setSuccess('Certificate removed.');
          setTimeout(() => setSuccess(''), 3000);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to remove certificate');
      } finally {
        setLoading(false);
      }
    }
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

    const payload = { ...editingExp, certificateBase64, certificateName };

    try {
      if (isCreating) {
        const res = await createExperienceAction(payload);
        if (!res.success) throw new Error(res.error);
        setExperiences((prev) => [...prev, res.experience]);
        setSuccess('Experience entry added successfully!');
      } else if (editingExp._id) {
        const res = await updateExperienceAction(editingExp._id, payload);
        if (!res.success) throw new Error(res.error);
        setExperiences((prev) => prev.map((e) => (e._id === editingExp._id ? res.experience : e)));
        setSuccess('Experience entry updated successfully!');
      }
      setEditingExp(null);
      setCertificateBase64('');
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Start Month & Year *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Jan"
                  value={editingExp.startMonth || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, startMonth: e.target.value, startDate: `${e.target.value} ${editingExp.startYear || ''}`.trim() })}
                  className="w-1/2 px-3 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans text-xs"
                />
                <input
                  type="text"
                  placeholder="e.g. 2025"
                  value={editingExp.startYear || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, startYear: e.target.value, startDate: `${editingExp.startMonth || ''} ${e.target.value}`.trim() })}
                  className="w-1/2 px-3 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans text-xs"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">End Month & Year</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  disabled={editingExp.isCurrent}
                  placeholder="e.g. Apr"
                  value={editingExp.endMonth || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, endMonth: e.target.value, endDate: `${e.target.value} ${editingExp.endYear || ''}`.trim() })}
                  className="w-1/2 px-3 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans text-xs disabled:opacity-40"
                />
                <input
                  type="text"
                  disabled={editingExp.isCurrent}
                  placeholder="e.g. 2025"
                  value={editingExp.endYear || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, endYear: e.target.value, endDate: `${editingExp.endMonth || ''} ${e.target.value}`.trim() })}
                  className="w-1/2 px-3 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans text-xs disabled:opacity-40"
                />
              </div>
            </div>

            <div className="flex flex-col justify-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300 font-sans">
                <input
                  type="checkbox"
                  checked={editingExp.isCurrent || false}
                  onChange={(e) => setEditingExp({ ...editingExp, isCurrent: e.target.checked })}
                  className="w-4 h-4 rounded bg-zinc-950 border-zinc-800 text-indigo-600 focus:ring-0"
                />
                <span>Currently Working Here (Present)</span>
              </label>
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
              rows={3}
              value={editingExp.description?.join('\n') || ''}
              onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value.split('\n').filter(Boolean) })}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans text-xs resize-y"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Technologies / Skills (Comma-separated)</label>
            <input
              type="text"
              placeholder="HTML, CSS, JavaScript, React"
              value={editingExp.technologies?.join(', ') || ''}
              onChange={(e) => setEditingExp({ ...editingExp, technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono text-xs"
            />
          </div>

          {/* Certificate Upload Field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Experience Certificate (Optional PDF/JPG/PNG/WEBP)</label>
            {(certificateBase64 || editingExp.certificate?.url) ? (
              <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-950 border border-zinc-800">
                <FileText className="w-6 h-6 text-indigo-400 shrink-0" />
                <div className="flex flex-col gap-1 text-xs">
                  <span className="text-zinc-200 font-semibold">
                    {certificateBase64 ? certificateName : editingExp.certificate?.name || 'Certificate'}
                  </span>
                  {editingExp.certificate?.url && (
                    <a
                      href={editingExp.certificate.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      Preview Persisted Certificate <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleRemoveCertificate}
                  className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-rose-950 border border-rose-800 text-rose-300 hover:bg-rose-900 text-xs font-mono"
                >
                  <X className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-800 rounded-lg hover:border-zinc-700 bg-zinc-950 cursor-pointer text-zinc-400 transition-colors">
                <Upload className="w-6 h-6 mb-2 text-indigo-400" />
                <span className="text-xs font-sans font-medium text-zinc-300">Click to upload certificate</span>
                <span className="text-[11px] font-mono text-zinc-500 mt-1">Supports PDF, JPG, PNG, WEBP (Max 10MB)</span>
                <input
                  type="file"
                  accept="application/pdf, image/jpeg, image/png, image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
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
