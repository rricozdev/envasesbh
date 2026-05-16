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

// ─── Sonido de typing — Web Audio API nativa ─────────────────────────────────
export const playTypingSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    // Oscilador principal — bloop suave
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.18);

    // Cierra el contexto al terminar para no acumular recursos
    osc.onended = () => ctx.close();
  } catch {
    // Navegadores que bloquean AudioContext sin interacción previa — silencio
  }
};
