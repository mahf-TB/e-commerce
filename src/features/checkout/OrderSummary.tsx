import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductItem from "@/components/product-item";
import { formatPrice } from "@/utils/helpers";
import { useCartStore } from "@/store/use-panier.store";
import { ShoppingCart } from "lucide-react";

export function OrderSummary() {
  const {
      cartItems,
      isOpen,
      removeItem,
      incrementQuantity,
      decrementQuantity,
      getTotalItems,
      getTotalPrice,
      openCart,
      closeCart,
      removeAll,
    } = useCartStore();
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold font-poppins"> Récapitulatif de commande</h2>

      {/* Liste des produits */}
      <div className="space-y-3">
        {/* Ici tu map tes items du panier */}
          {cartItems.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-2 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">
                Your cart is empty
              </p>
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
                onClick={() => console.log("Clicked:", item.id)}
                incrementQuantity={() => incrementQuantity(item.id)}
                decrementQuantity={() => decrementQuantity(item.id)}
                removeItem={() => removeItem(item.id)}
              />
            ))
          )}

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
