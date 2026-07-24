'use client';

import { useState } from 'react';
import { createCertificationAction, updateCertificationAction, deleteCertificationAction } from '@/lib/actions';
import { ICertification } from '@/types';
import { Plus, Edit, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface CertificationManagerProps {
  initialCertifications: ICertification[];
}

export default function CertificationManager({ initialCertifications }: CertificationManagerProps) {
  const [certs, setCerts] = useState<ICertification[]>(initialCertifications);
  const [editingCert, setEditingCert] = useState<Partial<ICertification> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emptyForm: Partial<ICertification> = {
    name: '',
    issuer: '',
    issueDate: '2026',
    credentialId: '',
    credentialUrl: '',
    visible: true,
    displayOrder: 0,
  };

  const handleStartCreate = () => {
    setEditingCert(emptyForm);
    setIsCreating(true);
    setError('');
  };

  const handleStartEdit = (cert: ICertification) => {
    setEditingCert({ ...cert });
    setIsCreating(false);
    setError('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this certification?')) return;
    setLoading(true);
    try {
      const res = await deleteCertificationAction(id);
      if (res.success) {
        setCerts((prev) => prev.filter((c) => c._id !== id));
        setSuccess('Certification deleted.');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete certification');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isCreating) {
        const res = await createCertificationAction(editingCert);
        if (!res.success) throw new Error(res.error);
        setCerts((prev) => [...prev, res.certification]);
        setSuccess('Certification added!');
      } else if (editingCert._id) {
        const res = await updateCertificationAction(editingCert._id, editingCert);
        if (!res.success) throw new Error(res.error);
        setCerts((prev) => prev.map((c) => (c._id === editingCert._id ? res.certification : c)));
        setSuccess('Certification updated!');
      }
      setEditingCert(null);
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
        <span className="text-zinc-400">Total Certifications: {certs.length}</span>
        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all text-xs"
        >
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </div>

      {editingCert && (
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-zinc-900 border border-zinc-700 flex flex-col gap-6 shadow-2xl">
          <h2 className="text-xl font-bold text-zinc-100 font-sans border-b border-zinc-800 pb-3">
            {isCreating ? 'Add Certification' : `Edit: ${editingCert.name}`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Certification Name *</label>
              <input
                type="text"
                required
                value={editingCert.name || ''}
                onChange={(e) => setEditingCert({ ...editingCert, name: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Issuer / Organization *</label>
              <input
                type="text"
                required
                value={editingCert.issuer || ''}
                onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Issue Date</label>
              <input
                type="text"
                value={editingCert.issueDate || ''}
                onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Credential URL</label>
              <input
                type="text"
                value={editingCert.credentialUrl || ''}
                onChange={(e) => setEditingCert({ ...editingCert, credentialUrl: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Display Order</label>
              <input
                type="number"
                value={editingCert.displayOrder || 0}
                onChange={(e) => setEditingCert({ ...editingCert, displayOrder: parseInt(e.target.value) || 0 })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => setEditingCert(null)}
              className="px-4 py-2.5 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all font-sans text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all font-sans text-xs disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Certification'}
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
              <th className="p-4">Name</th>
              <th className="p-4">Issuer</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs">
            {certs.map((c) => (
              <tr key={c._id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="p-4 font-mono text-zinc-400">{c.displayOrder}</td>
                <td className="p-4 font-sans font-bold text-zinc-200">{c.name}</td>
                <td className="p-4 font-mono text-indigo-400">{c.issuer}</td>
                <td className="p-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => handleStartEdit(c)}
                      className="p-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(c._id!)}
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
