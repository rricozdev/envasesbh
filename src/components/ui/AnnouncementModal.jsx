"use client";

import { useUI } from "@/context/UIContext";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Modal de anuncio que se abre automáticamente
 * Solo se muestra si la fecha actual es menor a la fecha de cierre
 *
 * @param {string} endDate - Fecha de cierre en formato "YYYY-MM-DD"
 * @param {ReactNode} children - Contenido del modal
 * @param {boolean} isActive - Si está activo o no
 */
export function AnnouncementModal({ endDate, children, isActive = true }) {
  const { activePanel, closeAll, openModal } = useUI();

  const modalRef = useRef(null);

  const [isDateValid, setIsDateValid] = useState(false);

  const isOpen = activePanel === "modal";

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endDateTime = new Date(endDate);
    endDateTime.setHours(23, 59, 59, 999);

    const isValid = today <= endDateTime && isActive;

    setIsDateValid(isValid);

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

  if (!isDateValid) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-500 flex items-center justify-center bg-black/60 backdrop-blur-sm px-2"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            ref={modalRef}
            className="
              w-full
              max-w-3xl
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-2xl
            "
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="font-primary text-lg font-semibold text-primary">
                Anuncio
              </h2>

              <button
                onClick={closeAll}
                className="
                  rounded-full
                  p-2
                  text-gray-500
                  transition-all
                  duration-200
                  hover:bg-gray-100
                  hover:text-red-500
                  cursor-pointer
                "
                aria-label="Cerrar modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* CONTENT */}
            <motion.div
              className="p-4 md:p-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.3,
              }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
