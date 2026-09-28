import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Zap,
  Search,
  Sparkles,
  GraduationCap,
  Briefcase,
  ArrowRight,
  Check,
  Star,
  ChevronDown,
  ChevronUp,
  Building2,
  TrendingUp,
  Award,
  Code2,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { Career, Degree, Stream, UserProfile, SavedUserPathway } from '../types/career';
import {
  CAREERS_DATA,
  DEGREES_DATA,
  getDegreeById,
  getCareerById,
  getCareersByDegree,
} from '../data';
import { CareerExecutionHub } from './CareerExecutionHub';

interface PlacementHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskAI?: (prompt: string) => void;
  initialCareer?: Career | null;
  selectedDegree?: Degree | null;
  selectedStream?: Stream | null;
  currentUser?: UserProfile | null;
  savedCareerIds?: string[];
  onSaveGoal?: (career: Career, degree: Degree) => void;
}

export const PlacementHubModal: React.FC<PlacementHubModalProps> = ({
  isOpen,
  onClose,
  onAskAI,
  initialCareer,
  selectedDegree: propSelectedDegree,
  currentUser,
  onSaveGoal,
}) => {
  // Determine default career and degree
  const defaultDegree = useMemo(() => {
    if (propSelectedDegree) return propSelectedDegree;
    if (currentUser?.savedPathway?.degreeId) {
      const found = getDegreeById(currentUser.savedPathway.degreeId);
      if (found) return found;
    }
    if (initialCareer?.primaryDegreeIds?.[0]) {
      const found = getDegreeById(initialCareer.primaryDegreeIds[0]);
      if (found) return found;
    }
    return DEGREES_DATA[0];
  }, [propSelectedDegree, currentUser, initialCareer]);

  const [selectedDegree, setSelectedDegree] = useState<Degree>(defaultDegree);

  // Active Stream Filter
  const [activeStreamFilter, setActiveStreamFilter] = useState<string>('all');
  const [searchDegreeQuery, setSearchDegreeQuery] = useState('');
  const [selectedJobIndex, setSelectedJobIndex] = useState<number>(0);
  const [showDetailedBlueprint, setShowDetailedBlueprint] = useState(false);
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  // Sync state whenever modal opens or initial props change
  useEffect(() => {
    if (isOpen) {
      if (propSelectedDegree) {
        setSelectedDegree(propSelectedDegree);
      } else if (initialCareer?.primaryDegreeIds?.[0]) {
        const d = getDegreeById(initialCareer.primaryDegreeIds[0]);
        if (d) setSelectedDegree(d);
      }
      setSelectedJobIndex(0);
    }
  }, [isOpen, propSelectedDegree, initialCareer]);

  // Stream filter definitions
  const streamCategories = [
    { id: 'all', label: 'All Degrees', icon: Compass },
    { id: 'science-pcm', label: 'Tech & Engineering', icon: Code2 },
    { id: 'science-pcb', label: 'Medical & Healthcare', icon: Zap },
    { id: 'commerce', label: 'Commerce & Finance', icon: TrendingUp },
    { id: 'arts-humanities', label: 'Law & Humanities', icon: Building2 },
  ];

  // Filter degrees by stream and search
  const filteredDegrees = useMemo(() => {
    return DEGREES_DATA.filter((d) => {
      const matchesSearch =
        d.title.toLowerCase().includes(searchDegreeQuery.toLowerCase()) ||
        d.code.toLowerCase().includes(searchDegreeQuery.toLowerCase()) ||
        d.category.toLowerCase().includes(searchDegreeQuery.toLowerCase());

      const matchesStream =
        activeStreamFilter === 'all' ||
        d.streamIds.some((s) => s.includes(activeStreamFilter) || activeStreamFilter.includes(s));

      return matchesSearch && matchesStream;
    });
  }, [searchDegreeQuery, activeStreamFilter]);

  // Resolve top 3-4 direct campus placement jobs for the selected degree
  const topJobsForDegree = useMemo(() => {
    const directCareers = getCareersByDegree(selectedDegree);
    // If fewer than 3, complement with careers matching degree's stream
    const fallbackCareers = CAREERS_DATA.filter(
      (c) =>
        !directCareers.some((dc) => dc.id === c.id) &&
        c.streamIds.some((s) => selectedDegree.streamIds.includes(s))
    );
    const combined = [...directCareers, ...fallbackCareers];
    return combined.slice(0, 4);
  }, [selectedDegree]);

  const activeCareer = topJobsForDegree[selectedJobIndex] || topJobsForDegree[0] || CAREERS_DATA[0];

  if (!isOpen) return null;

  const handleSelectDegree = (deg: Degree) => {
    setSelectedDegree(deg);
    setSelectedJobIndex(0);
  };

  const handleSaveGoal = () => {
    if (onSaveGoal && activeCareer) {
      onSaveGoal(activeCareer, selectedDegree);
      setIsSavedSuccess(true);
      setTimeout(() => setIsSavedSuccess(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative flex flex-col w-full max-w-6xl max-h-[94vh] rounded-2xl border border-neutral-800 bg-[#0d0f14] shadow-2xl text-neutral-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-[#12151d] px-5 sm:px-7 py-3.5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-emerald-400">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Course-to-Job Navigator
                </h2>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-semibold">
                  Placement & Salary Matcher
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Select your degree to see its top campus jobs, starting packages, top hiring companies, and core skills.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onSaveGoal && activeCareer && (
              <button
                onClick={handleSaveGoal}
                className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50 transition"
              >
                {isSavedSuccess ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Star className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Save as My Target</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={onClose}
              className="rounded-lg border border-neutral-800 p-2 text-neutral-400 hover:border-neutral-700 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stream Filter & Search Ribbon */}
        <div className="border-b border-neutral-800/90 bg-[#141722] px-5 sm:px-7 py-3 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Stream category chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
            {streamCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeStreamFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveStreamFilter(cat.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold shrink-0 transition-all ${
                    isActive
                      ? 'bg-emerald-400 text-neutral-950 font-bold shadow-sm'
                      : 'border border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search courses (B.Tech, BCA, MBBS, B.Com, LLB)..."
              value={searchDegreeQuery}
              onChange={(e) => setSearchDegreeQuery(e.target.value)}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-950/70 pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Horizontal Degree Quick Selector */}
        <div className="border-b border-neutral-800/70 bg-[#11131a] px-5 sm:px-7 py-2.5 shrink-0 flex items-center gap-2 overflow-x-auto scrollbar-thin">
          <span className="text-[11px] font-mono uppercase text-neutral-500 shrink-0 font-semibold mr-1">
            Pick Course:
          </span>
          {filteredDegrees.map((deg) => {
            const isSelected = selectedDegree.id === deg.id;
            return (
              <button
                key={deg.id}
                onClick={() => handleSelectDegree(deg)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold shrink-0 transition-all ${
                  isSelected
                    ? 'border border-emerald-500/60 bg-emerald-950/40 text-emerald-300 font-bold shadow-sm'
                    : 'border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <GraduationCap className={`h-3.5 w-3.5 ${isSelected ? 'text-emerald-400' : 'text-neutral-500'}`} />
                <span className="whitespace-nowrap">{deg.code || deg.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin">
          {/* Selected Course Snapshot Card */}
          <div className="rounded-2xl border border-neutral-800 bg-gradient-to-r from-[#141720] via-[#12151d] to-[#0f1118] p-5 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-mono font-bold text-emerald-400">
                    🎓 Interested Course: {selectedDegree.code}
                  </span>
                  <span className="text-xs text-neutral-400">• {selectedDegree.duration}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {selectedDegree.title}
                </h3>
                <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
                  {selectedDegree.category} • Prepares you for {topJobsForDegree.length} direct high-demand career pathways upon graduation.
                </p>
              </div>

              {/* Salary Reality Gauge */}
              <div className="w-full lg:w-auto shrink-0 rounded-xl border border-neutral-800 bg-neutral-900/90 p-4 min-w-[280px]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-neutral-400 font-semibold uppercase">Expected Starting Package</span>
                  <span className="text-emerald-400 font-bold font-mono">
                    {selectedDegree.startingSalaryRange || '₹6.5L – ₹18L LPA'}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden my-2">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-3/4 rounded-full" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Freshers: ₹5L - ₹12L</span>
                  <span className="text-neutral-500">Tier-1 Apex: ₹18L - ₹35L+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Top Campus Placement Jobs for this Course */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-emerald-400" />
                Top Campus Placement Roles After {selectedDegree.code || 'This Degree'}
              </h4>
              <span className="text-xs text-neutral-500">
                Click any role to see companies & preparation details
              </span>
            </div>

            {/* Grid of Job Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {topJobsForDegree.map((job, jIdx) => {
                const isSelected = selectedJobIndex === jIdx;
                const startingCTC = job.salaryProspects?.entryLevel?.split('(')[0]?.trim() || '₹8L – ₹18L';

                return (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJobIndex(jIdx)}
                    className={`flex flex-col text-left p-4 rounded-xl border transition-all relative group ${
                      isSelected
                        ? 'border-emerald-400 bg-gradient-to-b from-emerald-950/30 to-[#141822] shadow-lg ring-1 ring-emerald-400/40 translate-y-[-2px]'
                        : 'border-neutral-800 bg-[#13161f] text-neutral-300 hover:border-neutral-700 hover:bg-[#161a25]'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    )}

                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1 line-clamp-1">
                      {job.category.split('&')[0]}
                    </span>

                    <h5 className="text-sm font-bold text-white mb-2 line-clamp-1 group-hover:text-emerald-300 transition">
                      {job.title}
                    </h5>

                    {/* Starting Salary */}
                    <div className="mb-3">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase block">Starting CTC:</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {startingCTC}
                      </span>
                    </div>

                    {/* Top Companies */}
                    <div className="mt-auto pt-2.5 border-t border-neutral-800/80 w-full space-y-1">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase block">Top Recruiters:</span>
                      <div className="flex flex-wrap gap-1">
                        {job.topRecruiters.slice(0, 2).map((rec, rIdx) => (
                          <span
                            key={rIdx}
                            className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-800/90 text-neutral-300"
                          >
                            {rec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Focused Job Deep Dive Card */}
          {activeCareer && (
            <div className="rounded-2xl border border-neutral-800 bg-[#141720] p-5 sm:p-7 space-y-5 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                      Selected Target Role
                    </span>
                    <span className="text-xs text-neutral-400">• {activeCareer.sector}</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-white mt-1">
                    {activeCareer.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  {onAskAI && (
                    <button
                      onClick={() =>
                        onAskAI(
                          `I am studying "${selectedDegree.title}" (${selectedDegree.code}). What are the exact steps and top 3 technical skills I must learn during college to get placed as a "${activeCareer.title}"?`
                        )
                      }
                      className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-neutral-800 transition active:scale-95 shadow-sm"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Ask AI Counsellor</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 3 Key Columns: Skills, Hiring Companies & Work Environment */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Column 1: Core Placement Skills */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                    <Code2 className="h-4 w-4" />
                    <span>Must-Have Skills to Crack Placement:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCareer.keySkills.slice(0, 5).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded-md border border-neutral-700/80 bg-neutral-800 px-2 py-1 text-xs font-mono text-neutral-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-neutral-400 pt-1">
                    Master these core concepts during college coursework and self-study to clear technical screenings.
                  </p>
                </div>

                {/* Column 2: Top Campus Hiring Companies */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold uppercase">
                    <Building2 className="h-4 w-4" />
                    <span>Top Companies Hiring This Role:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCareer.topRecruiters.map((comp, cIdx) => (
                      <span
                        key={cIdx}
                        className="rounded-md border border-neutral-700 bg-neutral-800 px-2 py-1 text-xs text-white font-mono"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-neutral-400 pt-1">
                    Visit campuses for Day-Zero and Day-One recruitment drives across Tier 1, 2, and 3 institutes.
                  </p>
                </div>

                {/* Column 3: Salary Reality Breakdown */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
                    <TrendingUp className="h-4 w-4" />
                    <span>Salary Growth Trajectory:</span>
                  </div>
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-neutral-800">
                      <span className="text-neutral-400">Entry Level (0-2 Yrs):</span>
                      <span className="text-emerald-400 font-bold">
                        {activeCareer.salaryProspects.entryLevel.split('(')[0].trim()}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-800">
                      <span className="text-neutral-400">Mid-Career (3-6 Yrs):</span>
                      <span className="text-white font-bold">
                        {activeCareer.salaryProspects.midLevel.split('(')[0].trim()}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-neutral-400">Senior Role (7+ Yrs):</span>
                      <span className="text-cyan-400 font-bold">
                        {activeCareer.salaryProspects.seniorLevel.split('(')[0].trim()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Recruiters Look For */}
              <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    Recruiter Placement Advice:
                  </span>
                  <p className="text-xs text-neutral-400">
                    Maintain at least 7.5+ CGPA without active backlogs to remain eligible for 90%+ corporate campus placement drives.
                  </p>
                </div>

                <button
                  onClick={() => setShowDetailedBlueprint(!showDetailedBlueprint)}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 border border-emerald-500/30 px-3 py-1.5 rounded-lg shrink-0 transition"
                >
                  <span>{showDetailedBlueprint ? 'Hide Detailed Launchpad' : 'View Full 6-Stage Launchpad'}</span>
                  {showDetailedBlueprint ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>
              </div>

              {/* Collapsible Deep 6-Stage Execution Hub */}
              {showDetailedBlueprint && (
                <div className="pt-4 border-t border-neutral-800 animate-in fade-in duration-200">
                  <CareerExecutionHub
                    career={activeCareer}
                    selectedDegree={selectedDegree}
                    onAskAI={onAskAI}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
