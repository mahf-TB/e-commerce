import type { SelectOption } from "@/components/select-form";
import { showToast } from "@/lib/toast";
import { createNewCategorie, fetchCategories } from "@/services/categorieService";
import type { Paginated } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type Category = {
  _id: any;
  id: string;
  nom: string;
  description?: string | null;
  parent?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export function useCategories() {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
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

  return { ...query, items, pagination, categoriesOptions };
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { nom: string; description?: string; parent?: string }) => 
      createNewCategorie(data),
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

export default useCategories;
