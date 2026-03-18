import Image from "next/image";

export default function TopBar() {
  return (
    <div className="bg-dark text-white w-full border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-auto md:h-20 flex flex-col md:flex-row justify-between items-center py-3 md:py-0 gap-3 md:gap-0">
        {/* Contenedor Fila Mobile (Logo Izq, Iconos Der) */}
        <div className="w-full md:w-auto flex justify-between md:justify-start items-center h-16 md:h-full">
          {/* Logo - Más grande en mobile y alineado a la izquierda */}
          <div className="flex items-center">
            <Image
              src="/logo-bh-3.png"
              alt="Envases BH"
              width={200} // Aumentado de 160 a 200
              height={70}
              priority
              className="h-auto w-auto max-h-[65px] md:max-h-[70px] -ml-2" // Pequeño margen negativo para alinear visualmente
            />
          </div>

          {/* Versión simplificada para Mobile (Solo iconos, alineados a la derecha) */}
          <div className="flex md:hidden gap-3 items-center">
            <a
              href="tel:015558247722"
              className="p-2 border border-white/10 rounded-full hover:bg-gray-800/50 transition"
            >
              {/* Icono de teléfono */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
            </a>
            <a
              href="mailto:direccionventas@envasesbh.mx"
              className="p-2 border border-white/10 rounded-full hover:bg-gray-800/50 transition"
            >
              {/* Icono de sobre */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Contactos Completos - Se ocultan en mobile (md:flex) */}
        <div className="hidden md:flex items-center gap-6 text-sm h-full">
          {/* Bloque Email */}
          <div className="flex items-center gap-2.5">
            <div className="border border-white/30 rounded-full p-2 flex items-center justify-center">
              {/* Icono de sobre */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 font-medium uppercase text-[10px] tracking-wider leading-tight">
                CONTÁCTANOS EN:
              </p>
              <p className="font-medium text-sm text-white">
                direccionventas@envasesbh.mx
              </p>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-700"></div>

          {/* Bloque Teléfono */}
          <div className="flex items-center gap-2.5">
            <div className="border border-white/30 rounded-full p-2 flex items-center justify-center">
              {/* Icono de teléfono */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 font-medium uppercase text-[10px] tracking-wider leading-tight">
                LLÁMANOS AL
              </p>
              <p className="font-semibold text-base text-white">
                0155 58 24 77 22
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
