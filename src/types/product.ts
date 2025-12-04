// types/product.ts
export type ProductListItem = {
  id: string;
  nom: string;
  marqueNom: string | null;
  categorieNom: string | null;
  imagePrincipale: string | null;
  variantsCount: number;
  stockTotal: number;
  minPrice: number;
  createdAt: string; // ou Date si tu la castes
  nombreAvis: number;
  noteMoyenne: number;
};


export type Produit = {
  id: string;
  nom: string;
  description: string;
  garantie: string;
  marque?: { nom: string };
  categorie?: { nom: string };
  images: Image[];
  variants: VariantProduct[];
  nombreAvis: number;
  noteMoyenne: number;
  createdAt: string;
};


export type VariantProduct = {
  variant: string;
  code: string;
  prixUnitaire: number;
  qte: number;
  seuil: number;
  statut: "active" | "inactive" | "archived";
  etatProduit: "neuf" | "reconditionne" | "usage";
};


export type Image = {
  url: string;
  isPrincipale: boolean;
  alt: string;
};
