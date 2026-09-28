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
  Layers,
  Filter,
  CheckCircle2,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { Career, Degree, Stream, UserProfile, SavedUserPathway } from '../types/career';
import {
  CAREERS_DATA,
  DEGREES_DATA,
  STREAMS_DATA,
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
  selectedStream: propSelectedStream,
  currentUser,
  savedCareerIds = [],
  onSaveGoal,
}) => {
  // Determine default career and degree based on current user / prop state
  const initialResolvedCareer = useMemo(() => {
    if (initialCareer) return initialCareer;
    if (currentUser?.savedPathway?.careerId) {
      const found = getCareerById(currentUser.savedPathway.careerId);
      if (found) return found;
    }
    return CAREERS_DATA[0];
  }, [initialCareer, currentUser]);

  const initialResolvedDegree = useMemo(() => {
    if (propSelectedDegree) return propSelectedDegree;
    if (currentUser?.savedPathway?.degreeId) {
      const found = getDegreeById(currentUser.savedPathway.degreeId);
      if (found) return found;
    }
    if (initialResolvedCareer?.primaryDegreeIds?.[0]) {
      const found = getDegreeById(initialResolvedCareer.primaryDegreeIds[0]);
      if (found) return found;
    }
    return DEGREES_DATA[0];
  }, [propSelectedDegree, currentUser, initialResolvedCareer]);

  const [selectedCareer, setSelectedCareer] = useState<Career>(initialResolvedCareer);
  const [selectedDegree, setSelectedDegree] = useState<Degree>(initialResolvedDegree);

  // Selector Drawer / Dropdown states
  const [activePicker, setActivePicker] = useState<'none' | 'course' | 'job'>('none');
  const [searchCourseQuery, setSearchCourseQuery] = useState('');
  const [searchJobQuery, setSearchJobQuery] = useState('');
  const [jobCategoryFilter, setJobCategoryFilter] = useState<string>('All');
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  // Sync state whenever modal opens or props change
  useEffect(() => {
    if (isOpen) {
      if (initialCareer) {
        setSelectedCareer(initialCareer);
      }
      if (propSelectedDegree) {
        setSelectedDegree(propSelectedDegree);
      } else if (initialCareer?.primaryDegreeIds?.[0]) {
        const d = getDegreeById(initialCareer.primaryDegreeIds[0]);
        if (d) setSelectedDegree(d);
      }
    }
  }, [isOpen, initialCareer, propSelectedDegree]);

  if (!isOpen) return null;

  // Categories for Career filtering
  const careerCategories = ['All', 'Information Technology & Software', 'Engineering & Technology', 'Healthcare & Clinical', 'Finance, Accounting & Commerce', 'Law, Legal & Governance'];

  // Filtered Degrees
  const filteredDegrees = DEGREES_DATA.filter(
    (d) =>
      d.title.toLowerCase().includes(searchCourseQuery.toLowerCase()) ||
      d.code.toLowerCase().includes(searchCourseQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchCourseQuery.toLowerCase())
  );

  // Filtered Careers
  const filteredCareers = CAREERS_DATA.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
      c.keySkills.some((s) => s.toLowerCase().includes(searchJobQuery.toLowerCase()));

    const matchesCategory =
      jobCategoryFilter === 'All' || c.category.toLowerCase().includes(jobCategoryFilter.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  // Alternative Degrees for current Career
  const alternativeDegrees = selectedCareer.primaryDegreeIds
    .map((id) => getDegreeById(id))
    .filter((d): d is Degree => !!d && d.id !== selectedDegree.id);

  // Handle selecting a Course (Degree)
  const handleSelectDegree = (degree: Degree) => {
    setSelectedDegree(degree);
    setActivePicker('none');

    // Automatically check if current career belongs to this degree, otherwise switch to matching career
    const matchingCareers = getCareersByDegree(degree);
    if (matchingCareers.length > 0 && !matchingCareers.some((c) => c.id === selectedCareer.id)) {
      setSelectedCareer(matchingCareers[0]);
    }
  };

  // Handle selecting a Job (Career)
  const handleSelectCareer = (career: Career) => {
    setSelectedCareer(career);
    setActivePicker('none');

    // Automatically check if current degree is among primary degrees, otherwise switch to primary degree
    if (career.primaryDegreeIds.length > 0 && !career.primaryDegreeIds.includes(selectedDegree.id)) {
      const primaryDeg = getDegreeById(career.primaryDegreeIds[0]);
      if (primaryDeg) setSelectedDegree(primaryDeg);
    }
  };

  // Save as Goal
  const handleSaveGoal = () => {
    if (onSaveGoal) {
      onSaveGoal(selectedCareer, selectedDegree);
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
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-[#12151d] px-5 sm:px-7 py-3.5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-emerald-400">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Placement & Career Execution Hub
                </h2>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-semibold hidden sm:inline">
                  College Launchpad
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Skills • Projects • Certifications • Internships • Salary Benchmarks • Career Growth
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onSaveGoal && (
              <button
                onClick={handleSaveGoal}
                className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50 transition"
              >
                {isSavedSuccess ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Goal Saved!</span>
                  </>
                ) : (
                  <>
                    <Star className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Save as My Goal</span>
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

        {/* PROMINENT USER INTEREST PANEL: Interested Course & Interested Job */}
        <div className="border-b border-neutral-800/90 bg-[#141722] p-4 sm:p-5 shrink-0">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Left Card: Interested Course (Degree) */}
            <div className="flex-1 rounded-xl border border-neutral-700/70 bg-[#171b26] p-4 relative group hover:border-neutral-600 transition">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                  <GraduationCap className="h-4 w-4" />
                  <span>Interested Course (Degree)</span>
                </div>
                <button
                  onClick={() => setActivePicker(activePicker === 'course' ? 'none' : 'course')}
                  className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg border border-neutral-700 bg-neutral-800/80 text-neutral-300 hover:text-white hover:border-neutral-500 transition"
                >
                  <span>Change Course</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white tracking-tight">
                    {selectedDegree.code ? `${selectedDegree.code} — ` : ''}{selectedDegree.title}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                  <span className="rounded bg-neutral-800/90 px-2 py-0.5 font-mono text-[11px] text-neutral-300">
                    ⏱️ {selectedDegree.duration}
                  </span>
                  <span>•</span>
                  <span>{selectedDegree.category}</span>
                  {selectedDegree.startingSalaryRange && (
                    <>
                      <span>•</span>
                      <span className="text-emerald-400 font-medium">Avg: {selectedDegree.startingSalaryRange}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Alternative Courses for this Job */}
              {alternativeDegrees.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-neutral-800 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Also qualifies via:</span>
                  {alternativeDegrees.slice(0, 3).map((alt) => (
                    <button
                      key={alt.id}
                      onClick={() => handleSelectDegree(alt)}
                      className="text-[11px] font-mono px-2 py-0.5 rounded border border-neutral-700/80 bg-neutral-800/60 text-neutral-300 hover:border-emerald-500/50 hover:text-emerald-300 transition"
                    >
                      {alt.code || alt.title.split(' ')[0]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Connection Arrow */}
            <div className="hidden lg:flex flex-col items-center justify-center shrink-0 px-2">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1 font-semibold">
                LEADS TO
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>

            {/* Right Card: Interested Job (Career) */}
            <div className="flex-1 rounded-xl border border-neutral-700/70 bg-[#171b26] p-4 relative group hover:border-neutral-600 transition">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-teal-400 uppercase tracking-wider">
                  <Briefcase className="h-4 w-4" />
                  <span>Target Job (Role)</span>
                </div>
                <button
                  onClick={() => setActivePicker(activePicker === 'job' ? 'none' : 'job')}
                  className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg border border-neutral-700 bg-neutral-800/80 text-neutral-300 hover:text-white hover:border-neutral-500 transition"
                >
                  <span>Change Job</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white tracking-tight">
                    {selectedCareer.title}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                  <span className="rounded bg-teal-950/40 border border-teal-800/40 px-2 py-0.5 font-mono text-[11px] text-teal-300">
                    {selectedCareer.category.split('&')[0]}
                  </span>
                  <span>•</span>
                  <span>{selectedCareer.sector}</span>
                  {selectedCareer.salaryProspects?.entryLevel && (
                    <>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">
                        Entry: {selectedCareer.salaryProspects.entryLevel.split('(')[0].trim()}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Top recruiter chips */}
              <div className="mt-3 pt-2.5 border-t border-neutral-800 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Top Recruiters:</span>
                {selectedCareer.topRecruiters.slice(0, 3).map((rec, rIdx) => (
                  <span
                    key={rIdx}
                    className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-300"
                  >
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Course Picker Dropdown Drawer */}
          {activePicker === 'course' && (
            <div className="mt-4 rounded-xl border border-neutral-700 bg-[#0f1117] p-4 animate-in fade-in duration-150 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                    Select Your Interested Course or Degree:
                  </span>
                </div>
                <button
                  onClick={() => setActivePicker('none')}
                  className="text-neutral-400 hover:text-white text-xs"
                >
                  ✕ Close
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search courses (e.g., B.Tech, BCA, MBBS, B.Com, Law, Design)..."
                  value={searchCourseQuery}
                  onChange={(e) => setSearchCourseQuery(e.target.value)}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900/90 pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                {filteredDegrees.map((deg) => {
                  const isSelected = selectedDegree.id === deg.id;
                  return (
                    <button
                      key={deg.id}
                      onClick={() => handleSelectDegree(deg)}
                      className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-950/30 text-white font-bold'
                          : 'border-neutral-800 bg-neutral-900/50 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-semibold">{deg.code}</span>
                        <span className="text-[10px] font-mono text-neutral-400">{deg.duration}</span>
                      </div>
                      <span className="text-[11px] text-neutral-400 line-clamp-1">{deg.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Interactive Job Picker Dropdown Drawer */}
          {activePicker === 'job' && (
            <div className="mt-4 rounded-xl border border-neutral-700 bg-[#0f1117] p-4 animate-in fade-in duration-150 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-teal-400" />
                  <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                    Select Your Target Job Role:
                  </span>
                </div>
                <button
                  onClick={() => setActivePicker('none')}
                  className="text-neutral-400 hover:text-white text-xs"
                >
                  ✕ Close
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Search careers (e.g., Software, AI, Doctor, Lawyer, Accountant, Pilot)..."
                    value={searchJobQuery}
                    onChange={(e) => setSearchJobQuery(e.target.value)}
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-900/90 pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-teal-500 focus:outline-none"
                    autoFocus
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
                  {careerCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setJobCategoryFilter(cat)}
                      className={`text-[10px] font-mono px-2 py-1.5 rounded-lg shrink-0 transition ${
                        jobCategoryFilter === cat
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold'
                          : 'bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700'
                      }`}
                    >
                      {cat.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                {filteredCareers.map((car) => {
                  const isSelected = selectedCareer.id === car.id;
                  return (
                    <button
                      key={car.id}
                      onClick={() => handleSelectCareer(car)}
                      className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition ${
                        isSelected
                          ? 'border-teal-500 bg-teal-950/30 text-white font-bold'
                          : 'border-neutral-800 bg-neutral-900/50 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800'
                      }`}
                    >
                      <span className="text-xs font-semibold">{car.title}</span>
                      <span className="text-[10px] text-neutral-400 line-clamp-1">{car.category}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Scrollable Body: 6-Stage Execution Hub */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin">
          <CareerExecutionHub
            career={selectedCareer}
            selectedDegree={selectedDegree}
            onAskAI={onAskAI}
          />
        </div>
      </div>
    </div>
  );
};
