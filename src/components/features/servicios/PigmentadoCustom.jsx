import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Check } from "lucide-react";

export function PigmentacionCustom() {
  return (
    <div className="bg-slate-900 text-white p-12 rounded-xl shadow-2xs flex flex-col justify-between">
      <div>
        <h3 className="font-primary text-xl font-semibold mb-4 text-cyan-400">
          Estás personalizando un envase. Pigmentación desde diseño.
        </h3>

        <p className="opacity-90 mb-8">
          Control total sobre la tonalidad y opacidad desde la concepción del
          molde.
        </p>

        {/* VENTAJA */}
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-lg mb-8">
          <p className="text-cyan-400 font-bold text-label-caps mb-3">
            VENTAJA COMPETITIVA
          </p>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Icon icon={<Check />} className="text-cyan-500 text-lg" />
              <span className="text-body-sm">
                Igualación de color Pantone exacto mediante laboratorio.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Icon icon={<Check />} className="text-cyan-500 text-lg" />
              <span className="text-body-sm">
                Optimización de espesores para consistencia cromática.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Icon icon={<Check />} className="text-cyan-500 text-lg" />
              <span className="text-body-sm">
                Posibilidad de efectos bicapa o texturizados químicos.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <Button className="bg-cyan-600 hover:bg-cyan-500">
        Consultar Custom Con Pigmentación
      </Button>
    </div>
  );
}
