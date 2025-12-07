import { ProductCard } from "./ProductCard";
import { Filter, SortDesc } from "lucide-react";
import { ProductCardSkeleton } from "../skeleton/ProductCardSkeleton";
import { useEffect, useRef, useState } from "react";
import { useProductList } from "@/hooks/use-product";
import ReusableSelect from "@/components/select-form";
import { sortOptions } from "@/utils/options";
import type { ProductListItem } from "@/types";

export function FeaturedSection({
  setOpen,
}: {
  setOpen: (value: boolean) => void;
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { items, pagination, isLoading } = useProductList({
    page,
    limit: 10,
    sort,
    q: search,
    statut: "active",
  });

  console.log(items);

  // Reset quand on change de filtres
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [search, sort]);

  const MAX_PRODUCTS = 100;
  // Pousser les nouveaux items SANS page dans les dépendances
  useEffect(() => {
    if (!items || items.length === 0) return;

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
  }, [items]); // ⚠️ SANS [page, pagination]

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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Produits </h2>

        <div className="flex items-center gap-2 text-sm">
          <button
            className="relative hover:bg-gray-300 p-2 rounded-md cursor-pointer transition-colors md:hidden"
            onClick={() => setOpen(true)}
          >
            <Filter size={14} />
          </button>
          <ReusableSelect
            labelTitle="Trier par"
            placeholder="Trier par"
            options={sortOptions}
            value={sort}
            onChange={setSort}
            icon={SortDesc}
          />
        </div>
      </div>

      {/* Grille */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            produit={product.nom}
            description={product.description}
            price={product.minPrice}
            imageUrl={product.imagePrincipale}
            rating={product.noteMoyenne}
            reviewsCount={product.nombreAvis}
            status={product.statut}
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
    </section>
  );
}
