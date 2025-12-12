import { apiAuth } from "@/lib/axios";

const headers = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

/**
 * Ajouter des images à un produit
 * POST /produits/:id/images
 */
export async function addProductImages(
  productId: string | number,
  formData: FormData,
) {
  try {
    const res = await apiAuth.post(
      `/produits/${productId}/images`,
      formData,
      { ...headers }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Supprimer une image d'un produit
 * DELETE /produits/:id/images/:imageId
 */
export async function removeProductImage(
  productId: string | number,
  imageId: string | number,
) {
  try {
    const res = await apiAuth.delete(
      `/produits/${productId}/images/${imageId}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Définir une image comme image principale
 * PATCH /produits/:id/images/:imageId/principale
 */
export async function setMainProductImage(
  productId: string | number,
  imageId: string | number,
) {
  try {
    const res = await apiAuth.patch(
      `/produits/${productId}/images/${imageId}/principale`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default {
  addProductImages,
  removeProductImage,
  setMainProductImage,
};
