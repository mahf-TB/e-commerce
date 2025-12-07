import ProductItem from "@/components/product-item";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/use-panier.store";
import { ShoppingCart } from "lucide-react";

const CartPage = () => {
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
    <div className="flex flex-col md:flex-row items-start mt-5 gap-6">
      {/* Colonne gauche: espace publicitaire / promotions */}
      <div className="w-full md:w-72 max-md:hidden bg-gray-50 rounded p-4 shadow flex flex-col items-center sticky top-30">
        <h2 className="text-lg font-semibold mb-4">Promotions & Publicités</h2>
        <div className="w-full h-40 md:h-72 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md flex items-center justify-center text-white font-medium">
          Bannière publicitaire
        </div>
        <p className="mt-3 text-sm text-gray-700 text-center">
          Promos, cross-sells ou bannières.
        </p>
      </div>
      <div className="flex-2 flex flex-col lg:flex-row w-full gap-6">
        {/* Colonne centrale (plus large): articles du panier */}
        <main className="w-full md:flex-2 max-md:pb-0  rounded-md p-4">
          {/* Ici vous pouvez lister les lignes du panier */}
          <div className="space-y-4">
            <h2 className="text-2xl font-poppins font-semibold">Mon panier</h2>
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
                showQuantityControl={true}
                onClick={() => console.log("Clicked:", item.id)}
                incrementQuantity={() => incrementQuantity(item.id)}
                decrementQuantity={() => decrementQuantity(item.id)}
                removeItem={() => removeItem(item.id)}
              />
            ))
          )}
            </div>
          </div>
        </main>
        {/* Colonne droite: résumé de commande */}
        <aside className="w-full lg:w-80  rounded-md p-4 max-md:pt-0 h-fit lg:sticky lg:top-8">
          <h2 className="text-lg font-semibold font-poppins">Résumé de la commande</h2>
          <div className="text-sm text-gray-600 mb-3">
            Ici le résumé du panier
          </div>
          {/* Ajoutez totals, boutons checkout, etc. */}
          {/* Totaux */}
          <div className="space-y-1 text-sm p-1">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>2748 Ar</span>
            </div>
        
            <div className="flex justify-between">
              <span>Remise</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between">
              <span>Frais</span>
              <span>calculés lors du paiement</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t border-gray-300 mt-2">
              <span>Total</span>
              <span>$2,748</span>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button variant="default" className="rounded w-full">
              Procéder au paiement
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
