import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/utils/EmptyState";
import { getCategoryIcon } from "@/features/home/CategoriesSection";
import { ProductCard } from "@/features/home/ProductCard";
import { ProductCardSkeleton } from "@/features/products/skeleton/ProductCardSkeleton";
import useCategories, {
  useProductsByCategoryAsync,
} from "@/hooks/use-categories";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const CategoryProductPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const nomCategoryQuery = params.get("nom") ?? undefined;

  const { items: categories, isLoading } = useCategories({
    page: 1,
    limit: categoryId ? 8 : 20,
    parent: categoryId ? "principale" : "",
  });

  const {
    start,
    status,
    data,
    warning,
    isLoading: isProductsLoading,
  } = useProductsByCategoryAsync(categoryId ?? "");

  // ✅ Lancer automatiquement le job
  useEffect(() => {
    if (categoryId) {
      start();
    }
  }, [categoryId]);

  console.log(warning);

  const products = data?.items || [];

  if (isLoading) {
    return (
      <main className={cn("container mx-auto py-4 px-4")}>
        <p>Loading categories...</p>
      </main>
    );
  }

  return (
    <main className={cn("container mx-auto py-4 px-4")}>
      {/* Section Header */}
      <div className="text-center mb-5">
        <h2 className="text-xl md:text-2xl font-bold font-poppins">
          Parcourez nos collections
        </h2>
        <p className="text-muted-foreground text-base">
          Sélectionnez une catégorie pour afficher les produits correspondants
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => {
          const Icon = getCategoryIcon(category.nom);

          return (
            <Link
              key={category.id}
              to={`/category/${
                category._id || category.id
              }?nom=${encodeURIComponent(category.nom)}`}
            >
              <Card
                className={cn(
                  "rounded group relative  overflow-hidden cursor-pointer",
                  "hover:shadow-xl transition-all duration-300",
                  "border hover:border-primary p-0"
                )}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/90 to-primary/80 group-hover:from-primary/60 group-hover:to-primary/80 transition-all duration-300" />

                {/* Content */}
                <div className="relative h-full flex gap-1 items-center justify-between p-4 text-center">
                  {/* Icon */}
                  <div className="p-2 rounded-full bg-white/20 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  {/* Category Name */}
                  <h3 className="font-semibold text-lg text-white/80 group-hover:text-white transition-colors line-clamp-1">
                    {category.nom}
                  </h3>

                  {/* Hover Effect Arrow */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center">
                      <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
      {/* Produit Grid liste */}
      {categoryId && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 font-poppins">
                {nomCategoryQuery || "Produits de cette catégorie"}
              </h2>
              <p className="text-muted-foreground text-lg">
                Notre sélection des meilleurs produits
              </p>
            </div>
            {isProductsLoading ||
              (status === "pending" && (
                <main className={cn("container mx-auto py-4 px-4")}>
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <ProductCardSkeleton key={i} />
                    ))}
                  </div>
                </main>
              ))}
            {products.length === 0 ? (
              <EmptyState
                title={nomCategoryQuery ?? "Aucun produit trouvé."}
                description={"Aucun produit trouvé pour cette catégorie."}
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product: any, index: any) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            )}

            {data?.totalItems > products.length && (
              <Button size="lg" className="w-full max-w-sm rounded">
                Voir plus des produits
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default CategoryProductPage;
