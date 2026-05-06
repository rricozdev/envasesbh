import SectionContent from "@/components/ui/SectionContent";
import { EtiquetadoCatalogo } from "./EtiquetadoCatalogo";
import { EtiquetadoCustom } from "./EtiquetadoCustom";

export default function EtiquetadoSection({ etiquetado }) {
  return (
    <SectionContent
      title={etiquetado.nombre}
      containerClassName="bg-secondary/5"
      key={etiquetado.id}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EtiquetadoCatalogo
          title={
            "Compraste Botellas del catalogo. Necesitas etiquetado personalizado"
          }
          description={etiquetado.descripcion}
        />
        <EtiquetadoCustom />
      </div>
    </SectionContent>
  );
}
