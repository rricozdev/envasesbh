"use client";

import { useState, useEffect, useCallback } from "react";
import { chatbotFlow } from "@/data/chatbotFlow"; // Asegúrate de que este archivo exista

const LOCAL_STORAGE_KEY = "bh_chat_history";
const BOT_TYPING_DELAY = 1000; // Simulación de escritura en ms

export const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Función núcleo para procesar un nodo y añadir el mensaje del bot
  const processNode = useCallback(
    (nodeId, currentMessages = []) => {
      const node = chatbotFlow[nodeId];
      if (!node) {
        console.error(`Chatbot Error: Nodo "${nodeId}" no encontrado.`);
        return;
      }

      setIsTyping(true);

      // Simular retraso de escritura para naturalidad
      setTimeout(() => {
        const newMessage = {
          id: `bot-${Date.now()}-${Math.random().toString(16).slice(2)}`, // ID único robusto
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

        // Guardar en persistencia local
        try {
          localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(updatedMessages),
          );
        } catch (e) {
          console.warn(
            "No se pudo guardar el historial del chat en localStorage:",
            e,
          );
        }
      }, BOT_TYPING_DELAY);
    },
    [messages],
  );

  // Cargar historial al inicio o iniciar si está vacío
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        processNode("start"); // Inicia flujo por defecto
      }
    } catch (e) {
      console.warn("Error cargando historial de chat:", e);
      processNode("start"); // Failsafe: inicia de cero
    }
  }, [processNode]);

  // Manejar la selección de una opción por el usuario
  const handleOptionClick = (option) => {
    // 1. Añadir el mensaje del usuario inmediatamente
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: option.label,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const messagesWithUser = [...messages, userMsg];
    setMessages(messagesWithUser);

    // 2. Procesar el siguiente nodo del bot basándose en la nueva lista
    processNode(option.next, messagesWithUser);
  };

  // REINICIO TOTAL Y LIMPIO
  const resetChat = () => {
    // 1. Limpiar LocalStorage inmediatamente
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    // 2. Limpiar el estado de mensajes en React (pantalla en blanco)
    setMessages([]);

    // 3. Forzar el inicio desde cero pasando un array vacío explícito
    // Esto previene que processNode lea el estado "viejo" antes de limpiarse
    processNode("start", []);
  };

  return { messages, isTyping, handleOptionClick, resetChat };
};
