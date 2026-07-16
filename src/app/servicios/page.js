import dynamic from "next/dynamic";
import SectionContent from "@/components/ui/SectionContent";
import { servicios } from "@/data/servicios";
import { baseMetadata } from "@/lib/metadata-config";
import Image from "next/image";

const PigmentacionSection = dynamic(
  () => import("@/components/features/servicios/PigmentaciónSection"),
  { ssr: true }
);

const [etiquetado, pigmentado] = servicios;

export const metadata = {
  ...baseMetadata,

  title: "Servicios de Pigmentación para Envases PET",
  description:
    "Servicios profesionales de pigmentación PET para envases. Personalización de color, acabado profesional y diseño exacto para bebidas, alimentos y agroindustria.",
  keywords: [
    "pigmentación PET",
    "botellas etiquetadas",
    "personalización de color",
    "acabado profesional",
  ],

  openGraph: {
    ...baseMetadata.openGraph,
    title: "Servicios de Pigmentación | Envases BH",
    description:
      "Transforma tus envases con nuestros servicios de pigmentación de alta precisión. Personalización de color y acabado profesional.",
    url: "https://www.envasesbh.mx/servicios",
    type: "website",
    images: [
      {
        url: "https://www.envasesbh.mx/img/servicios_etiquetado_pigmentacion.webp",
        width: 1200,
        height: 630,
        alt: "Servicios de pigmentación para envases",
        type: "image/webp",
      },
    ],
  },

  twitter: {
    ...baseMetadata.twitter,
    title: "Servicios de Pigmentación | Envases BH",
    description:
      "Personaliza tus envases con pigmentación PET profesional. Alta precisión y acabado de calidad.",
    image: "https://www.envasesbh.mx/img/servicios_etiquetado_pigmentacion.webp",
  },

  alternates: {
    canonical: "https://www.envasesbh.mx/servicios",
    languages: {
      "es-MX": "https://www.envasesbh.mx/servicios",
      es: "https://www.envasesbh.mx/servicios",
      "x-default": "https://www.envasesbh.mx/servicios",
    },
  },
};

export default function ServiciosPage() {
  return (
    <>
      <SectionContent>
        {/* CONTENIDO */}
        <div className="flex flex-col md:flex-row gap-6">
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
              la diferencia. Con nuestros servicios de pigmentación,
              transformamos envases en productos con identidad, presencia y
              valor para tu marca.
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
      </SectionContent>
      <PigmentacionSection pigmentado={pigmentado} key={pigmentado.id} />
    </>
  );
}
