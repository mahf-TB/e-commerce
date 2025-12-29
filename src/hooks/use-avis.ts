import { getAllAvis, type AvisListResponse, type AvisParams } from "@/services/avisService";
import { useQuery } from "@tanstack/react-query";

export function useAvisList(params: AvisParams = {}) {
  const {
    page = 1,
    limit = 20,
    statut,
    note,
    produitId,
  } = params;

  const query = useQuery<AvisListResponse>({
    queryKey: [
      "avis",
      { page, limit, statut, note, produitId },
    ],
    queryFn: () =>
      getAllAvis({
        page,
        limit,
        statut: statut === "tous" ? undefined : statut,
        note: note ? Number(note) : undefined,
        produitId,
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
