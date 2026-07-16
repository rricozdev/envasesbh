import { PRODUCTOS } from "@/data/productos";
import { PROMOCIONES, TIPOS_PROMOCION } from "@/data/promociones";

// Estados posibles de una promoción según su vigencia.
export const ESTADOS_PROMOCION = {
  ACTIVA: "activa",
  PROXIMA: "proxima",
  EXPIRADA: "expirada",
};

// Parsea "YYYY-MM-DD" como fecha local (evita el desfase UTC de new Date(string)).
function parseFecha(fecha) {
  if (!fecha) return null;
  const [y, m, d] = fecha.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Fin de vigencia inclusivo: la promoción vence al terminar el día `fin`.
function finDeDia(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999
  );
}

export function obtenerEstadoPromocion(promo, now = new Date()) {
  const inicio = parseFecha(promo.inicio);
  const fin = parseFecha(promo.fin);

  if (fin && now > finDeDia(fin)) return ESTADOS_PROMOCION.EXPIRADA;
  if (inicio && now < inicio) return ESTADOS_PROMOCION.PROXIMA;
  return ESTADOS_PROMOCION.ACTIVA;
}

const MESES_CORTOS = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

export function formatearFechaCorta(fecha) {
  const date = parseFecha(fecha);
  if (!date) return null;
  return `${date.getDate()} ${MESES_CORTOS[date.getMonth()]} ${date.getFullYear()}`;
}

// Texto de vigencia escaneable para la card según el estado.
export function obtenerTextoVigencia(promo, estado) {
  if (estado === ESTADOS_PROMOCION.PROXIMA && promo.inicio) {
    return `Inicia el ${formatearFechaCorta(promo.inicio)}`;
  }
  if (promo.fin) return `Válida hasta el ${formatearFechaCorta(promo.fin)}`;
  return "Vigencia sujeta a disponibilidad";
}

export function obtenerLabelTipo(tipo) {
  return TIPOS_PROMOCION[tipo]?.label ?? "Promoción";
}

// Une cada promoción con su producto del catálogo (sin duplicar datos).
// Descarta promociones cuyo slug no exista en PRODUCTOS.
export function obtenerPromocionesConProducto() {
  return PROMOCIONES.map((promo) => {
    const producto = PRODUCTOS.find((p) => p.slug === promo.slugProducto);
    if (!producto) return null;
    return { ...promo, producto };
  }).filter(Boolean);
}

// Promociones visibles (activas y próximas), destacadas primero.
// Las expiradas no se muestran en el sitio.
export function obtenerPromocionesVisibles(now = new Date()) {
  const conEstado = obtenerPromocionesConProducto().map((promo) => ({
    ...promo,
    estado: obtenerEstadoPromocion(promo, now),
  }));

  const orden = (lista) =>
    [...lista].sort((a, b) => (b.destacada === true) - (a.destacada === true));

  return {
    activas: orden(
      conEstado.filter((p) => p.estado === ESTADOS_PROMOCION.ACTIVA)
    ),
    proximas: orden(
      conEstado.filter((p) => p.estado === ESTADOS_PROMOCION.PROXIMA)
    ),
  };
}

// Mensaje de WhatsApp pre-formateado para consultar una promoción.
export function generarMensajePromocion(promo, nombreProducto) {
  return [
    `Hola, me interesa la promoción "${promo.beneficio}" del producto *${nombreProducto}*.`,
    "¿Me pueden dar más información sobre disponibilidad y precios?",
  ].join(" ");
}
