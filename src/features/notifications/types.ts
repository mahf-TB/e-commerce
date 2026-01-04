import type { NotificationType } from "@/types/notification";

export type NotificationItem = {
  id: string;
  user?: string;
  type?: NotificationType;
  titre: string;
  message: string;
  context?: Record<string, any>;
  lien?: string;
  estLu?: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};

