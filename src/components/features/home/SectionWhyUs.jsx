import SectionContent from "@/components/ui/SectionContent";
import { BadgeDollarSign, Boxes, CheckCircle2, Truck } from "lucide-react";

const strengths = [
  {
    id: 1,
    title: "Disponibilidad y Capacidad",
    description:
      "Contamos con la capacidad operativa y disponibilidad necesaria para responder de manera eficiente a las necesidades de tu negocio.",
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
    title: "Cobertura y Distribución",
    description:
      "Nuestra logística y flota de transporte nos permite llevar tus envases de forma segura y puntual a diferentes destinos.",
    highlights: [
      "Cobertura nacional",
      "Entregas locales y foráneas",
      "Flota especializada",
    ],
    benefit:
      "Llegamos hasta donde tu negocio lo necesita con entregas eficientes y confiables.",
    icon: <Truck size={20} />,
  },
  {
    id: 3,
    title: "Soluciones Competitivas",
    description:
      "Brindamos soluciones adaptadas a cada cliente, vendiendo productos al por mayor y al detal combinando calidad, atención cercana y precios competitivos.",
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
      subtitle="Más que un proveedor, somos un aliado estratégico comprometido con el crecimiento y continuidad de tu negocio."
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
