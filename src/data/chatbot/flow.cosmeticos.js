// src/data/chatbot/flow.cosmeticos.js

export const flowCosmeticos = {
  rama_cosmeticos: {
    message:
      "Contamos con una línea completa para cosméticos y cuidado personal: oval, silueta, campanita, princesa y más. ¿Qué capacidad necesitas aproximadamente?",
    options: [
      { label: "Menos de 150 ml", next: "cosmeticos_pequeno" },
      { label: "150 ml a 300 ml", next: "cosmeticos_mediano" },
      { label: "Más de 300 ml", next: "cosmeticos_grande" },
      { label: "Ver toda la línea", next: "cta_cosmeticos_todos" },
    ],
  },

  cosmeticos_pequeno: {
    message:
      "En tamaños pequeños tenemos el Oval 60 ml, Boston R20 125 ml y el Silueta 125 ml — perfectos para muestras, viajes y presentaciones individuales.",
    filter: { categoria: "Cosméticos", capacidadMax: 150 },
    options: [
      { label: "Ver en catálogo", next: "cta_cosmeticos_pequeno" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras capacidades", next: "rama_cosmeticos" },
    ],
  },

  cosmeticos_mediano: {
    message:
      "Para presentaciones medianas tenemos el Oval 250 ml, Princesa 280 ml y la Ondulada 300 ml — ideales para shampoo, cremas y lociones.",
    filter: { categoria: "Cosméticos", capacidadMax: 310 },
    options: [
      { label: "Ver en catálogo", next: "cta_cosmeticos_mediano" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras capacidades", next: "rama_cosmeticos" },
    ],
  },

  cosmeticos_grande: {
    message:
      "En formatos grandes contamos con Campanita 500 ml, Campana Alta 500 ml y Silueta 500 ml — ideales para presentaciones de salón o retail.",
    filter: { categoria: "Cosméticos", capacidadMax: 600 },
    options: [
      { label: "Ver en catálogo", next: "cta_cosmeticos_grande" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras capacidades", next: "rama_cosmeticos" },
    ],
  },

  cta_cosmeticos_todos: {
    message: "Aquí está toda nuestra línea de cosméticos:",
    cta: {
      label: "Ver línea Cosméticos",
      link: "/producto?categoria=Cosméticos",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_cosmeticos_pequeno: {
    message: "Aquí puedes ver los formatos pequeños para cosméticos:",
    cta: {
      label: "Ver cosméticos hasta 150 ml",
      link: "/producto?categoria=Cosméticos",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_cosmeticos_mediano: {
    message: "Aquí puedes comparar los formatos medianos:",
    cta: {
      label: "Ver cosméticos 150–300 ml",
      link: "/producto?categoria=Cosméticos",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_cosmeticos_grande: {
    message: "Aquí puedes ver los formatos grandes para cosméticos:",
    cta: {
      label: "Ver cosméticos 500 ml",
      link: "/producto?categoria=Cosméticos",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },
};
