import Image from "next/image";

export default function Hero({
  title,
  highlightWord,
  description,
  highlights = [],
  primaryAction,
  secondaryAction,
  imageDesktop,
  imageMobile,
  variant = "left", // left | right | center
}) {
  // 🎯 Variantes de layout
  const variantStyles = {
    left: "lg:items-start text-center lg:text-left",
    right: "lg:items-end text-center lg:text-right ml-auto",
    center: "items-center text-center mx-auto",
  };

  return (
    <section className="relative min-h-[calc(100vh-200px)] w-full overflow-hidden flex flex-col justify-center items-center lg:justify-center py-20">
      <picture className="absolute inset-0 -z-10">
        {imageMobile && (
          <source media="(max-width: 765px)" srcSet={imageMobile} />
        )}

        {imageDesktop && (
          <Image
            src={imageDesktop}
            alt="Hero background"
            fill
            priority
            quality={90}
            className="object-cover object-top"
            sizes="100vw"
          />
        )}
      </picture>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 lg:hidden -z-10"></div>

      {/* ===== Contenido ===== */}
      <div className="max-w-6xl w-full mx-auto px-4 md:px-6 relative z-10 py-10 lg:py-0">
        <div
          className={`w-full lg:w-1/2 flex flex-col justify-center ${variantStyles[variant]}`}
        >
          {/* ===== Título ===== */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-bold text-white lg:text-secondary mb-4 animate-fade-in font-heading">
            {title}{" "}
            {highlightWord && (
              <span className="text-primary">{highlightWord}</span>
            )}
          </h1>

          {/* ===== Descripción ===== */}
          <p className="text-sm sm:text-base lg:text-lg text-white/90 lg:text-secondary/90 mb-6 md:mb-8 leading-relaxed animate-fade-in delay-100 font-[inter]">
            {description}
          </p>

          {/* ===== Highlights ===== */}
          {highlights.length > 0 && (
            <div className="flex flex-col items-center justify-center sm:flex-row sm:flex-wrap lg:flex-nowrap lg:items-start gap-3 mb-6 md:mb-8 animate-fade-in delay-200">
              {highlights.map((text, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center gap-2 bg-sky-50/60 lg:bg-sky-100 px-3 py-2 rounded-full w-max animate-fade-in"
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
                  <span className="text-xs sm:text-sm font-medium text-dark whitespace-nowrap font-[inter]">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ===== Botones ===== */}
          <div className="flex flex-col md:justify-center md:align-center sm:flex-row gap-3 md:gap-4 animate-fade-in delay-300">
            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                className="bg-primary hover:bg-sky-800 text-white font-bold py-3 px-6 rounded-lg transition text-sm md:text-base flex items-center justify-center gap-2 w-full sm:w-auto font-[inter] cursor-pointer"
              >
                {primaryAction.label}
              </button>
            )}

            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="border-2 border-white lg:border-secondary/80 hover:bg-gray-50 text-white hover:text-secondary lg:text-secondary font-bold py-3 px-6 rounded-lg transition text-sm md:text-base w-full sm:w-auto font-[inter] cursor-pointer"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
