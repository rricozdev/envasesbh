const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/data/productos.js");

try {
  let content = fs.readFileSync(filePath, "utf8");

  // Buscamos el array _PRODUCTOS
  const regex = /export const _PRODUCTOS = (\[[\s\S]*?\]);/;
  const match = content.match(regex);

  if (!match) {
    console.error("No se encontró la variable _PRODUCTOS en el archivo.");
    process.exit(1);
  }

  // Usamos eval para obtener el array de forma segura (es un archivo JS de datos)
  let productos;
  try {
    productos = eval(match[1]);
  } catch (e) {
    console.error("Error al parsear el array de productos:", e);
    process.exit(1);
  }

  // Transformamos el peso de número a array
  const productosActualizados = productos.map((p) => {
    if (p.specs && p.specs.peso !== undefined && p.specs.peso !== null) {
      // Si ya es un array, lo dejamos igual. Si no, lo envolvemos en uno.
      if (!Array.isArray(p.specs.peso)) {
        p.specs.peso = [p.specs.peso];
      }
    }
    return p;
  });

  // Función para convertir objeto JS a string literal sin comillas en las llaves
  const toLiteral = (obj) => {
    return JSON.stringify(obj, null, 2)
      .replace(/"([^"]+)":/g, "$1:") // Quita comillas a las llaves
      .replace(/"/g, "'"); // Cambia comillas dobles por simples
  };

  const newArrayString = toLiteral(productosActualizados);
  const newContent = content.replace(
    regex,
    `export const _PRODUCTOS = ${newArrayString};`,
  );

  fs.writeFileSync(filePath, newContent, "utf8");
  console.log(
    "¡Éxito! La propiedad 'peso' ha sido transformada a Array en todos los productos.",
  );
} catch (err) {
  console.error("Error al procesar el archivo:", err);
}
