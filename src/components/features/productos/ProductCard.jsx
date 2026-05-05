"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ producto }) {
  const { addItem } = useCart();

  const nombreCompleto = producto.nombre.toLowerCase().includes("envase")
    ? producto.nombre
    : `Envase ${producto.nombre}`;

  return (
    <article className="group relative flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* BADGE */}
      <div className="absolute top-3 left-3 z-10">
        <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider bg-white/90 backdrop-blur border border-gray-200 px-3 py-1 rounded-full shadow-sm">
          {producto.categoria}
        </span>
      </div>

      {/* IMAGEN */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-110">
          <Image
            src={producto.imagen}
            alt={nombreCompleto}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain"
            priority={producto.id <= 4}
          />
        </div>

        {/* Overlay sutil en hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* CONTENIDO */}
      <div className="flex flex-col flex-grow p-5 gap-4">
        {/* TEXTO */}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {nombreCompleto}
          </h3>

          <p className="text-xs text-gray-500">Premium PET • Uso alimenticio</p>
        </div>

        {/* ACCIONES */}
        <div className="mt-auto flex flex-col gap-2">
          {/* BOTÓN PRINCIPAL */}
          <button
            onClick={() =>
              addItem({
                id: producto.id,
                nombre: nombreCompleto,
                imagen: producto.imagen,
                cantidad: 1,
              })
            }
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-xs py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            Añadir a Cotización
          </button>

          {/* BOTÓN SECUNDARIO */}
          <Link
            href={`/productos/${producto.slug}`}
            className="w-full text-center text-gray-700 hover:text-primary border border-gray-200 hover:border-primary font-semibold text-xs py-3 rounded-lg transition-all duration-200 hover:bg-gray-50"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </article>
  );
}
