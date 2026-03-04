export const ArticlesSkeleton = () => (
  <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4 mb-4">
    {[1, 2, 3].map((n) => (
      <div key={n} className="h-60 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-xl" />
    ))}
  </div>
);
