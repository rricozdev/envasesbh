import { inferirTipo } from "../components/features/productos/ui/product/productDomainModel";

/**
 * NORMALIZACIÓN BASE
 */
function normalize(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * SINÓNIMOS DOMINIO
 */
const SYNONYMS = {
  envase: ["envase", "embase", "contenedor"],
  sinfin: ["sinfin", "sin fin", "sin-fin", "sinfín", "sin fín"],
};

/**
 * EXPANSIÓN DE QUERY
 */
function expandQuery(query) {
  const words = normalize(query).split(" ");
  const expanded = [];

  for (const word of words) {
    let replaced = false;

    for (const key in SYNONYMS) {
      if (SYNONYMS[key].includes(word)) {
        expanded.push(key);
        replaced = true;
        break;
      }
    }

    if (!replaced) expanded.push(word);
  }

  return expanded.join(" ");
}

/**
 * DETECCIÓN DE CAPACIDAD EN QUERY
 */
function extractCapacityQuery(query = "") {
  const q = normalize(query);
  if (q.includes("medio galon")) {
    return {
      value: 0.5,
      unit: "gal",
    };
  }

  if (q.includes("1 2 galon")) {
    return {
      value: 0.5,
      unit: "gal",
    };
  }

  if (q.includes("cuarto de galon")) {
    return {
      value: 0.25,
      unit: "gal",
    };
  }

  const match = q.match(
    /(\d+(?:\.\d+)?)\s*(ml|l|litro|litros|gal|galon|galones)/,
  );

  if (!match) return null;

  const rawUnit = match[2];

  let unit = rawUnit;

  if (["l", "litro", "litros"].includes(rawUnit)) {
    unit = "L";
  }

  if (["gal", "galon", "galones"].includes(rawUnit)) {
    unit = "gal";
  }

  if (rawUnit === "ml") {
    unit = "ml";
  }

  return {
    value: Number(match[1]),
    unit,
  };
}

/**
 * TEXTO DE BÚSQUEDA DEL PRODUCTO
 * FUENTE ÚNICA: datos del catálogo (NO parser)
 */
function productSearchText(producto) {
  return normalize(
    [
      producto?.nombre,
      producto?.categoria,
      producto?.slug,
      producto?.specs?.corona,
      producto?.specs?.capacidad,
      producto?.specs?.unidad,
      inferirTipo(producto),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function toMl(value, unit) {
  switch (unit) {
    case "L":
      return value * 1000;

    case "gal":
      return value * 3785;

    default:
      return value;
  }
}

/**
 * SCORE DE MATCH
 */
function scoreMatch(productText, queryText, producto) {
  const product = normalize(productText);
  const query = normalize(queryText);

  const capacityQuery = extractCapacityQuery(queryText);

  if (capacityQuery) {
    const cap = Number(producto?.specs?.capacidad);
    const unit = producto?.specs?.unidad;

    if (cap == null) return 0;

    const productMl = toMl(cap, unit);
    const queryMl = toMl(capacityQuery.value, capacityQuery.unit);

    return productMl === queryMl ? 1000 : 0;
  }

  if (product.includes(query)) return 100;

  const queryWords = query.split(" ").filter(Boolean);

  const matchedWords = queryWords.filter((word) => product.includes(word));

  if (queryWords.length > 1) {
    return matchedWords.length === queryWords.length
      ? 200 + matchedWords.length * 10
      : 0;
  }

  return matchedWords.length > 0 ? 10 : 0;
}

/**
 * SEARCH PRINCIPAL
 */
export function searchProducts(productos, query) {
  if (!query) return productos;

  const expandedQuery = expandQuery(query);

  const scored = productos
    .map((p) => {
      const text = productSearchText(p);

      return {
        product: p,
        score: scoreMatch(text, expandedQuery, p),
      };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map((s) => s.product);
}
