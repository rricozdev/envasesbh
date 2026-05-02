import SectionContent from "@/components/ui/SectionContent";
import { AlertTriangle, Lightbulb, MessageCircle } from "lucide-react";

const card_problem_solution = [
  {
    id: 1,
    problem: "Proveedores No Confiables",
    description:
      "Cambios inesperados, entregas incumplidas y productos fuera de especificación.",
    hilights: ["Paros de producción", "Devoluciones"],
    title_solution: "Servicio Consultivo Integral",
    solution:
      "Alineación total contigo, entregas a domicilio y precisión en cada pedido.",
    icon: <AlertTriangle size={20} />,
  },
  {
    id: 2,
    problem: "Falta de Asesoría Técnica",
    description:
      "Te venden sin entender tu operación ni lo que realmente necesitas.",
    hilights: ["Sobrecostos", "Ineficiencia"],
    title_solution: "Asesoramiento Experto Continuo",
    solution:
      "Asesoría experta para elegir envases optimizados para tu proceso, que maximizan rendimiento.",
    icon: <Lightbulb size={20} />,
  },
  {
    id: 3,
    problem: "Comunicación Ineficiente",
    description:
      "Respuestas lentas, falta de seguimiento y procesos poco claros que generan estrés operativo.",
    hilights: ["Retrasos", "Estrés operativo"],
    title_solution: "Comunicación Directa",
    solution: "Comunicación directa, rápida y seguimiento constante.",
    icon: <AlertTriangle size={20} />,
  },
];

export function SectionProblemSolution() {
  return (
    <SectionContent
      title="¿Por Qué Cambiar De Proveedor?"
      subtitle=" No es solo un proveedor. Es una decisión que impacta tu operación, tus
        costos y tu crecimiento."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {card_problem_solution.map((item) => (
          <div
            key={item.id}
            className="group relative p-px rounded-2xl bg-linear-to-b from-gray-200 to-transparent hover:from-primary/40 transition"
          >
            <div className="h-full bg-white/80 backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-xl transition">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-sky-100 text-primary">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                {item.problem}
              </h3>

              <p className="text-sm text-gray-600">{item.description}</p>

              <div>
                <p className="mb-2">Ocacionando: </p>
                <div className="flex flex-wrap gap-2">
                  {item.hilights.map((h, i) => (
                    <span
                      key={i}
                      className="text-xs bg-sky-50 text-primary px-2 py-1 rounded-md"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* SOLUTION BLOCK */}
              <div className="bg-sky-50 rounded-lg p-4 ">
                <h4 className="text-sm font-semibold text-primary mb-1">
                  Nuestra solución
                </h4>
                <p className="text-sm font-medium text-gray-800 mb-1">
                  {item.title_solution}
                </p>
                <p className="text-sm text-gray-600">{item.solution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContent>
  );
}
