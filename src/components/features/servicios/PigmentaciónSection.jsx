import Button from "@/components/ui/Button";
import SectionContent from "@/components/ui/SectionContent";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { ArrowRight, CheckCircle2, Palette } from "lucide-react";
import Image from "next/image";

const benefits = [
  {
    title: "Colores Personalizados",
    description: "Desarrollo e igualación de colores específicos para tu marca",
  },
  {
    title: "Acabado Profesional",
    description: "Pigmentación uniforme con excelente presentación visual",
  },
  {
    title: "Variedad De Línea",
    description:
      "Disponibilidad de múltiples colores para diferentes tipos de envases",
  },
];

export default function PigmentacionSection({ pigmentado }) {
  return (
    <SectionContent
      id={pigmentado.id}
      containerClassName="bg-secondary/5"
      key={pigmentado.id}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch h-full ">
        <div className="flex flex-col">
          <span className="font-primary text-xs text-primary uppercase tracking-wider mb-2 block">
            Pigmentación PET · Personalización de Color
          </span>

          <h2 className="font-primary text-[32px] font-bold text-secondary leading-tight">
            Dale personalidad y diferenciación a tus envases
          </h2>

          <p className="mt-4 mb-6 text-secondary text-body-md leading-relaxed max-w-xl">
            Creamos envases con colores personalizados que elevan la percepción
            de tu producto y fortalecen la presencia visual de tu marca en el
            mercado.
          </p>

          <div className="relative rounded-2xl overflow-hidden shadow-lg h-64 md:h-80">
            <Image
              alt="Servicio de pigmentación para envases PET"
              fill
              priority
              className="object-cover object-center"
              src="/img/img_etiquetado.webp"
            />
          </div>
        </div>

        <div className="p-8 rounded-2xl flex flex-col h-full border border-primary/25 bg-white shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/15">
              <Palette className="w-5 h-5 text-primary" />
            </div>

            <h3 className="font-primary text-xl md:text-2xl font-semibold text-on-surface leading-tight">
              Servicio de Pigmentación
            </h3>
          </div>

          <p className="text-secondary mb-5 leading-relaxed">
            Ofrecemos pigmentación para distintos envases PET con opciones de
            colores de línea y desarrollo de tonalidades personalizadas para
            fortalecer la identidad visual de tu marca.
          </p>

          {/* BENEFITS */}
          <div className="space-y-3 mb-8">
            {benefits.map((e) => (
              <div
                key={e.title}
                className="group flex items-start gap-2 p-1 rounded-xl transition-all duration-300 hover:bg-primary/5"
              >
                <div className="shrink-0 w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center mt-0.5 group-hover:bg-primary/25 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-on-surface text-sm md:text-base leading-snug">
                    {e.title}
                  </p>

                  <p className="text-secondary text-xs md:text-sm leading-relaxed mt-1">
                    {e.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Button
            label="Solicitar Cotización"
            sendMessageWassap={
              "Hola, me gustaría obtener más información sobre el servicio de pigmentación."
            }
            number={WHATSAPP_NUMBER}
            className="group inline-flex items-center justify-center gap-2 w-full border border-primary text-primary font-semibold py-3 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
          >
            Quiero este servicio
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </SectionContent>
  );
}
