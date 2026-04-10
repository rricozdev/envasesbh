"use client";

import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { toggleCart, totalItems } = useCart();

  return (
    <button
      onClick={toggleCart}
      aria-label={`Abrir cotización${totalItems > 0 ? `, ${totalItems} productos` : ""}`}
      className="fixed bottom-24 right-6 z-9998 bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
    >
      {/* Ícono carrito */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>

      {/* Badge de cantidad */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-white text-primary text-[11px] font-black flex items-center justify-center leading-none shadow-sm">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  );
}
