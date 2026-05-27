import SectionContent from "@/components/ui/SectionContent";
import { BadgeDollarSign, Boxes, CheckCircle2, Truck } from "lucide-react";

const strengths = [
  {
    id: 1,
    title: "Disponibilidad y Capacidad",
    description:
      "Contamos con la capacidad operativa y disponibilidad necesarias para responder de manera eficiente a las necesidades de tu negocio en todo momento.",
    highlights: [
      "Producción constante",
      "Capacidad de alta demanda",
      "Inventario disponible",
    ],
    benefit:
      "Garantizamos continuidad y cumplimiento para que tu operación nunca se detenga.",
    icon: <Boxes size={20} />,
  },
  {
    id: 2,
    title: "Cobertura y Disponibilidad",
    description:
      "Contamos con distribución en distintos estados de la república y un punto de venta en Guadalajara para entregas locales, foráneas y nacionales.",
    highlights: [
      "Mayor disponibilidad",
      "Entregas ágiles",
      "Atención integral",
    ],
    benefit:
      "Llegamos hasta donde tu negocio lo necesita con entregas eficientes y confiables.",
    icon: <Truck size={20} />,
  },
  {
    id: 3,
    title: "Soluciones Competitivas",
    description:
      "Brindamos soluciones adaptadas a cada cliente mediante productos al mayoreo y menudeo, combinando calidad, atención cercana y precios competitivos.",
    highlights: [
      "Atención personalizada",
      "Asesoría especializada",
      "Precios competitivos",
    ],
    benefit:
      "Te ayudamos a optimizar costos y encontrar la mejor solución para tu operación.",
    icon: <BadgeDollarSign size={20} />,
  },
];

export function SectionWhyUs() {
  return (
    <SectionContent
      title="¿Por Qué Trabajar Con Envases BH?"
      subtitle="Somos un aliado estratégico comprometido con el crecimiento y la continuidad de tu negocio, ofreciendo soluciones de envasado PET de calidad que impulsan la eficiencia y fortalecen tu marca."
      containerClassName="bg-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strengths.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Icon */}
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-sky-100 text-primary mb-4">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              {item.description}
            </p>

            {/* Highlights */}
            <div className="space-y-2 mb-6">
              {item.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* Benefit */}
            <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
              <p className="text-sm font-medium text-gray-800 leading-relaxed">
                {item.benefit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionContent>
  );
}
