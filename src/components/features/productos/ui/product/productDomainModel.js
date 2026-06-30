/**
 * Modelo de dominio de productos.
 *
 * Fuente única de verdad para reglas de negocio compartidas
 * relacionadas con clasificación y normalización de productos.
 *
 * Responsabilidades:
 * - Normalizar unidades de medida.
 * - Resolver equivalencias semánticas de capacidad.
 * - Inferir el tipo comercial del producto.
 * - Centralizar reglas reutilizadas por UI, filtros,
 *   SEO, metadata y componentes de catálogo.
 *
 * IMPORTANTE:
 * Este módulo NO convierte capacidades a una unidad base numérica.
 * La capacidad se mantiene en su forma original + unidad asociada
 * para evitar pérdida de semántica.
 */

/* -----------------------------
 * UNIDADES CANÓNICAS
 * ----------------------------- */

/**
 * Diccionario de equivalencias de unidades.
 * Normaliza variantes de escritura a formato estándar.
 */
export const UNIT_MAP = {
  ml: "ml",
  mililitro: "ml",
  mililitros: "ml",

  l: "L",
  litro: "L",
  litros: "L",

  gal: "gal",
  galon: "gal",
  galón: "gal",
  galones: "gal",
};

/**
 * Expresiones semánticas especiales.
 * Casos donde el texto representa una cantidad implícita.
 */
export const SEMANTIC_UNITS = {
  "medio galón": { value: 0.5, unit: "gal" },
  "1/2 galón": { value: 0.5, unit: "gal" },
  "cuarto de galón": { value: 0.25, unit: "gal" },
};

/* -----------------------------
 * NORMALIZACIÓN DE UNIDADES
 * ----------------------------- */

/**
 * Normaliza una unidad textual a su forma canónica.
 *
 * Ej:
 * "Litros" → "L"
 * "mililitros" → "ml"
 * "galón" → "gal"
 */
export function normalizarUnidad(raw = "") {
  const value = raw.toLowerCase().trim();

  // Casos semánticos (expresiones completas)
  if (SEMANTIC_UNITS[value]) {
    return SEMANTIC_UNITS[value].unit;
  }

  // Diccionario directo
  if (UNIT_MAP[value]) {
    return UNIT_MAP[value];
  }

  // Inferencia ligera (fallback)
  if (value.includes("ml")) return "ml";
  if (value.includes("l")) return "L";
  if (value.includes("gal")) return "gal";

  return value;
}

/* -----------------------------
 * TIPO DE PRODUCTO
 * ----------------------------- */

/**
 * Inferencia del tipo comercial basada en categoría.
 *
 * Esto se usa SOLO para UI, naming y SEO.
 */
export function inferirTipo(producto) {
  const categoria = (producto?.categoria || "").toLowerCase();
  const nombre = (producto?.nombre || "").toLowerCase();

  const PREFIJOS_EN_NOMBRE = [
    { prefix: "tapa ", tipo: "" },
    { prefix: "bomba ", tipo: "" },
    { prefix: "trigger ", tipo: "" },
    { prefix: "vitrolero ", tipo: "" },
    { prefix: "tarro ", tipo: "" },
  ];

  for (const { prefix, tipo } of PREFIJOS_EN_NOMBRE) {
    if (nombre.startsWith(prefix)) return tipo;
  }

  if (categoria.includes("tapas")) return "Tapa";
  if (categoria.includes("bombas")) return "Bomba";
  if (categoria.includes("triggers")) return "Trigger";
  if (categoria.includes("vitroleros")) return "Vitrolero";

  return "Envase";
}

/* -----------------------------
 * CATEGORÍAS
 * ----------------------------- */

/**
 * Normaliza categoría para filtros y agrupación.
 */
export function normalizarCategoria(producto) {
  const categoria = (producto?.categoria || "").trim();

  if (!categoria) return "";

  const categoriaLower = categoria.toLowerCase();
  const nombre = (producto?.nombre || "").toLowerCase();

  // Categorías mixtas
  if (
    categoriaLower.includes("tapas") &&
    categoriaLower.includes("bombas") &&
    categoriaLower.includes("triggers")
  ) {
    if (nombre.includes("tapa")) return "Tapas";
    if (nombre.includes("bomba")) return "Bombas";
    if (nombre.includes("trigger") || nombre.includes("atomizador"))
      return "Triggers";

    return "Tapas";
  }

  if (
    categoriaLower.includes("tarros") &&
    categoriaLower.includes("vitroleros")
  ) {
    if (nombre.includes("vitrolero")) return "Vitroleros";
    return "Tarros";
  }

  return categoria;
}

/* -----------------------------
 * CAPACIDAD (CRÍTICO)
 * ----------------------------- */

/**
 * Clasificación por rangos.
 * IMPORTANTE: asume consistencia de unidad externa.
 */
export function obtenerRangoCapacidad(capacidad) {
  if (!capacidad || typeof capacidad !== "number") return null;

  if (capacidad < 100) return "micro";
  if (capacidad <= 500) return "pequeno";
  if (capacidad <= 1000) return "mediano";
  return "grande";
}

/**
 * Normalización de capacidad SIN conversión de unidades.
 *
 * ❌ NO convierte L → ml
 * ❌ NO altera magnitud
 *
 * Solo estructura el dato para consumo consistente.
 *
 * Salida:
 * {
 *   value: number,
 *   unit: string
 * }
 */
export function normalizarCapacidad(producto) {
  if (!producto) return null;

  const capacidad = producto?.specs?.capacidad;
  const unidad = producto?.specs?.unidad || "ml";

  if (capacidad == null) return null;

  return {
    value: Number(capacidad),
    unit: unidad.toLowerCase(),
  };
}

/**
 * Capacidad normalizada SOLO para ordenamiento.
 *
 * No se usa para UI.
 * No modifica los datos originales.
 */
export function obtenerCapacidadOrdenable(producto) {
  const capacidad = producto?.specs?.capacidad;

  if (capacidad == null) {
    return Infinity;
  }

  const unidad = (producto?.specs?.unidad || "").toLowerCase();

  switch (unidad) {
    case "ml":
      return capacidad;

    case "l":
      return capacidad * 1000;

    case "gal":
      return capacidad * 3785;

    default:
      return capacidad;
  }
}
