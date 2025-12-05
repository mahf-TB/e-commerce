export const productStatusOptions = [
  { label: "Tout", value: "all" },
  { label: "Actif", value: "active" },
  { label: "Inactif", value: "inactive" },
  { label: "Archivé", value: "archived" },
];

export const productConditionOptions = [
  { label: "Neuf", value: "neuf" },
  { label: "Occasion", value: "usage" },
  { label: "Reconditionné", value: "reconditionne" },
];

export const orderStatusOptions = [
  { label: "En attente", value: "pending" },
  { label: "En traitement", value: "processing" },
  { label: "Expédiée", value: "shipped" },
  { label: "Livrée", value: "delivered" },
  { label: "Annulée", value: "cancelled" },
  { label: "Remboursée", value: "refunded" },
  { label: "Archivée", value: "archived" },
];

export const paymentStatusOptions = [
  { label: "En attente", value: "pending" },
  { label: "Payée", value: "paid" },
  { label: "Échouée", value: "failed" },
  { label: "Partiellement remboursée", value: "partially_refunded" },
  { label: "Remboursée", value: "refunded" },
];


export const sortOptions = [
  { label: "Plus récent", value: "newest" },
  { label: "Plus ancien", value: "oldest" },
  { label: "Prix : faible → élevé", value: "price_asc" },
  { label: "Prix : élevé → faible", value: "price_desc" },
  { label: "Popularité", value: "popular" },
  { label: "Note : élevée → faible", value: "rating_desc" },
  { label: "Note : faible → élevée", value: "rating_asc" },
];