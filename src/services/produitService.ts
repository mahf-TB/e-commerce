import api, { apiAuth, setAuthToken } from "../lib/axios";
const headers = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
export async function createNewProduct(credential: any) {
  try {
    const res = await apiAuth.post("/produits", credential, headers);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default {
  createNewProduct,
};
