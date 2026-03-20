import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Servicios | Envases BH",
};

export default function ServiciosPage() {
  return (
    <main className="min-h-[70vh] flex items-center bg-white py-20">
      <Container>
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* ICONO DE ENGRANAJE / SERVICIOS (SVG Manual) */}
          <div className="mb-8 p-6 bg-cyan-50 rounded-2xl border border-cyan-100 shadow-sm">
            <svg
              className="w-16 h-16 text-primary animate-spin-slow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.128 1.41-.513M5.106 6.423 6.62 7.937m10.76 10.76 1.514 1.514M12 3v1.5m0 15V21m-5.128-1.41.513-1.41M19.077 5.128l-.513 1.41"
              />
            </svg>
          </div>

          <SectionTitle>
            NUESTROS <span className="text-primary italic">SERVICIOS</span>
          </SectionTitle>

          <div className="mt-8 space-y-4">
            <p className="text-secondary font-medium text-xl uppercase tracking-tighter italic">
              Sección en mantenimiento
            </p>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              Estamos actualizando nuestro catálogo de servicios técnicos,
              incluyendo procesos de soplado, inyección y personalización de
              moldes para la industria.
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
              href="/contacto"
              className="px-10 py-4 border-2 border-primary text-primary font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            >
              Contactar Soporte
            </Link>
          </div>

          {/* INDICADOR DE PROGRESO VISUAL SUTIL */}
          <div className="mt-20 w-full max-w-xs bg-gray-100 h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-2/3 animate-pulse"></div>
          </div>
        </div>
      </Container>
    </main>
  );
}
