'use client';

import { useState } from 'react';
import { markMessageReadAction, deleteMessageAction } from '@/lib/actions';
import { IContactMessage } from '@/types';
import { Trash2, MailCheck, Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface MessagesManagerProps {
  initialMessages: IContactMessage[];
}

export default function MessagesManager({ initialMessages }: MessagesManagerProps) {
  const [messages, setMessages] = useState<IContactMessage[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    setLoading(true);
    try {
      const res = await markMessageReadAction(id, !currentRead);
      if (res.success) {
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, read: !currentRead } : m))
        );
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update message status.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    setLoading(true);
    try {
      const res = await deleteMessageAction(id);
      if (res.success) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        setSuccess('Message deleted.');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete message.');
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
        <span className="text-zinc-400">Total Inquiries: {messages.length}</span>
      </div>

      {messages.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-zinc-900/60 border border-zinc-800 text-zinc-500">
          No contact inquiries in inbox.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-6 rounded-xl border transition-all ${
                msg.read
                  ? 'bg-zinc-900/40 border-zinc-800'
                  : 'bg-zinc-900 border-indigo-500/40 shadow-lg'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-zinc-100 font-sans">{msg.name}</h3>
                  <a href={`mailto:${msg.email}`} className="text-indigo-400 text-xs hover:underline">
                    {msg.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ''}
                  </span>
                  <button
                    onClick={() => handleToggleRead(msg._id!, msg.read)}
                    className="p-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                    title={msg.read ? 'Mark as Unread' : 'Mark as Read'}
                  >
                    {msg.read ? <Mail className="w-4 h-4" /> : <MailCheck className="w-4 h-4 text-emerald-400" />}
                  </button>
                  <button
                    onClick={() => handleDelete(msg._id!)}
                    className="p-1.5 rounded bg-rose-950 border border-rose-800 text-rose-300 hover:bg-rose-900"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {msg.subject && (
                <div className="text-xs text-zinc-400 font-bold mb-2">Subject: {msg.subject}</div>
              )}

              <p className="text-zinc-300 font-sans text-sm leading-relaxed bg-zinc-950 p-4 rounded-lg border border-zinc-800/80">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
