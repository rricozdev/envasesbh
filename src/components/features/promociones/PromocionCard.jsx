"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MessageCircle } from "lucide-react";

import { normalizarCategoria } from "@/components/features/productos/ui/product/productDomainModel";
import { parseProductName } from "@/components/features/productos/ui/product/productNameParser";
import { buildProductName } from "@/components/features/productos/ui/product/productNameFormatter";
import { sendMessgeWassap } from "@/lib/sendMenssageWassap";
import { WHATSAPP_NUMBER } from "@/lib/constants";

import PromocionBadge from "./PromocionBadge";
import {
  ESTADOS_PROMOCION,
  generarMensajePromocion,
  obtenerTextoVigencia,
} from "./promocionesModel";

export default function PromocionCard({ promocion }) {
  const { producto, estado } = promocion;

  const nombreCompleto = buildProductName(parseProductName(producto));
  const categoria = normalizarCategoria(producto);
  const esProxima = estado === ESTADOS_PROMOCION.PROXIMA;

  const presentacion = [
    producto.specs?.capacidad &&
      `${producto.specs.capacidad} ${producto.specs.unidad}`,
    producto.specs?.corona && `Rosca ${producto.specs.corona}`,
    producto.specs?.pzsEmpaque &&
      `${producto.specs.pzsEmpaque} pzs/${producto.specs.tipoEmpaque ?? "empaque"}`,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <article className="group flex flex-col h-full bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:border-red-100 transition-all duration-300">
      {/* IMAGEN */}
      <Link
        href={`/productos/${producto.slug}`}
        className="block relative aspect-[16/9] bg-white"
        aria-label={`Ver detalle de ${nombreCompleto}`}
      >
        <Image
          src={producto.imagen}
          alt={nombreCompleto}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 33vw, 25vw"
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
        />

        {/* BADGE TIPO DE PROMOCIÓN */}
        <div className="absolute top-3 left-3">
          <PromocionBadge tipo={promocion.tipo} />
        </div>
      </Link>

      {/* CONTENIDO */}
      <div className="flex flex-col flex-1 px-5 pb-4 border-t border-gray-100">
        {/* NOMBRE */}
        <Link href={`/productos/${producto.slug}`} className="block">
          <h3 className="mt-3.5 mb-1 text-base font-bold leading-tight line-clamp-1 text-secondary transition-colors duration-200 group-hover:text-primary">
            {nombreCompleto}
          </h3>
        </Link>

        {/* CATEGORÍA + ESTADO */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <p className="text-xs font-medium text-gray-400 tracking-wide truncate">
            {[categoria, presentacion].filter(Boolean).join(" • ")}
          </p>

          {esProxima ? (
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-yellow-600">
              ● Próximamente
            </span>
          ) : (
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-green-600">
              ● Activa
            </span>
          )}
        </div>

        {/* BENEFICIO */}
        <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-3">
          <p className="text-base font-bold text-red-700 leading-snug line-clamp-1">
            {promocion.beneficio}
          </p>
          {promocion.detalle && (
            <p className="mt-0.5 text-sm text-gray-600 leading-relaxed line-clamp-2">
              {promocion.detalle}
            </p>
          )}
        </div>

        {/* VIGENCIA */}
        <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-4">
          <CalendarDays size={14} className="text-red" aria-hidden="true" />
          {obtenerTextoVigencia(promocion, estado)}
        </p>

        {/* ACCIONES */}
        <div className="mt-auto flex items-center gap-3 pt-3 border-t border-gray-100">
          <button
            onClick={() =>
              sendMessgeWassap(
                WHATSAPP_NUMBER,
                generarMensajePromocion(promocion, nombreCompleto)
              )
            }
            className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-bold py-2.5 px-4 rounded-lg hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-300 cursor-pointer"
            aria-label={`Consultar por WhatsApp la promoción ${promocion.beneficio} de ${nombreCompleto}`}
          >
            <MessageCircle size={16} aria-hidden="true" />
            Consultar
          </button>

          <Link
            href={`/productos/${producto.slug}`}
            className="shrink-0 text-sm font-semibold text-secondary hover:text-primary transition-colors px-2 py-2"
          >
            Ver producto
          </Link>
        </div>
      </div>
    </article>
  );
}
