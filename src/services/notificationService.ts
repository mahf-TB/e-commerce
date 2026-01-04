import { apiAuth } from "@/lib/axios";
import type { NotificationDto } from "@/types/notification";

export async function listNotifications(): Promise<NotificationDto[]> {
  const { data } = await apiAuth.get("/notifications");
  return data;
}

export async function markAsRead(id: string): Promise<{ message: string }> {
  const { data } = await apiAuth.patch(`/notifications/${id}/read`);
  return data;
}

export async function removeNotification(id: string): Promise<{ message: string }> {
  const { data } = await apiAuth.delete(`/notifications/${id}`);
  return data;
}

export async function clearAllNotifications(): Promise<{ message: string }> {
  const { data } = await apiAuth.delete(`/notifications`);
  return data;
}
