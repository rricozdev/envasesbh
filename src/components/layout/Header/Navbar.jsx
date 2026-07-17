"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/config/nav.config";
import dynamic from "next/dynamic";

const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });
import CartButton from "../../features/cart/CartButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-primary w-full shadow-lg">
      {/* --- DESKTOP: NAV --- */}
      <div className="hidden md:flex max-w-6xl mx-auto items-stretch">
        <div className="flex justify-center flex-1 font-medium text-white text-[13px] uppercase tracking-wide">
          {navLinks.map((link) => {
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
          <CartButton className="!fixed !bottom-auto !right-auto relative p-2 ml-4 text-white hover:bg-cyan-600/30 rounded-full transition-colors duration-200" />
        </div>
      </div>

      {/* --- MÓVIL: NAV --- */}
      <div className="md:hidden flex justify-between items-center w-full px-5 py-3 text-white">
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

      {/* MENÚ DESPLEGABLE (LÓGICA APARTE) */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navLinks={navLinks}
      />
    </nav>
  );
}
