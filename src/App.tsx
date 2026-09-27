import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import {
  StudentSelectionState,
  Stream,
  Track,
  Degree,
  Career,
  UserProfile,
  SavedUserPathway,
} from './types/career';
import {
  STREAMS_DATA,
  TRACKS_DATA,
  DEGREES_DATA,
  CAREERS_DATA,
  getStreamById,
  getTrackById,
  getDegreeById,
  getCareerById,
  SearchResultItem,
} from './data';
import { getCurrentUser, updateUserPathway, logoutUser } from './utils/userStorage';
import { Header } from './components/Header';
import { FlowProgress } from './components/FlowProgress';
import { Step1Class10 } from './components/Step1Class10';
import { Step2Class11_12 } from './components/Step2Class11_12';
import { Step3Degrees } from './components/Step3Degrees';
import { Step4Roadmap } from './components/Step4Roadmap';
import { DegreeDetailModal } from './components/DegreeDetailModal';
import { AICounsellorModal } from './components/AICounsellorModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { CompareModal } from './components/CompareModal';
import { SavedPathsModal } from './components/SavedPathsModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { PlacementHubModal } from './components/PlacementHubModal';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';

export default function App() {
  // User Authentication & Profile State (Stored locally)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getCurrentUser());
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Active Screen View: 'home' (creative landing page) | 'login' (compulsory auth gate) | 'app' (decision engine)
  const [activeView, setActiveView] = useState<'home' | 'login' | 'app'>('home');
  const [loginMode, setLoginMode] = useState<'login' | 'signup'>('login');
  const [pendingAction, setPendingAction] = useState<'placementHub' | 'counsellor' | null>(null);

  // Compulsory authentication: Cannot access the interactive app without logging in
  useEffect(() => {
    if (activeView === 'app' && !currentUser) {
      setLoginMode('login');
      setActiveView('login');
    }
  }, [activeView, currentUser]);

  // Main Selection State
  const [selectionState, setSelectionState] = useState<StudentSelectionState>({
    currentStep: 1,
    selectedStream: null,
    selectedTrack: null,
    selectedDegree: null,
    selectedCareer: null,
  });

  // Saved / Bookmarked Careers in LocalStorage
  const [bookmarkedCareerIds, setBookmarkedCareerIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('margdarshak_saved_careers');
      return saved ? JSON.parse(saved) : ['career-software-engineer'];
    } catch {
      return ['career-software-engineer'];
    }
  });

  // Modal Visibility States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAICounsellorOpen, setIsAICounsellorOpen] = useState(false);
  const [isPlacementHubOpen, setIsPlacementHubOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareInitialDegreeId, setCompareInitialDegreeId] = useState<string | undefined>();
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [detailModalDegree, setDetailModalDegree] = useState<Degree | null>(null);
  const [aiInitialQuestion, setAiInitialQuestion] = useState<string>('');

  // Persist bookmarks to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('margdarshak_saved_careers', JSON.stringify(bookmarkedCareerIds));
    } catch (e) {
      console.error('Could not save to localStorage', e);
    }
  }, [bookmarkedCareerIds]);

  // Load saved pathway on initial mount if user is logged in
  useEffect(() => {
    if (currentUser?.savedPathway) {
      loadPathwayIntoState(currentUser.savedPathway);
    }
  }, []);

  const loadPathwayIntoState = (pathway: SavedUserPathway) => {
    const stream = getStreamById(pathway.streamId);
    const track = getTrackById(pathway.trackId);
    const degree = getDegreeById(pathway.degreeId);
    const career = getCareerById(pathway.careerId);

    if (stream && track && degree && career) {
      setSelectionState({
        currentStep: 4,
        selectedStream: stream,
        selectedTrack: track,
        selectedDegree: degree,
        selectedCareer: career,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentPathwayObj: SavedUserPathway | null =
    selectionState.currentStep === 4 &&
    selectionState.selectedStream &&
    selectionState.selectedTrack &&
    selectionState.selectedDegree &&
    selectionState.selectedCareer
      ? {
          streamId: selectionState.selectedStream.id,
          trackId: selectionState.selectedTrack.id,
          degreeId: selectionState.selectedDegree.id,
          careerId: selectionState.selectedCareer.id,
          streamTitle: selectionState.selectedStream.title,
          trackTitle: selectionState.selectedTrack.title,
          degreeTitle: `${selectionState.selectedDegree.code} - ${selectionState.selectedDegree.title}`,
          careerTitle: selectionState.selectedCareer.title,
          savedAt: new Date().toISOString(),
        }
      : null;

  const handleSaveCurrentPathwayToUser = async () => {
    if (!currentUser) {
      setLoginMode('signup');
      setActiveView('login');
      return;
    }
    if (currentPathwayObj) {
      const updated = await updateUserPathway(currentUser.id, currentPathwayObj);
      if (updated) {
        setCurrentUser({ ...updated });
      }
    }
  };

  const handleAuthSuccess = async (user: UserProfile) => {
    setCurrentUser(user);
    if (user.savedPathway) {
      loadPathwayIntoState(user.savedPathway);
    } else if (currentPathwayObj) {
      const updated = await updateUserPathway(user.id, currentPathwayObj);
      if (updated) {
        setCurrentUser({ ...updated });
      }
    }
    setActiveView('app');
    if (pendingAction === 'placementHub') {
      setIsPlacementHubOpen(true);
      setPendingAction(null);
    } else if (pendingAction === 'counsellor') {
      setIsAICounsellorOpen(true);
      setPendingAction(null);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setActiveView('home');
  };

  const handleRemoveUserPathway = async () => {
    if (currentUser) {
      const updated = await updateUserPathway(currentUser.id, null);
      if (updated) {
        setCurrentUser({ ...updated });
      }
    }
  };

  const handleChangePathway = () => {
    handleReset();
  };

  // Global ⌘K / Ctrl+K listener for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Step 1: Select Stream
  const handleSelectStream = (stream: Stream) => {
    setSelectionState({
      currentStep: 2,
      selectedStream: stream,
      selectedTrack: null,
      selectedDegree: null,
      selectedCareer: null,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Select Track
  const handleSelectTrack = (track: Track) => {
    setSelectionState((prev) => ({
      ...prev,
      currentStep: 3,
      selectedTrack: track,
      selectedDegree: null,
      selectedCareer: null,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Select Degree
  const handleSelectDegree = (degree: Degree) => {
    // 1. Find career directly linked to this specific degree
    let matchingCareer = CAREERS_DATA.find((c) =>
      c.primaryDegreeIds.includes(degree.id) || degree.careerIds.includes(c.id)
    );

    // 2. If not found directly, find a career in the selected stream
    if (!matchingCareer && selectionState.selectedStream) {
      matchingCareer = CAREERS_DATA.find((c) =>
        c.streamIds.includes(selectionState.selectedStream!.id)
      );
    }

    // 3. Fallback to first available career in that stream or global
    if (!matchingCareer) {
      matchingCareer = CAREERS_DATA[0];
    }

    setSelectionState((prev) => ({
      ...prev,
      currentStep: 4,
      selectedDegree: degree,
      selectedCareer: matchingCareer,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 4: Switch Career under same degree
  const handleSelectCareer = (career: Career) => {
    setSelectionState((prev) => ({
      ...prev,
      selectedCareer: career,
    }));
  };

  // Reset to Beginning
  const handleReset = () => {
    setSelectionState({
      currentStep: 1,
      selectedStream: null,
      selectedTrack: null,
      selectedDegree: null,
      selectedCareer: null,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Jump to Step from FlowProgress Breadcrumbs
  const handleJumpToStep = (step: 1 | 2 | 3 | 4) => {
    setSelectionState((prev) => ({
      ...prev,
      currentStep: step,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Bookmark
  const handleToggleBookmark = (careerId: string) => {
    setBookmarkedCareerIds((prev) =>
      prev.includes(careerId) ? prev.filter((id) => id !== careerId) : [...prev, careerId]
    );
  };

  // Handle Ask AI from any prompt button
  const handleAskAIWithQuestion = (question: string) => {
    setAiInitialQuestion(question);
    setIsAICounsellorOpen(true);
  };

  // Search Selection Handler
  const handleSelectSearchResult = (result: SearchResultItem) => {
    if (result.type === 'Stream') {
      const s = getStreamById(result.id);
      if (s) handleSelectStream(s);
    } else if (result.type === 'Track') {
      const t = getTrackById(result.id);
      if (t) {
        const s = getStreamById(t.streamId) || STREAMS_DATA[0];
        setSelectionState({
          currentStep: 3,
          selectedStream: s,
          selectedTrack: t,
          selectedDegree: null,
          selectedCareer: null,
        });
      }
    } else if (result.type === 'Degree') {
      const d = getDegreeById(result.id);
      if (d) {
        const s = getStreamById(d.streamIds[0]) || STREAMS_DATA[0];
        const t = getTrackById(d.trackIds[0]) || TRACKS_DATA[0];
        const c = CAREERS_DATA.find((item) => d.careerIds.includes(item.id)) || CAREERS_DATA[0];
        setSelectionState({
          currentStep: 4,
          selectedStream: s,
          selectedTrack: t,
          selectedDegree: d,
          selectedCareer: c,
        });
      }
    } else if (result.type === 'Career') {
      const c = getCareerById(result.id);
      if (c) {
        const s = getStreamById(c.streamIds[0]) || STREAMS_DATA[0];
        const d = getDegreeById(c.primaryDegreeIds[0]) || DEGREES_DATA[0];
        const t = getTrackById(d.trackIds[0]) || TRACKS_DATA[0];
        setSelectionState({
          currentStep: 4,
          selectedStream: s,
          selectedTrack: t,
          selectedDegree: d,
          selectedCareer: c,
        });
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load Saved Career from Bookmarks Modal
  const handleLoadSavedCareer = (career: Career) => {
    const s = getStreamById(career.streamIds[0]) || STREAMS_DATA[0];
    const d = getDegreeById(career.primaryDegreeIds[0]) || DEGREES_DATA[0];
    const t = getTrackById(d.trackIds[0]) || TRACKS_DATA[0];
    setSelectionState({
      currentStep: 4,
      selectedStream: s,
      selectedTrack: t,
      selectedDegree: d,
      selectedCareer: career,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Home Page (Creative Public Showcase)
  if (activeView === 'home') {
    return (
      <HomePage
        user={currentUser}
        onGetStarted={() => {
          if (!currentUser) {
            setLoginMode('login');
            setActiveView('login');
          } else {
            setActiveView('app');
          }
        }}
        onOpenLogin={() => {
          setLoginMode('login');
          setActiveView('login');
        }}
        onOpenPlacementHub={() => {
          if (!currentUser) {
            setPendingAction('placementHub');
            setLoginMode('login');
            setActiveView('login');
          } else {
            setActiveView('app');
            setIsPlacementHubOpen(true);
          }
        }}
        onOpenAICounsellor={() => {
          if (!currentUser) {
            setPendingAction('counsellor');
            setLoginMode('login');
            setActiveView('login');
          } else {
            setActiveView('app');
            setIsAICounsellorOpen(true);
          }
        }}
      />
    );
  }

  // Render Login Page (Compulsory Authentication Gate)
  if (activeView === 'login') {
    return (
      <LoginPage
        onSuccess={handleAuthSuccess}
        onBackToHome={() => setActiveView('home')}
        initialMode={loginMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#f1f3f7] flex flex-col font-sans">
      {/* Top Header */}
      <Header
        selectionState={selectionState}
        onReset={handleReset}
        onGoHome={() => setActiveView('home')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAICounsellor={() => {
          setAiInitialQuestion('');
          setIsAICounsellorOpen(true);
        }}
        onOpenPlacementHub={() => setIsPlacementHubOpen(true)}
        onOpenCompare={() => {
          setCompareInitialDegreeId(selectionState.selectedDegree?.id || 'btech-cse');
          setIsCompareOpen(true);
        }}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        savedCount={bookmarkedCareerIds.length}
        user={currentUser}
        onOpenAuth={() => {
          setLoginMode('login');
          setActiveView('login');
        }}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Decision Tree Flow Tracker */}
      <FlowProgress state={selectionState} onJumpToStep={handleJumpToStep} />

      {/* Main Multi-Step Content */}
      <main className="flex-1">
        {selectionState.currentStep === 1 && (
          <Step1Class10
            onSelectStream={handleSelectStream}
            onAskAI={handleAskAIWithQuestion}
          />
        )}

        {selectionState.currentStep === 2 && selectionState.selectedStream && (
          <Step2Class11_12
            stream={selectionState.selectedStream}
            onSelectTrack={handleSelectTrack}
            onBack={() => handleJumpToStep(1)}
            onAskAI={handleAskAIWithQuestion}
          />
        )}

        {selectionState.currentStep === 3 &&
          selectionState.selectedStream &&
          selectionState.selectedTrack && (
            <Step3Degrees
              stream={selectionState.selectedStream}
              track={selectionState.selectedTrack}
              onSelectDegree={handleSelectDegree}
              onViewDegreeDetails={(deg) => setDetailModalDegree(deg)}
              onBack={() => handleJumpToStep(2)}
              onAskAI={handleAskAIWithQuestion}
            />
          )}

        {selectionState.currentStep === 4 &&
          selectionState.selectedStream &&
          selectionState.selectedTrack &&
          selectionState.selectedDegree && (
            <Step4Roadmap
              stream={selectionState.selectedStream}
              track={selectionState.selectedTrack}
              degree={selectionState.selectedDegree}
              career={selectionState.selectedCareer}
              onSelectCareer={handleSelectCareer}
              onBack={() => handleJumpToStep(3)}
              onAskAI={handleAskAIWithQuestion}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={
                selectionState.selectedCareer
                  ? bookmarkedCareerIds.includes(selectionState.selectedCareer.id)
                  : false
              }
              onOpenCompareWithCurrent={(degId) => {
                setCompareInitialDegreeId(degId);
                setIsCompareOpen(true);
              }}
              user={currentUser}
              onSaveUserPathway={handleSaveCurrentPathwayToUser}
              onChangePathway={handleChangePathway}
              onOpenAuth={() => {
                setAuthMode('signup');
                setIsAuthOpen(true);
              }}
            />
          )}
      </main>

      {/* Floating AI Counsellor Action Button */}
      <div className="fixed bottom-6 right-6 z-30 print:hidden">
        <button
          onClick={() => {
            setAiInitialQuestion('');
            setIsAICounsellorOpen(true);
          }}
          className="group flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/95 px-3.5 py-2.5 text-xs font-bold text-white shadow-2xl backdrop-blur-md transition-all hover:scale-105 hover:border-neutral-500 hover:bg-neutral-800 active:scale-95"
        >
          <Sparkles className="h-4 w-4 text-emerald-400" />
          <span className="hidden sm:inline">AI Counsellor</span>
          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-medium">
            Coming Soon
          </span>
        </button>
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        pendingPathway={currentPathwayObj}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authMode}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        onLogout={handleLogout}
        onLoadPathway={(pathway) => loadPathwayIntoState(pathway)}
        onChangePathway={handleChangePathway}
        onRemovePathway={handleRemoveUserPathway}
      />

      <DegreeDetailModal
        degree={detailModalDegree}
        onClose={() => setDetailModalDegree(null)}
        onSelectDegree={handleSelectDegree}
        onAskAI={handleAskAIWithQuestion}
      />

      <AICounsellorModal
        isOpen={isAICounsellorOpen}
        onClose={() => {
          setIsAICounsellorOpen(false);
          setAiInitialQuestion('');
        }}
        selectionState={selectionState}
        initialQuestion={aiInitialQuestion}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        initialDegreeId={compareInitialDegreeId}
        onSelectDegreeForRoadmap={handleSelectDegree}
      />

      <SavedPathsModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedCareerIds={bookmarkedCareerIds}
        onRemoveBookmark={(id) => handleToggleBookmark(id)}
        onLoadSavedCareer={handleLoadSavedCareer}
      />

      <PlacementHubModal
        isOpen={isPlacementHubOpen}
        onClose={() => setIsPlacementHubOpen(false)}
        onAskAI={handleAskAIWithQuestion}
        initialCareer={selectionState.selectedCareer}
      />

      {/* Footer */}
      <footer className="border-t border-neutral-800/80 bg-[#0c0e12] py-8 text-neutral-500 print:hidden text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight">Edu Career<span className="text-emerald-400">.</span></span>
              <span className="text-neutral-500">— Career & Education Pathways Engine</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-neutral-400 font-mono text-[11px]">
              <span>Grounded in:</span>
              <span className="text-neutral-300">NEP 2020</span>
              <span>•</span>
              <span className="text-neutral-300">CBSE / State Boards</span>
              <span>•</span>
              <span className="text-neutral-300">UGC / AICTE</span>
              <span>•</span>
              <span className="text-neutral-300">NMC / DCI</span>
              <span>•</span>
              <span className="text-neutral-300">ICAI / BCI / CoA</span>
              <span>•</span>
              <span className="text-neutral-300">NTA</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
