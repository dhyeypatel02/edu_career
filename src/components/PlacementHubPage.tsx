import React, { useState, useMemo } from 'react';
import {
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
  Code2,
  ShieldCheck,
  Compass,
  Calendar,
  Layers,
  Award,
  Filter,
} from 'lucide-react';
import { Career, Degree, Stream, UserProfile } from '../types/career';
import {
  CAREERS_DATA,
  DEGREES_DATA,
  getDegreeById,
  getCareersByDegree,
} from '../data';
import { Header } from './Header';
import { CareerExecutionHub } from './CareerExecutionHub';

interface PlacementHubPageProps {
  user: UserProfile | null;
  initialCareer?: Career | null;
  selectedDegree?: Degree | null;
  savedCount: number;
  onGoHome: () => void;
  onGoToPathways: () => void;
  onOpenSearch: () => void;
  onOpenAICounsellor: () => void;
  onOpenCompare: () => void;
  onOpenBookmarks: () => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onAskAI?: (prompt: string) => void;
  onSaveGoal?: (career: Career, degree: Degree) => void;
  onExploreInRoadmap: (degree: Degree, career: Career) => void;
}

export const PlacementHubPage: React.FC<PlacementHubPageProps> = ({
  user,
  initialCareer,
  selectedDegree: propSelectedDegree,
  savedCount,
  onGoHome,
  onGoToPathways,
  onOpenSearch,
  onOpenAICounsellor,
  onOpenCompare,
  onOpenBookmarks,
  onOpenAuth,
  onOpenProfile,
  onAskAI,
  onSaveGoal,
  onExploreInRoadmap,
}) => {
  // Determine default degree
  const defaultDegree = useMemo(() => {
    if (propSelectedDegree) return propSelectedDegree;
    if (user?.savedPathway?.degreeId) {
      const found = getDegreeById(user.savedPathway.degreeId);
      if (found) return found;
    }
    if (initialCareer?.primaryDegreeIds?.[0]) {
      const found = getDegreeById(initialCareer.primaryDegreeIds[0]);
      if (found) return found;
    }
    // Default to popular Indian degree (B.Tech CSE or ECE)
    return DEGREES_DATA.find((d) => d.id === 'btech-cse') || DEGREES_DATA[0];
  }, [propSelectedDegree, user, initialCareer]);

  const [activeDegree, setActiveDegree] = useState<Degree>(defaultDegree);
  const [activeStreamFilter, setActiveStreamFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobIndex, setSelectedJobIndex] = useState<number>(0);
  const [showDetailedBlueprint, setShowDetailedBlueprint] = useState(false);
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  // Stream categories with icons
  const streamCategories = [
    { id: 'all', label: 'All Courses', icon: Compass },
    { id: 'science-pcm', label: 'Tech & Engineering', icon: Code2 },
    { id: 'science-pcb', label: 'Medical & Healthcare', icon: Zap },
    { id: 'commerce', label: 'Commerce & Finance', icon: TrendingUp },
    { id: 'arts-humanities', label: 'Law & Humanities', icon: Building2 },
  ];

  // Quick course presets for instant 1-click access
  const quickCourses = [
    { id: 'btech-cse', label: 'B.Tech CSE' },
    { id: 'btech-ece', label: 'B.Tech ECE / EC' },
    { id: 'btech-ic', label: 'B.Tech IC' },
    { id: 'btech-ict', label: 'B.Tech ICT' },
    { id: 'btech-eee', label: 'B.Tech EEE' },
    { id: 'btech-civil', label: 'B.Tech Civil' },
    { id: 'mbbs', label: 'MBBS' },
    { id: 'ca-foundation', label: 'CA' },
    { id: 'ba-llb', label: 'BA LLB (Law)' },
  ];

  // Filter degrees
  const filteredDegrees = useMemo(() => {
    return DEGREES_DATA.filter((d) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.careerOpportunities.some((s) => s.toLowerCase().includes(q));

      const matchesStream =
        activeStreamFilter === 'all' ||
        d.streamIds.some((s) => s.includes(activeStreamFilter) || activeStreamFilter.includes(s));

      return matchesSearch && matchesStream;
    });
  }, [searchQuery, activeStreamFilter]);

  // Top campus placement jobs for active degree
  const topJobsForDegree = useMemo(() => {
    const directCareers = getCareersByDegree(activeDegree);
    const fallbackCareers = CAREERS_DATA.filter(
      (c) =>
        !directCareers.some((dc) => dc.id === c.id) &&
        c.streamIds.some((s) => activeDegree.streamIds.includes(s))
    );
    const combined = [...directCareers, ...fallbackCareers];
    return combined.slice(0, 4);
  }, [activeDegree]);

  const activeCareer = topJobsForDegree[selectedJobIndex] || topJobsForDegree[0] || CAREERS_DATA[0];

  const handleSelectDegree = (deg: Degree) => {
    setActiveDegree(deg);
    setSelectedJobIndex(0);
    setShowDetailedBlueprint(false);
  };

  const handleSaveGoal = () => {
    if (onSaveGoal && activeCareer) {
      onSaveGoal(activeCareer, activeDegree);
      setIsSavedSuccess(true);
      setTimeout(() => setIsSavedSuccess(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#f1f3f7] flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeTab="placement-hub"
        onReset={() => {}}
        onGoHome={onGoHome}
        onGoToPathways={onGoToPathways}
        onOpenPlacementHub={() => {}}
        onOpenSearch={onOpenSearch}
        onOpenAICounsellor={onOpenAICounsellor}
        onOpenCompare={onOpenCompare}
        onOpenBookmarks={onOpenBookmarks}
        savedCount={savedCount}
        user={user}
        onOpenAuth={onOpenAuth}
        onOpenProfile={onOpenProfile}
      />

      {/* Main Placement Hub Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Hero Banner */}
        <div className="relative rounded-2xl border border-neutral-800 bg-gradient-to-r from-[#121622] via-[#0f121a] to-[#12151f] p-6 sm:p-8 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-mono font-bold text-emerald-400">
                <Zap className="h-3.5 w-3.5 text-emerald-400" />
                <span>Placement Hub • Course-to-Job Navigator</span>
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                Indian Engineering & Professional Courses
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Course Placement Outcomes & Career Intelligence
              </h1>
              <p className="text-sm text-neutral-400 max-w-3xl leading-relaxed">
                Explore campus placement packages, top recruiting companies, and core tech stacks across Indian engineering degrees including <strong>EC, IC, ICT, CSE, EEE, Civil</strong>, as well as Medical, Commerce, and Law programs.
              </p>
            </div>

            {/* Quick Course Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase text-neutral-500 font-semibold mr-1">
                Popular Courses:
              </span>
              {quickCourses.map((qc) => {
                const targetDegree = DEGREES_DATA.find((d) => d.id === qc.id);
                if (!targetDegree) return null;
                const isSelected = activeDegree.id === targetDegree.id;
                return (
                  <button
                    key={qc.id}
                    onClick={() => handleSelectDegree(targetDegree)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                      isSelected
                        ? 'border border-emerald-400/80 bg-emerald-500/20 text-emerald-300 font-bold shadow-sm'
                        : 'border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    {qc.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filter Ribbon & Live Search Bar */}
        <div className="rounded-xl border border-neutral-800 bg-[#131620] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
          {/* Stream Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
            {streamCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeStreamFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveStreamFilter(cat.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold shrink-0 transition-all ${
                    isActive
                      ? 'bg-emerald-400 text-neutral-950 font-bold shadow-sm'
                      : 'border border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by degree code, title, or branch (e.g. EC, IC, ICT, CSE)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-950/80 pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-xs text-neutral-500 hover:text-neutral-300"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Mobile Course Switcher Carousel (Visible strictly on mobile & tablet < lg, completely hidden on PC) */}
        <div className="lg:hidden rounded-xl border border-neutral-800 bg-[#12151e] p-3 space-y-2 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4 text-emerald-400" />
              Pick Course ({filteredDegrees.length}):
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">Tap to switch course</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {filteredDegrees.map((deg) => {
              const isSelected = activeDegree.id === deg.id;
              return (
                <button
                  key={deg.id}
                  onClick={() => handleSelectDegree(deg)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                    isSelected
                      ? 'border border-emerald-400 bg-emerald-950/60 text-emerald-300 font-bold shadow-sm'
                      : 'border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <GraduationCap className={`h-3.5 w-3.5 ${isSelected ? 'text-emerald-400' : 'text-neutral-500'}`} />
                  <span>{deg.code}</span>
                  <span className="text-[10px] font-mono text-neutral-400">({deg.duration})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Responsive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Course Directory (Visible on PC/Desktop lg:col-span-4, hidden on small screens) */}
          <div className="hidden lg:block lg:col-span-4 rounded-2xl border border-neutral-800 bg-[#12151e] p-4 space-y-3 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80 px-1">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-emerald-400" />
                <h2 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Available Degrees
                </h2>
              </div>
              <span className="rounded bg-neutral-800 px-2 py-0.5 text-[11px] font-mono text-neutral-400">
                {filteredDegrees.length} Courses
              </span>
            </div>

            {/* Scrollable list of Degrees */}
            <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredDegrees.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 text-xs">
                  No courses found matching "{searchQuery}".
                </div>
              ) : (
                filteredDegrees.map((deg) => {
                  const isSelected = activeDegree.id === deg.id;
                  const startingSalary = deg.startingSalaryRange?.split('(')[0] || '₹6L - ₹18L';

                  return (
                    <button
                      key={deg.id}
                      onClick={() => handleSelectDegree(deg)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col gap-1.5 ${
                        isSelected
                          ? 'border-emerald-500/80 bg-gradient-to-r from-emerald-950/40 to-[#141824] shadow-md ring-1 ring-emerald-500/30'
                          : 'border-neutral-800/80 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700 hover:bg-[#161a25]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isSelected ? 'text-emerald-300' : 'text-white'
                          }`}
                        >
                          {deg.code}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800/90 px-1.5 py-0.5 rounded">
                          {deg.duration}
                        </span>
                      </div>

                      <div className="text-xs font-medium text-neutral-200 line-clamp-1">
                        {deg.title}
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-neutral-800/60 text-[11px]">
                        <span className="text-neutral-500 font-mono">Starting CTC:</span>
                        <span className="font-mono text-emerald-400 font-semibold">
                          {startingSalary}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: In-Depth Placement Intelligence (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Selected Course Overview Card */}
            <div className="rounded-2xl border border-neutral-800 bg-[#12151e] p-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-neutral-800">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-400">
                      🎓 {activeDegree.code}
                    </span>
                    <span className="text-xs text-neutral-400">• {activeDegree.duration}</span>
                    <span className="text-xs text-neutral-400">• {activeDegree.category}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {activeDegree.title}
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-xl leading-relaxed">
                    {`${activeDegree.title} (${activeDegree.duration}) provides comprehensive academic and technical preparation for campus recruitment and high-growth professional roles.`}
                  </p>
                </div>

                {/* Salary Reality Gauge */}
                <div className="w-full sm:w-auto shrink-0 rounded-xl border border-neutral-800 bg-neutral-900/90 p-4 sm:min-w-[260px]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-neutral-400 font-semibold uppercase">
                      Starting Package
                    </span>
                    <span className="text-emerald-400 font-bold font-mono">
                      {activeDegree.startingSalaryRange || '₹6.5L – ₹18L LPA'}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden my-2">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-3/4 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                    <span>Freshers: ₹5L - ₹12L</span>
                    <span className="text-neutral-500">Tier-1 Apex: ₹18L - ₹35L+</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Explore in Roadmap */}
                  <button
                    onClick={() => onExploreInRoadmap(activeDegree, activeCareer)}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-3.5 py-2 text-xs font-bold text-neutral-950 transition shadow-md active:scale-95"
                  >
                    <span>Explore 4-Step Roadmap</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  {/* Save Target Goal */}
                  {onSaveGoal && (
                    <button
                      onClick={handleSaveGoal}
                      className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white transition active:scale-95"
                    >
                      {isSavedSuccess ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Target Saved!</span>
                        </>
                      ) : (
                        <>
                          <Star className="h-3.5 w-3.5 text-amber-400" />
                          <span>Lock as Target Goal</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Ask AI Placement Question */}
                {onAskAI && (
                  <button
                    onClick={() =>
                      onAskAI(
                        `I am pursuing "${activeDegree.title}" (${activeDegree.code}). What are the key campus placement companies in India, required CGPA, and top 3 technical skills to crack Day-1 recruitment for "${activeCareer.title}"?`
                      )
                    }
                    className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-3 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-900/40 transition active:scale-95"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Ask AI Placement Counsellor</span>
                  </button>
                )}
              </div>
            </div>

            {/* Top Campus Placement Roles (Interactive Cards) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-emerald-400" />
                  Top Campus Placement Roles After {activeDegree.code}
                </h4>
                <span className="text-xs text-neutral-500">
                  Select a role below for detailed hiring breakdown
                </span>
              </div>

              {/* Grid of Job Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {topJobsForDegree.map((job, jIdx) => {
                  const isSelected = selectedJobIndex === jIdx;
                  const startingCTC =
                    job.salaryProspects?.entryLevel?.split('(')[0]?.trim() || '₹8L – ₹18L';

                  return (
                    <button
                      key={job.id}
                      onClick={() => setSelectedJobIndex(jIdx)}
                      className={`flex flex-col text-left p-3.5 rounded-xl border transition-all relative group ${
                        isSelected
                          ? 'border-emerald-400 bg-gradient-to-b from-emerald-950/40 to-[#141822] shadow-lg ring-1 ring-emerald-400/40 translate-y-[-2px]'
                          : 'border-neutral-800 bg-[#12151e] text-neutral-300 hover:border-neutral-700 hover:bg-[#161a25]'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      )}

                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1 line-clamp-1">
                        {job.category.split('&')[0]}
                      </span>

                      <h5 className="text-xs font-bold text-white mb-2 line-clamp-1 group-hover:text-emerald-300 transition">
                        {job.title}
                      </h5>

                      <div className="mb-2">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase block">
                          Starting CTC:
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {startingCTC}
                        </span>
                      </div>

                      <div className="mt-auto pt-2 border-t border-neutral-800/80 w-full">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">
                          Recruiters:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {job.topRecruiters.slice(0, 2).map((rec, rIdx) => (
                            <span
                              key={rIdx}
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800/90 text-neutral-300"
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
              <div className="rounded-2xl border border-neutral-800 bg-[#12151e] p-6 space-y-6 shadow-xl animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                        Active Target Role
                      </span>
                      <span className="text-xs text-neutral-400">• {activeCareer.sector}</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-black text-white mt-1">
                      {activeCareer.title}
                    </h4>
                  </div>

                  <span className="text-xs font-mono text-neutral-400">
                    Indian Placement Benchmark
                  </span>
                </div>

                {/* 3 Key Panels: Skills, Hiring Companies & Salary Trajectory */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Must-Have Skills */}
                  <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                      <Code2 className="h-4 w-4" />
                      <span>Must-Have Placement Skills:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCareer.keySkills.slice(0, 6).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="rounded-md border border-neutral-700/80 bg-neutral-800 px-2 py-1 text-xs font-mono text-neutral-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-neutral-400 pt-1">
                      Clear technical screening rounds and online assessments (OA) by mastering these core toolchains.
                    </p>
                  </div>

                  {/* Top Companies */}
                  <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold uppercase">
                      <Building2 className="h-4 w-4" />
                      <span>Top Recruiting Companies:</span>
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
                      Active campus recruiters across Tier 1, 2, and 3 universities in India.
                    </p>
                  </div>

                  {/* Salary Growth */}
                  <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
                      <TrendingUp className="h-4 w-4" />
                      <span>Salary Growth Trajectory:</span>
                    </div>
                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between py-1 border-b border-neutral-800">
                        <span className="text-neutral-400">Entry (0-2 Yrs):</span>
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
                        <span className="text-neutral-400">Senior (7+ Yrs):</span>
                        <span className="text-cyan-400 font-bold">
                          {activeCareer.salaryProspects.seniorLevel.split('(')[0].trim()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4-Year College Placement Strategy Timeline */}
                <div className="rounded-xl border border-neutral-800 bg-[#0e1017] p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                    <Calendar className="h-4 w-4" />
                    <span>4-Year Placement Masterplan for {activeDegree.code}:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 space-y-1">
                      <span className="font-mono text-emerald-400 font-bold block text-[11px]">
                        Year 1: Foundation
                      </span>
                      <p className="text-neutral-300">
                        Target 8.0+ CGPA. Learn C/C++ or Python and solidify core mathematics & engineering basics.
                      </p>
                    </div>

                    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 space-y-1">
                      <span className="font-mono text-teal-400 font-bold block text-[11px]">
                        Year 2: Domain Skills
                      </span>
                      <p className="text-neutral-300">
                        Dive into branch labs (circuits/VLSI/DSA/DCS). Build 2 verifiable GitHub or lab projects.
                      </p>
                    </div>

                    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 space-y-1">
                      <span className="font-mono text-cyan-400 font-bold block text-[11px]">
                        Year 3: Internships
                      </span>
                      <p className="text-neutral-300">
                        Secure summer industrial internships, crack aptitude tests, and polish technical interview skills.
                      </p>
                    </div>

                    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 space-y-1">
                      <span className="font-mono text-amber-400 font-bold block text-[11px]">
                        Year 4: Campus Drives
                      </span>
                      <p className="text-neutral-300">
                        Appear for Day-0/1 drives, convert pre-placement offers (PPO), and target dream CTC packages.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recruiter Placement Advice & Toggle for 6-Stage Execution Hub */}
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
                    <span>
                      {showDetailedBlueprint
                        ? 'Hide Detailed Execution Blueprint'
                        : 'View Full 6-Stage Execution Blueprint'}
                    </span>
                    {showDetailedBlueprint ? (
                      <ChevronUp className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {/* Collapsible Deep 6-Stage Execution Hub */}
                {showDetailedBlueprint && (
                  <div className="pt-4 border-t border-neutral-800 animate-in fade-in duration-200">
                    <CareerExecutionHub
                      career={activeCareer}
                      selectedDegree={activeDegree}
                      onAskAI={onAskAI}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-neutral-800/80 bg-[#0c0e12] py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight">
                Edu Career<span className="text-emerald-400">.</span>
              </span>
              <span className="text-neutral-500">— Placement & Career Launchpad</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-neutral-400 font-mono text-[11px]">
              <span>Grounded in:</span>
              <span className="text-neutral-300">NEP 2020</span>
              <span>•</span>
              <span className="text-neutral-300">UGC / AICTE</span>
              <span>•</span>
              <span className="text-neutral-300">Top Indian University Placements</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
