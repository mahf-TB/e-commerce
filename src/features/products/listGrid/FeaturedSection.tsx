import SelectForm from "@/components/utils/select-form";
import { useProductList } from "@/hooks/use-product";
import type { ProductListItem } from "@/types";
import { sortOptions } from "@/utils/options";
import { Filter, SortDesc } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCardSkeleton } from "../skeleton/ProductCardSkeleton";
import { ProductCard } from "./ProductCard";

type FeaturedSectionProps = {
  setOpen: (value: boolean) => void;
  selectedBrands: (number | string)[];
  selectedCategories: (number | string)[];
  priceRange: [number, number];
};

export function FeaturedSection({
  setOpen,
  selectedBrands,
  selectedCategories,
  priceRange,
}: FeaturedSectionProps) {
  // const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get("sort") ?? "default";
  const sort = currentSort === "default" ? undefined : currentSort;

  const { items, pagination, isLoading } = useProductList({
    page,
    limit: 10,
    sort,
    statut: "active",
    marque: selectedBrands.length ? selectedBrands.join(",") : undefined,
    categorie: selectedCategories.length
      ? selectedCategories.join(",")
      : undefined,
    minPrice: priceRange?.[0],
    maxPrice: priceRange?.[1],
  });

  // Mettre à jour l'URL quand sort change manuellement
  const handleSortChange = (newSort: string | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (newSort && newSort !== "default") {
      params.set("sort", newSort);
    } else {
      params.delete("sort");
    }
    setSearchParams(params, { replace: true });
    setProducts([]);
    setPage(1);
    setHasMore(true);
  };

  // Reset quand on change de filtres
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [selectedBrands, selectedCategories, priceRange, currentSort]);

  const MAX_PRODUCTS = 100;
  // Pousser les nouveaux items SANS page dans les dépendances
  useEffect(() => {
    // Si aucune donnée pour cette page, stopper le scroll et éviter les requêtes en boucle
    if (!items || items.length === 0) {
      if (!isLoading) {
        setHasMore(false);
      }
      return;
    }

    setProducts((prev) => {
      // Si déjà au maximum, arrête
      if (prev.length >= MAX_PRODUCTS) {
        setHasMore(false);
        return prev;
      }

      // Ajoute seulement les nouveaux (pas les doublons)
      const existingIds = new Set(prev.map((p) => p.id));
      const nouveaux = items.filter((p) => !existingIds.has(p.id));

      // Combine anciens + nouveaux
      const combined = [...prev, ...nouveaux];

      // Si ça dépasse MAX_PRODUCTS, coupe et arrête le scroll
      if (combined.length >= MAX_PRODUCTS) {
        setHasMore(false);
        return combined.slice(0, MAX_PRODUCTS);
      }

      return combined;
    });

    // CAS 2: Vérifier si dernière page de l'API
    if (pagination) {
      setHasMore(page < pagination.totalPages);
    }
  }, [items, isLoading]); // ⚠️ SANS [page, pagination]

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  return (
    <section className="space-y-4">
      {/* Titre + tri */}
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold">Produits </h2>
        <div className="flex items-center gap-2 text-sm">
          <button
            className="relative hover:bg-gray-300 p-2 rounded-md cursor-pointer transition-colors md:hidden"
            onClick={() => setOpen(true)}
          >
            <Filter size={14} />
          </button>
          <SelectForm
            labelTitle="Trier par"
            placeholder="Trier par"
            options={sortOptions}
            value={sort}
            onChange={handleSortChange}
            icon={SortDesc}
          />
        </div>
      </div>

      {/* Grille */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
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
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
      </div>

      {/* Loader */}
      {hasMore && <div ref={loaderRef} className="h-8" />}

      {!hasMore && products.length > 0 && (
        <p className="text-center text-xs text-muted-foreground">
          Fin de la liste.
        </p>
      )}

      {!isLoading && products.length === 0 && (
        <p className="text-center text-xs text-muted-foreground">
          Aucun produit trouvé avec ces filtres.
        </p>
      )}
    </section>
  );
}
