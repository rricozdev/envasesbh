import { describe, it } from "node:test";
import assert from "node:assert";

// --- Copia inline de las funciones del search engine ---

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
  if (q.includes("medio galon"))
    return { value: 0.5, unit: "gal" };
  if (q.includes("1 2 galon"))
    return { value: 0.5, unit: "gal" };
  if (q.includes("cuarto de galon"))
    return { value: 0.25, unit: "gal" };
  const match = q.match(/(\d+(?:\.\d+)?)\s*(ml|l|litro|litros|gal|galon|galones)/);
  if (!match) return null;
  const rawUnit = match[2];
  let unit = rawUnit;
  if (["l", "litro", "litros"].includes(rawUnit)) unit = "L";
  if (["gal", "galon", "galones"].includes(rawUnit)) unit = "gal";
  if (rawUnit === "ml") unit = "ml";
  return { value: Number(match[1]), unit };
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

// --- Test data ---

const TEST_PRODUCTOS = [
  {
    nombre: "Espuma",
    categoria: "Limpieza",
    slug: "espuma",
    specs: {
      peso: [39],
      corona: "28 PCO",
      altura: 298.5,
      capacidad: 1500,
      unidad: "ml",
      pzsEmpaque: 128,
      tipoEmpaque: "Bolsa",
      colores: ["Cristal"],
      liner: [],
      produccionMinima: null,
      sobrePedido: false,
      stockDisponible: true,
      coloresBajoPedido: [],
      produccionMinimaColores: null,
    },
  },
  {
    nombre: "Genérica Lavatraste 1300 ml",
    categoria: "Limpieza",
    slug: "1300ml-lavatraste",
    specs: {
      peso: [39],
      corona: "28 PCO",
      altura: 284,
      capacidad: 1300,
      unidad: "ml",
      pzsEmpaque: 144,
      tipoEmpaque: "Bolsa",
      colores: ["Cristal"],
      liner: [],
      produccionMinima: null,
      sobrePedido: false,
      stockDisponible: true,
      coloresBajoPedido: [],
      produccionMinimaColores: null,
    },
  },
  {
    nombre: "Sinfín 500 ml",
    categoria: "Agua",
    slug: "500-ml",
    specs: {
      peso: [16],
      corona: "28 PCO",
      altura: 216,
      capacidad: 500,
      unidad: "ml",
      pzsEmpaque: 200,
      tipoEmpaque: "Bolsa",
      colores: ["Cristal"],
      liner: [],
      produccionMinima: null,
      sobrePedido: false,
      stockDisponible: true,
      coloresBajoPedido: [],
      produccionMinimaColores: null,
    },
  },
  {
    nombre: "Sinfín 300 ml",
    categoria: "Agua",
    slug: "300-ml",
    specs: {
      peso: [12],
      corona: "28 PCO",
      altura: 160,
      capacidad: 300,
      unidad: "ml",
      pzsEmpaque: 250,
      tipoEmpaque: "Bolsa",
      colores: ["Cristal"],
      liner: [],
      produccionMinima: null,
      sobrePedido: false,
      stockDisponible: true,
      coloresBajoPedido: [],
      produccionMinimaColores: null,
    },
  },
  {
    nombre: "Cilíndrica 200 ml",
    categoria: "Cosméticos",
    slug: "200-ml-cilindrica",
    specs: {
      peso: [23],
      corona: "24-410",
      altura: 141,
      capacidad: 200,
      unidad: "ml",
      pzsEmpaque: 250,
      tipoEmpaque: "Caja",
      colores: ["Cristal"],
      liner: [],
      produccionMinima: null,
      sobrePedido: false,
      stockDisponible: true,
      coloresBajoPedido: [],
      produccionMinimaColores: null,
    },
  },
];

// --- Tests ---

describe("productSearchEngine", () => {
  // --- CRITICAL: Numeric word boundary ---
  it('"300" NO debe traer "1300"', () => {
    const results = searchProducts(TEST_PRODUCTOS, "300");
    const names = results.map((p) => p.nombre);
    assert.strictEqual(
      names.some((n) => n.includes("1300")),
      false,
      '"300" no debe matchear "1300"',
    );
  });

  it('"300" debe traer Sinfín 300 ml', () => {
    const results = searchProducts(TEST_PRODUCTOS, "300");
    const names = results.map((p) => p.nombre);
    assert.ok(names.includes("Sinfín 300 ml"));
  });

  it('"1500" debe traer solo Espuma', () => {
    const results = searchProducts(TEST_PRODUCTOS, "1500");
    const names = results.map((p) => p.nombre);
    assert.ok(names.includes("Espuma"));
    assert.strictEqual(results.length, 1);
  });

  it('"1500" NO debe traer "500"', () => {
    const results = searchProducts(TEST_PRODUCTOS, "1500");
    const names = results.map((p) => p.nombre);
    assert.ok(!names.includes("Sinfín 500 ml"));
  });

  it('"500" debe traer Sinfín 500 ml', () => {
    const results = searchProducts(TEST_PRODUCTOS, "500");
    const names = results.map((p) => p.nombre);
    assert.ok(names.includes("Sinfín 500 ml"));
    assert.ok(!names.includes("Espuma"));
  });

  it('"1300" debe traer solo Lavatraste 1300', () => {
    const results = searchProducts(TEST_PRODUCTOS, "1300");
    const names = results.map((p) => p.nombre);
    assert.ok(names.some((n) => n.includes("1300")));
    assert.ok(!names.includes("Sinfín 300 ml"));
    assert.strictEqual(results.length, 1);
  });

  it('"200" no debe traer otros numeros', () => {
    const results = searchProducts(TEST_PRODUCTOS, "200");
    const names = results.map((p) => p.nombre);
    assert.ok(names.includes("Cilíndrica 200 ml"));
    for (const n of names) {
      const nums = n.match(/\d+/g) || [];
      for (const num of nums) {
        assert.strictEqual(
          /\b200\b/.test(num),
          true,
          `${n}: solo debe contener 200`,
        );
      }
    }
  });

  // --- Capacity with unit ---
  it('"1500 ml" rankea Espuma primero', () => {
    const results = searchProducts(TEST_PRODUCTOS, "1500 ml");
    assert.strictEqual(results[0]?.slug, "espuma");
  });

  it('"300 ml" rankea Sinfín 300 ml primero', () => {
    const results = searchProducts(TEST_PRODUCTOS, "300 ml");
    assert.strictEqual(results[0]?.slug, "300-ml");
  });

  // --- Text search ---
  it('"Lavatraste" encuentra lavatrastes', () => {
    const results = searchProducts(TEST_PRODUCTOS, "Lavatraste");
    assert.ok(results.some((p) => p.nombre.includes("Lavatraste")));
  });

  it('"Espuma" encuentra Espuma', () => {
    const results = searchProducts(TEST_PRODUCTOS, "Espuma");
    assert.ok(results.some((p) => p.nombre === "Espuma"));
  });

  // --- Edge cases ---
  it("query vacío devuelve todos", () => {
    assert.strictEqual(
      searchProducts(TEST_PRODUCTOS, "").length,
      TEST_PRODUCTOS.length,
    );
  });

  it("query null devuelve todos", () => {
    assert.strictEqual(
      searchProducts(TEST_PRODUCTOS, null).length,
      TEST_PRODUCTOS.length,
    );
  });

  it('"xyzzy" no trae resultados', () => {
    assert.strictEqual(searchProducts(TEST_PRODUCTOS, "xyzzy").length, 0);
  });

  it('"24-410" filtra por rosca', () => {
    const results = searchProducts(TEST_PRODUCTOS, "24-410");
    assert.ok(results.length > 0);
    assert.ok(results.every((p) => p.specs?.corona?.includes("24-410")));
  });

  // --- Multi-word ---
  it('"Limpieza 1300" trae Lavatraste 1300', () => {
    const results = searchProducts(TEST_PRODUCTOS, "Limpieza 1300");
    assert.ok(results.some((p) => p.nombre.includes("1300")));
  });
});
