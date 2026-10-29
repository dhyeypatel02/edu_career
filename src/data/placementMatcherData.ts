import { Career, Degree, StreamId } from '../types/career';
import { CAREERS_DATA, DEGREES_DATA, getDegreeById, getCareerById } from './index';

export interface MatcherOption {
  id: string;
  label: string;
  description: string;
  iconName: string;
  badge?: string;
  associatedStreamIds?: StreamId[];
  associatedCareerIds?: string[];
}

export interface MatcherQuestion {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  isMultiSelect?: boolean;
  options: MatcherOption[];
}

export interface EliminatedSubject {
  name: string;
  category: string;
  reason: string;
  academicTimeSaved: string;
}

export interface HighYieldPlacementSubject {
  name: string;
  importance: 'Crucial (OA & Interview)' | 'High Impact' | 'Essential Domain';
  topics: string[];
  testedInPlacement: string;
}

export interface DomainSubjectProfile {
  domainId: string;
  domainName: string;
  tagline: string;
  eliminatedSubjects: EliminatedSubject[];
  highYieldSubjects: HighYieldPlacementSubject[];
  recommendedDegreeIds: string[];
  recommendedCareerIds: string[];
  similarCareerIds: string[];
}

// -------------------------------------------------------------
// Interactive Questions Configuration
// -------------------------------------------------------------
export const PLACEMENT_QUESTIONS: MatcherQuestion[] = [
  {
    id: 'career_interest',
    stepNumber: 1,
    title: 'What type of career field excites you the most?',
    subtitle: 'Select the domain you want to build your profession and target campus placements in.',
    options: [
      {
        id: 'tech_software',
        label: 'Software, AI & Cloud Computing',
        description: 'Building web apps, algorithms, cloud architecture, machine learning models, and mobile systems.',
        iconName: 'Code2',
        badge: 'Highest CTC & Global Remote',
        associatedStreamIds: ['science-pcm', 'it-computer', 'polytechnic'],
        associatedCareerIds: ['career-software-engineer', 'career-ai-ml-engineer', 'career-cybersecurity-architect'],
      },
      {
        id: 'core_electronics',
        label: 'Electronics, Chip Design & Robotics',
        description: 'VLSI microchips, embedded circuits, IoT hardware, robotics automation, and communications.',
        iconName: 'Cpu',
        badge: 'High Semiconductor Demand',
        associatedStreamIds: ['science-pcm', 'polytechnic'],
        associatedCareerIds: ['career-aerospace-defence-scientist', 'career-software-engineer'],
      },
      {
        id: 'finance_business',
        label: 'Finance, FinTech & Business Strategy',
        description: 'Investment banking, corporate finance, financial modeling, consulting, and equity analytics.',
        iconName: 'TrendingUp',
        badge: 'Top Corporate Bonuses',
        associatedStreamIds: ['commerce', 'science-pcm'],
        associatedCareerIds: ['career-investment-banker', 'career-chartered-accountant'],
      },
      {
        id: 'healthcare_medical',
        label: 'Healthcare, Clinical & Life Sciences',
        description: 'Medicine, pharmaceuticals, biotechnology, diagnostics, and patient care systems.',
        iconName: 'HeartPulse',
        badge: 'Lifelong Noble Profession',
        associatedStreamIds: ['science-pcb', 'science-pcmb'],
        associatedCareerIds: ['career-doctor-mbbs'],
      },
      {
        id: 'design_product',
        label: 'UI/UX, Product & Digital Media',
        description: 'Digital user experience, product design, creative technology, gaming, and visual storytelling.',
        iconName: 'Palette',
        badge: 'Creative & Tech Blend',
        associatedStreamIds: ['design-creative', 'humanities', 'science-pcm'],
        associatedCareerIds: ['career-ui-ux-designer', 'career-architect'],
      },
      {
        id: 'law_governance',
        label: 'Corporate Law, Policy & Civil Services',
        description: 'Corporate law advisory, arbitration, public administration, judicial advocacy, and consulting.',
        iconName: 'Scale',
        badge: 'Power, Policy & Prestige',
        associatedStreamIds: ['humanities', 'commerce'],
        associatedCareerIds: ['career-corporate-lawyer', 'career-civil-services-ias'],
      },
    ],
  },
  {
    id: 'avoid_subjects',
    stepNumber: 2,
    title: 'Which subjects or topics do you want to REMOVE / AVOID?',
    subtitle: 'Our smart engine will automatically prune these unnecessary subjects and eliminate unrelated degrees.',
    isMultiSelect: true,
    options: [
      {
        id: 'avoid_chem',
        label: 'Chemistry & Wet Lab Experiments',
        description: 'Remove organic chemistry, chemical reactions, titration, and material synthesis.',
        iconName: 'FlaskConical',
      },
      {
        id: 'avoid_bio',
        label: 'Biology, Botany & Zoology',
        description: 'Remove plant physiology, biological dissections, and memory-heavy taxonomic terms.',
        iconName: 'Dna',
      },
      {
        id: 'avoid_hard_math',
        label: 'Abstract Calculus & Theoretical Math',
        description: 'Remove complex analysis, differential geometry, and theoretical proofs.',
        iconName: 'Calculator',
      },
      {
        id: 'avoid_heavy_code',
        label: 'Low-Level Coding & Hardcore C++/DSA',
        description: 'Avoid intense competitive coding, kernel programming, and compiler writing.',
        iconName: 'Terminal',
      },
      {
        id: 'avoid_workshop_mech',
        label: 'Mechanical Workshop & Machine Drawings',
        description: 'Remove lathe machine operations, foundry workshop, and drafting tables.',
        iconName: 'Wrench',
      },
      {
        id: 'avoid_tax_audit',
        label: 'Tax Laws & Double-Entry Ledgers',
        description: 'Remove tedious taxation calculations, auditing checklists, and ledger balancing.',
        iconName: 'Receipt',
      },
      {
        id: 'avoid_rote_law',
        label: 'Rote Memorization of Penal Codes & Acts',
        description: 'Remove memorizing extensive legal section numbers and historical case statutes.',
        iconName: 'BookOpen',
      },
    ],
  },
  {
    id: 'placement_priority',
    stepNumber: 3,
    title: 'What is your primary placement priority?',
    subtitle: 'Choose what matters most in your immediate campus hiring or job placement outcome.',
    options: [
      {
        id: 'priority_high_ctc',
        label: 'Day-1 High CTC (₹12L - ₹35L+ LPA)',
        description: 'Maximize entry package, signing bonuses, and fast financial independence.',
        iconName: 'Coins',
        badge: 'High Package',
      },
      {
        id: 'priority_remote_global',
        label: 'Remote & Global Work Flexibility',
        description: 'Work with international companies, distributed engineering teams, or digital nomads.',
        iconName: 'Globe',
        badge: 'Global Mobility',
      },
      {
        id: 'priority_stability',
        label: 'High Job Stability & Work-Life Balance',
        description: 'Predictable work hours, PSU/MNC security, health benefits, and low layoff risk.',
        iconName: 'ShieldCheck',
        badge: 'Safe & Secure',
      },
      {
        id: 'priority_innovation',
        label: 'Cutting-Edge Tech & Rapid Learning',
        description: 'Work on breakthrough AI, electric mobility, venture startups, or design breakthroughs.',
        iconName: 'Sparkles',
        badge: 'Fast Growth',
      },
    ],
  },
  {
    id: 'academic_stream',
    stepNumber: 4,
    title: 'What is your current or preferred education stream?',
    subtitle: 'We will verify eligibility and map the smoothest entrance & degree pathways.',
    options: [
      {
        id: 'stream_pcm',
        label: 'Science (PCM / MPC)',
        description: 'Physics, Chemistry, Mathematics (Eligible for all Engineering, Tech, B.Sc & Commerce).',
        iconName: 'Binary',
      },
      {
        id: 'stream_pcb',
        label: 'Science (PCB / BiPC)',
        description: 'Physics, Chemistry, Biology (Eligible for MBBS, Pharmacy, Nursing, Biotech & Psychology).',
        iconName: 'Stethoscope',
      },
      {
        id: 'stream_commerce',
        label: 'Commerce (with or without Maths)',
        description: 'Accountancy, Business Studies, Economics (Eligible for CA, B.Com, BBA, Law & FinTech).',
        iconName: 'Landmark',
      },
      {
        id: 'stream_arts',
        label: 'Arts / Humanities / Law',
        description: 'Political Science, Psychology, Sociology, History (Eligible for BA LLB, Design, Media & IAS).',
        iconName: 'BookMarked',
      },
      {
        id: 'stream_any',
        label: 'Open to Any Stream / Fresh Transition',
        description: 'Flexible pathways open to all 12th backgrounds via entrance tests or open universities.',
        iconName: 'Compass',
      },
    ],
  },
];

// -------------------------------------------------------------
// Domain Subject Knowledge Matrix: Pruned vs High-Yield
// -------------------------------------------------------------
export const DOMAIN_SUBJECT_PROFILES: Record<string, DomainSubjectProfile> = {
  tech_software: {
    domainId: 'tech_software',
    domainName: 'Software, AI & Cloud Computing',
    tagline: 'Skip irrelevant chemistry, physics labs & workshop theory to focus 100% on high-yield software placement skills.',
    eliminatedSubjects: [
      {
        name: 'Organic & Inorganic Chemistry',
        category: 'Irrelevant Science',
        reason: 'Zero software placement relevance. Has 0 questions in campus technical rounds or OA.',
        academicTimeSaved: '4-6 hours / week',
      },
      {
        name: 'Workshop Technology & Machine Lathes',
        category: 'Mechanical Shop',
        reason: 'Physical welding and carpentry are unnecessary for cloud, app, and backend software engineering.',
        academicTimeSaved: '3 hours / week',
      },
      {
        name: 'Classical Thermodynamics & Fluid Mechanics',
        category: 'Mechanical Physics',
        reason: 'Thermal heat cycles and fluid dynamics have zero overlap with modern web & cloud architecture.',
        academicTimeSaved: '4 hours / week',
      },
      {
        name: 'Plant Taxonomy & Biological Anatomy',
        category: 'Life Sciences',
        reason: 'Memorizing botanical classifications is unnecessary for computer science careers.',
        academicTimeSaved: '5 hours / week',
      },
      {
        name: 'Double-Entry Bookkeeping & Tax Filings',
        category: 'Accounting',
        reason: 'Replaced by automated corporate finance tools; not tested in software engineering drives.',
        academicTimeSaved: '3 hours / week',
      },
    ],
    highYieldSubjects: [
      {
        name: 'Data Structures & Algorithms (DSA)',
        importance: 'Crucial (OA & Interview)',
        topics: ['Arrays, HashMaps, Trees, Graphs', 'Dynamic Programming', 'Time & Space Complexity', 'LeetCode Mediums'],
        testedInPlacement: 'Mandatory in 95%+ first-round Online Assessments (Amazon, Google, TCS Digital)',
      },
      {
        name: 'System Design & Scalable Architecture',
        importance: 'Crucial (OA & Interview)',
        topics: ['Microservices', 'Load Balancers & Caching (Redis)', 'Database Sharding', 'Message Queues (Kafka)'],
        testedInPlacement: 'Crucial for high-tier ₹18L+ LPA product engineering roles',
      },
      {
        name: 'Database Management Systems (DBMS)',
        importance: 'High Impact',
        topics: ['SQL Queries & Joins', 'Indexing & B-Trees', 'ACID Transactions', 'NoSQL (MongoDB)'],
        testedInPlacement: 'Tested in technical interview rounds across all tech MNCs',
      },
      {
        name: 'Operating Systems & Computer Networks',
        importance: 'High Impact',
        topics: ['Processes, Threads & Concurrency', 'Memory Management & Paging', 'TCP/IP, HTTP/HTTPS, DNS', 'Sockets'],
        testedInPlacement: 'Standard core CS interview questions in Day-1 campus placement drives',
      },
      {
        name: 'Modern Full-Stack Development / AI Toolchains',
        importance: 'Essential Domain',
        topics: ['TypeScript / React / Node.js', 'Python & PyTorch / HuggingFace', 'REST / GraphQL APIs', 'Docker & CI/CD'],
        testedInPlacement: 'Required to pass take-home project evaluations and tech rounds',
      },
    ],
    recommendedDegreeIds: ['btech-cse', 'bca-degree', 'btech-ict', 'btech-ece', 'bsc-data-science'],
    recommendedCareerIds: ['career-software-engineer', 'career-ai-ml-engineer', 'career-cybersecurity-architect'],
    similarCareerIds: ['career-ui-ux-designer', 'career-investment-banker', 'career-aerospace-defence-scientist'],
  },

  core_electronics: {
    domainId: 'core_electronics',
    domainName: 'Electronics, Chip Design & Embedded Systems',
    tagline: 'Eliminate heavy biological memory work and pure commerce to focus on semiconductors and robotics.',
    eliminatedSubjects: [
      {
        name: 'Biological Anatomy & Genetics',
        category: 'Life Sciences',
        reason: 'Completely disconnected from semiconductor layout, circuit analysis, and microcontrollers.',
        academicTimeSaved: '6 hours / week',
      },
      {
        name: 'Corporate Accounting & Taxation',
        category: 'Finance',
        reason: 'Irrelevant to hardware testbenches, FPGA synthesis, and robotics programming.',
        academicTimeSaved: '4 hours / week',
      },
      {
        name: 'Constitutional & Criminal Law',
        category: 'Humanities',
        reason: 'Zero utility in semiconductor fab labs or embedded firmware engineering.',
        academicTimeSaved: '3 hours / week',
      },
      {
        name: 'Civil Surveying & Geotechnical Soil Mechanics',
        category: 'Civil Engg',
        reason: 'Surveying leveling instruments and soil testing are not required for microchip systems.',
        academicTimeSaved: '4 hours / week',
      },
    ],
    highYieldSubjects: [
      {
        name: 'Digital Electronics & Verilog / VHDL',
        importance: 'Crucial (OA & Interview)',
        topics: ['Combinational & Sequential Circuits', 'FSM State Machines', 'FPGA Prototyping', 'Verilog Synthesis'],
        testedInPlacement: 'Mandatory technical round for Intel, Qualcomm, Texas Instruments, AMD',
      },
      {
        name: 'Microcontrollers & Embedded C / C++',
        importance: 'Crucial (OA & Interview)',
        topics: ['ARM Cortex Architecture', 'I2C, SPI, UART Protocols', 'RTOS (FreeRTOS)', 'Interrupt Handlers'],
        testedInPlacement: 'Crucial for automotive and IoT hardware campus recruitment',
      },
      {
        name: 'CMOS Analog & VLSI Design',
        importance: 'High Impact',
        topics: ['MOSFET Physics & Inverters', 'Layout Design Rules', 'Static Timing Analysis (STA)', 'Cadence Virtuoso'],
        testedInPlacement: 'Required for high-paying ASIC & VLSI chip design roles (₹15L - ₹30L LPA)',
      },
      {
        name: 'Signals & Systems and DSP',
        importance: 'Essential Domain',
        topics: ['Fourier & Laplace Transforms', 'FIR/IIR Filter Design', 'Nyquist Sampling', 'MATLAB Simulation'],
        testedInPlacement: 'Core engineering interview testing for wireless, defense & telecom giants',
      },
    ],
    recommendedDegreeIds: ['btech-ece', 'btech-ic', 'btech-eee', 'btech-ict', 'btech-cse'],
    recommendedCareerIds: ['career-aerospace-defence-scientist', 'career-software-engineer'],
    similarCareerIds: ['career-ai-ml-engineer', 'career-cybersecurity-architect'],
  },

  finance_business: {
    domainId: 'finance_business',
    domainName: 'Finance, FinTech & Strategic Consulting',
    tagline: 'Bypass hard chemistry lab titrations, fluid dynamics, and biological dissections to master high-paying valuation & markets.',
    eliminatedSubjects: [
      {
        name: 'Organic Chemical Reactions & Labs',
        category: 'Chemistry',
        reason: 'Zero application in corporate balance sheets, venture capital, and mergers & acquisitions.',
        academicTimeSaved: '6 hours / week',
      },
      {
        name: 'Botany, Zoology & Medical Microbiology',
        category: 'Biology',
        reason: 'Completely unneeded for financial analysts, chartered accountants, and bankers.',
        academicTimeSaved: '5 hours / week',
      },
      {
        name: 'Workshop Machine Tools & Solid Mechanics',
        category: 'Mechanical',
        reason: 'No relation to equity research, derivative instruments, or portfolio management.',
        academicTimeSaved: '4 hours / week',
      },
      {
        name: 'Quantum Physics & Electromagnetism',
        category: 'Physics',
        reason: 'Theoretical particle physics has no place in corporate DCF models and credit underwriting.',
        academicTimeSaved: '4 hours / week',
      },
    ],
    highYieldSubjects: [
      {
        name: 'Financial Modeling & Valuation (DCF / Multiples)',
        importance: 'Crucial (OA & Interview)',
        topics: ['Discounted Cash Flow (DCF)', 'LBO Modeling', 'Comparable Company Analysis (CCA)', 'Advanced Excel'],
        testedInPlacement: 'Core test for Investment Banks (Goldman Sachs, Morgan Stanley, J.P. Morgan)',
      },
      {
        name: 'Corporate Finance & Capital Markets',
        importance: 'Crucial (OA & Interview)',
        topics: ['Cost of Capital (WACC)', 'Capital Structure Theory', 'Bonds & Equity Instruments', 'Derivatives & Hedging'],
        testedInPlacement: 'Essential for Day-1 IB, Treasury, and Private Equity interviews',
      },
      {
        name: 'Financial Data Analytics & SQL / PowerBI',
        importance: 'High Impact',
        topics: ['Relational SQL Queries', 'Financial Dashboarding', 'Python for Finance (Pandas)', 'Time Series Forecasting'],
        testedInPlacement: 'Key differentiator for modern FinTech and quantitative trading firms',
      },
      {
        name: 'Financial Accounting & Reporting Standards (IFRS / Ind AS)',
        importance: 'Essential Domain',
        topics: ['Cash Flow Statement Analysis', 'Revenue Recognition', 'Working Capital Management', 'Forensic Accounting'],
        testedInPlacement: 'Tested in Big 4 accounting and management consultancy drives',
      },
    ],
    recommendedDegreeIds: ['ca-foundation', 'bba-degree', 'bcom-hons', 'btech-cse', 'bsc-data-science'],
    recommendedCareerIds: ['career-investment-banker', 'career-chartered-accountant'],
    similarCareerIds: ['career-software-engineer', 'career-corporate-lawyer'],
  },

  healthcare_medical: {
    domainId: 'healthcare_medical',
    domainName: 'Healthcare, Clinical Medicine & Pharmaceuticals',
    tagline: 'Skip computer programming bugs, advanced mechanical calculus, and civil surveying to master clinical healing.',
    eliminatedSubjects: [
      {
        name: 'Advanced Abstract Calculus & Differential Geometry',
        category: 'Mathematics',
        reason: 'Not required for diagnosing pathology, prescribing pharmaceuticals, or medical practice.',
        academicTimeSaved: '5 hours / week',
      },
      {
        name: 'Computer Programming & Compiler Design',
        category: 'Computer Science',
        reason: 'Writing code syntax and sorting algorithms is unnecessary for direct patient diagnosis and clinical treatment.',
        academicTimeSaved: '5 hours / week',
      },
      {
        name: 'Machine Tools, Casting & Thermal Engines',
        category: 'Mechanical',
        reason: 'Heavy machinery operation has zero utility in medical wards and surgery theaters.',
        academicTimeSaved: '4 hours / week',
      },
      {
        name: 'Corporate Taxation & Commercial Bookkeeping',
        category: 'Commerce',
        reason: 'Irrelevant to clinical pathology, pharmacology, and patient care management.',
        academicTimeSaved: '3 hours / week',
      },
    ],
    highYieldSubjects: [
      {
        name: 'Human Anatomy & Histology',
        importance: 'Crucial (OA & Interview)',
        topics: ['Gross Anatomy & Organ Systems', 'Neuroanatomy', 'Tissue Microstructure', 'Radiological Anatomy'],
        testedInPlacement: 'Foundational testing for clinical rounds, NEET PG, and hospital residency',
      },
      {
        name: 'Human Physiology & Biochemistry',
        importance: 'Crucial (OA & Interview)',
        topics: ['Cardiovascular & Respiratory Dynamics', 'Endocrine Feedback', 'Metabolic Pathways', 'Renal Clearance'],
        testedInPlacement: 'Tested in all institutional medical examinations and hospital licensing',
      },
      {
        name: 'Clinical Pharmacology & Therapeutics',
        importance: 'High Impact',
        topics: ['Pharmacokinetics & Dynamics', 'Antimicrobial Resistance', 'Adverse Drug Reactions', 'Dosage Calculations'],
        testedInPlacement: 'Crucial for clinical safe-practice and hospital medical officer recruitment',
      },
      {
        name: 'Pathology, Microbiology & Diagnostic Labs',
        importance: 'Essential Domain',
        topics: ['Histopathology', 'Infectious Disease Profiling', 'Hematology Interpretation', 'Clinical Immunology'],
        testedInPlacement: 'Directly tested in diagnostic center and corporate hospital recruitments',
      },
    ],
    recommendedDegreeIds: ['mbbs', 'b-pharm', 'bams', 'bds', 'bvsc-veterinary'],
    recommendedCareerIds: ['career-doctor-mbbs'],
    similarCareerIds: ['career-ai-ml-engineer', 'career-civil-services-ias'],
  },

  design_product: {
    domainId: 'design_product',
    domainName: 'UI/UX, Product Design & Digital Media',
    tagline: 'Eliminate dry physics equations, mechanical calculations, and rote biology to focus on human psychology and design systems.',
    eliminatedSubjects: [
      {
        name: 'Complex Differential Equations & Calculus',
        category: 'Mathematics',
        reason: 'Mathematical proofs and integration formulas are unneeded for digital product aesthetics and user empathy.',
        academicTimeSaved: '5 hours / week',
      },
      {
        name: 'Chemical Reactions & Wet Lab Titration',
        category: 'Chemistry',
        reason: 'Zero relationship to UI components, wireframes, design systems, and Figma prototypes.',
        academicTimeSaved: '5 hours / week',
      },
      {
        name: 'Biological Anatomy & Botanical Taxonomy',
        category: 'Biology',
        reason: 'Plant genetics and dissecting specimens have zero overlap with user experience research.',
        academicTimeSaved: '4 hours / week',
      },
      {
        name: 'Corporate Tax Statutes & Auditing',
        category: 'Commerce',
        reason: 'Irrelevant to digital typography, color theory, design sprints, and product design.',
        academicTimeSaved: '3 hours / week',
      },
    ],
    highYieldSubjects: [
      {
        name: 'UI/UX Design Systems & Figma Prototyping',
        importance: 'Crucial (OA & Interview)',
        topics: ['Figma Auto-Layout & Variants', 'Design Tokens & Atomic Design', 'Interactive Micro-Animations', 'Responsive Grid Systems'],
        testedInPlacement: 'Mandatory portfolio review in Tier-1 product startups (Swiggy, Razorpay, CRED, Apple)',
      },
      {
        name: 'User Research & Human-Computer Interaction (HCI)',
        importance: 'Crucial (OA & Interview)',
        topics: ['Qualitative & Quantitative User Interviews', 'Usability Testing & Heuristics', 'Information Architecture', 'User Journey Mapping'],
        testedInPlacement: 'Tested in product design challenge rounds during campus placement',
      },
      {
        name: 'Product Thinking & Design Strategy',
        importance: 'High Impact',
        topics: ['Business Metrics (Conversion, Retention)', 'A/B Testing Methodologies', 'Accessibility (WCAG 2.1)', 'Design Sprint Frameworks'],
        testedInPlacement: 'Key deciding factor for Senior Product Designer and UX Lead offers',
      },
      {
        name: 'Front-End Design Integration (HTML/CSS & Micro-Interactions)',
        importance: 'Essential Domain',
        topics: ['CSS Grid & Flexbox', 'Tailwind & Framer Motion', 'Design Hand-off to Developers', 'Design QA'],
        testedInPlacement: 'Huge competitive advantage in multi-disciplinary product teams',
      },
    ],
    recommendedDegreeIds: ['b-des', 'btech-cse', 'bca-degree', 'b-plan'],
    recommendedCareerIds: ['career-ui-ux-designer', 'career-architect'],
    similarCareerIds: ['career-software-engineer', 'career-ai-ml-engineer'],
  },

  law_governance: {
    domainId: 'law_governance',
    domainName: 'Corporate Law, Policy & Civil Administration',
    tagline: 'Skip organic chemistry, mathematical physics, and programming code to master constitutional principles, contracts, and advocacy.',
    eliminatedSubjects: [
      {
        name: 'Organic & Inorganic Chemistry Labs',
        category: 'Chemistry',
        reason: 'Chemical formulas have zero relevance in legal contracts, corporate governance, and courtrooms.',
        academicTimeSaved: '6 hours / week',
      },
      {
        name: 'Advanced Calculus & Differential Math',
        category: 'Mathematics',
        reason: 'Complex math integration is not tested in law firm campus placements or UPSC civil examinations.',
        academicTimeSaved: '5 hours / week',
      },
      {
        name: 'Programming & Algorithm Complexity',
        category: 'Computer Science',
        reason: 'Writing software loops is unneeded for contract drafting, arbitration, and statutory analysis.',
        academicTimeSaved: '4 hours / week',
      },
      {
        name: 'Workshop Fabrication & Machining',
        category: 'Mechanical',
        reason: 'Zero application to jurisprudence, civil dispute resolution, and public policy formulation.',
        academicTimeSaved: '3 hours / week',
      },
    ],
    highYieldSubjects: [
      {
        name: 'Corporate & Commercial Contract Law',
        importance: 'Crucial (OA & Interview)',
        topics: ['Mergers & Acquisitions (M&A) Drafting', 'Indemnity & Liability Clauses', 'Companies Act 2013', 'SEBI Regulations'],
        testedInPlacement: 'Primary requirement for Tier-1 Law Firms (Shardul Amarchand, Cyril Amarchand, Khaitan & Co)',
      },
      {
        name: 'Constitutional Law & Administrative Governance',
        importance: 'Crucial (OA & Interview)',
        topics: ['Fundamental Rights & Judicial Review', 'Separation of Powers', 'Public Interest Litigation (PIL)', 'Statutory Interpretation'],
        testedInPlacement: 'Crucial for judicial clerkships, public policy consultancies, and UPSC interviews',
      },
      {
        name: 'Alternative Dispute Resolution (ADR) & Arbitration',
        importance: 'High Impact',
        topics: ['Domestic & International Arbitration', 'Mediation & Conciliation', 'Enforcement of Awards', 'UNCITRAL Rules'],
        testedInPlacement: 'High-growth hiring area across multinational dispute consultancies',
      },
      {
        name: 'Legal Research & Precision Drafting',
        importance: 'Essential Domain',
        topics: ['SCC Online & Manupatra Research', 'Memorial & Brief Writing', 'Due Diligence Reports', 'Oral Argumentation'],
        testedInPlacement: 'Tested in Day-1 law firm assessment internships and interview rounds',
      },
    ],
    recommendedDegreeIds: ['ba-llb', 'bba-degree', 'bcom-hons'],
    recommendedCareerIds: ['career-corporate-lawyer', 'career-civil-services-ias'],
    similarCareerIds: ['career-investment-banker', 'career-chartered-accountant'],
  },
};

// -------------------------------------------------------------
// Scoring & Recommendation Engine
// -------------------------------------------------------------
export interface MatchResultItem {
  career: Career;
  recommendedDegree: Degree;
  matchScore: number;
  matchReason: string;
  isTopMatch: boolean;
  isSimilarField: boolean;
  eliminatedSubjectsCount: number;
  highYieldSubjectsCount: number;
  startingCTC: string;
}

export interface RecommendationSummary {
  domainProfile: DomainSubjectProfile;
  topRecommended: MatchResultItem[];
  similarFields: MatchResultItem[];
  eliminatedSubjects: EliminatedSubject[];
  highYieldSubjects: HighYieldPlacementSubject[];
  totalWeeklyHoursSaved: number;
  recommendedDegrees: Degree[];
}

export function computePlacementRecommendations(
  careerDomainId: string,
  avoidSubjectIds: string[],
  placementPriorityId: string,
  academicStreamId: string
): RecommendationSummary {
  // 1. Resolve domain profile, fallback to tech_software
  const domainKey = DOMAIN_SUBJECT_PROFILES[careerDomainId] ? careerDomainId : 'tech_software';
  const profile = DOMAIN_SUBJECT_PROFILES[domainKey];

  // 2. Adjust eliminated subjects dynamically if user explicitly checked items in Question 2
  const activeEliminated: EliminatedSubject[] = [...profile.eliminatedSubjects];

  // Add explicit subjects avoided by the user if not already present
  if (avoidSubjectIds.includes('avoid_chem')) {
    if (!activeEliminated.some((s) => s.category.toLowerCase().includes('chem'))) {
      activeEliminated.push({
        name: 'General & Physical Chemistry',
        category: 'Chemistry',
        reason: 'Pruned according to your preference to avoid chemistry labs and formulas.',
        academicTimeSaved: '4 hours / week',
      });
    }
  }
  if (avoidSubjectIds.includes('avoid_bio')) {
    if (!activeEliminated.some((s) => s.category.toLowerCase().includes('bio'))) {
      activeEliminated.push({
        name: 'Biological Anatomy & Microbe Culture',
        category: 'Biology',
        reason: 'Pruned according to your preference to avoid biology and dissections.',
        academicTimeSaved: '5 hours / week',
      });
    }
  }
  if (avoidSubjectIds.includes('avoid_hard_math')) {
    if (!activeEliminated.some((s) => s.category.toLowerCase().includes('math'))) {
      activeEliminated.push({
        name: 'Theoretical Real Analysis & Multivariable Calculus',
        category: 'Mathematics',
        reason: 'Removed abstract mathematical derivations as requested.',
        academicTimeSaved: '4 hours / week',
      });
    }
  }
  if (avoidSubjectIds.includes('avoid_heavy_code')) {
    activeEliminated.push({
      name: 'Low-Level Assembly & Kernel Programming',
      category: 'Computer Science',
      reason: 'Pruned heavy systems programming to emphasize product, design, or business logic.',
      academicTimeSaved: '4 hours / week',
    });
  }

  // Calculate total weekly hours saved
  const totalWeeklyHoursSaved = activeEliminated.reduce((sum, item) => {
    const hours = parseInt(item.academicTimeSaved.split(' ')[0], 10) || 4;
    return sum + hours;
  }, 0);

  // 3. Match Careers & Degrees
  const allCareers = CAREERS_DATA;
  const scoredCareers: {
    career: Career;
    score: number;
    reason: string;
    isTop: boolean;
    isSimilar: boolean;
  }[] = [];

  allCareers.forEach((career) => {
    let score = 50; // base score

    const isDirectDomainMatch = profile.recommendedCareerIds.includes(career.id);
    const isSimilarDomainMatch = profile.similarCareerIds.includes(career.id);

    if (isDirectDomainMatch) {
      score += 35;
    } else if (isSimilarDomainMatch) {
      score += 20;
    }

    // Adjust for avoid preferences
    if (avoidSubjectIds.includes('avoid_heavy_code') && career.id === 'career-software-engineer') {
      score -= 25; // penalize hardcore coding if user expressly avoided it
    }
    if (avoidSubjectIds.includes('avoid_bio') && career.id === 'career-doctor-mbbs') {
      score -= 45; // severely penalize medical if user hates bio
    }
    if (avoidSubjectIds.includes('avoid_tax_audit') && career.id === 'career-chartered-accountant') {
      score -= 35;
    }
    if (avoidSubjectIds.includes('avoid_rote_law') && career.id === 'career-corporate-lawyer') {
      score -= 35;
    }

    // Adjust for placement priority
    if (placementPriorityId === 'priority_high_ctc') {
      if (
        career.id === 'career-software-engineer' ||
        career.id === 'career-ai-ml-engineer' ||
        career.id === 'career-investment-banker'
      ) {
        score += 10;
      }
    } else if (placementPriorityId === 'priority_remote_global') {
      if (
        career.id === 'career-software-engineer' ||
        career.id === 'career-ui-ux-designer' ||
        career.id === 'career-ai-ml-engineer'
      ) {
        score += 10;
      }
    } else if (placementPriorityId === 'priority_stability') {
      if (
        career.id === 'career-civil-services-ias' ||
        career.id === 'career-doctor-mbbs' ||
        career.id === 'career-chartered-accountant'
      ) {
        score += 10;
      }
    }

    // Stream compatibility bonus
    if (academicStreamId === 'stream_pcm' && career.streamIds.includes('science-pcm')) score += 5;
    if (academicStreamId === 'stream_pcb' && career.streamIds.includes('science-pcb')) score += 5;
    if (academicStreamId === 'stream_commerce' && career.streamIds.includes('commerce')) score += 5;
    if (academicStreamId === 'stream_arts' && career.streamIds.includes('humanities')) score += 5;

    // Cap score at 98% max and 20% min
    const finalScore = Math.min(98, Math.max(25, score));

    let reason = 'Solid career alignment with your domain interests.';
    if (isDirectDomainMatch) {
      reason = `Direct match for ${profile.domainName} with high campus placement momentum.`;
    } else if (isSimilarDomainMatch) {
      reason = `Complementary high-growth alternative with transferable skills from ${profile.domainName}.`;
    }

    scoredCareers.push({
      career,
      score: finalScore,
      reason,
      isTop: isDirectDomainMatch,
      isSimilar: isSimilarDomainMatch,
    });
  });

  // Sort descending by score
  scoredCareers.sort((a, b) => b.score - a.score);

  // Separate into top recommendations and similar fields
  const topList = scoredCareers.filter((c) => c.isTop || c.score >= 80).slice(0, 4);
  const topIds = new Set(topList.map((t) => t.career.id));
  const similarList = scoredCareers.filter((c) => !topIds.has(c.career.id) && c.score >= 60).slice(0, 4);

  // Map to MatchResultItem
  const mapToResultItem = (item: (typeof scoredCareers)[0], isSimilar: boolean): MatchResultItem => {
    // Find best degree for this career
    let targetDegree: Degree | undefined;
    if (item.career.primaryDegreeIds?.[0]) {
      targetDegree = getDegreeById(item.career.primaryDegreeIds[0]);
    }
    if (!targetDegree) {
      targetDegree = DEGREES_DATA.find((d) => d.careerIds.includes(item.career.id)) || DEGREES_DATA[0];
    }

    const startingCTC =
      item.career.salaryProspects?.entryLevel?.split('(')[0]?.trim() ||
      targetDegree.startingSalaryRange?.split('(')[0]?.trim() ||
      '₹8L – ₹18L LPA';

    return {
      career: item.career,
      recommendedDegree: targetDegree,
      matchScore: item.score,
      matchReason: item.reason,
      isTopMatch: !isSimilar,
      isSimilarField: isSimilar,
      eliminatedSubjectsCount: activeEliminated.length,
      highYieldSubjectsCount: profile.highYieldSubjects.length,
      startingCTC,
    };
  };

  const topRecommended = topList.map((i) => mapToResultItem(i, false));
  const similarFields = similarList.map((i) => mapToResultItem(i, true));

  // Collect recommended degrees
  const degreeMap = new Map<string, Degree>();
  profile.recommendedDegreeIds.forEach((degId) => {
    const deg = getDegreeById(degId);
    if (deg) degreeMap.set(deg.id, deg);
  });
  topRecommended.forEach((t) => {
    if (t.recommendedDegree) degreeMap.set(t.recommendedDegree.id, t.recommendedDegree);
  });

  return {
    domainProfile: profile,
    topRecommended,
    similarFields,
    eliminatedSubjects: activeEliminated,
    highYieldSubjects: profile.highYieldSubjects,
    totalWeeklyHoursSaved,
    recommendedDegrees: Array.from(degreeMap.values()),
  };
}
