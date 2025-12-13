

export type Commande = {
  id: string
  numeroCommande: string
  nombreProduits: number
  nomClient: string
  dateCreation: string
  statut: StatutCommande
  dateLivraison: string
  adresseLivraison: string
  total: number
  lignes: LigneCommande[]
}

export type LigneCommande = {
  id: string;
  nomProduit: string;
  image: string;
  quantite: number;
  prixUnitaire: number;
  description?: string;
};

export type CommandeDetail = {
  id: string;
  numeroCommande: string;
  nombreProduits: number;
  nomClient: string;
  dateCreation: string;
  statut: StatutCommande;
  dateLivraison: string;
  adresseLivraison: string;
  total: number;
  lignes: LigneCommande[];
};

export type StatutCommande = 'en_attente' | 'completed' | 'en_preparation' | 'expediee' | 'livree' | 'annulee';
export type EtatPaiement = 'en_attente' | 'paye' | 'remboursee' | 'partiellement_paye';
export type TypeLivraison = 'standard' | 'express' | 'retrait_magasin';

export type LigneCommandeItem = {
  id: string;
  produitId: string;
  variantId: string;
  codeVariant: string;
  nomProduit: string;
  image: string;
  quantite: number;
  prixUnitaire: number;
  totalLigne: number;
};

export type CommandeClient = {
  id: string;
  reference: string;
  statut: StatutCommande;
  etatPaiement: EtatPaiement;
  typeLivraison: TypeLivraison;
  total: number;
  frais: number;
  creeLe: string;
  items: LigneCommandeItem[];
  nomDestinataire?: string;
  adresseLivraison?: string;
  dateLivraison?: string;
  nombreProduits?: number;
  dateCreation?: string;
};

export type CommandeRaw = {
  id?: string;
  _id?: string;
  reference: string;
  statutCommande: StatutCommande;
  etatPaiement: EtatPaiement;
  typeLivraison: TypeLivraison;
  total: number;
  frais: number;
  createdAt: string;
  items: Array<{
    id?: string;
    _id?: string;
    produit: string;
    variantId: string;
    codeVariant: string;
    nomProduit: string;
    quantite: number;
    prixUnitaire: number;
    totalLigne: number;
  }>;
};