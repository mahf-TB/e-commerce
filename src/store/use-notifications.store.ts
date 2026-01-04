import type { NotificationDto } from "@/types/notification";
import { create } from "zustand";

// Minimal stub store: notifications client-side disabled per request.
interface NotificationsState {
  items: NotificationDto[];
  connected: boolean;
  setItems: (items: NotificationDto[]) => void;
  addOrUpdate: (item: NotificationDto) => void;
  remove: (id: string) => void;
  clear: () => void;
  connect: (_token?: string) => void;
  disconnect: () => void;
}

const useNotificationsStore = create<NotificationsState>((set) => ({
  items: [],
  connected: false,
  setItems: (items: NotificationDto[]) => set({ items }),
  addOrUpdate: (_item: NotificationDto) => {},
  remove: (_id: string) => {},
  clear: () => set({ items: [] }),
  connect: (_token?: string) => {},
  disconnect: () => {},
}));

export default useNotificationsStore;
