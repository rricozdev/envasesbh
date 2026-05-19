import SectionContent from "@/components/ui/SectionContent";
import { Gauge, MapPinned, Package, Truck } from "lucide-react";
import Image from "next/image";

const vehicles = [
  {
    id: 1,
    name: "Camión 48T",
    description:
      "Máxima capacidad y eficiencia para transportar grandes volúmenes en rutas locales y de larga distancia.",
    image: "/img/flota/camion_48T.webp",
    color: "bg-indigo-50",
    volume: "Volumen extra grande",
    routes: "Locales y largas distancias",
    capacity: "48 toneladas",
  },
  {
    id: 2,
    name: "Camión 20T",
    description:
      "Excelente espacio y rendimiento para mover grandes volúmenes en entregas locales y foráneas.",
    image: "/img/flota/camion_20_T.webp",
    color: "bg-blue-50",
    volume: "Volumen grande",
    routes: "Locales y foráneos",
    capacity: "20 toneladas",
  },
  {
    id: 3,
    name: "Camión 9.5T",
    description:
      "Gran capacidad de carga, ideal para recorridos locales y envíos foráneos con total versatilidad.",
    image: "/img/flota/camion_10T.webp",
    color: "bg-teal-50",
    volume: "Volumen grande",
    routes: "Locales y foráneos",
    capacity: "9.5 toneladas",
  },
  {
    id: 4,
    name: "Camioneta 3T",
    description:
      "Capacidad intermedia con gran maniobrabilidad, perfecta para entregas locales y accesos reducidos.",
    image: "/img/flota/camioneta_3T.webp",
    color: "bg-cyan-50",
    volume: "Volumen intermedio",
    routes: "Viajes locales",
    capacity: "3 toneladas",
  },
];

const hilights_vehicles = [
  {
    icon: <Truck size={24} className="text-white" />,
    title: "Flota Especializada",
    description:
      "Contamos con diferentes unidades para adaptarnos a cada volumen y tipo de entrega.",
  },
  {
    icon: <Gauge size={24} className="text-white" />,
    title: "Cobertura Flexible",
    description:
      "Realizamos entregas locales y foráneas con eficiencia y seguridad.",
  },
  {
    icon: <Package size={24} className="text-white" />,
    title: "Transporte Seguro",
    description:
      "Nuestras unidades están acondicionadas para proteger tus envases PET durante todo el trayecto.",
  },
];

export function SectionVehiculos() {
  return (
    <SectionContent
      title="Tus envases PET directo a la puerta de tu negocio"
      subtitle="Nuestra flota especializada garantiza entregas seguras, rápidas y eficientes para que tus productos lleguen en perfectas condiciones a cualquier parte de México."
    >
      {/* VEHICLES GRID */}
      <div className="grid gap-8 md:grid-cols-2">
        {vehicles.map((vehicle, index) => (
          <article
            key={vehicle.id}
            className={`group animate-fade-in overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
              index === 0
                ? "delay-100"
                : index === 1
                  ? "delay-200"
                  : index === 2
                    ? "delay-300"
                    : "delay-400"
            }`}
          >
            {/* IMAGE */}
            <div className={`relative h-72 overflow-hidden ${vehicle.color}`}>
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* CAPACITY BADGE */}
              <div className="absolute left-5 top-5 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white shadow-md">
                {vehicle.capacity}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-7">
              {/* TITLE */}
              <h3 className="mb-4 font-heading text-2xl font-semibold text-secondary">
                {vehicle.name}
              </h3>

              {/* DESCRIPTION */}
              <p className="mb-6 text-base leading-relaxed text-gray-600">
                {vehicle.description}
              </p>

              {/* SPECS */}
              <div className="flex flex-row space-x-4 border-t border-gray-100 pt-5">
                {/* VOLUME */}
                <div className="flex items-start gap-3">
                  <Package size={20} className="mt-0.5 shrink-0 text-primary" />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
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
                    size={20}
                    className="mt-0.5 shrink-0 text-primary"
                  />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Cobertura
                    </p>

                    <p className="text-sm font-semibold text-secondary">
                      {vehicle.routes}
                    </p>
                  </div>
                </div>

                {/* CAPACITY */}
                <div className="flex items-start gap-3">
                  <Gauge size={20} className="mt-0.5 shrink-0 text-primary" />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Capacidad
                    </p>

                    <p className="text-sm font-semibold text-secondary">
                      {vehicle.capacity}
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
      <div className="mt-16 grid gap-8 md:grid-cols-3 animate-fade-in delay-500">
        {hilights_vehicles.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-md">
              {item.icon}
            </div>

            <h3 className="mb-2 font-heading text-lg font-semibold text-secondary">
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
