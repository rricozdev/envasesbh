import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SimpleTable } from "@/components/ui/Table";
import { Droplet, Shield } from "lucide-react";

export function PigmentacionCatalogo() {
  return (
    <div className="border-2 border-slate-100 p-12 rounded-xl shadow-2xs">
      <h3 className="font-primary text-xl font-semibold mb-4">
        Necesitas botellas del catálogo pero con color específico.
      </h3>

      <p className="mb-8">
        Utilizamos masterbatch de alta calidad para teñir el PET de catálogo sin
        alterar sus propiedades mecánicas.
      </p>

      {/* FEATURES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-slate-50 rounded-lg">
          <Icon icon={<Droplet />} className="text-primary mb-2" />
          <p className="font-semibold font-secondary text-sm mb-1">
            Translúcidos y Sólidos
          </p>
          <p className="text-xs text-on-surface-variant">
            Amplia gama de colores base y especiales.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg">
          <Icon icon={<Shield />} className="text-primary mb-2" />
          <p className="font-semibold font-secondary mb-1">Protección UV</p>
          <p className="text-xs text-on-surface-variant">
            Pigmentos que protegen el producto interno.
          </p>
        </div>
      </div>

      <SimpleTable
        headers={["ACABADO", "PEDIDO MÍN.", "INCREMENTO"]}
        rows={[
          ["Sólido Básico", "5,000 pzs", "+5%"],
          ["Translúcido Premium", "10,000 pzs", "+8%"],
          ["Metalizado/Perla", "25,000 pzs", "+15%"],
        ]}
      />

      <Button>Solicitar Pigmentación Rápida</Button>
    </div>
  );
}
