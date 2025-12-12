// types/product.ts
export type ProductListItem = {
  id: string;
  code:string;
  nom: string;
  marqueNom: string | null;
  categorieNom: string | null;
  description?: string | null;
  imagePrincipale: string | null;
  variantsCount: number;
  variantId: string | number;
  statut: "active" | "inactive" | "archived";
  stockTotal: number;
  minPrice: number;
  createdAt: string; // ou Date si tu la castes
  nombreAvis: number;
  noteMoyenne: number;
  popularite: number;
};


export type Produit = {
  id: string | number;
  nom: string;
  description: string;
  statut: "active" | "inactive" | "archived";
  garantie: string;
  marque?: {id: string; nom: string };
  categorie?: { id: string; nom: string };
  images: Image[];
  variants: VariantProduct[];
  nombreAvis: number;
  noteMoyenne: number;
  createdAt: string;
};


export type VariantProduct = {
  _id?: string | number;
  id?: string;
  variant: string;
  code: string;
  prixUnitaire: number;
  qte: number;
  seuil: number;
  statut: "active" | "inactive" | "archived";
  etatProduit: "neuf" | "reconditionne" | "usage";
};


export type Image = {
  _id:string;
  url: string;
  isPrincipale: boolean;
  alt: string;
};
