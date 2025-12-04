// src/features/auth/hooks/useAuthInvalidate.ts
import { useQueryClient } from "@tanstack/react-query";
export const authKeys = {
  me: ["auth", "me"] as const,
};
export function useAuthInvalidate() {
  const queryClient = useQueryClient();

  const invalidateAuthUser = () =>
    queryClient.invalidateQueries({ queryKey: authKeys.me });

  const removeAuthUser = () =>
    queryClient.removeQueries({ queryKey: authKeys.me });

  return { invalidateAuthUser, removeAuthUser };
}
