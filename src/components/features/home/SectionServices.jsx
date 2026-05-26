import SectionContent from "@/components/ui/SectionContent";
import { ArrowUpRight, Check, Palette } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: 1,
    icon: <Palette className="h-5 w-5 text-primary" />,
    title: "Pigmentación Personalizada",
    benefits: [
      "Colores exactos (Pantone)",
      "Alta resistencia química y UV",
      "Consistencia en cada lote",
    ],
    description:
      "Desarrollamos pigmentaciones personalizadas para que tus envases mantengan una identidad visual uniforme, profesional y alineada con tu marca.",
    image: "/img/img_etiquetado.webp",
    cta: "Conocer servicio",
    ctaHref: "/servicios#pigmentado",
    badge: "Personalización",
  },
];

export function SectionService() {
  return (
    <SectionContent
      title="Potencia tu empaque con nuestro servicio especializado"
      subtitle="Soluciones diseñadas para mejorar la presentación, diferenciación y percepción de tus productos."
      containerClassName="bg-secondary/5"
    >
      {/* CENTER CONTAINER */}
      <div className="flex justify-center">
        {services.map((service) => (
          <article
            key={service.id}
            className="group w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* IMAGE */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/5 to-transparent" />

              {/* BADGE */}
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-secondary backdrop-blur-sm">
                {service.badge}
              </div>

              {/* ICON */}
              <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-md">
                {service.icon}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6">
              {/* TITLE */}
              <h3 className="mb-3 text-xl font-semibold text-secondary">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mb-5 text-sm leading-relaxed text-gray-600">
                {service.description}
              </p>

              {/* BENEFITS */}
              <ul className="mb-6 space-y-2">
                {service.benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={service.ctaHref}
                className="inline-flex items-center gap-2 rounded-lg bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
              >
                {service.cta}

                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </SectionContent>
  );
}
