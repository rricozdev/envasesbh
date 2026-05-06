import { FeatureItem } from "@/components/ui/Bandage";
import Button from "@/components/ui/Button";
import { SimpleTable } from "@/components/ui/Table";
import { BadgeCheck, Banknote, Blocks, Clock3 } from "lucide-react";

const featureItem = [
  {
    icon: <BadgeCheck />,
    description: "Colores Vibrantes",
  },
  {
    icon: <Banknote />,
    description: "Económico",
  },
  {
    icon: <Clock3 />,
    description: "Rápido",
  },
  {
    icon: <Blocks />,
    description: "Flexibilidad",
  },
];

export function EtiquetadoCatalogo({ title, description }) {
  return (
    <div className="bg-white p-12 rounded-xl shadow-sm border border-slate-100">
      <h3 className="font-primary text-xl font-semibold mb-4">{title}</h3>

      <p className="mb-6"> {description}</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {featureItem.map((e, i) => (
          <FeatureItem key={i} icon={e.icon}>
            {e.description}
          </FeatureItem>
        ))}
      </div>

      <SimpleTable
        headers={["VOLUMEN", "COSTO UNIT", "TIMELINE"]}
        rows={[
          ["1,000 - 5,000", "$0.15 USD", "3 Días"],
          ["5,001 - 20,000", "$0.12 USD", "5 Días"],
          ["20,000+", "$0.09 USD", "7 Días"],
        ]}
      />

      <Button>Solicitar Etiquetado Rápido</Button>
    </div>
  );
}
