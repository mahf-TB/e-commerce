import { connectSocket, getSocket } from "@/lib/socket";
import { useEffect } from "react";
import type { Socket } from "socket.io-client";

type Handlers = Record<string, (...args: any[]) => void>;

/**
 * Hook simple pour se connecter au websocket backend.
 * - `token` : token d'auth (optionnel) — il sera envoyé via `auth` lors de la connexion.
 * - `handlers` : objet { eventName: handler }
 * Exemple d'utilisation :
 * const token = localStorage.getItem('auth_token');
 * useSocket(token, { notifications: (payload) => console.log(payload) });
 */
export function useSocket(token?: string, handlers?: Handlers): Socket | null {
  useEffect(() => {
    const sock = connectSocket({ token });

    // register handlers
    if (handlers) {
      Object.entries(handlers).forEach(([event, handler]) => {
        sock.on(event, handler);
      });
    }

    return () => {
      // cleanup handlers
      if (handlers) {
        Object.entries(handlers).forEach(([event, handler]) => {
          sock.off(event, handler);
        });
      }
      // do not forcibly disconnect here unless you want to close socket on unmount
      // disconnectSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return getSocket();
}
