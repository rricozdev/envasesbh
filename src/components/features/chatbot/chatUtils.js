// ─── Timestamp seguro — solo se ejecuta en cliente ───────────────────────────
// No usar new Date() directamente en render ni en código que corra en SSR.
// Este helper se llama únicamente desde useEffect o handlers de evento.
export const getTimestamp = () =>
  new Date().toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });

// ─── ID único por mensaje ────────────────────────────────────────────────────
const uid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

// ─── Factory de mensaje de bot ───────────────────────────────────────────────
// Recibe un nodo del chatbotFlow y devuelve el objeto mensaje listo para state.
export const createBotMessage = (node) => ({
  id: `bot-${uid()}`,
  sender: "bot",
  text: node.message,
  options: node.options ?? [],
  cta: node.cta ?? null,
  filter: node.filter ?? null, // para filtrado de productos en ChatWindow
  timestamp: getTimestamp(),
});

// ─── Factory de mensaje de usuario ───────────────────────────────────────────
export const createUserMessage = (label) => ({
  id: `user-${uid()}`,
  sender: "user",
  text: label,
  options: [],
  cta: null,
  filter: null,
  timestamp: getTimestamp(),
});
