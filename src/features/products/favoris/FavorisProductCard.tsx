import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRemoveFromFavoris } from "@/hooks/use-favoris";
import { useCartStore } from "@/store/use-panier.store";
import { formatPrice } from "@/utils/helpers";
import { Heart, ShoppingCart, Star, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type FavorisProductCardProps = {
  id: string | number;
  produit: string;
  description?: string | null;
  imageUrl: string | null;
  rating: number;
  reviewsCount: number;
  status: string;
};

export function FavorisProductCard({
  id,
  produit,
  description,
  imageUrl,
  rating,
  reviewsCount,
  status,
}: FavorisProductCardProps) {
  const navigate = useNavigate();
//   const { addItem, openCart } = useCartStore();
  const removeMutation = useRemoveFromFavoris();

  const handleRemoveFromFavoris = () => {
    removeMutation.mutate({
      itemType: "Produit",
      itemId: id.toString(),
    });
  };

  return (
    <Card className="flex flex-col group rounded-sm shadow-none overflow-hidden p-0 gap-0 transition-all duration-200">
      {/* Image */}
      <div
        className="relative h-42 w-full cursor-pointer z-0"
        onClick={() => navigate(`/products/${id}`)}
      >
        <img
          src={imageUrl ?? "/images/default-product.jpg"}
          alt={produit}
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFromFavoris();
          }}
          disabled={removeMutation.isPending}
          className="z-10 absolute top-2 right-2 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-red-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Heart size={16} className="text-red-500 fill-red-500" />
        </button>
      </div>

      {/* Contenu */}
      <div className="p-4 flex flex-col flex-1">
        {/* En-tête avec prix et note */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3
              className="font-semibold text-sm line-clamp-1 cursor-pointer hover:text-blue-600"
              onClick={() => navigate(`/products/${id}`)}
            >
              {produit}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
              {description}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 my-1">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-medium">{rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">
            ({reviewsCount})
          </span>
        </div>
      </div>
    </Card>
  );
}
