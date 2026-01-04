export type NotificationType =
  | "commande_creee"
  | "commande_statut_change"
  | "paiement_statut_change"
  | "nouvelle_promo"
  | "avis_recu"
  | "autre";

export interface NotificationPayload {
  user: string;
  type?: NotificationType;
  titre: string;
  message: string;
  context?: Record<string, any>;
  lien?: string;
  estLu?: boolean;
}

export interface NotificationDto {
  id: string;
  user: string;
  type: NotificationType;
  titre: string;
  message: string;
  context?: Record<string, any>;
  lien?: string;
  estLu: boolean;
  createdAt: string;
  updatedAt: string;
}
