import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Stream } from '../types/career';
import { STREAMS_DATA } from '../data/streamsData';

interface Step1Class10Props {
  onSelectStream: (stream: Stream) => void;
  onAskAI?: (initialQuestion: string) => void;
}

export const Step1Class10: React.FC<Step1Class10Props> = ({ onSelectStream }) => {
  return (
    <div className="py-8 sm:py-12">
      {/* Step Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/80 px-3.5 py-1 text-xs font-mono font-medium text-neutral-300 mb-4">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          STEP 1 OF 4 • FOUNDATION
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          What do you want to choose after Class 10?
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          Select your foundational educational pathway. Every subsequent recommendation,
          subject combination, entrance exam, and career milestone will dynamically adapt
          to this initial choice.
        </p>
      </div>

      {/* Grid of All 11 Pathways */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {STREAMS_DATA.map((stream) => {
          return (
            <div
              key={stream.id}
              onClick={() => onSelectStream(stream)}
              className="group relative flex flex-col justify-between rounded-xl border border-neutral-800 bg-[#14171d] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-neutral-600 hover:bg-[#181c24] hover:shadow-xl cursor-pointer"
            >
              <div>
                {/* Header of Card */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="rounded-full border border-neutral-800 bg-neutral-900/90 px-3 py-1 text-[11px] font-mono text-neutral-300 font-medium">
                    {stream.badge}
                  </span>
                  <ArrowRight className="h-4 w-4 text-neutral-500 transition-transform group-hover:translate-x-1 group-hover:text-neutral-200" />
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-white group-hover:text-neutral-100 mb-1.5">
                  {stream.title}
                </h3>
                <p className="text-xs font-medium text-neutral-400 mb-3.5 line-clamp-1">
                  {stream.tagline}
                </p>

                {/* Description */}
                <p className="text-xs text-neutral-400 leading-relaxed mb-4 line-clamp-3">
                  {stream.description}
                </p>

                {/* Core Subjects Pill List */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1.5">
                    Core Subjects
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {stream.coreSubjects.slice(0, 4).map((sub, i) => (
                      <span
                        key={i}
                        className="rounded-md border border-neutral-800 bg-neutral-900/90 px-2 py-0.5 text-[11px] text-neutral-300 font-mono"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Outcomes */}
                <div className="space-y-1 mb-5">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">
                    Key Outcomes
                  </span>
                  {stream.keyOutcomes.slice(0, 2).map((outcome, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <span className="h-1 w-1 rounded-full bg-neutral-500"></span>
                      <span className="truncate">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">
                  {stream.totalTracks} Specialized Tracks
                </span>
                <div className="flex items-center gap-1 text-xs font-semibold text-white group-hover:translate-x-0.5 transition-transform">
                  <span>Explore Track</span>
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
