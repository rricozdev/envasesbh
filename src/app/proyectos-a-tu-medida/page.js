import ProcessSection from "@/components/features/proyecto_a_medida/ProcessSection";
import Button from "@/components/ui/Button";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { baseMetadata } from "@/lib/metadata-config";

export const metadata = {
  ...baseMetadata,

  title: "Proyectos a tu Medida Diseño y Fabricación de Envases PET",
  description:
    "Descubre nuestro proceso de 5 etapas: desde diseño y concepto hasta tu botella física. Fabricación de prototipos y envases PET personalizados con tiempos cortos y precios accesibles.",
  keywords: [
    "envases PET",
    "diseño de botellas",
    "fabricación de prototipos",
    "envases personalizados",
    "botellas plásticas",
    "envases a medida",
    "diseño 3D envases",
    "prototipo botella",
    "proceso diseño envases",
  ],

  openGraph: {
    ...baseMetadata.openGraph,
    title: "Proyectos a tu Medida | Envases BH",
    description:
      "Proceso completo de diseño y fabricación de envases PET. 5 etapas desde tu concepto hasta el producto final.",
    url: "https://envasesbh.mx/proyectos-a-tu-medida",
    type: "website",
    images: [
      {
        url: "https://envasesbh.mx/exploracion_envases.webp",
        width: 1200,
        height: 630,
        alt: "Proceso de Proyectos a tu Medida - Envases BH",
        type: "image/webp",
      },
    ],
  },

  twitter: {
    ...baseMetadata.twitter,
    title: "Proyectos a tu Medida | Envases BH",
    description:
      "Diseño y fabricación de envases PET personalizados en 5 etapas.",
    image: "https://envasesbh.mx/exploracion_envases.webp",
  },

  alternates: {
    canonical: "https://envasesbh.mx/proyectos-a-tu-medida",
    languages: {
      "es-MX": "https://envasesbh.mx/proyectos-a-tu-medida",
      es: "https://envasesbh.mx/proyectos-a-tu-medida",
    },
  },
};

export default function ProyectosAMedidaPage() {
  return (
    <>
      <section className="bg-secondary py-8 md:py-12 border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                Proyectos <span className="text-primary">a tu medida </span>
              </h1>
              <p className="text-white/60 text-sm mt-2 max-w-lg">
                Te acompañamos en cada paso. Desde tu concepto hasta tu envase
                en mano, contamos con 30+ años de expertise para convertir tu
                visión en realidad.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ProcessSection />
      <section className="py-10 px-4 md:py-28 lg:px-0 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-linear-to-r from-primary to-primary rounded-xl p-8 md:p-12 lg:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para darle vida a tu proyecto de envases PET?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Contáctanos hoy mismo para una consulta personalizada y descubre
              cómo podemos ayudarte a destacar en el mercado.
            </p>
            <Button
              label="Solicitar Cotización"
              sendMessageWassap={
                "Hola, estoy interesado en realizar un proyecto personalizado de envases PET."
              }
              number={WHATSAPP_NUMBER}
              className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 cursor-pointer transition scale-100 hover:scale-105 duration-300"
            >
              Solicitar Asesoria de Proyecto
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
