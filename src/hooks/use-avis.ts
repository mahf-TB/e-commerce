import { getAllAvis, type AvisListResponse, type AvisParams } from "@/services/avisService";
import { useQuery } from "@tanstack/react-query";

export function useAvisList(params: AvisParams = {}) {
  const {
    page = 1,
    limit = 20,
    statut,
    note,
    itemType
  } = params;

  console.log(itemType);
  
  const query = useQuery<AvisListResponse>({
    queryKey: [
      "avis",
      { page, limit, statut, note, itemType },
    ],
    queryFn: () =>
      getAllAvis({
        page,
        limit,
        statut: statut === "tous" ? undefined : statut,
        note: note ? Number(note) : undefined,
        itemType : itemType ? itemType : undefined,
      }),
    staleTime: 1000 * 60 * 2, // 2 minutes
    retry: 1,
  });

  return {
    ...query,
    avis: query.data?.items || [],
    totalItems: query.data?.total || 0,
    totalPages: Math.ceil((query.data?.total || 0) / limit),
    currentPage: query.data?.page || page,
  };
}
