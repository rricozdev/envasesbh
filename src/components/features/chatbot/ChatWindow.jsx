"use client";

import { useEffect, useRef } from "react";
import { X, RotateCcw, SendHorizontal } from "lucide-react"; // Iconos sugeridos

// Sub-componente para la burbuja de mensaje (mantenibilidad)
const MessageBubble = ({ msg }) => {
  const isBot = msg.sender === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-1`}>
      <div
        className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
          isBot
            ? "bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200"
            : "bg-primary text-white rounded-tr-none" // Asegúrate que bg-primary esté definido en Tailwind
        }`}
      >
        <p className="leading-relaxed">{msg.text}</p>

        {/* Call To Action (Link a productos, contacto, etc.) */}
        {msg.cta && (
          <a
            href={msg.cta.link}
            className="inline-flex items-center gap-1.5 mt-2.5 bg-white text-primary px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors shadow-sm"
          >
            {msg.cta.label}
            <SendHorizontal size={14} />
          </a>
        )}

        {/* Hora opcional */}
        <span
          className={`text-[10px] mt-1 block opacity-60 ${isBot ? "text-gray-500" : "text-primary-foreground"}`}
        >
          {msg.timestamp}
        </span>
      </div>
    </div>
  );
};

// Componente principal de la ventana
export const ChatWindow = ({
  messages,
  isTyping,
  onOptionClick,
  onReset,
  onClose,
}) => {
  const scrollRef = useRef(null);

  // Scroll automático al final cuando hay nuevos mensajes o el bot escribe
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div
      className="flex flex-col h-[410px] w-[330px] sm:w-[360px] bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200 origin-bottom-right"
      role="dialog"
      aria-label="Asistente virtual de Envases BH"
    >
      {/* HEADER: Z-index alto y fixed para que siempre se vea el título y botones */}
      <div className="bg-primary p-3 text-white flex justify-between items-center shrink-0 shadow-md">
        <div className="flex items-center gap-2.5">
          {/* Indicador de estado online */}
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400 border border-white"></span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm leading-tight">
              Asistente Virtual
            </span>
            <span className="text-[10px] opacity-80">Envases BH</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Botón Reiniciar */}
          <button
            onClick={onReset}
            className="p-1.5 rounded-full hover:bg-primary-dark/20 transition-colors"
            title="Reiniciar conversación"
            aria-label="Reiniciar chat"
          >
            <RotateCcw size={16} className="opacity-80" />
          </button>
          {/* Botón Cerrar (opcional, si lo integras en el container) */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-primary-dark/20 transition-colors"
              title="Cerrar chat"
              aria-label="Cerrar ventana de chat"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* ÁREA DE MENSAJES con Scroll y fondo ligero */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {messages.length === 0 && !isTyping && (
          <div className="text-center text-gray-400 text-xs mt-16 animate-pulse">
            Conectando con Envases BH...
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className="animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <MessageBubble msg={m} />

            {/* Opciones de respuesta del Bot (solo se muestran en el ÚLTIMO mensaje del bot) */}
            {m.sender === "bot" &&
              m.options &&
              messages[messages.length - 1].id === m.id && (
                <div className="flex flex-wrap gap-2 mt-3 ml-1">
                  {m.options.map((opt, i) => (
                    <button
                      key={`${m.id}-opt-${i}`}
                      onClick={() => onOptionClick(opt)}
                      className="text-[11px] font-medium bg-white border border-primary/30 text-primary px-3.5 py-2 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm active:scale-95 animate-in fade-in slide-in-from-bottom-1"
                      style={{ animationDelay: `${i * 80}ms` }} // Efecto cascada ligero
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
          </div>
        ))}

        {/* Efecto de carga "Typing dots" */}
        {isTyping && (
          <div className="flex gap-1.5 ml-2 p-3 bg-gray-100 w-16 rounded-full rounded-bl-none justify-center items-center shadow-sm border border-gray-200 animate-in fade-in duration-200">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
          </div>
        )}

        {/* Ancla para el scroll automático */}
        <div ref={scrollRef} className="h-2" />
      </div>

      {/* Footer minimalista */}
      <div className="p-2 text-center bg-white border-t border-gray-100 shrink-0">
        <p className="text-[10px] text-gray-400">
          © {new Date().getFullYear()} Envases BH - Soporte Automatizado
        </p>
      </div>
    </div>
  );
};
