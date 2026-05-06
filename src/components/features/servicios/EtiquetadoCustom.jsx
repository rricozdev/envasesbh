import { StepItem } from "@/components/ui/StepItem";
import Button from "@/components/ui/Button";

const stepItems = [
  {
    number: 1,
    title: "Consultoría",
    description: "Definición de materiales y adherencia según contenido.",
  },
  {
    number: 2,
    title: "Prototipo",
    description: "Pruebas de ajuste en el molde personalizado.",
  },
  {
    number: 3,
    title: "Producción",
    description: "Aplicación automatizada en línea de ensamble.",
  },
  {
    number: 4,
    title: "Entrega",
    description: "Producto final listo para llenado y venta.",
  },
];

export function EtiquetadoCustom() {
  return (
    <div className="bg-cyan-950 text-white p-12 rounded-xl industrial-shadow relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="font-primary text-xl font-semibold mb-4 text-primary ">
          Estás personalizando un envase. El etiquetado esta incluido en el
          proceso.
        </h3>

        <p className="opacity-90 mb-8">
          Para proyectos custom, el etiquetado se diseña y aplica de forma
          nativa durante el ciclo de producción.
        </p>

        <div className="space-y-6 mb-10">
          {stepItems.map((e, i) => (
            <StepItem
              key={i}
              number={e.number}
              title={e.title}
              description={e.description}
            />
          ))}
        </div>

        <Button variant="outline">
          Consultar Personalización Con Etiquetado
        </Button>
      </div>
    </div>
  );
}
