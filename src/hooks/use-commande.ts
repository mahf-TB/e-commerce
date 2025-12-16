import { getCommandeById, listAllCommandes } from "@/services/commandeService";
import type { Paginated } from "@/types";
import type { CommandeRaw } from "@/types/order";
import { useQuery } from "@tanstack/react-query";

export type CommandeListParams = {
  page?: number;
  limit?: number;
  search?: string;
  statutCommande?: string;
  traiter?: string;
  etatPaiement?: string;
  client?: string;
  dateDebut?: string;
  dateFin?: string;
};

export function useCommandeList(params: CommandeListParams = {}) {
  const { page = 1, limit = 20, search, statutCommande , traiter, etatPaiement, client , dateDebut, dateFin } = params;

  const query = useQuery({
    queryKey: ["commandes", { page, limit, search, statutCommande , traiter, etatPaiement, client, dateDebut, dateFin }],
    queryFn: () =>
      listAllCommandes({ page, limit, search, statutCommande , traiter, etatPaiement, client, dateDebut, dateFin}),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  } as any);

  const raw = query.data as unknown;
  let items: CommandeRaw[] = [];
  let pagination: Paginated<CommandeRaw> | undefined = undefined;

  if (raw && typeof raw === "object" && "items" in (raw as any)) {
    const r = raw as Paginated<CommandeRaw>;
    items = Array.isArray(r.items) ? r.items : [];
    pagination = r;
  }

  return { ...query, items, pagination };
}

export function useCommande(id?: string) {
  const enabled = !!id;
  const query = useQuery<CommandeRaw>({
    queryKey: ["commandes", id],
    queryFn: () => getCommandeById(id as string),
    enabled,
    retry: false,
    staleTime: 1000 * 60 * 2,
  });
  return query;
}

/**
 * Hook pour récupérer les statistiques des commandes
 */
export function useCommandeStats(params: { dateDebut?: string; dateFin?: string } = {}) {
  const { dateDebut, dateFin } = params;

  const query = useQuery({
    queryKey: ["commandes", "stats", { dateDebut, dateFin }],
    queryFn: async () => {
      const { statsAllCommandes } = await import("@/services/commandeService");
      return statsAllCommandes({ dateDebut, dateFin });
    },
    staleTime: 1000 * 60 * 2,
  });

  return query;
}


