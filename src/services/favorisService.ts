import { apiAuth } from "@/lib/axios";
import type { ProductListItem, Produit } from "@/types";

export type ItemType = "Produit" | "Commande" | null;

export interface FavorisItem {
  id: string;
  items: [
    {
      id: string;
      itemType: ItemType;
      itemId: Produit;
      addedAt: string;
    }
  ];
  user: string;
  createdAt: string;
}

export interface AddToFavorisPayload {
  itemType: ItemType;
  itemId: string;
}

/**
 * Obtenir tous les favoris de l'utilisateur connecté
 * GET /api/favoris
 */
export async function getFavoris(): Promise<FavorisItem> {
  const { data } = await apiAuth.get("/favoris");
  return data;
}

/**
 * Ajouter un item aux favoris
 * POST /api/favoris
 */
export async function addToFavoris(
  payload: AddToFavorisPayload
): Promise<FavorisItem> {
  const { data } = await apiAuth.post("/favoris", payload);
  return data;
}

/**
 * Vérifier si un item est en favoris
 * GET /api/favoris/check/:itemType/:itemId
 */
export async function checkIsFavoris(
  itemType: ItemType,
  itemId: string
): Promise<{ isFavoris: boolean }> {
  const { data } = await apiAuth.get(`/favoris/check/${itemType}/${itemId}`);
  return data;
}

/**
 * Vider tous les favoris
 * DELETE /api/favoris
 */
export async function clearAllFavoris(): Promise<{ message: string }> {
  const { data } = await apiAuth.delete("/favoris");
  return data;
}

/**
 * Retirer un item des favoris
 * DELETE /api/favoris/:itemType/:itemId
 */
export async function removeFromFavoris(
  itemType: ItemType,
  itemId: string
): Promise<{ message: string }> {
  const { data } = await apiAuth.delete(`/favoris/${itemType}/${itemId}`);
  return data;
}
