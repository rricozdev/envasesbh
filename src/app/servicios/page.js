import EtiquetadoSection from "@/components/features/servicios/EtiquetadoSection";
import PigmentacionSection from "@/components/features/servicios/PigmentaciónSection";
import ServicioCard from "@/components/features/servicios/ServicioCard";
import SectionContent from "@/components/ui/SectionContent";
import { servicios } from "@/data/servicios";
import Image from "next/image";

const [etiquetado, pigmentado] = servicios;

export const metadata = {
  title: "Servicios | Envases BH",
  description:
    "Conoce nuestros servicios de etiquetado en BOPP y pigmentación para envases plásticos. Soluciones técnicas para la industria alimentaria y agroindustrial.",
};

export default function ServiciosPage() {
  return (
    <>
      {/* Hero de sección */}
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
              Servicios de Acabado Etiquetado + Pigmentación
            </h1>

            <p className="font-secondary text-lg sm:text-xl text-primary font-bold mt-4">
              Para catálogo o personalización. Complementa tu envase con
              acabados profesionales.
            </p>

            <p className="text-gray-700 mt-4 leading-relaxed">
              Ya sea que compres del catálogo o personalices, ofrecemos
              servicios que transforman tu envase en producto final. Etiquetado
              + pigmentación. Rápido, profesional, local.
            </p>
          </div>

          {/* IMAGEN */}
          <div className="relative w-full lg:w-105 h-65 sm:h-80 lg:h-105 rounded-2xl overflow-hidden industrial-shadow">
            <Image
              src="/img/bg.webp"
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
