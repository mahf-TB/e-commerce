import { showToast } from "@/lib/toast";
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


// Flag pour éviter la boucle de toast en cas d'erreurs réseau/CORS multiples
let hasShownNetworkError = false;
const handleApiError = (error: any) => {
  // Si aucune réponse du serveur (timeout, serveur down, réseau coupé, CORS, etc.)
  const isNetworkOrCors =
    error.code === "ECONNABORTED" ||
    error.message?.includes("Network Error") ||
    !error.response ||
    (error.message?.includes("CORS") || error.message?.includes("cross-origin"));

  if (isNetworkOrCors && !hasShownNetworkError) {
    hasShownNetworkError = true;
    showToast(
      "error",
      "Le serveur est injoignable ou la connexion à la base de données est perdue. Merci de réessayer plus tard.",
      { duration: 6000 }
    );
    // Définit un flag global pour que la bannière puisse lire l'état
    if (typeof window !== "undefined") {
      try {
        (window as any).__SERVER_OFFLINE__ = true;
      } catch (e) {
        // noop
      }
    }
    // Rediriger vers une page dédiée d'erreur serveur (une seule fois)
    if (typeof window !== "undefined") {
      setTimeout(() => {
        try {
          if (window.location.pathname !== "/erreur-serveur") {
            window.location.href = "/erreur-serveur";
          }
        } catch (e) {
          // noop
        }
      }, 800);
    }
    // Reset du flag après un délai pour permettre un nouvel affichage futur
    setTimeout(() => {
      hasShownNetworkError = false;
    }, 30000);
  }
  return Promise.reject(error);
};


api.interceptors.response.use(
  (response) => {
    // Si tout va bien, effacer le flag d'offline
    if (typeof window !== "undefined") {
      try {
        (window as any).__SERVER_OFFLINE__ = false;
      } catch (e) {}
    }
    return response;
  },
  handleApiError
);
apiAuth.interceptors.response.use(
  (response) => {
    if (typeof window !== "undefined") {
      try {
        (window as any).__SERVER_OFFLINE__ = false;
      } catch (e) {}
    }
    return response;
  },
  handleApiError
);
// helper pour mettre à jour le token si nécessaire (ex: après login/logout)
export function setAuthToken(newToken: string | null) {
  if (newToken) {
    apiAuth.defaults.headers.Authorization = `Bearer ${newToken}`;
    try {
      localStorage.setItem("access_token", newToken);
      try {
        window.dispatchEvent(new CustomEvent("auth:token", { detail: { token: newToken } }));
      } catch (e) {}
    } catch {
      console.warn("Impossible de stocker le token en localStorage");
    }
  } else {
    delete apiAuth.defaults.headers.Authorization;
    try {
      localStorage.removeItem("access_token");
      try {
        window.dispatchEvent(new CustomEvent("auth:token", { detail: { token: null } }));
      } catch (e) {}
    } catch {
      console.warn("Impossible de supprimer le token en localStorage");
    }
  }
}

export default api;
