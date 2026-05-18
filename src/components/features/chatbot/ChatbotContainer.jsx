"use client";

import { useState } from "react";
import { ChatWindow } from "./ChatWindow";
import { useChatbot } from "./useChatbot";
import { useUI } from "@/context/UIContext";
import { MessageCircle, BotMessageSquare, X } from "lucide-react";

export const ChatbotContainer = () => {
  const { activePanel, openChat, closeAll } = useUI();
  const { messages, isTyping, handleOptionClick, resetChat } = useChatbot();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWindow, setShowWindow] = useState(false);

  const isOpen = activePanel === "chat";

  const handleToggle = () => {
    if (isOpen) {
      // Cerrar — efecto "aspiradora"
      setIsAnimating(true);
      setShowWindow(false);
      setTimeout(() => {
        closeAll();
        setIsAnimating(false);
      }, 350);
    } else {
      // Abrir — efecto "genio"
      openChat();
      setTimeout(() => setShowWindow(true), 50);
    }
  };

  // Sincronizar showWindow con isOpen
  // (por si se cierra desde otro lado, ej. openCart)
  if (!isOpen && showWindow) setShowWindow(false);

  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col items-end">
      {/* Ventana del chat */}
      {(isOpen || isAnimating) && (
        <div
          className="mb-3"
          style={{
            transformOrigin: "bottom right",
            transition:
              "transform 350ms cubic-bezier(0.32, 0.72, 0, 1), opacity 300ms ease",
            transform: showWindow
              ? "scale(1) translateY(0)"
              : "scale(0.05) translateY(80px)",
            opacity: showWindow ? 1 : 0,
          }}
        >
          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            onOptionClick={handleOptionClick}
            onReset={resetChat}
          />
        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={handleToggle}
        aria-label={isOpen ? "Cerrar asistente" : "Abrir asistente"}
        className="relative bg-primary hover:bg-primary-dark text-white p-2.5 rounded-full shadow-lg hover:shadow-xl active:scale-95 cursor-pointer ..."
        style={{
          transition:
            "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 400ms ease, background 400ms ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {/* Ping cuando está cerrado */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
        )}

        {/* Ícono — rota al abrir/cerrar */}
        <span
          style={{
            display: "flex",
            transition:
              "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease",
            transform: isOpen
              ? "rotate(90deg) scale(1)"
              : "rotate(0deg) scale(1)",
            opacity: 1,
          }}
        >
          {isOpen ? (
            <X size={26} strokeWidth={2.5} />
          ) : (
            // <MessageCircle size={20} strokeWidth={2} />
            <BotMessageSquare size={20} strokeWidth={2} />
          )}
        </span>
      </button>
    </div>
  );
};
