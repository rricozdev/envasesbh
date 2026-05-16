// src/data/chatbot/flow.especieros.js

export const flowEspecieros = {
  rama_especieros: {
    message:
      "Contamos con envases especieros en dos alturas y tapas especializadas. Ideales para especias, condimentos y productos gourmet. ¿Qué necesitas?",
    options: [
      { label: "Envase especiero", next: "especieros_envase" },
      { label: "Tapa para especiero", next: "especieros_tapa" },
      { label: "Ver toda la línea", next: "cta_especieros_todos" },
    ],
  },

  especieros_envase: {
    message:
      "Tenemos el Especiero 120 ml en dos versiones: alto (118 mm) y corto (106 mm) — ambos con rosca 36 y empaque en bolsa.",
    filter: { categoria: "Especieros", capacidadMax: 130 },
    options: [
      { label: "Ver en catálogo", next: "cta_especieros_envase" },
      { label: "Ver tapas disponibles", next: "especieros_tapa" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
    ],
  },

  especieros_tapa: {
    message:
      "La tapa especiero está disponible en negro y rojo — compatible con los dos modelos de envase especiero.",
    filter: { categoria: "Especieros", capacidadMax: null },
    options: [
      { label: "Ver en catálogo", next: "cta_especieros_tapa" },
      { label: "Ver envases", next: "especieros_envase" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
    ],
  },

  cta_especieros_todos: {
    message: "Aquí está toda nuestra línea de especieros:",
    cta: {
      label: "Ver línea Especieros",
      link: "/producto?categoria=Especieros",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_especieros_envase: {
    message: "Aquí puedes comparar los dos modelos de especiero 120 ml:",
    cta: {
      label: "Ver especieros 120 ml",
      link: "/producto?categoria=Especieros",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_especieros_tapa: {
    message: "Aquí puedes ver las tapas disponibles para especieros:",
    cta: {
      label: "Ver tapas especiero",
      link: "/producto?categoria=Especieros",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },
};
