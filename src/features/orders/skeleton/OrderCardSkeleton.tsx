import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OrderCardSkeleton() {

  return (
    <Card className="w-full p-5 rounded-sm shadow-none gap-3">
      <CardContent className="p-0 border-gray-300">
        {/* Header - Référence et actions */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>

            {/* Progress bar */}
            <Skeleton className="h-1 w-full rounded-full" />

            {/* Date et statut */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-6 w-20" />
            </div>

            {/* Nom client */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </div>

        {/* Adresse */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4" />
        </div>

        {/* Articles header */}
        <div className="flex items-center justify-between mb-2.5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Articles list */}
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="flex items-end justify-between bg-muted/70 rounded-md px-3 py-2.5 mb-2"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-md" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}

        {/* Footer - Bouton et total */}
        <div className="flex items-end justify-between mt-4">
          <Skeleton className="h-8 w-48" />
          <div className="flex flex-col items-end gap-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
