"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MessageCircle, Tag } from "lucide-react";

import { normalizarCategoria } from "@/components/features/productos/ui/product/productDomainModel";
import { parseProductName } from "@/components/features/productos/ui/product/productNameParser";
import { buildProductName } from "@/components/features/productos/ui/product/productNameFormatter";
import { sendMessgeWassap } from "@/lib/sendMenssageWassap";
import { WHATSAPP_NUMBER } from "@/lib/constants";

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
    <article className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-red-100 transition-all duration-300">
      {/* POSTER — imagen grande con overlays */}
      <Link
        href={`/productos/${producto.slug}`}
        className="block relative aspect-[4/5] bg-red-50/40"
        aria-label={`Ver detalle de ${nombreCompleto}`}
      >
        <Image
          src={producto.imagen}
          alt={nombreCompleto}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 33vw, 25vw"
          className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
        />

        {/* TIPO — sticker esquina superior izquierda */}
        <div className="absolute top-3 left-3 z-10 max-w-[48%] truncate flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-red text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
          <Tag size={11} aria-hidden="true" />
          {obtenerLabelTipo(promocion.tipo)}
        </div>

        {/* ESTADO — chip esquina superior derecha */}
        <div
          className={`absolute top-3 right-3 z-10 max-w-[48%] truncate flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full backdrop-blur-sm ${
            esProxima
              ? "bg-yellow-600/90 text-white"
              : "bg-green-600/90 text-white"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          {esProxima ? "Próximamente" : "Activa"}
        </div>

        {/* BENEFICIO — banda degradada inferior con texto */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="bg-gradient-to-t from-black/75 via-black/40 to-transparent px-4 pr-14 pt-10 pb-4">
            <p className="text-white text-lg sm:text-xl font-extrabold leading-tight line-clamp-2 drop-shadow-lg">
              {promocion.beneficio}
            </p>
            {promocion.detalle && (
              <p className="text-white/80 text-xs mt-0.5 leading-relaxed line-clamp-1">
                {promocion.detalle}
              </p>
            )}
          </div>
        </div>

        {/* FAB WhatsApp */}
        <button
          onClick={(e) => {
            e.preventDefault();
            sendMessgeWassap(
              WHATSAPP_NUMBER,
              generarMensajePromocion(promocion, nombreCompleto)
            );
          }}
          className="absolute bottom-3 right-3 z-20 w-11 h-11 flex items-center justify-center bg-primary text-white rounded-full shadow-lg hover:bg-accent hover:scale-110 transition-all duration-300 cursor-pointer"
          aria-label={`Consultar ${promocion.beneficio}`}
        >
          <MessageCircle size={18} aria-hidden="true" />
        </button>
      </Link>

      {/* TALÓN PERFORADO */}
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

      {/* INFO + CTA MÍNIMOS */}
      <div className="flex flex-col flex-1 px-4 pt-3 pb-3">
        <Link href={`/productos/${producto.slug}`} className="block">
          <h3 className="text-sm font-bold leading-tight line-clamp-1 text-secondary transition-colors duration-200 group-hover:text-primary">
            {nombreCompleto}
          </h3>
        </Link>

        <p className="text-xs text-gray-400 truncate mt-0.5">
          {[categoria, presentacion].filter(Boolean).join(" • ")}
        </p>

        <p className="flex items-center gap-1 text-[11px] text-gray-500 mt-2">
          <CalendarDays size={12} className="text-red shrink-0" aria-hidden="true" />
          {obtenerTextoVigencia(promocion, estado)}
        </p>
      </div>
    </article>
  );
}
