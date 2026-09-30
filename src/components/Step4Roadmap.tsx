import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Printer,
  Sparkles,
  GitCompare,
  TrendingUp,
  Building,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Briefcase,
  ChevronRight,
  ExternalLink,
  User,
  RefreshCw,
  Zap,
  GraduationCap,
} from 'lucide-react';
import { Stream, Track, Degree, Career, UserProfile } from '../types/career';
import { getCareersByDegree, CAREERS_DATA } from '../data';
import { CareerExecutionHub } from './CareerExecutionHub';

interface Step4RoadmapProps {
  stream: Stream;
  track: Track;
  degree: Degree;
  career: Career | null;
  onSelectCareer: (career: Career) => void;
  onBack: () => void;
  onAskAI: (initialQuestion: string) => void;
  onToggleBookmark: (careerId: string) => void;
  isBookmarked: boolean;
  onOpenCompareWithCurrent: (degreeId: string) => void;
  user?: UserProfile | null;
  onSaveUserPathway?: () => void;
  onChangePathway?: () => void;
  onOpenAuth?: () => void;
}

export const Step4Roadmap: React.FC<Step4RoadmapProps> = ({
  stream,
  track,
  degree,
  career,
  onSelectCareer,
  onBack,
  onAskAI,
  onToggleBookmark,
  isBookmarked,
  onOpenCompareWithCurrent,
  user,
  onSaveUserPathway,
  onChangePathway,
  onOpenAuth,
}) => {
  // If career is not yet selected, find available careers for this degree
  const availableCareers = getCareersByDegree(degree);
  const streamFallback = CAREERS_DATA.find((c) => c.streamIds.includes(stream.id));
  const activeCareer: Career = career || availableCareers[0] || streamFallback || CAREERS_DATA[0];

  const isUserSavedPathway = Boolean(
    user?.savedPathway &&
      user.savedPathway.careerId === activeCareer.id &&
      user.savedPathway.degreeId === degree.id
  );

  const [activeTab, setActiveTab] = useState<'roadmap' | 'launchpad' | 'alternatives' | 'growth'>('roadmap');
  const [copySuccess, setCopySuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* INTERACTIVE ON-SCREEN UI (Hidden when Printing / Exporting)   */}
      {/* ------------------------------------------------------------- */}
      <div className="py-8 sm:py-12 print:hidden">
        {/* Navigation & Context Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Degree Selection</span>
            </button>

            {/* Action Bar */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleBookmark(activeCareer.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                  isBookmarked
                    ? 'border-neutral-500 bg-neutral-200 text-neutral-950 font-bold'
                    : 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white'
                }`}
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>{isBookmarked ? 'Saved to Bookmarks' : 'Save Pathway'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white transition"
                title="Print or Save as PDF"
              >
                <Printer className="h-3.5 w-3.5 text-neutral-400" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white transition"
              >
                <Share2 className="h-3.5 w-3.5 text-neutral-400" />
                <span>{copySuccess ? 'Link Copied!' : 'Share'}</span>
              </button>

              <button
                onClick={() => onOpenCompareWithCurrent(degree.id)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white transition"
              >
                <GitCompare className="h-3.5 w-3.5 text-neutral-400" />
                <span className="hidden md:inline">Compare</span>
              </button>
            </div>
          </div>
        </div>

        {/* User Saved Pathway Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          {user ? (
            isUserSavedPathway ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Active Career Pathway for {user.name}</span>
                      <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-mono text-emerald-300 border border-emerald-800/60">
                        Locked
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      This pathway is saved locally to your profile and will be loaded automatically when you sign in.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {onChangePathway && (
                    <button
                      onClick={onChangePathway}
                      className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800/90 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 hover:text-white transition"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>Change Pathway</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-neutral-800 bg-[#14171d] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Set as your official career pathway?</span>
                    {user.savedPathway && (
                      <span className="text-[10px] text-neutral-400 font-mono">
                        (Replaces currently saved: {user.savedPathway.careerTitle})
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Save this complete roadmap ({stream.title} → {degree.code} → {activeCareer.title}) to your profile.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {onSaveUserPathway && (
                    <button
                      onClick={onSaveUserPathway}
                      className="flex items-center gap-1.5 rounded-lg bg-emerald-400 px-3.5 py-1.5 text-xs font-bold text-neutral-950 hover:bg-emerald-300 transition shadow-sm active:scale-95"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Set as Active Pathway</span>
                    </button>
                  )}
                  {onChangePathway && (
                    <button
                      onClick={onChangePathway}
                      className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white transition"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>Explore Others</span>
                    </button>
                  )}
                </div>
              </div>
            )
          ) : (
            <div className="rounded-xl border border-neutral-800 bg-[#14171d] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
              <div>
                <p className="text-xs font-bold text-white">
                  Save this career pathway to your profile
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Sign in or create a quick local account to lock this roadmap, view it anytime, or modify it later.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {onOpenAuth && (
                  <button
                    onClick={onOpenAuth}
                    className="flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-bold text-neutral-950 hover:bg-neutral-200 transition shadow-sm active:scale-95"
                  >
                    <User className="h-3.5 w-3.5" />
                    <span>Save to Account / Sign In</span>
                  </button>
                )}
                {onChangePathway && (
                  <button
                    onClick={onChangePathway}
                    className="flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white transition"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Change Path</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Target Career Picker if multiple match this degree */}
        {availableCareers.length > 1 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
                Select Specific Target Specialization for this Degree:
              </span>
              <div className="flex flex-wrap gap-2">
                {availableCareers.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onSelectCareer(c)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      activeCareer.id === c.id
                        ? 'bg-white text-neutral-950 font-bold shadow-sm'
                        : 'border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Header Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="rounded-2xl border border-neutral-800 bg-[#14171d] p-6 sm:p-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-3 text-xs font-mono">
                <span className="rounded border border-neutral-700 bg-neutral-900 px-2 py-0.5 text-neutral-300">
                  {activeCareer.category}
                </span>
                <span className="rounded border border-neutral-800 bg-neutral-900/80 px-2 py-0.5 text-neutral-400">
                  Sector: {activeCareer.sector}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                {activeCareer.title}
              </h1>
              <p className="text-sm sm:text-base text-neutral-300 max-w-4xl leading-relaxed mb-6">
                {activeCareer.overview}
              </p>

              {/* Complete Path Trace Line */}
              <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/70 p-4">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-2">
                  VERIFIED DECISION CHAIN
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-300">
                  <span className="font-semibold text-white">Class 10</span>
                  <span className="text-neutral-600">→</span>
                  <span className="rounded bg-neutral-800 px-2 py-0.5 text-neutral-200">
                    {stream.title}
                  </span>
                  <span className="text-neutral-600">→</span>
                  <span className="rounded bg-neutral-800 px-2 py-0.5 text-neutral-200">
                    {track.title}
                  </span>
                  <span className="text-neutral-600">→</span>
                  <span className="rounded bg-emerald-950 border border-emerald-800/60 px-2 py-0.5 font-bold text-emerald-300">
                    {degree.code}
                  </span>
                  <span className="text-neutral-600">→</span>
                  <span className="rounded bg-white px-2 py-0.5 font-bold text-neutral-950">
                    {activeCareer.title}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 pb-3">
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                activeTab === 'roadmap'
                  ? 'bg-neutral-100 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Chronological Flowchart Roadmap
            </button>

            <button
              onClick={() => setActiveTab('launchpad')}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'launchpad'
                  ? 'bg-emerald-400 text-neutral-950 shadow-sm font-extrabold'
                  : 'text-emerald-400 hover:bg-emerald-500/10'
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Placement & Execution Engine</span>
              <span className={`rounded px-1.5 py-0.2 text-[9px] font-mono ${activeTab === 'launchpad' ? 'bg-emerald-950/20 text-neutral-950' : 'bg-emerald-500/20 text-emerald-300'}`}>
                6 Stages
              </span>
            </button>

            <button
              onClick={() => setActiveTab('alternatives')}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                activeTab === 'alternatives'
                  ? 'bg-neutral-100 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Alternative Routes ({activeCareer.alternativeRoutes.length})
            </button>

            <button
              onClick={() => setActiveTab('growth')}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                activeTab === 'growth'
                  ? 'bg-neutral-100 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Salary Milestones & Industry Outlook
            </button>

            <div className="ml-auto hidden sm:block">
              <button
                onClick={() =>
                  onAskAI(
                    `I am looking at the roadmap for becoming a "${activeCareer.title}" starting from "${stream.title}" and "${degree.code}". What specific skills, certifications, and preparation timetable do you recommend I follow year by year?`
                  )
                }
                className="inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white underline underline-offset-4"
              >
                <Sparkles className="h-3.5 w-3.5 text-neutral-400" />
                <span>Ask AI about this roadmap</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Section 0: Placement & Execution Engine (6 Stages) */}
        {activeTab === 'launchpad' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CareerExecutionHub career={activeCareer} selectedDegree={degree} onAskAI={onAskAI} />
          </div>
        )}

        {/* Content Section 1: Flowchart Roadmap */}
        {activeTab === 'roadmap' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative pl-6 sm:pl-8 border-l-2 border-neutral-800 space-y-8">
              {activeCareer.roadmapSteps.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Node indicator */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-neutral-700 bg-neutral-950 text-[11px] font-mono font-bold text-neutral-200 group-hover:border-neutral-400 group-hover:text-white transition-colors">
                    {idx + 1}
                  </div>

                  {/* Card Container */}
                  <div className="rounded-xl border border-neutral-800 bg-[#14171d] p-5 sm:p-6 transition-all hover:border-neutral-700 hover:bg-[#171b23]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-semibold">
                          {step.stage}
                        </span>
                        {step.badge && (
                          <span className="rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-[10px] font-mono text-neutral-300">
                            {step.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded w-fit">
                        {step.duration}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Key Milestone Tag */}
                    <div className="flex items-start gap-2 rounded-lg border border-neutral-800/80 bg-neutral-900/60 p-3">
                      <CheckCircle2 className="h-4 w-4 text-neutral-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                          Target Milestone / Requirement
                        </span>
                        <span className="text-xs font-medium text-neutral-200">
                          {step.keyMilestone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Skills & Essential Internships Card */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-neutral-800 bg-[#14171d] p-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-3">
                  Crucial Core Skills to Develop
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeCareer.keySkills.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-lg border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-xs text-neutral-200 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-[#14171d] p-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-3">
                  Key Internships & Certifications
                </h4>
                <ul className="space-y-2">
                  {activeCareer.certificationsAndInternships.map((cert, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-500 mt-1.5 flex-shrink-0" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Content Section 2: Alternative Routes */}
        {activeTab === 'alternatives' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-1">
                Alternative Legitimate Routes to this Career
              </h3>
              <p className="text-xs text-neutral-400">
                In the Indian education system, multiple verified routes exist to enter the same profession.
                If the traditional route is missed or excessively competitive, consider these recognized alternatives.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {activeCareer.alternativeRoutes.map((alt, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-neutral-800 bg-[#14171d] p-6 space-y-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-lg font-bold text-white">{alt.title}</h4>
                    <span className="rounded bg-neutral-800 border border-neutral-700 px-2 py-0.5 text-[10px] font-mono text-neutral-300">
                      Alternative Pathway #{idx + 1}
                    </span>
                  </div>

                  <div className="rounded-lg border border-neutral-800 bg-neutral-900/80 p-3 text-xs font-mono text-neutral-200">
                    <span className="text-neutral-500 block mb-1">PATH SUMMARY:</span>
                    {alt.pathSummary}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1 font-semibold">
                        Key Advantages
                      </span>
                      <p className="text-neutral-300">{alt.advantages}</p>
                    </div>
                    <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1 font-semibold">
                        Tradeoffs & Considerations
                      </span>
                      <p className="text-neutral-300">{alt.tradeoffs}</p>
                    </div>
                  </div>

                  <div className="text-[11px] text-neutral-400 border-t border-neutral-800 pt-3">
                    <strong className="text-neutral-300">Eligibility Note: </strong>
                    {alt.eligibilityNote}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Section 3: Salary & Future Outlook */}
        {activeTab === 'growth' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Salary Progression Card */}
            <div className="rounded-xl border border-neutral-800 bg-[#14171d] p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-neutral-300" />
                <h3 className="text-xl font-bold text-white">
                  Expected Compensation Progression in India
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-5">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                    Entry Level (Years 0 – 3)
                  </span>
                  <div className="text-2xl font-black text-white font-mono mb-2">
                    {activeCareer.salaryProspects.entryLevel}
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Campus placement / trainee / junior associate base package.
                  </p>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-5">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                    Mid-Career (Years 4 – 8)
                  </span>
                  <div className="text-2xl font-black text-white font-mono mb-2">
                    {activeCareer.salaryProspects.midLevel}
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Senior specialist, manager, or post-specialization consultant.
                  </p>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-5">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                    Leadership / Senior (8+ Years)
                  </span>
                  <div className="text-2xl font-black text-white font-mono mb-2">
                    {activeCareer.salaryProspects.seniorLevel}
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Partner, Director, Super-specialist, or Executive.
                  </p>
                </div>
              </div>
            </div>

            {/* Industry Outlook & Top Employers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-neutral-800 bg-[#14171d] p-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-3">
                  Future 10-Year Industry Growth Outlook
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {activeCareer.futureGrowthOutlook}
                </p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-[#14171d] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Building className="h-4 w-4 text-neutral-400" />
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Premier Recruiters & Organizations
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeCareer.topRecruiters.map((rec, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-xs text-neutral-200"
                    >
                      {rec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* DEDICATED OFFICIAL PRINT / PDF BLUEPRINT DOCUMENT              */}
      {/* (Rendered exclusively when printing / saving as PDF)          */}
      {/* ------------------------------------------------------------- */}
      <div className="hidden print:block print-document max-w-4xl mx-auto p-4 bg-white text-slate-900 font-sans">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-3 mb-4 print:break-inside-avoid">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded bg-emerald-700 text-white font-mono font-bold text-sm">
                  E
                </span>
                <span className="text-xl font-black tracking-tight text-slate-900">
                  Edu Career<span className="text-emerald-700">.</span>
                </span>
                <span className="text-[10px] font-mono font-bold bg-slate-100 border border-slate-300 text-slate-700 px-2 py-0.5 rounded ml-2">
                  NEP 2020 COMPLIANT
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium mt-1">
                National Career & Education Decision Engine • Official Pathway Blueprint Report
              </p>
            </div>

            <div className="text-right text-[11px] text-slate-600 font-mono space-y-0.5">
              <div className="font-bold text-slate-900 uppercase">ACADEMIC BLUEPRINT</div>
              <div>Generated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              {user && <div className="text-emerald-800 font-bold">Candidate: {user.name}</div>}
            </div>
          </div>
        </div>

        {/* Executive Decision Chain Banner */}
        <div className="border border-slate-300 bg-slate-50 rounded-lg p-3.5 mb-4 print:break-inside-avoid">
          <div className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider mb-1.5">
            VERIFIED DECISION CHAIN (ACADEMIC PROGRESSION)
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono font-bold text-slate-900">
            <span className="bg-white border border-slate-300 px-2 py-0.5 rounded">Class 10 Foundation</span>
            <span className="text-slate-400">→</span>
            <span className="bg-white border border-slate-300 px-2 py-0.5 rounded">{stream.title}</span>
            <span className="text-slate-400">→</span>
            <span className="bg-white border border-slate-300 px-2 py-0.5 rounded text-emerald-800 font-extrabold">{degree.code}</span>
            <span className="text-slate-400">→</span>
            <span className="bg-emerald-700 text-white px-2.5 py-0.5 rounded">{activeCareer.title}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 pt-2.5 border-t border-slate-200 text-xs">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Undergraduate Degree</span>
              <span className="font-bold text-slate-900">{degree.title}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Course Duration</span>
              <span className="font-bold text-slate-900">{degree.duration}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Target Career Sector</span>
              <span className="font-bold text-slate-900">{activeCareer.sector}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Starting Salary (CTC)</span>
              <span className="font-bold text-emerald-700">{activeCareer.salaryProspects.entryLevel}</span>
            </div>
          </div>
        </div>

        {/* Role Overview */}
        <div className="mb-4 print:break-inside-avoid">
          <h2 className="text-sm font-bold text-slate-900 mb-1 border-b border-slate-200 pb-1 flex items-center justify-between">
            <span>Career Overview: {activeCareer.title}</span>
            <span className="text-[11px] font-mono font-normal text-slate-500">{activeCareer.category}</span>
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed mt-1">
            {activeCareer.overview}
          </p>
        </div>

        {/* Chronological Year-by-Year Roadmap */}
        <div className="mb-4">
          <h2 className="text-sm font-bold text-slate-900 mb-2 border-b border-slate-200 pb-1 flex items-center justify-between print:break-inside-avoid">
            <span>Chronological Year-by-Year Execution Roadmap</span>
            <span className="text-[11px] font-mono text-slate-500">{activeCareer.roadmapSteps.length} Milestones</span>
          </h2>

          <div className="space-y-2.5">
            {activeCareer.roadmapSteps.map((step, idx) => (
              <div
                key={idx}
                className="border border-slate-300 rounded-lg p-3 bg-white print:break-inside-avoid"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-4 w-4 items-center justify-center rounded bg-slate-900 text-white font-mono text-[9px] font-bold">
                      {idx + 1}
                    </span>
                    <span className="font-mono text-slate-600 font-bold uppercase text-[10px]">
                      {step.stage}
                    </span>
                    {step.badge && (
                      <span className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.2 text-[9px] font-mono text-slate-700">
                        {step.badge}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-slate-600 font-semibold text-[10px] bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                    {step.duration}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-slate-900 mb-0.5">
                  {step.title}
                </h3>
                <p className="text-[11px] text-slate-600 mb-1.5 leading-relaxed">
                  {step.description}
                </p>

                <div className="bg-emerald-50 border border-emerald-200 rounded p-1.5 text-xs flex items-start gap-1">
                  <span className="text-emerald-800 font-bold font-mono text-[9px] uppercase shrink-0 mt-0.5">
                    Requirement / Target:
                  </span>
                  <span className="text-emerald-950 font-medium text-[11px]">
                    {step.keyMilestone}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Certifications */}
        <div className="grid grid-cols-2 gap-3 mb-4 print:break-inside-avoid">
          <div className="border border-slate-300 rounded-lg p-3 bg-slate-50">
            <h3 className="text-[11px] font-bold text-slate-900 uppercase font-mono tracking-wider mb-1.5 border-b border-slate-200 pb-1">
              Core Skills to Develop
            </h3>
            <div className="flex flex-wrap gap-1">
              {activeCareer.keySkills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-white border border-slate-300 px-1.5 py-0.2 rounded text-[10px] text-slate-800 font-mono"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="border border-slate-300 rounded-lg p-3 bg-slate-50">
            <h3 className="text-[11px] font-bold text-slate-900 uppercase font-mono tracking-wider mb-1.5 border-b border-slate-200 pb-1">
              Internships & Certifications
            </h3>
            <ul className="space-y-1 text-[11px] text-slate-700">
              {activeCareer.certificationsAndInternships.map((cert, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Salary Progression & Top Recruiters */}
        <div className="border border-slate-300 rounded-lg p-3 mb-4 print:break-inside-avoid">
          <h3 className="text-[11px] font-bold text-slate-900 uppercase font-mono tracking-wider mb-2 border-b border-slate-200 pb-1">
            Indian Salary Prospects & Campus Recruiters
          </h3>

          <div className="grid grid-cols-3 gap-2 mb-2.5 text-center">
            <div className="border border-slate-200 rounded p-1.5 bg-white">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">Entry Level (0-3 Yrs)</span>
              <span className="text-xs font-bold text-slate-900 font-mono">{activeCareer.salaryProspects.entryLevel}</span>
            </div>
            <div className="border border-slate-200 rounded p-1.5 bg-white">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">Mid-Career (4-8 Yrs)</span>
              <span className="text-xs font-bold text-slate-900 font-mono">{activeCareer.salaryProspects.midLevel}</span>
            </div>
            <div className="border border-slate-200 rounded p-1.5 bg-white">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">Senior / Lead (8+ Yrs)</span>
              <span className="text-xs font-bold text-slate-900 font-mono">{activeCareer.salaryProspects.seniorLevel}</span>
            </div>
          </div>

          <div>
            <span className="text-[9px] font-mono text-slate-500 uppercase block mb-1">Top Hiring Organizations in India:</span>
            <div className="flex flex-wrap gap-1">
              {activeCareer.topRecruiters.map((rec, i) => (
                <span
                  key={i}
                  className="bg-slate-100 border border-slate-300 px-1.5 py-0.2 rounded text-[10px] text-slate-800 font-medium"
                >
                  {rec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Alternative Routes (if available) */}
        {activeCareer.alternativeRoutes.length > 0 && (
          <div className="border border-slate-300 rounded-lg p-3 mb-4 print:break-inside-avoid">
            <h3 className="text-[11px] font-bold text-slate-900 uppercase font-mono tracking-wider mb-1.5 border-b border-slate-200 pb-1">
              Alternative Recognized Pathways
            </h3>
            <div className="space-y-1.5 text-xs">
              {activeCareer.alternativeRoutes.map((alt, idx) => (
                <div key={idx} className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="font-bold text-slate-900 text-xs block">{alt.title}</span>
                  <span className="text-slate-600 text-[11px] block mt-0.5">{alt.pathSummary}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Official Footer / Compliance */}
        <div className="border-t-2 border-slate-900 pt-2 text-[9px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-1 font-mono print:break-inside-avoid">
          <span>Grounded in National Education Policy (NEP 2020) • AICTE / UGC Regulatory Frameworks</span>
          <span>Edu Career Decision Engine • Official Report</span>
        </div>
      </div>
    </>
  );
};
