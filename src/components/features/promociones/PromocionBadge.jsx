import { Tag } from "lucide-react";
import { obtenerLabelTipo } from "./promocionesModel";

export default function PromocionBadge({ tipo }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-red text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
      <Tag size={11} aria-hidden="true" />
      {obtenerLabelTipo(tipo)}
    </span>
  );
}
