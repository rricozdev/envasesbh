import Image from "next/image";

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
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center px-6 py-2 md:py-0 md:h-20">
        {/* LOGO: Siempre a la izquierda */}
        <div className="flex items-center">
          <Image
            src="/logo-bh-3.png"
            alt="Envases BH"
            width={180}
            height={50}
            priority
            className="h-auto w-auto max-h-[45px] md:max-h-[60px]"
          />
        </div>

        {/* --- SECCIÓN CONTACTO --- */}
        <div className="flex items-center">
          {/* A. VERSIÓN DESKTOP: Horizontal (se oculta en mobile 'hidden', se muestra en 'md:flex') */}
          <div className="hidden md:flex flex-row items-center gap-8">
            {/* Email Desktop */}
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-3 group transition-all"
            >
              <div className="border border-white/10 rounded-full p-2 group-hover:border-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-400 group-hover:text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-none">
                  Contáctanos
                </span>
                <span className="text-sm text-white group-hover:text-primary">
                  {CONTACT_INFO.email}
                </span>
              </div>
            </a>

            {/* Teléfono Desktop */}
            <a
              href={CONTACT_INFO.phone.link}
              className="flex items-center gap-3 group transition-all border-l border-gray-800 pl-8"
            >
              <div className="border border-white/10 rounded-full p-2 group-hover:border-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-400 group-hover:text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-none">
                  Llámanos
                </span>
                <span className="text-base font-semibold text-white group-hover:text-primary">
                  {CONTACT_INFO.phone.display}
                </span>
              </div>
            </a>
          </div>

          {/* B. VERSIÓN MOBILE: Apilada (se muestra solo en pantallas pequeñas 'md:hidden') */}
          <div className="flex md:hidden flex-col items-end gap-1">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-2 group"
            >
              <span className="text-[10px] text-gray-300 group-hover:text-primary">
                {CONTACT_INFO.email}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3.5 h-3.5 text-gray-500 group-hover:text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </a>
            <a
              href={CONTACT_INFO.phone.link}
              className="flex items-center gap-2 group"
            >
              <span className="text-[11px] font-semibold text-white group-hover:text-primary">
                {CONTACT_INFO.phone.display}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3.5 h-3.5 text-gray-500 group-hover:text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
