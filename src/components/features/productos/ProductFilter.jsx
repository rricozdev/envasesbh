"use client";

import { ChevronDown, Filter, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const RANGOS_CAPACIDAD = [
  { label: "Menos de 100 ml", value: "micro" },
  { label: "100 ml – 500 ml", value: "pequeno" },
  { label: "500 ml – 1 lt", value: "mediano" },
  { label: "Más de 1 lt", value: "grande" },
];

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
      className="flex items-center gap-2 text-left py-1.5 text-xs transition-all duration-200 cursor-pointer group"
    >
      <span
        className={`w-4 h-4 shrink-0 rounded border transition-all duration-200 flex items-center justify-center ${
          activo
            ? "bg-primary border-primary"
            : "border-gray-300 group-hover:border-primary/50"
        }`}
      >
        {activo && (
          <svg
            viewBox="0 0 10 8"
            className="w-2.5 h-2.5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M1 4l3 3 5-5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span
        className={
          activo
            ? "text-primary font-semibold"
            : "text-secondary/70 group-hover:text-primary"
        }
      >
        {label}
      </span>
    </button>
  );
}

function PanelFiltros({
  activa,
  onSelect,
  color,
  setColor,
  capacidadRango,
  setCapacidadRango,
  opcionesBase,
  disponibilidad,
  setDisponibilidad,
}) {
  return (
    <>
      <Acordeon title="Categorías" defaultOpen={false}>
        {categorias.map((cat) => (
          <FiltroChip
            key={cat}
            label={cat}
            activo={activa === cat}
            onClick={() => onSelect(cat)}
          />
        ))}
      </Acordeon>

      {opcionesBase.tieneCapacidad && (
        <Acordeon title="Capacidad" defaultOpen={false}>
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

      {opcionesBase.colores.length > 0 && (
        <Acordeon title="Color" defaultOpen={false}>
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

      <Acordeon title="Disponibilidad" defaultOpen={false}>
        <FiltroChip
          label="En stock"
          activo={disponibilidad === "stock"}
          onClick={() =>
            setDisponibilidad(disponibilidad === "stock" ? null : "stock")
          }
        />
        <FiltroChip
          label="Bajo pedido"
          activo={disponibilidad === "pedido"}
          onClick={() =>
            setDisponibilidad(disponibilidad === "pedido" ? null : "pedido")
          }
        />
      </Acordeon>
    </>
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
  disponibilidad,
  setDisponibilidad,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const hayFiltros =
    color || capacidadRango || activa !== "Todos" || disponibilidad;

  const limpiarFiltros = () => {
    setColor(null);
    setCapacidadRango(null);
    setDisponibilidad(null);
    onSelect("Todos");
  };

  // Bloquear scroll del body cuando drawer está abierto
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      {/* ── MOBILE ── */}
      <div className="lg:hidden w-full space-y-3">
        {/* Searchbar + botón filtros */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
              hayFiltros
                ? "bg-primary text-white border-primary"
                : "bg-white text-secondary border-gray-200"
            }`}
          >
            <Filter size={16} />
            Filtros
            {hayFiltros && (
              <span className="w-4 h-4 rounded-full bg-white text-primary text-[10px] font-black flex items-center justify-center">
                !
              </span>
            )}
          </button>

          {hayFiltros && (
            <button
              onClick={limpiarFiltros}
              className="px-3 py-2.5 rounded-xl border border-red-200 text-red-400 text-xs font-semibold hover:bg-red-50 transition-all cursor-pointer"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* ── BOTTOM SHEET MOBILE ── */}
      {drawerOpen && (
        <>
          {/* Overlay */}
          <div
            className="lg:hidden fixed inset-0 bg-black/40 z-[400]"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Sheet */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[401] bg-white rounded-t-2xl shadow-2xl max-h-[80vh] flex flex-col">
            {/* Header sheet */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">
                Filtros
              </h3>
              <div className="flex items-center gap-3">
                {hayFiltros && (
                  <button
                    onClick={limpiarFiltros}
                    className="text-xs text-primary font-semibold cursor-pointer hover:underline"
                  >
                    Limpiar todo
                  </button>
                )}
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-gray-400 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Contenido scroll */}
            <div className="overflow-y-auto px-5 pb-8">
              <PanelFiltros
                activa={activa}
                onSelect={(cat) => {
                  onSelect(cat);
                }}
                color={color}
                setColor={setColor}
                capacidadRango={capacidadRango}
                setCapacidadRango={setCapacidadRango}
                opcionesBase={opcionesBase}
                disponibilidad={disponibilidad}
                setDisponibilidad={setDisponibilidad}
              />
            </div>

            {/* Footer sheet */}
            <div className="px-5 py-4 border-t border-gray-100">
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full bg-primary text-white text-sm font-bold py-3 rounded-xl cursor-pointer"
              >
                Ver resultados
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── DESKTOP ── */}
      <div className="hidden lg:block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-secondary font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
            <span className="w-1.5 h-5 bg-primary rounded-full" />
            Filtros
          </h3>
          {hayFiltros && (
            <button
              onClick={limpiarFiltros}
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

        <PanelFiltros
          activa={activa}
          onSelect={onSelect}
          color={color}
          setColor={setColor}
          capacidadRango={capacidadRango}
          setCapacidadRango={setCapacidadRango}
          opcionesBase={opcionesBase}
          disponibilidad={disponibilidad}
          setDisponibilidad={setDisponibilidad}
        />
      </div>
    </>
  );
}
