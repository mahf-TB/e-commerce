// src/utils/helpers.ts
import type { CommandeDetail, StatutCommande } from "@/types";

// Formater un prix en USD
export const formatPrice = (price: number): string => {
  return price.toLocaleString(undefined, {
    style: "currency",
    currency: "MGA",
  });
};

export function formatCompactNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toString();
}
// Calculer le total d'un panier
export const calculateCartTotal = (
  items: { price: number; quantity: number }[]
): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Vérifier si un email est valide
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


export function getLibelleStatut(statut: StatutCommande): string {
  switch (statut) {
    case 'en_attente':
      return 'En attente';
    case 'en_preparation':
      return 'En préparation';
    case 'expediee':
      return 'Expédiée';
    case 'livree':
      return 'Livrée';
    case 'annulee':
      return 'Annulée';
    default:
      return '';
  }
}


export function getStatusColorClass(statut: CommandeDetail["statut"]) {
  switch (statut) {
    case "en_attente":
        return "bg-amber-100 text-amber-800";
    case "en_preparation":
      return "bg-blue-100 text-blue-800";
    case "expediee":
      return "bg-indigo-100 text-indigo-800";
    case "livree":
      return "bg-emerald-100 text-emerald-800";
    case "annulee":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }

}
