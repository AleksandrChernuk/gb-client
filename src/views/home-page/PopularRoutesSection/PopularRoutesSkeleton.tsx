export function PopularRoutesSkeleton() {
  return (
    <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 animate-pulse"
        >
          {/* From city */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <div className="h-5 w-28 bg-slate-200 dark:bg-slate-700 rounded-md" />
            <div className="h-3 w-16 bg-slate-100 dark:bg-slate-600 rounded-md" />
          </div>

          {/* Arrow */}
          <div className="w-12 h-3 tablet:w-16 bg-slate-200 dark:bg-slate-700 rounded-full shrink-0" />

          {/* To city */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded-md" />
            <div className="h-3 w-14 bg-slate-100 dark:bg-slate-600 rounded-md" />
          </div>

          {/* Price + chevron */}
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
