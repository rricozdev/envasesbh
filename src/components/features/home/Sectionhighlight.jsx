import { HighlightCard } from "@/components/ui/HighlightCard";
import SectionContent from "@/components/ui/SectionContent";
import { BadgeCheck, Building2, Calendar, Headphones } from "lucide-react";

const highlights = [
  {
    icon: Calendar,
    title: "10+ Años de Experiencia",
    description:
      "Más de una década resolviendo desafíos reales en manufactura.",
  },
  {
    icon: Building2,
    title: "+500 Empresas",
    description:
      "Confían en nosotros en industrias como alimentos, químicos y consumo masivo.",
  },
  {
    icon: BadgeCheck,
    title: "Calidad Garantizada",
    description:
      "Cumplimos especificaciones técnicas y estándares en cada lote.",
  },
  {
    icon: Headphones,
    title: "Soporte Ágil",
    description:
      "Respuesta rápida cuando lo necesitas, sin fricción ni intermediarios.",
  },
];

export function SectionHighlight() {
  return (
    <SectionContent
      title="¿Por Qué Elegirnos?"
      subtitle="Experiencia, respaldo y compromiso real con tu operación."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item, index) => (
          <HighlightCard key={index} {...item} />
        ))}
      </div>
    </SectionContent>
  );
}
