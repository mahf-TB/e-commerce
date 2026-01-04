import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

export interface ConnectOptions {
  token?: string;
  path?: string;
  transports?: Array<string>;
}

export function connectSocket(options: ConnectOptions = {}): Socket {
  if (socket && socket.connected) return socket;

  const base = (import.meta as any).env?.VITE_SOCKET_URL || window.location.origin;
  const url = base.replace(/\/$/, "");

  socket = io(url, {
    path: options.path ?? "/socket.io",
    transports: options.transports ?? ["websocket"],
    auth: options.token ? { token: options.token } : undefined,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  // attach simple debug handlers (no console spam in prod)
  if (import.meta.env.DEV) {
    if (options.token) {
      try {
        const masked = String(options.token).slice(0, 6) + "...";
        console.debug(`[socket] connecting to ${url} path=${options.path ?? "/socket.io"} token=${masked}`);
      } catch (e) {
        console.debug("[socket] connecting (token present)");
      }
    } else {
      console.debug(`[socket] connecting to ${url} path=${options.path} (no token)`);
    }
  }

  socket.on("connect", () => {
    if (import.meta.env.DEV) console.info(`[socket] connected (id=${socket?.id})`)
  });

  socket.on("connect_error", (err) => {
    if (import.meta.env.DEV) console.warn("[socket] connect_error:", err);
  });

  socket.on("disconnect", (reason) => {
    if (import.meta.env.DEV) console.info(`[socket] disconnected: ${reason}`);
  });

  return socket;
}

export function getSocket(): Socket | null {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    try {
      socket.disconnect();
    } catch (e) {}
    socket = null;
  }
}
