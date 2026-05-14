"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * MobileMenu
 *
 * Menú móvil con:
 * - Animaciones suaves usando Framer Motion
 * - Posicionamiento dinámico según scroll
 * - Cierre automático al hacer scroll
 * - Detección de link activo
 */
export default function MobileMenu({ isOpen, onClose, navLinks }) {
  // Ruta actual
  const pathname = usePathname();

  /*
    Posición dinámica del menú.

    Usamos style inline porque Tailwind
    NO interpreta clases dinámicas
    generadas desde useState.
  */
  const [menuTop, setMenuTop] = useState("112px");

  /*
    Detecta el scroll y ajusta
    la posición del menú.
  */
  useEffect(() => {
    const updateMenuPosition = () => {
      /*
        Cuando el Header ya está sticky.
      */
      if (window.scrollY > 20) {
        setMenuTop("64px");
      } else {
        /*
          Cuando el TopBar sigue visible.
        */
        setMenuTop("120px");
      }
    };

    // Ejecutar inmediatamente al montar
    updateMenuPosition();

    window.addEventListener("scroll", updateMenuPosition);

    return () => {
      window.removeEventListener("scroll", updateMenuPosition);
    };
  }, []);

  /*
    Cierra automáticamente el menú
    cuando el usuario hace scroll
    DESPUÉS de abrirlo.
  */
  useEffect(() => {
    if (!isOpen) return;

    const initialScroll = window.scrollY;

    const handleCloseOnScroll = () => {
      /*
        Evita cierre instantáneo
        cuando ya estabas scrolleado.
      */
      if (Math.abs(window.scrollY - initialScroll) > 10) {
        onClose();
      }
    };

    window.addEventListener("scroll", handleCloseOnScroll);

    return () => {
      window.removeEventListener("scroll", handleCloseOnScroll);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          /*
            Animación de entrada
          */
          initial={{
            opacity: 0,
            y: -12,
          }}
          /*
            Estado visible
          */
          animate={{
            opacity: 1,
            y: 0,
          }}
          /*
            Animación de salida
          */
          exit={{
            opacity: 0,
            y: -12,
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className="
            fixed left-0 w-full z-[9998]
            bg-white shadow-2xl border-t border-gray-100
          "
          style={{
            top: menuTop,
          }}
        >
          {/* CONTENIDO */}
          <div className="p-6">
            <div className="flex flex-col space-y-4">
              {/* LINKS */}
              {navLinks.map((link) => {
                /*
                  Detecta link activo.
                */
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={onClose}
                    className={`
                      block
                      p-3
                      rounded-lg
                      text-sm
                      uppercase
                      tracking-widest
                      transition-all duration-200

                      ${
                        isActive
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-secondary hover:bg-gray-50 hover:text-primary"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* CTA */}
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={onClose}
                  className="
                    w-full
                    py-3
                    rounded-xl
                    bg-primary
                    text-white
                    text-sm
                    font-bold
                    uppercase
                    tracking-widest
                    shadow-lg shadow-primary/25
                    hover:opacity-90
                    transition-all duration-200
                  "
                >
                  Cotizar ahora
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
