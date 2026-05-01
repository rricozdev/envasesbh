import SectionContent from "@/components/ui/SectionContent";
import { Gauge, Package, Truck } from "lucide-react";

const vehicles = [
  {
    id: 1,
    name: "Van Pequeña",
    capacity: "500 kg",
    volume: "2.5 m³",
    maxWeight: "800 kg",
    description: "Perfecta para pedidos pequeños y entregas locales",
    image: "/van-pequena.webp",
    color: "bg-blue-50",
  },
  {
    id: 2,
    name: "Van Mediana",
    capacity: "1,200 kg",
    volume: "5 m³",
    maxWeight: "2,000 kg",
    description: "Ideal para volúmenes medianos con entregas rápidas",
    image: "/vans.webp",
    color: "bg-indigo-50",
  },
  {
    id: 3,
    name: "Camión 3.5T",
    capacity: "2,500 kg",
    volume: "8.5 m³",
    maxWeight: "3,500 kg",
    description: "Solución versátil para cargas estándar",
    image: "/camion35t.png",
    color: "bg-teal-50",
  },
];

const hilights_vehicles = [
  {
    icon: <Truck size={24} className="text-gray-100" />,
    title: "Flota Diversa",
    description: "5 opciones de transporte para cada tipo de carga y volumen",
  },
  {
    icon: <Gauge size={24} className="text-gray-100" />,
    title: "Capacidad Flexible",
    description: "Desde 500 kg hasta 12 toneladas en un solo proveedor",
  },
  {
    icon: <Package size={24} className="text-gray-100" />,
    title: "Entrega Segura",
    description:
      "Todas nuestras unidades están preparadas para envases frágiles",
  },
];
export function SectionVehiculos() {
  return (
    <SectionContent>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle, index) => (
          <div
            key={vehicle.id}
            className={`group animate-fade-in rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
              index === 0
                ? "delay-100"
                : index === 1
                  ? "delay-200"
                  : index === 2
                    ? "delay-300"
                    : index === 3
                      ? "delay-400"
                      : "delay-500"
            }`}
          >
            {/* IMAGE CONTAINER */}
            <div
              className={`relative h-48 w-full overflow-hidden ${vehicle.color} transition-all duration-500`}
            >
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
              />
              {/* OVERLAY linear */}
              <div className="absolute inset-0 bg-linear-to-t from-black to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
            </div>

            {/* CONTENT */}
            <div className="p-5">
              {/* TITLE & BADGE */}
              <div className="mb-4 flex items-start justify-between gap-2">
                <h3 className="font-heading text-lg font-semibold tracking-tight text-secondary flex-1">
                  {vehicle.name}
                </h3>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  {vehicle.capacity}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="mb-4 text-sm font-body text-secondary leading-relaxed">
                {vehicle.description}
              </p>

              {/* SPECS */}
              <div className=" border-gray-200 flex flex-col gap-2">
                {/* Volume */}
                <div className="flex items-center gap-3">
                  <Truck size={16} className="text-primary shrink-0" />
                  <span className="text-xs font-body text-gray-600">
                    Volumen:{" "}
                    <span className="font-semibold text-secondary">
                      {vehicle.volume}
                    </span>
                  </span>
                </div>

                {/* Weight */}
                <div className="flex items-center gap-3">
                  <Package size={16} className="text-primary flex-shrink-0" />
                  <span className="text-xs font-body text-gray-600">
                    Peso máximo:{" "}
                    <span className="font-semibold text-secondary">
                      {vehicle.maxWeight}
                    </span>
                  </span>
                </div>

                {/* Capacity */}
                <div className="flex items-center gap-3">
                  <Gauge size={16} className="text-primary flex-shrink-0" />
                  <span className="text-xs font-body text-gray-600">
                    Carga útil:{" "}
                    <span className="font-semibold text-secondary">
                      {vehicle.capacity}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 border-t border-gray-200"></div>
      <div className="mt-16 grid gap-8 md:grid-cols-3 animate-fade-in delay-500">
        {hilights_vehicles.map((item, i) => {
          return (
            <div key={i} className="text-center">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary bg-opacity-10">
                {item.icon}
              </div>
              <h3 className="mb-2 font-heading text-lg font-semibold text-secondary">
                {item.title}
              </h3>
              <p className="text-sm font-body text-secondary">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </SectionContent>
  );
}
