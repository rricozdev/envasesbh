import ProcessSection from "@/components/features/proyecto_a_medida/ProcessSection";
import Link from "next/link";

export const metadata = {
  title: "Proyectos a tu Medida | Envases BH",
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
              ¿Listo para llevar tu empaque al siguiente nivel?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Contáctanos hoy mismo para una consulta personalizada y descubre
              cómo podemos ayudarte a destacar en el mercado.
            </p>
            <Link
              href="/contacto"
              className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Solicitar Asesoria de Proyecto
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
