"use client";

import { ChatWindow } from "./ChatWindow";
import { useChatbot } from "./useChatbot";
import { useUI } from "@/context/UIContext";
import { MessageCircle, X } from "lucide-react";

export const ChatbotContainer = () => {
  const { activePanel, openChat, closeAll } = useUI();
  const { messages, isTyping, handleOptionClick, resetChat } = useChatbot();

  const isOpen = activePanel === "chat";

  const handleToggle = () => {
    if (isOpen) {
      closeAll();
    } else {
      openChat(); // cierra cart automáticamente
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 transition-all duration-300 transform origin-bottom-right scale-100 opacity-100">
          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            onOptionClick={handleOptionClick}
            onReset={resetChat}
          />
        </div>
      )}

      <button
        onClick={handleToggle}
        className="bg-green hover:bg-primary-dark text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
        aria-label="Abrir asistente"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};
