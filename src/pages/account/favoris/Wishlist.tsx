import InputForm from "@/components/input-form";
import { ProductCard } from "@/features/products/listGrid/ProductCard";
import { ProductCardSkeleton } from "@/features/products/skeleton/ProductCardSkeleton";
import type { ProductListItem } from "@/types";
import { Search } from "lucide-react";
import  { useState } from "react";

const Wishlist = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {([] as ProductListItem[]).map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  produit={product.nom}
                  description={product.description}
                  price={product.minPrice}
                  imageUrl={product.imagePrincipale}
                  rating={product.noteMoyenne}
                  reviewsCount={product.nombreAvis}
                  status={product.statut}
                  variantId={product.variantId}
                />
              ))}
              {true &&
                Array.from({ length: 3 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
            </div>
    </div>
  );
};

export default Wishlist;
