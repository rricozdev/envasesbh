"use client";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { name: "INICIO", href: "#", current: true },
  { name: "QUIENES SOMOS", href: "#" },
  { name: "PRODUCTOS", href: "#" },
  { name: "SERVICIOS", href: "#" },
  { name: "PROYECTOS A TU MEDIDA", href: "#" },
  { name: "PROMOCIONES", href: "#" },
  { name: "BLOG", href: "#" },
  { name: "CONTACTO", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary w-full shadow-md">
      <div className="max-w-7xl mx-auto flex justify-center md:justify-start items-center">
        {/* Links Escritorio - Alineados a la izquierda y más compactos */}
        <div className="hidden md:flex font-medium text-white text-[13px] uppercase tracking-wide">
          {" "}
          {/* Texto más chico */}
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`px-5 py-3.5 transition-colors duration-200 border-r border-cyan-600/40 last:border-r-0 flex items-center h-full ${
                // Padding reducido
                link.current
                  ? "bg-cyan-500/40 font-semibold" // Resaltado más sutil
                  : "hover:bg-cyan-600/30"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Botón Hamburguesa (solo móvil) - Más compacto */}
        <div className="md:hidden flex justify-between items-center w-full px-5 py-3">
          {" "}
          {/* Padding reducido */}
          <div className="text-white font-bold text-sm">MENÚ</div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-1.5 text-xl"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Menú Móvil - Pasamos los links completos */}
      {isOpen && (
        <MobileMenu onClose={() => setIsOpen(false)} navLinks={navLinks} />
      )}
    </nav>
  );
}
