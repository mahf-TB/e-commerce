import { create } from "zustand";

interface SystemState {
  expandSheet: boolean;
  setExpandSheet: (expandSheet: boolean) => void;
}

const useSystemStore = create<SystemState>((set) => ({
  expandSheet: false,
  setExpandSheet: (expandSheet: boolean) => set({ expandSheet }),
}));

export default useSystemStore;