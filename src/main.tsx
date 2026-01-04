import NotificationsSheet from "@/features/notifications/NotificationsSheet";
import { connectSocket, disconnectSocket, getSocket } from "@/lib/socket";
import { showToast } from "@/lib/toast";
import useSystemStore from "@/store/use-system.store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "./components/ui/sonner";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";

const queryClient = new QueryClient();
const clientId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;

function App() {
  const { notifySheet, setNotifySheet } = useSystemStore();
  // Connecter le socket automatiquement selon le token en localStorage
  // et écouter les changements de token (storage + event personnalisé)
  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    if (token) {
      const sock = connectSocket({ token });
      // attach notification listener
      const onNotification = (payload: any) => {
        try {
          const title =
            payload?.titre || payload?.title || "Nouvelle notification";
          const message = payload?.message || payload?.msg || "";
          showToast("info", title, {
            description: message,
            duration: 4000,
          });
        } catch (e) {}
        try {
          queryClient.invalidateQueries({ queryKey: ["notifications"] });
        } catch (e) {}
      };
      try {
        sock.on("notification", onNotification);
      } catch (e) {}
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === "access_token") {
        if (e.newValue) {
          const s = connectSocket({ token: e.newValue });
          // reattach listener
          try {
            s.on("notification", (payload: any) => {
              try {
                showToast("info", payload?.titre || "Nouvelle notification", {
                  description: payload?.message || payload?.msg || "",
                  duration: 4000,
                });
              } catch {}
              try {
                queryClient.invalidateQueries({ queryKey: ["notifications"] });
              } catch {}
            });
          } catch (e) {}
        } else {
          // detach any listener then disconnect
          try {
            const s = getSocket();
            s?.off("notification");
          } catch (e) {}
          disconnectSocket();
        }
      }
    };

    const onAuthToken = (e: any) => {
      const t = e?.detail?.token ?? null;
      if (t) {
        const s = connectSocket({ token: t });
        try {
          s.on("notification", (payload: any) => {
            try {
              showToast("info", payload?.titre || "Nouvelle notification", {
                description: payload?.message || payload?.msg || "",
                duration: 4000,
              });
            } catch {}
            try {
              queryClient.invalidateQueries({ queryKey: ["notifications"] });
            } catch {}
          });
        } catch (e) {}
      } else {
        try {
          const s = getSocket();
          s?.off("notification");
        } catch (e) {}
        disconnectSocket();
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("auth:token", onAuthToken as EventListener);

    const onBeforeUnload = () => disconnectSocket();
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth:token", onAuthToken as EventListener);
      window.removeEventListener("beforeunload", onBeforeUnload);
      disconnectSocket();
    };
  }, []);
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={clientId}>
          <AppRoutes />
          <Toaster />
          <NotificationsSheet open={notifySheet} setOpen={setNotifySheet} />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
