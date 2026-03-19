import Hero from "@/components/features/home/Hero";
export const metadata = {
  title: "Envases PET de Calidad para Manufactura | Envases BH - México",

  description:
    "Fabricante y distribuidor de envases PET de calidad superior. Especificaciones exactas, entregas confiables, costos predecibles. Con opción de personalización según necesites.",

  canonical: "https://envasesbh.com.mx",

  keywords: [
    "envases PET México",
    "fabricante envases plásticos",
    "distribuidor PET",
    "envases de calidad",
    "proveedores de empaque",
    "envases a especificación",
    "envases personalizados",
  ],

  openGraph: {
    title: "Envases PET - Fabricante y Distribuidor en México",
    description:
      "Fabricamos y distribuimos envases PET de calidad. Especificaciones exactas, producción confiable, personalización disponible.",
    image: "/og-image.png",
    url: "https://envasesbh.com.mx",
  },
};

export default function Home() {
  return (
    <>
      <Hero
        variant="left"
        title={
          <>
            Distribuidor y Fabricante de{" "}
            <span className="text-primary">Envases PET</span>, para la industria
            mexicana
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
          "Costos predecibles",
          "Entregas garantizadas",
          "Envases Personalizables",
        ]}
        imageDesktop="/og-image.png"
        imageMobile="/mobile.jpeg"
        primaryAction={{ label: "Agendar Consultoría" }}
        secondaryAction={{ label: "Ver Catálogo" }}
      />

      {/*
      * - Contenido


      */}
      <section className="py-20 bg-[#f5f5f5]  px-4 lg:px-0 ">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center">
            ¿Por Qué Cambiar De Proveedor?
          </h2>
          <p className="text-center text-sm sm:text-base lg:text-lg text-secondary/90 max-w-2xl mx-auto">
            Si te identificas con alguno de estos problemas, sabemos exactamente
            qué necesitas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Costos Inesperados</h3>
              <p className="text-gray-700 text-sm">
                ¿Te han sorprendido con cargos adicionales o aumentos de precio
                sin previo aviso? Esto puede afectar tu presupuesto y
                planificación.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Costos Inesperados</h3>
              <p className="text-gray-700 text-sm">
                ¿Te han sorprendido con cargos adicionales o aumentos de precio
                sin previo aviso? Esto puede afectar tu presupuesto y
                planificación.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Costos Inesperados</h3>
              <p className="text-gray-700 text-sm">
                ¿Te han sorprendido con cargos adicionales o aumentos de precio
                sin previo aviso? Esto puede afectar tu presupuesto y
                planificación.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
