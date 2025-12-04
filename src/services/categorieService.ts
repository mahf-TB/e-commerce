import type { Category } from "@/hooks/use-categories";
import api, { apiAuth, setAuthToken } from "../lib/axios";
import type { Paginated } from "@/types";
const headers = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};


export async function fetchCategories(): Promise<Paginated<Category>> {
  const res = await api.get("/categories");
  console.log(res.data);
  return res.data 
}
export async function createNewProduct(credential: any) {
  try {
    const res = await apiAuth.post("/categories", credential, headers);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default {
  createNewProduct,
  fetchCategories
};