import React, { useState, useMemo } from 'react';
import {
  Zap,
  Search,
  Sparkles,
  GraduationCap,
  Briefcase,
  ArrowRight,
  ArrowLeft,
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
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock,
  Cpu,
  HeartPulse,
  Palette,
  Scale,
  FlaskConical,
  Dna,
  Calculator,
  Terminal,
  Wrench,
  Receipt,
  BookOpen,
  Coins,
  Globe,
  Binary,
  Stethoscope,
  Landmark,
  BookMarked,
  SlidersHorizontal,
} from 'lucide-react';
import { Career, Degree, Stream, UserProfile } from '../types/career';
import {
  CAREERS_DATA,
  DEGREES_DATA,
  getDegreeById,
  getCareersByDegree,
  PLACEMENT_QUESTIONS,
  DOMAIN_SUBJECT_PROFILES,
  computePlacementRecommendations,
  MatchResultItem,
  EliminatedSubject,
  HighYieldPlacementSubject,
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
  // Hub main view: 'smart-match' (AI career questionnaire & subject pruning) or 'all-degrees' (Manual course explorer)
  const [activeHubView, setActiveHubView] = useState<'smart-match' | 'all-degrees'>('smart-match');

  // Interactive Questionnaire state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState<boolean>(true);

  // User question answers
  const [selectedDomain, setSelectedDomain] = useState<string>('tech_software');
  const [selectedAvoidSubjects, setSelectedAvoidSubjects] = useState<string[]>([
    'avoid_chem',
    'avoid_workshop_mech',
  ]);
  const [selectedPriority, setSelectedPriority] = useState<string>('priority_high_ctc');
  const [selectedStream, setSelectedStream] = useState<string>('stream_pcm');

  // Result display state
  const [activeResultsTab, setActiveResultsTab] = useState<
    'recommended' | 'similar' | 'subject-pruning' | 'degrees'
  >('recommended');
  const [selectedCareerIndex, setSelectedCareerIndex] = useState<number>(0);
  const [showDetailedBlueprint, setShowDetailedBlueprint] = useState(false);
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Manual degrees view state
  const defaultDegree = useMemo(() => {
    if (propSelectedDegree) return propSelectedDegree;
    if (user?.savedPathway?.degreeId) {
      const found = getDegreeById(user.savedPathway.degreeId);
      if (found) return found;
    }
    return DEGREES_DATA.find((d) => d.id === 'btech-cse') || DEGREES_DATA[0];
  }, [propSelectedDegree, user]);

  const [activeManualDegree, setActiveManualDegree] = useState<Degree>(defaultDegree);
  const [manualStreamFilter, setManualStreamFilter] = useState<string>('all');
  const [manualSearchQuery, setManualSearchQuery] = useState('');
  const [manualJobIndex, setManualJobIndex] = useState<number>(0);

  // Stream categories for manual view
  const streamCategories = [
    { id: 'all', label: 'All Courses', icon: Compass },
    { id: 'science-pcm', label: 'Tech & Engineering', icon: Code2 },
    { id: 'science-pcb', label: 'Medical & Healthcare', icon: Zap },
    { id: 'commerce', label: 'Commerce & Finance', icon: TrendingUp },
    { id: 'arts-humanities', label: 'Law & Humanities', icon: Building2 },
  ];

  // Quick course presets for instant access
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

  // Dynamic recommendation calculation based on answers
  const recommendationSummary = useMemo(() => {
    return computePlacementRecommendations(
      selectedDomain,
      selectedAvoidSubjects,
      selectedPriority,
      selectedStream
    );
  }, [selectedDomain, selectedAvoidSubjects, selectedPriority, selectedStream]);

  // Active career list depending on results tab
  const activeCareerList: MatchResultItem[] = useMemo(() => {
    let list: MatchResultItem[] = [];
    if (activeResultsTab === 'similar') {
      list = recommendationSummary.similarFields;
    } else {
      list = recommendationSummary.topRecommended;
    }

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.career.title.toLowerCase().includes(q) ||
          item.career.category.toLowerCase().includes(q) ||
          item.recommendedDegree.title.toLowerCase().includes(q) ||
          item.career.topRecruiters.some((r) => r.toLowerCase().includes(q))
      );
    }

    return list;
  }, [activeResultsTab, recommendationSummary, searchFilter]);

  const activeMatchItem: MatchResultItem | undefined =
    activeCareerList[selectedCareerIndex] ||
    activeCareerList[0] ||
    recommendationSummary.topRecommended[0];

  const activeCareer = activeMatchItem?.career;
  const activeDegree = activeMatchItem?.recommendedDegree || defaultDegree;

  // Toggle multi-select subject avoid chips
  const handleToggleAvoidSubject = (subjectId: string) => {
    setSelectedAvoidSubjects((prev) =>
      prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId]
    );
  };

  // Quick Preset Handlers
  const handleApplyPreset = (preset: 'software' | 'fintech' | 'uiux' | 'healthcare') => {
    if (preset === 'software') {
      setSelectedDomain('tech_software');
      setSelectedAvoidSubjects(['avoid_chem', 'avoid_workshop_mech', 'avoid_bio']);
      setSelectedPriority('priority_high_ctc');
      setSelectedStream('stream_pcm');
    } else if (preset === 'fintech') {
      setSelectedDomain('finance_business');
      setSelectedAvoidSubjects(['avoid_chem', 'avoid_bio', 'avoid_workshop_mech']);
      setSelectedPriority('priority_high_ctc');
      setSelectedStream('stream_commerce');
    } else if (preset === 'uiux') {
      setSelectedDomain('design_product');
      setSelectedAvoidSubjects(['avoid_hard_math', 'avoid_chem', 'avoid_heavy_code']);
      setSelectedPriority('priority_remote_global');
      setSelectedStream('stream_any');
    } else if (preset === 'healthcare') {
      setSelectedDomain('healthcare_medical');
      setSelectedAvoidSubjects(['avoid_hard_math', 'avoid_heavy_code', 'avoid_workshop_mech']);
      setSelectedPriority('priority_stability');
      setSelectedStream('stream_pcb');
    }
    setCurrentStep(4);
    setIsQuestionnaireOpen(false);
  };

  const handleSaveGoal = () => {
    if (onSaveGoal && activeCareer && activeDegree) {
      onSaveGoal(activeCareer, activeDegree);
      setIsSavedSuccess(true);
      setTimeout(() => setIsSavedSuccess(false), 2500);
    }
  };

  // Helper icon renderer
  const renderIcon = (iconName: string, className = 'h-4 w-4') => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'TrendingUp':
        return <TrendingUp className={className} />;
      case 'HeartPulse':
        return <HeartPulse className={className} />;
      case 'Palette':
        return <Palette className={className} />;
      case 'Scale':
        return <Scale className={className} />;
      case 'FlaskConical':
        return <FlaskConical className={className} />;
      case 'Dna':
        return <Dna className={className} />;
      case 'Calculator':
        return <Calculator className={className} />;
      case 'Terminal':
        return <Terminal className={className} />;
      case 'Wrench':
        return <Wrench className={className} />;
      case 'Receipt':
        return <Receipt className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'Coins':
        return <Coins className={className} />;
      case 'Globe':
        return <Globe className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Binary':
        return <Binary className={className} />;
      case 'Stethoscope':
        return <Stethoscope className={className} />;
      case 'Landmark':
        return <Landmark className={className} />;
      case 'BookMarked':
        return <BookMarked className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  // Filter degrees for manual view
  const manualFilteredDegrees = useMemo(() => {
    return DEGREES_DATA.filter((d) => {
      const q = manualSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.careerOpportunities.some((s) => s.toLowerCase().includes(q));

      const matchesStream =
        manualStreamFilter === 'all' ||
        d.streamIds.some(
          (s) => s.includes(manualStreamFilter) || manualStreamFilter.includes(s)
        );

      return matchesSearch && matchesStream;
    });
  }, [manualSearchQuery, manualStreamFilter]);

  const manualTopJobs = useMemo(() => {
    const directCareers = getCareersByDegree(activeManualDegree);
    const fallbackCareers = CAREERS_DATA.filter(
      (c) =>
        !directCareers.some((dc) => dc.id === c.id) &&
        c.streamIds.some((s) => activeManualDegree.streamIds.includes(s))
    );
    return [...directCareers, ...fallbackCareers].slice(0, 4);
  }, [activeManualDegree]);

  const activeManualCareer = manualTopJobs[manualJobIndex] || manualTopJobs[0] || CAREERS_DATA[0];

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

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Hero Banner with Mode Selector */}
        <div className="relative rounded-2xl border border-neutral-800 bg-gradient-to-r from-[#121622] via-[#0f121a] to-[#12151f] p-6 sm:p-8 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/50 px-3 py-1 text-xs font-mono font-bold text-emerald-400">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Smart Placement Engine • AI Subject Pruner</span>
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  Day-1 Campus Recruitment & CTC Intelligence
                </span>
              </div>

              {/* Mode Toggle Pills */}
              <div className="flex items-center bg-neutral-900/90 border border-neutral-800 rounded-xl p-1 gap-1">
                <button
                  onClick={() => setActiveHubView('smart-match')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeHubView === 'smart-match'
                      ? 'bg-emerald-500 text-neutral-950 font-bold shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Smart Match & Subject Pruning</span>
                </button>
                <button
                  onClick={() => setActiveHubView('all-degrees')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeHubView === 'all-degrees'
                      ? 'bg-emerald-500 text-neutral-950 font-bold shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                  <span>Browse All 40+ Degrees</span>
                </button>
              </div>
            </div>

            <div className="space-y-2 max-w-4xl">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                {activeHubView === 'smart-match'
                  ? 'Answer 4 Quick Questions — Prune Unnecessary Subjects & Discover Your Top Placement Fields'
                  : 'Indian Degree Directory & Campus Placement Packages'}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {activeHubView === 'smart-match'
                  ? 'Our intelligent engine eliminates irrelevant subjects, cuts curriculum clutter, and recommends the exact high-growth career fields, similar alternatives, and core high-yield subjects needed to crack top campus offers.'
                  : 'Explore starting salary packages, hiring companies, eligibility, and 4-year timelines for engineering branches (EC, IC, ICT, CSE, Civil) as well as Medicine, Commerce, and Law.'}
              </p>
            </div>

            {/* Quick 1-Click Profiler Presets */}
            {activeHubView === 'smart-match' && (
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono uppercase text-neutral-500 font-semibold mr-1">
                  1-Click Instant Profiles:
                </span>
                <button
                  onClick={() => handleApplyPreset('software')}
                  className="rounded-lg px-2.5 py-1 text-xs font-medium border border-neutral-800 bg-neutral-900/80 hover:border-emerald-500/50 hover:text-emerald-300 text-neutral-300 transition"
                >
                  💻 Software & AI (No Chemistry)
                </button>
                <button
                  onClick={() => handleApplyPreset('fintech')}
                  className="rounded-lg px-2.5 py-1 text-xs font-medium border border-neutral-800 bg-neutral-900/80 hover:border-teal-500/50 hover:text-teal-300 text-neutral-300 transition"
                >
                  📈 FinTech & Investment (No Labs)
                </button>
                <button
                  onClick={() => handleApplyPreset('uiux')}
                  className="rounded-lg px-2.5 py-1 text-xs font-medium border border-neutral-800 bg-neutral-900/80 hover:border-amber-500/50 hover:text-amber-300 text-neutral-300 transition"
                >
                  🎨 UI/UX & Design (No Hard Math)
                </button>
                <button
                  onClick={() => handleApplyPreset('healthcare')}
                  className="rounded-lg px-2.5 py-1 text-xs font-medium border border-neutral-800 bg-neutral-900/80 hover:border-cyan-500/50 hover:text-cyan-300 text-neutral-300 transition"
                >
                  🩺 Clinical Medicine (No Coding)
                </button>
                <button
                  onClick={() => {
                    setIsQuestionnaireOpen(!isQuestionnaireOpen);
                  }}
                  className="rounded-lg px-2.5 py-1 text-xs font-bold border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40 transition flex items-center gap-1 ml-auto"
                >
                  <SlidersHorizontal className="h-3 w-3" />
                  <span>{isQuestionnaireOpen ? 'Minimize Questions' : '✏️ Tweak Questions'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* VIEW 1: SMART MATCH QUESTIONNAIRE & DYNAMIC PLACEMENT ENGINE   */}
        {/* ============================================================== */}
        {activeHubView === 'smart-match' && (
          <div className="space-y-6">
            {/* 4-Step Interactive Questionnaire Card */}
            {isQuestionnaireOpen && (
              <div className="rounded-2xl border border-neutral-800 bg-[#12151e] p-6 shadow-xl relative overflow-hidden transition-all duration-300">
                {/* Step indicator header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500 text-neutral-950 font-mono font-black text-xs">
                      {currentStep}
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                        Question {currentStep} of 4: {PLACEMENT_QUESTIONS[currentStep - 1]?.title}
                      </h2>
                      <p className="text-xs text-neutral-400">
                        {PLACEMENT_QUESTIONS[currentStep - 1]?.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Step dots */}
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4].map((step) => (
                      <button
                        key={step}
                        onClick={() => setCurrentStep(step)}
                        className={`h-2 rounded-full transition-all ${
                          currentStep === step
                            ? 'w-8 bg-emerald-400'
                            : currentStep > step
                            ? 'w-3 bg-emerald-800'
                            : 'w-2 bg-neutral-800'
                        }`}
                        title={`Go to Question ${step}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question Content */}
                <div className="py-5">
                  {/* STEP 1: CAREER PASSION */}
                  {currentStep === 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {PLACEMENT_QUESTIONS[0].options.map((opt) => {
                        const isSelected = selectedDomain === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setSelectedDomain(opt.id)}
                            className={`p-4 rounded-xl border text-left transition flex flex-col justify-between gap-2.5 relative group ${
                              isSelected
                                ? 'border-emerald-400 bg-gradient-to-br from-emerald-950/50 to-[#141a24] shadow-md ring-1 ring-emerald-400/50'
                                : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-[#151922]'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div
                                className={`p-2 rounded-lg ${
                                  isSelected
                                    ? 'bg-emerald-400 text-neutral-950'
                                    : 'bg-neutral-800 text-neutral-300 group-hover:text-white'
                                }`}
                              >
                                {renderIcon(opt.iconName, 'h-5 w-5')}
                              </div>
                              {opt.badge && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                                  {opt.badge}
                                </span>
                              )}
                            </div>
                            <div>
                              <h3
                                className={`text-sm font-bold ${
                                  isSelected ? 'text-emerald-300' : 'text-white'
                                }`}
                              >
                                {opt.label}
                              </h3>
                              <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                                {opt.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* STEP 2: AVOID / REMOVE UNNECESSARY SUBJECTS */}
                  {currentStep === 2 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-neutral-400 pb-1">
                        <span>Click to select multiple subjects you want eliminated:</span>
                        <span className="font-mono text-emerald-400 font-semibold">
                          {selectedAvoidSubjects.length} subjects marked for removal
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {PLACEMENT_QUESTIONS[1].options.map((opt) => {
                          const isSelected = selectedAvoidSubjects.includes(opt.id);
                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleToggleAvoidSubject(opt.id)}
                              className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 relative ${
                                isSelected
                                  ? 'border-rose-500/80 bg-rose-950/20 text-white shadow-sm ring-1 ring-rose-500/30'
                                  : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700 hover:bg-[#151922]'
                              }`}
                            >
                              <div
                                className={`p-2 rounded-lg shrink-0 ${
                                  isSelected
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-neutral-800 text-neutral-400'
                                }`}
                              >
                                {isSelected ? (
                                  <XCircle className="h-4 w-4" />
                                ) : (
                                  renderIcon(opt.iconName, 'h-4 w-4')
                                )}
                              </div>
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold leading-tight">
                                    {opt.label}
                                  </span>
                                  {isSelected && (
                                    <span className="text-[10px] font-mono font-bold text-rose-400 uppercase bg-rose-950/60 px-1.5 py-0.2 rounded">
                                      Eliminated
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-neutral-400 leading-tight">
                                  {opt.description}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: PLACEMENT PRIORITY */}
                  {currentStep === 3 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {PLACEMENT_QUESTIONS[2].options.map((opt) => {
                        const isSelected = selectedPriority === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setSelectedPriority(opt.id)}
                            className={`p-4 rounded-xl border text-left transition flex flex-col justify-between gap-2 relative ${
                              isSelected
                                ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 shadow-md ring-1 ring-emerald-400/40'
                                : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700 hover:bg-[#151922]'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div
                                className={`p-2 rounded-lg ${
                                  isSelected
                                    ? 'bg-emerald-400 text-neutral-950'
                                    : 'bg-neutral-800 text-neutral-300'
                                }`}
                              >
                                {renderIcon(opt.iconName, 'h-4 w-4')}
                              </div>
                              {opt.badge && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                                  {opt.badge}
                                </span>
                              )}
                            </div>
                            <div>
                              <h3
                                className={`text-xs font-bold ${
                                  isSelected ? 'text-white' : 'text-neutral-200'
                                }`}
                              >
                                {opt.label}
                              </h3>
                              <p className="text-[11px] text-neutral-400 mt-1 leading-tight">
                                {opt.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* STEP 4: ACADEMIC STREAM */}
                  {currentStep === 4 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {PLACEMENT_QUESTIONS[3].options.map((opt) => {
                        const isSelected = selectedStream === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setSelectedStream(opt.id)}
                            className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 relative ${
                              isSelected
                                ? 'border-emerald-400 bg-emerald-950/40 text-white shadow-sm ring-1 ring-emerald-400/40'
                                : 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700 hover:bg-[#151922]'
                            }`}
                          >
                            <div
                              className={`p-2 rounded-lg shrink-0 ${
                                isSelected
                                  ? 'bg-emerald-400 text-neutral-950'
                                  : 'bg-neutral-800 text-neutral-300'
                              }`}
                            >
                              {renderIcon(opt.iconName, 'h-4 w-4')}
                            </div>
                            <div>
                              <h3 className="text-xs font-bold text-white">{opt.label}</h3>
                              <p className="text-[11px] text-neutral-400 leading-tight mt-0.5">
                                {opt.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Wizard Navigation Bar */}
                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                    disabled={currentStep === 1}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Previous Question</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedAvoidSubjects(['avoid_chem', 'avoid_workshop_mech']);
                        setSelectedDomain('tech_software');
                        setSelectedPriority('priority_high_ctc');
                        setSelectedStream('stream_pcm');
                      }}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-neutral-400 hover:text-white transition"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Reset</span>
                    </button>

                    {currentStep < 4 ? (
                      <button
                        onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold shadow transition active:scale-95"
                      >
                        <span>Next Step</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsQuestionnaireOpen(false)}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-neutral-950 text-xs font-black shadow-lg transition active:scale-95"
                      >
                        <Check className="h-4 w-4" />
                        <span>Lock Answers & View Matches</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Metrics Ribbon & Subject Elimination Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-3.5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-rose-400">
                  <span className="text-[11px] font-mono uppercase font-bold">Subjects Pruned</span>
                  <XCircle className="h-4 w-4" />
                </div>
                <div className="mt-2">
                  <span className="text-xl sm:text-2xl font-black text-rose-300 font-mono">
                    {recommendationSummary.eliminatedSubjects.length} Irrelevant
                  </span>
                  <span className="block text-[10px] text-neutral-400">
                    Automatically eliminated
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3.5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-emerald-400">
                  <span className="text-[11px] font-mono uppercase font-bold">Time Saved</span>
                  <Clock className="h-4 w-4" />
                </div>
                <div className="mt-2">
                  <span className="text-xl sm:text-2xl font-black text-emerald-300 font-mono">
                    ~{recommendationSummary.totalWeeklyHoursSaved}h / week
                  </span>
                  <span className="block text-[10px] text-neutral-400">Saved from fluff study</span>
                </div>
              </div>

              <div className="rounded-xl border border-teal-500/20 bg-teal-950/20 p-3.5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-teal-400">
                  <span className="text-[11px] font-mono uppercase font-bold">
                    High-Yield Focus
                  </span>
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="mt-2">
                  <span className="text-xl sm:text-2xl font-black text-teal-300 font-mono">
                    {recommendationSummary.highYieldSubjects.length} Core Subjects
                  </span>
                  <span className="block text-[10px] text-neutral-400">
                    Mandatory for Day-1 drives
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3.5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-cyan-400">
                  <span className="text-[11px] font-mono uppercase font-bold">Target CTC</span>
                  <Coins className="h-4 w-4" />
                </div>
                <div className="mt-2">
                  <span className="text-xl sm:text-2xl font-black text-cyan-300 font-mono">
                    {activeMatchItem?.startingCTC.split('–')[0] || '₹8L - ₹24L'}
                  </span>
                  <span className="block text-[10px] text-neutral-400">Entry-level benchmark</span>
                </div>
              </div>
            </div>

            {/* Smart Placement Tabs: Recommended Roles, Similar Fields, Subject Pruning Engine */}
            <div className="rounded-xl border border-neutral-800 bg-[#131620] p-3 flex flex-col md:flex-row items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-thin">
                <button
                  onClick={() => {
                    setActiveResultsTab('recommended');
                    setSelectedCareerIndex(0);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition ${
                    activeResultsTab === 'recommended'
                      ? 'bg-emerald-500 text-neutral-950 shadow'
                      : 'border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:text-white'
                  }`}
                >
                  <Award className="h-3.5 w-3.5" />
                  <span>
                    Top Recommended Roles ({recommendationSummary.topRecommended.length})
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveResultsTab('similar');
                    setSelectedCareerIndex(0);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition ${
                    activeResultsTab === 'similar'
                      ? 'bg-emerald-500 text-neutral-950 shadow'
                      : 'border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:text-white'
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Similar & Adjacent Fields ({recommendationSummary.similarFields.length})</span>
                </button>

                <button
                  onClick={() => setActiveResultsTab('subject-pruning')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition ${
                    activeResultsTab === 'subject-pruning'
                      ? 'bg-emerald-500 text-neutral-950 shadow'
                      : 'border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:text-white'
                  }`}
                >
                  <Filter className="h-3.5 w-3.5" />
                  <span>Subject Pruning Matrix (Eliminated vs Core)</span>
                </button>

                <button
                  onClick={() => setActiveResultsTab('degrees')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition ${
                    activeResultsTab === 'degrees'
                      ? 'bg-emerald-500 text-neutral-950 shadow'
                      : 'border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:text-white'
                  }`}
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                  <span>Recommended Degrees ({recommendationSummary.recommendedDegrees.length})</span>
                </button>
              </div>

              {/* Quick Keyword Search Filter */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Filter roles or companies..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950/80 pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* TAB CONTENT: SUBJECT PRUNING MATRIX */}
            {activeResultsTab === 'subject-pruning' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Panel 1: Eliminated & Pruned Subjects */}
                <div className="rounded-2xl border border-rose-500/30 bg-[#141217] p-5 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-rose-900/40">
                    <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-xs uppercase">
                      <XCircle className="h-4 w-4 text-rose-400" />
                      <span>Unnecessary Subjects Pruned for this Path ({recommendationSummary.eliminatedSubjects.length})</span>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">
                      Zero OA/Interview Relevance
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    You don't need to waste hundreds of hours memorizing these subjects. Our engine has verified that campus recruitment drives for this career path do NOT test them:
                  </p>

                  <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin">
                    {recommendationSummary.eliminatedSubjects.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="rounded-xl border border-rose-900/30 bg-rose-950/20 p-3 space-y-1.5 transition hover:border-rose-700/50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-rose-200 line-through decoration-rose-500/70">
                            {sub.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/20">
                            Saved {sub.academicTimeSaved}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono">
                          <span className="text-neutral-500">Category: {sub.category}</span>
                        </div>
                        <p className="text-[11px] text-neutral-300 leading-relaxed pt-0.5">
                          {sub.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Panel 2: High-Yield Core Placement Subjects */}
                <div className="rounded-2xl border border-emerald-500/30 bg-[#101715] p-5 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs uppercase">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span>High-Yield Placement Core ({recommendationSummary.highYieldSubjects.length} Essential Subjects)</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400">
                      Tested in 95%+ Technical Rounds
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Focus 80% of your academic and coding prep on these core subjects to clear technical screening rounds, online assessments, and hiring interviews:
                  </p>

                  <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin">
                    {recommendationSummary.highYieldSubjects.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-3.5 space-y-2 transition hover:border-emerald-500/40"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                            <Zap className="h-3.5 w-3.5 text-emerald-400" />
                            {sub.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            {sub.importance}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 pt-1">
                          {sub.topics.map((top, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700/60 text-neutral-200"
                            >
                              {top}
                            </span>
                          ))}
                        </div>

                        <div className="pt-1 border-t border-emerald-950/80 flex items-start gap-1.5 text-[11px] text-teal-300">
                          <Award className="h-3.5 w-3.5 shrink-0 mt-0.5 text-teal-400" />
                          <span>{sub.testedInPlacement}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: RECOMMENDED DEGREES VIEW */}
            {activeResultsTab === 'degrees' && (
              <div className="rounded-2xl border border-neutral-800 bg-[#12151e] p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                      Recommended Degree Programs for Your Profile
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">
                    {recommendationSummary.recommendedDegrees.length} Degree Pathways
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendationSummary.recommendedDegrees.map((deg) => (
                    <div
                      key={deg.id}
                      className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-3 flex flex-col justify-between hover:border-emerald-500/50 transition group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-emerald-300">
                            {deg.code}
                          </span>
                          <span className="text-[10px] font-mono bg-neutral-800 px-2 py-0.5 rounded text-neutral-400">
                            {deg.duration}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition">
                          {deg.title}
                        </h4>
                        <p className="text-xs text-neutral-400 line-clamp-2">
                          {deg.eligibility}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-neutral-800">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-neutral-500">Starting CTC:</span>
                          <span className="text-emerald-400 font-bold">
                            {deg.startingSalaryRange?.split('(')[0] || '₹7L - ₹20L'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] text-neutral-500 font-mono">
                            Top Entrances:
                          </span>
                          <span className="text-[10px] text-neutral-300 font-mono">
                            {deg.entranceExams.slice(0, 2).map((e) => e.name).join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: RECOMMENDED OR SIMILAR CAREER ROLES (Grid + Focused Deep Dive) */}
            {(activeResultsTab === 'recommended' || activeResultsTab === 'similar') && (
              <div className="space-y-6">
                {/* Grid of Career Cards */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-emerald-400" />
                      {activeResultsTab === 'recommended'
                        ? 'Top High-Match Placement Roles'
                        : 'Similar & Adjacent Career Fields'}
                    </h3>
                    <span className="text-xs text-neutral-400">
                      Select a role below for full recruitment intelligence
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {activeCareerList.map((item, idx) => {
                      const isSelected = selectedCareerIndex === idx;
                      return (
                        <button
                          key={item.career.id}
                          onClick={() => setSelectedCareerIndex(idx)}
                          className={`flex flex-col text-left p-4 rounded-xl border transition relative group ${
                            isSelected
                              ? 'border-emerald-400 bg-gradient-to-b from-emerald-950/50 to-[#141822] shadow-xl ring-1 ring-emerald-400/50 translate-y-[-2px]'
                              : 'border-neutral-800 bg-[#12151e] text-neutral-300 hover:border-neutral-700 hover:bg-[#161a25]'
                          }`}
                        >
                          {isSelected && (
                            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                          )}

                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider line-clamp-1">
                              {item.career.category.split('&')[0]}
                            </span>
                            <span
                              className={`text-[10px] font-mono font-black px-2 py-0.5 rounded ${
                                item.matchScore >= 90
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                              }`}
                            >
                              {item.matchScore}% Match
                            </span>
                          </div>

                          <h4 className="text-xs sm:text-sm font-bold text-white mb-2 line-clamp-1 group-hover:text-emerald-300 transition">
                            {item.career.title}
                          </h4>

                          <div className="mb-2">
                            <span className="text-[10px] font-mono text-neutral-500 uppercase block">
                              Starting Package:
                            </span>
                            <span className="text-xs font-mono font-bold text-emerald-400">
                              {item.startingCTC}
                            </span>
                          </div>

                          <div className="mt-auto pt-2 border-t border-neutral-800/80 w-full space-y-1.5">
                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className="text-neutral-500">Degree:</span>
                              <span className="text-neutral-300 font-semibold truncate max-w-[120px]">
                                {item.recommendedDegree.code}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {item.career.topRecruiters.slice(0, 2).map((rec, rIdx) => (
                                <span
                                  key={rIdx}
                                  className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-800/90 text-neutral-300"
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

                {/* Focused In-Depth Career Deep Dive Card */}
                {activeCareer && activeDegree && (
                  <div className="rounded-2xl border border-neutral-800 bg-[#12151e] p-6 space-y-6 shadow-xl animate-in fade-in duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-neutral-800">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-400">
                            ⭐ {activeMatchItem?.matchScore}% Compatibility
                          </span>
                          <span className="text-xs text-neutral-400">• {activeCareer.sector}</span>
                          <span className="text-xs text-neutral-400">
                            • Degree: {activeDegree.code} ({activeDegree.duration})
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                          {activeCareer.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
                          {activeCareer.overview}
                        </p>
                      </div>

                      {/* Salary Reality Gauge */}
                      <div className="w-full sm:w-auto shrink-0 rounded-xl border border-neutral-800 bg-neutral-900/90 p-4 sm:min-w-[260px]">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-mono text-neutral-400 font-semibold uppercase">
                            Starting Package
                          </span>
                          <span className="text-emerald-400 font-bold font-mono">
                            {activeMatchItem?.startingCTC}
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden my-2">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-4/5 rounded-full" />
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                          <span>Freshers: ₹6L - ₹14L</span>
                          <span className="text-neutral-500">Tier-1 Apex: ₹20L - ₹45L+</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Explore 4-Step Roadmap */}
                        <button
                          onClick={() => onExploreInRoadmap(activeDegree, activeCareer)}
                          className="flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-4 py-2 text-xs font-bold text-neutral-950 transition shadow-md active:scale-95"
                        >
                          <span>Explore 4-Step Roadmap</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>

                        {/* Save Target Goal */}
                        {onSaveGoal && (
                          <button
                            onClick={handleSaveGoal}
                            className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-900 px-3.5 py-2 text-xs font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white transition active:scale-95"
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
                              `I am targeting the role of "${activeCareer.title}" through "${activeDegree.title}" (${activeDegree.code}). What are the key campus placement companies in India, required CGPA, and top 3 technical skills to crack Day-1 recruitment?`
                            )
                          }
                          className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-900/40 transition active:scale-95"
                        >
                          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Ask AI Placement Counsellor</span>
                        </button>
                      )}
                    </div>

                    {/* 3 Core Placement Intelligence Panels */}
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
                          Clear technical screening assessments and interview rounds by mastering these tools.
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
                            Target 8.0+ CGPA. Solidify core placement fundamentals and eliminate subject distractions.
                          </p>
                        </div>

                        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 space-y-1">
                          <span className="font-mono text-teal-400 font-bold block text-[11px]">
                            Year 2: Core Domain Projects
                          </span>
                          <p className="text-neutral-300">
                            Build 2 verifiable portfolio projects or lab prototypes. Start LeetCode / domain problem solving.
                          </p>
                        </div>

                        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 space-y-1">
                          <span className="font-mono text-cyan-400 font-bold block text-[11px]">
                            Year 3: Industrial Internships
                          </span>
                          <p className="text-neutral-300">
                            Crack summer internship recruitment, clear aptitude tests, and earn pre-placement offers (PPO).
                          </p>
                        </div>

                        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 space-y-1">
                          <span className="font-mono text-amber-400 font-bold block text-[11px]">
                            Year 4: Day-1 Campus Drives
                          </span>
                          <p className="text-neutral-300">
                            Appear for Day-0/1 placement drives, negotiate CTC, and secure top campus offers.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recruiter Placement Advice & 6-Stage Execution Hub Toggle */}
                    <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                          Recruiter Placement Advice:
                        </span>
                        <p className="text-xs text-neutral-400">
                          Maintain at least 7.5+ CGPA without active backlogs to stay eligible for 90%+ corporate campus drives.
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

                    {/* Collapsible 6-Stage Execution Blueprint */}
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
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: MANUAL ALL 40+ DEGREES DIRECTORY (FALLBACK BROWSE)      */}
        {/* ============================================================== */}
        {activeHubView === 'all-degrees' && (
          <div className="space-y-6">
            {/* Filter Ribbon & Live Search Bar */}
            <div className="rounded-xl border border-neutral-800 bg-[#131620] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
                {streamCategories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = manualStreamFilter === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setManualStreamFilter(cat.id)}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold shrink-0 transition ${
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

              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search degrees (e.g. EC, IC, ICT, CSE, MBBS)..."
                  value={manualSearchQuery}
                  onChange={(e) => setManualSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950/80 pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Quick Course Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase text-neutral-500 font-semibold mr-1">
                Quick Jump:
              </span>
              {quickCourses.map((qc) => {
                const targetDegree = DEGREES_DATA.find((d) => d.id === qc.id);
                if (!targetDegree) return null;
                const isSelected = activeManualDegree.id === targetDegree.id;
                return (
                  <button
                    key={qc.id}
                    onClick={() => {
                      setActiveManualDegree(targetDegree);
                      setManualJobIndex(0);
                    }}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
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

            {/* 2-Column Directory Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Degrees List */}
              <div className="lg:col-span-4 rounded-2xl border border-neutral-800 bg-[#12151e] p-4 space-y-3 shadow-lg">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800 px-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-emerald-400" />
                    <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                      Available Degrees ({manualFilteredDegrees.length})
                    </h3>
                  </div>
                </div>

                <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1 scrollbar-thin">
                  {manualFilteredDegrees.map((deg) => {
                    const isSelected = activeManualDegree.id === deg.id;
                    const startingSalary = deg.startingSalaryRange?.split('(')[0] || '₹6L - ₹18L';

                    return (
                      <button
                        key={deg.id}
                        onClick={() => {
                          setActiveManualDegree(deg);
                          setManualJobIndex(0);
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition flex flex-col gap-1.5 ${
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
                  })}
                </div>
              </div>

              {/* Right Column: In-Depth Overview for Manual Degree */}
              <div className="lg:col-span-8 space-y-6">
                <div className="rounded-2xl border border-neutral-800 bg-[#12151e] p-6 shadow-xl relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-neutral-800">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-400">
                          🎓 {activeManualDegree.code}
                        </span>
                        <span className="text-xs text-neutral-400">• {activeManualDegree.duration}</span>
                        <span className="text-xs text-neutral-400">• {activeManualDegree.category}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {activeManualDegree.title}
                      </h3>
                      <p className="text-xs text-neutral-400 max-w-xl leading-relaxed">
                        {activeManualDegree.eligibility}
                      </p>
                    </div>

                    <div className="w-full sm:w-auto shrink-0 rounded-xl border border-neutral-800 bg-neutral-900/90 p-4 sm:min-w-[260px]">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-mono text-neutral-400 font-semibold uppercase">
                          Starting Package
                        </span>
                        <span className="text-emerald-400 font-bold font-mono">
                          {activeManualDegree.startingSalaryRange || '₹6.5L – ₹18L LPA'}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden my-2">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-3/4 rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => onExploreInRoadmap(activeManualDegree, activeManualCareer)}
                      className="flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-3.5 py-2 text-xs font-bold text-neutral-950 transition shadow-md active:scale-95"
                    >
                      <span>Explore 4-Step Roadmap</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Top Jobs for Manual Degree */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-emerald-400" />
                    Campus Placement Roles After {activeManualDegree.code}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {manualTopJobs.map((job, jIdx) => {
                      const isSelected = manualJobIndex === jIdx;
                      return (
                        <button
                          key={job.id}
                          onClick={() => setManualJobIndex(jIdx)}
                          className={`flex flex-col text-left p-3.5 rounded-xl border transition ${
                            isSelected
                              ? 'border-emerald-400 bg-emerald-950/40 shadow-lg'
                              : 'border-neutral-800 bg-[#12151e] text-neutral-300 hover:border-neutral-700 hover:bg-[#161a25]'
                          }`}
                        >
                          <span className="text-[10px] font-mono text-neutral-400 uppercase mb-1">
                            {job.category.split('&')[0]}
                          </span>
                          <h5 className="text-xs font-bold text-white mb-2 line-clamp-1">
                            {job.title}
                          </h5>
                          <div className="mt-auto pt-2 border-t border-neutral-800/80">
                            <span className="text-xs font-mono font-bold text-emerald-400">
                              {job.salaryProspects?.entryLevel?.split('(')[0]?.trim() || '₹8L - ₹18L'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-neutral-800/80 bg-[#0c0e12] py-8 text-neutral-500 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight">
                Edu Career<span className="text-emerald-400">.</span>
              </span>
              <span className="text-neutral-500">— Smart Placement & Curriculum Pruning Launchpad</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-neutral-400 font-mono text-[11px]">
              <span>Grounded in:</span>
              <span className="text-neutral-300">NEP 2020</span>
              <span>•</span>
              <span className="text-neutral-300">UGC / AICTE</span>
              <span>•</span>
              <span className="text-neutral-300">Day-1 Campus Placement Drives</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
