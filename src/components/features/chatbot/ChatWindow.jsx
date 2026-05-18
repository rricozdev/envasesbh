"use client";

import { useEffect, useRef } from "react";
import { X, RotateCcw, ArrowUpRight } from "lucide-react";
import { PRODUCTOS } from "@/data/productos";

// ─── Filtro de productos ───────────────────────────────────────────────────────
const getProductos = (filter) => {
  if (!filter) return [];
  return PRODUCTOS.filter((p) => {
    const porCategoria = filter.categoria
      ? p.categoria === filter.categoria
      : true;
    const porCapacidad = filter.capacidadMax
      ? p.specs.capacidad && p.specs.capacidad <= filter.capacidadMax
      : true;
    return porCategoria && porCapacidad;
  }).slice(0, 3);
};

// ─── Chip de producto ──────────────────────────────────────────────────────────
const ProductChip = ({ product }) => (
  <a
    href={`/productos/${product.slug}`}
    className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-gray-100 bg-white hover:border-primary/30 hover:bg-primary/[0.03] transition-all group"
  >
    <img
      src={product.imagen}
      alt={product.nombre}
      className="w-8 h-8 object-contain rounded-md flex-shrink-0"
    />
    <div className="flex flex-col min-w-0">
      <span className="text-[11px] font-medium text-gray-700 truncate leading-tight">
        {product.nombre}
      </span>
      {product.specs.capacidad && (
        <span className="text-[10px] text-gray-400 leading-tight">
          {product.specs.capacidad} ml
        </span>
      )}
    </div>
    <ArrowUpRight
      size={12}
      className="ml-auto text-gray-300 group-hover:text-primary transition-colors flex-shrink-0"
    />
  </a>
);

// ─── Burbuja de mensaje ────────────────────────────────────────────────────────
const MessageBubble = ({ msg }) => {
  const isBot = msg.sender === "bot";
  const productos = isBot ? getProductos(msg.filter) : [];

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[88%] flex flex-col gap-2 ${isBot ? "items-start" : "items-end"}`}
      >
        {/* Burbuja */}
        <div
          className={`
            px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
            ${
              isBot
                ? "bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm"
                : "bg-primary text-white rounded-tr-sm"
            }
          `}
        >
          <p>{msg.text}</p>

          {/* CTA */}
          {msg.cta && (
            <a
              href={msg.cta.link}
              target="_blank"
              className="inline-flex items-center gap-1.5 mt-2.5 text-[11px] font-semibold text-primary bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              {msg.cta.label}
              <ArrowUpRight size={11} />
            </a>
          )}
        </div>

        {/* Productos sugeridos */}
        {productos.length > 0 && (
          <div className="w-full flex flex-col gap-1.5">
            {productos.map((p) => (
              <ProductChip key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span
          className={`text-[10px] opacity-40 px-1 ${isBot ? "text-gray-500" : "text-gray-400"}`}
        >
          {msg.timestamp}
        </span>
      </div>
    </div>
  );
};

// ─── Typing indicator ─────────────────────────────────────────────────────────
const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="flex items-center gap-1 px-4 py-3 bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  </div>
);

// ─── ChatWindow ────────────────────────────────────────────────────────────────
export const ChatWindow = ({
  messages,
  isTyping,
  onOptionClick,
  onReset,
  onClose,
}) => {
  const scrollRef = useRef(null);
  const lastBotMsg = [...messages].reverse().find((m) => m.sender === "bot");

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div
      role="dialog"
      aria-label="Asistente virtual Envases BH"
      className="flex flex-col w-[340px] sm:w-[370px] h-[510px] bg-gray-50 rounded-2xl shadow-2xl border border-gray-200/80 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold select-none">
              BH
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 leading-tight">
              Envases BH
            </span>
            <span className="text-[10px] text-gray-400 leading-tight">
              Asistente comercial
            </span>
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          <button
            onClick={onReset}
            title="Reiniciar conversación"
            aria-label="Reiniciar chat"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <RotateCcw size={14} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              title="Cerrar"
              aria-label="Cerrar chat"
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className="animate-in fade-in slide-in-from-bottom-1 duration-200"
          >
            <MessageBubble msg={m} />
          </div>
        ))}

        {isTyping && (
          <div className="animate-in fade-in duration-200">
            <TypingIndicator />
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Opciones */}
      {lastBotMsg?.options?.length > 0 && !isTyping && (
        <div className="px-4 py-3 bg-white border-t border-gray-100 shrink-0">
          <div className="flex flex-wrap gap-1.5">
            {lastBotMsg.options.map((opt, i) => (
              <button
                key={`${lastBotMsg.id}-${i}`}
                onClick={() => onOptionClick(opt)}
                className="text-[11px] font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 bg-white hover:border-primary/40 hover:text-primary hover:bg-primary/[0.04] transition-all active:scale-95 cursor-pointer"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-2 bg-white border-t border-gray-100 shrink-0">
        <p className="text-[10px] text-gray-300 text-center">
          Envases BH · Soporte automatizado
        </p>
      </div>
    </div>
  );
};
