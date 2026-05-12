import EtiquetadoSection from "@/components/features/servicios/EtiquetadoSection";
import PigmentacionSection from "@/components/features/servicios/PigmentaciónSection";
import { servicios } from "@/data/servicios";
import Image from "next/image";

const [etiquetado, pigmentado] = servicios;

export const metadata = {
  title: "Servicios de Etiquetado y Pigmentación | Envases BH",
  description:
    "Servicios profesionales de etiquetado BOPP y pigmentación PET para envases. Personalización de color, acabado profesional y diseño exacto para bebidas, alimentos y agroindustria.",
  keywords: [
    "etiquetado BOPP",
    "pigmentación PET",
    "envases personalizados",
    "etiquetas industriales",
    "botellas etiquetadas",
    "pigmentación de envases",
  ],
  openGraph: {
    title: "Servicios de Etiquetado y Pigmentación | Envases BH",
    description:
      "Transforma tus envases con nuestros servicios de etiquetado y pigmentación de alta precisión.",
    images: [
      {
        url: "/img/servicios_etiquetado_pigmentacion.webp",
        width: 1200,
        height: 630,
        alt: "Servicios de etiquetado y pigmentación para envases",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios de Etiquetado y Pigmentación | Envases BH",
    description:
      "Personaliza tus envases con etiquetado BOPP y pigmentación PET profesional.",
  },
};

export default function ServiciosPage() {
  return (
    <>
      <section className="relative flex items-center overflow-hidden py-16 lg:py-24">
        <div className="z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-12 items-center">
          {/* CONTENIDO */}
          <div className="z-10 max-w-xl text-center lg:text-left">
            {/* BADGE MEJORADO */}
            <span className="inline-flex items-center gap-2 bg-black/5 border border-black/10 text-black/80 text-[10px] font-medium uppercase tracking-wide px-3 py-1 rounded-full mx-auto lg:mx-0">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Máxima precisión industrial
            </span>

            <h1 className="font-primary text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black leading-tight mt-5">
              Tu envase merece el acabado perfecto
            </h1>

            <p className="font-secondary text-lg sm:text-xl text-primary font-bold mt-4">
              Del catálogo a tu marca, hacemos que destaque.
            </p>

            <p className="text-gray-700 mt-4 leading-relaxed">
              En un mercado PET cada vez más competitivo, la presentación marca
              la diferencia. Con nuestros servicios de etiquetado y
              pigmentación, transformamos envases en productos con identidad,
              presencia y valor para tu marca.
            </p>
          </div>

          {/* IMAGEN */}
          <div className="relative w-full lg:w-105 h-65 sm:h-80 lg:h-105 rounded-2xl overflow-hidden industrial-shadow">
            <Image
              src="/img/servicios_etiquetado_pigmentacion.webp"
              alt="Servicios de acabado industrial"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </section>
      <EtiquetadoSection etiquetado={etiquetado} key={etiquetado.id} />
      <PigmentacionSection pigmentado={pigmentado} key={pigmentado.id} />
    </>
  );
}
