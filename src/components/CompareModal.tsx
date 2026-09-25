import React, { useState } from 'react';
import { X, GitCompare, ArrowRight, ShieldCheck, Clock, Building2, TrendingUp } from 'lucide-react';
import { Degree } from '../types/career';
import { DEGREES_DATA } from '../data';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDegreeId?: string;
  onSelectDegreeForRoadmap: (degree: Degree) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  initialDegreeId,
  onSelectDegreeForRoadmap,
}) => {
  const [leftId, setLeftId] = useState<string>(initialDegreeId || 'btech-cse');
  const [rightId, setRightId] = useState<string>(
    initialDegreeId === 'bca-degree' ? 'btech-cse' : 'bca-degree'
  );

  if (!isOpen) return null;

  const leftDegree = DEGREES_DATA.find((d) => d.id === leftId) || DEGREES_DATA[0];
  const rightDegree = DEGREES_DATA.find((d) => d.id === rightId) || DEGREES_DATA[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative flex flex-col w-full max-w-5xl max-h-[92vh] rounded-2xl border border-neutral-700 bg-[#12151b] shadow-2xl text-neutral-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-[#161a22] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <GitCompare className="h-5 w-5 text-neutral-300" />
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Pathway & Degree Comparator
              </h3>
              <p className="text-xs text-neutral-400">
                Compare eligibility, entrance exams, duration, and ROI side by side
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

        {/* Dropdown selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-neutral-800 bg-[#14171d] p-4 sm:p-6">
          <div>
            <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1.5 font-semibold">
              Select Degree / Pathway A
            </label>
            <select
              value={leftId}
              onChange={(e) => setLeftId(e.target.value)}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-white focus:outline-none"
            >
              {DEGREES_DATA.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.code} — {d.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1.5 font-semibold">
              Select Degree / Pathway B
            </label>
            <select
              value={rightId}
              onChange={(e) => setRightId(e.target.value)}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-white focus:outline-none"
            >
              {DEGREES_DATA.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.code} — {d.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Degree Code & Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Degree A</span>
              <h4 className="text-xl font-bold text-white mt-1">{leftDegree.code}</h4>
              <p className="text-xs text-neutral-400 mt-1">{leftDegree.title}</p>
              <div className="mt-3">
                <button
                  onClick={() => {
                    onClose();
                    onSelectDegreeForRoadmap(leftDegree);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-600 bg-neutral-100 px-3 py-1.5 text-xs font-bold text-neutral-950 transition hover:bg-white"
                >
                  <span>Build Roadmap for {leftDegree.code}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Degree B</span>
              <h4 className="text-xl font-bold text-white mt-1">{rightDegree.code}</h4>
              <p className="text-xs text-neutral-400 mt-1">{rightDegree.title}</p>
              <div className="mt-3">
                <button
                  onClick={() => {
                    onClose();
                    onSelectDegreeForRoadmap(rightDegree);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-600 bg-neutral-100 px-3 py-1.5 text-xs font-bold text-neutral-950 transition hover:bg-white"
                >
                  <span>Build Roadmap for {rightDegree.code}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Row: Duration & Category */}
          <div className="rounded-xl border border-neutral-800 bg-[#161a22] p-4">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
              Course Duration & Program Type
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="text-white font-medium">
                {leftDegree.duration} • {leftDegree.category}
              </div>
              <div className="text-white font-medium">
                {rightDegree.duration} • {rightDegree.category}
              </div>
            </div>
          </div>

          {/* Row: Eligibility & Required Subjects */}
          <div className="rounded-xl border border-neutral-800 bg-[#161a22] p-4">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
              Eligibility & 10+2 Subjects
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed text-neutral-300">
              <div>
                <p className="mb-2">{leftDegree.eligibility}</p>
                <div className="flex flex-wrap gap-1">
                  {leftDegree.requiredSubjects.map((s, i) => (
                    <span
                      key={i}
                      className="rounded bg-neutral-800 border border-neutral-700 px-2 py-0.5 text-[10px] font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2">{rightDegree.eligibility}</p>
                <div className="flex flex-wrap gap-1">
                  {rightDegree.requiredSubjects.map((s, i) => (
                    <span
                      key={i}
                      className="rounded bg-neutral-800 border border-neutral-700 px-2 py-0.5 text-[10px] font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row: Entrance Examinations */}
          <div className="rounded-xl border border-neutral-800 bg-[#161a22] p-4">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
              Primary Entrance Exams
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                {leftDegree.entranceExams.map((e, i) => (
                  <div key={i} className="text-neutral-300">
                    <strong className="text-white font-mono">{e.name}: </strong>
                    <span className="text-neutral-400">{e.conductingBody} ({e.level})</span>
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                {rightDegree.entranceExams.map((e, i) => (
                  <div key={i} className="text-neutral-300">
                    <strong className="text-white font-mono">{e.name}: </strong>
                    <span className="text-neutral-400">{e.conductingBody} ({e.level})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row: Premier Institutions */}
          <div className="rounded-xl border border-neutral-800 bg-[#161a22] p-4">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
              Premier Institutions in India
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300">
              <div>
                {leftDegree.majorInstitutions.map((inst, i) => (
                  <p key={i} className="mb-1">
                    <span className="font-semibold text-white">{inst.type}: </span>
                    <span className="text-neutral-400">{inst.examples.slice(0, 3).join(', ')}</span>
                  </p>
                ))}
              </div>
              <div>
                {rightDegree.majorInstitutions.map((inst, i) => (
                  <p key={i} className="mb-1">
                    <span className="font-semibold text-white">{inst.type}: </span>
                    <span className="text-neutral-400">{inst.examples.slice(0, 3).join(', ')}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Row: Starting Salary Range */}
          <div className="rounded-xl border border-neutral-800 bg-[#161a22] p-4">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
              Expected Starting Salary Range
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="text-white font-semibold">{leftDegree.startingSalaryRange}</div>
              <div className="text-white font-semibold">{rightDegree.startingSalaryRange}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
