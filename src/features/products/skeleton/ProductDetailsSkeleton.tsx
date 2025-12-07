import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailsSkeleton = () => {
  return (
    <div className="font-poppins space-y-6 pl-4">
      {/* Titre */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-3/3 max-w-xl" />
        <Skeleton className="h-9 w-2/3 max-w-xl" />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Skeleton className="h-10 w-28 rounded" />
        <Skeleton className="h-10 w-28 rounded" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      {/* Informations du produit */}
      <div className="flex flex-col items-start gap-5">
        <Skeleton className="h-5 w-40" />
        <div className="grid grid-cols-[140px_1fr] gap-4 text-sm text-left w-full max-w-2xl">
          {[...Array(7)].map((_, i) => (
            <>
              <Skeleton key={`label-${i}`} className="h-4 w-28" />
              <Skeleton key={`value-${i}`} className="h-4 w-40" />
            </>
          ))}
        </div>

        <Skeleton className="h-5 w-48" />
        {/* Liste images */}
        <div className="flex gap-2 items-center w-full overflow-x-auto whitespace-nowrap px-1 py-2 snap-x snap-mandatory">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-20 rounded" />
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-300 -ml-4" />
    </div>
  );
};

export default ProductDetailsSkeleton;
