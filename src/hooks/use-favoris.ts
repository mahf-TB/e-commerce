import { showToast } from "@/lib/toast";
import { hasToken } from "@/services/authService";
import {
  addToFavoris,
  checkIsFavoris,
  clearAllFavoris,
  getFavoris,
  removeFromFavoris,
  type AddToFavorisPayload,
  type FavorisItem,
  type ItemType,
} from "@/services/favorisService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Hook pour récupérer tous les favoris de l'utilisateur
 */
export function useFavoris(filter?: { startDate?: string; endDate?: string }) {
   const hasTokenValue = hasToken();
  const query = useQuery<FavorisItem>({
    queryKey: ["favoris", filter],
    queryFn: () => getFavoris(filter),
    enabled: !!hasTokenValue,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return query;
}

/**
 * Hook pour vérifier si un item est en favoris
 */
export function useCheckFavoris(itemType: ItemType, itemId: string) {
  const enabled = !!itemType && !!itemId;

  const query = useQuery<{ isFavoris: boolean }>({
    queryKey: ["favoris", "check", itemType, itemId],
    queryFn: () => checkIsFavoris(itemType, itemId),
    enabled,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  return {
    ...query,
    isFavoris: query.data?.isFavoris ?? false,
  };
}

/**
 * Hook pour ajouter un item aux favoris
 */
export function useAddToFavoris() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddToFavorisPayload) => addToFavoris(payload),
    onSuccess: (data, variables) => {
      showToast("success", "Ajouté aux favoris");
      // Invalide la liste des favoris
      queryClient.invalidateQueries({
        queryKey: ["favoris"],
      });
      // Invalide le check pour cet item spécifique
      queryClient.invalidateQueries({
        queryKey: ["favoris", "check", variables.itemType, variables.itemId],
      });
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Erreur lors de l'ajout aux favoris"
      );
    },
  });
}

/**
 * Hook pour retirer un item des favoris
 */
export function useRemoveFromFavoris() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemType,
      itemId,
    }: {
      itemType: ItemType;
      itemId: string;
    }) => removeFromFavoris(itemType, itemId),
    onSuccess: (data, variables) => {
      showToast("success", "Retiré des favoris");
      // Invalide la liste des favoris
      queryClient.invalidateQueries({
        queryKey: ["favoris"],
      });
      // Invalide le check pour cet item spécifique
      queryClient.invalidateQueries({
        queryKey: ["favoris", "check", variables.itemType, variables.itemId],
      });
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Erreur lors du retrait des favoris"
      );
    },
  });
}

/**
 * Hook pour toggle un item dans les favoris (ajouter ou retirer)
 */
export function useToggleFavoris() {
  const addMutation = useAddToFavoris();
  const removeMutation = useRemoveFromFavoris();

  return {
    toggle: ({
      itemType,
      itemId,
      isFavoris,
    }: {
      itemType: ItemType;
      itemId: string;
      isFavoris: boolean;
    }) => {
      if (isFavoris) {
        removeMutation.mutate({ itemType, itemId });
      } else {
        addMutation.mutate({ itemType, itemId });
      }
    },
    isPending: addMutation.isPending || removeMutation.isPending,
  };
}

/**
 * Hook pour vider tous les favoris
 */
export function useClearAllFavoris() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearAllFavoris,
    onSuccess: () => {
      showToast("success", "Tous les favoris ont été supprimés");
      // Invalide toutes les queries liées aux favoris
      queryClient.invalidateQueries({
        queryKey: ["favoris"],
      });
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Erreur lors de la suppression des favoris"
      );
    },
  });
}
