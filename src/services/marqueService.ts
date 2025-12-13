import api, { apiAuth } from "../lib/axios";
import type { Paginated } from "@/types";
import type { Marque } from "@/hooks/use-marques";
const headers = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};


export async function fetchMarques(): Promise<Paginated<Marque>> {
  const res = await api.get("/marques");
  return res.data 
}
export async function createNewMarque(credential: any) {
  try {
    const res = await apiAuth.post("/marques", credential, headers);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default {
  createNewMarque,
  fetchMarques
};