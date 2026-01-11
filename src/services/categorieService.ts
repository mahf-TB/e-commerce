import type { Category } from "@/hooks/use-categories";
import api, { apiAuth } from "../lib/axios";
import type { Paginated } from "@/types";

export type CategoryParams = {
  page?: number;
  limit?: number;
  q?: string;
  parent?: string;
  statut?: string;
};

export async function fetchCategories(
  params: CategoryParams
): Promise<Paginated<Category>> {
  const res = await api.get("/categories", { params });
  return res.data;
}
export async function createNewCategorie(credential: any) {
  try {
    const res = await apiAuth.post("/categories", credential);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const launchProductsJob = async (categoryId: string) => {
  const res = await api.post(`/categories/${categoryId}/produits/async`);
  return res.data; // { jobId }
};

export const fetchProductsJobStatus = async ({
  categoryId,
  jobId,
}: {
  categoryId: string;
  jobId: string;
}) => {
  const res = await api.get(`/categories/${categoryId}/produits/job/${jobId}`);
  return res.data; // { status, data?, warning? }
};

export default {
  createNewCategorie,
  fetchCategories,
};
