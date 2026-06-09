"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Calendar,
  User,
  GraduationCap,
  ChevronRight
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* DESKTOP & TABLET SIDEBAR LAYOUT */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen bg-transparent border-r border-white/[0.04] z-40 transition-all duration-300 w-20 lg:w-64 py-8 select-none">

        {/* LOGO SECTION */}
        <div className="flex items-center gap-3 px-6 mb-10 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-accent-blue via-accent-cyan to-accent-blue text-white shadow-[0_0_20px_rgba(59,130,246,0.25)]">
            <GraduationCap className="h-5.5 w-5.5" />
          </div>
          <span className="hidden lg:block font-extrabold text-lg tracking-tight bg-gradient-to-r from-white/90 to-white/40 bg-clip-text text-transparent">
            AETHERIS
          </span>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 px-4 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full relative flex items-center gap-4 py-3 px-4 rounded-xl text-sm font-medium transition-colors duration-200 group outline-none cursor-pointer ${isActive ? "text-accent-blue" : "text-white/50 hover:text-white/80"
                  }`}
              >
                {/* Active Highlight Background Pill - Soft Gradient from Left to Right */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 bg-gradient-to-r from-accent-blue/80 to-transparent rounded-xl border-l-[3px] border-accent-blue"
                    style={{
                      background: "linear-gradient(90deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0) 100%)"
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <div className="relative flex items-center justify-center">
                  <Icon className={`h-5 w-5 transition-transform duration-200 ${isActive ? "scale-105 text-accent-blue" : "group-hover:scale-105"
                    }`} />

                  {/* Subtle Glowing active point */}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue/60 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-blue"></span>
                    </span>
                  )}
                </div>

                <span className="hidden lg:block truncate tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* USER PROFILE INFO SECTION / FOOTER */}
        <div className="px-4 border-t border-white/[0.04] pt-6 mt-auto">
          <div className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/[0.03] transition-all duration-300 group cursor-pointer">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-accent-cyan/20 to-accent-blue/20 border border-white/10 flex items-center justify-center text-xs font-semibold text-white/90">
              VS
            </div>
            <div className="hidden lg:flex flex-col flex-1 min-w-0">
              <span className="text-sm font-semibold text-white/80 truncate group-hover:text-white transition-colors tracking-tight">
                Varun Patel
              </span>
              <span className="text-xs text-white/40 truncate">
                varun.jatin.patel@gmail.com
              </span>
            </div>
            <ChevronRight className="hidden lg:block h-4 w-4 text-white/30 group-hover:text-white/60 transition-colors" />
          </div>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR (rendered via Portal to dedicated fixed wrapper div) */}
      {mounted && typeof document !== "undefined"
        ? createPortal(
          <nav className="flex md:hidden h-16 bg-[#0a0a0c] border-t border-white/[0.05] items-center justify-around px-4 pb-[env(safe-area-inset-bottom,0px)] select-none">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 text-xs font-medium outline-none cursor-pointer ${isActive ? "text-accent-blue" : "text-white/40 hover:text-white/70"
                    }`}
                >
                  {/* Active Mobile Highlight Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="mobile-active-pill"
                      className="absolute bottom-1.5 h-1 w-8 rounded-full bg-accent-blue"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}

                  <Icon className={`h-5 w-5 mb-1 transition-transform duration-200 ${isActive ? "scale-105 text-accent-blue" : ""
                    }`} />

                  <span className="text-[10px] tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </nav>,
          document.getElementById("mobile-nav-portal") ?? document.body
        )
        : null}
    </>
  );
}
