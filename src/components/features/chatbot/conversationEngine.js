import { chatbotFlow } from "@/data/chatbot/index";

// ─── Contexto inicial ─────────────────────────────────────────────────────────
export const initialContext = {
  categoria: null, // "Cosméticos" | "Agua" | "Limpieza" | etc.
  capacidad: null, // "pequeno" | "mediano" | "grande"
  intento: null, // "explorar" | "cotizar" | "contacto" | "directo"
  visitoProductos: false,
  cotizacionSolicitada: false,
};

// ─── Actualiza contexto según el nodo al que va el usuario ───────────────────
export const updateContext = (context, nextNodeId) => {
  const updated = { ...context };

  // Detectar categoría
  if (nextNodeId.includes("agua")) updated.categoria = "Agua";
  if (nextNodeId.includes("alimentos"))
    updated.categoria = "Alimentos y Bebidas";
  if (nextNodeId.includes("cosmeticos")) updated.categoria = "Cosméticos";
  if (nextNodeId.includes("limpieza")) updated.categoria = "Limpieza";
  if (nextNodeId.includes("hoteleria"))
    updated.categoria = "Amenidades Hoteleras";

  // Detectar capacidad
  if (nextNodeId.includes("pequeno")) updated.capacidad = "pequeno";
  if (nextNodeId.includes("mediano")) updated.capacidad = "mediano";
  if (nextNodeId.includes("grande")) updated.capacidad = "grande";
  if (nextNodeId.includes("micro")) updated.capacidad = "micro";

  // Detectar intención
  if (nextNodeId.includes("explorar")) updated.intento = "explorar";
  if (nextNodeId.includes("cotizacion")) updated.intento = "cotizar";
  if (nextNodeId.includes("contacto")) updated.intento = "contacto";
  if (nextNodeId.includes("buscar_directo")) updated.intento = "directo";

  // Flags
  if (nextNodeId.startsWith("cta_")) updated.visitoProductos = true;
  if (nextNodeId.includes("cotizacion")) updated.cotizacionSolicitada = true;

  // Reset al volver al inicio
  if (nextNodeId === "start") return { ...initialContext };

  return updated;
};

// ─── Personaliza el mensaje según contexto acumulado ─────────────────────────
export const resolveNode = (nodeId, context) => {
  const node = chatbotFlow[nodeId];
  if (!node) {
    console.error(`[Engine] Nodo "${nodeId}" no encontrado.`);
    return null;
  }

  // Clonar para no mutar el flujo original
  const resolved = { ...node };

  // Personalizar mensaje de cotización según contexto
  if (nodeId === "cotizacion_volumen" && context.categoria) {
    const capacidadLabel =
      {
        micro: "formato pequeño",
        pequeno: "formato pequeño",
        mediano: "formato mediano",
        grande: "formato grande",
      }[context.capacidad] ?? "tu selección";

    resolved.message = `Entendido. Para ${context.categoria} en ${capacidadLabel}, nuestro equipo comercial puede darte atención personalizada. ¿Cómo prefieres que te contactemos?`;
  }

  // Personalizar mensaje de contacto si ya visitó productos
  if (nodeId === "contacto" && context.visitoProductos) {
    resolved.message =
      "¿Encontraste lo que buscabas en el catálogo? Nuestro equipo puede ayudarte a concretar tu pedido.";
  }

  // Personalizar contacto si ya solicitó cotización antes
  if (nodeId === "contacto" && context.cotizacionSolicitada) {
    resolved.message =
      "Ya tienes una solicitud de cotización en proceso. Si necesitas algo más, nuestro equipo está disponible.";
  }

  return resolved;
};
