export type StreamId =
  | 'science-pcm'
  | 'science-pcb'
  | 'science-pcmb'
  | 'commerce'
  | 'humanities'
  | 'vocational'
  | 'polytechnic'
  | 'it-computer'
  | 'design-creative'
  | 'sports'
  | 'other-recognized';

export interface Stream {
  id: StreamId;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  coreSubjects: string[];
  popularElectives: string[];
  suitableFor: string;
  keyOutcomes: string[];
  icon: string;
  totalTracks: number;
  totalDegrees: number;
}

export interface Track {
  id: string;
  streamId: StreamId;
  title: string;
  category: string;
  tagline: string;
  description: string;
  mandatorySubjects: string[];
  recommendedElectives: string[];
  difficultyLevel: 'Moderate' | 'Demanding' | 'Rigorous';
  primaryEntranceFocus: string[];
  degreeIds: string[];
  keyCompetencies: string[];
}

export interface EntranceExamInfo {
  name: string;
  fullName: string;
  conductingBody: string;
  level: 'National' | 'State' | 'Institutional' | 'Corporate' | 'Private' | 'Private National';
  frequency: string;
  brief: string;
}

export interface InstitutionGroup {
  type: string;
  examples: string[];
}

export interface Degree {
  id: string;
  code: string;
  title: string;
  trackIds: string[];
  streamIds: StreamId[];
  category:
    | 'Undergraduate Degree'
    | 'Professional Course'
    | 'Technical Diploma'
    | 'Integrated Program'
    | 'Vocational Certification';
  duration: string;
  eligibility: string;
  minimumMarks: string;
  requiredSubjects: string[];
  entranceExams: EntranceExamInfo[];
  admissionProcess: string;
  majorInstitutions: InstitutionGroup[];
  careerOpportunities: string[];
  furtherStudyOptions: string[];
  startingSalaryRange: string;
  isGovernmentRecognized: boolean;
  careerIds: string[];
  alternativeRoutesNote?: string;
}

export interface RoadmapStep {
  stage: string;
  title: string;
  duration: string;
  description: string;
  keyMilestone: string;
  badge?: string;
}

export interface AlternativeRoute {
  title: string;
  pathSummary: string;
  eligibilityNote: string;
  advantages: string;
  tradeoffs: string;
}

export interface Career {
  id: string;
  title: string;
  category: string;
  streamIds: StreamId[];
  primaryDegreeIds: string[];
  overview: string;
  sector: 'Private Corporate' | 'Government / Public' | 'Independent Practice' | 'Research & Academia' | 'Hybrid';
  workEnvironment: string;
  keySkills: string[];
  certificationsAndInternships: string[];
  roadmapSteps: RoadmapStep[];
  alternativeRoutes: AlternativeRoute[];
  salaryProspects: {
    entryLevel: string;
    midLevel: string;
    seniorLevel: string;
  };
  futureGrowthOutlook: string;
  topRecruiters: string[];
}

export interface StudentSelectionState {
  currentStep: 1 | 2 | 3 | 4;
  selectedStream: Stream | null;
  selectedTrack: Track | null;
  selectedDegree: Degree | null;
  selectedCareer: Career | null;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedActions?: string[];
}

export interface SavedUserPathway {
  streamId: string;
  trackId: string;
  degreeId: string;
  careerId: string;
  streamTitle: string;
  trackTitle: string;
  degreeTitle: string;
  careerTitle: string;
  savedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  savedPathway?: SavedUserPathway | null;
  createdAt: string;
}

// -------------------------------------------------------------
// Career Execution & Placement Pipeline (College to Career Hub)
// -------------------------------------------------------------
export interface SkillResource {
  name: string;
  type: 'Free Course' | 'Documentation' | 'Practice' | 'Platform';
  url?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
  estimatedWeeks: string;
  recommendedResources: SkillResource[];
}

export interface TieredProject {
  tier: 'Beginner' | 'Intermediate' | 'Industry Capstone';
  title: string;
  problemStatement: string;
  recommendedTechStack: string[];
  keyFeatures: string[];
  portfolioImpact: string;
}

export interface CertificationItem {
  name: string;
  issuingBody: string;
  level: 'Foundational' | 'Associate' | 'Professional' | 'Apex';
  estimatedCost: string;
  worthScore: 'High ROI' | 'Essential' | 'Recommended' | 'Bonus';
  whyItMatters: string;
}

export interface InternshipStrategy {
  idealTimeline: string;
  topPlatforms: string[];
  keyRequirements: string[];
  stipendRange: string;
  coldOutreachTemplate: {
    subject: string;
    body: string;
  };
}

export interface GoogleXyzBullet {
  x: string;
  y: string;
  z: string;
  fullBullet: string;
}

export interface ResumeGuidance {
  atsGuidelines: string[];
  googleXyzExamples: GoogleXyzBullet[];
  actionVerbs: string[];
  portfolioMustHaves: string[];
}

export interface MockInterviewQA {
  question: string;
  roundType: 'Technical' | 'HR / Behavioral' | 'System Design / Case Study';
  idealAnswerFramework: string;
  starTip: string;
}

export interface PlacementPhase {
  phase: string;
  duration: string;
  focusAreas: string[];
}

export interface PlacementPrepPlan {
  timelinePhases: PlacementPhase[];
  aptitudeTopics: string[];
  coreSubjectsToRevise: string[];
  recruitmentRounds: string[];
}

export interface JobMarketOutlook {
  entryLevelRoles: string[];
  tier1CTC: string;
  tier2CTC: string;
  tier3CTC: string;
  topHiringCompanies: string[];
  hiringHubs: string[];
}

export interface GrowthStage {
  title: string;
  experienceYears: string;
  expectedCTC: string;
  responsibilities: string;
  keySkillsToUpgrade: string[];
}

export interface CareerGrowthPath {
  stages: GrowthStage[];
  emergingTrends: string[];
}

export interface ReadinessChecklistItem {
  id: string;
  stageName: string;
  title: string;
  description: string;
}

export interface CareerExecutionPipeline {
  careerId: string;
  careerTitle: string;
  skillsHub: SkillCategory[];
  projects: TieredProject[];
  certifications: CertificationItem[];
  internships: InternshipStrategy;
  resumeGuide: ResumeGuidance;
  mockInterviews: MockInterviewQA[];
  placementPrep: PlacementPrepPlan;
  jobMarket: JobMarketOutlook;
  growthLadder: CareerGrowthPath;
  checklistItems: ReadinessChecklistItem[];
}

