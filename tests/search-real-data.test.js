import { describe, it } from "node:test";
import assert from "node:assert";
import { _PRODUCTOS } from "../src/data/productos.js";

// --- Inline search functions ---

function normalize(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const SYNONYMS = {
  envase: ["envase", "embase", "contenedor", "botella", "frasco", "recipiente"],
  sinfin: ["sinfin", "sin fin", "sin-fin", "sinfín", "sin fín"],
  pco: ["pco", "corona", "rosca"],
  trigger: ["trigger", "gatillera"],
  tapa: ["tapa", "tapón"],
};

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

function extractCapacityQuery(query = "") {
  const q = normalize(query);
  if (q.includes("medio galon")) return { value: 0.5, unit: "gal" };
  if (q.includes("1 2 galon")) return { value: 0.5, unit: "gal" };
  if (q.includes("cuarto de galon")) return { value: 0.25, unit: "gal" };
  const m = q.match(/(\d+(?:\.\d+)?)\s*(ml|l|litro|litros|gal|galon|galones)/);
  if (!m) return null;
  const ru = m[2];
  let u = ru;
  if (["l", "litro", "litros"].includes(ru)) u = "L";
  if (["gal", "galon", "galones"].includes(ru)) u = "gal";
  if (ru === "ml") u = "ml";
  return { value: Number(m[1]), unit: u };
}

function toMl(value, unit) {
  switch (unit) {
    case "L": return value * 1000;
    case "gal": return value * 3785;
    default: return value;
  }
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
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

function productSearchText(producto) {
  return normalize(
    [
      producto?.nombre,
      producto?.categoria,
      producto?.slug,
      producto?.specs?.corona,
      producto?.specs?.capacidad,
      producto?.specs?.unidad,
      "envase",
      ...(producto?.specs?.colores ?? []),
      ...(producto?.specs?.coloresBajoPedido ?? []),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

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

function searchProducts(productos, query) {
  if (!query) return productos;
  const expandedQuery = expandQuery(query);
  const scored = productos
    .map((p) => ({
      product: p,
      score: scoreMatch(productSearchText(p), expandedQuery, p),
    }))
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.map((s) => s.product);
}

function capStr(p) {
  const c = p.specs?.capacidad;
  const u = p.specs?.unidad || "";
  return c != null ? `${c} ${u}`.trim() : "?";
}

function label(p) {
  return `${p.nombre} (${capStr(p)}) [${p.slug}]`;
}

function toMlProduct(p) {
  return toMl(p.specs?.capacidad, p.specs?.unidad);
}

describe("productSearchEngine — catálogo real", () => {
  const total = _PRODUCTOS.length;
  console.log(`\nCatálogo: ${total} productos`);

  // --- No falsos positivos por substring numérico ---
  for (const q of ["300", "500", "1500", "1300", "200"]) {
    it(`"${q}" solo trae productos que contengan "${q}" exacto en texto`, () => {
      const results = searchProducts(_PRODUCTOS, q);
      for (const p of results) {
        const text = productSearchText(p);
        assert.ok(
          new RegExp(`\\b${q}\\b`).test(text),
          `${label(p)}: el texto de búsqueda debe contener "${q}" exacto`,
        );
      }
    });
  }

  // --- Sin solapamiento entre capacidades ---
  const pares = [
    ["300", "1300"],
    ["500", "1500"],
    ["200", "1200"],
  ];
  for (const [a, b] of pares) {
    it(`"${a}" y "${b}" no deben solaparse`, () => {
      const rA = searchProducts(_PRODUCTOS, a);
      const rB = searchProducts(_PRODUCTOS, b);
      const namesA = rA.map((p) => p.nombre);
      const namesB = rB.map((p) => p.nombre);
      const overlap = namesA.filter((n) => namesB.includes(n));
      assert.strictEqual(overlap.length, 0, `Solapamiento: ${overlap}`);
    });
  }

  // --- "1500" encuentra productos equivalentes ---
  it('"1500" encuentra Espuma (1500 ml) y Sinfín 1.5 L (1500 ml eq.)', () => {
    const results = searchProducts(_PRODUCTOS, "1500");
    const names = results.map((p) => p.nombre);
    assert.ok(names.includes("Espuma"), "Debe encontrar Espuma");
    assert.ok(
      names.includes("Sinfín 1.5 L"),
      "Debe encontrar Sinfín 1.5 L (1500 ml eq.)",
    );
  });

  // --- Capacidad con unidad (canónica, score 1000) ---
  it('"1500 ml" da score 1000 a Espuma y Sinfín 1.5 L', () => {
    const results = searchProducts(_PRODUCTOS, "1500 ml");
    assert.ok(
      results.some((p) => p.nombre === "Espuma"),
      "Debe incluir Espuma",
    );
    assert.ok(
      results.some((p) => p.slug === "1500-ml"),
      "Debe incluir Sinfín 1.5 L (1500-ml)",
    );
    // Ambos tienen score 1000 (matching capacity)
  });

  it('"300 ml" incluye Ondulada 300 ml y Sinfín 300 ml', () => {
    const results = searchProducts(_PRODUCTOS, "300 ml");
    const slugs = results.map((p) => p.slug);
    assert.ok(
      slugs.includes("300-ml-ondulada") || slugs.includes("300-ml"),
    );
  });

  // --- Sin resultados para no existente ---
  it('"99999" no trae resultados', () => {
    assert.strictEqual(searchProducts(_PRODUCTOS, "99999").length, 0);
  });

  // --- Resumen informativo ---
  it("resumen de búsquedas", () => {
    const queries = ["100", "200", "300", "500", "1000", "1300", "1500", "2000"];
    console.log("\n--- Resumen de búsquedas numéricas ---");
    for (const q of queries) {
      const results = searchProducts(_PRODUCTOS, q);
      console.log(`"${q}" → ${results.length} resultados:`);
      for (const p of results) {
        const ml = toMlProduct(p);
        console.log(`  - ${label(p)} → ${ml} ml`);
      }
    }
    assert.ok(true);
  });
});
