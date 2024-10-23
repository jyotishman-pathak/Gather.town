// config/socket.ts (or js)
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000", {
      autoConnect: false, // Manual connection control
    });
  }
  return socket;
};
