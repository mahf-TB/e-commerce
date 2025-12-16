import {
    createUser,
    deleteUser,
    fetchUserById,
    fetchUsers,
    updateUser,
    uploadUserAvatar,
    type CreateUserPayload,
    type UpdateUserPayload,
    type UserListParams,
} from "@/services/userService";
import type { Paginated, User } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Hook pour récupérer la liste paginée des utilisateurs
 */
export function useUsersList(params: UserListParams = {}) {
  const {
    page = 1,
    limit = 10,
    search,
    statut,
    role,
    sortBy,
    sortOrder,
  } = params;

  const query = useQuery({
    queryKey: ["users", { page, limit, search, role, sortBy, sortOrder , statut }],
    queryFn: () => fetchUsers({ page, limit, search, role, sortBy, sortOrder , statut}),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  } as any);

  const raw = query.data as unknown;
  let items: User[] = [];
  let pagination: Paginated<User> | undefined = undefined;

  if (raw && typeof raw === "object" && "items" in (raw as any)) {
    const r = raw as Paginated<User>;
    items = Array.isArray(r.items) ? r.items : [];
    pagination = r;
  }

  return { ...query, items, pagination };
}

/**
 * Hook pour récupérer un utilisateur par son ID
 */
export function useUser(id?: string | number) {
  const enabled = !!id;
  const query = useQuery<User>({
    queryKey: ["users", id],
    queryFn: () => fetchUserById(id as string | number),
    enabled,
    retry: false,
    staleTime: 1000 * 60 * 2,
  });

  return query;
}

/**
 * Hook pour créer un utilisateur
 */
export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUserPayload) => createUser(payload),
    onSuccess: () => {
      // Invalide la liste des utilisateurs pour rafraîchir
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

/**
 * Hook pour mettre à jour un utilisateur
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string | number; payload: UpdateUserPayload }) =>
      updateUser(id, payload),
    onSuccess: (data, variables) => {
      // Invalide le cache de l'utilisateur modifié et la liste
      queryClient.invalidateQueries({ queryKey: ["users", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

/**
 * Hook pour supprimer un utilisateur
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => deleteUser(id),
    onSuccess: () => {
      // Invalide la liste des utilisateurs
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

/**
 * Hook pour uploader l'avatar d'un utilisateur
 */
export function useUploadUserAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: string | number; file: File }) =>
      uploadUserAvatar(id, file),
    onSuccess: (data, variables) => {
      // Invalide le cache de l'utilisateur et l'auth si c'est l'utilisateur connecté
      queryClient.invalidateQueries({ queryKey: ["users", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}
