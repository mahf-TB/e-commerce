import type { User } from "./user";

export type StatutCommande = 'en_attente' | 'completed' | 'en_preparation' | 'expediee' | 'livree' | 'annulee';
export type EtatPaiement = 'en_attente' | 'paye' | 'remboursee' | 'non_paye' | 'echoue';
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
  modePaiement: string;
  items: LigneCommandeItem[];
  nomDestinataire?: string;
  adresseLivraison?: string;
  dateLivraison?: string;
  nombreProduits?: number;
  miseAJour?: string;
};

export type CommandeRaw = {
  id: string;
  reference: string;
  statut: StatutCommande;
  etatPaiement: EtatPaiement;
  typeLivraison: TypeLivraison;
  modePaiement: string;
  total: number;
  frais: number;
  nomDestinataire?: string;
  adresseLivraison?: string;
  dateLivraison?: string;
  nombreProduits?: number;
  items: LigneCommandeItem[];
  client: User;
  traiterPar: User | null;
  creeLe: string;
  miseAJour?: string;
};