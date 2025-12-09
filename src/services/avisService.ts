import api, { apiAuth } from "../lib/axios";

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


export async function createNewAvis(credential: AvisCredential) {
  try {
    const res = await apiAuth.post("/avis", credential);
    return res.data;
  } catch (error) {
    throw error;
  }
}