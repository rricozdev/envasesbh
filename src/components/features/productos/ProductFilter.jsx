"use client";

import { Search, X, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

const RANGOS_CAPACIDAD = [
  { label: "Menos de 100 ml", value: "micro" },
  { label: "100 ml – 500 ml", value: "pequeno" },
  { label: "500 ml – 1 lt", value: "mediano" },
  { label: "Más de 1 lt", value: "grande" },
];

function Acordeon({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef(null);

  return (
    <div className="border-t border-gray-100 pt-4 mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-secondary mb-3 cursor-pointer"
      >
        {title}
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: open ? contentRef.current?.scrollHeight + "px" : "0px",
          overflow: "hidden",
          transition: "max-height 300ms ease-in-out",
        }}
      >
        <div className="flex flex-col gap-1 pb-1">{children}</div>
      </div>
    </div>
  );
}

function FiltroChip({ label, activo, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-3 py-1.5 rounded-lg text-xs transition-all duration-200 cursor-pointer ${
        activo
          ? "bg-primary text-white font-bold"
          : "text-secondary/70 hover:bg-gray-50 hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}

export default function ProductFilter({
  activa,
  onSelect,
  search,
  setSearch,
  color,
  setColor,
  capacidadRango,
  setCapacidadRango,
  opcionesBase = { colores: [], tieneCapacidad: false },
}) {
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

  const hayFiltros = color || capacidadRango;

  return (
    <div className="w-full">
      {/* MOBILE */}
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

      {/* DESKTOP */}
      <div className="hidden lg:block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-32">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-secondary font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
            <span className="w-1.5 h-5 bg-primary rounded-full" />
            Filtros
          </h3>
          {hayFiltros && (
            <button
              onClick={() => {
                setColor(null);
                setCapacidadRango(null);
              }}
              className="text-[10px] text-primary hover:underline cursor-pointer font-semibold"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Búsqueda */}
        <div className="mb-5 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4 cursor-pointer" />
            </button>
          )}
        </div>

        {/* Categorías */}
        <Acordeon title="Categorías" defaultOpen={true}>
          {categorias.map((cat) => (
            <FiltroChip
              key={cat}
              label={cat}
              activo={activa === cat}
              onClick={() => onSelect(cat)}
            />
          ))}
        </Acordeon>

        {/* Capacidad */}
        {opcionesBase.tieneCapacidad && (
          <Acordeon title="Capacidad" defaultOpen>
            {RANGOS_CAPACIDAD.map((r) => (
              <FiltroChip
                key={r.value}
                label={r.label}
                activo={capacidadRango === r.value}
                onClick={() =>
                  setCapacidadRango(capacidadRango === r.value ? null : r.value)
                }
              />
            ))}
          </Acordeon>
        )}

        {/* Color */}
        {opcionesBase.colores.length > 0 && (
          <Acordeon title="Color">
            {opcionesBase.colores.map((c) => (
              <FiltroChip
                key={c}
                label={c}
                activo={color === c}
                onClick={() => setColor(color === c ? null : c)}
              />
            ))}
          </Acordeon>
        )}
      </div>
    </div>
  );
}
