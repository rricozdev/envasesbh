// SectionContent solo usa las animaciones CSS definidas en globals.css.
// Versión original con Framer Motion: SectionContentMotion.jsx (para páginas
// que sí necesiten stagger/fadeUp complejos como el chatbot o catálogo).

export default function SectionContent({
  id,
  title,
  subtitle,
  children,
  className = "",
  containerClassName = "",
  align = "center",
  animated = true,
}) {
  const isCenter = align === "center";

  return (
    <section id={id} className={`py-12 px-4 lg:px-0 ${containerClassName}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div
            className={`max-w-2xl ${
              isCenter ? "mx-auto text-center" : "text-left"
            } ${animated ? "animate-fade-in" : ""}`}
          >
            {title && (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-secondary/90 font-primary leading-tight">
                {title}
              </h2>
            )}

            {subtitle && (
              <p
                className={`mt-4 text-base lg:text-lg text-gray-600 font-secondary ${
                  animated ? "animate-fade-in delay-100" : ""
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div
          className={`${title || subtitle ? "mt-10" : ""} ${className} ${
            animated ? "animate-fade-in delay-200" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
