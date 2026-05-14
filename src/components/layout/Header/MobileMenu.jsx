"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * MobileMenu
 * Menú lateral/desplegable para navegación en dispositivos móviles.
 * Recibe:
 * - isOpen: controla visibilidad del menú
 * - onClose: función para cerrar el menú al hacer click en un link
 * - navLinks: array de rutas de navegación
 */
export default function MobileMenu({ isOpen, onClose, navLinks }) {
  // Obtiene la ruta actual para marcar el enlace activo
  const pathname = usePathname();

  return (
    <div
      className={`
        /*
          Contenedor principal del menú móvil:

          - fixed: lo saca del flujo del documento
          - top-[110px]: lo posiciona debajo del navbar
          - w-full: ocupa todo el ancho
          - z-[1000]: asegura que esté por encima del contenido

          Animación tipo "persiana":
          - overflow-hidden: oculta contenido al colapsar
          - transition-all: anima cambios de tamaño/opacidad
          - max-h: controla apertura/cierre
        */
        fixed top-[110px] left-0 w-full z-[1000]
        overflow-hidden transition-all duration-500 ease-in-out
        bg-white

        /* Control de visibilidad del menú */
        ${
          isOpen
            ? "max-h-[600px] opacity-100 visible shadow-2xl"
            : "max-h-0 opacity-0 invisible"
        }
      `}
    >
      <div className="p-6 border-t border-gray-100">
        <div className="flex flex-col space-y-4">
          {/* Render de links de navegación */}
          {navLinks.map((link) => {
            // Detecta si la ruta actual coincide con el link
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose} // Cierra el menú al seleccionar una opción
                className={`
                  block text-sm uppercase tracking-widest p-3 rounded-lg transition-all

                  /* Estilo activo vs inactivo */
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

          {/* Sección inferior del menú */}
          <div className="pt-4 border-t border-gray-50">
            <button className="w-full bg-primary text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary/25">
              Cotizar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
