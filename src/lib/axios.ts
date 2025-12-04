import axios from "axios";

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:8080/api";

const defaultConfig = {
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
};

// instance publique (sans token)
export const api = axios.create(defaultConfig);

// instance avec token "directement mis dedans" (lu au démarrage)
const storedToken =
  typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
export const apiAuth = axios.create({
  ...defaultConfig,
  headers: {
    ...defaultConfig.headers,
    Authorization: storedToken ? `Bearer ${storedToken}` : "",
  },
});

// helper pour mettre à jour le token si nécessaire (ex: après login/logout)
export function setAuthToken(newToken: string | null) {
  if (newToken) {
    apiAuth.defaults.headers.Authorization = `Bearer ${newToken}`;
    try {
      localStorage.setItem("access_token", newToken);
    } catch {
      console.warn("Impossible de stocker le token en localStorage");
    }
  } else {
    delete apiAuth.defaults.headers.Authorization;
    try {
      localStorage.removeItem("access_token");
    } catch {
      console.warn("Impossible de supprimer le token en localStorage");
    }
  }
}

export default api;
