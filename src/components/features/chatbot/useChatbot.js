"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { chatbotFlow } from "@/data/chatbotFlow";

const LOCAL_STORAGE_KEY = "bh_chat_history";
const BOT_TYPING_DELAY = 1000;

export const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // 🔒 Referencia para limpiar timeouts (nivel pro)
  const timeoutRef = useRef(null);

  // 🔥 Función central SIN dependencias peligrosas
  const processNode = useCallback((nodeId, currentMessages = []) => {
    const node = chatbotFlow[nodeId];

    if (!node) {
      console.error(`Chatbot Error: Nodo "${nodeId}" no encontrado.`);
      return;
    }

    setIsTyping(true);

    // Limpiar timeout anterior si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const newMessage = {
        id: `bot-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        sender: "bot",
        text: node.message,
        options: node.options || [],
        cta: node.cta || null,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const updatedMessages = [...currentMessages, newMessage];

      setMessages(updatedMessages);
      setIsTyping(false);

      // Persistencia
      try {
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(updatedMessages),
        );
      } catch (e) {
        console.warn("Error guardando chat:", e);
      }
    }, BOT_TYPING_DELAY);
  }, []);

  // 🚀 Inicialización controlada (sin loops)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        processNode("start", []);
      }
    } catch (e) {
      console.warn("Error cargando historial:", e);
      processNode("start", []);
    }
  }, [processNode]);

  // 👤 Usuario selecciona opción
  const handleOptionClick = (option) => {
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: option.label,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);

    processNode(option.next, updatedMessages);
  };

  // 🔄 Reset limpio
  const resetChat = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setMessages([]);
    setIsTyping(false);

    processNode("start", []);
  };

  // 🧹 Cleanup al desmontar (clave)
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    messages,
    isTyping,
    handleOptionClick,
    resetChat,
  };
};
