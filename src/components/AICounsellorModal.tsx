import React from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  Compass,
  GraduationCap,
  Scale,
  Clock,
} from 'lucide-react';
import { StudentSelectionState } from '../types/career';

interface AICounsellorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectionState: StudentSelectionState;
  initialQuestion?: string;
}

export const AICounsellorModal: React.FC<AICounsellorModalProps> = ({
  isOpen,
  onClose,
  selectionState,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full max-w-2xl rounded-2xl border border-neutral-800 bg-[#11141a] shadow-2xl text-neutral-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-[#14171e] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-950/30 text-emerald-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Edu Career AI Counsellor
                </h3>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-semibold">
                  Coming Soon
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Interactive Indian Career & Education Advisor
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-neutral-800 p-2 text-neutral-400 hover:border-neutral-700 hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Current Active Selection Context Strip */}
        <div className="bg-[#0e1015] border-b border-neutral-800/80 px-6 py-2.5 flex items-center gap-2 overflow-x-auto text-xs font-mono scrollbar-none">
          <span className="text-neutral-500 uppercase flex-shrink-0">YOUR PATH:</span>
          {selectionState.selectedStream ? (
            <span className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-neutral-300 flex-shrink-0">
              {selectionState.selectedStream.title}
            </span>
          ) : (
            <span className="text-neutral-500 flex-shrink-0">Class 10 Stage</span>
          )}

          {selectionState.selectedTrack && (
            <>
              <span className="text-neutral-600">→</span>
              <span className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-neutral-300 flex-shrink-0">
                {selectionState.selectedTrack.title}
              </span>
            </>
          )}

          {selectionState.selectedDegree && (
            <>
              <span className="text-neutral-600">→</span>
              <span className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-emerald-300 flex-shrink-0">
                {selectionState.selectedDegree.code}
              </span>
            </>
          )}

          {selectionState.selectedCareer && (
            <>
              <span className="text-neutral-600">→</span>
              <span className="rounded bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 text-emerald-300 flex-shrink-0 font-bold">
                {selectionState.selectedCareer.title}
              </span>
            </>
          )}
        </div>

        {/* Main Coming Soon Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="rounded-xl border border-neutral-800 bg-[#161a22] p-5 sm:p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3">
              <Clock className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-white tracking-tight">
              AI Counsellor is Under Active Development
            </h4>
            <p className="text-xs text-neutral-400 mt-2 max-w-md mx-auto leading-relaxed">
              We are currently fine-tuning our specialized AI Counsellor grounded in official Indian education guidelines (NEP 2020, NTA, NMC, UGC, and AICTE). It will be added in an upcoming release.
            </p>
          </div>

          {/* Planned Features */}
          <div>
            <h5 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
              Features In Progress:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3.5">
                <BrainCircuit className="h-4 w-4 text-emerald-400 mb-2" />
                <h6 className="text-xs font-semibold text-white">Eligibility Matching</h6>
                <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                  Automated checks against official criteria for NEET, JEE, CUET, CLAT, and CA.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3.5">
                <Scale className="h-4 w-4 text-blue-400 mb-2" />
                <h6 className="text-xs font-semibold text-white">Bridge & Lateral Paths</h6>
                <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                  NIOS additional subjects, polytechnic lateral entry, and realistic backup plans.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3.5">
                <GraduationCap className="h-4 w-4 text-amber-400 mb-2" />
                <h6 className="text-xs font-semibold text-white">Interactive Q&A</h6>
                <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                  Conversational guidance on college ROI, placements, syllabus, and study timelines.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-4 flex items-center justify-between gap-4">
            <div className="text-xs text-neutral-400">
              <span className="text-neutral-300 font-medium">All career trees & roadmaps</span> are fully active and available offline without any API keys.
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-bold text-neutral-900 hover:bg-neutral-200 transition shrink-0"
            >
              <span>Explore Pathways</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
