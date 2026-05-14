export default function ProductHeader({ total }) {
  return (
    <section className="bg-secondary py-8 md:py-12 border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          {/* Título */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
              Catálogo <span className="text-primary">Envases BH</span>
            </h1>

            <p className="text-white/60 text-sm mt-2 max-w-lg">
              Soluciones en envases PET para la industria nacional
            </p>
          </div>

          {/* Contador */}
          <div className="text-secondary font-semibold text-xs uppercase tracking-wider bg-gray-50 px-4 py-2 rounded w-fit">
            {total} modelos disponibles
          </div>
        </div>
      </div>
    </section>
  );
}
