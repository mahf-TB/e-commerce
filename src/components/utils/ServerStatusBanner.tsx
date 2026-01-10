import { AlertTriangle } from "lucide-react";

export default function ServerStatusBanner() {
  // Lire le flag global placé par l'intercepteur axios
  const isOffline = typeof window !== "undefined" && (window as any).__SERVER_OFFLINE__;

  if (!isOffline) return null;

  return (
    <div className="w-full z-9999 bg-yellow-50 border-t border-b border-yellow-200 text-yellow-800 py-2 text-center">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
        <AlertTriangle className="h-5 w-5" />
        <span>Serveur indisponible — certaines fonctionnalités peuvent être limitées.</span>
      </div>
    </div>
  );
}
