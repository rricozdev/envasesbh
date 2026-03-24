import Hero from "@/components/features/home/Hero";
import TestimonialsCarousel from "@/components/features/home/TestimonialsCarousel";
import {
  AlertTriangle,
  Lightbulb,
  MessageCircle,
  Tag,
  Palette,
  Check,
  Headphones,
  BadgeCheck,
  Building2,
  Calendar,
  Truck,
  Package,
  Gauge,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Envases PET de Calidad para Manufactura | Envases BH - México",

  description:
    "Fabricante y distribuidor de envases PET de calidad superior. Especificaciones exactas, entregas confiables, costos pskyecibles. Con opción de personalización según necesites.",

  canonical: "https://envasesbh.com.mx",

  keywords: [
    "envases PET México",
    "fabricante envases plásticos",
    "distribuidor PET",
    "envases de calidad",
    "proveedores de empaque",
    "envases a especificación",
    "envases personalizados",
  ],

  openGraph: {
    title: "Envases PET - Fabricante y Distribuidor en México",
    description:
      "Fabricamos y distribuimos envases PET de calidad. Especificaciones exactas, producción confiable, personalización disponible.",
    image: "/og-image.png",
    url: "https://envasesbh.com.mx",
  },
};

const services = [
  {
    id: 1,
    icon: <Tag className="w-5 h-5 text-primary" />,
    title: "Etiquetado Profesional",
    benefits: [
      "Colores duraderos (+2 años)",
      "Alta precisión en producción",
      "Refuerza tu identidad de marca",
    ],
    description:
      "Haz que tu producto destaque en estantería con etiquetas resistentes y de acabado profesional. Un envase perfecto sin la etiqueta adecuada es una oportunidad perdida.",
    image: "/img/etiquetado.png",
    cta: "Ver etiquetado",
    ctaHref: "#etiquetado",
  },
  {
    id: 2,
    icon: <Palette className="w-5 h-5 text-primary" />,
    title: "Pigmentación Personalizada",
    benefits: [
      "Colores exactos (Pantone)",
      "Alta resistencia química y UV",
      "Consistencia en cada lote",
    ],
    description:
      "Obtén colores precisos y consistentes sin comprometer calidad ni costos. Nuestra pigmentación personalizada asegura que tu producto mantenga su identidad visual en cada producción.",
    image: "/img/pigmentado.png",
    cta: "Ver pigmentación",
    ctaHref: "#pigmentacion",
  },
];

const vehicles = [
  {
    id: 1,
    name: "Van Pequeña",
    capacity: "500 kg",
    volume: "2.5 m³",
    maxWeight: "800 kg",
    description: "Perfecta para pedidos pequeños y entregas locales",
    image: "/images/fleet/van-pequena.jpg",
    color: "bg-blue-50",
  },
  {
    id: 2,
    name: "Van Mediana",
    capacity: "1,200 kg",
    volume: "5 m³",
    maxWeight: "2,000 kg",
    description: "Ideal para volúmenes medianos con entregas rápidas",
    image: "/images/fleet/van-mediana.jpg",
    color: "bg-indigo-50",
  },
  {
    id: 3,
    name: "Camión 3.5T",
    capacity: "2,500 kg",
    volume: "8.5 m³",
    maxWeight: "3,500 kg",
    description: "Solución versátil para cargas estándar",
    image: "/images/fleet/camion-35.jpg",
    color: "bg-teal-50",
  },
  {
    id: 4,
    name: "Camión 5T",
    capacity: "4,000 kg",
    volume: "12 m³",
    maxWeight: "5,000 kg",
    description: "Para grandes volúmenes de envases PET",
    image: "/images/fleet/camion-5t.jpg",
    color: "bg-cyan-50",
  },
  {
    id: 5,
    name: "Tráiler",
    capacity: "8,000 kg",
    volume: "25 m³",
    maxWeight: "12,000 kg",
    description: "Máxima capacidad para entregas en volumen",
    image: "/images/fleet/trailer.jpg",
    color: "bg-sky-50",
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

const card_problem_solution = [
  {
    id: 1,
    problem: "Proveedores No Confiables",
    description:
      "Cambios inesperados, entregas incumplidas y productos fuera de especificación.",
    hilights: ["Paros de producción", "Devoluciones"],
    title_solution: "Servicio Consultivo Integral",
    solution:
      "Alineación total contigo, entregas a domicilio y precisión en cada pedido.",
    icon: <AlertTriangle size={20} />,
  },
  {
    id: 2,
    problem: "Falta de Asesoría Técnica",
    description:
      "Te venden sin entender tu operación ni lo que realmente necesitas.",
    hilights: ["Sobrecostos", "Ineficiencia"],
    title_solution: "Asesoramiento Experto Continuo",
    solution:
      "Asesoría experta para elegir envases optimizados para tu proceso, que maximizan rendimiento.",
    icon: <Lightbulb size={20} />,
  },
  {
    id: 3,
    problem: "Comunicación Ineficiente",
    description:
      "Respuestas lentas, falta de seguimiento y procesos poco claros que generan estrés operativo.",
    hilights: ["Retrasos", "Estrés operativo"],
    title_solution: "Comunicación Directa",
    solution: "Comunicación directa, rápida y seguimiento constante.",
    icon: <AlertTriangle size={20} />,
  },
];

export default function Home() {
  return (
    <>
      <Hero
        variant="left"
        title={
          <>
            Fabricante de <span className="text-primary">Envases PET</span>,
            para la industria mexicana
          </>
        }
        description={
          <>
            Producimos{" "}
            <span className="font-medium">envases PET de alta calidad</span>,
            fabricados con los estándares más exigentes de la industria. Cuando
            tu operación lo requiere, también los personalizamos según tus
            especificaciones exactas.
          </>
        }
        highlights={[
          "Precios competitivos",
          "Entregas a domicilio",
          "Envases Personalizables",
        ]}
        imageDesktop="/og-image.png"
        imageMobile="/mobile.jpeg"
        primaryAction={{ label: "Agendar Consultoría" }}
        secondaryAction={{ label: "Ver Catálogo" }}
      />

      {/* SECCIÓN DE PROBLEMAS Y SOLUCIONES */}
      <section className="relative py-20 px-4 lg:px-0 bg-linear-to-b from-[#f9fafb] to-[#f1f5f9]">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          {/* HEADER */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary/90 font-heading leading-tight">
              ¿Por Qué Cambiar De Proveedor?
            </h2>
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-600">
              No es solo un proveedor. Es una decisión que impacta tu operación,
              tus costos y tu crecimiento.
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {card_problem_solution.map((item) => (
              <div
                key={item.id}
                className="group relative p-[1px] rounded-2xl bg-linear-to-b from-gray-200 to-transparent hover:from-primary/40 transition"
              >
                <div className="h-full bg-white/80 backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-xl transition">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-sky-100 text-primary">
                    {item.icon}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.problem}
                  </h3>

                  <p className="text-sm text-gray-600">{item.description}</p>

                  <div>
                    <p className="mb-2">Ocacionando: </p>
                    <div className="flex flex-wrap gap-2">
                      {item.hilights.map((h, i) => (
                        <span
                          key={i}
                          className="text-xs bg-sky-50 text-primary px-2 py-1 rounded-md"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* SOLUTION BLOCK */}
                  <div className="bg-sky-50 rounded-lg p-4 ">
                    <h4 className="text-sm font-semibold text-primary mb-1">
                      Nuestra solución
                    </h4>
                    <p className="text-sm font-medium text-gray-800 mb-1">
                      {item.title_solution}
                    </p>
                    <p className="text-sm text-gray-600">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN DE SERVICIOS */}
      <section className="py-20 px-4 md:py-28 lg:px-0 bg-white">
        <div className="container mx-auto max-w-5xl">
          {/* HEADER */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-heading text-3xl md:text-5xl font-semibold tracking-tight text-secondary">
              Potencia tu Empaque con Servicios Especializados
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg">
              Servicios diseñados para elevar la percepción y rendimiento de tu
              producto.
            </p>
          </div>

          {/* GRID */}
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.id}
                className="group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* IMAGE */}
                <div className="relative h-52 w-full overflow-hidden rounded-t-xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* ICON FLOAT */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-2 rounded-lg shadow">
                    {service.icon}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-secondary">
                    {service.title}
                  </h3>

                  {/* BENEFITS */}
                  <ul className="mb-4 space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex gap-2 text-sm text-gray-600"
                      >
                        <Check className="w-4 h-4 text-primary mt-1" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* SHORT DESC */}
                  <p className="mb-5 text-sm text-gray-500">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <Link
                    href={service.ctaHref}
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all hover:bg-sky-100 rounded-md py-2 px-3"
                  >
                    {service.cta} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:py-28 lg:px-0 bg-linear-to-b from-white to-gray-50">
        <div className="container max-w-6xl mx-auto">
          {/* HEADER SECCIÓN */}
          <div className="mb-16 text-center animate-fade-in">
            <h2 className="mb-4 font-heading text-4xl font-semibold tracking-tight text-secondary md:text-5xl">
              Desde nuetra fabrica hasta tu puerta
            </h2>
            <p className="mx-auto max-w-2xl text-base font-body text-secondary md:text-lg">
              Con 5 opciones de transporte de diferentes capacidades,
              garantizamos que tu envío llega seguro, a tiempo y en las mejores
              condiciones. Una flota diseñada para tu negocio.
            </p>
          </div>

          {/* GRID DE VEHÍCULOS */}
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
                      <Package
                        size={16}
                        className="text-primary flex-shrink-0"
                      />
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

          {/* DIVIDER */}
          <div className="mt-16 border-t border-gray-200"></div>

          {/* VALUE PROPOSITION */}
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
        </div>
      </section>

      <section className="py-20 px-4 md:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-semibold text-secondary">
              Empresas que Confían en Nosotros
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Resultados reales en operaciones reales.
            </p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      <section className="py-20 px-4 md:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold text-secondary">
              ¿Por Qué Elegirnos?
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Experiencia, respaldo y compromiso real con tu operación.
            </p>
          </div>

          {/* GRID */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* ITEM 1 */}
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 text-primary">
                <Calendar size={22} />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">
                10+ Años de Experiencia
              </h3>
              <p className="text-sm text-gray-600">
                Más de una década resolviendo desafíos reales en manufactura.
              </p>
            </div>

            {/* ITEM 2 */}
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 text-primary">
                <Building2 size={22} />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">
                +500 Empresas
              </h3>
              <p className="text-sm text-gray-600">
                Confían en nosotros en industrias como alimentos, químicos y
                consumo masivo.
              </p>
            </div>

            {/* ITEM 3 */}
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 text-primary">
                <BadgeCheck size={22} />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">
                Calidad Garantizada
              </h3>
              <p className="text-sm text-gray-600">
                Cumplimos especificaciones técnicas y estándares en cada lote.
              </p>
            </div>

            {/* ITEM 4 */}
            <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 text-primary">
                <Headphones size={22} />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">
                Soporte Ágil
              </h3>
              <p className="text-sm text-gray-600">
                Respuesta rápida cuando lo necesitas, sin fricción ni
                intermediarios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:py-28 lg:px-0 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-linear-to-r from-primary to-primary rounded-xl p-8 md:p-12 lg:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para llevar tu empaque al siguiente nivel?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Contáctanos hoy mismo para una consulta personalizada y descubre
              cómo podemos ayudarte a destacar en el mercado.
            </p>
            <Link
              href="/contacto"
              className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Solicitar Cotización
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
