// store/useCartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number | string; //Produit ID
  name: string; //Produit nom + variante
  price: number; //Prix unitaire du variant produit
  description?: string;
  quantity: number; //Quantité ajoutée au panier
  image: string; //URL de l'image du produit
  variantId: number | string; //ID de la variante sélectionnée
}

interface CartStore {
  // ===== STATE =====
  cartItems: CartItem[];
  isOpen: boolean;

  // ===== ACTIONS PRINCIPALES =====
  addItem: (item: CartItem) => void;
  removeItem: (id: number | string, variantId: number | string) => void;
  updateQuantity: (
    id: number | string,
    variantId: number | string,
    quantity: number
  ) => void;
  incrementQuantity: (id: number | string, variantId: number | string) => void;
  decrementQuantity: (id: number | string, variantId: number | string) => void;
  clearCart: () => void;
  removeAll: () => void;

  // ===== ACTIONS POPOVER =====
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // ===== GETTERS / COMPUTED =====
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getCartItems: () => CartItem[];
  getItemCount: (id: number | string, variantId: number | string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // ===== ÉTAT INITIAL =====
      cartItems: [],
      isOpen: false,

      // ===== AJOUTER UN ARTICLE AU PANIER =====
      addItem: (item: CartItem) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (i) => i.id === item.id && i.variantId === item.variantId
          );

          // Si l'article existe déjà, incrémenter sa quantité
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === item.id && i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          // Sinon, ajouter le nouvel article
          return { cartItems: [...state.cartItems, item] };
        }),

      // ===== SUPPRIMER UN ARTICLE =====
      removeItem: (id: number | string, variantId: number | string) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => !(item.id === id && item.variantId === variantId)
          ),
        })),

      // ===== METTRE À JOUR LA QUANTITÉ (DIRECT) =====
      updateQuantity: (
        id: number | string,
        variantId: number | string,
        quantity: number
      ) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id && item.variantId === variantId && quantity > 0
              ? { ...item, quantity }
              : item
          ),
        })),

      // ===== INCRÉMENTER LA QUANTITÉ +1 =====
      incrementQuantity: (id: number | string, variantId: number | string) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id && item.variantId === variantId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      // ===== DÉCRÉMENTER LA QUANTITÉ -1 =====
      decrementQuantity: (id: number | string, variantId: number | string) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id && item.variantId === variantId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        })),

      // ===== VIDER LE PANIER =====
      clearCart: () => set({ cartItems: [], isOpen: false }),

      // ===== ALIAS POUR VIDER (REMOVE ALL) =====
      removeAll: () => set({ cartItems: [], isOpen: false }),

      // ===== OUVRIR LE POPOVER PANIER =====
      openCart: () => set({ isOpen: true }),

      // ===== FERMER LE POPOVER PANIER =====
      closeCart: () => set({ isOpen: false }),

      // ===== BASCULER OUVERT/FERMÉ =====
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      // ===== CALCULER LE NOMBRE TOTAL D'ARTICLES =====
      getTotalItems: () =>
        get().cartItems.reduce((sum, item) => sum + item.quantity, 0),

      // ===== CALCULER LE PRIX TOTAL =====
      getTotalPrice: () =>
        get().cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),

      // ===== RÉCUPÉRER TOUS LES ARTICLES =====
      getCartItems: () => get().cartItems,

      // ===== OBTENIR LA QUANTITÉ D'UN ARTICLE SPÉCIFIQUE =====
      getItemCount: (id: number | string, variantId: number | string) => {
        const item = get().cartItems.find(
          (i) => i.id === id && i.variantId === variantId
        );
        return item ? item.quantity : 0;
      },
    }),
    {
      name: "cart-store", // Clé localStorage pour la persistence
    }
  )
);
