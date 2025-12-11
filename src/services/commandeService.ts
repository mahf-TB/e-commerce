import { apiAuth } from "@/lib/axios";

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
): Promise<CommandeResponse> {
  try {
    const res = await apiAuth.post("/commandes", payload);
    return res.data;
  } catch (error: any) {
    throw error;
  }
}
