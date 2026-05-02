import SectionContent from "@/components/ui/SectionContent";
import SectionTitle from "@/components/ui/SectionTitle";
import Link from "next/link";

export const metadata = {
  title: "Contacto | Envases BH",
};

export default function ContactoPage() {
  return (
    <main className="bg-white py-20 min-h-[80vh] flex items-center">
      <SectionContent>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* COLUMNA IZQUIERDA: MENSAJE "EN CONSTRUCCIÓN" PERO OPERATIVO */}
            <div className="space-y-8">
              <div>
                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
                  Canales de atención habilitados
                </span>
                <SectionTitle className="leading-tight">
                  ESTAMOS{" "}
                  <span className="text-primary italic">CONECTADOS</span>
                </SectionTitle>
              </div>

              <p className="text-gray-500 text-lg leading-relaxed max-w-md">
                Mientras terminamos de configurar nuestra plataforma digital,
                nuestro **equipo comercial y técnico** ya se encuentra operativo
                para atender tus requerimientos.
              </p>

              {/* LÍNEA DE PROGRESO DE MONTAJE */}
              <div className="pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase text-secondary/40">
                    Montaje Web
                  </span>
                  <span className="text-[10px] font-bold uppercase text-primary">
                    85% Completo
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[85%] animate-pulse" />
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: TARJETAS DE ACCIÓN DIRECTA */}
            <div className="space-y-4">
              {/* WHATSAPP - EL MÁS IMPORTANTE */}
              <a
                href="https://wa.me/tu-numero"
                target="_blank"
                className="group flex items-center p-6 bg-gray-50 rounded-[30px] border border-gray-100 transition-all hover:bg-secondary hover:translate-x-2"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-primary transition-colors">
                  <svg
                    className="w-6 h-6 text-primary group-hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025 4.48 4.48 0 0 0-.153-1.856A8.074 8.074 0 0 1 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                    />
                  </svg>
                </div>
                <div className="ml-6">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">
                    Ventas Inmediatas
                  </p>
                  <h4 className="text-secondary font-bold text-lg group-hover:text-white transition-colors uppercase italic">
                    WhatsApp Business
                  </h4>
                </div>
              </a>

              {/* EMAIL */}
              <a
                href="mailto:ventas@envasesbh.com"
                className="group flex items-center p-6 bg-gray-50 rounded-[30px] border border-gray-100 transition-all hover:bg-secondary hover:translate-x-2"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-primary transition-colors">
                  <svg
                    className="w-6 h-6 text-primary group-hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div className="ml-6">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">
                    Consultas Formales
                  </p>
                  <h4 className="text-secondary font-bold text-lg group-hover:text-white transition-colors uppercase italic">
                    Correo Corporativo
                  </h4>
                </div>
              </a>

              <Link
                href="/"
                className="inline-block mt-8 text-[10px] font-black text-secondary/40 uppercase tracking-[0.4em] hover:text-primary transition-colors"
              >
                ← Volver al catálogo en desarrollo
              </Link>
            </div>
          </div>
        </div>
      </SectionContent>
    </main>
  );
}
