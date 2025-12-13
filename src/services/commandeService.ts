import type { CommandeListParams } from "@/hooks/use-commande";
import { apiAuth } from "@/lib/axios";
import type { CommandeClient, Paginated } from "@/types";

export interface CommandeItem {
  produit: string;
  variantId: string;
  quantite: number;
}

export interface ChangePaiementPayload {
  etatPaiement: "en_attente" | "paye" | "echoue" | "rembourse";
}

export interface ChangeStatutPayload {
  statutCommande:
    | "en_attente"
    | "en_preparation"
    | "expediee"
    | "livree"
    | "completed"
    | "annulee";
}

export interface CreateCommandePayload {
  client?: string;
  nomDestinataire: string;
  contactDestinataire?: string | null;
  adresseLivraison?: string | null;
  typeLivraison?: "standard" | "express" | "retrait_magasin";
  etatPaiement?: ChangePaiementPayload["etatPaiement"];
  statutCommande?: ChangeStatutPayload["statutCommande"];
  frais?: number;
  items: CommandeItem[];
}
export type OrderClientParams = {
  page?: number;
  limit?: number;
  search?: string;
  statutCommande?: string;
};

export interface CommandeResponse {
  id: string;
  reference: string;
  [key: string]: any;
}

export async function createCommande(
  payload: CreateCommandePayload
): Promise<Paginated<CommandeResponse>> {
  try {
    const res = await apiAuth.post("/commandes", payload);
    return res.data;
  } catch (error: any) {
    throw error;
  }
}

export async function listMesCommande(
  { page, limit, search, statutCommande }: OrderClientParams = {
    page: 1,
    limit: 20,
  }
): Promise<Paginated<CommandeClient>> {
  try {
    const params = {
      page,
      limit,
      search,
      statutCommande,
    };
    const res = await apiAuth.get("/commandes/mes", { params });
    return res.data;
  } catch (error: any) {
    throw error;
  }
}

export async function listAllCommandes(
  {
    page,
    limit,
    search,
    statutCommande,
    traiter,
    etatPaiement,
    client,
  }: CommandeListParams = {
    page: 1,
    limit: 20,
  }
): Promise<Paginated<CommandeClient>> {
  try {
    const params = {
      page,
      limit,
      search,
      statutCommande,
      traiter,
      etatPaiement,
      client,
    };
    const res = await apiAuth.get("/commandes", { params });
    return res.data;
  } catch (error: any) {
    throw error;
  }
}

export async function getCommandeById(
  commandeId: string
): Promise<CommandeClient> {
  try {
    const res = await apiAuth.get(`/commandes/${commandeId}`);
    return res.data;
  } catch (error: any) {
    throw error;
  }
}

export async function changeCommandeStatut(
  commandeId: string,
  payload: ChangeStatutPayload
): Promise<CommandeClient> {
  try {
    const res = await apiAuth.patch(`/commandes/${commandeId}/statut`, payload);
    return res.data;
  } catch (error: any) {
    throw error;
  }
}

export async function changeCommandePaiement(
  commandeId: string,
  payload: ChangePaiementPayload
): Promise<CommandeClient> {
  try {
    const res = await apiAuth.patch(
      `/commandes/${commandeId}/paiement`,
      payload
    );
    return res.data;
  } catch (error: any) {
    throw error;
  }
}
