import React from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import { Stream, Track } from '../types/career';
import { getTracksByStreamId } from '../data';

interface Step2Class11_12Props {
  stream: Stream;
  onSelectTrack: (track: Track) => void;
  onBack: () => void;
  onAskAI: (initialQuestion: string) => void;
}

export const Step2Class11_12: React.FC<Step2Class11_12Props> = ({
  stream,
  onSelectTrack,
  onBack,
  onAskAI,
}) => {
  const tracks = getTracksByStreamId(stream.id);

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
            <span>Back to Class 10 Choice</span>
          </button>

          {/* Active Breadcrumb Tag */}
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>SELECTED STREAM:</span>
            <span className="rounded-md border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-white font-bold">
              {stream.title}
            </span>
          </div>
        </div>
      </div>

      {/* Step Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/80 px-3.5 py-1 text-xs font-mono font-medium text-neutral-300 mb-4">
          <span className="flex h-1.5 w-1.5 rounded-full bg-blue-400"></span>
          STEP 2 OF 4 • CLASS 11–12 SPECIALIZATION
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          Select Your Class 11–12 Track & Subjects
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          Based on your selection of <strong className="text-neutral-200">{stream.title}</strong>,
          here are the verified educational and subject tracks available in India.
          Select the one that aligns with your intended undergraduate degree.
        </p>

        {/* AI Prompt Helper */}
        <div className="mt-5 flex items-center justify-center">
          <button
            onClick={() =>
              onAskAI(
                `I selected "${stream.title}" after Class 10. Can you explain the pros and cons of the different Class 11-12 tracks available for this stream and which one is best for my long-term career?`
              )
            }
            className="inline-flex items-center gap-2 text-xs text-neutral-300 underline underline-offset-4 hover:text-white font-medium"
          >
            <span>Compare these tracks with AI Counsellor</span>
            <span className="rounded bg-neutral-800 border border-neutral-700 px-1.5 py-0.5 text-[9px] font-mono text-neutral-400">
              Coming Soon
            </span>
          </button>
        </div>
      </div>

      {/* Dynamic Filtered Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {tracks.map((track) => {
          const difficultyBadgeColor =
            track.difficultyLevel === 'Rigorous'
              ? 'border-neutral-700 text-neutral-300'
              : 'border-neutral-800 text-neutral-400';

          return (
            <div
              key={track.id}
              onClick={() => onSelectTrack(track)}
              className="group relative flex flex-col justify-between rounded-xl border border-neutral-800 bg-[#14171d] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-neutral-600 hover:bg-[#181c24] hover:shadow-xl cursor-pointer"
            >
              <div>
                {/* Category & Difficulty */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider font-semibold">
                    {track.category}
                  </span>
                  <span
                    className={`rounded border bg-neutral-900 px-2 py-0.5 text-[10px] font-mono font-medium ${difficultyBadgeColor}`}
                  >
                    {track.difficultyLevel}
                  </span>
                </div>

                {/* Track Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-neutral-100 mb-1.5 leading-snug">
                  {track.title}
                </h3>
                <p className="text-xs text-neutral-400 mb-4 line-clamp-1">
                  {track.tagline}
                </p>

                {/* Description */}
                <p className="text-xs text-neutral-400 leading-relaxed mb-5 line-clamp-3">
                  {track.description}
                </p>

                {/* Mandatory Subjects */}
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    <BookOpen className="h-3 w-3 text-neutral-400" />
                    <span>Mandatory Class 11-12 Subjects</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {track.mandatorySubjects.map((sub, idx) => (
                      <span
                        key={idx}
                        className="rounded border border-neutral-700/80 bg-neutral-900 px-2 py-0.5 text-[11px] text-neutral-200 font-mono"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommended Electives */}
                {track.recommendedElectives.length > 0 && (
                  <div className="mb-4">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1.5">
                      Recommended Electives
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {track.recommendedElectives.map((elec, idx) => (
                        <span
                          key={idx}
                          className="rounded border border-neutral-800 bg-neutral-950/60 px-1.5 py-0.5 text-[10px] text-neutral-400 font-mono"
                        >
                          + {elec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Entrance Exams Focus */}
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                    <Target className="h-3 w-3 text-neutral-400" />
                    <span>Key Target Entrance Exams</span>
                  </div>
                  <div className="space-y-1">
                    {track.primaryEntranceFocus.slice(0, 3).map((exam, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-neutral-300">
                        <CheckCircle2 className="h-3 w-3 text-neutral-500 flex-shrink-0" />
                        <span className="truncate">{exam}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between mt-2">
                <span className="text-xs font-mono text-neutral-400">
                  {track.degreeIds.length} Verified Degree Options
                </span>
                <div className="flex items-center gap-1 text-xs font-semibold text-white group-hover:translate-x-0.5 transition-transform">
                  <span>View Degrees</span>
                  <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
