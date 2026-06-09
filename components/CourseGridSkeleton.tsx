export default function CourseGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Array.from({ length: 3 }).map((_, idx) => (
        <article
          key={idx}
          className="relative overflow-hidden rounded-3xl border border-card-border bg-card-bg/60 p-6 h-64 flex flex-col justify-between animate-pulse"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="h-12 w-12 bg-zinc-850 rounded-2xl" />
            <div className="h-5 w-16 bg-zinc-850 rounded-md" />
          </div>

          {/* Title and date */}
          <div className="space-y-2 my-4">
            <div className="h-5 w-5/6 bg-zinc-800 rounded-md" />
            <div className="h-3 w-24 bg-zinc-850 rounded-md" />
          </div>

          {/* Progress bar info */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="h-3 w-16 bg-zinc-850 rounded-md" />
              <div className="h-3 w-8 bg-zinc-850 rounded-md" />
            </div>
            <div className="h-2 w-full bg-zinc-900 rounded-full" />
            
            {/* Footer */}
            <div className="flex justify-between pt-1">
              <div className="h-3.5 w-20 bg-zinc-850 rounded-md" />
              <div className="h-3.5 w-4 bg-zinc-850 rounded-md" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
