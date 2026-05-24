const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/data/productos.js");
let content = fs.readFileSync(filePath, "utf8");

// Donde sobrePedido es false, stockDisponible debe ser true
content = content.replace(
  /sobrePedido: false,\n(\s+)stockDisponible: (true|false)/g,
  "sobrePedido: false,\n$1stockDisponible: true",
);

// Donde sobrePedido es true, stockDisponible debe ser false
content = content.replace(
  /sobrePedido: true,\n(\s+)stockDisponible: (true|false)/g,
  "sobrePedido: true,\n$1stockDisponible: false",
);

fs.writeFileSync(filePath, content, "utf8");
console.log("✓ stockDisponible sincronizado con sobrePedido");
