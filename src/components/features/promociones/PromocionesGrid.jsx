"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { CalendarClock, PackageSearch } from "lucide-react";

import PromocionCard from "./PromocionCard";
import { obtenerPromocionesVisibles } from "./promocionesModel";

const emptySubscribe = () => () => {};

// Recibe las promociones calculadas en build (SEO) y las re-evalúa en el
// cliente al hidratar, para que vigencias iniciadas o vencidas después del
// build se reflejen sin regenerar el sitio.
export default function PromocionesGrid({ activas, proximas }) {
  const serverSnapshot = useMemo(
    () => ({ activas, proximas }),
    [activas, proximas]
  );
  const clientSnapshot = useMemo(
    () => obtenerPromocionesVisibles(new Date()),
    []
  );

  const promos = useSyncExternalStore(
    emptySubscribe,
    () => clientSnapshot,
    () => serverSnapshot
  );

  const sinPromociones =
    promos.activas.length === 0 && promos.proximas.length === 0;

  if (sinPromociones) {
    return (
      <div className="text-center py-20 px-6 border-2 border-dashed border-gray-100 rounded-3xl">
        <PackageSearch
          size={40}
          className="mx-auto text-secondary/30"
          aria-hidden="true"
        />
        <p className="mt-4 text-lg font-bold text-secondary/70">
          Por ahora no hay promociones vigentes
        </p>
        <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
          Estamos preparando nuevas ofertas. Mientras tanto, explora nuestro
          catálogo completo de envases PET.
        </p>
        <Link
          href="/productos"
          className="inline-block mt-6 bg-primary text-white text-sm font-bold py-2.5 px-6 rounded-lg hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-300"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* PROMOCIONES ACTIVAS */}
      {promos.activas.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {promos.activas.map((promo) => (
            <PromocionCard key={promo.id} promocion={promo} />
          ))}
        </div>
      )}

      {promos.activas.length === 0 && (
        <div className="text-center py-14 px-6 border-2 border-dashed border-gray-100 rounded-3xl text-secondary/40">
          No hay promociones activas en este momento, pero mira lo que viene.
        </div>
      )}

      {/* PRÓXIMAS PROMOCIONES */}
      {promos.proximas.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-8">
            <CalendarClock
              size={20}
              className="text-red"
              aria-hidden="true"
            />
            <h2 className="text-xl sm:text-2xl font-extrabold text-secondary/90 font-primary">
              Próximas promociones
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {promos.proximas.map((promo) => (
              <PromocionCard key={promo.id} promocion={promo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
