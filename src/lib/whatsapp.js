/**
 * Genera el link de WhatsApp con el resumen de cotización.
 * @param {Array} items - productos del carrito
 * @param {string} telefono - número con código de país, sin espacios ni guiones (ej: "573001234567")
 */
export function generarMensajeWhatsApp(items, telefono) {
  if (!items || items.length === 0) return null;

  const lineas = items.map((item, index) => {
    const nombre = item.nombre || item.name || "Producto";
    const cantidad = item.cantidad ?? 1;
    const referencia = item.referencia || item.slug || "";
    return `[${index + 1}] *${nombre}*${referencia ? ` (Ref: ${referencia})` : ""}
- Empaque: ${item.specs?.tipoEmpaque}
- Cantidad: ${cantidad}
- Contenido: ${item.specs?.pzsEmpaque} und. \n`;
  });

  const mensaje = [
    "*Solicitud de Cotización - Envases BH*",
    "─────────────────────",
    ...lineas,
    "─────────────────────",
    `Total de referencias: ${items.length}`,
    "",
    "Por favor, me gustaría recibir información sobre disponibilidad y precios.",
  ].join("\n");

  const encoded = encodeURIComponent(mensaje);
  return `https://wa.me/${telefono}?text=${encoded}`;
}
