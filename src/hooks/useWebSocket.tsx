'use client';

import {useCallback, useEffect, useRef} from 'react';
type MessageHandler = (message: string) => void;

export function useWebSocket(url: string, onMessage: MessageHandler) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => console.log(`[WebSocket] Connected: ${url}`);
    socket.onmessage = (event) => onMessage(event.data);
    socket.onerror = (event) => console.error('[WebSocket] Error:', event);
    socket.onclose = () => console.log('[WebSocket] Disconnected');

    return () => {
      socket.close();
    };
  }, [url, onMessage]);

  const sendMessage = useCallback((msg: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    } else {
      console.warn('WebSocket is not open. Cannot send message:', msg);
    }
  }, []);

  return { sendMessage };


}
