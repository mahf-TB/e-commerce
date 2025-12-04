import { create } from "zustand";

interface AuthState {
  pending: boolean;
  step: "check" | "login" | "register";
  setStep: (step: "check" | "login" | "register") => void;
  setPending: (pending: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  pending: false,
  setPending: (pending: boolean) => set({ pending }),
  step: "check",
  setStep: (step) => set({ step }),
}));

export default useAuthStore;
