"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Ramírez",
    company: "Distribuciones CR",
    comment:
      "El servicio fue impecable desde el primer contacto. Cumplieron con cada entrega en el tiempo acordado y siempre mantuvieron una comunicación clara y profesional. Gracias a su equipo logramos optimizar nuestros procesos logísticos y reducir retrasos que antes eran constantes. Sin duda, se han convertido en un aliado estratégico para nuestro crecimiento.",
  },
  {
    name: "Laura Gómez",
    company: "Logística LG",
    comment:
      "Trabajar con ellos ha sido una excelente decisión para nuestra empresa. No solo nos ayudaron a optimizar costos, sino que también mejoraron significativamente nuestros tiempos de entrega. Su enfoque en los detalles y la calidad del servicio realmente marca la diferencia. Hoy en día confiamos plenamente en su gestión para operaciones críticas.",
  },
  {
    name: "Andrés Torres",
    company: "Retail AT",
    comment:
      "Destaco su profesionalismo y compromiso en cada etapa del proceso. Desde la planificación hasta la ejecución, todo fue manejado con un alto nivel de responsabilidad. Nos brindaron soluciones adaptadas a nuestras necesidades reales y eso se tradujo en mejores resultados para nuestro negocio. Totalmente recomendados para empresas que buscan eficiencia y confianza.",
  },
  {
    name: "María López",
    company: "Comercial ML",
    comment:
      "La experiencia ha sido excelente. Nos ofrecieron una atención personalizada, entendiendo perfectamente lo que necesitábamos y proponiendo soluciones prácticas y efectivas. La calidad del servicio es sobresaliente y el equipo siempre está dispuesto a apoyar. Hemos notado una mejora significativa en nuestra operación desde que trabajamos con ellos.",
  },
  {
    name: "Juan Pérez",
    company: "JP Solutions",
    comment:
      "Lo que más valoramos es su cumplimiento y transparencia. Cada proceso está bien estructurado y siempre cumplen lo que prometen. Nos dieron tranquilidad al saber que nuestras operaciones estaban en buenas manos. Además, su capacidad de respuesta ante cualquier imprevisto es rápida y eficiente. Sin duda, una empresa confiable y altamente recomendada.",
  },
];

export default function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        active: true,
      }),
    ],
  );

  return (
    <div className="relative">
      {/* VIEWPORT */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="pl-6 min-w-[85%] md:min-w-[48%] lg:min-w-[32%]"
            >
              <div className="h-full flex flex-col rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md p-6 shadow-md hover:shadow-xl transition-all duration-300">
                {/* STARS */}
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-primary fill-primary"
                    />
                  ))}
                </div>

                {/* COMMENT */}
                <p className="text-sm text-secondary leading-relaxed mb-5">
                  “{item.comment}”
                </p>

                {/* USER */}
                <div className="mt-auto flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-secondary">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">{item.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
