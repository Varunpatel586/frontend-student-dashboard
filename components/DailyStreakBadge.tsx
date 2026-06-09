"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface DailyStreakBadgeProps {
  streakDays: number;
}

export default function DailyStreakBadge({ streakDays }: DailyStreakBadgeProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-[1px] shadow-[0_0_20px_rgba(249,115,22,0.15)] flex items-center justify-center min-w-[155px] flex-1 lg:flex-none">
      
      {/* 1. INFINITELY ROTATING CONIC-GRADIENT FOR BORDER GLOW */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "linear",
        }}
        style={{
          background: "conic-gradient(from 0deg, transparent 40%, #f97316 65%, #f59e0b 85%, #ef4444 100%)",
        }}
        className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] pointer-events-none z-0"
      />

      {/* 2. INNER GLASS CARD CONTAINER */}
      <div className="relative z-10 flex items-center gap-4 bg-black/70 backdrop-blur-xl border border-white/5 rounded-[15px] p-4 w-full h-full shadow-[inset_0_0_12px_rgba(245,158,11,0.15),0_0_15px_rgba(245,158,11,0.3)] hover:bg-black/55 transition-colors duration-300">
        
        {/* Animated Flickering Flame Icon container */}
        <motion.div
          animate={{
            scale: [1, 1.12, 0.96, 1.08, 1],
            opacity: [0.9, 1, 0.82, 1, 0.9],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400"
        >
          {/* Flame Icon */}
          <Flame className="h-5.5 w-5.5 fill-orange-500/10 animate-pulse" />
        </motion.div>

        {/* Text Area */}
        <div className="flex flex-col select-none">
          <span className="text-xl font-extrabold text-white/95 tracking-tight leading-none">
            {streakDays}
          </span>
          <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1">
            Day Streak
          </span>
        </div>
      </div>
      
    </div>
  );
}
