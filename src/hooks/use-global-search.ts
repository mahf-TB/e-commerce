import api, { apiAuth } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export type GlobalSearchScope =
  | "produits"
  | "categories"
  | "marques"
  | "clients"
  | "commandes"
  | "avis"
  | "all";

export async function searchGlobal(
  q: string,
  scope: GlobalSearchScope = "all"
) {
  if (!q || q.trim().length === 0) return [];
  const { data } = await apiAuth.get("/search", { params: { q, scope } });
  return data;
}

export function useGlobalSearch(q: string, scope: GlobalSearchScope = "all") {
  const query= useQuery({
    queryKey: ["globalSearch", q, scope],
    queryFn: () => searchGlobal(q, scope),
    enabled: !!q && q.trim().length > 0,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });

  return {...query, items: query.data?.items}
}

export default useGlobalSearch;
