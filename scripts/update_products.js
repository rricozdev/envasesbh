const fs = require("fs");
const path = require("path");

// Ruta relativa al archivo de productos
const productsFilePath = path.resolve(__dirname, "../src/data/productos.js");

/**
 * Script para actualizar la estructura de productos.js
 * Agrega 'coloresBajoPedido' y 'produccionMinimaColores' a cada producto.
 */
function updateProducts() {
  try {
    if (!fs.existsSync(productsFilePath)) {
      console.error(`Error: No se encontró el archivo en ${productsFilePath}`);
      return;
    }

    const data = fs.readFileSync(productsFilePath, "utf8");

    // 1. Extraer el contenido del array _PRODUCTOS
    // Capturamos todo el contenido antes y después del array para preservarlo
    // Modificado para no incluir el ';' en el grupo 'array'
    const regex =
      /(?<before>.*export const _PRODUCTOS = )(?<array>\[[\s\S]*?\])(?<after>;[\s\S]*)/;
    const match = data.match(regex);

    if (!match || !match.groups || !match.groups.array) {
      console.error(
        "No se pudo encontrar el array '_PRODUCTOS' en el archivo.",
      );
      return;
    }

    const beforeContent = match.groups.before;
    const arrayContent = match.groups.array;
    const afterContent = match.groups.after;

    // 2. Parsear el array (usando eval de forma segura para literales de JS)
    // Primero, limpiamos los comentarios dentro del array para que eval no falle
    let cleanArrayContent = arrayContent.replace(/\/\/.*|\/\*.*\*\//g, ""); // Eliminar comentarios
    cleanArrayContent = cleanArrayContent.replace(/,(?=\s*\])/g, ""); // Eliminar comas finales en arrays
    cleanArrayContent = cleanArrayContent.replace(/,(?=\s*\})/g, ""); // Eliminar comas finales en objetos

    let productos;
    try {
      // Usar eval para parsear JS object literal. Es crucial que el contenido esté limpio.
      productos = eval(`(${cleanArrayContent})`);
    } catch (e) {
      console.error(
        "Error al parsear el contenido de productos.js:",
        e.message,
      );
      return;
    }

    // 3. Actualizar cada producto
    const updatedProductos = productos.map((prod) => {
      if (prod.specs) {
        // Solo agregamos si no existen para evitar sobreescribir datos manuales previos
        if (!prod.specs.hasOwnProperty("coloresBajoPedido")) {
          prod.specs.coloresBajoPedido = [];
        }
        if (!prod.specs.hasOwnProperty("produccionMinimaColores")) {
          prod.specs.produccionMinimaColores = null;
        }
      }
      return prod;
    });

    // 4. Reconstruir el archivo manteniendo el estilo de objeto literal
    // Usamos una función personalizada para stringify que no ponga comillas en las llaves
    const stringifyLiteral = (obj) => {
      const json = JSON.stringify(obj, null, 2);
      // Reemplazar comillas en las claves para que coincidan con el formato de objeto literal de JS
      return json.replace(/"([a-zA-Z_$][a-zA-Z0-9_$]*)":/g, (match, key) => {
        // Excluir claves que son strings (ej. dentro de arrays de strings como 'colores')
        // Esta heurística es para evitar desformatear rutas de imagen o slugs que son strings
        if (key.includes("/") || key.includes("-")) {
          // Heurística mejorada para rutas o slugs
          return `"${key}":`;
        }
        return `${key}:`;
      });
    };

    const newArrayString = stringifyLiteral(updatedProductos);

    // Reconstruir el contenido final, incluyendo el 'before' y 'after' para preservar comentarios y otros elementos
    const finalContent = `${beforeContent}${newArrayString}${afterContent}`;

    fs.writeFileSync(productsFilePath, finalContent, "utf8");
    console.log("✅ productos.js ha sido actualizado con éxito.");
  } catch (error) {
    console.error("❌ Ocurrió un error inesperado:", error);
  }
}

updateProducts();
