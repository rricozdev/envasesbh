import Link from "next/link";
import Container from "@/components/ui/Container";
// Al ser export default, NO lleva llaves {}
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Proyectos a tu Medida | Envases BH",
};

export default function ProyectosAMedidaPage() {
  return (
    <main className="min-h-[70vh] flex items-center bg-white py-20">
      <Container>
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="mb-8 p-6 bg-gray-50 rounded-full border border-gray-100 shadow-inner">
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
                d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 22V12.75"
              />
            </svg>
          </div>

          <SectionTitle>
            PROYECTOS A <span className="text-primary italic">TU MEDIDA</span>
          </SectionTitle>

          <div className="mt-8 space-y-4">
            <p className="text-secondary font-medium text-xl uppercase tracking-tighter italic">
              Página en construcción
            </p>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              Estamos preparando esta sección para ofrecerte soluciones
              personalizadas y desarrollos exclusivos en envases PET de alta
              resistencia.
            </p>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="px-10 py-4 bg-secondary text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-primary transition-all duration-300 shadow-lg"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
