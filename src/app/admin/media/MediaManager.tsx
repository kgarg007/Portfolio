'use client';

import { useState } from 'react';
import Image from 'next/image';
import { uploadMediaAction, deleteMediaAction } from '@/lib/actions';
import { IMedia } from '@/types';
import { Upload, Trash2, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';

interface MediaManagerProps {
  initialMediaItems: IMedia[];
}

export default function MediaManager({ initialMediaItems }: MediaManagerProps) {
  const [mediaItems, setMediaItems] = useState<IMedia[]>(initialMediaItems);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
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
        const res = await uploadMediaAction(base64, file.name);
        if (!res.success) throw new Error(res.media);

        setMediaItems((prev) => [res.media, ...prev]);
        setSuccess('Image uploaded to Cloudinary successfully!');
        setTimeout(() => setSuccess(''), 3500);
      } catch (err: any) {
        setError(err.message || 'Failed to upload media to Cloudinary');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media item from Cloudinary?')) return;
    try {
      const res = await deleteMediaAction(id);
      if (res.success) {
        setMediaItems((prev) => prev.filter((m) => m._id !== id));
        setSuccess('Media item deleted.');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete media item.');
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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

      {/* Upload Dropzone Bar */}
      <div className="p-8 rounded-2xl bg-zinc-900 border border-dashed border-zinc-700 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          <Upload className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-zinc-100 font-sans">
            Upload Image to Cloudinary
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Supports PNG, JPG, WEBP, SVG up to 10MB
          </p>
        </div>

        <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all text-xs font-sans">
          {uploading ? 'Uploading to Cloudinary...' : 'Select File'}
          <input type="file" accept="image/*" disabled={uploading} onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mediaItems.map((item) => (
          <div
            key={item._id || item.publicId}
            className="group rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 flex flex-col gap-3 hover:border-zinc-700 transition-all"
          >
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800">
              <Image
                src={item.url}
                alt={item.altText || 'Media Asset'}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-zinc-500 truncate max-w-[120px]">{item.publicId}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(item.url, item._id!)}
                  className="p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                  title="Copy URL"
                >
                  {copiedId === item._id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleDelete(item._id!)}
                  className="p-1 rounded bg-rose-950 border border-rose-800 text-rose-300 hover:bg-rose-900"
                  title="Delete Asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
