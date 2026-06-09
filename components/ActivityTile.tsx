"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Award, Calendar } from "lucide-react";

// Types for activity items
interface ActivityDay {
  date: string;
  hours: number;
  level: 0 | 1 | 2 | 3 | 4; // Represents activity intensity
}

export default function ActivityTile() {
  const [hoveredCell, setHoveredCell] = useState<ActivityDay | null>(null);

  // Generate 22 weeks of activity (154 days)
  const generateMockActivity = (): ActivityDay[][] => {
    const weeks: ActivityDay[][] = [];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Seeded random helper to create a realistic-looking contribution patterns
    let seed = 42;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let w = 0; w < 22; w++) {
      const week: ActivityDay[] = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = `Week ${22 - w}, ${daysOfWeek[d]}`;
        const val = random();
        let hours = 0;
        let level: 0 | 1 | 2 | 3 | 4 = 0;

        if (val > 0.85) {
          hours = Math.floor(random() * 4) + 5; // 5-8 hours
          level = 4;
        } else if (val > 0.6) {
          hours = Math.floor(random() * 3) + 3; // 3-5 hours
          level = 3;
        } else if (val > 0.35) {
          hours = Math.floor(random() * 2) + 1; // 1-2 hours
          level = 2;
        } else if (val > 0.15) {
          hours = 0.5;
          level = 1;
        } else {
          hours = 0;
          level = 0;
        }

        week.push({ date: dateStr, hours, level });
      }
      weeks.push(week);
    }
    return weeks;
  };

  const activityData = generateMockActivity();

  // Map activity levels to soft monochromatic green colors (emerald/teal)
  const getLevelClasses = (level: number) => {
    switch (level) {
      case 0: return "bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.08]";
      case 1: return "bg-emerald-500/20 border border-transparent hover:bg-emerald-500/30";
      case 2: return "bg-emerald-500/40 border border-transparent hover:bg-emerald-500/50";
      case 3: return "bg-emerald-500/70 border border-transparent hover:bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.1)]";
      case 4: return "bg-emerald-400 border border-transparent shadow-[0_0_10px_rgba(52,211,153,0.4)]";
      default: return "bg-white/[0.02]";
    }
  };

  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/[0.3] bg-white/[0.02] backdrop-blur-xl p-8 shadow-2xl flex flex-col justify-between h-full min-h-[300px]">

      {/* Background radial gradient mesh */}
      <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-white/90 tracking-tight flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            Study Momentum
          </h2>
          <p className="text-xs text-white/40">Learning hours logged daily</p>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-white/70 shadow-sm">
            <Award className="h-3.5 w-3.5 text-accent-amber" />
            <span>Top 10% Weekly</span>
          </div>
        </div>
      </div>

      {/* Contribution Grid Container */}
      <div className="relative flex-1 flex flex-col justify-center overflow-x-auto py-2 z-10">
        <div className="flex gap-[4px] min-w-max mx-auto select-none">
          {activityData.map((week, wIndex) => (
            <div key={wIndex} className="flex flex-col gap-[4px]">
              {week.map((day, dIndex) => (
                <motion.div
                  key={dIndex}
                  onMouseEnter={() => setHoveredCell(day)}
                  onMouseLeave={() => setHoveredCell(null)}
                  whileHover={{ scale: 1.25, zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={`h-[9px] w-[9px] rounded-[3px] transition-all duration-200 cursor-pointer ${getLevelClasses(day.level)}`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Hover Tooltip Overlay */}
        <div className="h-6 mt-4 text-center">
          {hoveredCell ? (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-medium text-white/80 bg-white/5 border border-white/10 backdrop-blur-md px-3.5 py-1 rounded-full inline-block shadow-lg"
            >
              {hoveredCell.hours > 0 ? (
                <>
                  <span className="font-bold text-emerald-400">{hoveredCell.hours} hrs</span> on {hoveredCell.date}
                </>
              ) : (
                <>No study hours logged on {hoveredCell.date}</>
              )}
            </motion.p>
          ) : (
            <p className="text-[10px] text-white/30 flex items-center justify-center gap-1">
              <Calendar className="h-3 w-3" />
              Hover blocks to inspect daily metrics
            </p>
          )}
        </div>
      </div>

      {/* Legend & Summary Info */}
      <div className="flex items-end justify-between border-t border-white/[0.05] pt-4 mt-4 relative z-10">
        {/* Stats Row */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-white/40 font-medium uppercase tracking-[0.2em]">Weekly Average</span>
            <span className="text-sm font-semibold text-white/90 tracking-tight">
              4.2 <span className="text-white/40 font-normal text-xs">hrs</span>
            </span>
          </div>

          {/* Subtle vertical divider */}
          <div className="h-7 w-[1px] bg-white/[0.06] rounded-full" />

          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-white/40 font-medium uppercase tracking-[0.2em]">Total Logged</span>
            <span className="text-sm font-semibold text-white/90 tracking-tight">
              168 <span className="text-white/40 font-normal text-xs">hrs</span>
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[10px] text-white/40 font-medium pb-0.5">
          <span className="mr-1 tracking-wide">Less</span>
          <div className="h-2.5 w-2.5 rounded-[3px] bg-white/[0.02] border border-white/[0.04]" />
          <div className="h-2.5 w-2.5 rounded-[3px] bg-emerald-500/20" />
          <div className="h-2.5 w-2.5 rounded-[3px] bg-emerald-500/40" />
          <div className="h-2.5 w-2.5 rounded-[3px] bg-emerald-500/70" />
          <div className="h-2.5 w-2.5 rounded-[3px] bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]" />
          <span className="ml-1 tracking-wide">More</span>
        </div>
      </div>

    </article>
  );
}
