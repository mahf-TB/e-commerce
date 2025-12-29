import InputForm from "@/components/input-form";
import { FavorisProductCard } from "@/features/products/favoris/FavorisProductCard";
import { ProductCardSkeleton } from "@/features/products/skeleton/ProductCardSkeleton";
import { useFavoris } from "@/hooks/use-favoris";
import { Search } from "lucide-react";
import { useState } from "react";

const Wishlist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: favoris, isLoading } = useFavoris();

  return (
    <div>
      <div className="mb-4 flex gap-4 items-center justify-between flex-wrap">
        <h2 className="text-2xl font-poppins font-semibold">Mon panier</h2>
        <InputForm
          placeholder="Rechercher..."
          className="bg-white"
          iconLeft={<Search size={16} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* Grille */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {(favoris?.items ?? []).map((item) => {
          const product = item.itemId;
          const imageUrl=   product?.images.find((img: any) => img.isPrincipale)?.url ?? "/images/default-product.jpg"
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
        })}
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
      </div>
    </div>
  );
};

export default Wishlist;
