import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  Factory,
  Truck,
  ShieldCheck,
  CalendarDays,
  Package,
  MapPin,
} from "lucide-react";

export const metadata = {
  title: "Quiénes Somos | Envases BH",
  description:
    "Más de 20 años fabricando envases PET de calidad en México. Conoce nuestra historia, infraestructura y compromiso con la industria.",
  alternates: {
    canonical: "https://envasesbh.mx/quienes-somos",
  },
  openGraph: {
    title: "Quiénes Somos | Envases BH",
    description:
      "Empresa 100% mexicana con más de 20 años fabricando envases PET para la industria alimentaria, cosmética, química y hotelera.",
    url: "https://envasesbh.mx/quienes-somos",
    siteName: "Envases BH",
    locale: "es_MX",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Envases BH SA de CV",
  url: "https://envasesbh.mx",
  foundingDate: "2000",
  foundingLocation: {
    "@type": "Place",
    name: "Estado de México, México",
  },
  description:
    "Empresa 100% mexicana con más de 20 años de experiencia en la fabricación de envases PET para múltiples industrias.",
  areaServed: {
    "@type": "Country",
    name: "México",
  },
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 50,
  },
};

const metricas = [
  { icono: CalendarDays, valor: "20+", label: "Años de experiencia" },
  { icono: Factory, valor: "13", label: "Máquinas productivas" },
  { icono: Package, valor: "25 ml – 10 lt", label: "Rango de envases" },
  { icono: MapPin, valor: "Edo. México", label: "Zona estratégica nacional" },
];

const pilares = [
  {
    icono: Factory,
    titulo: "Infraestructura robusta",
    texto:
      "Nave industrial moderna con andenes para carga y descarga aptos para tráiler de doble caja, y departamentos dedicados de producción, mantenimiento y calidad.",
  },
  {
    icono: ShieldCheck,
    titulo: "Tecnología de punta",
    texto:
      "Maquinaria japonesa y europea que garantiza precisión, consistencia y calidad en cada lote de envases fabricados.",
  },
  {
    icono: Truck,
    titulo: "Logística propia",
    texto:
      "Flota de transporte propio — camionetas, tórtones y jaulas — para atender clientes en todos los estados de la República Mexicana.",
  },
];

export default function QuienesSomosPage() {
  return (
    <main className="bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <div className="bg-dark py-20">
        <Container>
          <div className="max-w-2xl">
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold uppercase tracking-widest">
              Nuestra Historia
            </span>
            <SectionTitle className="text-white">
              Quiénes <span className="text-primary italic">Somos</span>
            </SectionTitle>
            <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-xl">
              Más de dos décadas fabricando envases PET con calidad, tecnología
              y compromiso 100% mexicano.
            </p>
          </div>
        </Container>
      </div>

      {/* ── Métricas ── */}
      <div className="bg-primary/5 border-y border-primary/10 py-12">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metricas.map(({ icono: Icon, valor, label }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="p-3 rounded-xl bg-primary/10">
                  <Icon className="text-primary" size={22} strokeWidth={1.8} />
                </div>
                <span className="font-sans text-2xl font-bold text-dark">
                  {valor}
                </span>
                <span className="text-secondary/70 text-xs uppercase tracking-wider">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── Historia: imagen + texto ── */}
      <Container>
        <section className="py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Imagen */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/img/about_us.png"
              alt="Instalaciones de Envases BH en el Estado de México"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-primary/10" />
            {/* Badge fundación */}
            <div className="absolute bottom-4 left-4 bg-dark/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl">
              <span className="text-primary font-bold text-lg">2000</span>
              <span className="text-white/70 text-xs block">
                Año de fundación
              </span>
            </div>
          </div>

          {/* Texto */}
          <div className="flex flex-col justify-center">
            <span className="inline-block self-start mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">
              Empresa 100% mexicana
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-dark leading-tight">
              Dos décadas construyendo confianza en la industria
            </h2>
            <div className="mt-4 space-y-3 text-secondary/80 text-sm leading-relaxed">
              <p>
                Envases BH SA de CV nació en el año 2000 con dos máquinas y un
                propósito claro: fabricar envases de calidad para agua
                purificada. Con esfuerzo y visión, crecimos hasta contar con{" "}
                <strong className="text-dark">13 máquinas productivas</strong> y
                presencia en toda la República Mexicana.
              </p>
              <p>
                Hoy atendemos industrias tan diversas como alimentos, cosmética,
                química, limpieza y amenidades hoteleras, con envases que van
                desde los{" "}
                <strong className="text-dark">
                  25 ml hasta garrafas de 10 litros
                </strong>
                .
              </p>
              <p>
                Ubicados en una moderna nave industrial en el Estado de México —
                zona estratégica con acceso para tráiler de doble caja —
                contamos con personal especializado y maquinaria japonesa y
                europea de tecnología de punta.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/contacto"
                className="inline-block px-8 py-3 bg-primary text-white text-xs font-bold uppercase tracking-[0.18em] rounded-full hover:bg-accent transition-colors duration-300 shadow-md"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </section>

        {/* ── Pilares ── */}
        <section className="pb-20 border-t border-gray-100 pt-16">
          <div className="text-center mb-12">
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">
              Por qué elegirnos
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-dark">
              Lo que nos respalda
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pilares.map(({ icono: Icon, titulo, texto }) => (
              <div
                key={titulo}
                className="p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="text-primary" size={22} strokeWidth={1.8} />
                </div>
                <h3 className="font-sans font-bold text-dark text-base mb-2">
                  {titulo}
                </h3>
                <p className="text-secondary/75 text-sm leading-relaxed">
                  {texto}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
