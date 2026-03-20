export default function ProductFilter({ activa, onSelect }) {
  const categorias = [
    "Todos",
    "Agua",
    "Alimentos y Bebidas",
    "Amenidades Hoteleras",
    "Boston",
    "Cosméticos",
    "Especieros",
    "Farmacéuticos",
    "Limpieza",
    "Publicitarios",
    "Tarros y Vitroleros",
    "Tapas, Bombas y Triggers",
  ];

  return (
    <div className="w-full">
      {/* --- DISEÑO MOBILE: Scroll Horizontal --- */}
      <div className="lg:hidden w-full overflow-x-auto no-scrollbar pb-4 -mt-2">
        <div className="flex flex-nowrap gap-2 px-1">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                activa === cat
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                  : "bg-white text-secondary border-gray-200 hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- DISEÑO DESKTOP: Sidebar Vertical --- */}
      <div className="hidden lg:block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-32">
        <h3 className="text-secondary font-bold mb-5 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-primary rounded-full"></span>
          Categorías
        </h3>
        <div className="flex flex-col gap-1">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                activa === cat
                  ? "bg-primary text-white font-bold shadow-md shadow-primary/20"
                  : "text-secondary/70 hover:bg-gray-50 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
