"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ProductCheckoutItemProps = {
  id: string | number;
  nom: string;
  image: string;
  description?: string;
  prix: number;
  quantite?: number;
  total?: number;
  onClick?: () => void;
  containerClassName?: string;
  showQuantityControl?: boolean;
  incrementQuantity?: () => void;
  decrementQuantity?: () => void;
  updateQuantity?: (quantity: number) => void;
  removeItem?: () => void;
};

export default function ProductItem({
  id,
  nom,
  image,
  description,
  prix,
  quantite = 4,
  total,
  onClick,
  containerClassName,
  showQuantityControl = true,
  incrementQuantity,
  decrementQuantity,
  updateQuantity,
  removeItem,
}: ProductCheckoutItemProps) {
  const totalPrice = total ?? prix * quantite;
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "relative flex items-center gap-4 p-2 rounded border border-transparent hover:border-border hover:bg-accent transition-all  group",
        containerClassName
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Image produit */}
      <div className="relative shrink-0">
        <img
          alt={nom}
          className="w-16 h-16 rounded-xs object-cover"
          src={image}
        />
      </div>

      {/* Contenu produit */}
      <div className="flex-1 min-w-0 space-y-1">
        <p
          onClick={() => navigate(`/products/${id}`)}
          className="font-medium text-sm text-foreground hover:underline  cursor-pointer line-clamp-2"
        >
          {nom}
        </p>
        {/* Quantité + Prix unitaire */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">
            {quantite}* {prix.toLocaleString("fr-FR")} Ar
          </span>
        </div>
      </div>

      {/* Prix total */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <div className="flex items-center gap-1 px-2">
          <span className="font-semibold text-sm text-foreground">
            {totalPrice.toLocaleString("fr-FR")} Ar
          </span>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={removeItem}
            className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
          >
            <X size={10} />
            <span className="sr-only">Supprimer</span>
          </Button>
        </div>

        {showQuantityControl && (
          <div className="flex items-center gap-0  rounded px-2 py-1">
            <Button
              type="button"
              size="sm"
              onClick={decrementQuantity}
              className="h-6 w-6 text-muted hover:text-muted/50"
              disabled={quantite <= 1}
            >
              <Minus size={14} />
            </Button>
            <input
              type="text"
              value={quantite}
              onChange={(e) =>
                updateQuantity && updateQuantity(parseInt(e.target.value) || 1)
              }
              className="w-8 text-center text-xs bg-transparent border-0 outline-none"
              min="1"
            />
            <Button
              type="button"
              size="sm"
              onClick={incrementQuantity}
              className="h-6 w-6 text-muted hover:text-muted/50"
            >
              <Plus size={14} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
