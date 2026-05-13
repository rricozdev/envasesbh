import ProcessCard from "./ProccesCard";

const steps = [
  {
    number: "01",
    title: "FASE DE DISEÑO - Exploración y Concepto",
    description:
      "Escuchamos tu visión para desarrollar propuestas creativas que resuelvan necesidades específicas de mercado y funcionalidad.",
    checklist: [
      "Sesión de brief",
      "Exploración de conceptos",
      "Propuestas iniciales",
      "Ajustes según feedback",
    ],
    image: "/img/steps/exploracion_envases.webp",
    imageAlt:
      "Diseñadores industriales creando conceptos de envases PET en un estudio moderno.",
    reverse: false,
  },

  {
    number: "02",
    title: "PLANOS DE ENVASES - Especificaciones Técnicas",
    description:
      "Transformamos el concepto en planos técnicos precisos, asegurando la viabilidad industrial y el cumplimiento de normativas.",
    checklist: [
      "Dibujos técnicos dimensionados",
      "Especificaciones de materiales",
      "Documentación de moldes",
      "Validación de viabilidad",
    ],
    image: "/img/steps/planos_de_envases.webp",
    imageAlt:
      "Planos técnicos y modelado CAD de un envase plástico en estación de ingeniería.",
    reverse: true,
  },

  {
    number: "03",
    title: "DISEÑO 3D - Visualización Realista",
    description:
      "Ve tu envase en 3D antes de producir. Utilizamos renderizado de última generación para simulaciones hiperrealistas.",
    checklist: [
      "Modelado 3D profesional",
      "Renders de alta calidad",
      "Múltiples ángulos",
      "Simulación de acabados",
    ],
    image: "/img/steps/envase_render_3D.webp",
    imageAlt:
      "Render 3D hiperrealista de un envase PET con iluminación de estudio.",
    reverse: false,
  },

  {
    number: "04",
    title: "FABRICACIÓN Y PROTOTIPO - Del Digital a lo Tangible",
    description:
      "Tu envase cobra vida. Fabricamos moldes piloto y prototipos físicos para validación funcional y táctica.",
    checklist: [
      "Creación de moldes",
      "Fabricación del prototipo",
      "Pruebas funcionales",
      "Ajustes finales",
    ],
    image: "/img/steps/prototipo_envase.webp",
    imageAlt:
      "Proceso industrial de creación de moldes y prototipos de envases.",
    reverse: true,
  },

  {
    number: "05",
    title: "BOTELLA FÍSICA NUEVO - Listo para el Mercado",
    description:
      "Producción en volumen con los más altos estándares de calidad y eficiencia logística para tu lanzamiento.",
    checklist: [
      "Producción en volumen",
      "Control de calidad",
      "Empaque y logística",
      "Soporte post-producción",
    ],
    image: "/img/steps/envases_producto_final.webp",
    imageAlt:
      "Línea de producción industrial con botellas PET listas para distribución.",
    reverse: false,
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-8">
          {steps.map((step) => (
            <ProcessCard key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
