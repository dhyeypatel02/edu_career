import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Code2,
  Award,
  Briefcase,
  FileText,
  Mic,
  Target,
  Search,
  TrendingUp,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Flag,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Career } from '../types/career';
import { getCareerExecutionPipeline } from '../data';

interface CareerExecutionHubProps {
  career: Career;
  onAskAI?: (prompt: string) => void;
}

export const CareerExecutionHub: React.FC<CareerExecutionHubProps> = ({ career, onAskAI }) => {
  const pipeline = getCareerExecutionPipeline(career);

  // Active stage tab (1 through 9, or 'all')
  const [activeStage, setActiveStage] = useState<number>(1);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [expandedQA, setExpandedQA] = useState<number | null>(0);

  // Readiness checklist state stored in localStorage
  const storageKey = `educareer_readiness_${career.id}`;
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checkedItems));
    } catch (e) {
      console.error('Failed to save readiness state', e);
    }
  }, [checkedItems, storageKey]);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalChecklist = pipeline.checklistItems.length;
  const completedCount = pipeline.checklistItems.filter((item) => checkedItems[item.id]).length;
  const readinessPercentage = totalChecklist > 0 ? Math.round((completedCount / totalChecklist) * 100) : 0;

  const getReadinessLevel = (pct: number) => {
    if (pct >= 85) return { title: 'Placement Ready (Apex)', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    if (pct >= 60) return { title: 'Internship Ready', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' };
    if (pct >= 30) return { title: 'Foundations Built', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    return { title: 'Early Explorer', color: 'text-neutral-400', bg: 'bg-neutral-800 border-neutral-700' };
  };

  const readinessMeta = getReadinessLevel(readinessPercentage);

  const stagesList = [
    { num: 1, title: 'Skill Learning', icon: BookOpen, color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-950/20' },
    { num: 2, title: 'Projects', icon: Code2, color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-950/20' },
    { num: 3, title: 'Certifications', icon: Award, color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-950/20' },
    { num: 4, title: 'Internships', icon: Briefcase, color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-950/20' },
    { num: 5, title: 'Resume & Portfolio', icon: FileText, color: 'text-orange-400', border: 'border-orange-500/30', bg: 'bg-orange-950/20' },
    { num: 6, title: 'Mock Interview', icon: Mic, color: 'text-pink-400', border: 'border-pink-500/30', bg: 'bg-pink-950/20' },
    { num: 7, title: 'Placement Preparation', icon: Target, color: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-950/20' },
    { num: 8, title: 'Job Recommendation', icon: Search, color: 'text-teal-400', border: 'border-teal-500/30', bg: 'bg-teal-950/20' },
    { num: 9, title: 'Career Growth', icon: TrendingUp, color: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-950/20' },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(
      `Subject: ${pipeline.internships.coldOutreachTemplate.subject}\n\n${pipeline.internships.coldOutreachTemplate.body}`
    );
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Top Banner: Flowchart Summary & Readiness Score */}
      <div className="rounded-2xl border border-neutral-800 bg-[#12151c] p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-emerald-400 flex items-center gap-1.5">
                <Zap className="h-3 w-3" />
                College-to-Career Execution Engine
              </span>
              <span className="text-xs text-neutral-400">• Practical 9-Stage Blueprint</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Action Plan: How to Become a {career.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              From day 1 in college through skill acquisition, projects, internships, ATS resumes, and placements to full-time career launch.
            </p>
          </div>

          {/* Interactive Career Readiness Card */}
          <div className="w-full lg:w-auto shrink-0 rounded-xl border border-neutral-800 bg-neutral-900/90 p-4 min-w-[280px]">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs font-mono text-neutral-400 font-semibold uppercase">
                Career Readiness Meter
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${readinessMeta.bg} ${readinessMeta.color} font-bold`}>
                {readinessPercentage}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden mb-2.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-500 rounded-full"
                style={{ width: `${readinessPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-400">
              <span>{completedCount} of {totalChecklist} milestones verified</span>
              <span className={`font-semibold ${readinessMeta.color}`}>{readinessMeta.title}</span>
            </div>
          </div>
        </div>

        {/* 9-Stage Horizontal Interactive Flowchart Ribbon */}
        <div className="mt-8 pt-6 border-t border-neutral-800/80">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>9-Stage Execution Pipeline (Click any stage to view details):</span>
            <span className="text-[10px] text-neutral-500 hidden sm:inline">Flow: Skills → Projects → Certs → Internships → Resume → Interview → Placements → Jobs → Growth</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 scrollbar-thin">
            {stagesList.map((st, i) => {
              const Icon = st.icon;
              const isCurrent = activeStage === st.num;

              return (
                <React.Fragment key={st.num}>
                  {i > 0 && <span className="text-neutral-700 text-xs shrink-0 select-none">→</span>}
                  <button
                    onClick={() => setActiveStage(st.num)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold shrink-0 transition-all ${
                      isCurrent
                        ? 'bg-white text-neutral-950 shadow-md ring-2 ring-emerald-400/50 scale-105'
                        : 'border border-neutral-800 bg-[#161922] text-neutral-300 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${isCurrent ? 'text-neutral-950' : st.color}`} />
                    <span className="whitespace-nowrap">{st.title}</span>
                  </button>
                </React.Fragment>
              );
            })}
            <span className="text-neutral-700 text-xs shrink-0 select-none">→</span>
            <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 px-3 py-2 text-xs font-bold text-emerald-300 shrink-0">
              <Flag className="h-3.5 w-3.5 text-emerald-400" />
              <span>Career Launch</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dynamic Stage Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stage Detail (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stage 1: Skill Learning */}
          {activeStage === 1 && (
            <div className="rounded-2xl border border-neutral-800 bg-[#14171e] p-6 sm:p-7 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Stage 1: Skill Learning Hub</h3>
                  <p className="text-xs text-neutral-400">Master core foundational and applied technical competencies</p>
                </div>
              </div>

              <div className="space-y-6">
                {pipeline.skillsHub.map((group, idx) => (
                  <div key={idx} className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-neutral-800 text-[10px] font-mono text-emerald-400">
                          {idx + 1}
                        </span>
                        {group.category}
                      </h4>
                      <span className="text-[11px] font-mono text-neutral-400 bg-neutral-800/80 px-2.5 py-0.5 rounded border border-neutral-700 w-fit">
                        ⏱️ Est. Timeline: {group.estimatedWeeks}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {group.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="rounded-lg border border-neutral-700/60 bg-neutral-800/80 px-2.5 py-1 text-xs font-mono text-neutral-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Resources */}
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
                        Recommended Verified Learning Pathways:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {group.recommendedResources.map((res, rIdx) => (
                          <div
                            key={rIdx}
                            className="flex items-center gap-1.5 rounded-md border border-neutral-800 bg-[#0f1115] px-2.5 py-1 text-xs text-neutral-300"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>{res.name}</span>
                            <span className="text-[10px] font-mono text-neutral-500 bg-neutral-900 px-1 py-0.2 rounded">
                              {res.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stage 2: Projects */}
          {activeStage === 2 && (
            <div className="rounded-2xl border border-neutral-800 bg-[#14171e] p-6 sm:p-7 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Code2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Stage 2: Tiered Project Ideas Bank</h3>
                  <p className="text-xs text-neutral-400">Build high-impact resume portfolio projects tailored to recruiters</p>
                </div>
              </div>

              <div className="space-y-6">
                {pipeline.projects.map((proj, pIdx) => {
                  const tierBadgeColor =
                    proj.tier === 'Industry Capstone'
                      ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-400'
                      : proj.tier === 'Intermediate'
                      ? 'border-amber-500/40 bg-amber-950/30 text-amber-400'
                      : 'border-blue-500/40 bg-blue-950/30 text-blue-400';

                  return (
                    <div key={pIdx} className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded border font-bold w-fit ${tierBadgeColor}`}>
                          Tier: {proj.tier}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.recommendedTechStack.map((tech, tIdx) => (
                            <span key={tIdx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700/60">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h4 className="text-base font-bold text-white">{proj.title}</h4>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        <strong className="text-neutral-200">Problem Statement:</strong> {proj.problemStatement}
                      </p>

                      <div className="rounded-lg border border-neutral-800 bg-[#0f1115] p-3">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1.5 font-semibold">
                          Key Features to Implement:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-neutral-300">
                          {proj.keyFeatures.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-1.5">
                              <span className="text-emerald-400 mt-0.5">✓</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/20 border border-amber-800/40 p-2.5 rounded-lg">
                        <Sparkles className="h-4 w-4 shrink-0 text-amber-400" />
                        <span><strong>Recruiter Portfolio Impact:</strong> {proj.portfolioImpact}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stage 3: Certifications */}
          {activeStage === 3 && (
            <div className="rounded-2xl border border-neutral-800 bg-[#14171e] p-6 sm:p-7 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Stage 3: High-ROI Certifications</h3>
                  <p className="text-xs text-neutral-400">Industry-recognized credentials that actually pass recruiter screens</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {pipeline.certifications.map((cert, cIdx) => (
                  <div key={cIdx} className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{cert.name}</span>
                        <span className="rounded bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 text-[10px] font-mono text-purple-300">
                          {cert.level}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-800/50 w-fit">
                        {cert.worthScore}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
                      <span>Authority: <strong className="text-neutral-200">{cert.issuingBody}</strong></span>
                      <span>•</span>
                      <span>Cost: <strong className="text-neutral-200">{cert.estimatedCost}</strong></span>
                    </div>

                    <p className="text-xs text-neutral-300 pt-1">
                      <strong className="text-neutral-200">Why it matters:</strong> {cert.whyItMatters}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stage 4: Internships */}
          {activeStage === 4 && (
            <div className="rounded-2xl border border-neutral-800 bg-[#14171e] p-6 sm:p-7 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Stage 4: Internship Playbook</h3>
                  <p className="text-xs text-neutral-400">Strategies, timelines, and outreach templates to land your first role</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                    Optimal Application Window
                  </span>
                  <span className="text-xs font-bold text-white">{pipeline.internships.idealTimeline}</span>
                </div>
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                    Typical Monthly Stipend
                  </span>
                  <span className="text-xs font-bold text-emerald-400">{pipeline.internships.stipendRange}</span>
                </div>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
                  Top Verified Application Portals
                </span>
                <div className="flex flex-wrap gap-2">
                  {pipeline.internships.topPlatforms.map((plat, pIdx) => (
                    <span key={pIdx} className="rounded-md border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-xs text-neutral-200 font-mono">
                      {plat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cold Email Outreach Template */}
              <div className="rounded-xl border border-neutral-800 bg-[#0f1115] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                    Cold Email Outreach Pitch (LinkedIn / Email)
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 text-[11px] font-mono text-neutral-300 hover:text-white bg-neutral-800 border border-neutral-700 px-2.5 py-1 rounded transition"
                  >
                    {copiedEmail ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedEmail ? 'Copied!' : 'Copy Template'}</span>
                  </button>
                </div>

                <div className="text-xs font-mono text-neutral-300 bg-neutral-950 p-3.5 rounded-lg border border-neutral-800/80 leading-relaxed whitespace-pre-line">
                  <strong className="text-emerald-400 block mb-1">Subject: {pipeline.internships.coldOutreachTemplate.subject}</strong>
                  {pipeline.internships.coldOutreachTemplate.body}
                </div>
              </div>
            </div>
          )}

          {/* Stage 5: Resume & Portfolio */}
          {activeStage === 5 && (
            <div className="rounded-2xl border border-neutral-800 bg-[#14171e] p-6 sm:p-7 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Stage 5: Resume & ATS Portfolio Blueprint</h3>
                  <p className="text-xs text-neutral-400">Beat automated filters with high-conversion bullet formulas</p>
                </div>
              </div>

              {/* Google XYZ Formula */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase font-bold text-orange-400">The Google XYZ Resume Formula:</span>
                  <span className="text-xs text-neutral-400">"Accomplished [X], as measured by [Y], by doing [Z]"</span>
                </div>

                <div className="space-y-3">
                  {pipeline.resumeGuide.googleXyzExamples.map((item, gIdx) => (
                    <div key={gIdx} className="rounded-lg border border-neutral-800 bg-[#0f1115] p-3.5 space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                        <span className="text-emerald-300"><strong className="text-neutral-500">X (Outcome):</strong> {item.x}</span>
                        <span className="text-amber-300"><strong className="text-neutral-500">Y (Metric):</strong> {item.y}</span>
                        <span className="text-cyan-300"><strong className="text-neutral-500">Z (Method):</strong> {item.z}</span>
                      </div>
                      <div className="pt-2 border-t border-neutral-800 text-xs text-white font-medium">
                        "{item.fullBullet}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Verbs */}
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
                  High-Impact Action Verbs to Use:
                </span>
                <div className="flex flex-wrap gap-2">
                  {pipeline.resumeGuide.actionVerbs.map((verb, vIdx) => (
                    <span key={vIdx} className="rounded-md border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-xs font-mono text-neutral-200">
                      {verb}
                    </span>
                  ))}
                </div>
              </div>

              {/* ATS Guidelines */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
                  ATS Formatting Checklist:
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {pipeline.resumeGuide.atsGuidelines.map((guide, gIdx) => (
                    <li key={gIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{guide}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Stage 6: Mock Interview */}
          {activeStage === 6 && (
            <div className="rounded-2xl border border-neutral-800 bg-[#14171e] p-6 sm:p-7 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                    <Mic className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Stage 6: Mock Interview & Q&A Arena</h3>
                    <p className="text-xs text-neutral-400">Master technical logic and behavioral STAR narratives</p>
                  </div>
                </div>

                {onAskAI && (
                  <button
                    onClick={() =>
                      onAskAI(
                        `Conduct a simulated mock interview with me for the role of "${career.title}". Start with 1 challenging technical question and wait for my response before evaluating!`
                      )
                    }
                    className="flex items-center gap-1.5 rounded-lg border border-pink-500/40 bg-pink-950/30 px-3 py-1.5 text-xs font-bold text-pink-300 hover:bg-pink-900/40 transition shadow-sm"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-pink-400" />
                    <span className="hidden sm:inline">AI Mock Interviewer</span>
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {pipeline.mockInterviews.map((qa, qIdx) => {
                  const isExpanded = expandedQA === qIdx;

                  return (
                    <div
                      key={qIdx}
                      className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden transition"
                    >
                      <button
                        onClick={() => setExpandedQA(isExpanded ? null : qIdx)}
                        className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-neutral-800/40 transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="rounded bg-neutral-800 border border-neutral-700 px-2 py-0.5 text-[10px] font-mono text-neutral-300">
                            {qa.roundType}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white">{qa.question}</span>
                        </div>
                        {isExpanded ? <ChevronUp className="h-4 w-4 text-neutral-400" /> : <ChevronDown className="h-4 w-4 text-neutral-400" />}
                      </button>

                      {isExpanded && (
                        <div className="p-4 pt-0 border-t border-neutral-800/60 space-y-3 bg-[#0f1115]/50">
                          <div>
                            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                              Model Answer Framework:
                            </span>
                            <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                              {qa.idealAnswerFramework}
                            </p>
                          </div>

                          <div className="rounded-lg border border-pink-500/30 bg-pink-950/20 p-2.5 text-xs text-pink-300">
                            <strong>💡 Pro Interview Tip:</strong> {qa.starTip}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stage 7: Placement Preparation */}
          {activeStage === 7 && (
            <div className="rounded-2xl border border-neutral-800 bg-[#14171e] p-6 sm:p-7 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Stage 7: Campus & Off-Campus Placement Prep</h3>
                  <p className="text-xs text-neutral-400">3-phase timetable and aptitude mastery plan</p>
                </div>
              </div>

              {/* 3-Phase Timetable */}
              <div className="space-y-4">
                {pipeline.placementPrep.timelinePhases.map((phase, pIdx) => (
                  <div key={pIdx} className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{phase.phase}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                        {phase.duration}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {phase.focusAreas.map((f, fIdx) => (
                        <span key={fIdx} className="text-xs text-neutral-300 bg-[#0f1115] border border-neutral-800 px-2 py-1 rounded">
                          • {f}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Recruitment Rounds */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
                  Standard Company Recruitment Rounds:
                </span>
                <div className="space-y-1.5 text-xs text-neutral-300">
                  {pipeline.placementPrep.recruitmentRounds.map((round, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-2">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-900 text-indigo-300 text-[10px] font-mono">
                        {rIdx + 1}
                      </span>
                      <span>{round}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Stage 8: Job Market & Recommendations */}
          {activeStage === 8 && (
            <div className="rounded-2xl border border-neutral-800 bg-[#14171e] p-6 sm:p-7 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Stage 8: Job Market & Compensation Reality</h3>
                  <p className="text-xs text-neutral-400">Realistic starting packages and verified top hiring companies</p>
                </div>
              </div>

              {/* Salary Tiers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                    Tier-1 Product / Elite
                  </span>
                  <span className="text-sm font-bold text-white">{pipeline.jobMarket.tier1CTC}</span>
                </div>
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                    Tier-2 Regional / MNC
                  </span>
                  <span className="text-sm font-bold text-white">{pipeline.jobMarket.tier2CTC}</span>
                </div>
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                    Tier-3 Mass Recruiter
                  </span>
                  <span className="text-sm font-bold text-white">{pipeline.jobMarket.tier3CTC}</span>
                </div>
              </div>

              {/* Companies */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
                  Top Active Hiring Organizations:
                </span>
                <div className="flex flex-wrap gap-2">
                  {pipeline.jobMarket.topHiringCompanies.map((comp, cIdx) => (
                    <span key={cIdx} className="rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1 text-xs text-white font-mono">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hiring Hubs */}
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span>Key Hiring Hubs:</span>
                <span className="text-neutral-200">{pipeline.jobMarket.hiringHubs.join(' • ')}</span>
              </div>
            </div>
          )}

          {/* Stage 9: Career Growth */}
          {activeStage === 9 && (
            <div className="rounded-2xl border border-neutral-800 bg-[#14171e] p-6 sm:p-7 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Stage 9: Long-Term Career Growth Ladder</h3>
                  <p className="text-xs text-neutral-400">Promotions, seniority milestones, and future-proof specializations</p>
                </div>
              </div>

              <div className="relative pl-6 border-l-2 border-neutral-800 space-y-6">
                {pipeline.growthLadder.stages.map((stage, sIdx) => (
                  <div key={sIdx} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-700 bg-neutral-950 text-[10px] font-mono font-bold text-yellow-400">
                      {sIdx + 1}
                    </div>

                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{stage.title}</span>
                          <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                            {stage.experienceYears}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {stage.expectedCTC}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-300">{stage.responsibilities}</p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {stage.keySkillsToUpgrade.map((sk, kIdx) => (
                          <span key={kIdx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700/60">
                            Upgrade: {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Emerging trends */}
              <div className="rounded-xl border border-yellow-500/30 bg-yellow-950/20 p-4">
                <span className="text-xs font-bold text-yellow-300 font-mono uppercase block mb-1.5">
                  Future-Proofing & Emerging Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {pipeline.growthLadder.emergingTrends.map((trend, tIdx) => (
                    <span key={tIdx} className="rounded-md border border-yellow-800/60 bg-neutral-900 px-2.5 py-1 text-xs text-neutral-200">
                      ⚡ {trend}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Student Readiness Checklist */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-neutral-800 bg-[#14171e] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Readiness Checklist
              </h3>
              <span className="text-[11px] font-mono text-neutral-400">
                {completedCount}/{totalChecklist} Done
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Check off each milestone as you achieve it during college to calculate your live placement readiness score.
            </p>

            <div className="space-y-3 pt-2">
              {pipeline.checklistItems.map((item) => {
                const isChecked = !!checkedItems[item.id];

                return (
                  <button
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isChecked
                        ? 'border-emerald-500/40 bg-emerald-950/20 text-neutral-200'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-300'
                    }`}
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded mt-0.5 shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-emerald-500 text-neutral-950'
                          : 'border border-neutral-700 bg-neutral-800'
                      }`}
                    >
                      {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`text-xs font-semibold ${isChecked ? 'text-white line-through opacity-80' : 'text-neutral-200'}`}>
                          {item.title}
                        </span>
                        <span className="text-[9px] font-mono uppercase text-neutral-500 bg-neutral-800/80 px-1.5 py-0.2 rounded shrink-0">
                          {item.stageName}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-tight">
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* AI Advisor Prompt Button */}
            {onAskAI && (
              <button
                onClick={() =>
                  onAskAI(
                    `I am preparing for a career as a "${career.title}". I have completed ${completedCount} out of ${totalChecklist} milestones in my readiness checklist. What should be my immediate next step this month to maximize my placement chances?`
                  )
                }
                className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 p-3 text-xs font-bold text-white hover:border-neutral-500 hover:bg-neutral-800 transition active:scale-95 shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>Ask AI for Next Month's Target</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
