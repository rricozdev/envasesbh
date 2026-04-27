"use client";
// Indica que este componente se renderiza en el cliente (Next.js App Router)
// Necesario porque usamos animaciones con framer-motion

import { motion } from "framer-motion";
// Importa el wrapper 'motion' para poder animar elementos HTML de forma declarativa

export default function FleetHeader() {
  // Componente presentacional (sin lógica de negocio)
  // Su única responsabilidad es mostrar el header de la sección con animaciones (SRP)

  return (
    <motion.div
      className="mb-16 text-center"
      // Contenedor principal con margen inferior y texto centrado

      initial={{ opacity: 0, y: 30 }}
      // Estado inicial: invisible y ligeramente desplazado hacia abajo

      whileInView={{ opacity: 1, y: 0 }}
      // Estado al entrar en el viewport: visible y en su posición original

      viewport={{ once: true, amount: 0.5 }}
      // 'once: true' → la animación ocurre solo una vez
      // 'amount: 0.5' → se activa cuando el 50% del componente es visible

      transition={{ duration: 0.6, ease: "easeOut" }}
      // Configuración de la animación: duración y suavizado
    >
      <motion.h2
        className="mb-4 font-heading text-4xl font-semibold tracking-tight text-secondary md:text-5xl"
        // Título principal con tipografía destacada y responsive

        initial={{ opacity: 0, y: 20 }}
        // Estado inicial del título

        whileInView={{ opacity: 1, y: 0 }}
        // Animación al aparecer

        viewport={{ once: true }}
        // Se ejecuta solo una vez

        transition={{ duration: 0.5, delay: 0.1 }}
        // Ligero delay para crear efecto de entrada progresiva
      >
        Desde nuestra fábrica hasta tu puerta
      </motion.h2>

      <motion.p
        className="mx-auto max-w-2xl text-base font-body text-secondary md:text-lg"
        // Párrafo descriptivo centrado con ancho máximo para mejorar legibilidad

        initial={{ opacity: 0, y: 20 }}
        // Estado inicial del texto

        whileInView={{ opacity: 1, y: 0 }}
        // Animación al aparecer

        viewport={{ once: true }}
        // Solo se anima una vez

        transition={{ duration: 0.5, delay: 0.25 }}
        // Delay mayor que el título para animación secuencial (mejor UX)
      >
        Con 5 opciones de transporte de diferentes capacidades, garantizamos que
        tu envío llega seguro, a tiempo y en las mejores condiciones. Una flota
        diseñada para tu negocio.
      </motion.p>
    </motion.div>
  );
}
