import Image from "next/image";

// Configuración de datos de contacto
const CONTACT_INFO = {
  email: "direccionventas@envasesbh.mx",
  phone: {
    display: "0155 58 24 77 22",
    link: "tel:015558247722",
  },
};

export default function TopBar() {
  return (
    <div className="bg-dark text-white w-full border-b border-gray-800">
      {/* Contenedor principal: pt-3 garantiza el espacio superior para el logo en mobile */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 pt-3 pb-4 md:py-0 md:h-24">
        {/* 1. SECCIÓN LOGO: Centrado, sin márgenes negativos para evitar cortes */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <Image
            src="/logo-bh-3.png" // Nombre de archivo solicitado
            alt="Envases BH"
            width={300} // Tamaño moderado, no se agranda más
            height={80}
            priority // Carga prioritaria LCP
            className="
              h-auto 
              w-[75%] max-w-[260px] 
              
              /* ELIMINACIÓN DE MÁRGENES AGRESIVOS: */
              my-0              /* Dejamos que el canvas del PNG actúe de forma natural */
              
              /* RESET DESKTOP (MD): */
              md:w-auto md:my-0 md:max-h-[70px]
            "
          />
        </div>

        {/* 2. SECCIÓN CONTACTOS: Distribución 50/50 y espacio equilibrado */}
        <div
          className="
          flex flex-row items-center justify-between w-full 
          
          /* AJUSTE DE EQUILIBRIO EN MOBILE: mt-5 crea el buffer limpio */
          mt-5 md:mt-0 
          pt-2 md:pt-0 
          md:w-auto md:gap-8
        "
        >
          {/* Bloque EMAIL */}
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="flex flex-1 flex-row items-center justify-center md:justify-start gap-2 group transition-all"
          >
            <div className="border border-white/20 rounded-full p-1.5 flex items-center justify-center group-hover:border-primary transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] md:text-[9px] text-gray-500 uppercase font-bold tracking-tighter md:tracking-widest">
                CONTÁCTANOS EN:
              </span>
              <span className="font-medium text-[8px] sm:text-[10px] md:text-sm text-white group-hover:text-primary leading-tight">
                {CONTACT_INFO.email}
              </span>
            </div>
          </a>

          {/* Divisor vertical sutil entre bloques */}
          <div className="h-8 w-px bg-gray-800 self-center md:hidden mx-1"></div>
          {/* Divisor vertical sutil para Desktop */}
          <div className="hidden md:block h-10 w-px bg-gray-700/50 self-center"></div>

          {/* Bloque TELÉFONO */}
          <a
            href={CONTACT_INFO.phone.link}
            className="flex flex-1 flex-row items-center justify-center md:justify-start gap-2 group transition-all"
          >
            <div className="border border-white/20 rounded-full p-1.5 flex items-center justify-center group-hover:border-primary transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] md:text-[9px] text-gray-500 uppercase font-bold tracking-tighter md:tracking-widest">
                LLÁMANOS AL
              </span>
              <span className="font-semibold text-[10px] sm:text-[11px] md:text-base text-white group-hover:text-primary leading-tight">
                {CONTACT_INFO.phone.display}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
