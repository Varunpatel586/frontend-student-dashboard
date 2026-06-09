import CourseGridSkeleton from "@/components/CourseGridSkeleton";

export default function Loading() {
  return (
    <main className="flex-1 min-h-screen pl-0 md:pl-20 lg:pl-64 pb-20 md:pb-6 text-white bg-cyber-grid bg-ambient-radial">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        
        {/* Header skeleton */}
        <div className="space-y-2 select-none animate-pulse">
          <div className="h-4 w-32 bg-zinc-800 rounded-md" />
          <div className="h-8 w-64 bg-zinc-800 rounded-md" />
        </div>

        {/* Main Bento Grid Skeleton - identical structure to page layout to prevent layout shifts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Hero Tile Skeleton */}
          <section className="relative overflow-hidden rounded-3xl border border-card-border bg-card-bg/60 p-6 md:p-8 h-60 flex flex-col justify-between animate-pulse md:col-span-2">
            <div className="space-y-4">
              <div className="h-4 w-24 bg-zinc-800 rounded-md" />
              <div className="h-10 w-2/3 bg-zinc-800 rounded-md" />
              <div className="h-4 w-1/2 bg-zinc-800 rounded-md" />
            </div>
            <div className="h-3 w-1/3 bg-zinc-800 rounded-md mt-4" />
          </section>

          {/* Activity Tile Skeleton */}
          <article className="relative overflow-hidden rounded-3xl border border-card-border bg-card-bg/60 p-6 h-60 flex flex-col justify-between animate-pulse md:col-span-2 lg:col-span-1">
            <div className="space-y-2">
              <div className="h-5 w-40 bg-zinc-800 rounded-md" />
              <div className="h-3.5 w-24 bg-zinc-800 rounded-md" />
            </div>
            
            {/* Grid of mini squares representing contribution chart */}
            <div className="grid grid-cols-12 gap-1.5 py-4">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="h-2.5 w-2.5 bg-zinc-900 rounded-[1px] mx-auto" />
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="h-4 w-20 bg-zinc-850 rounded-md" />
              <div className="h-4 w-28 bg-zinc-850 rounded-md" />
            </div>
          </article>

          {/* Course Tiles Skeletons - 3 columns */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <CourseGridSkeleton />
          </div>

        </div>
      </div>
    </main>
  );
}
