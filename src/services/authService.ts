import api, { apiAuth, setAuthToken } from "../lib/axios";
import type {
  AuthData,
  GoogleCredentialResponse,
  LoginCredentials,
  RegisterPayload,
  UpdateProfilePayload,
  User,
} from "../types";
const headers = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};


// Envoie l'idToken au backend pour obtenir le token d'auth
export async function connectedGoogleToken(
  id_token: string
): Promise<AuthData> {
  const { data } = await api.post("/auth/google", { id_token });
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
  credentialResponse: GoogleCredentialResponse
): Promise<AuthData> {
  const idToken = credentialResponse?.credential;
  if (!idToken) throw new Error("Aucun credential reçu");
  try {
    const data = await connectedGoogleToken(idToken);
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


export async function profileUser(
  payload: UpdateProfilePayload
): Promise<User> {
  const res = await apiAuth.put("/auth/profile", payload);
  return res.data as User;
}


/**
 * Upload l'avatar d'un utilisateur
 * Requiert: utilisateur connecté (propriétaire) ou admin
 */
export async function uploadUserAvatar(
  file: File
): Promise<User> {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await apiAuth.post(`/auth/avatar`, formData, headers);
  return res.data as User;
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
