"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

  const { specs } = producto;
  const specs_list = [
    specs?.corona && { label: "Rosca", value: specs.corona },
    specs?.altura && { label: "Altura", value: `${specs.altura} mm` },
    specs?.pzsEmpaque && {
      label: `Pzs/${specs.tipoEmpaque ?? "empaque"}`,
      value: specs.pzsEmpaque,
    },
    specs?.produccionMinima && {
      label: "Venta Mínima",
      value: `${specs.produccionMinima.toLocaleString()} pzs`,
    },
  ].filter(Boolean);

  return (
    <article className="group flex flex-col h-full bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* IMAGEN */}
      <Link
        href={`/productos/${producto.slug}`}
        className="block relative aspect-[4/3] bg-white"
      >
        <Image
          src={producto.imagen}
          alt={nombreCompleto}
          fill
          priority={producto.id <= 4}
          sizes="(max-width:768px) 100vw, (max-width:1200px) 33vw, 33vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* CONTENIDO */}
      <div className="flex flex-col flex-1 px-5 pb-5 border-t border-gray-100">
        {/* NOMBRE */}
        <Link href={`/productos/${producto.slug}`}>
          <h3 className="mt-4 mb-1 text-lg font-bold text-primary leading-tight group-hover:text-primary/80 transition-colors line-clamp-2">
            {nombreCompleto}
          </h3>
        </Link>

        {/* CAPACIDAD */}
        {specs?.capacidad && (
          <p className="text-xs text-gray-400 mb-4">{specs.capacidad} ml</p>
        )}

        {/* SPECS con líneas punteadas */}
        {specs_list.length > 0 && (
          <ul className="space-y-2 mb-5">
            {specs_list.map(({ label, value }) => (
              <li key={label} className="flex items-baseline gap-1 text-sm">
                <span className="text-gray-500 shrink-0">{label}</span>
                <span className="flex-1 border-b border-dotted border-gray-300 mx-1 mb-0.5" />
                <span className="font-semibold text-gray-800 shrink-0">
                  {value}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* ACCIONES */}
        <div className="mt-auto flex items-center justify-center gap-6 pt-3 border-t border-gray-100">
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
            className="text-primary hover:text-primary/70 transition-colors cursor-pointer"
            aria-label="Agregar al carrito"
          >
            <ShoppingCart size={20} />
          </button>

          <Link
            href={`/productos/${producto.slug}`}
            className="text-sm font-semibold text-secondary hover:text-primary transition-colors cursor-pointer"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}
