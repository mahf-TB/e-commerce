import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function DetailCommandeSkeleton() {
  return (
    <div className="p-4 md:w-3/4 w-full mt-5 bg-white px-6 rounded">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-5">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-20 rounded" />
          </div>
          <Skeleton className="h-4 w-48 mt-2" />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="destructive" size="sm" className="text-sm px-8 rounded" disabled>
            <Skeleton className="h-4 w-16" />
          </Button>
          <Button size="sm" className="text-sm px-8 rounded bg-blue-600" disabled>
            <Skeleton className="h-4 w-16" />
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-6">
        {/* Produits */}
        <div>
          <Skeleton className="h-5 w-24" />
          <div className="mt-2 grid gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-2 border rounded flex items-center gap-3">
                <Skeleton className="w-16 h-16" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24 mt-2" />
                </div>
                <div className="shrink-0">
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
            <div className="space-y-2 text-sm p-2">
              <div className="flex justify-between"><Skeleton className="h-4 w-24" /><Skeleton className="h-4 w-16" /></div>
              <div className="flex justify-between"><Skeleton className="h-4 w-24" /><Skeleton className="h-4 w-16" /></div>
              <div className="flex justify-between"><Skeleton className="h-4 w-32" /><Skeleton className="h-4 w-16" /></div>
              <div className="flex justify-between pt-2 border-t border-gray-200 mt-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-4 w-20" /></div>
            </div>
          </div>
        </div>
        {/* Détails droite */}
        <div className="space-y-3">
          <div className="bg-white p-2 rounded-md flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40 mt-2" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-md">
            <Skeleton className="h-5 w-40 mb-2" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="grid grid-cols-[120px_1fr] gap-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-md">
            <Skeleton className="h-5 w-24 mb-2" />
            <div className="grid grid-cols-[120px_1fr] gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <>
                  <Skeleton key={`l-${i}-1`} className="h-4 w-28" />
                  <Skeleton key={`l-${i}-2`} className="h-4 w-48" />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailCommandeSkeleton;
