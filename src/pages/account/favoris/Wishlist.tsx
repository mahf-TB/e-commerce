import DateRangePickerComponent from "@/components/input-DateRangePicker";
import { Button } from "@/components/ui/button";
import { FavorisProductCard } from "@/features/favoris/FavorisProductCard";
import { ProductCardSkeleton } from "@/features/products/skeleton/ProductCardSkeleton";
import { useClearAllFavoris, useFavoris } from "@/hooks/use-favoris";
import { getDateRangeParams } from "@/utils/helpers";
import { PackageX, Trash } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

const Wishlist = () => {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const dateParams = getDateRangeParams(range);
  const { data: favoris, isLoading } = useFavoris({
    startDate: dateParams?.dateDebut,
    endDate: dateParams?.dateFin,
  });
  const { mutate: clearAllFavoris, isPending } = useClearAllFavoris();

  return (
    <div>
      <div className="mb-4 flex gap-4 items-center justify-between flex-wrap">
        <h2 className="text-2xl font-poppins font-semibold">Mes favoris</h2>
        <div className="flex items-center gap-2">
          <DateRangePickerComponent value={range} onChange={setRange} />
          <Button
            variant="outline"
            type="button"
            className="rounded"
            onClick={() => clearAllFavoris()}
            disabled={isPending}
          >
            <Trash size={18} /> vider tout
          </Button>
        </div>
      </div>
      {/* Grille */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        {(favoris?.items?.length ?? 0) === 0 ? (
          <div className="col-span-full flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4 max-w-md text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gray-200 rounded-full blur-xl opacity-50"></div>
                <div className="relative bg-gray-100 p-6 rounded-full">
                  <PackageX
                    className="text-gray-400"
                    size={48}
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900">
                  Aucune liste trouvée
                </h3>
                <p className="text-sm text-muted-foreground">
                  Vous n'avez aucune liste favoris correspondant à vos filtres.
                </p>
                <Button
                  variant={"outline"}
                  onClick={() => (window.location.href = "/products")}
                >
                  Voir les produits
                </Button>
              </div>
            </div>
          </div>
        ) : (
          (favoris?.items ?? []).map((item) => {
            const product = item.itemId;
            const imageUrl =
              product?.images.find((img: any) => img.isPrincipale)?.url ??
              "/images/default-product.jpg";
            return (
              <FavorisProductCard
                key={product.id}
                id={product.id}
                produit={product.nom}
                description={product.description}
                imageUrl={imageUrl}
                rating={product.noteMoyenne || 0}
                reviewsCount={product.nombreAvis || 0}
                status={product.statut}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Wishlist;
