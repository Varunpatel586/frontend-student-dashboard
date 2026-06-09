import { Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import HeroTile from "@/components/HeroTile";
import ActivityTile from "@/components/ActivityTile";
import CourseListSection from "@/components/CourseListSection";
import CourseGridSkeleton from "@/components/CourseGridSkeleton";
import { Bell, Search, Sparkles } from "lucide-react";

export default function Home() {
  // Current date for dashboard header metadata
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="min-h-screen bg-[#44444f] bg-cyber-grid bg-ambient-radial text-zinc-100 flex flex-col md:flex-row relative">

      {/* 1. COLLAPSIBLE SIDEBAR MENU */}
      <Sidebar />

      {/* 2. MAIN CONTENT LAYOUT WRAPPER */}
      {/* Handles responsive paddings: 
          - Mobile: pb-20 (bottom nav bar offset)
          - Tablet: md:pl-20 (collapsed sidebar offset)
          - Desktop: lg:pl-64 (expanded sidebar offset) */}
      <main className="flex-1 pl-0 md:pl-20 lg:pl-64 pb-20 md:pb-8 min-w-0 transition-all duration-300">

        {/* Content Container */}
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">

          {/* Header section (Title, search mock, notification badge) */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-5 select-none">
            <div className="space-y-1">
              <span className="text-xs text-white/40 font-bold uppercase tracking-widest">
                Student Workspace
              </span>
              <p suppressHydrationWarning className="text-xs text-white/30 font-medium">
                {currentDate}
              </p>
            </div>

            {/* Mock Header Controls */}
            <div className="flex items-center gap-3">
              {/* Search input mock */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search modules, files..."
                  className="h-9 w-60 rounded-xl bg-white/5 border border-white/10 pl-9 pr-4 text-xs text-white/80 placeholder-white/30 focus:border-accent-indigo/30 focus:outline-none transition-colors"
                // disabled
                />
              </div>

              {/* Notification icon mock */}
              <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-all relative cursor-not-allowed">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-accent-indigo shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              </button>
            </div>
          </header>

          {/* 3. BENTO GRID SYSTEM */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Hero greeting and Streak tile (spans 2 columns on desktop/tablet) */}
            <div className="md:col-span-2 flex flex-col">
              <HeroTile />
            </div>

            {/* Study momentum activity tile (spans 1 column on desktop, 2 columns on tablet) */}
            <div className="md:col-span-2 lg:col-span-1 flex flex-col">
              <ActivityTile />
            </div>

            {/* Section Divider - Course Enrollments Title */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 pt-4 flex items-center justify-between border-t border-white/[0.04]">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-indigo/10 border border-accent-indigo/20 text-accent-indigo">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h2 className="text-lg font-bold text-white/90 tracking-tight">
                  Active Course Syllabus
                </h2>
              </div>
              <span className="text-xs text-white/40 font-medium select-none">
                Auto-synced with Supabase DB
              </span>
            </div>

            {/* Course tiles rendered inside local Suspense boundaries */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <Suspense fallback={<CourseGridSkeleton />}>
                <CourseListSection />
              </Suspense>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
