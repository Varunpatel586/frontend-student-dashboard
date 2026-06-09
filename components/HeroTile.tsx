"use client";

import { motion } from "framer-motion";
import { Trophy, CalendarDays } from "lucide-react";
import DailyStreakBadge from "./DailyStreakBadge";

export default function HeroTile() {
  // Mock student stats
  const studentName = "Varun";
  const streakDays = 12;
  const currentExp = 2450;
  const targetExp = 3000;
  const expPercentage = (currentExp / targetExp) * 100;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/[0.3] bg-white/[0.02] backdrop-blur-xl p-8 md:p-10 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 select-none h-full w-full">

      {/* 1. SOFT BLURRED ORBITAL GRADIENT IN BACKGROUND */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-indigo/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-accent-cyan/5 rounded-full blur-[90px] pointer-events-none" />

      {/* 2. MAIN GREETING SECTION */}
      <div className="flex-1 space-y-6 relative z-10 w-full">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-indigo tracking-widest uppercase">
            <CalendarDays className="h-4 w-4" />
            <span>Academic Term 2026</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-white/90 leading-tight">
            Welcome back, <span className="bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-cyan bg-clip-text text-transparent">{studentName}</span>
          </h1>

          <p className="text-white/50 text-sm md:text-base max-w-xl leading-relaxed font-normal tracking-wide">
            You're in the top 5% of learners this week. Complete today's Database Engineering module to secure your learning streak!
          </p>
        </div>
      </div>

      {/* 3. TACTILE WIDGET BADGES & XP PROGRESS BAR */}
      <div className="flex flex-col gap-4 relative z-10 w-full lg:w-96 select-none shrink-0">
        
        {/* Badges row */}
        <div className="flex flex-row items-stretch gap-4 w-full">
          {/* Animated Gamer-Style Daily Streak Badge */}
          <DailyStreakBadge streakDays={streakDays} />

          {/* Daily Target Achievement Badge (Tactile Button style) */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex-1 hover:bg-white/[0.07] hover:border-white/15 transition-all duration-300">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-accent-indigo/10 border border-accent-indigo/20 text-accent-indigo">
              <Trophy className="h-5.5 w-5.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white/95 tracking-tighter leading-none">
                1,200
              </span>
              <span className="text-[9px] font-bold text-white/45 uppercase tracking-widest mt-1">
                Daily Rank
              </span>
            </div>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="space-y-2.5 w-full bg-white/[0.01] border border-white/[0.03] rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between text-[11px] font-medium tracking-tight">
            <span className="text-white/40">XP Progress (Level 18)</span>
            <span className="text-white/70">{currentExp} / {targetExp} XP</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/[0.03] p-[0.5px]">
            {/* Using scaleX for progress animation to ensure Zero Layout Shifts */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: expPercentage / 100 }}
              transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
              style={{ originX: 0 }}
              className="h-full bg-gradient-to-r from-accent-indigo to-accent-cyan shadow-[0_0_10px_rgba(99,102,241,0.5)] rounded-full"
            />
          </div>
        </div>
      </div>

    </section>
  );
}
