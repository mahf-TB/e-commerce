import { apiAuth } from "@/lib/axios";
import type { NotificationDto } from "@/types/notification";

export type ListNotificationsParams = {
  unreadOnly?: boolean;
  page?: number;
  limit?: number;
}

export async function listNotifications(params?: ListNotificationsParams): Promise<NotificationDto[]> {  
  const { data } = await apiAuth.get("/notifications" , { params });
  return data;
}

export async function markAsRead(id: string): Promise<{ message: string }> {
  const { data } = await apiAuth.patch(`/notifications/${id}/read`);
  return data;
}

export async function markAllReadNotifications(): Promise<{ message: string }> {
  const { data } = await apiAuth.patch(`/notifications/allread`);
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
