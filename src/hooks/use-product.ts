import { useQuery } from "@tanstack/react-query";
import { getProductList, getProductById } from "@/services/produitService";
import type { ProductListItem, Produit } from "@/types";
import type { Paginated } from "@/types";

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
    sort = "newest",
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
    staleTime: 1000 * 60 * 2,
  } as any);

  const raw = query.data as unknown;
  let items: ProductListItem[] = [];
  let pagination: Paginated<ProductListItem> | undefined = undefined;

  if (raw && typeof raw === "object" && "items" in (raw as any)) {
    const r = raw as Paginated<ProductListItem>;
    items = Array.isArray(r.items) ? r.items : [];
    pagination = r;
  }

  return { ...query, items, pagination };
}


