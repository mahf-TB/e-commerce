import type { Paginated, ProductListItem, Produit } from "@/types";
import api, { apiAuth } from "../lib/axios";
import type { ProductListParams } from "@/hooks/use-product";
const headers = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export type StatutCredential = {
  statut: "active" | "inactive" | "archived";
};

export async function createNewProduct(credential: any) {
  try {
    const res = await apiAuth.post("/produits", credential, headers);
    return res.data;
  } catch (error) {
    throw error;
  }
}
export async function changeStatutVariant(
  id: string | number,
  variantId: string | number,
  credential: StatutCredential
) {
  try {
    const res = await apiAuth.patch(
      `/produits/${id}/variants/${variantId}/statut`,
      credential
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function changeStatutProduct(
  id: string | number,
  credential: StatutCredential
) {
  try {
    const res = await apiAuth.patch(`/produits/${id}/statut`, credential);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getProductList({
  page = 1,
  limit = 20,
  q,
  categorie,
  marque,
  sort,
  minPrice,
  maxPrice,
  statut,
}: ProductListParams): Promise<Paginated<ProductListItem>> {
  try {
    const params = {
      page,
      limit,
      q,
      categorie,
      marque,
      sort,
      minPrice,
      maxPrice,
      statut,
    };
    const res = await api.get("/produits", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getProductById(id: string | number): Promise<Produit> {
  try {
    const res = await api.get(`/produits/${id}`);
    return res.data as Produit;
  } catch (error) {
    throw error;
  }
}

export default {
  createNewProduct,
  changeStatutProduct,
  getProductList,
  getProductById,
  changeStatutVariant,
};
