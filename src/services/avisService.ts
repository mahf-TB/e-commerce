import type { CommandeClient, Produit } from "@/types";
import { apiAuth } from "../lib/axios";

const headers = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export type AvisCredential = {
    produit: string;
    note: number;
    commentaire?: string | null;
};

export type AvisClient = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  photo?: string;
  username?: string;
};

export type Avis = {
  id: string;
  item: Produit | null; // ID du produit
  itemType: string;
  client: AvisClient | null;
  note: number;
  commentaire?: string;
  statut: "en_attente" | "approuve" | "rejete";
  createdAt: string;
  updatedAt: string;
};

export type AvisListResponse = {
  items: Avis[];
  total: number;
  page: number;
  limit: number;
};

export type AvisParams = {
  page?: number;
  limit?: number;
  statut?: string;
  note?: number;
  itemType?: string;
};

export async function getAllAvis(params?: AvisParams): Promise<AvisListResponse> {
  try {
    const res = await apiAuth.get("/avis", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getAvisByProduit(produitId: string) {
  try {
    const res = await apiAuth.get(`/avis/produit/${produitId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateAvisStatut(avisId: string, statut: string) {
  try {
    const res = await apiAuth.patch(`/avis/${avisId}/statut`, { statut });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteAvis(avisId: string) {
  try {
    const res = await apiAuth.delete(`/avis/${avisId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function createNewAvis(credential: AvisCredential) {
  try {
    const res = await apiAuth.post("/avis", credential);
    return res.data;
  } catch (error) {
    throw error;
  }
}