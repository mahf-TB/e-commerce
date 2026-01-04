import Tooltips from "@/components/tooltips";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCheckFavoris, useToggleFavoris } from "@/hooks/use-favoris";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/use-panier.store";
import { formatPrice } from "@/utils/helpers";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ProductCardProps = {
  id: string | number;
  produit: string;
  description?: string | null; // ex: "Intel i7, 16GB RAM, RTX 4060"
  price: number; // en dollars ou Ariary
  imageUrl: string | null;
  rating: number; // ex: 4.7
  reviewsCount: number; // ex: 213
  status: string;
  variantId: number | string;
};

export function ProductCard({
  id,
  produit,
  description,
  price,
  imageUrl,
  rating,
  reviewsCount,
  status,
  variantId,
}: ProductCardProps) {
  const navigate = useNavigate();
  const { addItem, openCart } = useCartStore();
  const { isFavoris, isLoading } = useCheckFavoris("Produit", id.toString());
  const { toggle, isPending } = useToggleFavoris();

  const handleAddToCart = () => {
    addItem({
      id: id,
      name: produit,
      price: price,
      description: description ?? "",
      quantity: 1,
      image: imageUrl ?? "/images/default-product.jpg",
      variantId: variantId,
    });
    openCart();
  };

  return (
    <Card className="flex flex-col group rounded-sm shadow-none overflow-hidden p-0 gap-0 transition-all duration-200">
      {/* Image */}
      <div className="relative h-52 w-full cursor-pointer z-0">
        <img
          src={imageUrl ?? "/images/default-product.jpg"}
          alt={produit}
          className="w-full h-52 object-cover"
        />
        <button
          onClick={() =>
            toggle({ itemType: "Produit", itemId: id.toString(), isFavoris })
          }
          disabled={isPending || isLoading}
          className="z-10 absolute bottom-2 right-2 bg-white rounded-full p-2 hidden group-hover:block shadow-md cursor-pointer hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Heart
            size={16}
            className={cn(isFavoris ? "text-red-500 fill-red-500" : "")}
          />
        </button>
        {/* <div className="absolute top-12 right-2 bg-white rounded-full p-2 hidden group-hover:block shadow-md cursor-pointer hover:bg-gray-100 transition-all duration-200">
          <Star size={16} className="text-red-500 fill-red-500" />
        </div> */}
      </div>
      {/* Contenu */}
      <div className="flex flex-col justify-between h-full gap-0 p-3">
        {/* Nom */}
        <h3
          onClick={() => navigate(`/products/${id}`)}
          className="text-base font-semibold line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors duration-200"
        >
          {produit}
        </h3>
        {/* Description courtes (specs) */}
        <p
          className="text-xs text-slate-400 line-clamp-2"
          onClick={() => navigate(`/products/${id}`)}
        >
          {description}
        </p>
        {/* Prix + note */}
        <div
          className="mt-2 flex items-center justify-between"
          onClick={() => navigate(`/products/${id}`)}
        >
          <span className="text-sm font-bold ">{formatPrice(price)}</span>
          <div className="flex items-center gap-1 text-xs ">
            <span className="text-amber-400">★</span>
            <span>{rating.toFixed(1)}</span>
            <span className="text-slate-500">({reviewsCount})</span>
          </div>
        </div>
        {/* Boutons */}
        <div className="mt-3 flex items-center gap-2">
          <Tooltips
            side="bottom"
            text={"Passer aux commande direct de ce produit"}
          >
            <Button
              className="flex-1 bg-green-600 hover:bg-green-600/90 text-slate-100 font-semibold rounded-sm"
              size="icon"
              disabled={status !== "active"}
              onClick={() => navigate(`/checkout/${id}/${variantId}`)}
            >
              Commander
            </Button>
          </Tooltips>

          <Tooltips side="bottom" text={"Ajouter au panier"}>
            <Button
              size="icon"
              variant={"outline"}
              disabled={status !== "active"}
              onClick={handleAddToCart}
              className={"px-3 py-1 rounded-sm text-[11px] font-medium "}
            >
              <ShoppingCart />
            </Button>
          </Tooltips>
        </div>
      </div>
    </Card>
  );
}
