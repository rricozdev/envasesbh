import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import SectionContent from "@/components/ui/SectionContent";

export const metadata = {
  title: "Blog Informativo | Envases BH",
};

export default function BlogPage() {
  return (
    <main className="min-h-[70vh] flex items-center bg-white py-20">
      <SectionContent>
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* ICONO DE LECTURA / NOTICIAS (SVG Manual) */}
          <div className="mb-8 p-6 bg-gray-50 rounded-full border border-gray-100 shadow-sm">
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
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
              />
            </svg>
          </div>

          <SectionTitle>
            BLOG <span className="text-primary italic">INFORMATIVO</span>
          </SectionTitle>

          <div className="mt-8 space-y-4">
            <p className="text-secondary font-medium text-xl uppercase tracking-tighter italic">
              Historias en redacción
            </p>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              Pronto compartiremos contigo artículos sobre sostenibilidad,
              procesos industriales y las últimas tendencias en soluciones de
              empaque PET.
            </p>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="px-10 py-4 bg-secondary text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-primary transition-all duration-300 shadow-lg"
            >
              ← Regresar al Inicio
            </Link>
          </div>

          {/* DECORACIÓN TIPO SKELETON (Simula posts cargando) */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-10 grayscale pointer-events-none">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </SectionContent>
    </main>
  );
}
