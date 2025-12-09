import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function FeaturedProductsSkeleton() {
  return (
    <section className="flex flex-col md:flex-row items-start mt-5 gap-6">
      {/* Images skeleton */}
      <div className="sticky top-25">
        <div className="w-full md:w-96 max-md:hidden flex flex-col items-center">
          {/* Main image */}
          <div className="w-full overflow-hidden rounded shadow-sm">
            <Skeleton className="w-full h-96 rounded" />
          </div>

          {/* Thumbnail images */}
          <div className="flex flex-wrap gap-2 justify-between w-full mt-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-20 h-20 rounded" />
            ))}
          </div>
        </div>
      </div>

      {/* Main content and sidebar */}
      <div className="flex-2 flex flex-col lg:flex-row w-full gap-6">
        {/* Main content */}
        <main className="w-full md:flex-2 max-md:pb-0 rounded-md space-y-4">
          {/* Product title */}
          <Skeleton className="h-8 w-2/3" />

          {/* Rating and badge */}
          <div className="flex items-center gap-3 mb-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-6 w-20" />
          </div>

          {/* Stock and price */}
          <div className="mb-2 flex items-start flex-col gap-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-40" />
          </div>

          {/* Description */}
          <div className="mb-4 space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>

          {/* Variants */}
          <div className="mb-4">
            <Skeleton className="h-5 w-32 mb-2" />
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-24 rounded" />
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-3 flex items-center gap-2">
            <Skeleton className="flex-1 h-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </main>

        {/* Order summary sidebar */}
        <aside className="w-full lg:w-80 bg-white rounded p-4 max-md:pt-0 h-fit lg:sticky lg:top-25">
          <Skeleton className="h-4 w-32 mb-4" />

          {/* Quantity and price */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-9 w-24 rounded" />
            </div>

            {/* Subtotal */}
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>

            {/* Fees */}
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>

          {/* Order button */}
          <Skeleton className="w-full h-10 rounded-md" />
        </aside>
      </div>
    </section>
  );
}
