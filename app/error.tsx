"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, ServerCrash, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error details to analytics service in production context
    console.error("Dashboard database failure caught:", error);
  }, [error]);

  return (
    <main className="flex-1 min-h-screen flex items-center justify-center bg-cyber-grid bg-ambient-radial px-6 select-none">
      
      {/* Background glowing red spots to simulate alert warning */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative overflow-hidden rounded-2xl border border-red-500/20 bg-card-bg/80 p-8 shadow-2xl backdrop-blur-lg text-center space-y-6">
        
        {/* Error icon with double rings and heartbeat pulse */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 relative">
          <span className="absolute inset-0 rounded-2xl bg-red-500/5 animate-ping opacity-75 pointer-events-none" />
          <ServerCrash className="h-8 w-8" />
        </div>

        {/* Text descriptions */}
        <div className="space-y-2">
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Database Sync Failure
          </h2>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 text-red-400">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Supabase Connection Error</span>
          </p>
          <div className="mt-4 p-4 bg-zinc-950/80 border border-zinc-900 rounded-2xl text-left">
            <p className="font-mono text-xs text-zinc-400 leading-relaxed break-all">
              {error.message || "An unexpected error occurred while querying the courses table."}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 hover:text-white transition-colors duration-200 text-xs font-semibold text-zinc-300 outline-none cursor-pointer"
          >
            <Home className="h-4 w-4" />
            <span>Reload Page</span>
          </button>
          
          <button
            onClick={() => reset()}
            className="flex-1 flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-red-500 text-white hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.25)] transition-all duration-200 text-xs font-semibold outline-none cursor-pointer group"
          >
            <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
            <span>Retry Connection</span>
          </button>
        </div>

        <p className="text-[10px] text-zinc-600">
          If this issue persists, check your local networks or contact developer support.
        </p>

      </div>
    </main>
  );
}
