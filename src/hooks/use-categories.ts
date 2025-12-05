import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/categorieService";
import type { Paginated } from "@/types";
import type { SelectOption } from "@/components/select-form";

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

export default useCategories;
