"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIA_LABEL, CATEGORIA_BADGE } from "@/lib/constants";

export default function ProductCard({ producto }) {
  const { addItem } = useCart();
  const PREFIJOS_PROPIOS = [
    "tapa",
    "trigger",
    "tarro",
    "vitrolero",
    "bomba",
    "atomizador",
    "flip",
    "mini",
  ];

  const nombreCompleto = PREFIJOS_PROPIOS.some((p) =>
    producto.nombre.toLowerCase().startsWith(p),
  )
    ? producto.nombre
    : producto.nombre.toLowerCase().includes("envase")
      ? producto.nombre
      : `Envase ${producto.nombre}`;
  return (
    <article className="group relative flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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
      <div className="flex flex-col grow px-5 pb-6 gap-4">
        {/* TEXTO */}
        <div className="space-y-2">
          {/* BADGE CATEGORÍA */}
          <span className="inline-block text-[10px] font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-md">
            {CATEGORIA_BADGE[producto.categoria] ?? producto.categoria}
          </span>

          {/* NOMBRE */}
          <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {nombreCompleto}
          </h3>

          {/* COLORES DISPONIBLES */}
          {producto.specs?.colores?.filter((c) => c).length > 1 && (
            <p className="text-[10px] font-semibold text-primary/70 uppercase tracking-wider">
              + {producto.specs.colores.filter((c) => c).length} colores
              disponibles
            </p>
          )}

          {/* ETIQUETA CATEGORÍA */}
          <p className="text-xs text-gray-500">
            {CATEGORIA_LABEL[producto.categoria] ?? "Premium PET • Uso general"}
          </p>
        </div>

        {/* ACCIONES */}
        <div className="mt-auto flex flex-row gap-4">
          {/* BOTÓN PRINCIPAL */}
          <button
            onClick={() =>
              addItem({
                id: producto.id,
                nombre: nombreCompleto,
                imagen: producto.imagen,
                cantidad: 1,
                specs: producto.specs,
              })
            }
            className="w-full h-10 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center "
          >
            <ShoppingCart />
          </button>

          {/* BOTÓN SECUNDARIO */}
          <Link
            href={`/productos/${producto.slug}`}
            className="w-full h-10 text-gray-700 hover:text-primary border border-gray-200 hover:border-primary rounded-lg transition-all cursor-pointer duration-200 hover:bg-gray-50 flex items-center justify-center "
          >
            <button className="flex items-center justify-center px-4 py-2  text-xs font-bold text-secondary hover:bg-gray-50 transition-all cursor-pointer">
              Ver
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}
