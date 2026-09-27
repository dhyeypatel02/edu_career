import React, { useState } from 'react';
import { X, Zap, ChevronRight, Search, Sparkles } from 'lucide-react';
import { Career } from '../types/career';
import { CAREERS_DATA } from '../data';
import { CareerExecutionHub } from './CareerExecutionHub';

interface PlacementHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskAI?: (prompt: string) => void;
  initialCareer?: Career | null;
}

export const PlacementHubModal: React.FC<PlacementHubModalProps> = ({
  isOpen,
  onClose,
  onAskAI,
  initialCareer,
}) => {
  const [selectedCareer, setSelectedCareer] = useState<Career>(
    initialCareer || CAREERS_DATA[0]
  );
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredCareers = CAREERS_DATA.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.keySkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative flex flex-col w-full max-w-6xl max-h-[92vh] rounded-2xl border border-neutral-800 bg-[#0f1116] shadow-2xl text-neutral-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-[#12151d] px-6 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-emerald-400">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Placement & Career Execution Hub
                </h2>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-semibold">
                  College to Placement
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Skills • Projects • Certifications • Internships • ATS Resumes • Mock Interviews • Placements
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-neutral-800 p-2 text-neutral-400 hover:border-neutral-700 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Career Switcher Ribbon */}
        <div className="border-b border-neutral-800 bg-[#141720] px-6 py-3 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider shrink-0 mr-1 font-semibold">
              Select Career:
            </span>
            {CAREERS_DATA.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCareer(c)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold shrink-0 transition-all ${
                  selectedCareer.id === c.id
                    ? 'bg-emerald-400 text-neutral-950 shadow-sm font-bold scale-105'
                    : 'border border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:border-neutral-700 hover:text-white'
                }`}
              >
                {c.title.split('&')[0].trim()}
              </button>
            ))}
          </div>

          <div className="relative min-w-[200px] shrink-0">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-950/70 pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin">
          <CareerExecutionHub career={selectedCareer} onAskAI={onAskAI} />
        </div>
      </div>
    </div>
  );
};
