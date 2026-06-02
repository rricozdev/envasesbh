/**
 * Construye nombre completo para UI, SEO y búsqueda.
 */
export function buildProductName(parsed) {
  if (!parsed) return "";

  const { tipo, modelo, capacidad, unidad } = parsed;

  const parts = [];

  if (tipo) {
    parts.push(tipo);
  }

  if (modelo) {
    parts.push(modelo);
  }

  if (capacidad != null && unidad) {
    parts.push(`${capacidad} ${unidad}`);
  }

  return parts.join(" ").trim();
}

/**
 * Segmentación para UI.
 */
export function getProductNameSegments(parsed) {
  const full = buildProductName(parsed);

  const match = full.match(/^(.*?\d+\s*[a-zA-Z]+)(.*)$/i);

  if (!match) {
    return {
      main: full,
      suffix: "",
    };
  }

  return {
    main: match[1].trim(),
    suffix: match[2].trim(),
  };
}
