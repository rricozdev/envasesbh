"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { normalizarCategoria } from "@/components/features/productos/ui/product/productDomainModel";

import { parseProductName } from "@/components/features/productos/ui/product/productNameParser";
import { buildProductName } from "@/components/features/productos/ui/product/productNameFormatter";

export default function ProductCard({ producto }) {
  const { addItem } = useCart();

  const parsed = parseProductName(producto);
  const nombreCompleto = buildProductName(parsed);
  const nombreDisplay = nombreCompleto;
  const categoria = normalizarCategoria(producto);

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
        <Link href={`/productos/${producto.slug}`} className="block">
          <h3 className="mt-4 mb-1 text-lg font-bold leading-tight line-clamp-2">
            <span className="inline-flex flex-wrap items-baseline">
              {(() => {
                const palabras = nombreDisplay.split(" ");
                let globalIdx = 0;
                return palabras.map((palabra, i) => (
                  <span key={i} className="inline-flex" style={{ whiteSpace: "nowrap" }}>
                    {i > 0 && (
                      <span className="inline-block">&nbsp;</span>
                    )}
                    {palabra.split("").map((letra, j) => {
                      const idx = globalIdx++;
                      return (
                        <span
                          key={j}
                          className="inline-block transition-all duration-200 text-secondary group-hover:text-primary group-hover:-translate-y-0.5"
                          style={{ transitionDelay: `${idx * 0.02}s` }}
                        >
                          {letra}
                        </span>
                      );
                    })}
                  </span>
                ));
              })()}
            </span>
          </h3>
        </Link>

        {/* CATEGORÍA + STOCK */}
        <div className="flex items-center justify-between mb-4">
          {categoria ? (
            <p className="text-xs font-medium text-gray-400 tracking-wide">
              {categoria}
            </p>
          ) : (
            <span />
          )}

          {specs?.stockDisponible === true ? (
            <span className="text-[10px] font-bold uppercase tracking-wider text-green-600">
              ● En stock
            </span>
          ) : specs?.sobrePedido === true ? (
            <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-600">
              ● Bajo pedido
            </span>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-wider text-red">
              ● No disponible
            </span>
          )}
        </div>

        {/* SPECS */}
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
            className="text-primary hover:text-primary/70 transition-all duration-200 cursor-pointer hover:scale-110 hover:rotate-6 active:scale-90"
            aria-label="Agregar al carrito"
          >
            <ShoppingCart size={20} />
          </button>

          <Link
            href={`/productos/${producto.slug}`}
            className="group/link text-sm font-semibold text-secondary hover:text-primary transition-colors cursor-pointer inline-block"
          >
            <span className="inline-flex">
              {"Ver detalle".split("").map((letra, idx) => (
                <span
                  key={idx}
                  className="inline-block transition-all duration-200 group-hover/link:animate-[wave_0.4s_ease-in-out_forwards]"
                  style={{ animationDelay: `${idx * 0.03}s` }}
                >
                  {letra === " " ? "\u00A0" : letra}
                </span>
              ))}
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
