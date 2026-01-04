import { getProductById, getProductList } from "@/services/produitService";
import type { Paginated, ProductListItem, Produit } from "@/types";
import { useQuery } from "@tanstack/react-query";

export type ProductListParams = {
  page?: number;
  limit?: number;
  q?: string;
  categorie?: string;
  marque?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  statut?: string;
};

export function useProduct(productId?: string | number) {
  const enabled = !!productId;
  const query = useQuery<Produit>({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId as string | number),
    enabled,
    staleTime: 1000 * 60 * 2,
    retry: false,
  });

  return query;
}

export function useProductList(params: ProductListParams = {}) {
  const {
    page = 1,
    limit = 20,
    q,
    categorie,
    marque,
    sort,
    minPrice,
    maxPrice,
    statut,
  } = params;


  const query = useQuery({
    queryKey: [
      "products",
      { page, limit, q, categorie, marque, sort, minPrice, maxPrice, statut },
    ],
    queryFn: () =>
      getProductList({
        page,
        limit,
        q,
        categorie,
        marque,
        sort,
        minPrice,
        maxPrice,
        statut
      }),
    keepPreviousData: true,
    refetchOnReconnect: true, 
    refetchInterval: 60000, 
    staleTime: 1000 * 60 * 2,
  } as any);

  const raw = query.data as unknown;
  let items: ProductListItem[] = [];
  let pagination: Paginated<ProductListItem> | undefined = undefined;

  if (Array.isArray(raw)) {
    items = raw as ProductListItem[];
  } else if (raw && typeof raw === "object" && "items" in (raw as any)) {
    const r = raw as Paginated<ProductListItem>;
    items = Array.isArray(r.items) ? r.items : [];
    pagination = r;
  }

  return { ...query, items, pagination };
}


