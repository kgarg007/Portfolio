'use client';

import { useState } from 'react';
import { uploadResumeAction, removeResumeAction } from '@/lib/actions';
import { IResume } from '@/types';
import { Upload, FileText, Trash2, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface ResumeManagerProps {
  currentResume?: IResume;
}

export default function ResumeManager({ currentResume }: ResumeManagerProps) {
  const [resume, setResume] = useState<IResume | undefined>(currentResume);
  const [label, setLabel] = useState(currentResume?.label || 'Download Resume');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setSuccess('');

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = reader.result as string;
        const res = await uploadResumeAction(base64, label);
        if (!res.success) throw new Error('Failed to upload resume PDF to Cloudinary.');

        setResume(res.resume);
        setSuccess('Resume PDF successfully uploaded to Cloudinary!');
        setTimeout(() => setSuccess(''), 3500);
      } catch (err: any) {
        setError(err.message || 'Failed to upload resume to Cloudinary.');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = async () => {
    if (!confirm('Are you sure you want to remove the current resume PDF?')) return;
    setUploading(true);
    try {
      const res = await removeResumeAction();
      if (res.success) {
        setResume(undefined);
        setSuccess('Resume PDF removed.');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to remove resume.');
    } finally {
      setUploading(false);
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

      {/* Current Resume Card */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col gap-4">
        <h2 className="text-base font-bold text-zinc-100 font-sans border-b border-zinc-800 pb-3">
          Current Public Resume
        </h2>

        {resume?.fileUrl ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-indigo-400 shrink-0" />
              <div>
                <span className="font-bold text-zinc-200 block font-sans">{resume.label}</span>
                <span className="text-xs text-zinc-500 block">
                  Last Updated: {resume.updatedAt ? new Date(resume.updatedAt).toLocaleDateString() : 'Recently'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/api/resume/download"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 hover:bg-zinc-800 text-xs font-semibold"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View Current PDF
              </a>
              <button
                onClick={handleRemove}
                className="p-2 rounded-lg bg-rose-950 border border-rose-800 text-rose-300 hover:bg-rose-900"
                title="Remove Resume"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-zinc-500 py-2">No active resume PDF uploaded.</p>
        )}
      </div>

      {/* Upload/Replace Box */}
      <div className="p-8 rounded-2xl bg-zinc-900/60 border border-dashed border-zinc-700 flex flex-col items-center justify-center gap-5 text-center">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          <Upload className="w-6 h-6" />
        </div>

        <div className="flex flex-col gap-2 w-full max-w-md">
          <label className="text-xs text-zinc-400 uppercase text-left">Public Button CTA Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Download Resume"
            className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans text-xs"
          />
        </div>

        <label className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all text-xs font-sans">
          {uploading ? 'Uploading PDF...' : 'Select & Upload New Resume PDF'}
          <input type="file" accept="application/pdf,image/*" disabled={uploading} onChange={handleFileUpload} className="hidden" />
        </label>
      </div>
    </div>
  );
}
