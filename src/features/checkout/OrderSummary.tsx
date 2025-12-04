import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductItem from "@/components/product-item";
import { formatPrice } from "@/utils/helpers";

export function OrderSummary() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold font-poppins"> Récapitulatif de commande</h2>

      {/* Liste des produits */}
      <div className="space-y-3">
        {/* Ici tu map tes items du panier */}
        <ProductItem
          id="1"
          nom="Électronique"
          image="/images/article1.jpg"
          description="Ordinateurs portables"
          prix={4500}
          quantite={1}
          showQuantityControl={false}
          onClick={(id: string) => console.log("Clicked:", id)}
        />
        <ProductItem
          id="1"
          nom="Électronique"
          image="/images/article1.jpg"
          description="Ordinateurs portables"
          prix={4500}
          quantite={1}
          showQuantityControl={false}
          onClick={(id: string) => console.log("Clicked:", id)}
        />
      </div>

      {/* Code promo */}
      <div className="flex gap-2">
        <Input className="rounded" placeholder="Discount code or gift card" />
        <Button variant="default" className="rounded">Appliquer</Button>
      </div>

      {/* Totaux */}
      <div className="space-y-1 text-sm p-2">
        <div className="flex justify-between">
          <span>Sous-total</span>
          <span>{formatPrice(14500)}</span>
        </div>
        <div className="flex justify-between">
          <span>Frais de livraison</span>
          <span>{formatPrice(500)}</span>
        </div>
        <div className="flex justify-between">
          <span>Remise</span>
          <span>{formatPrice(0)}</span>
        </div>
        <div className="flex justify-between font-semibold pt-2 border-t border-gray-300 mt-2">
          <span>Total</span>
          <span>{formatPrice(500 + 14500)}</span>
        </div>
      </div>
    </div>
  );
}
