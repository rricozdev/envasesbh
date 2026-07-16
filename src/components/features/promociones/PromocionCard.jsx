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
    <article className="group flex flex-col h-full bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* IMAGEN */}
      <Link
        href={`/productos/${producto.slug}`}
        className="block relative aspect-[4/3] bg-white"
        aria-label={`Ver detalle de ${nombreCompleto}`}
      >
        <Image
          src={producto.imagen}
          alt={nombreCompleto}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 33vw, 33vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* BADGE TIPO DE PROMOCIÓN */}
        <div className="absolute top-3 left-3">
          <PromocionBadge tipo={promocion.tipo} />
        </div>
      </Link>

      {/* CONTENIDO */}
      <div className="flex flex-col flex-1 px-5 pb-5 border-t border-gray-100">
        {/* NOMBRE */}
        <Link href={`/productos/${producto.slug}`} className="block">
          <h3 className="mt-4 mb-1 text-lg font-bold leading-tight line-clamp-2 text-secondary transition-colors duration-200 group-hover:text-primary">
            {nombreCompleto}
          </h3>
        </Link>

        {/* CATEGORÍA + ESTADO */}
        <div className="flex items-center justify-between mb-3">
          {categoria ? (
            <p className="text-xs font-medium text-gray-400 tracking-wide">
              {categoria}
            </p>
          ) : (
            <span />
          )}

          {esProxima ? (
            <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-600">
              ● Próximamente
            </span>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-wider text-green-600">
              ● Promoción activa
            </span>
          )}
        </div>

        {/* PRESENTACIÓN */}
        {presentacion && (
          <p className="text-xs text-gray-500 mb-4">{presentacion}</p>
        )}

        {/* BENEFICIO */}
        <div className="bg-surface-soft border border-gray-100 rounded-lg px-4 py-3 mb-4">
          <p className="text-lg font-bold text-primary leading-snug">
            {promocion.beneficio}
          </p>
          {promocion.detalle && (
            <p className="mt-1 text-sm text-gray-600 leading-relaxed">
              {promocion.detalle}
            </p>
          )}
        </div>

        {/* VIGENCIA */}
        <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-5">
          <CalendarDays size={14} className="text-primary" aria-hidden="true" />
          {obtenerTextoVigencia(promocion, estado)}
        </p>

        {/* ACCIONES */}
        <div className="mt-auto flex flex-col gap-3 pt-3 border-t border-gray-100">
          <button
            onClick={() =>
              sendMessgeWassap(
                WHATSAPP_NUMBER,
                generarMensajePromocion(promocion, nombreCompleto)
              )
            }
            className="inline-flex items-center justify-center gap-2 w-full bg-primary text-white text-sm font-bold py-2.5 px-4 rounded-lg hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-300 cursor-pointer"
            aria-label={`Consultar por WhatsApp la promoción ${promocion.beneficio} de ${nombreCompleto}`}
          >
            <MessageCircle size={16} aria-hidden="true" />
            Consultar promoción
          </button>

          <Link
            href={`/productos/${producto.slug}`}
            className="text-center text-sm font-semibold text-secondary hover:text-primary transition-colors"
          >
            Ver producto
          </Link>
        </div>
      </div>
    </article>
  );
}
