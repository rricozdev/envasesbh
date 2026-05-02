import ServicioCard from "@/components/features/servicios/ServicioCard";
import SectionContent from "@/components/ui/SectionContent";
import SectionTitle from "@/components/ui/SectionTitle";
import { servicios } from "@/data/servicios";

export const metadata = {
  title: "Servicios | Envases BH",
  description:
    "Conoce nuestros servicios de etiquetado en BOPP y pigmentación para envases plásticos. Soluciones técnicas para la industria alimentaria y agroindustrial.",
};

export default function ServiciosPage() {
  return (
    <main className="bg-white">
      {/* Hero de sección */}
      <div className="bg-dark py-20">
        <SectionContent>
          <div className="max-w-2xl">
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold uppercase tracking-widest">
              Lo que hacemos
            </span>
            <SectionTitle className="text-white">
              Nuestros <span className="text-primary italic">Servicios</span>
            </SectionTitle>
            <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-xl">
              Complementamos la fabricación de envases con procesos
              especializados de etiquetado y pigmentación, adaptados a las
              necesidades de cada cliente.
            </p>
          </div>
        </SectionContent>
      </div>

      {/* Servicios alternados */}
      <SectionContent>
        {servicios.map((servicio, i) => (
          <ServicioCard
            key={servicio.id}
            servicio={servicio}
            reverse={i % 2 !== 0}
          />
        ))}
      </SectionContent>
    </main>
  );
}
