import { Skeleton } from './Skeleton';

/**
 * Generic page skeleton shown via React Suspense while a lazy-loaded
 * route chunk is fetching. Approximates the hero layout common to all pages.
 */
export default function PageSkeleton() {
  return (
    <div className="bg-konten-black min-h-screen">
      {/* Nav spacer */}
      <div className="h-[56px] sm:h-[62px]" />

      {/* Hero area */}
      <div className="px-6 md:px-12 py-28 md:py-36 max-w-5xl mx-auto space-y-6">
        {/* Eyebrow */}
        <Skeleton className="h-3 w-36" />

        {/* Big headline two lines */}
        <Skeleton className="h-14 sm:h-20 md:h-28 w-full" />
        <Skeleton className="h-14 sm:h-20 md:h-28 w-2/3" />

        {/* Body copy two lines */}
        <div className="pt-2 space-y-3 max-w-lg">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>

      {/* Fact-file / meta strip */}
      <div className="border-y border-white/5 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-7 w-28" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
