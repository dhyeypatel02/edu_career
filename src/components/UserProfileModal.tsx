import React from 'react';
import { X, User, Briefcase, GraduationCap, Compass, LogOut, ArrowRight, RefreshCw, Trash2, Calendar } from 'lucide-react';
import { UserProfile, SavedUserPathway } from '../types/career';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onLogout: () => void;
  onLoadPathway: (pathway: SavedUserPathway) => void;
  onChangePathway: () => void;
  onRemovePathway: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogout,
  onLoadPathway,
  onChangePathway,
  onRemovePathway,
}) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl border border-neutral-800 bg-[#12151b] p-6 sm:p-8 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* User Details Header */}
        <div className="flex items-center gap-4 mb-6 border-b border-neutral-800/80 pb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-800 text-xl font-bold text-white shadow-inner">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">{user.name}</h2>
              <span className="rounded border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                Active Student
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">{user.email}</p>
          </div>
        </div>

        {/* Saved Career Pathway Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Active Career Pathway
            </h3>
            {user.savedPathway && (
              <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Saved {new Date(user.savedPathway.savedAt).toLocaleDateString()}
              </span>
            )}
          </div>

          {user.savedPathway ? (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 tracking-wider uppercase block">
                    Target Career
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    {user.savedPathway.careerTitle}
                  </h4>
                </div>
                <span className="rounded-md border border-neutral-800 bg-neutral-800/80 px-2 py-0.5 text-[11px] font-mono text-neutral-300">
                  Step 4 Locked
                </span>
              </div>

              {/* Pathway Stages */}
              <div className="space-y-2 py-2 border-y border-neutral-800/80 my-3 text-xs">
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-500">10th Foundation:</span>
                  <span className="font-medium text-right">{user.savedPathway.streamTitle}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-500">11-12 Track:</span>
                  <span className="font-medium text-right">{user.savedPathway.trackTitle}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="text-neutral-500">Degree / Program:</span>
                  <span className="font-medium text-right text-emerald-300">
                    {user.savedPathway.degreeTitle}
                  </span>
                </div>
              </div>

              {/* Pathway Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    onLoadPathway(user.savedPathway!);
                    onClose();
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-neutral-900 hover:bg-neutral-200 transition"
                >
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>View Roadmap</span>
                </button>

                <button
                  onClick={() => {
                    onChangePathway();
                    onClose();
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 hover:text-white transition"
                  title="Choose a different pathway"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Change Path</span>
                </button>

                <button
                  onClick={onRemovePathway}
                  className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-2 text-neutral-400 hover:border-red-900/50 hover:text-red-400 transition"
                  title="Clear saved pathway"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-800 bg-neutral-900/30 p-6 text-center">
              <Compass className="h-8 w-8 text-neutral-600 mx-auto mb-2" />
              <p className="text-xs font-medium text-neutral-300">No Career Pathway Set Yet</p>
              <p className="text-[11px] text-neutral-500 mt-1 max-w-xs mx-auto">
                Explore pathways starting from Class 10 to lock your personalized education & career map.
              </p>
              <button
                onClick={() => {
                  onChangePathway();
                  onClose();
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-neutral-200 px-3.5 py-1.5 text-xs font-semibold text-neutral-900 hover:bg-white transition"
              >
                <span>Explore Pathways</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-neutral-800/80 pt-4">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-red-400 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>

          <span className="text-[11px] font-mono text-neutral-600">Saved in Local Storage</span>
        </div>
      </div>
    </div>
  );
};
