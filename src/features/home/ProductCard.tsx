import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/use-panier.store";
import type { ProductListItem } from "@/types/product";
import { formatPrice } from "@/utils/helpers";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ProductListItem;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product.id,
      variantId: product.variantId,
      name: product.nom,
      image: product.imagePrincipale || "/images/default-product.jpg",
      price: product.minPrice,
      quantity: 1,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const isNew = () => {
    const createdDate = new Date(product.createdAt);
    const daysSinceCreated = Math.floor(
      (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysSinceCreated <= 30;
  };

  const isLowStock = product.stockTotal > 0 && product.stockTotal <= 5;
  const isOutOfStock = product.stockTotal === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link to={`/products/${product.id}`}>
        <Card className="h-full group overflow-hidden rounded-md p-0 hover:shadow-2xl transition-all duration-300 border hover:border-primary/50 gap-0">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            {/* Product Image */}
            <img
              src={product.imagePrincipale || "/images/default-product.jpg"}
              alt={product.nom}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {isNew() && (
                <Badge className="bg-blue-500 hover:bg-blue-600">
                  Nouveau
                </Badge>
              )}
              {isLowStock && (
                <Badge variant="destructive">
                  Plus que {product.stockTotal}
                </Badge>
              )}
              {isOutOfStock && (
                <Badge  className="bg-gray-500">
                  Épuisé
                </Badge>
              )}
            </div>

            {/* Favorite Button */}
            <Button
              size="icon"
              variant="secondary"
              className={cn(
                "absolute top-3 right-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300",
                isFavorite && "opacity-100 bg-red-50"
              )}
              onClick={handleToggleFavorite}
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                )}
              />
            </Button>

            {/* Quick Add Button */}
            {!isOutOfStock && (
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Ajouter au panier
                </Button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col justify-between">
            {/* Category & Brand */}
            <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
              {product.categorieNom && (
                <span className="truncate">{product.categorieNom}</span>
              )}
              {product.categorieNom && product.marqueNom && (
                <span>•</span>
              )}
              {product.marqueNom && (
                <span className="truncate">{product.marqueNom}</span>
              )}
            </div>

            {/* Product Name */}
            <h3 className="font-semibold text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {product.nom}
            </h3>

            {/* Rating */}
            {product.nombreAvis > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3 w-3",
                        i < Math.floor(product.noteMoyenne)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product.nombreAvis})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(product.minPrice)} 
                </span>
              </div>

              {/* Variants Count */}
              {product.variantsCount > 1 && (
                <span className="text-xs text-muted-foreground">
                  {product.variantsCount} variantes
                </span>
              )}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
