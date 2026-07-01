import {
  inferirTipo,
  normalizarCategoria,
} from "../components/features/productos/ui/product/productDomainModel";

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
  envase: ["envase", "embase", "contenedor", "botella", "frasco", "recipiente"],
  sinfin: ["sinfin", "sin fin", "sin-fin", "sinfín", "sin fín"],
  pco: ["pco", "corona", "rosca"],
  trigger: ["trigger", "gatillera"],
  tapa: ["tapa", "tapón"],
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

  return [...new Set(expanded)].join(" ");
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
      normalizarCategoria(producto),
      producto?.slug,
      producto?.specs?.corona,
      producto?.specs?.capacidad,
      producto?.specs?.unidad,
      inferirTipo(producto),
      ...(producto?.specs?.colores ?? []),
      ...(producto?.specs?.coloresBajoPedido ?? []),
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
 * DISTANCIA LEVENSHTEIN
 */
function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function fuzzyMatch(word, productWords) {
  const maxDist = word.length <= 5 ? 1 : 2;
  for (const pw of productWords) {
    if (Math.abs(pw.length - word.length) > maxDist) continue;
    if (levenshtein(word, pw) <= maxDist) return true;
  }
  return false;
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

  if (/^\d+$/.test(query)) {
    if (new RegExp(`\\b${query}\\b`).test(product)) return 100;
  } else if (product.includes(query)) return 100;

  const queryWords = query.split(" ").filter(Boolean);

  if (queryWords.length === 0) return 0;

  const productWords = product.split(" ").filter(Boolean);

  const matchedWords = queryWords.filter((word) => {
    if (/^\d+$/.test(word)) {
      if (new RegExp(`\\b${word}\\b`).test(product)) return true;
      return false;
    }
    if (product.includes(word)) return true;
    return fuzzyMatch(word, productWords);
  });

  if (matchedWords.length === 0) return 0;

  const ratio = matchedWords.length / queryWords.length;
  return Math.round(200 * ratio) + matchedWords.length * 10;
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
