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
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    closeCart,
    removeAll,
    toggleCart,
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    console.log("Proceeding to checkout...", cartItems);
    // Logique de paiement ici
    closeCart();
  };

  return (
    <Popover open={isOpen} onOpenChange={toggleCart}>
      <Tooltips text={tooltipLabel || ""}>
        <PopoverTrigger asChild>{btnShow && btnShow}</PopoverTrigger>
      </Tooltips>

      <PopoverContent className="w-[450px] p-0">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-gray-300">
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
            />
          ) : (
            cartItems.map((item, i) => (
              <ProductItem
                key={i}
                id={item.id}
                nom={item.name}
                image={item.image}
                description={item?.description}
                prix={item.price}
                quantite={item.quantity}
                showQuantityControl={true}
                onClick={() => console.log("Clicked:", item.id)}
                incrementQuantity={() => incrementQuantity(item.id , item.variantId)}
                decrementQuantity={() => decrementQuantity(item.id, item.variantId)}
                updateQuantity={(quantity) => updateQuantity(item.id, item.variantId, quantity)}
                removeItem={() => removeItem(item.id, item.variantId)}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-4 py-4space-y-3">
            {/* Subtotal */}

            {/* total prix */}
            <div className="flex justify-between font-semibold pt-2 border-t border-gray-300 mt-2">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            {/* Checkout Button */}
            <div className="flex gap-2 my-3">
              <Button
                onClick={handleCheckout}
                variant="default"
                className="rounded w-full"
              >
                Procéder au paiement
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
