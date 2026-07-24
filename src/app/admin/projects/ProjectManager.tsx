'use client';

import { useState } from 'react';
import { createProjectAction, updateProjectAction, deleteProjectAction } from '@/lib/actions';
import { IProject } from '@/types';
import { Plus, Edit, Trash2, CheckCircle, AlertCircle, Eye, EyeOff, Star, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface ProjectManagerProps {
  initialProjects: IProject[];
}

export default function ProjectManager({ initialProjects }: ProjectManagerProps) {
  const [projects, setProjects] = useState<IProject[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Partial<IProject> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emptyForm: Partial<IProject> = {
    name: '',
    slug: '',
    category: 'Web App',
    shortDescription: '',
    fullDescription: '# Case Study Overview\n\nDetailed breakdown of the problem, solution, and architecture.',
    problem: '',
    solution: '',
    role: 'Full Stack Developer',
    features: ['Responsive UI', 'REST API Integration'],
    techStack: ['React', 'Next.js', 'Tailwind CSS'],
    githubUrl: '',
    liveUrl: '',
    startDate: '2026',
    featured: false,
    published: true,
    displayOrder: 0,
  };

  const handleStartCreate = () => {
    setEditingProject(emptyForm);
    setIsCreating(true);
    setError('');
  };

  const handleStartEdit = (proj: IProject) => {
    setEditingProject({ ...proj });
    setIsCreating(false);
    setError('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    setLoading(true);
    try {
      const res = await deleteProjectAction(id);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
        setSuccess('Project deleted successfully.');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete project');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isCreating) {
        const res = await createProjectAction(editingProject);
        if (!res.success) throw new Error(res.error);
        setProjects((prev) => [...prev, res.project]);
        setSuccess('New project created successfully!');
      } else if (editingProject._id) {
        const res = await updateProjectAction(editingProject._id, editingProject);
        if (!res.success) throw new Error(res.error);
        setProjects((prev) => prev.map((p) => (p._id === editingProject._id ? res.project : p)));
        setSuccess('Project updated successfully!');
      }
      setEditingProject(null);
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

      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <span className="text-zinc-400">Total Projects: {projects.length}</span>
        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all text-xs"
        >
          <Plus className="w-4 h-4" /> Add New Project
        </button>
      </div>

      {/* Form Modal / Drawer */}
      {editingProject && (
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-zinc-900 border border-zinc-700 flex flex-col gap-6 shadow-2xl">
          <h2 className="text-xl font-bold text-zinc-100 font-sans border-b border-zinc-800 pb-3">
            {isCreating ? 'Create New Project' : `Edit Project: ${editingProject.name}`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Project Name *</label>
              <input
                type="text"
                required
                value={editingProject.name || ''}
                onChange={(e) => {
                  const name = e.target.value;
                  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  setEditingProject({ ...editingProject, name, slug: isCreating ? slug : editingProject.slug });
                }}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">URL Slug (Unique) *</label>
              <input
                type="text"
                required
                value={editingProject.slug || ''}
                onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Category</label>
              <input
                type="text"
                value={editingProject.category || 'Web App'}
                onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Display Order (Numeric)</label>
              <input
                type="number"
                value={editingProject.displayOrder || 0}
                onChange={(e) => setEditingProject({ ...editingProject, displayOrder: parseInt(e.target.value) || 0 })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Short Description (Summary) *</label>
            <textarea
              required
              rows={2}
              value={editingProject.shortDescription || ''}
              onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-zinc-400 uppercase">Full Case Study Description (Markdown) *</label>
            <textarea
              required
              rows={8}
              value={editingProject.fullDescription || ''}
              onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
              className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-mono text-xs resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">GitHub Repository URL</label>
              <input
                type="text"
                value={editingProject.githubUrl || ''}
                onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-zinc-400 uppercase">Live Demo URL</label>
              <input
                type="text"
                value={editingProject.liveUrl || ''}
                onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-6 pt-2 font-sans text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editingProject.published ?? true}
                onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                className="w-4 h-4 rounded bg-zinc-950 border-zinc-700 text-indigo-600 focus:ring-0"
              />
              <span>Published (Visible Publicly)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editingProject.featured ?? false}
                onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                className="w-4 h-4 rounded bg-zinc-950 border-zinc-700 text-indigo-600 focus:ring-0"
              />
              <span>Featured Project</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="px-4 py-2.5 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all font-sans text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all font-sans text-xs disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      )}

      {/* Projects Data Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900 text-xs text-zinc-400 uppercase font-mono">
              <th className="p-4">Order</th>
              <th className="p-4">Project Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs">
            {projects.map((proj) => (
              <tr key={proj._id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="p-4 font-mono text-zinc-400">{proj.displayOrder}</td>
                <td className="p-4 font-sans font-bold text-zinc-200">
                  <div className="flex items-center gap-2">
                    {proj.name}
                    {proj.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                  </div>
                </td>
                <td className="p-4 font-mono text-zinc-400">{proj.category}</td>
                <td className="p-4">
                  {proj.published ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-mono">
                      <Eye className="w-3.5 h-3.5" /> Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-zinc-500 font-mono">
                      <EyeOff className="w-3.5 h-3.5" /> Draft
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <Link
                      href={`/projects/${proj.slug}`}
                      target="_blank"
                      className="p-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                      title="View Case Study"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleStartEdit(proj)}
                      className="p-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(proj._id!)}
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
