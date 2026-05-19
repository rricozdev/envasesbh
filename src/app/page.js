import Hero from "@/components/features/home/Hero";
import { SectionProblemSolution } from "@/components/features/home/SectionProblemSolution";
import { SectionService } from "@/components/features/home/SectionServices";
import { SectoinTestimonials } from "@/components/features/home/SectionTestimonials";
import { SectionVehiculos } from "@/components/features/home/SectionVehiculos";
import { SectionHighlight } from "@/components/features/home/Sectionhighlight";
import Button from "@/components/ui/Button";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { baseMetadata } from "@/lib/metadata-config";

export const metadata = {
  ...baseMetadata,
  title: "Envases PET de Calidad para Manufactura mexicana | Envases BH",

  openGraph: {
    ...baseMetadata.openGraph,
    title: "Envases PET de Calidad para Manufactura | Envases BH",
    url: "https://envasesbh.mx",
    images: [
      {
        url: "https://envasesbh.mx/logo-bh_11zon.webp",
        width: 1200,
        height: 630,
        alt: "Envases BH - Fabricante de Envases PET",
      },
    ],
  },

  twitter: {
    ...baseMetadata.twitter,
    title: "Envases PET de Calidad | Envases BH México",
    description:
      "Fabricante y distribuidor de envases PET. Calidad garantizada, entregas confiables.",
    image: "https://envasesbh.mx/logo-bh_11zon.webp",
  },
};

export default function Home() {
  return (
    <>
      <Hero
        imgsrc="/img/bg.webp"
        variant="left"
        title={
          <>
            Fabricante de{" "}
            <span className="bg-primary text-white px-2 py-0.5 rounded-md">
              Envases PET
            </span>
            , para la industria mexicana
          </>
        }
        description={
          <>
            Producimos{" "}
            <span className="font-medium">envases PET de alta calidad</span>,
            fabricados con los estándares más exigentes de la industria. Cuando
            tu operación lo requiere, también los personalizamos según tus
            especificaciones exactas.
          </>
        }
        highlights={[
          "Precios competitivos",
          "Entregas a domicilio",
          "Envases Personalizables",
        ]}
        imageDesktop="/og-envasesbh.webp"
        imageMobile="/mobile.jpeg"
        primaryAction={{ label: "Agendar Consultoría" }}
        secondaryAction={{ label: "Ver Catálogo" }}
      />
      <SectionProblemSolution />
      <SectionService />
      <SectionVehiculos />
      <SectoinTestimonials />
      <SectionHighlight />
      <section className="py-20 px-4 md:py-28 lg:px-0 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-linear-to-r from-primary to-primary rounded-xl p-8 md:p-12 lg:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para llevar tu empaque al siguiente nivel?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Contáctanos hoy mismo para una consulta personalizada y descubre
              cómo podemos ayudarte a destacar en el mercado.
            </p>
            <Button
              label="Solicitar Cotización"
              sendMessageWassap={
                "Hola, me gustaría solicitar una cotización sobre sus productos."
              }
              number={WHATSAPP_NUMBER}
              className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 cursor-pointer transition scale-100 hover:scale-105 duration-300"
            >
              Solicitar Cotización
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
