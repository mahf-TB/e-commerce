import { FeaturedProducts } from "@/features/products/item/FeaturedProductItem";
import ImagesCard from "@/features/products/item/ImagesCard";
import { FeaturedProductsSkeleton } from "@/features/products/skeleton/FeaturedProductsSkeleton";
import { useProduct } from "@/hooks/use-product";
import type { Produit } from "@/types";
import { useParams } from "react-router-dom";

export default function ProductItemsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: produit, isLoading, isError } = useProduct(id);
  if (isLoading) {
    return <FeaturedProductsSkeleton />;
  }
  if (isError || !produit) {
    return <div>Erreur lors du chargement du produit.</div>;
  }

  return (
    <div className="">
      <section className="flex flex-col md:flex-row items-start mt-5 gap-6">
        <div className="sticky top-25 h-3/4">
          {produit.images.length === 0 ? (
            <div className="w-full md:w-[300px] z-0 lg:w-[450px] md:h-[600px] flex flex-col items-center">
              <div className="w-full max-md:hidden overflow-hidden rounded shadow-sm flex items-center justify-center bg-gray-100 h-full">
                <span className="text-gray-400">Aucune image disponible</span>
              </div>
            </div>
          ) : (
            <ImagesCard images={produit.images} />
          )}
        </div>
        <FeaturedProducts product={produit ? produit : ({} as Produit)} />
      </section>
    </div>
  );
}
