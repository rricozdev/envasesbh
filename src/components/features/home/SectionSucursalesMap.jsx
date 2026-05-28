"use client";

import {
  Building2,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  MapPin,
  Phone,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import SectionContent from "@/components/ui/SectionContent";
import { MapMexico } from "./MapMexico";

const sucursales = {
  "MX-DIF": {
    ciudad: "Ciudad de México",
    estado: "CDMX",
    direccion:
      "Azafrán 380, Granjas México Iztacalco, CP 08400 Ciudad de México, CDMX",
  },

  "MX-PUE": {
    ciudad: "Puebla",
    estado: "PUE",
    direccion: "Miguel Hidalgo 6155, Col. El Patrimonio, CP 72450, Puebla, Pue",
  },

  "MX-VER": {
    ciudad: "Veracruz",
    estado: "VER",
    direccion:
      "Igualdad #1398 entre Arista y Esteban Morales, Unidad Veracruzana, C.P. 91710, Veracruz, México",
  },

  "MX-MEX": {
    ciudad: "Nezahualcóyotl",
    estado: "MEX",
    direccion: "Vicente Villada #744, Nezahualcóyotl, México, 57000",
  },

  "MX-QUE": {
    ciudad: "Querétaro",
    estado: "QUE",
    direccion:
      "ARGO Conjunto Industrial Victoria II, Acceso III 52, Bodega17 76100, Benito Juárez, 76120 Santiago de Querétaro, Qro.",
  },

  "MX-JAL": {
    ciudad: "Guadalajara",
    estado: "JAL",
    direccion:
      "ALMER Avenida 18 de Marzo 704, Bodega 38, La Nogalera, Guadalajara, Jalisco",
  },
};

const estadosActivos = Object.keys(sucursales);

export default function SectionSucursalesMap() {
  const [active, setActive] = useState("MX-DIF");
  const [copied, setCopied] = useState(false);
  const [showMobileInfo, setShowMobileInfo] = useState(false);

  const sucursalActiva = useMemo(() => {
    return sucursales[active];
  }, [active]);

  const handleCopy = (texto) => {
    navigator.clipboard.writeText(texto);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  return (
    <SectionContent
      title="Nuestra Red de Distribución"
      subtitle="Presencia estratégica en los principales puntos de México para garantizar entregas rápidas, atención eficiente y cobertura confiable para tu negocio."
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
        {/* ========================= */}
        {/* SIDEBAR */}
        {/* ========================= */}

        <aside className="hidden xl:block">
          <div className="sticky top-24 space-y-3">
            {estadosActivos.map((estadoId) => {
              const data = sucursales[estadoId];
              const isActive = active === estadoId;

              return (
                <button
                  key={estadoId}
                  type="button"
                  onMouseEnter={() => setActive(estadoId)}
                  onClick={() => setActive(estadoId)}
                  className={`
                    group
                    relative
                    flex
                    w-full
                    items-center
                    gap-4
                    overflow-hidden
                    rounded-2xl
                    border
                    px-4
                    py-4
                    text-left
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "border-cyan-300 bg-white shadow-xl shadow-cyan-100/60"
                        : "border-gray-100 bg-white/80 hover:border-cyan-200 hover:bg-white hover:shadow-md"
                    }
                  `}
                >
                  {/* glow */}
                  <div
                    className={`
                      absolute
                      inset-y-0
                      left-0
                      w-1
                      rounded-full
                      transition-all
                      ${
                        isActive
                          ? "bg-cyan-500"
                          : "bg-transparent group-hover:bg-cyan-300"
                      }
                    `}
                  />

                  <div
                    className={`
                      flex
                      h-12
                      w-12
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "bg-cyan-100 text-cyan-700"
                          : "bg-gray-100 text-gray-400 group-hover:bg-cyan-50 group-hover:text-cyan-600"
                      }
                    `}
                  >
                    <MapPin size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-gray-900">
                      {data.ciudad}
                    </h3>

                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                      <Building2 size={13} />
                      Centro de distribución
                    </p>
                  </div>

                  <div
                    className={`
                      h-2.5
                      w-2.5
                      rounded-full
                      transition-all
                      ${
                        isActive
                          ? "bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.7)]"
                          : "bg-gray-200 group-hover:bg-cyan-300"
                      }
                    `}
                  />
                </button>
              );
            })}
          </div>
        </aside>

        {/* ========================= */}
        {/* MAPA */}
        {/* ========================= */}

        <div className="relative">
          <div
            className="
              relative
              overflow-hidden
              rounded-[20px]
              border
              border-cyan-100
              bg-linear-to-br
              from-cyan-50
              via-white
              to-cyan-100/40
              shadow-[0_20px_80px_-25px_rgba(0,169,193,0.35)]
              h-[400px]
              sm:h-[480px]
              xl:h-[580px]
            "
          >
            {/* ========================= */}
            {/* MOBILE SELECT */}
            {/* ========================= */}

            <div className="absolute left-4 right-4 top-4 z-40 xl:hidden">
              <div className="relative">
                <select
                  value={active}
                  onChange={(e) => {
                    setActive(e.target.value);
                    setShowMobileInfo(true);
                  }}
                  className="
                    h-12
                    w-full
                    appearance-none
                    rounded-2xl
                    border
                    border-white/70
                    bg-white/90
                    px-4
                    pr-11
                    text-sm
                    font-semibold
                    text-gray-800
                    shadow-xl
                    backdrop-blur-md
                    outline-none
                    transition-all
                    focus:border-cyan-300
                    focus:ring-4
                    focus:ring-cyan-100
                  "
                >
                  {estadosActivos.map((estadoId) => (
                    <option key={estadoId} value={estadoId}>
                      {sucursales[estadoId].ciudad}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  className="
                    pointer-events-none
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-cyan-600
                  "
                />
              </div>
            </div>

            {/* ========================= */}
            {/* MAPA */}
            {/* ========================= */}

            <div
              className="
                absolute
                inset-0
                z-10
                flex
                items-center
                justify-center
                overflow-hidden
                px-4
                pt-16
                pb-4
                sm:px-8
                sm:pt-20
                xl:p-10
              "
            >
              <MapMexico
                active={active}
                onHover={setActive}
                onClick={(value) => {
                  setActive(value);
                  setShowMobileInfo(true);
                }}
                className="
                  max-h-full
                  max-w-full
                  transition-transform
                  duration-500
                "
              />
            </div>

            {/* ========================= */}
            {/* DESKTOP FLOATING CARD */}
            {/* ========================= */}

            {sucursalActiva && (
              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  z-30
                  hidden
                  w-[340px]
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/80
                  bg-white/85
                  p-5
                  shadow-2xl
                  backdrop-blur-xl
                  xl:block
                "
              >
                <div className="flex items-start gap-4">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-cyan-100
                      text-cyan-700
                    "
                  >
                    <MapPin size={14} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-base font-bold text-gray-900">
                          {sucursalActiva.ciudad}
                        </h3>

                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                          <Building2 size={13} />
                          Centro de distribución
                        </p>
                      </div>

                      <div className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                        Activo
                      </div>
                    </div>

                    <div className="mt-5 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-cyan-600">
                          <MapPin size={16} />
                        </div>

                        <p className="text-sm leading-relaxed text-gray-600">
                          {sucursalActiva.direccion}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ========================= */}
          {/* MOBILE INFO */}
          {/* ========================= */}

          {showMobileInfo && (
            <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-300 xl:hidden">
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-cyan-100
                  bg-white
                  p-5
                  shadow-xl
                "
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400" />

                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-cyan-100
                        text-cyan-700
                      "
                    >
                      <MapPin size={22} />
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        {sucursalActiva.ciudad}
                      </h3>

                      <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <Building2 size={13} />
                        Centro de distribución
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowMobileInfo(false)}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-gray-100
                      text-gray-500
                      transition-all
                      hover:bg-gray-200
                      hover:text-gray-700
                    "
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-start gap-3">
                      <MapPin
                        size={18}
                        className="mt-0.5 flex-shrink-0 text-cyan-600"
                      />

                      <p className="text-sm leading-relaxed text-gray-700">
                        {sucursalActiva.direccion}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(sucursalActiva.telefono)}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-cyan-100
                      bg-cyan-50/50
                      px-4
                      py-3
                      transition-all
                      hover:border-cyan-200
                    "
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-white
                        text-cyan-600
                      "
                    >
                      <Phone size={18} />
                    </div>

                    <div className="flex-1 text-left">
                      <p className="text-xs text-gray-400">Teléfono</p>

                      <p className="text-sm font-semibold text-gray-700">
                        {sucursalActiva.telefono}
                      </p>
                    </div>

                    {copied ? (
                      <Check size={18} className="text-emerald-600" />
                    ) : (
                      <Copy size={16} className="text-gray-400" />
                    )}
                  </button>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-gray-100
                      bg-gray-50
                      px-4
                      py-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-white
                        text-cyan-600
                      "
                    >
                      <Clock3 size={18} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Horario</p>

                      <p className="text-sm font-medium text-gray-700">
                        {sucursalActiva.horario}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionContent>
  );
}
