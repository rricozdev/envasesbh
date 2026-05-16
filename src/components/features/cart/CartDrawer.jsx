"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { generarMensajeWhatsApp } from "@/lib/whatsapp";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import CartItem from "./CartItem";

export default function CartDrawer() {
  const { items, isOpen, closeCart, clearCart, totalItems } = useCart();
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) closeCart();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, closeCart]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleWhatsApp = () => {
    const url = generarMensajeWhatsApp(items, WHATSAPP_NUMBER);
    if (url) window.open(url, "_blank");
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto z-[301]"
            : "opacity-0 pointer-events-none -z-10"
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de cotización"
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out z-[10001] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900">
                Mi Cotización
              </h2>
              <p className="text-xs text-neutral-400">
                {totalItems === 0
                  ? "Sin productos"
                  : `${totalItems} ${totalItems === 1 ? "producto" : "productos"}`}
              </p>
            </div>
          </div>

          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-neutral-600 cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-neutral-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-700">
                  Tu cotización está vacía
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  Agrega productos desde el catálogo
                </p>
              </div>
              <Link
                href="/productos"
                onClick={closeCart}
                className="mt-2 text-xs font-medium text-primary hover:underline cursor-pointer"
              >
                Ver catálogo →
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-neutral-100 space-y-3">
            <div className="flex items-center justify-between text-sm text-neutral-500">
              <span>Total de referencias</span>
              <span className="font-semibold text-neutral-800">
                {items.length}
              </span>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bb5a] text-white font-black py-3.5 px-5 rounded-xl transition-colors duration-200 text-xs uppercase tracking-widest shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Solicitar por WhatsApp
            </button>

            <button
              onClick={clearCart}
              className="w-full text-xs text-neutral-400 hover:text-red-400 transition-colors py-1"
            >
              Vaciar cotización
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
