// ─── Rincón de Promociones ────────────────────────────────────────────────────
// Cada promoción REFERENCIA un producto del catálogo por su `slug`
// (src/data/productos.js). No se duplican datos de producto: imagen, nombre,
// specs y categoría se resuelven en tiempo de render desde PRODUCTOS.
//
// SCHEMA de referencia — copiar para cada promoción nueva:
// {
//   id: se genera automáticamente con .map() al final del archivo — no agregar manualmente.
//   slugProducto: "",     // slug EXACTO del producto en productos.js
//   tipo: "",             // key de TIPOS_PROMOCION (abajo)
//   beneficio: "",        // beneficio principal, corto y escaneable. Ej: "15% de descuento"
//   detalle: "",          // condición o descripción breve. Ej: "En compras desde 10 bolsas"
//   inicio: "2026-07-01", // fecha de inicio (YYYY-MM-DD) — null si aplica desde ya
//   fin: "2026-08-31",    // fecha de fin (YYYY-MM-DD) — null si no tiene vencimiento
//   destacada: false,     // true → se muestra primero en el grid
// },

// Tipos de promoción soportados. `label` se muestra en el badge de la card.
export const TIPOS_PROMOCION = {
  descuento: { label: "Descuento" },
  volumen: { label: "Precio por volumen" },
  bundle: { label: "Compra y recibe" },
  envioGratis: { label: "Envío gratis" },
  temporal: { label: "Por tiempo limitado" },
  liquidacion: { label: "Liquidación" },
  lanzamiento: { label: "Lanzamiento" },
  precioEspecial: { label: "Precio especial" },
};

const _PROMOCIONES = [
  {
    slugProducto: "250ml-gatillera",
    tipo: "bundle",
    beneficio: "Trigger de regalo",
    detalle: "Por cada bolsa, un trigger sprayer incluido.",
    inicio: "2026-07-01",
    fin: "2026-07-31",
    destacada: false,
  },
  {
    slugProducto: "tarro-250-ml-liso",
    tipo: "volumen",
    beneficio: "Precio preferente por volumen",
    detalle: "Descuento escalonado a partir de 5,000 piezas.",
    inicio: null,
    fin: "2026-09-30",
    destacada: false,
  },
  {
    slugProducto: "pet-cilindro-publicitario-750-ml",
    tipo: "envioGratis",
    beneficio: "Envío gratis en CDMX y Edomex",
    detalle: "En pedidos desde 20 cajas.",
    inicio: "2026-07-15",
    fin: "2026-08-15",
    destacada: false,
  },
  {
    slugProducto: "especiero-120-ml",
    tipo: "precioEspecial",
    beneficio: "Precio especial de temporada",
    detalle: "Ideal para envasado de condimentos y mixes.",
    inicio: "2026-08-01",
    fin: "2026-09-15",
    destacada: false,
  },
];

export const PROMOCIONES = _PROMOCIONES.map((p, i) => ({ id: i + 1, ...p }));
