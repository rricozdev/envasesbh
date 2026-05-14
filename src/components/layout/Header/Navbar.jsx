"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/config/nav.config";
import MobileMenu from "./MobileMenu";
import CartButton from "../../features/cart/CartButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    /* PROPIEDADES CRÍTICAS:
       - sticky top-0: Mantiene el componente fijo al llegar al borde superior.
       - z-[9999]: Asegura que esté por encima de cualquier otro elemento (Hero, Cards, etc).
       - shadow-lg: Añade profundidad para separar visualmente el nav del contenido que pasa por debajo.
    */
    <nav className="bg-primary w-full shadow-lg ">
      <div className="max-w-6xl mx-auto flex justify-center items-center">
        {/* --- NAVEGACIÓN DESKTOP --- */}
        <div className="hidden md:flex justify-center w-full font-medium text-white text-[13px] uppercase tracking-wide">
          {navLinks.map((link) => {
            // Detecta si la ruta actual coincide con el link para aplicar estilo activo
            // const isActive = pathname === link.href;
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-5 py-3.5 transition-colors duration-200 border-r border-cyan-600/40 last:border-r-0 flex items-center h-full ${
                  isActive
                    ? "bg-cyan-500/40 text-terciary font-semibold"
                    : "hover:bg-cyan-600/30"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          {/* Botón de carrito para escritorio */}
          <CartButton className="!fixed !bottom-auto !right-auto relative p-2 ml-4 text-white hover:bg-cyan-600/30 rounded-full transition-colors duration-200" />
        </div>

        {/* --- NAVEGACIÓN MÓVIL --- */}
        <div className="md:hidden flex justify-between items-center w-full px-5 py-3 text-white">
          {/* Botón de carrito para móvil */}
          <CartButton className="!fixed !bottom-auto !right-auto relative p-2 text-white hover:bg-cyan-600/30 rounded-full transition-colors duration-200" />
          <div className="font-bold text-sm tracking-widest uppercase">
            MENÚ
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-2xl focus:outline-none transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE (LÓGICA APARTE) */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navLinks={navLinks}
      />
    </nav>
  );
}
