import { useQuery } from "@tanstack/react-query";
import { fetchMarques } from "@/services/marqueService";
import type { SelectOption } from "@/components/select-form";
import type { Paginated } from "@/types";

export type Marque = {
  _id: any;
  id: string;
  nom: string;
  description?: string | null;
  logo?: string | null;
  siteWeb?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export function useBrands() {
  const query = useQuery({
    queryKey: ["brands"],
    queryFn: fetchMarques,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const raw = query.data as unknown;
  let items: Marque[] = [];
  let pagination: Paginated<Marque> | undefined = undefined;

  if (raw && typeof raw === "object" && "items" in (raw as any)) {
    const r = raw as Paginated<Marque>;
    items = Array.isArray(r.items) ? r.items : [];
    pagination = r;
  }

  const marquesOptions: SelectOption[] = (items ?? []).map((c) => ({
    label: c.nom,
    value: String(c._id || c.id),
  }));

  return { ...query, items, pagination, marquesOptions };
}

export default useBrands;
