import React from "react";
import { ShoppingCart, Trash2, Plus, Minus, SaveOff } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Tooltips from "../../components/tooltips";
import { useCartStore } from "@/store/use-panier.store";
import ProductItem from "@/components/product-item";
import { formatPrice } from "@/utils/helpers";
import BadgeButton from "@/components/BadgeButton";
import { EmptyState } from "@/components/EmptyState";

export type CartPopoverProps = {
  btnShow?: React.ReactNode;
  tooltipLabel?: string;
};

export default function CartPopover({
  btnShow,
  tooltipLabel,
}: CartPopoverProps) {
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

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // ✅ Gérer l'ouverture/fermeture avec onOpenChange
  const handleOpenChange = (open: boolean) => {
    if (open) {
      openCart();
    } else {
      closeCart();
    }
  };

  // ✅ Supprimer un article
  const handleRemoveItem = (id: number | string) => {
    removeItem(id);
  };

  // ✅ Incrémenter la quantité (+1)
  const handleIncreaseQuantity = (id: number | string) => {
    incrementQuantity(id);
  };

  // ✅ Décrémenter la quantité (-1)
  const handleDecreaseQuantity = (id: number | string) => {
    decrementQuantity(id);
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...", cartItems);
    // Logique de paiement ici
    closeCart();
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <Tooltips text={tooltipLabel || ""}>
        <PopoverTrigger asChild>{btnShow && btnShow}</PopoverTrigger>
      </Tooltips>

      <PopoverContent className="w-[450px] p-0">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 border-b">
          <div className="font-semibold text-base">
            Panier d’achats
            {totalItems > 0 && (
              <Badge variant="secondary">{totalItems} articles</Badge>
            )}
          </div>

          <BadgeButton onClick={removeAll} icon={Trash2} />
        </div>

        {/* Articles du panier */}
        <div className="max-h-[450px] overflow-y-auto p-2">
          {cartItems.length === 0 ? (
            <EmptyState
              media={<SaveOff size={32} />}
              title="Votre panier est vide"
              actions={
                [
                  {
                    variant: "default",
                    href: "/products",
                    label: "Continuer vos achats",
                  },
                ] /* Vous pouvez ajouter des actions ici si nécessaire */
              }
            />
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
                showQuantityControl={true}
                onClick={() => console.log("Clicked:", item.id)}
                incrementQuantity={() => handleIncreaseQuantity(item.id)}
                decrementQuantity={() => handleDecreaseQuantity(item.id)}
                removeItem={() => handleRemoveItem(item.id)}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-4 py-4 border-t space-y-3">
            <div className="space-y-1 text-sm p-1">
              {/* Subtotal */}
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              <div className="flex justify-between">
                <span>Remise</span>
                <span>0</span>
              </div>
              <div className="flex justify-between">
                <span>Frais</span>
                <span>calculés lors du paiement</span>
              </div>
              {/* total prix */}
              <div className="flex justify-between font-semibold pt-2 border-t border-gray-300 mt-2">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
            {/* Checkout Button */}
            <div className="flex gap-2 mt-3">
              <Button
                onClick={handleCheckout}
                variant="default"
                className="rounded w-full"
              >
                Procéder au paiement
              </Button>
            </div>

            {/* Continue Shopping */}
            {/* <Button variant="outline" className="w-full" onClick={closeCart}>
              Continue Shopping
            </Button> */}
            {/* ✅ Clear/Remove All Cart */}
            {/* <Button
              variant="destructive"
              className="w-full text-xs"
              onClick={removeAll}
            >
              Clear Cart
            </Button> */}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
