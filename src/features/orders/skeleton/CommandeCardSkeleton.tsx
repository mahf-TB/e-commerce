import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function CommandeCardSkeleton() {
  return (
    <Card className="p-4">
      <div className="flex flex-col space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-[140px_1fr] gap-3 text-sm text-left space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Images */}
        <div>
          <div className="flex -space-x-2">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className="rounded-md ring-2 ring-background"
                  style={{ width: 48, height: 48 }}
                />
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CommandeCardSkeleton;
