import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../slices/authSlice';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  // const [eventHandlers, setEventHandlers] = useState({});
  const token = useSelector(selectToken);

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
      extraHeaders: {
        token: token.accessToken,
      },
    });
    setSocket(newSocket);

    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    // Register all event handlers
    // Object.keys(eventHandlers).forEach((event) => {
    //   newSocket.on(event, eventHandlers[event]);
    // });

    // Clean up
    return () => {
      // Object.keys(eventHandlers).forEach((event) => {
      //   newSocket.off(event);
      // });
      newSocket.off("connect_error");
      newSocket.disconnect();
    };
  }, [token]);



  return (
    <SocketContext.Provider value={{ socket}}>
      {children}
    </SocketContext.Provider>
  );
};
