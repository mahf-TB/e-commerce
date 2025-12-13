import BadgeButton from "@/components/BadgeButton";
import FeedbackPopover from "@/components/feedback-popover";
import Tooltips from "@/components/tooltips";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/use-panier.store";
import type { Produit } from "@/types";
import { formatPrice } from "@/utils/helpers";
import { Brain, Heart, MessageSquareHeart, Star } from "lucide-react";
import { useState } from "react";
import CommandeResume from "./CommandeResume";

type FeaturedProductProps = {
  product: Produit; // replace with a proper Product type when available
};

export function FeaturedProducts({ product }: FeaturedProductProps) {
  const { addItem, openCart, isOpen } = useCartStore();

  const [selectedVariant, setSelectedVariant] = useState<number>(
    product.variants && product.variants.length > 0
      ? product.variants.findIndex((v) => v.statut === "active") ?? 0
      : 0
  );

  // Récupérer la variante sélectionnée et ses données
  const currentVariant = product?.variants?.[selectedVariant];
  // Calculer le prix unitaire en fonction de la variante sélectionnée
  const prixUnitaire =
    currentVariant?.prixUnitaire ?? currentVariant?.prixUnitaire ?? 0;

  // Déterminer l'état du stock neuf ou reconditionné
  const etatStock =
    currentVariant.etatProduit === "neuf"
      ? "Neuf"
      : currentVariant.etatProduit === "reconditionne"
      ? "Reconditionné"
      : "D'occasion";
  // Nom complet du produit avec variante
  const productName =
    product?.nom + (currentVariant ? `, ${currentVariant.variant}` : "");
  // Ajouter au panier
  const handleAddToCart = () => {
    // ✅ Ajouter au panier via store
    addItem({
      id: product.id,
      name: productName,
      price: prixUnitaire,
      description: product.description ?? "",
      quantity: 1,
      image:
        product.images.find((img) => img.isPrincipale)?.url ??
        "/images/default-product.jpg",
      variantId: currentVariant?.id ?? "",
    });
    if (!isOpen) {
      console.log("maheada open");
      openCart();
    }
  };

  return (
    <div className="flex-2 flex flex-col lg:flex-row w-full gap-6">
      <main className="w-full md:flex-2 max-md:pb-0 rounded-md">
        <h2 className="text-2xl font-semibold mb-2 font-poppins">
          {productName ?? "Titre indisponible"}
        </h2>

        <div className="flex items-center gap-3 mb-2">
          {product?.noteMoyenne !== 0 && product?.nombreAvis !== 0 && (
            <div className="flex items-center gap-1 text-yellow-500">
              <Star fill="currentColor" size={16} />
              <span className="font-semibold font-poppins">
                {product?.noteMoyenne ?? "0"}
              </span>
              <span className="text-sm text-gray-500">
                ({product?.nombreAvis ?? 0} avis)
              </span>
            </div>
          )}

          {product?.garantie && (
            <Badge className="ml-1" variant="destructive">
              Garantie {product.garantie}
            </Badge>
          )}
        </div>
        {/* Prix du produit */}
        <div className="mb-2 flex items-start flex-col gap-2">
          <div className="text-sm text-gray-500  flex items-center gap-1">
            <Brain size={18} />
            <span className="font-medium">{etatStock}</span>
          </div>
          <div className="text-2xl font-bold font-poppins">
            Prix : {formatPrice(prixUnitaire)}
          </div>
        </div>

        {/* Description */}
        <ul className="mb-4 list-disc ml-5">
          {String(product?.description ?? "Aucune description")
            .split("/")
            .map((p) => p.trim())
            .filter(Boolean)
            .map((part, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                {part}
              </li>
            ))}
        </ul>

        {/* Variants */}
        {product?.variants && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Options sur variant</h4>
            <div className="flex gap-2 flex-wrap">
              {product.variants.map((v: any, idx: number) => (
                <Button
                  key={idx}
                  disabled={v.statut !== "active"}
                  variant={selectedVariant === idx ? "default" : "outline"}
                  size="sm"
                  className="rounded"
                  onClick={() => setSelectedVariant(idx)}
                >
                  {v.variant}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center gap-2">
          <Tooltips side="bottom" text={"Ajouter ce produit dans votre panier"}>
            <Button
              className="flex-1 bg-green-600 hover:bg-green-600/90 text-slate-100 font-semibold rounded-md"
              onClick={handleAddToCart}
            >
              Ajouter au panier
            </Button>
          </Tooltips>

          <Tooltips side="bottom" text={"Ajouter aux favoris"}>
            <BadgeButton variant={"outline"} icon={Heart} />
          </Tooltips>
          <FeedbackPopover
            id={product.id}
            btnShow={
              <BadgeButton variant={"outline"} icon={MessageSquareHeart} />
            }
            tooltipLabel="Donner votre avis sur ce produit"
          />
        </div>
        <div></div>
      </main>
      <CommandeResume
        prixUnitaire={prixUnitaire}
        produit={{
          id: product?.id as string,
          variantId: currentVariant?.id as string,
          produitName: productName,
          image:
            product.images.find((img) => img.isPrincipale)?.url ??
            "/images/default-product.jpg",
        }}
      />
    </div>
  );
}
