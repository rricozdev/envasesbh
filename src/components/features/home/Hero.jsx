import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden flex flex-col justify-center items-center lg:justify-center lg:items-start">
      {/* Fondo responsive */}
      <picture className="absolute inset-0 -z-10">
        {/* Mobile */}
        <source media="(max-width: 1000px)" srcSet="/mobile.jpeg" />

        {/* Desktop */}
        <Image
          src="/og-image.png"
          alt="Envases PET de Alta Calidad"
          fill
          priority
          quality={100}
          className="object-cover object-top"
          sizes="100vw"
        />
      </picture>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65 lg:hidden -z-10"></div>

      {/* Contenido */}
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 relative z-10 pb-8 sm:pb-10 lg:pb-0">
        <div className="w-full flex flex-col justify-center items-center lg:w-1/2">
          {/* Título */}
          <h1 className="text-2xl sm:text-3xl lg:text-5xl text-center lg:text-left font-bold text-white lg:text-secondary mb-4 leading-tight">
            Fabricamos <span className="text-primary">Envases PET</span> para la
            industria mexicana
          </h1>

          {/* Descripción */}
          <p className="text-sm sm:text-base lg:text-lg text-center lg:text-left text-white/90 lg:text-secondary/90 mb-6 md:mb-8 leading-relaxed">
            Producimos{" "}
            <span className="font-semibold">envases PET de alta calidad</span>,
            fabricados con los estándares más exigentes de la industria. Cuando
            tu operación lo requiere, los personalizamos según tus
            especificaciones exactas.
          </p>

          {/* Highlights */}
          <div className="flex flex-col items-center sm:flex-row sm:flex-wrap lg:flex-nowrap lg:items-start gap-3 mb-6 md:mb-8">
            {[
              "Envases PET de alta calidad",
              "Costos predecibles",
              "Entregas garantizadas",
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-sky-50 px-3 py-2 rounded-full w-fit"
              >
                <div className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center shrink-0">
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-medium text-dark whitespace-nowrap">
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button className="bg-primary hover:bg-sky-800 text-white font-bold py-3 px-6 rounded-lg transition text-sm md:text-base flex items-center justify-center gap-2 w-full sm:w-auto">
              Agendar Consultoría
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <button className="border-2 border-white lg:border-secondary hover:bg-gray-50 text-white hover:text-secondary lg:text-secondary font-bold py-3 px-6 rounded-lg transition text-sm md:text-base w-full sm:w-auto">
              Ver Catálogo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
