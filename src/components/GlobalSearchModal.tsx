import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, GraduationCap, Compass, Briefcase, BookOpen } from 'lucide-react';
import { globalSearch, SearchResultItem } from '../data';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (result: SearchResultItem) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setResults(globalSearch('B.Tech')); // initial sample results
    }
  }, [isOpen]);

  const handleSearchChange = (val: string) => {
    setQuery(val);
    if (!val.trim()) {
      setResults(globalSearch('Engineering'));
      return;
    }
    setResults(globalSearch(val));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl border border-neutral-700 bg-[#12151b] shadow-2xl text-neutral-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-neutral-800 bg-[#161a22] px-4 py-3">
          <Search className="h-5 w-5 text-neutral-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search degrees (MBBS, B.Tech), exams (JEE, NEET, CLAT), careers, streams..."
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => handleSearchChange('')}
              className="text-neutral-400 hover:text-white mr-2"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block rounded border border-neutral-700 bg-neutral-800 px-2 py-0.5 text-[10px] text-neutral-400 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-neutral-800/60">
          {results.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-500">
              No matching pathways found for "{query}". Try searching for B.Tech, MBBS, CA, Law, or
              Pilot.
            </div>
          ) : (
            results.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectResult(item);
                  onClose();
                }}
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-neutral-800/60 cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-400 group-hover:text-white group-hover:border-neutral-500 transition">
                    {item.type === 'Stream' && <Compass className="h-4 w-4" />}
                    {item.type === 'Track' && <BookOpen className="h-4 w-4" />}
                    {item.type === 'Degree' && <GraduationCap className="h-4 w-4" />}
                    {item.type === 'Career' && <Briefcase className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white group-hover:text-neutral-100">
                        {item.title}
                      </span>
                      <span className="rounded border border-neutral-800 bg-neutral-900 px-1.5 py-0.2 text-[9px] font-mono text-neutral-400 uppercase">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400">{item.subtitle}</p>
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-transform" />
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="border-t border-neutral-800 bg-[#0e1015] px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>Search verified Indian courses, streams & roadmaps</span>
          <button onClick={onClose} className="hover:text-neutral-300">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
