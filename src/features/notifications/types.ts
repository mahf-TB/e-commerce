export type NotificationItem = {
  id: string;
  user?: string;
  type?:
    | "commande_creee"
    | "commande_statut_change"
    | "paiement_statut_change"
    | "nouvelle_promo"
    | "avis_recu"
    | "autre";
  titre: string;
  message: string;
  context?: Record<string, any>;
  lien?: string;
  estLu?: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};

