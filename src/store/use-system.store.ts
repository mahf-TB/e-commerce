import { create } from "zustand";

interface SystemState {
  notifySheet: boolean;
  expandSheet: boolean;
  setNotifySheet: (notifySheet: boolean) => void;
  setExpandSheet: (expandSheet: boolean) => void;
}

const useSystemStore = create<SystemState>((set) => ({
  expandSheet: false,
  setExpandSheet: (expandSheet: boolean) => set({ expandSheet }),
  notifySheet: false,
  setNotifySheet: (notifySheet: boolean) => set({ notifySheet }),
}));

export default useSystemStore;