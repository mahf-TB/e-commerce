import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMe, hasToken, profileUser, uploadUserAvatar } from "@/services/authService";
import type { UpdateProfilePayload, User } from "@/types";

export function useAuthUser() {
  const hasTokenValue = hasToken();
  const query = useQuery<User>({
    queryKey: ["auth", "me"],
    queryFn: fetchMe,
    enabled: !!hasTokenValue,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
  const isAuthenticated = !!query.data && !query.error;
    const user = query.data as User;
  return {
    ...query,
    data: user,
    isAuthenticated,
    user
  };
}


/**
 * Hook pour mettre à jour un utilisateur
 */
export function useUpdateProfileUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({  payload }: { payload: UpdateProfilePayload }) =>
      profileUser(payload),
    onSuccess: (data) => {
      // Invalide le cache de l'utilisateur modifié et la liste
      queryClient.invalidateQueries({ queryKey: ["users", data.id] });
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}


/**
 * Hook pour uploader l'avatar d'un utilisateur
 */
export function useUploadUserAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file }: { file: File }) =>
      uploadUserAvatar(file),
    onSuccess: (data) => {
      // Invalide le cache de l'utilisateur et l'auth si c'est l'utilisateur connecté
      queryClient.invalidateQueries({ queryKey: ["users", data.id] });
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}


export default useAuthUser;
