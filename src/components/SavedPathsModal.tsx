import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Briefcase } from 'lucide-react';
import { Career } from '../types/career';
import { CAREERS_DATA, getDegreeById, getStreamById } from '../data';

interface SavedPathsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedCareerIds: string[];
  onRemoveBookmark: (id: string) => void;
  onLoadSavedCareer: (career: Career) => void;
}

export const SavedPathsModal: React.FC<SavedPathsModalProps> = ({
  isOpen,
  onClose,
  savedCareerIds,
  onRemoveBookmark,
  onLoadSavedCareer,
}) => {
  if (!isOpen) return null;

  const savedCareers = CAREERS_DATA.filter((c) => savedCareerIds.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative flex flex-col w-full max-w-xl max-h-[85vh] rounded-2xl border border-neutral-700 bg-[#12151b] shadow-2xl text-neutral-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-[#161a22] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <Bookmark className="h-5 w-5 text-neutral-300" />
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Saved Career Roadmaps
              </h3>
              <p className="text-xs text-neutral-400">
                Quickly resume your saved decision trees and roadmaps
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-neutral-800 p-2 text-neutral-400 hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {savedCareers.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-500">
              <Bookmark className="h-8 w-8 mx-auto text-neutral-700 mb-2" />
              <span>No career pathways saved yet.</span>
              <p className="mt-1 text-neutral-600">
                Click "Save Pathway" on any Step 4 Roadmap to store it here.
              </p>
            </div>
          ) : (
            savedCareers.map((c) => {
              const primaryDegree = getDegreeById(c.primaryDegreeIds[0]);
              const primaryStream = getStreamById(c.streamIds[0]);

              return (
                <div
                  key={c.id}
                  className="rounded-xl border border-neutral-800 bg-[#161a22] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                      {c.category}
                    </span>
                    <h4 className="text-base font-bold text-white leading-snug">{c.title}</h4>
                    <p className="text-xs font-mono text-neutral-400 mt-1">
                      {primaryStream?.title} → {primaryDegree?.code || 'Degree'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => onRemoveBookmark(c.id)}
                      className="rounded-lg border border-neutral-800 p-2 text-neutral-400 hover:text-red-400 transition"
                      title="Remove from saved"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => {
                        onLoadSavedCareer(c);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-600 bg-neutral-100 px-3.5 py-1.5 text-xs font-bold text-neutral-950 transition hover:bg-white active:scale-95"
                    >
                      <span>View Roadmap</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-800 bg-[#0e1015] px-6 py-3 flex items-center justify-between text-xs text-neutral-500 font-mono">
          <span>{savedCareers.length} saved roadmap(s) stored locally</span>
          <button onClick={onClose} className="hover:text-neutral-300">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
