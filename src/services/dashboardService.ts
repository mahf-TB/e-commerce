import { apiAuth } from "@/lib/axios";

export interface DashboardParams {
  dateDebut?: string;
  dateFin?: string;
}

export interface DashboardStatsResponse {
  general?: {
    totalCommandes: number;
    commandesParStatut: Record<string, { count: number }>;
    commandesParPaiement: Record<string, { count: number }>;
  };
  revenus?: {
    total: number;
    panierMoyen: number;
    totalFrais: number;
  };
  evolutionVentes?: Array<{
    date: string;
    nombreCommandes: number;
    chiffreAffaires: number;
  }>;
  commandesRecentes?: any[];
  topProduits?: any[];
  clientStats?: {
    total: number;
    nouveaux: number;
    topClients: any[];
  };
}

export async function getDashboardStats(
  params?: DashboardParams
): Promise<DashboardStatsResponse> {
  try {
    const res = await apiAuth.get("/dashboard/stats", { params });
    return res.data;
  } catch (error: any) {
    throw error;
  }
}

export async function getDashboardVentes(
  params?: DashboardParams
): Promise<any> {
  try {
    const res = await apiAuth.get("/dashboard/ventes", { params });
    return res.data;
  } catch (error: any) {
    throw error;
  }
}

export async function getDashboardCommandes(
  params?: DashboardParams
): Promise<any> {
  try {
    const res = await apiAuth.get("/dashboard/commandes", { params });
    return res.data;
  } catch (error: any) {
    throw error;
  }
}

export async function getDashboardClients(
  params?: DashboardParams
): Promise<any> {
  try {
    const res = await apiAuth.get("/dashboard/clients", { params });
    return res.data;
  } catch (error: any) {
    throw error;
  }
}

export async function getDashboardProduits(
  params?: DashboardParams
): Promise<any> {
  try {
    const res = await apiAuth.get("/dashboard/produits", { params });
    return res.data;
  } catch (error: any) {
    throw error;
  }
}
