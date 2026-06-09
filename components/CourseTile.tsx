"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Course } from "@/types/database.types";
import { ArrowRight, BookOpen } from "lucide-react";

interface CourseTileProps {
  course: Course;
}

export default function CourseTile({ course }: CourseTileProps) {
  // Dynamically resolve Lucide React icon name to Component
  // If not found, fallback to standard BookOpen icon
  const IconComponent = (Icons as any)[course.icon_name] || BookOpen;

  // Format date helper
  const formattedDate = new Date(course.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <motion.article
      layout
      whileHover={{
        scale: 1.01,
        y: -2,
        borderColor: "rgba(255, 255, 255, 0.12)",
        boxShadow: "0 20px 48px -10px rgba(255, 255, 255, 0.15)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.02] p-7 flex flex-col justify-between h-64 shadow-[0_12px_30px_-10px_rgba(255,255,255,0.08)] cursor-pointer select-none group transition-all duration-300`}
    >
      {/* 1. SUBTLE RADIAL GRADIENT MASK FOR LOCALIZED LIGHT SOURCE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(6,182,212,0.04)_0%,transparent_60%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Ambient background glows */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-16 -left-16 w-32 h-32 bg-accent-blue/5 border-white/[0.2] rounded-full blur-2xl pointer-events-none"
      />

      {/* Course Icon and Header */}
      <div className="flex justify-between items-start relative z-10">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 group-hover:text-accent-blue group-hover:border-accent-blue/30 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.2)] transition-all duration-300">
          <IconComponent className="h-5 w-5 transition-transform duration-300 group-hover:scale-105" />
        </div>
        <div className="flex items-center gap-1 text-[9px] font-bold text-white/40 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-lg border border-white/[0.02]">
          <span>Enrolled</span>
        </div>
      </div>

      {/* Course Title */}
      <div className="space-y-1.5 relative z-10 my-4">
        <h3 className="text-sm md:text-base font-bold text-white/80 group-hover:text-white transition-colors duration-250 line-clamp-2 leading-snug tracking-tighter">
          {course.title}
        </h3>
        <p suppressHydrationWarning className="text-[11px] text-white/40">
          Started {formattedDate}
        </p>
      </div>

      {/* Progress Section */}
      <div className="space-y-2.5 relative z-10 w-full">
        <div className="flex justify-between text-xs tracking-tight">
          <span className="text-white/40 font-medium">Syllabus Completed</span>
          <span className="font-semibold text-accent-blue group-hover:text-accent-cyan transition-colors duration-300">
            {course.progress}%
          </span>
        </div>

        {/* Progress Bar Container: Pill shaped track */}
        <div className="h-2.5 w-full bg-white/5 rounded-full border border-white/[0.02] overflow-hidden relative p-[0.5px]">
          {/* Animated Custom Progress Bar using scaleX for Zero Layout Shifts */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: course.progress / 100 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
            style={{ originX: 0 }}
            className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan shadow-[0_0_10px_rgba(6,182,212,0.4)] rounded-full"
          />
        </div>

        {/* Footer Link hint */}
        <div className="flex items-center justify-between pt-1.5 text-[9px] font-bold text-white/40 group-hover:text-white/70 transition-colors duration-300 tracking-widest uppercase">
          <span>Resume Module</span>
          <ArrowRight className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

    </motion.article>
  );
}
