import { apiAuth } from "@/lib/axios";
import type { CommandeClient, CommandeRaw, Paginated } from "@/types";

export interface CommandeItem {
  produit: string;
  variantId: string;
  quantite: number;
}

export interface CreateCommandePayload {
  client?: string;
  nomDestinataire: string;
  contactDestinataire?: string | null;
  adresseLivraison?: string | null;
  typeLivraison?: "standard" | "express" | "retrait_magasin";
  etatPaiement?: "en_attente" | "paye" | "echoue" | "rembourse";
  statutCommande?:
    | "en_attente"
    | "en_preparation"
    | "expediee"
    | "livree"
    | "annulee";
  frais?: number;
  items: CommandeItem[];
}

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

export type OrderClientParams = {
  page?: number;
  limit?: number;
  search?: string;
  statutCommande?: string;
};

export async function listMesCommande(
  { page, limit, search, statutCommande }: OrderClientParams = { page: 1, limit: 20 }
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
