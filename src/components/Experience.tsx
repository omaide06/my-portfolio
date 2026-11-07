import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Award, Calendar, Building2, CheckCircle2, MousePointerClick } from 'lucide-react';

interface AcademicRecord {
  id: string;
  tabLabel: string;
  badge: string;
  degree: string;
  institution: string;
  affiliation?: string;
  timeline: string;
  scoreLabel: string;
  scoreValue: string;
  semesterOrStatus?: string;
  summary: string;
}

const ACADEMIC_RECORDS: AcademicRecord[] = [
  {
    id: 'btech',
    tabLabel: 'Undergraduate Degree',
      badge: 'Undergraduate Degree',
    degree: 'B.Tech. in Computer Science and Engineering',
    institution: 'Sagar Institute of Research and Technology–Excellence (SIRTE)',
    affiliation: 'Affiliated with RGPV, Bhopal',
    timeline: '2024–2028 (Expected)',
    scoreLabel: 'CGPA',
    scoreValue: '7.6',
    semesterOrStatus: 'Current Semester : 5th',
    summary: 'Focused on core computer science foundations, algorithm engineering, neural networks, full-stack application development, and scalable cloud architectures.',
  },
  {
    id: 'class12',
    tabLabel: 'Senior Secondary',
    badge: 'Senior Secondary (10+2)',
    degree: 'Class XII — PCM (Physics, Chemistry, Mathematics)',
    institution: 'PM SHRI Kendriya Vidyalaya, Sidhi, Madhya Pradesh',
    affiliation: 'Central Board of Secondary Education (CBSE)',
    timeline: '2024',
    scoreLabel: 'Final Score',
    scoreValue: '75%',
    semesterOrStatus: 'Completed',
    summary: 'Rigorous pre-engineering foundation in analytical mathematics, theoretical physics, and chemical sciences under standard CBSE curriculum.',
  },
  {
    id: 'class10',
    tabLabel: 'Secondary Education',
    badge: 'Secondary Education',
    degree: 'Class X — All Core Subjects',
    institution: 'PM SHRI Kendriya Vidyalaya, Sidhi, Madhya Pradesh',
    affiliation: 'Central Board of Secondary Education (CBSE)',
    timeline: '2022',
    scoreLabel: 'Final Score',
    scoreValue: '74%',
    semesterOrStatus: 'Completed',
    summary: 'Comprehensive secondary school education emphasizing scientific principles, foundational mathematics, and communicative English proficiency.',
  },
];

export default function Experience() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Active item is hovered card, or clicked/selected card
  const activeId = hoveredId || selectedId;
  const activeRecord = ACADEMIC_RECORDS.find((rec) => rec.id === activeId);

  const handleCardClick = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="experience"
      className="min-h-full min-h-screen py-10 md:py-16 bg-black text-white relative overflow-hidden border-t border-white/5 flex flex-col justify-center"
    >
      {/* 
        Horizontal Looping Text Marquee
        Secondary ambient visual layer matching About and Skills sections
      */}
      <div className="absolute top-8 md:top-12 left-0 right-0 overflow-hidden select-none pointer-events-none z-0 opacity-15">
        <div className="animate-marquee whitespace-nowrap flex text-[10vw] font-display font-extrabold uppercase tracking-tight text-white leading-none">
          <span>academic • academic • academic • academic • academic • academic • academic • academic •&nbsp;</span>
          <span>academic • academic • academic • academic • academic • academic • academic • academic •&nbsp;</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10 w-full">
        {/* Section Heading: Academic Background */}
        <div className="mb-8 md:mb-10 border-b border-white/5 pb-4 text-center flex justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl font-display font-black tracking-tighter uppercase text-white text-center font-bold"
          >
            Academic Background
          </motion.h2>
        </div>

        {/* 2-Column Side-By-Side Layout (Left: 3 clean buttons, Right: White detail panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: 3 Clean Minimal Cards (Cols 1 to 5) */}
          <div className="lg:col-span-5 space-y-3">
            {ACADEMIC_RECORDS.map((record) => {
              const isCardActive = record.id === activeId;

              return (
                <button
                  key={record.id}
                  onClick={() => handleCardClick(record.id)}
                  onMouseEnter={() => setHoveredId(record.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer flex items-center justify-between ${
                    isCardActive
                      ? 'bg-neutral-900 border-mustard shadow-xl shadow-mustard/10 scale-[1.01]'
                      : 'bg-black border-white/10 hover:bg-neutral-900/60 hover:border-white/20'
                  }`}
                >
                  {/* Left Active Accent Bar */}
                  {isCardActive && (
                    <motion.div
                      layoutId="activeAcademicBar"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-mustard rounded-l-2xl"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  <h3
                    className={`text-lg sm:text-xl font-display font-bold tracking-tight transition-colors ${
                      isCardActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                    }`}
                  >
                    {record.tabLabel}
                  </h3>

                  <span
                    className={`text-sm font-mono transition-transform duration-300 ${
                      isCardActive
                        ? 'text-mustard translate-x-0'
                        : 'text-neutral-500 group-hover:text-neutral-300 group-hover:translate-x-1'
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: White Detail Section Card (Smoothly opens on Hover or Click on the Side) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {activeRecord ? (
                /* 1. OPEN STATE: Compact High-Contrast White Detail Card (No overflow / scrollbar) */
                <motion.div
                  key={activeRecord.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white text-neutral-950 rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20 relative overflow-hidden flex flex-col justify-between min-h-[350px]"
                >
                  {/* Watermark Logo */}
                  <div className="absolute top-3 right-5 pointer-events-none select-none opacity-5">
                    <GraduationCap className="w-36 h-36 text-black" />
                  </div>

                  <div>
                    {/* Top Row Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black text-white text-[11px] font-mono font-bold tracking-wide uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-mustard" />
                        {activeRecord.badge}
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-[11px] font-mono text-neutral-700 font-semibold">
                        <Calendar className="w-3 h-3 text-neutral-500" />
                        {activeRecord.timeline}
                      </span>
                    </div>

                    {/* Degree Heading */}
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-neutral-900 tracking-tight leading-snug mb-1.5">
                      {activeRecord.degree}
                    </h3>

                    {/* Institution */}
                    <div className="space-y-0.5 mb-4">
                      <div className="flex items-start gap-1.5 text-xs sm:text-sm font-sans font-semibold text-neutral-800">
                        <Building2 className="w-3.5 h-3.5 text-mustard shrink-0 mt-0.5" />
                        <span>{activeRecord.institution}</span>
                      </div>
                      {activeRecord.affiliation && (
                        <div className="text-[11px] font-mono text-neutral-500 pl-5">
                          • {activeRecord.affiliation}
                        </div>
                      )}
                    </div>

                    {/* Highlight Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {/* Score Card */}
                      <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-200/80 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                            {activeRecord.scoreLabel}
                          </span>
                          <div className="text-xl sm:text-2xl font-display font-black text-black">
                            {activeRecord.scoreValue}
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-mustard/15 flex items-center justify-center text-mustard">
                          <Award className="w-4 h-4 text-amber-600" />
                        </div>
                      </div>

                      {/* Standing Card */}
                      <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-200/80 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">
                            Current Standing
                          </span>
                          <div className="text-xs sm:text-sm font-sans font-bold text-neutral-900 line-clamp-1">
                            {activeRecord.semesterOrStatus || 'Completed'}
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm font-sans text-neutral-600 leading-relaxed">
                      {activeRecord.summary}
                    </p>
                  </div>
                </motion.div>
              ) : (
                /* 2. INITIAL UNOPENED STATE: Clean Minimal Placeholder on the Side */
                <motion.div
                  key="unopened"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-dashed border-white/10 bg-black p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[350px] relative overflow-hidden group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-mustard group-hover:scale-110 group-hover:border-mustard/40 transition-all duration-300">
                    <MousePointerClick className="w-6 h-6 text-mustard" />
                  </div>
                  <h4 className="text-lg font-display font-bold text-white mb-1.5">
                    Academic Details
                  </h4>
                  <p className="text-xs font-sans text-neutral-400 max-w-xs leading-relaxed mb-3">
                    Hover or click on any qualification on the left to reveal details.
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-mustard animate-pulse" />
                    <span>Hover or Click to open</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
