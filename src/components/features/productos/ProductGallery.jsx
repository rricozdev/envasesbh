"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({ imagen, imagenes, alt }) {
  const fotos = imagenes?.length > 0 ? imagenes : [imagen];
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (nextIndex) => {
    setDirection(nextIndex > index ? 1 : -1);
    setIndex(nextIndex);
  };

  const prev = () => goTo(index === 0 ? fotos.length - 1 : index - 1);
  const next = () => goTo(index === fotos.length - 1 ? 0 : index + 1);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="flex flex-col gap-3">
      {/* IMAGEN PRINCIPAL */}
      <div className="aspect-square bg-[#f8f9fa] rounded-2xl md:rounded-3xl border border-gray-100 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0 p-6 md:p-12"
            drag={fotos.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) next();
              else if (info.offset.x > 50) prev();
            }}
          >
            <Image
              src={fotos[index]}
              alt={alt}
              fill
              priority
              draggable={false}
              className="object-contain select-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* FLECHAS — solo si hay más de una imagen */}
        {fotos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-100 shadow-sm rounded-full p-1.5 transition-all duration-200 hover:scale-110 cursor-pointer"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={18} className="text-secondary" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-100 shadow-sm rounded-full p-1.5 transition-all duration-200 hover:scale-110 cursor-pointer"
              aria-label="Imagen siguiente"
            >
              <ChevronRight size={18} className="text-secondary" />
            </button>

            {/* DOTS — móvil */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
              {fotos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    i === index ? "bg-primary w-3" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* THUMBNAILS — desktop */}
      {fotos.length > 1 && (
        <div className="hidden md:flex gap-3 flex-wrap">
          {fotos.map((foto, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`relative w-16 h-16 rounded-xl border-2 overflow-hidden bg-[#f8f9fa] transition-all duration-200 flex-shrink-0 cursor-pointer ${
                i === index
                  ? "border-primary shadow-md shadow-primary/20"
                  : "border-gray-100 hover:border-gray-300"
              }`}
            >
              <Image
                src={foto}
                alt={`${alt} variante ${i + 1}`}
                fill
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
