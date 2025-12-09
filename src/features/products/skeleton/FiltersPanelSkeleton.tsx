import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function FiltersPanelSkeleton() {
  return (
    <Card className="shadow-none rounded p-5 gap-2 space-y-4">
      {/* Header */}
      <div className="flex items-center text-gray-500 gap-2 border-b pb-2">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Brands section */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>

      {/* Categories section */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </div>
      </div>

      {/* Price slider section */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
    </Card>
  );
}
