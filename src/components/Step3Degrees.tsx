import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Clock,
  BookOpen,
  Building2,
  Info,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { Stream, Track, Degree } from '../types/career';
import { getDegreesByTrackId } from '../data';

interface Step3DegreesProps {
  stream: Stream;
  track: Track;
  onSelectDegree: (degree: Degree) => void;
  onViewDegreeDetails: (degree: Degree) => void;
  onBack: () => void;
  onAskAI: (initialQuestion: string) => void;
}

export const Step3Degrees: React.FC<Step3DegreesProps> = ({
  stream,
  track,
  onSelectDegree,
  onViewDegreeDetails,
  onBack,
  onAskAI,
}) => {
  const degrees = getDegreesByTrackId(track.id);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(degrees.map((d) => d.category)))];

  const filteredDegrees =
    selectedFilter === 'All'
      ? degrees
      : degrees.filter((d) => d.category === selectedFilter);

  return (
    <div className="py-8 sm:py-12">
      {/* Navigation & Context Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Tracks</span>
          </button>

          {/* Active Chain */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-neutral-500">CHAIN:</span>
            <span className="rounded bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-neutral-400">
              {stream.title}
            </span>
            <span className="text-neutral-600">→</span>
            <span className="rounded bg-neutral-800 border border-neutral-700 px-2 py-0.5 text-white font-semibold">
              {track.title}
            </span>
          </div>
        </div>
      </div>

      {/* Step Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/80 px-3.5 py-1 text-xs font-mono font-medium text-neutral-300 mb-4">
          <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400"></span>
          STEP 3 OF 4 • HIGHER EDUCATION & DEGREES
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          Choose Your Degree, Course or Professional Pathway
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          The following courses, undergraduate degrees, and professional certifications are
          strictly accessible from your chosen track (<strong className="text-neutral-200">{track.title}</strong>).
          Review their eligibility, entrance exams, and select one to generate your full career roadmap.
        </p>

        {/* AI Prompt */}
        <div className="mt-5 flex items-center justify-center">
          <button
            onClick={() =>
              onAskAI(
                `I am in the "${track.title}" track under "${stream.title}". Can you give me a realistic comparison of the top courses available, their entrance exam difficulty, and return on investment in India?`
              )
            }
            className="inline-flex items-center gap-2 text-xs text-neutral-300 underline underline-offset-4 hover:text-white font-medium"
          >
            <Sparkles className="h-3.5 w-3.5 text-neutral-400" />
            <span>Ask AI: Which degree offers the highest starting prospects?</span>
            <span className="rounded bg-neutral-800 border border-neutral-700 px-1.5 py-0.5 text-[9px] font-mono text-neutral-400">
              Coming Soon
            </span>
          </button>
        </div>
      </div>

      {/* Filter Tabs if multiple categories */}
      {categories.length > 2 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-colors ${
                  selectedFilter === cat
                    ? 'bg-white text-neutral-950 font-bold'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Degree Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredDegrees.map((degree) => {
          return (
            <div
              key={degree.id}
              className="flex flex-col justify-between rounded-xl border border-neutral-800 bg-[#14171d] p-6 transition-all duration-200 hover:border-neutral-700 hover:bg-[#161a22]"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                      {degree.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1.5 leading-snug">
                      {degree.code}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">
                    <Clock className="h-3 w-3 text-neutral-500" />
                    <span>{degree.duration}</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 mb-4 line-clamp-1">
                  {degree.title}
                </p>

                {/* Eligibility Block */}
                <div className="rounded-lg border border-neutral-800/80 bg-neutral-900/60 p-3 mb-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-neutral-400" />
                    <span>Eligibility & Minimum Marks</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {degree.eligibility}
                  </p>
                </div>

                {/* Required Subjects & Entrance Exams */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {/* Required Subjects */}
                  <div className="rounded-lg border border-neutral-800/50 bg-neutral-900/40 p-2.5">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">
                      Required 10+2 Subjects
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {degree.requiredSubjects.slice(0, 3).map((sub, i) => (
                        <span
                          key={i}
                          className="rounded bg-neutral-800/90 px-1.5 py-0.5 text-[10px] text-neutral-300 font-mono"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Primary Entrance Exams */}
                  <div className="rounded-lg border border-neutral-800/50 bg-neutral-900/40 p-2.5">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">
                      Entrance Exams
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {degree.entranceExams.slice(0, 3).map((exam, i) => (
                        <span
                          key={i}
                          className="rounded border border-neutral-700 bg-neutral-900 px-1.5 py-0.5 text-[10px] text-neutral-200 font-mono font-medium"
                        >
                          {exam.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Major Institution Types */}
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-1.5">
                    <Building2 className="h-3 w-3 text-neutral-500" />
                    <span>Premier Institutions in India</span>
                  </div>
                  <div className="text-xs text-neutral-300 space-y-0.5">
                    {degree.majorInstitutions.slice(0, 2).map((inst, i) => (
                      <div key={i} className="truncate">
                        <strong className="text-neutral-400 font-normal">{inst.type}: </strong>
                        <span>{inst.examples.slice(0, 3).join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Opportunities Preview */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">
                    Primary Career Profiles
                  </span>
                  <p className="text-xs text-neutral-400 line-clamp-1">
                    {degree.careerOpportunities.slice(0, 3).join(' • ')}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => onViewDegreeDetails(degree)}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white font-medium py-1.5"
                >
                  <Info className="h-3.5 w-3.5" />
                  <span>View Full Details</span>
                </button>

                <button
                  onClick={() => onSelectDegree(degree)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-600 bg-neutral-100 px-4 py-2 text-xs font-bold text-neutral-950 transition hover:bg-white active:scale-95"
                >
                  <span>Build Career Roadmap</span>
                  <ArrowRight className="h-3.5 w-3.5 text-neutral-950" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
