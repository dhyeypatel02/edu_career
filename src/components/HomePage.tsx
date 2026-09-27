import React from 'react';
import {
  Compass,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Target,
  Zap,
  BookOpen,
  Award,
  Briefcase,
  Search,
  Users,
  Building,
  Lock,
  ArrowUpRight,
  Layers,
  ChevronRight,
  Check,
} from 'lucide-react';
import { STREAMS_DATA, DEGREES_DATA, CAREERS_DATA } from '../data';
import { UserProfile } from '../types/career';

interface HomePageProps {
  user: UserProfile | null;
  onGetStarted: () => void;
  onOpenLogin: () => void;
  onOpenPlacementHub: () => void;
  onOpenAICounsellor: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  user,
  onGetStarted,
  onOpenLogin,
  onOpenPlacementHub,
  onOpenAICounsellor,
}) => {
  const stats = [
    { label: 'Stream Pathways', value: `${STREAMS_DATA.length}`, sub: 'Class 10 & 11-12' },
    { label: 'Degrees & Courses', value: `${DEGREES_DATA.length}+`, sub: 'B.Tech, MBBS, CA, Law & more' },
    { label: 'Career Roadmaps', value: `${CAREERS_DATA.length}+`, sub: 'With 9-Stage Execution' },
    { label: 'Statutory Councils', value: '10+', sub: 'UGC, AICTE, NMC, BCI, CoA' },
  ];

  const pipelineStages = [
    { title: 'Skill Learning', desc: 'Core DSA, tools, programming & frameworks' },
    { title: 'Projects Bank', desc: 'Beginner, Intermediate & Capstone blueprints' },
    { title: 'Certifications', desc: 'High-ROI verified credentials & licenses' },
    { title: 'Internships', desc: 'Cold outreach templates & stipend timelines' },
    { title: 'ATS Resume', desc: 'Google XYZ bullet formulas & checklists' },
    { title: 'Mock Interview', desc: 'Technical & HR Q&A with STAR frameworks' },
    { title: 'Placements', desc: 'Aptitude, coding rounds & campus schedules' },
    { title: 'Job Matching', desc: 'Salary benchmarks for Tier 1, 2 & 3 colleges' },
    { title: 'Career Growth', desc: '0-2 yr, 2-5 yr & 5-8+ yr leadership progression' },
  ];

  return (
    <div className="min-h-screen bg-[#0b0d12] text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-[#0f1117]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-sm">
                E
              </span>
              Edu Career<span className="text-emerald-400">.</span>
            </span>
            <span className="hidden md:inline-block text-[11px] text-neutral-400 border-l border-neutral-800 pl-3 font-mono">
              National Career Decision Engine
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-neutral-300">
            <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
            <a href="#streams" className="hover:text-white transition">11 Streams</a>
            <a href="#placement-hub" className="hover:text-white transition">9-Stage Execution Hub</a>
            <a href="#regulators" className="hover:text-white transition">Eligibility Rules</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenPlacementHub}
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/40 transition"
            >
              <Zap className="h-3.5 w-3.5 text-emerald-400" />
              <span>Placement Hub</span>
            </button>

            {user ? (
              <button
                onClick={onGetStarted}
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-1.5 text-xs font-bold text-neutral-950 hover:bg-neutral-200 transition shadow-sm"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <>
                <button
                  onClick={onOpenLogin}
                  className="rounded-lg border border-neutral-700 bg-neutral-900/80 px-3.5 py-1.5 text-xs font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white transition"
                >
                  Log In
                </button>
                <button
                  onClick={onGetStarted}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-400 px-4 py-1.5 text-xs font-bold text-neutral-950 hover:bg-emerald-300 transition shadow-sm active:scale-95"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-1 text-xs font-mono font-semibold text-emerald-300 mb-6 backdrop-blur-sm">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            NEP 2020 Grounded • UGC, AICTE, NMC & BCI Compliant
          </div>

          {/* Main Headline */}
          <h1 className="mx-auto max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
            From Class 10 to Dream Career Placements with{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Zero Confusion.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-neutral-300 leading-relaxed">
            A comprehensive, verified Indian career decision engine. Map your exact journey from high school
            streams to degrees, entrance exams, and a <strong className="text-white font-semibold">9-stage college-to-placement execution pipeline</strong>.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-3.5 text-sm font-extrabold text-neutral-950 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <span>Launch Career Decision Engine</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onOpenPlacementHub}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/90 px-6 py-3.5 text-sm font-bold text-neutral-200 hover:border-neutral-500 hover:bg-neutral-800 transition active:scale-95"
            >
              <Zap className="h-4 w-4 text-emerald-400" />
              <span>Explore 9-Stage Placement Hub</span>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-neutral-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" /> Free & Open Access
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-400" /> Login Required to Lock Pathways
            </span>
          </div>

          {/* Stats Bar */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-neutral-800 bg-[#12151d]/70 p-5 text-left backdrop-blur-sm transition hover:border-neutral-700"
              >
                <div className="text-2xl sm:text-3xl font-black text-white">{s.value}</div>
                <div className="text-xs font-bold text-neutral-200 mt-1">{s.label}</div>
                <div className="text-[11px] text-neutral-400 font-mono mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decision Tree Flow Visualizer */}
      <section id="how-it-works" className="py-16 border-t border-neutral-800/80 bg-[#0d1016]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-mono font-semibold text-emerald-400 uppercase">
              Step-by-Step Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
              How Edu Career Guides Your Entire Journey
            </h2>
            <p className="text-sm text-neutral-400 mt-2">
              Every decision you make is grounded in official Indian education regulations with verified prerequisites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="rounded-2xl border border-neutral-800 bg-[#141720] p-6 relative group hover:border-emerald-500/50 transition">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-sm mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-white mb-2">Class 10 Choice</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Choose between Science (PCM/PCB/PCMB), Commerce, Humanities, Vocational, or Polytechnic streams.
              </p>
              <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 p-2 rounded-lg">
                11 Distinct Stream Disciplines
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-neutral-800 bg-[#141720] p-6 relative group hover:border-amber-500/50 transition">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold font-mono text-sm mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-white mb-2">Class 11–12 Track</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Pick your specific subject combinations and elective tracks matching national eligibility mandates.
              </p>
              <div className="text-[11px] font-mono text-amber-400 bg-amber-950/30 border border-amber-800/40 p-2 rounded-lg">
                34 Rigorous Subject Tracks
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-neutral-800 bg-[#141720] p-6 relative group hover:border-purple-500/50 transition">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold font-mono text-sm mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-white mb-2">Course & Entrances</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Explore undergraduate degrees (B.Tech, MBBS, B.Com, LLB) with cutoffs, syllabus, and exams.
              </p>
              <div className="text-[11px] font-mono text-purple-400 bg-purple-950/30 border border-purple-800/40 p-2 rounded-lg">
                53+ Recognized Degrees
              </div>
            </div>

            {/* Step 4 */}
            <div className="rounded-2xl border border-neutral-800 bg-[#141720] p-6 relative group hover:border-cyan-500/50 transition">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold font-mono text-sm mb-4">
                4
              </div>
              <h3 className="text-base font-bold text-white mb-2">Roadmap & Placements</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Get full year-by-year chronological career roadmap plus the 9-stage college placement execution hub.
              </p>
              <div className="text-[11px] font-mono text-cyan-400 bg-cyan-950/30 border border-cyan-800/40 p-2 rounded-lg">
                9-Stage College Launchpad
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9-Stage College-to-Placement Pipeline Showcase */}
      <section id="placement-hub" className="py-16 border-t border-neutral-800/80 bg-[#0f1218]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-mono font-semibold text-emerald-400 uppercase">
                Execution Engine
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
                The 9-Stage College-to-Career Launchpad
              </h2>
              <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
                We don't stop at degree advice. For every single career, you get actionable playbooks to build your portfolio and crack corporate placements.
              </p>
            </div>

            <button
              onClick={onOpenPlacementHub}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-extrabold text-neutral-950 hover:bg-neutral-200 transition shrink-0"
            >
              <Zap className="h-4 w-4 text-emerald-500" />
              <span>Launch Placement Hub Now</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pipelineStages.map((stage, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-neutral-800 bg-[#13161f] p-5 flex items-start gap-3.5 hover:border-neutral-700 transition"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-800 text-xs font-mono font-bold text-emerald-400 shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{stage.title}</h4>
                  <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 Streams Explorer */}
      <section id="streams" className="py-16 border-t border-neutral-800/80 bg-[#0c0e14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-mono font-semibold text-emerald-400 uppercase">
              Holistic Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
              Explore All 11 Recognized Streams
            </h2>
            <p className="text-sm text-neutral-400 mt-2">
              From engineering & medical to corporate finance, corporate law, sports science, vocational precision manufacturing, and merchant navy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STREAMS_DATA.map((st) => (
              <div
                key={st.id}
                className="rounded-2xl border border-neutral-800 bg-[#141720] p-6 flex flex-col justify-between hover:border-neutral-600 transition group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{st.icon}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                      {st.totalDegrees} Degrees
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {st.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {st.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500 font-mono">
                    {st.totalTracks} Sub-Tracks
                  </span>
                  <button
                    onClick={onGetStarted}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>View Stream</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Compliance & Authority Section */}
      <section id="regulators" className="py-16 border-t border-neutral-800/80 bg-[#0d0f16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-neutral-800 bg-[#13161f] p-8 sm:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                Statutory Regulatory Alignment
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
                Authentic Indian Education System Rules
              </h2>
              <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                Unlike generic internet blogs, every pathway on Edu Career is strictly checked against official government circulars:
              </p>
              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>NMC (Medicine):</strong> Recent guidelines permitting PCM + additional biology via NIOS for NEET-UG.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>AICTE & CoA:</strong> Mandatory mathematics rules for B.Tech, B.Arch (NATA/JEE Paper 2).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>ICAI & BCI:</strong> Stream-agnostic entry for CA Foundation & 5-year Law (CLAT/AILET).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>DGCA & DG Shipping:</strong> Vision & 10+2 PCM criteria for Commercial Pilots and Merchant Marine.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="py-16 border-t border-neutral-800 bg-[#090b10] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to Map Your Career with Certainty?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-4 max-w-xl mx-auto">
            Log in to save your custom roadmaps, track your 9-stage placement readiness score, and get personalized guidance.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {user ? (
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-8 py-3.5 text-sm font-extrabold text-neutral-950 hover:bg-emerald-300 transition shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <span>Continue to Your Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={onGetStarted}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-8 py-3.5 text-sm font-extrabold text-neutral-950 hover:bg-emerald-300 transition shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  <span>Get Started & Create Account</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={onOpenLogin}
                  className="w-full sm:w-auto rounded-xl border border-neutral-700 bg-neutral-900 px-8 py-3.5 text-sm font-bold text-white hover:border-neutral-500 transition"
                >
                  Log In to Existing Profile
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800/80 bg-[#08090d] py-10 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Edu Career<span className="text-emerald-400">.</span></span>
            <span>— Free & Open Education Guidance Platform for Indian Students</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-neutral-400">
            <span>NEP 2020</span>
            <span>•</span>
            <span>CBSE / ICSE / State Boards</span>
            <span>•</span>
            <span>UGC / AICTE</span>
            <span>•</span>
            <span>NMC / ICAI / BCI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
