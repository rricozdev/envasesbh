// "use client";

// import { useState } from "react";
// import { ChatWindow } from "./ChatWindow";
// import { useChatbot } from "./useChatbot";
// import { MessageCircle, X } from "lucide-react"; // O cualquier SVG de tu preferencia

// export const ChatbotContainer = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { messages, isTyping, handleOptionClick, resetChat } = useChatbot();

//   return (
//     <div className="fixed bottom-6 right-6 z-100 flex flex-col items-end">
//       {/* Ventana de Chat con Animación */}
//       {isOpen && (
//         <div className="mb-4 transition-all duration-300 transform origin-bottom-right scale-100 opacity-100">
//           <ChatWindow
//             messages={messages}
//             isTyping={isTyping}
//             onOptionClick={handleOptionClick}
//             onReset={resetChat}
//           />
//         </div>
//       )}

//       {/* Botón Disparador */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
//         aria-label="Abrir asistente"
//       >
//         {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
//       </button>
//     </div>
//   );
// };

// ChatbotContainer.jsx
// Cambia z-100 (inválido) por z-[9997]
// Y asegura que el wrapper no tape elementos vecinos

"use client";

import { useState } from "react";
import { ChatWindow } from "./ChatWindow";
import { useChatbot } from "./useChatbot";
import { MessageCircle, X } from "lucide-react"; // O cualquier SVG de tu preferencia

export const ChatbotContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isTyping, handleOptionClick, resetChat } = useChatbot();

  return (
    <div className="fixed bottom-6 right-6 z-9997 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 transition-all duration-300 transform origin-bottom-right scale-100 opacity-100">
          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            onOptionClick={handleOptionClick}
            onReset={resetChat}
          />
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
        aria-label="Abrir asistente"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};
