"use client";

import { useCart } from "@/context/CartContext";

export default function CartItem({ item }) {
  const { removeItem, updateCantidad } = useCart();

  const handleCantidad = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) updateCantidad(item.id, val);
  };

  const nombre = item.nombre || item.name || "Producto";
  const imagen = item.imagen || item.image || null;

  return (
    <li className="flex gap-3 py-4 border-b border-neutral-100 last:border-0 group">
      {/* Imagen */}
      {imagen ? (
        <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100">
          <img
            src={imagen}
            alt={nombre}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-14 h-14 rounded-lg flex-shrink-0 bg-neutral-100 flex items-center justify-center text-neutral-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
            />
          </svg>
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-neutral-800 leading-tight truncate">
          {nombre}
        </p>
        {item.referencia && (
          <p className="text-xs text-neutral-400 mt-0.5">
            Ref: {item.referencia}
          </p>
        )}

        {/* Cantidad */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateCantidad(item.id, item.cantidad - 1)}
            className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 hover:border-neutral-300 transition-colors text-sm leading-none"
            aria-label="Reducir cantidad"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            value={item.cantidad}
            onChange={handleCantidad}
            className="w-10 text-center text-sm font-medium text-neutral-700 border border-neutral-200 rounded-md py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
          />
          <button
            onClick={() => updateCantidad(item.id, item.cantidad + 1)}
            className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 hover:border-neutral-300 transition-colors text-sm leading-none"
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
      </div>

      {/* Eliminar */}
      <button
        onClick={() => removeItem(item.id)}
        className="self-start mt-0.5 text-neutral-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Eliminar producto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}
