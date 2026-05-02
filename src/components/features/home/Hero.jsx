"use client";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

// Este componente define un Hero (sección principal) reutilizable para una landing page.
// Su propósito es mostrar un mensaje principal (title + description),
// acompañado de elementos de apoyo como highlights (beneficios),
// acciones (botones CTA) y una imagen de fondo.

// Utiliza Next.js:
// - Image → optimización automática de imágenes (performance)
// - Link → navegación interna eficiente (SPA)

// Usa framer-motion para animaciones:
// - 'stagger' permite animar los elementos hijos de forma secuencial
// - 'item' define la animación individual de cada elemento (fade + slide)

// Integra diseño visual moderno:
// - Fondo con imagen + overlay degradado para mejorar contraste
// - Tipografía jerárquica (título fuerte, descripción secundaria)
// - Badge superior para contexto comercial
// - Lista de highlights con íconos (refuerzo visual)

// Incluye CTAs (Call To Action):
// - primaryAction → acción principal (más destacada)
// - secondaryAction → acción secundaria (menos prominente)

// Es un componente flexible:
// - Recibe contenido dinámico por props
// - Permite reutilización en distintas páginas cambiando textos y acciones

// Además, incluye detalles UX:
// - Animaciones suaves de entrada
// - Diseño responsive
// - Separación clara de responsabilidades (componente presentacional)

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero({
  title,
  description,
  highlights = [],
  primaryAction,
  secondaryAction,
  imgsrc,
}) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <Image
        src={imgsrc}
        alt="Hero background"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-linear-to-r from-secondary/90 via-secondary/60 to-secondary/10" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-24 w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-2xl flex flex-col gap-6"
        >
          {/* BADGE */}
          <motion.span
            variants={item}
            className="inline-flex w-fit items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Fabricante y Distribuidor en México
          </motion.span>

          {/* TÍTULO */}
          <motion.h1
            variants={item}
            className="font-primary text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
          >
            {title}
          </motion.h1>

          {/* DESCRIPCIÓN */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg text-white/80 leading-relaxed"
          >
            {description}
          </motion.p>

          {/* HIGHLIGHTS */}
          {highlights.length > 0 && (
            <motion.ul
              variants={item}
              className="flex flex-col sm:flex-row gap-3 sm:gap-6"
            >
              {highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-white/90 text-sm font-medium"
                >
                  <Check className="w-4 h-4 text-terciary shrink-0" />
                  {h}
                </li>
              ))}
            </motion.ul>
          )}

          {/* BOTONES */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-3 pt-2"
          >
            {primaryAction && (
              <Link
                href={primaryAction.href || "/contacto"}
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-7 py-3.5 rounded-lg transition-all shadow-lg hover:-translate-y-0.5"
              >
                {primaryAction.label}
              </Link>
            )}
            {secondaryAction && (
              <Link
                href={secondaryAction.href || "/productos"}
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white font-semibold text-sm px-7 py-3.5 rounded-lg transition-all hover:-translate-y-0.5"
              >
                {secondaryAction.label}
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* WAVE */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 60L1440 60L1440 20C1200 60 900 0 720 20C540 40 240 0 0 20L0 60Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
