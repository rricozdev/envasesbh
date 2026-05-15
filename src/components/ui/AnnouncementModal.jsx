"use client";

import { useUI } from "@/context/UIContext";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Modal de anuncio que se abre automáticamente
 * Solo se muestra si la fecha actual es menor a la fecha de cierre
 *
 * @param {string} endDate - Fecha de cierre en formato "YYYY-MM-DD" (ej: "2026-06-12")
 * @param {ReactNode} children - Contenido del modal
 * @param {boolean} isActive - Si está activo o no (default: true)
 */
export function AnnouncementModal({ endDate, children, isActive = true }) {
  const { activePanel, closeAll, openModal } = useUI();
  const modalRef = useRef(null);
  const [isDateValid, setIsDateValid] = useState(false);
  const isOpen = activePanel === "modal";

  useEffect(() => {
    // Verificar si la fecha actual es menor a la fecha de cierre
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endDateTime = new Date(endDate);
    endDateTime.setHours(23, 59, 59, 999);

    const isValid = today <= endDateTime && isActive;
    setIsDateValid(isValid);

    // Si es válido, abrir el modal automáticamente
    if (isValid) {
      openModal();
    }
  }, [endDate, isActive, openModal]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeAll();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, closeAll]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && e.target === e.currentTarget) {
      closeAll();
    }
  };

  if (!isOpen || !isDateValid) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 animate-fadeIn"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg max-w-md w-full mx-2 animate-slideUp"
      >
        <div className="flex justify-between items-center py-3 px-6 border-b border-gray-200">
          <h2 className="text-lg font-primary  font-semibold text-primary">
            Anuncio
          </h2>
          <button
            onClick={closeAll}
            className="text-red hover:text-red-700 cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
