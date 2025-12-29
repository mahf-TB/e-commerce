// src/utils/helpers.ts
import type { EtatPaiement, StatutCommande } from "@/types";
import type { DateRange } from "react-day-picker";


// Formater un prix en USD
export const formatPrice = (price: number | undefined | null): string => {
  if (price === undefined || price === null || isNaN(price)) {
    return "0 Ar";
  }
  return price.toLocaleString("fr-FR", {
    style: "currency",
    currency: "MGA",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

//format date en format "DD MMM YYYY"
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatDateTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Formater un nombre en format compact (1.2K, 3.4M, etc.)
export function formatCompactNumber(n: number): string {
  if (n >= 1_000_000)
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
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
    case "en_attente":
      return "En attente";
    case "en_preparation":
      return "En préparation";
    case "expediee":
      return "Expédiée";
    case "livree":
      return "Livrée";
    case "annulee":
      return "Annulée";
    case "completed":
      return "Terminée";
    default:
      return "";
  }
}


export function getLibellePayement(etat: EtatPaiement): string {
  switch (etat) {
    case "en_attente":
      return "En attente";
    case "paye":
      return "Payé";
    case "remboursee":
      return "Remboursée";
    case "non_paye":
      return "Non Payé";
    case "echoue":
      return "Echoué";
    default:
      return "";
  }
}


export function getPaiementColorClass(statut: EtatPaiement , codeColor: string = "100"): string {
  console.log(statut);
  
  switch (statut) {
    case "en_attente":
      return `bg-amber-500 text-amber-100 border-amber-500`;
    case "remboursee":
      return `bg-gray-500 text-gray-100 border-gray-500`;
    case "non_paye":
      return `bg-indigo-500 text-indigo-100 border-indigo-500`;
    case "paye":
      return `bg-green-500 text-green-100 border-green-500`;
    case "echoue":
      return `bg-red-500 text-red-100 border-red-500`;
    default:
      return `bg-gray-500 text-gray-100`;
  }
}

export function getStatusColorClass(statut: StatutCommande , codeColor: string = "100"): string {
  switch (statut) {
    case "en_attente":
      return `bg-amber-${codeColor} text-amber-800 border-amber-800`;
    case "en_preparation":
      return `bg-blue-${codeColor} text-blue-800 border-blue-800`;
    case "expediee":
      return `bg-indigo-${codeColor} text-indigo-800 border-indigo-800`;
    case "livree":
      return `bg-emerald-${codeColor} text-emerald-800 border-emerald-800`;
    case "annulee":
      return `bg-red-${codeColor} text-red-800 border-red-800`;
    case "completed":
      return `bg-green-${codeColor} text-green-800 border-green-800`;
    default:
      return `bg-gray-${codeColor} text-gray-800`;
  }
}

// Fonction pour masquer une partie de l'email
export const maskEmail = (email: string): string => {
  return email
    ? `${email.substring(0, 1)}${"*".repeat(8)}@${email.split("@")[1]}`
    : "";
};

export const getFullName = (data: {
  prenom?: string;
  nom?: string;
  username?: string;
}): string => {
  return (
    `${data?.prenom || ""} ${data?.nom || ""}`.trim() ||
    data?.username ||
    "Utilisateur"
  );
};

export const fallbackAvatar = (data: {
  prenom?: string;
  nom?: string;
  username?: string;
  email?: string;
}) => {
  if (!data) return "";
  if (data.username) return data.username.slice(0, 2).toUpperCase();
  const first = (data.prenom || "").trim().charAt(0);
  const last = (data.nom || "").trim().charAt(0);
  const initials = (first + last).toUpperCase();
  return initials || (data.email?.charAt(0).toUpperCase() ?? "");
};

export const isAdmin = (userRole: string): boolean => {
  return userRole === "admin";
};


export const isClient = (userRole: string): boolean => {
  return userRole === "customer";
};

export const hasAdminAccess = (userRole: string): boolean => {
  return ["admin", "manager", "support"].includes(userRole);
};

export const isManagerAccess = (userRole: string): boolean => {
  return ["admin", "manager"].includes(userRole);
};

export const formatDateForAPI = (date: Date): string => {
  return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
};

 export const getDateRangeParams = (range: DateRange | undefined) => {
  if (!range || !range.from || !range.to) {
    return { dateDebut: undefined, dateFin: undefined };
  }

  return {
    dateDebut: formatDateForAPI(range.from),
    dateFin: formatDateForAPI(range.to),
  };
};
