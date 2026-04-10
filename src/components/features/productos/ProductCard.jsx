"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ producto }) {
  const { addItem } = useCart();
  // Aseguramos que el nombre sea descriptivo
  const nombreCompleto = producto.nombre.toLowerCase().includes("envase")
    ? producto.nombre
    : `Envase ${producto.nombre}`;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full overflow-hidden">
      {/* Área de Imagen con gradiente suave */}
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-white relative overflow-hidden p-8">
        {/* Badge Flotante con Glassmorphism */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/70 backdrop-blur-md text-primary border border-white/20 text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full shadow-sm">
            {producto.categoria}
          </span>
        </div>

        <div className="w-full h-full relative group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-700 ease-out">
          <Image
            src={producto.imagen}
            alt={nombreCompleto}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain"
            priority={producto.id <= 4}
          />
        </div>
      </div>

      {/* Cuerpo de información */}
      <div className="p-6 flex flex-col flex-grow bg-white border-t border-gray-50">
        <h3 className="text-secondary font-extrabold text-base md:text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2 uppercase italic tracking-tighter">
          {nombreCompleto}
        </h3>

        <p className="text-gray-400 text-[11px] mb-6 font-medium uppercase tracking-wider">
          Premium PET • Grado Alimenticio
        </p>

        {/* Acciones */}
        <div className="mt-auto space-y-2">
          <button
            onClick={() =>
              addItem({
                id: producto.id,
                nombre: nombreCompleto,
                imagen: producto.imagen,
                cantidad: 1,
              })
            }
            className="w-full bg-secondary text-white hover:bg-primary py-3 rounded-xl text-[10px] font-black transition-all text-center uppercase tracking-[0.15em] shadow-lg shadow-secondary/10 active:scale-95"
          >
            Añadir a Cotización
          </button>
          
          <Link
            href={`/productos/${producto.slug}`}
            className="block w-full text-gray-400 hover:text-primary py-2 rounded-lg text-[10px] font-bold transition-all text-center uppercase tracking-widest"
          >
            Ver Ficha Técnica
          </Link>
        </div>
      </div>
    </div>
  );
}
