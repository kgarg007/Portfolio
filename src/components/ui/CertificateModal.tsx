'use client';

import { useEffect, useRef } from 'react';
import { X, ExternalLink, FileText } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  certificateUrl: string;
}

export default function CertificateModal({ isOpen, onClose, title, certificateUrl }: CertificateModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !certificateUrl) return null;

  const isPdf = certificateUrl.toLowerCase().endsWith('.pdf') || certificateUrl.includes('/raw/upload/');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/50">
          <div className="flex items-center gap-2 font-mono text-sm font-semibold text-zinc-200">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span id="certificate-modal-title" className="truncate max-w-md">{title}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 font-mono text-xs transition-colors"
            >
              Open Certificate <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close certificate modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-auto flex items-center justify-center bg-zinc-950/30">
          {isPdf ? (
            <div className="w-full flex flex-col items-center gap-4 py-8">
              <iframe
                src={`${certificateUrl}#toolbar=0`}
                className="w-full h-[60vh] rounded-lg border border-zinc-800 bg-zinc-950"
                title={title}
              />
            </div>
          ) : (
            <div className="relative max-w-full max-h-[70vh] flex items-center justify-center">
              <img
                src={certificateUrl}
                alt={title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg border border-zinc-800/80 shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
