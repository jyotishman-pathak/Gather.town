"use client";

import { useEffect, useState } from "react";
import { getSocket } from "@/config/socket"; // Adjust this path as per your project structure

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    const socket = getSocket(); // Get the socket instance

    // Connect the socket
    socket.connect();

    if (socket.connected) {
      onConnect();
    }

    // Handler for when the socket connects
    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      // Listen for transport upgrade events
      socket.io.engine.on("upgrade", (newTransport) => {
        setTransport(newTransport.name);
      });
    }

    // Handler for when the socket disconnects
    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    // Set up the event listeners
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // Cleanup listeners on unmount
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
      <p>Transport: {transport}</p>
    </div>
  );
}
