import type { NotificationItem } from "@/features/notifications/types";
import { showToast } from "@/lib/toast";
import { hasToken } from "@/services/authService";
import {
  clearAllNotifications,
  listNotifications,
  markAllReadNotifications,
  markAsRead,
  removeNotification,
  type ListNotificationsParams,
} from "@/services/notificationService";
import type { NotificationDto } from "@/types/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useNotifications(params: ListNotificationsParams = {}) {
  const hasTokenValue = hasToken();
  const { page = 1, limit = 20, unreadOnly } = params;
  const query = useQuery<NotificationDto[]>({
    queryKey: [
      "notifications",
      {
        page,
        limit,
        unreadOnly,
      },
    ],
    queryFn: () =>
      listNotifications({
        page,
        limit,
        unreadOnly,
      }),
    enabled: !!hasTokenValue,
    retry: false,
    staleTime: 1000 * 60, // 1 minute
  });

  const raw = query.data as any;
  let list: NotificationDto[] = [];

  if (Array.isArray(raw)) {
    list = raw;
  } else if (raw && Array.isArray(raw.items)) {
    list = raw.items;
  } else {
    list = [];
  }

  const items: NotificationItem[] = (list ?? []).map((d) => ({
    id: d.id,
    user: d.user,
    type: d.type,
    titre: d.titre,
    message: d.message,
    context: d.context,
    lien: d.lien,
    estLu: d.estLu,
    image: d.context?.image || undefined,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  }));

  return { ...query, items, total: raw?.totalItems };
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => markAsRead(id),
    onSuccess: () => {
      showToast("success", "Notification marquée comme lue");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message ||
          "Erreur lors du marquage de la notification"
      );
    },
  });
}

export function useRemoveNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeNotification(id),
    onSuccess: () => {
      showToast("success", "Notification supprimée");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message ||
          "Erreur lors de la suppression de la notification"
      );
    },
  });
}

export function useClearAllNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearAllNotifications(),
    onSuccess: () => {
      showToast("success", "Toutes les notifications ont été supprimées");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message ||
          "Erreur lors de la suppression des notifications"
      );
    },
  });
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => markAllReadNotifications(),
    onSuccess: (res: any) => {
      showToast(
        "success",
        `${res?.count || 0} notification(s) marquée(s) comme lue(s)`
      );
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message ||
          "Erreur lors du marquage des notifications"
      );
    },
  });
}
