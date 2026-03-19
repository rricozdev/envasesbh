"use client";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { name: "INICIO", href: "#", current: true },
  { name: "QUIENES SOMOS", href: "#" },
  { name: "PRODUCTOS", href: "#" },
  { name: "SERVICIOS", href: "#" },
  { name: "PROYECTOS A TU MEDIDA", href: "#" },
  { name: "BLOG", href: "#" },
  { name: "CONTACTO", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    /* IMPORTANTE: 'relative' y 'z-[999]' aseguran que este componente 
      esté por encima del Hero (z-10) y permita que el menú absoluto flote.
    */
    <nav className="bg-primary w-full shadow-md relative z-[999]">
      <div className="max-w-6xl mx-auto flex justify-center items-center">
        {/* --- LINKS ESCRITORIO --- */}
        <div className="hidden md:flex justify-center w-full font-medium text-white text-[13px] uppercase tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`px-5 py-3.5 transition-colors duration-200 border-r border-cyan-600/40 last:border-r-0 flex items-center h-full ${
                link.current
                  ? "bg-cyan-500/40 font-semibold"
                  : "hover:bg-cyan-600/30"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* --- CABECERA MÓVIL (Botón Hamburguesa) --- */}
        <div className="md:hidden flex justify-between items-center w-full px-5 py-3">
          <div className="text-white font-bold text-sm tracking-widest">
            MENÚ
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 text-2xl focus:outline-none transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            aria-label="Abrir menú"
          >
            {/* Animación simple de icono de X a Hamburguesa */}
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* COMPONENTIZACIÓN: 
        Pasamos el estado para controlar la animación de la "persiana" 
        internamente en MobileMenu.
      */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navLinks={navLinks}
      />
    </nav>
  );
}
