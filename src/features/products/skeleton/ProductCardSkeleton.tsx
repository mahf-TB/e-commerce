import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col rounded-sm shadow-none overflow-hidden p-0 gap-0">
      {/* Image */}
      <Skeleton className="h-52 w-full rounded-none rounded-t-sm" />

      <div className="px-4 py-4 space-y-3">
        {/* Titre */}
        <Skeleton className="h-4 w-2/3" />

        {/* Description (2 lignes) */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-3/4" />
        </div>

        {/* Prix + note */}
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Boutons */}
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-9 flex-1 rounded-md" />
          <Skeleton className="h-9 w-16 rounded-md" />
        </div>
      </div>
    </Card>
  )
}
