import SectionContent from "@/components/ui/SectionContent";
import { PigmentacionCatalogo } from "./PigmentacionCatalogo";
import { PigmentacionCustom } from "./PigmentadoCustom";

export default function PigmentacionSection({ pigmentado }) {
  return (
    <SectionContent title={pigmentado.nombre}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PigmentacionCustom />
        <PigmentacionCatalogo />
      </div>
    </SectionContent>
  );
}
