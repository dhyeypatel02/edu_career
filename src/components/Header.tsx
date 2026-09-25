import React from 'react';
import { Search, Sparkles, Bookmark, GitCompare, RotateCcw, User } from 'lucide-react';
import { StudentSelectionState, UserProfile } from '../types/career';

interface HeaderProps {
  selectionState: StudentSelectionState;
  onReset: () => void;
  onOpenSearch: () => void;
  onOpenAICounsellor: () => void;
  onOpenCompare: () => void;
  onOpenBookmarks: () => void;
  savedCount: number;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectionState,
  onReset,
  onOpenSearch,
  onOpenAICounsellor,
  onOpenCompare,
  onOpenBookmarks,
  savedCount,
  user,
  onOpenAuth,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-[#0f1115]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="group flex items-baseline gap-2.5 text-left focus:outline-none"
            title="Return to Home"
          >
            <span className="text-xl font-extrabold tracking-tight text-white transition-colors group-hover:text-neutral-200">
              Disha<span className="text-emerald-400">.</span>
            </span>
            <span className="hidden md:inline-block text-xs text-neutral-400 border-l border-neutral-800 pl-2.5">
              Career & Education Pathways
            </span>
          </button>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 text-xs text-neutral-400 transition hover:border-neutral-700 hover:text-neutral-200"
          >
            <Search className="h-3.5 w-3.5 text-neutral-400" />
            <span className="hidden sm:inline">Search career, degree, exam...</span>
            <span className="sm:hidden">Search</span>
            <kbd className="hidden lg:inline rounded border border-neutral-700 bg-neutral-800 px-1 text-[10px] text-neutral-400">
              ⌘K
            </kbd>
          </button>

          {/* Compare Tool */}
          <button
            onClick={onOpenCompare}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 text-xs text-neutral-300 transition hover:border-neutral-700 hover:text-white"
            title="Compare pathways side by side"
          >
            <GitCompare className="h-3.5 w-3.5 text-neutral-400" />
            <span className="hidden md:inline">Compare</span>
          </button>

          {/* Bookmarks */}
          <button
            onClick={onOpenBookmarks}
            className="relative flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 text-xs text-neutral-300 transition hover:border-neutral-700 hover:text-white"
            title="Saved Career Pathways"
          >
            <Bookmark className="h-3.5 w-3.5 text-neutral-400" />
            <span className="hidden md:inline">Saved</span>
            {savedCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-200 px-1 text-[9px] font-bold text-neutral-900">
                {savedCount}
              </span>
            )}
          </button>

          {/* Reset / Start Over if in middle */}
          {selectionState.currentStep > 1 && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60 px-2.5 py-1.5 text-xs text-neutral-400 transition hover:border-neutral-700 hover:text-neutral-200"
              title="Reset path to start"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Reset</span>
            </button>
          )}

          {/* User Profile / Auth Button */}
          {user ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/90 pl-1.5 pr-2.5 py-1 text-xs text-white hover:border-neutral-500 transition group"
              title="View student profile & active pathway"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[85px] truncate font-medium">{user.name.split(' ')[0]}</span>
              {user.savedPathway && (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" title="Active pathway locked" />
              )}
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-900/80 px-2.5 py-1.5 text-xs font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white transition active:scale-95"
            >
              <User className="h-3.5 w-3.5 text-neutral-400" />
              <span>Sign In</span>
            </button>
          )}

          {/* AI Counsellor Button */}
          <button
            onClick={onOpenAICounsellor}
            className="group relative flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/90 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white shadow-sm transition active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400 transition-transform duration-300 group-hover:rotate-12" />
            <span>AI Counsellor</span>
            <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 text-[9px] font-mono text-emerald-400 font-medium">
              Coming Soon
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
