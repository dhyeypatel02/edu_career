import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { StudentSelectionState } from '../types/career';

interface FlowProgressProps {
  state: StudentSelectionState;
  onJumpToStep: (step: 1 | 2 | 3 | 4) => void;
}

export const FlowProgress: React.FC<FlowProgressProps> = ({ state, onJumpToStep }) => {
  const steps = [
    {
      num: 1,
      label: 'Class 10 Choice',
      sublabel: state.selectedStream ? state.selectedStream.title : 'Select Stream',
      isCompleted: state.currentStep > 1 && !!state.selectedStream,
      isCurrent: state.currentStep === 1,
      isAccessible: true,
    },
    {
      num: 2,
      label: 'Class 11–12 Track',
      sublabel: state.selectedTrack ? state.selectedTrack.title : 'Select Subjects',
      isCompleted: state.currentStep > 2 && !!state.selectedTrack,
      isCurrent: state.currentStep === 2,
      isAccessible: !!state.selectedStream,
    },
    {
      num: 3,
      label: 'Course & Entrance',
      sublabel: state.selectedDegree ? state.selectedDegree.code : 'Choose Degree',
      isCompleted: state.currentStep > 3 && !!state.selectedDegree,
      isCurrent: state.currentStep === 3,
      isAccessible: !!state.selectedTrack,
    },
    {
      num: 4,
      label: 'Career Roadmap',
      sublabel: state.selectedCareer ? state.selectedCareer.title : 'Personalized Map',
      isCompleted: state.currentStep === 4 && !!state.selectedCareer,
      isCurrent: state.currentStep === 4,
      isAccessible: !!state.selectedDegree,
    },
  ];

  return (
    <div className="w-full border-b border-neutral-800 bg-[#0f1115] py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb Tracker */}
        <div className="flex items-center justify-between overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-max">
            {steps.map((step, idx) => {
              const canClick = step.isAccessible && step.num < state.currentStep;

              return (
                <React.Fragment key={step.num}>
                  {idx > 0 && (
                    <div className="flex items-center text-neutral-600 px-1">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (canClick) onJumpToStep(step.num as 1 | 2 | 3 | 4);
                    }}
                    disabled={!canClick && !step.isCurrent}
                    className={`group flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-all ${
                      step.isCurrent
                        ? 'border-neutral-400 bg-neutral-900 text-white shadow-sm'
                        : step.isCompleted
                        ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700 cursor-pointer'
                        : 'border-neutral-900 bg-neutral-950/40 text-neutral-500 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {/* Step Number or Check */}
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-md font-mono text-xs font-semibold ${
                        step.isCurrent
                          ? 'bg-white text-neutral-950'
                          : step.isCompleted
                          ? 'bg-neutral-800 text-neutral-200 group-hover:bg-neutral-700'
                          : 'bg-neutral-900 text-neutral-600'
                      }`}
                    >
                      {step.isCompleted ? <Check className="h-3.5 w-3.5" /> : step.num}
                    </div>

                    {/* Step Title & Value */}
                    <div className="flex flex-col">
                      <span className="text-[11px] font-medium tracking-tight text-neutral-400 uppercase">
                        {step.label}
                      </span>
                      <span className="text-xs font-semibold max-w-[140px] sm:max-w-[180px] truncate text-neutral-200">
                        {step.sublabel}
                      </span>
                    </div>
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          {/* Quick Indicator */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-neutral-400 pl-4 border-l border-neutral-800">
            <span className="text-neutral-500">STAGE</span>
            <span className="rounded bg-neutral-800 px-2 py-0.5 text-neutral-200 font-bold">
              {state.currentStep} OF 4
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
