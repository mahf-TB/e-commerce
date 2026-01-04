import { PackageX, Trash2 } from "lucide-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BadgeButton from "@/components/utils/BadgeButton";
import ProductItem from "@/components/utils/product-item";
import { useCartStore } from "@/store/use-panier.store";
import { formatPrice } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";
import Tooltips from "../../components/utils/tooltips";

export type CartPopoverProps = {
  btnShow?: React.ReactNode;
  tooltipLabel?: string;
};

export default function CartPopover({
  btnShow,
  tooltipLabel,
}: CartPopoverProps) {
  const navigate = useNavigate();
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
           
            <div className="col-span-full flex items-center justify-center py-20 px-5">
              <div className="flex flex-col items-center gap-4 max-w-md text-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gray-200 rounded-full blur-xl opacity-50"></div>
                  <div className="relative bg-gray-100 p-4 rounded-full">
                    <PackageX className="text-gray-400" size={38} strokeWidth={1.5} />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 font-poppins">
                    Votre panier est vide
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez des articles à votre panier pour commencer vos achats.
                  </p>
                </div>
              </div>
            </div>
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
                incrementQuantity={() =>
                  incrementQuantity(item.id, item.variantId)
                }
                decrementQuantity={() =>
                  decrementQuantity(item.id, item.variantId)
                }
                updateQuantity={(quantity) =>
                  updateQuantity(item.id, item.variantId, quantity)
                }
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
                onClick={() => navigate("/cart") && closeCart()}
                variant="outline"
                className="rounded w-full"
              >
                Voir le panier
              </Button>
              <Button
                onClick={() => navigate("/checkout") && closeCart()}
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
