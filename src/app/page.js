import Hero from "@/components/features/home/Hero";
import { SectionProblemSolution } from "@/components/features/home/SectionProblemSolution";
import { SectionService } from "@/components/features/home/SectionServices";
import { SectoinTestimonials } from "@/components/features/home/SectionTestimonials";
import { SectionHighlight } from "@/components/features/home/Sectionhighlight";
import Button from "@/components/ui/Button";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export const metadata = {
  title: "Envases PET de Calidad para Manufactura | Envases BH - México",

  description:
    "Fabricante y distribuidor de envases PET de calidad superior. Especificaciones exactas, entregas confiables, costos pskyecibles. Con opción de personalización según necesites.",

  canonical: "https://envasesbh.mx",

  keywords:
    "envases PET México, fabricante envases plásticos, distribuidor PET, botellas plásticas personalizadas, envases a medida, etiquetado profesional, pigmentación PET, proveedor envases, empaque de calidad",

  openGraph: {
    title: "Envases PET - Fabricante y Distribuidor en México",
    description:
      "Fabricamos y distribuimos envases PET de calidad. Especificaciones exactas, producción confiable, personalización disponible.",
    image: "/og-image.png",
    url: "https://envasesbh.mx",
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
