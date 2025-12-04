import api, { apiAuth, setAuthToken } from "../lib/axios";
import type {
  AuthData,
  GoogleCredentialResponse,
  LoginCredentials,
  RegisterPayload,
  User,
} from "../types";

// Envoie l'idToken au backend pour obtenir le token d'auth
export async function connectedGoogleToken(
  id_token: string,
  route?: string
): Promise<AuthData> {
  const { data } = await api.post(
    `/auth/google?route=${encodeURIComponent(route ?? "")}`,
    { id_token }
  );
  return data as AuthData;
}

export async function fetchMe(): Promise<User> {
  const res = await apiAuth.get("/auth/me");
  return res.data as User;
}

export async function checkEmail({ email }: { email: string }) {
  const res = await api.get(
    "/auth/check-email?email=" + encodeURIComponent(email)
  );
  return res.data;
}

export async function loginUser(
  credential: LoginCredentials
): Promise<AuthData> {
  const res = await api.post("/auth/login", credential);
  return res.data as AuthData;
}

export async function registerUser(
  payload: RegisterPayload
): Promise<AuthData> {
  const res = await api.post("/auth/register", payload);
  return res.data as AuthData;
}

export async function processGoogleCredential(
  credentialResponse: GoogleCredentialResponse,
  route?: string
): Promise<AuthData> {
  const idToken = credentialResponse?.credential;
  if (!idToken) throw new Error("Aucun credential reçu");
  try {
    const data = await connectedGoogleToken(idToken, route);
    if (data && data.token) {
      setAuthToken(data.token ?? null);
    }
    return data;
  } catch (error) {
    console.error("Erreur lors du traitement du credential Google :", error);
    throw error;
  }
}

export function logout() {
  setAuthToken(null);
}

export function getToken(): string | null {
  try {
    return typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;
  } catch {
    return null;
  }
}

// Version SYNC : pour activer/désactiver la query
export function hasToken(): boolean {
  const token = getToken();
  return Boolean(token);
}

export default {
  logout,
  getToken,
  fetchMe,
  processGoogleCredential,
  checkEmail,
  loginUser,
  registerUser,
};
