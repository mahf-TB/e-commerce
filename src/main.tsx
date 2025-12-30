import NotificationsSheet from "@/features/notifications/NotificationsSheet";
import useSystemStore from "@/store/use-system.store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "./components/ui/sonner";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";

const queryClient = new QueryClient();
const clientId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;

function App() {
  const { notifySheet, setNotifySheet } = useSystemStore();
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
