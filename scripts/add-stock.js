const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/data/productos.js");
let content = fs.readFileSync(filePath, "utf8");

// Agrega stockDisponible: true después de sobrePedido
content = content.replace(
  /sobrePedido: (true|false|null)/g,
  "sobrePedido: $1,\n      stockDisponible: false",
);

fs.writeFileSync(filePath, content, "utf8");
console.log("✓ Campo 'stockDisponible' agregado a todos los productos");
