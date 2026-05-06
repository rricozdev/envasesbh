import SectionContent from "@/components/ui/SectionContent";
import { Check, Palette, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: 1,
    icon: <Tag className="w-5 h-5 text-primary" />,
    title: "Etiquetado Profesional",
    benefits: [
      "Colores duraderos (+2 años)",
      "Alta precisión en producción",
      "Refuerza tu identidad de marca",
    ],
    description:
      "Haz que tu producto destaque en estantería con etiquetas resistentes y de acabado profesional. Un envase perfecto sin la etiqueta adecuada es una oportunidad perdida.",
    image: "/img/etiquetado.png",
    cta: "Ver etiquetado",
    ctaHref: "servicios#etiquetado",
  },
  {
    id: 2,
    icon: <Palette className="w-5 h-5 text-primary" />,
    title: "Pigmentación Personalizada",
    benefits: [
      "Colores exactos (Pantone)",
      "Alta resistencia química y UV",
      "Consistencia en cada lote",
    ],
    description:
      "Obtén colores precisos y consistentes sin comprometer calidad ni costos. Nuestra pigmentación personalizada asegura que tu producto mantenga su identidad visual en cada producción.",
    image: "/img/pigmentado.png",
    cta: "Ver pigmentación",
    ctaHref: "servicios#pigmentacion",
  },
];

export function SectionService() {
  return (
    <SectionContent
      title=" Potencia tu Empaque con Servicios Especializados"
      subtitle="Servicios diseñados para elevar la percepción y rendimiento de tu
              producto."
      containerClassName="bg-secondary/5"
    >
      <div className="grid gap-8 md:grid-cols-2 ">
        {services.map((service) => (
          <div
            key={service.id}
            className="group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* IMAGE */}
            <div className="relative h-52 w-full overflow-hidden rounded-t-xl">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* ICON FLOAT */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-2 rounded-lg shadow">
                {service.icon}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <h3 className="mb-3 text-xl font-semibold text-secondary">
                {service.title}
              </h3>

              {/* BENEFITS */}
              <ul className="mb-4 space-y-2">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-primary mt-1" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* SHORT DESC */}
              <p className="mb-5 text-sm text-gray-500">
                {service.description}
              </p>

              {/* CTA */}
              <Link
                href={service.ctaHref}
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all hover:bg-sky-100 rounded-md py-2 px-3"
              >
                {service.cta} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </SectionContent>
  );
}
