import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/helpers";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

interface CommandeResumeProps {
  prixUnitaire: number;
  produit: {
    produitName: string;
    image: string;
  };
}

const CommandeResume = ({ prixUnitaire, produit }: CommandeResumeProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <aside className="w-full lg:w-80 z-1 bg-white rounded p-4 max-md:pt-0 h-fit lg:sticky lg:top-25">
      <div className="text-sm text-gray-500 mb-2">Résumé de la commande</div>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 overflow-hidden">
          <img
            src={produit.image}
            alt={produit.produitName}
            className="object-cover h-12 w-12"
          />
        </div>
        <div className="font-medium">{produit.produitName}</div>
      </div>
      {/* Add to cart */}
      <div className="flex items-center justify-between mb-2">
        <span>{`${quantity} * ${formatPrice(prixUnitaire)}`}</span>
        <div className="flex items-center justify-end gap-0 rounded px-2 py-1">
          <Button
            type="button"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setQuantity((q) => Math.max(1, q - 1));
            }}
            className="h-6 w-6 text-muted hover:text-muted/50"
            disabled={quantity <= 1}
          >
            <Minus size={14} />
          </Button>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-10 text-center text-xs bg-transparent border-0 outline-none"
            min="1"
          />
          <Button
            type="button"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setQuantity((q) => q + 1);
            }}
            className="h-6 w-6 text-muted hover:text-muted/50"
          >
            <Plus size={14} />
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Sous-total</span>
        <span className="font-medium">
          {formatPrice(prixUnitaire * quantity)}
        </span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Frais</span>
        <span className="font-medium">{formatPrice(5000)}</span>
      </div>

      <Button variant="default" className="w-full mt-5">
        Acheter maintenant
      </Button>
    </aside>
  );
};

export default CommandeResume;
