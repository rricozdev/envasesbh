import Button from "@/components/ui/Button";
import SectionContent from "@/components/ui/SectionContent";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { ArrowRight, BadgeCheck, CheckCircle2, Package } from "lucide-react";
import Image from "next/image";

const benefits = [
  {
    title: "Diseño Exacto",
    description: "Logo, colores y tipografía sin compromisos",
  },
  {
    title: "Velocidad Real",
    description: "Producción y entrega en tiempos competitivos",
  },
];

const containers = [
  "250 ml Sinfín",
  "1.5 lt Sinfín",
  "355 ml Sinfín",
  "1 lt Agro",
  "500 ml Sinfín",
  "355 y 500 ml Júbilo",
  "1 lt Sinfín",
  "355, 600 y 900 ml Boston",
];

export default function EtiquetadoSection({ etiquetado }) {
  return (
    <SectionContent
      id={etiquetado.id}
      containerClassName="bg-secondary/5"
      key={etiquetado.id}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch h-full">
        {/* LEFT CONTENT */}
        <div className="flex flex-col">
          <span className="font-primary text-xs text-primary uppercase tracking-wider mb-2 block">
            Etiqueta BOPP · División alimentos y bebidas
          </span>

          <h2 className="font-primary text-[32px] font-bold text-secondary leading-tight">
            Dale identidad a tus botellas de catálogo
          </h2>

          <p className="mt-4 mb-6 text-secondary text-body-md leading-relaxed max-w-xl">
            Personalizamos tus envases de catálogo con etiquetas de alta
            resolución que ofrecen una apariencia impecable, durable y
            profesional. Ideal para marcas que necesitan velocidad sin invertir
            inmediatamente en moldes personalizados.
          </p>

          <div className="relative rounded-2xl overflow-hidden shadow-lg h-64 md:h-80">
            <Image
              alt="Servicio de etiquetado industrial"
              fill
              priority
              className="object-cover object-center h-full"
              src="/img/servicio_etiquetado.webp"
            />
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="p-8 rounded-2xl flex flex-col h-full border border-primary/25 bg-white shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/15">
              <Package className="w-5 h-5 text-primary" />
            </div>

            <h3 className="font-primary text-xl md:text-2xl font-semibold text-on-surface leading-tight">
              Servicio de Etiquetado
            </h3>
          </div>
          <p className="text-secondary mb-3 leading-relaxed">
            Convierte un envase estándar en una presentación con identidad
            visual fuerte, acabados profesionales y excelente presencia en
            góndola.
          </p>

          {/* BENEFITS */}
          <div className="space-y-3 mb-3">
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

          {/* CONTAINERS */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <BadgeCheck className="w-5 h-5 text-primary" />

              <p className="font-semibold text-on-surface">
                Envases disponibles para etiquetado
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {containers.map((container, index) => (
                  <div
                    key={container}
                    className={`
            flex items-center gap-3 px-4 py-3 text-sm text-secondary
            border-gray-100
            ${index % 2 === 0 ? "sm:border-r" : ""}
            ${index < containers.length - 2 ? "border-b" : ""}
          `}
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />

                    <span className="font-medium">{container}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}

          <Button
            label="Solicitar Cotización"
            sendMessageWassap={
              "Hola, me gustaría obtener más información sobre el servicio de etiquetado."
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
