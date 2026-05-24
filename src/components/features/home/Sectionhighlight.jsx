import { HighlightCard } from "@/components/ui/HighlightCard";
import SectionContent from "@/components/ui/SectionContent";
import { BadgeCheck, Building2, Calendar, ToolCase } from "lucide-react";

const highlights = [
  {
    icon: Calendar,
    title: "25+ Años de Experiencia",
    description:
      "Más de dos décadas brindando soluciones confiables para la industria y el comercio.",
  },
  {
    icon: Building2,
    title: "Soluciones para Todo Tipo de Negocio",
    description:
      "Atendemos ventas al mayoreo y menudeo, adaptándonos a las necesidades de cada cliente.",
  },
  {
    icon: BadgeCheck,
    title: "Calidad Garantizada",
    description:
      "Cada producto cumple con altos estándares de calidad y especificaciones técnicas.",
  },
  {
    icon: ToolCase,
    title: "Entrega Segura y Puntual",
    description:
      "Contamos con convenios logísticos para llevar tus pedidos hasta donde los necesites.",
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
