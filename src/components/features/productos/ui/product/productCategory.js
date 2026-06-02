/*
Normalización y clasificación de categorías de producto.

Centraliza reglas que permiten:

- Obtener una categoría consistente.
- Resolver categorías compuestas.
- Unificar criterios de agrupación.
- Evitar lógica de categorías distribuida por la UI.
*/

export function obtenerCategoriaLimpia(producto) {
  const cat = producto.categoria || "";
  const nombre = producto.nombre.toLowerCase();

  if (cat.includes(",") || cat.toLowerCase().includes(" y ")) {
    if (nombre.includes("tapa")) return "Tapas";
    if (nombre.includes("bomba")) return "Bombas";
    if (nombre.includes("trigger") || nombre.includes("atomizador"))
      return "Triggers";
  }

  const primera = cat
    .trim()
    .split(/[\s,]+/)[0]
    .toLowerCase();

  return primera.charAt(0).toUpperCase() + primera.slice(1);
}
