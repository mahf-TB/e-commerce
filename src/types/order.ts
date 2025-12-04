

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


export type StatutCommande = 'en_attente' | 'en_preparation' | 'expediee' | 'livree' | 'annulee';