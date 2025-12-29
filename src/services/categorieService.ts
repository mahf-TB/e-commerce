import type { Category } from "@/hooks/use-categories";
import api, { apiAuth } from "../lib/axios";
import type { Paginated } from "@/types";
const headers = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};


export async function fetchCategories(): Promise<Paginated<Category>> {
  const res = await api.get("/categories");
  return res.data 
}
export async function createNewCategorie(credential: any) {
  try {
    const res = await apiAuth.post("/categories", credential);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default {
  createNewCategorie,
  fetchCategories
};