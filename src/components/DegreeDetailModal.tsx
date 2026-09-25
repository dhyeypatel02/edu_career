import React from 'react';
import { X, Clock, BookOpen, Building2, ShieldCheck, ArrowRight, Award, ExternalLink } from 'lucide-react';
import { Degree } from '../types/career';

interface DegreeDetailModalProps {
  degree: Degree | null;
  onClose: () => void;
  onSelectDegree: (degree: Degree) => void;
  onAskAI: (initialQuestion: string) => void;
}

export const DegreeDetailModal: React.FC<DegreeDetailModalProps> = ({
  degree,
  onClose,
  onSelectDegree,
  onAskAI,
}) => {
  if (!degree) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-neutral-700 bg-[#12151b] p-6 sm:p-8 shadow-2xl text-neutral-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-lg border border-neutral-700 bg-neutral-900 p-2 text-neutral-400 hover:text-white transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded border border-neutral-700 bg-neutral-900 px-2 py-0.5 text-[10px] font-mono uppercase text-neutral-300">
              {degree.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-mono text-neutral-400">
              <Clock className="h-3.5 w-3.5 text-neutral-500" />
              <span>{degree.duration}</span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {degree.code} — {degree.title}
          </h2>
        </div>

        {/* Eligibility Section */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-semibold">
            <ShieldCheck className="h-4 w-4 text-neutral-400" />
            <span>Statutory Eligibility & Board Requirements</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-3">
            {degree.eligibility}
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="text-neutral-500">MINIMUM MARKS:</span>
            <span className="text-white font-medium">{degree.minimumMarks}</span>
          </div>
        </div>

        {/* Required Subjects & Entrance Exams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Required Subjects */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
              Mandatory 10+2 Subjects
            </span>
            <div className="flex flex-wrap gap-1.5">
              {degree.requiredSubjects.map((sub, i) => (
                <span
                  key={i}
                  className="rounded-md border border-neutral-700 bg-neutral-800 px-2 py-1 text-xs font-mono text-neutral-200"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Admission Process */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
              Centralized Admission Process
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {degree.admissionProcess}
            </p>
          </div>
        </div>

        {/* Entrance Examinations Details */}
        <div className="mb-6">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-3 font-semibold">
            Official Entrance Examinations
          </span>
          <div className="space-y-3">
            {degree.entranceExams.map((exam, i) => (
              <div
                key={i}
                className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-white">{exam.name}</span>
                    <span className="rounded bg-neutral-800 border border-neutral-700 px-1.5 py-0.2 text-[10px] font-mono text-neutral-400">
                      {exam.level}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500">
                      • {exam.frequency}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400">{exam.fullName}</p>
                  <p className="text-xs text-neutral-300 mt-1">{exam.brief}</p>
                </div>
                <div className="text-right sm:text-right flex-shrink-0">
                  <span className="text-[10px] font-mono text-neutral-500 block">CONDUCTING BODY</span>
                  <span className="text-xs font-medium text-neutral-300">{exam.conductingBody}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Major Institutions */}
        <div className="mb-6">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-3 font-semibold">
            Premier Institution Types in India
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {degree.majorInstitutions.map((inst, i) => (
              <div key={i} className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-3.5">
                <span className="text-xs font-bold text-white block mb-1.5">{inst.type}</span>
                <ul className="text-xs text-neutral-400 space-y-1">
                  {inst.examples.map((ex, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-neutral-500" />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Further Study & Alternative Routes */}
        {degree.alternativeRoutesNote && (
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 mb-6">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1 font-semibold">
              Alternative Routes / Flexibility
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {degree.alternativeRoutesNote}
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onAskAI(
                `Can you tell me about the eligibility, entrance exam preparation strategy, and typical syllabus for ${degree.code} (${degree.title})?`
              );
            }}
            className="text-xs text-neutral-400 hover:text-white underline underline-offset-4"
          >
            Ask AI Counsellor questions about this course
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto rounded-lg border border-neutral-800 px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectDegree(degree);
              }}
              className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-600 bg-neutral-100 px-5 py-2 text-xs font-bold text-neutral-950 transition hover:bg-white active:scale-95"
            >
              <span>Build Full Roadmap</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
