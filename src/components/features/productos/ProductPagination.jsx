export default function ProductPagination({
  pagina,
  totalPaginas,
  paginasVisibles,
  onPageChange,
}) {
  return (
    <nav className="mt-12 flex flex-col items-center gap-6">
      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-2">
        {/* BOTÓN ANTERIOR */}

        <button
          onClick={() => onPageChange((p) => Math.max(1, p - 1))}
          disabled={pagina === 1}
          className="w-auto min-w-[110px] px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm font-semibold text-gray-700 hover:bg-white hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
        >
          ← Anterior
        </button>

        {/* NÚMEROS */}

        <div className="max-w-full overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max px-1">
            {paginasVisibles.map((num) => (
              <button
                key={num}
                onClick={() => onPageChange(num)}
                className={`
                  cursor-pointer
                  shrink-0
                  w-9 h-9
                  rounded-lg
                  text-xs font-semibold
                  transition-all duration-200
                  ${
                    pagina === num
                      ? "bg-primary text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-white hover:border-gray-400"
                  }
                `}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* BOTÓN SIGUIENTE */}

        <button
          onClick={() => onPageChange((p) => Math.min(totalPaginas, p + 1))}
          disabled={pagina === totalPaginas}
          className="w-auto min-w-[110px] px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm font-semibold text-gray-700 hover:bg-white hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
        >
          Siguiente →
        </button>
      </div>
    </nav>
  );
}
