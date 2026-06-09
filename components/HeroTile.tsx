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
    <section className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.02] p-8 md:p-10 shadow-[0_24px_60px_-16px_rgba(255,255,255,0.1)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 select-none h-full w-full transition-shadow duration-500 hover:shadow-[0_32px_80px_-16px_rgba(255,255,255,0.16)]">
      {/* 1. SOFT BLURRED ORBITAL GRADIENT IN BACKGROUND */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-blue/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-accent-cyan/5 rounded-full blur-[90px] pointer-events-none" />

      {/* 2. MAIN GREETING SECTION */}
      <div className="flex-1 space-y-6 relative z-10 w-full">
        <div className="space-y-2.5">
          {/* <div className="flex items-center gap-2 text-xs font-semibold text-accent-indigo tracking-widest uppercase">
            <CalendarDays className="h-4 w-4" />
            <span>Academic Term 2026</span>
          </div> */}

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-white/90 leading-tight">
            Welcome back, <span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">{studentName}</span>
          </h1>

          <p className="text-white/50 text-sm md:text-base max-w-xl leading-relaxed font-normal tracking-wide">
            You're in the top 5% of learners this week. Complete today's Database Engineering module to secure your learning streak!
          </p>
        </div>
      </div>

      {/* 3. TACTILE WIDGET BADGES & XP PROGRESS BAR */}
      <div className="flex flex-col gap-4 relative z-10 w-full lg:w-96 select-none shrink-0">

        {/* Badges row — grid enforces strict 50/50 equal width on both */}
        <div className="grid grid-cols-2 items-stretch gap-4 w-full">
          {/* Animated Gamer-Style Daily Streak Badge */}
          <DailyStreakBadge streakDays={streakDays} />

          {/* Daily Rank Badge */}
          <div className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:bg-white/[0.04] hover:border-white/10 hover:shadow-[0_4px_24px_rgba(255,255,255,0.06)] transition-all duration-300">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue">
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
        <div className="space-y-2.5 w-full bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 shadow-sm">
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
              className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan shadow-[0_0_10px_rgba(6,182,212,0.4)] rounded-full"
            />
          </div>
        </div>
      </div>

    </section>
  );
}
