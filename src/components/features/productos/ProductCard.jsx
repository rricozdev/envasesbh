"use client";

import { useCart } from "@/context/CartContext";
import { CATEGORIA_BADGE } from "@/lib/constants";
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

  const coloresDisponibles = producto.specs?.colores?.filter(Boolean) || [];

  const capacidad = producto.specs?.capacidad;
  const corona = producto.specs?.corona;
  const peso = producto.specs?.peso;
  const piezasEmpaque = producto.specs?.pzsEmpaque;

  const produccionMinima = producto.specs?.produccionMinima;
  const tipoEmpaque = producto.specs?.tipoEmpaque;

  const getProduccionLabel = () => {
    if (!produccionMinima) return null;

    if (tipoEmpaque?.toLowerCase() === "caja") {
      return `${produccionMinima} pzs/caja`;
    }

    if (tipoEmpaque?.toLowerCase() === "bolsa") {
      return `${produccionMinima} pzs/bolsa`;
    }

    return `${produccionMinima} pzs mín.`;
  };

  return (
    <article
      className="
        group
        relative
        flex
        flex-col
        h-full
        overflow-hidden
        rounded-xl
        border
        border-gray-200/80
        bg-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary/20
        hover:shadow-2xl
      "
    >
      {/* HEADER VISUAL */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary/5">
        {/* IMAGEN */}
        <div className="relative aspect-[4/3] p-8 pt-14">
          <Image
            src={producto.imagen}
            alt={nombreCompleto}
            fill
            priority={producto.id <= 4}
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="
              object-contain
              transition-transform
              duration-500
              group-hover:scale-110
            "
          />
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.03] to-transparent pointer-events-none" />
      </div>

      {/* CONTENIDO */}
      <div className="flex flex-col flex-1 p-5">
        <span className="inline-block w-25 text-[10px] font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-md mb-2">
          {CATEGORIA_BADGE[producto.categoria] ?? producto.categoria}
        </span>
        {/* TITULO */}
        <div className="mb-5">
          <h3
            className="
              text-base
              font-bold
              leading-tight
              text-gray-900
              transition-colors
              duration-300
              group-hover:text-primary
              line-clamp-2
            "
          >
            {nombreCompleto}
          </h3>
        </div>

        {/* INFO RÁPIDA */}
        <ul className="space-y-2 mb-6">
          {capacidad && (
            <li className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Capacidad</span>

              <span className="font-semibold text-gray-900">
                {capacidad} ml
              </span>
            </li>
          )}

          {corona && (
            <li className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Corona</span>

              <span className="font-semibold text-gray-900">{corona}</span>
            </li>
          )}

          {peso && (
            <li className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Peso</span>

              <span className="font-semibold text-gray-900">{peso} g</span>
            </li>
          )}

          {piezasEmpaque && (
            <li className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Pzs/{tipoEmpaque}</span>

              <span className="font-semibold text-gray-900">
                {piezasEmpaque}
              </span>
            </li>
          )}
        </ul>

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
            {" "}
            <ShoppingCart />{" "}
          </button>{" "}
          {/* BOTÓN SECUNDARIO */}
          <Link
            href={`/productos/${producto.slug}`}
            className="w-full h-10 text-gray-700 hover:text-primary border border-gray-200 hover:border-primary rounded-lg transition-all cursor-pointer duration-200 hover:bg-gray-50 flex items-center justify-center "
          >
            <button className="flex items-center justify-center px-4 py-2 text-xs font-bold text-secondary hover:bg-gray-50 transition-all cursor-pointer">
              {" "}
              Ver{" "}
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}
