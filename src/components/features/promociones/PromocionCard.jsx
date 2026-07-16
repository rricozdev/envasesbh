"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MessageCircle, Tag } from "lucide-react";

import { normalizarCategoria } from "@/components/features/productos/ui/product/productDomainModel";
import { parseProductName } from "@/components/features/productos/ui/product/productNameParser";
import { buildProductName } from "@/components/features/productos/ui/product/productNameFormatter";
import { sendMessgeWassap } from "@/lib/sendMenssageWassap";
import { WHATSAPP_NUMBER } from "@/lib/constants";

import PromocionBadge from "./PromocionBadge";
import {
  ESTADOS_PROMOCION,
  generarMensajePromocion,
  obtenerLabelTipo,
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
    <article className="group relative flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-red-100 transition-all duration-300">
      {/* CINTA DE ESTADO */}
      <div
        className={`absolute top-3.5 right-3.5 z-10 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full backdrop-blur-sm ${
          esProxima
            ? "bg-yellow-600/90 text-white"
            : "bg-green-600/90 text-white"
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        {esProxima ? "Próximamente" : "Activa"}
      </div>

      {/* IMAGEN */}
      <Link
        href={`/productos/${producto.slug}`}
        className="block relative aspect-[16/10] bg-red-50/40"
        aria-label={`Ver detalle de ${nombreCompleto}`}
      >
        <Image
          src={producto.imagen}
          alt={nombreCompleto}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 33vw, 25vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* TALÓN PERFORADO (efecto boleto) */}
      <div className="relative">
        <div
          className="absolute -top-2.5 left-0 right-0 h-2.5 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 0 0, transparent 10px, white 10.5px), radial-gradient(circle at 100% 0, transparent 10px, white 10.5px)",
          }}
        />
        <div className="border-t-2 border-dashed border-red-100" />
      </div>

      {/* CONTENIDO */}
      <div className="flex flex-col flex-1 px-5 pb-4 pt-4">
        {/* TIPO + NOMBRE */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <Tag size={12} className="text-red shrink-0" aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-red">
            {obtenerLabelTipo(promocion.tipo)}
          </span>
        </div>

        <Link href={`/productos/${producto.slug}`} className="block">
          <h3 className="mb-1 text-base font-bold leading-tight line-clamp-1 text-secondary transition-colors duration-200 group-hover:text-primary">
            {nombreCompleto}
          </h3>
        </Link>

        <p className="text-xs font-medium text-gray-400 tracking-wide truncate mb-3">
          {[categoria, presentacion].filter(Boolean).join(" • ")}
        </p>

        {/* BENEFICIO — foco visual principal */}
        <div className="relative bg-red-50 border border-red-100 rounded-xl px-4 py-3.5 mb-3 overflow-hidden">
          <div className="absolute -right-3 -top-3 w-14 h-14 rounded-full bg-red/10" />
          <p className="relative text-lg font-extrabold text-red-700 leading-tight line-clamp-1">
            {promocion.beneficio}
          </p>
          {promocion.detalle && (
            <p className="relative mt-0.5 text-sm text-gray-600 leading-relaxed line-clamp-2">
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
