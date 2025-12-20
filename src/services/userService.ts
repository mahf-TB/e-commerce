import { apiAuth } from "@/lib/axios";
import type { Paginated, User } from "@/types";
const headers = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

// Types pour les paramètres de requête
export interface UserListParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  statut?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateUserPayload {
  email: string;
  password: string;
  username: string;
  nom?: string;
  prenom?: string;
  adresse?: string;
  telephone?: string;
  role?: "admin" | "manager" | "support" | "customer" | "guest";
  photo?: string;
}

export interface UpdateUserPayload {
  email?: string;
  username?: string;
  nom?: string;
  prenom?: string;
  adresse?: string;
  telephone?: string;
  role?: "admin" | "manager" | "support" | "customer" | "guest";
  photo?: string;
}

/**
 * Récupère la liste paginée des utilisateurs
 * Requiert: admin, manager, support
 */
export async function fetchUsers(
  params: UserListParams = {}
): Promise<Paginated<User>> {
  const res = await apiAuth.get(`/users`, { params });
  return res.data as Paginated<User>;
}

/**
 * Crée un nouvel utilisateur
 * Requiert: admin
 */
export async function createUser(payload: CreateUserPayload): Promise<User> {
  const res = await apiAuth.post("/users", {
    ...payload,
    motDePasse: payload.password,
  });
  return res.data as User;
}

/**
 * Récupère les détails d'un utilisateur par son ID
 * Requiert: admin, manager, support
 */
export async function fetchUserById(id: string | number): Promise<User> {
  const res = await apiAuth.get(`/users/${id}`);
  return res.data as User;
}

/**
 * Met à jour un utilisateur existant
 * Requiert: admin, manager
 */
export async function updateUser(
  id: string | number,
  payload: UpdateUserPayload
): Promise<User> {
  const res = await apiAuth.put(`/users/${id}`, payload);
  return res.data as User;
}

/**
 * Supprime un utilisateur
 * Requiert: admin
 */
export async function deleteUser(id: string | number): Promise<void> {
  await apiAuth.delete(`/users/${id}`);
}


