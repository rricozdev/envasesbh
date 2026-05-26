import SectionContent from "@/components/ui/SectionContent";
import { MapPinned, Package, Receipt, Truck } from "lucide-react";
import Image from "next/image";

const vehicles = [
  {
    id: 1,
    name: "Tráiler",
    description:
      "Preparado para realizar entregas de larga distancia con máxima eficiencia y seguridad en todo México.",
    image: "/img/flota/camion_30Toneladas.webp",
    color: "bg-indigo-50",
    volume: "Grandes volúmenes",
    routes: "Cobertura nacional",
    ideal: "Entregas de larga distancia",
    badge: "Cobertura nacional",
  },
  {
    id: 2,
    name: "Remolque Grande",
    description:
      "Diseñado para transportar grandes volúmenes con eficiencia y seguridad en entregas locales y foráneas.",
    image: "/img/flota/camion_20_Toneladas.webp",
    color: "bg-blue-50",
    volume: "Alta capacidad de carga",
    routes: "Locales y foráneos",
    ideal: "Distribución eficiente",
    badge: "Entregas eficientes",
  },
  {
    id: 3,
    name: "Camión Caja Grande",
    description:
      "Pensado para optimizar tiempos de entrega y transportar productos de forma segura en trayectos medianos.",
    image: "/img/flota/camion_mediano.webp",
    color: "bg-cyan-50",
    volume: "Volumen grande",
    routes: "Locales y foráneos",
    ideal: "Entregas ágiles",
    badge: "Cobertura flexible",
  },
  {
    id: 4,
    name: "Camión Caja Mediana",
    description:
      "Ideal para rutas locales y entregas rápidas, combinando versatilidad y eficiencia en cada traslado.",
    image: "/img/flota/camion_10_Toneladas.webp",
    color: "bg-teal-50",
    volume: "Volumen mediano",
    routes: "Locales y foráneos",
    ideal: "Entregas rápidas",
    badge: "Entrega segura",
  },
  {
    id: 6,
    name: "Camioneta Nissan",
    description:
      "Gran maniobrabilidad para entregas locales y acceso a zonas de difícil circulación.",
    image: "/img/flota/camioneta_3Toneladas.webp",
    color: "bg-sky-50",
    volume: "Volumen mediano",
    routes: "Cobertura local",
    ideal: "Accesos reducidos",
    badge: "Máxima versatilidad",
  },
  {
    id: 5,
    name: "Mini Van",
    description:
      "Perfecta para entregas urbanas y recorridos rápidos, asegurando atención eficiente y puntual.",
    image: "/img/flota/mini_van.webp",
    color: "bg-cyan-50",
    volume: "Entregas ligeras",
    routes: "Zonas urbanas",
    ideal: "Distribución local",
    badge: "Atención inmediata",
  },
];

const hilightsVehicles = [
  {
    icon: <Truck size={22} className="text-white" />,
    title: "Flota Especializada",
    description:
      "Diferentes unidades para adaptarnos a cada tipo de entrega y operación.",
  },
  {
    icon: <Receipt size={22} className="text-white" />,
    title: "Costos Logísticos Competitivos",
    description:
      "Ofrecemos entrega con tarifas preferenciales y envíos sin costo en rutas y volúmenes seleccionados.",
  },
  {
    icon: <Package size={22} className="text-white" />,
    title: "Transporte Seguro",
    description:
      "Nuestras unidades cuentan con GPS y monitoreo para proteger tus envases PET durante todo el trayecto.",
  },
];

export function SectionVehiculos() {
  return (
    <SectionContent
      title="Logística propia para cada volumen y ubicación"
      subtitle="Nuestra flotilla propia nos permite adaptarnos a distintos volúmenes de entrega, desde pedidos pequeños hasta embarques completos, locales y foráneos, optimizando tiempos, cobertura y costos logísticos."
    >
      {/* VEHICLES GRID */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {vehicles.map((vehicle) => (
          <article
            key={vehicle.id}
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* IMAGE */}
            <div className={`relative h-52 overflow-hidden ${vehicle.color}`}>
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* BADGE */}
              <div className="absolute left-4 top-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-secondary shadow-md">
                {vehicle.badge}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-5">
              {/* TITLE */}
              <h3 className="mb-3 text-xl font-semibold text-secondary">
                {vehicle.name}
              </h3>

              {/* DESCRIPTION */}
              <p className="mb-5 text-sm leading-relaxed text-gray-600">
                {vehicle.description}
              </p>

              {/* SPECS */}
              <div className="space-y-4 border-t border-gray-100 pt-4">
                {/* VOLUME */}
                <div className="flex items-start gap-3">
                  <Package size={18} className="mt-0.5 shrink-0 text-primary" />

                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                      Volumen
                    </p>

                    <p className="text-sm font-semibold text-secondary">
                      {vehicle.volume}
                    </p>
                  </div>
                </div>

                {/* ROUTES */}
                <div className="flex items-start gap-3">
                  <MapPinned
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                  />

                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                      Cobertura
                    </p>

                    <p className="text-sm font-semibold text-secondary">
                      {vehicle.routes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* DIVIDER */}
      <div className="mt-20 border-t border-gray-200" />

      {/* HIGHLIGHTS */}
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {hilightsVehicles.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-md">
              {item.icon}
            </div>

            <h3 className="mb-2 text-lg font-semibold text-secondary">
              {item.title}
            </h3>

            <p className="text-sm leading-relaxed text-gray-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </SectionContent>
  );
}
