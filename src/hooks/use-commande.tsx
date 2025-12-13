import { useQuery } from "@tanstack/react-query";
import { listAllCommandes, getCommandeById } from "@/services/commandeService";
import type { Paginated } from "@/types";
import type { CommandeClient } from "@/types/order";

export type CommandeListParams = {
  page?: number;
  limit?: number;
  search?: string;
  statutCommande?: string;
  traiter?: string;
  etatPaiement?: string;
  client?: string;
};

export function useCommandeList(params: CommandeListParams = {}) {
  const { page = 1, limit = 20, search, statutCommande , traiter, etatPaiement, client} = params;

  const query = useQuery({
    queryKey: ["commandes", { page, limit, search, statutCommande , traiter, etatPaiement, client }],
    queryFn: () =>
      listAllCommandes({ page, limit, search, statutCommande , traiter, etatPaiement, client}),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  } as any);

  const raw = query.data as unknown;
  let items: CommandeClient[] = [];
  let pagination: Paginated<CommandeClient> | undefined = undefined;

  if (raw && typeof raw === "object" && "items" in (raw as any)) {
    const r = raw as Paginated<CommandeClient>;
    items = Array.isArray(r.items) ? r.items : [];
    pagination = r;
  }

  return { ...query, items, pagination };
}

export function useCommande(id?: string) {
  const enabled = !!id;
  const query = useQuery<CommandeClient>({
    queryKey: ["commandes", id],
    queryFn: () => getCommandeById(id as string),
    enabled,
    retry: false,
    staleTime: 1000 * 60 * 2,
  });
  return query;
}




export default useCommandeList;
