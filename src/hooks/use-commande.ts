import { showToast } from "@/lib/toast";
import {
  annulerCommande,
  changeCommandeStatut,
  downloadFacture,
  getCommandeById,
  listAllCommandes,
  statsAllCommandes,
} from "@/services/commandeService";
import type { Paginated } from "@/types";
import type { CommandeRaw, StatutCommande } from "@/types/order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
  const {
    page = 1,
    limit = 20,
    search,
    statutCommande,
    traiter,
    etatPaiement,
    client,
    dateDebut,
    dateFin,
  } = params;

  const query = useQuery({
    queryKey: [
      "commandes",
      {
        page,
        limit,
        search,
        statutCommande,
        traiter,
        etatPaiement,
        client,
        dateDebut,
        dateFin,
      },
    ],
    queryFn: () =>
      listAllCommandes({
        page,
        limit,
        search,
        statutCommande,
        traiter,
        etatPaiement,
        client,
        dateDebut,
        dateFin,
      }),
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
export function useCommandeStats(
  params: { dateDebut?: string; dateFin?: string } = {}
) {
  const { dateDebut, dateFin } = params;

  const query = useQuery({
    queryKey: ["commandes", "stats", { dateDebut, dateFin }],
    queryFn: async () => {
      return statsAllCommandes({ dateDebut, dateFin });
    },
    staleTime: 1000 * 60 * 2,
  });

  return query;
}

/**
 * Hook pour télécharger la facture d'une commande en PDF
 * Utilise React Query pour gérer l'état de téléchargement
 */
export function useDownloadFacture() {
  return useMutation({
    mutationFn: async ({
      commandeId,
      reference,
    }: {
      commandeId: string;
      reference: string;
    }) => {
      const blob = await downloadFacture(commandeId);

      // Créer un lien de téléchargement temporaire
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `facture_${reference}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Nettoyage
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      return { success: true };
    },
    onSuccess: () => {
      showToast("success", "Facture téléchargée avec succès");
    },
    onError: (error: any) => {
      console.error("Erreur téléchargement facture:", error);
      showToast(
        "error",
        error?.response?.data?.message || "Impossible de télécharger la facture"
      );
    },
  });
}

/**
 * Hook pour annuler une commande
 */
export function useAnnulerCommande() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      commandeId,
      payload,
    }: {
      commandeId: string;
      payload?: any;
    }) => annulerCommande(commandeId, payload),
    onMutate: () => {
      const toastId = showToast("loading", "Annulation de la commande...");
      return { toastId };
    },
    onSuccess: (data, variables, context) => {
      toast.dismiss(context?.toastId);
      showToast("success", "Commande annulée avec succès");
      // Invalide la liste des commandes pour rafraîchir
      queryClient.invalidateQueries({
        queryKey: ["commandes", variables.commandeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["commandes"],
      });
    },
    onError: (error: any, variables, context) => {
      toast.dismiss(context?.toastId);
      showToast(
        "error",
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Erreur lors de l'annulation de la commande"
      );
    },
  });
}

/**
 * Hook pour changer le statut d'une commande
 */
export function useChangeStatutCommande() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      commandeId,
      statutCommande,
    }: {
      commandeId: string;
      statutCommande: StatutCommande;
    }) => changeCommandeStatut(commandeId, { statutCommande }),
    onSuccess: (data, variables) => {
      showToast("success", "Statut de la commande mis à jour avec succès");
      queryClient.invalidateQueries({
        queryKey: ["commandes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["commandes", variables.commandeId],
      });
    },
    onError: (error: any) => {
      showToast(
        "error",
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Erreur lors de la mise à jour du statut"
      );
    },
  });
}
