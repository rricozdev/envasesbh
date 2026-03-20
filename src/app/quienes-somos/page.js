import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Quiénes Somos | Envases BH",
};

export default function QuienesSomosPage() {
  return (
    <main className="min-h-[70vh] flex items-center bg-white py-20">
      <Container>
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* ICONO DE EMPRESA / EDIFICIO INDUSTRIAL (SVG Manual) */}
          <div className="mb-8 p-6 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm transition-transform hover:scale-105 duration-500">
            <svg
              className="w-16 h-16 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5 7.75h-1.5M6.75 7.364V21m-3.5-5.182 3.5-1.273M9 3.364l3 1.091m-.273 1.454 3 1.091m-9.546 1.454 3 1.091m-.273 1.454 3 1.091"
              />
            </svg>
          </div>

          <SectionTitle>
            CONOCE <span className="text-primary italic">NUESTRA HISTORIA</span>
          </SectionTitle>

          <div className="mt-8 space-y-4">
            <p className="text-secondary font-medium text-xl uppercase tracking-tighter italic">
              Redactando nuestro legado
            </p>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              Estamos preparando una reseña detallada sobre nuestra pasión por
              la fabricación de envases PET de alta calidad y nuestro compromiso
              con el desarrollo industrial de la región.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="px-10 py-4 bg-secondary text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-primary transition-all duration-300 shadow-lg"
            >
              ← Volver al inicio
            </Link>

            <Link
              href="/productos"
              className="px-10 py-4 border-2 border-primary text-primary font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            >
              Ver Catálogo
            </Link>
          </div>

          {/* MARCA DE AGUA SUTIL */}
          <div className="mt-20 select-none">
            <span className="text-[10px] font-black text-secondary/10 uppercase tracking-[1em]">
              COMPROMISO • CALIDAD • PRECISIÓN
            </span>
          </div>
        </div>
      </Container>
    </main>
  );
}
