"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ServicioDetalle from "./ServicioDetalle";

// TODO: Cambia

/**
 * @param {object}  servicio  - objeto del array servicios.js
 * @param {boolean} reverse   - alterna imagen/texto para cada fila
 */
export default function ServicioCard({ servicio, reverse = false }) {
  const imageCol = (
    <motion.div
      initial={{ opacity: 0, x: reverse ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-lg"
    >
      <Image
        src={servicio.imagen}
        alt={servicio.imagenAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        priority
      />
      {/* overlay sutil con color primario */}
      <div className="absolute inset-0 bg-primary/10" />
    </motion.div>
  );

  const textCol = (
    <motion.div
      initial={{ opacity: 0, x: reverse ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
      className="flex flex-col justify-center"
    >
      {/* badge subtítulo */}
      <span className="inline-block self-start mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">
        {servicio.subtitulo}
      </span>

      <h2 className="font-sans text-2xl sm:text-3xl font-bold text-dark leading-tight">
        {servicio.nombre}
      </h2>

      <p className="mt-4 text-secondary/80 text-sm leading-relaxed max-w-md">
        {servicio.descripcion}
      </p>

      <ServicioDetalle items={servicio.items} />

      <div className="mt-8">
        <Link
          href={servicio.cta.href}
          className="inline-block px-8 py-3 bg-primary text-white text-xs font-bold uppercase tracking-[0.18em] rounded-full hover:bg-accent transition-colors duration-300 shadow-md"
        >
          {servicio.cta.label}
        </Link>
      </div>
    </motion.div>
  );

  return (
    <section
      id={servicio.slug}
      className="mb-12 scroll-mt-20 border-b border-gray-100 last:border-0"
    >
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
          reverse
            ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"
            : ""
        }`}
      >
        {imageCol}
        {textCol}
      </div>
    </section>
  );
}
