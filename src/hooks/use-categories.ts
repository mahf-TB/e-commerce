import type { SelectOption } from "@/components/utils/select-form";
import { showToast } from "@/lib/toast";
import {
  createNewCategorie,
  fetchCategories,
  fetchProductsJobStatus,
  launchProductsJob,
  type CategoryParams,
} from "@/services/categorieService";
import type { Paginated } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";

export type Category = {
  _id: any;
  id: string;
  nom: string;
  description?: string | null;
  parent?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export function useCategories(params?: CategoryParams) {
  const { page, limit, q, parent, statut } = params || {};
  const query = useQuery({
    queryKey: ["categories", params],
    queryFn: () => fetchCategories({ page, limit, q, parent, statut }),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // handle both API shapes: either an array of categories, or a paginated object { items, limit, page, total }
  const raw = query.data as Paginated<Category>;
  let items: Category[] = [];
  let pagination: Paginated<Category> | undefined = undefined;

  if (raw && typeof raw === "object" && "items" in (raw as any)) {
    const r = raw as Paginated<Category>;
    items = Array.isArray(r.items) ? r.items : [];
    pagination = r;
  }

  const categoriesOptions: SelectOption[] = (items ?? []).map((c) => ({
    label: c.nom,
    value: String(c._id || c.id),
  }));

  return { ...query, data: raw, items, pagination, categoriesOptions };
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      nom: string;
      description?: string;
      parent?: string;
    }) => createNewCategorie(data),
    onMutate: () => {
      const toastId = showToast("loading", "Création de la catégorie...");
      return { toastId };
    },
    onSuccess: (data, variables, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      showToast("success", "Catégorie créée avec succès");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any, variables, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      showToast(
        "error",
        error?.response?.data?.message ||
          error?.message ||
          "Erreur lors de la création de la catégorie"
      );
    },
  });
}



export function useProductsByCategoryAsync(categoryId: string) {
  // 1️⃣ Mutation : lancer le job
  const startJob = useMutation({
    mutationFn: () => launchProductsJob(categoryId),
  });

  const jobId = startJob.data?.jobId;

  // Retourner une fonction `start` stable pour éviter des boucles
  const start = useCallback(() => startJob.mutate(), [startJob]);

  // 2️⃣ Query : suivre le status
  const jobStatus = useQuery({
    queryKey: ["products-by-category-job", categoryId, jobId],
    queryFn: () =>
      fetchProductsJobStatus({ categoryId, jobId }),

    enabled: !!jobId, // ne démarre qu'après le POST

    refetchInterval: (query) => {
      if (!query.state.data) return 1500;

      const status = query.state.data.status;
      return status === "done" || status === "failed"
        ? false
        : 1500;
    }
  });

  return {
    start,
    isStarting: startJob.isPending,

    status: jobStatus.data?.status,
    data: jobStatus.data?.result,
    warning: jobStatus.data?.warning,

    isLoading:
      startJob.isPending ||
      jobStatus.isFetching,

    error:
      startJob.error || jobStatus.error
  };
}

export default useCategories;
