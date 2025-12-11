import ProductItem from "@/components/product-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getOneVariantProduit } from "@/services/produitService";
import { useCartStore } from "@/store/use-panier.store";
import { formatPrice } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import { useParams } from "react-router-dom";

// Typescript types for OrderSummary component props

export interface OrderSummaryProps {
  fraisLivraison?: number;
  qte?: number;
}

export function OrderSummary({ fraisLivraison, qte }: OrderSummaryProps) {
  const { produitId, variantId } = useParams<{
    variantId: string;
    produitId: string;
  }>();
  const { cartItems, removeItem, getTotalPrice } = useCartStore();

  const { data, isLoading } = useQuery({
    queryKey: ["product", produitId, variantId],
    queryFn: () =>
      getOneVariantProduit(produitId as string, variantId as string),
    enabled: !!produitId || !!variantId,
    staleTime: 1000 * 60 * 2,
    retry: false,
  });

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold font-poppins">
        {" "}
        Récapitulatif de commande
      </h2>

      {/* Liste des produits */}
      <div className="space-y-3">
        {/* Ici tu map tes items du panier */}
        {data ? (
          <ProductItem
            key={data.id}
            id={data.id}
            nom={data.nom}
            image={data.imagePrincipale}
            description={data?.description}
            prix={data.prixUnitaire}
            quantite={qte}
            showQuantityControl={false}
            onClick={() => console.log("Clicked:", data.id, data.variantId)}
            removeItem={() => removeItem(data.id, data.variantId)}
          />
        ) : cartItems.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <ShoppingCart className="h-12 w-12 mx-auto mb-2 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <ProductItem
              key={item.id}
              id={item.id}
              nom={item.name}
              image={item.image}
              description={item?.description}
              prix={item.price}
              quantite={item.quantity}
              showQuantityControl={false}
              onClick={() => console.log("Clicked:", item.id, item.variantId)}
              removeItem={() => removeItem(item.id, item.variantId)}
            />
          ))
        )}
      </div>

      {/* Code promo */}
      <div className="flex gap-2">
        <Input className="rounded" placeholder="Discount code or gift card" />
        <Button variant="default" className="rounded">
          Appliquer
        </Button>
      </div>

      {/* Totaux */}
      <div className="space-y-1 text-sm p-2">
        <div className="flex justify-between">
          <span>Sous-total</span>
          <span>
            {data && qte
              ? formatPrice(qte * data.prixUnitaire)
              : formatPrice(getTotalPrice())}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Remise</span>
          <span>{formatPrice(0)}</span>
        </div>
        <div className="flex justify-between">
          <span>Frais de livraison</span>
          <span>{formatPrice(fraisLivraison ?? 0)}</span>
        </div>

        <div className="flex justify-between font-semibold pt-2 border-t border-gray-300 mt-2">
          <span>Total</span>
          <span>
            {data && qte
              ? formatPrice((fraisLivraison || 0) + data.prixUnitaire * qte)
              : formatPrice((fraisLivraison || 0) + getTotalPrice())}
          </span>
        </div>
      </div>
    </div>
  );
}
