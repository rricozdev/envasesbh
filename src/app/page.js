import Hero from "@/components/features/home/Hero";
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

const testimonials = [
  {
    id: 1,
    company: "Bebidas Industriales XYZ",
    sector: "Bebidas",
    result: "Redujeron rechazos en producción en 85%",
    metrics: ["85% menos rechazos", "Paros casi 0", "35% ahorro total"],
    quote: "Finalmente tenemos un proveedor que entiende operaciones.",
    role: "Gerente de Operaciones",
  },
  {
    id: 2,
    company: "Químicos Especializados ABC",
    sector: "Químicos",
    result: "Cero fugas en productos corrosivos",
    metrics: ["0 fugas", "Cumple regulaciones", "100% menos reclamos"],
    quote: "Por fin un envase que realmente soporta nuestras condiciones.",
    role: "Jefe de Producción",
  },
  {
    id: 3,
    company: "Alimentos Frescos DEF",
    sector: "Alimentos",
    result: "Implementaron envases sostenibles sin aumentar costos",
    metrics: [
      "40% menos huella",
      "Sin cambios en líneas",
      "Mayor valor de marca",
    ],
    quote: "Logramos sostenibilidad sin afectar nuestros márgenes.",
    role: "Director de Operaciones",
  },
];

export default function Home() {
  return (
    <>
      <Hero
        variant="left"
        title={
          <>
            Distribuidor y Fabricante de{" "}
            <span className="text-primary">Envases PET</span>, para la industria
            mexicana
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
          "Costos competitivos",
          "Entregas garantizadas",
          "Envases Personalizables",
        ]}
        imageDesktop="/og-image.png"
        imageMobile="/mobile.jpeg"
        primaryAction={{ label: "Agendar Consultoría" }}
        secondaryAction={{ label: "Ver Catálogo" }}
      />

      <section className="relative py-20 px-4 lg:px-0 bg-gradient-to-b from-[#f9fafb] to-[#f1f5f9]">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          {/* HEADER */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-heading leading-tight">
              ¿Por Qué Cambiar De Proveedor?
            </h2>
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-600">
              No es solo un proveedor. Es una decisión que impacta tu operación,
              tus costos y tu crecimiento.
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {/* CARD 1 */}
            <div className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-gray-200 to-transparent hover:from-primary/40 transition">
              <div className="h-full bg-white/80 backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-5 shadow-sm hover:shadow-xl transition">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-sky-100 text-primary">
                  <AlertTriangle size={20} />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  Proveedores No Confiables
                </h3>

                <p className="text-sm text-gray-600">
                  Cambios inesperados, entregas incumplidas y productos fuera de
                  especificación.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-sky-50 text-primary px-2 py-1 rounded-md">
                    Paros de producción
                  </span>
                  <span className="text-xs bg-sky-50 text-primary px-2 py-1 rounded-md">
                    Devoluciones
                  </span>
                </div>

                {/* SOLUTION BLOCK */}
                <div className="bg-sky-50 rounded-lg p-4 mt-auto">
                  <h4 className="text-sm font-semibold text-primary mb-1">
                    Nuestra solución
                  </h4>
                  <p className="text-sm text-gray-600">
                    Alineación total contigo, entregas garantizadas y precisión
                    en cada pedido.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-gray-200 to-transparent hover:from-primary/40 transition">
              <div className="h-full bg-white/80 backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-5 shadow-sm hover:shadow-xl transition">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-sky-100 text-primary">
                  <Lightbulb size={20} />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  Falta de Asesoría Técnica
                </h3>

                <p className="text-sm text-gray-600">
                  Te venden sin entender tu operación ni lo que realmente
                  necesitas.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-sky-50 text-primary px-2 py-1 rounded-md">
                    Sobrecostos
                  </span>
                  <span className="text-xs bg-sky-50 text-primary px-2 py-1 rounded-md">
                    Ineficiencia
                  </span>
                </div>

                <div className="bg-sky-50 rounded-lg p-4 mt-auto">
                  <h4 className="text-sm font-semibold text-primary mb-1">
                    Nuestra solución
                  </h4>
                  <p className="text-sm text-gray-600">
                    Asesoría experta para elegir envases optimizados para tu
                    proceso.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-gray-200 to-transparent hover:from-primary/40 transition">
              <div className="h-full bg-white/80 backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-5 shadow-sm hover:shadow-xl transition">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-sky-100 text-primary">
                  <MessageCircle size={20} />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  Comunicación Ineficiente
                </h3>

                <p className="text-sm text-gray-600">
                  Respuestas lentas, falta de seguimiento y procesos poco
                  claros.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-sky-50 text-primary px-2 py-1 rounded-md">
                    Retrasos
                  </span>
                  <span className="text-xs bg-sky-50 text-primary px-2 py-1 rounded-md">
                    Estrés operativo
                  </span>
                </div>

                <div className="bg-sky-50 rounded-lg p-4 mt-auto">
                  <h4 className="text-sm font-semibold text-primary mb-1">
                    Nuestra solución
                  </h4>
                  <p className="text-sm text-gray-600">
                    Comunicación directa, rápida y seguimiento constante.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

          {/* CAROUSEL */}
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="min-w-[300px] md:min-w-[400px] snap-start bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition"
              >
                {/* COMPANY */}
                <p className="text-xs text-gray-400 mb-2">
                  {item.company} · {item.sector}
                </p>

                {/* RESULT */}
                <h3 className="text-lg font-semibold text-secondary mb-4">
                  {item.result}
                </h3>

                {/* METRICS */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.metrics.map((m, i) => (
                    <span
                      key={i}
                      className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-md"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* TESTIMONIAL */}
                <p className="text-sm text-gray-600 italic mb-4">
                  {item.quote}
                </p>

                {/* ROLE */}
                <p className="text-xs text-gray-400">— {item.role}</p>
              </div>
            ))}
          </div>
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

      {/* ===== CTA ===== */}
      <section className="py-20 px-4 md:py-28 lg:px-0 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-r from-primary to-primary rounded-xl p-8 md:p-12 lg:p-16 text-white text-center">
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
