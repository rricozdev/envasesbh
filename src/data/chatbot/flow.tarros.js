// src/data/chatbot/flow.tarros.js

export const flowTarros = {
  rama_tarros: {
    message:
      "Nuestra línea de tarros y vitroleros PET es ideal para almacenamiento de alimentos, especias, cosméticos y más. ¿Qué formato necesitas?",
    options: [
      { label: "Tarro pequeño (250–500 ml)", next: "tarros_pequeno" },
      { label: "Tarro grande (1 lt+)", next: "tarros_grande" },
      { label: "Vitrolero", next: "tarros_vitrolero" },
      { label: "Ver toda la línea", next: "cta_tarros_todos" },
    ],
  },

  tarros_pequeno: {
    message:
      "En tarros pequeños tenemos el Tarro 250 ml Liso, 250 ml Octogonal y el Tarro 500 ml — disponibles en cristal y varios colores como rosa, azul y aqua.",
    filter: { categoria: "Tarros y Vitroleros", capacidadMax: 500 },
    options: [
      { label: "Ver en catálogo", next: "cta_tarros_pequeno" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otros formatos", next: "rama_tarros" },
    ],
  },

  tarros_grande: {
    message:
      "Para tarros grandes contamos con el Tarro 1,000 ml y el Especiero 1 lt — ideales para almacenamiento de alimentos, suplementos y especias.",
    filter: { categoria: "Tarros y Vitroleros", capacidadMax: 1200 },
    options: [
      { label: "Ver en catálogo", next: "cta_tarros_grande" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otros formatos", next: "rama_tarros" },
    ],
  },

  tarros_vitrolero: {
    message:
      "Los vitroleros van desde medio galón hasta 1 galón completo, en formatos redondo, cuadrado, anillado y pata de elefante. Todos en cristal con tapa r110.",
    filter: { categoria: "Tarros y Vitroleros", capacidadMax: 4000 },
    options: [
      { label: "Medio galón (1.3–1.7 lt)", next: "cta_vitrolero_medio" },
      { label: "Galón completo (3–4 lt)", next: "cta_vitrolero_galon" },
      { label: "Ver toda la línea", next: "cta_tarros_todos" },
    ],
  },

  cta_tarros_todos: {
    message: "Aquí está toda nuestra línea de tarros y vitroleros:",
    cta: {
      label: "Ver línea Tarros y Vitroleros",
      link: "/catalogo?categoria=Tarros+y+Vitroleros",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_tarros_pequeno: {
    message: "Aquí puedes ver los tarros de 250 ml y 500 ml:",
    cta: {
      label: "Ver tarros hasta 500 ml",
      link: "/catalogo?categoria=Tarros+y+Vitroleros",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_tarros_grande: {
    message: "Aquí puedes ver los tarros de 1 litro y el especiero:",
    cta: {
      label: "Ver tarros 1 lt+",
      link: "/catalogo?categoria=Tarros+y+Vitroleros",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_vitrolero_medio: {
    message:
      "Los vitroleros de medio galón están disponibles en 4 formatos distintos — redondo, cuadrado, anillado y pata de elefante.",
    cta: {
      label: "Ver vitroleros medio galón",
      link: "/catalogo?categoria=Tarros+y+Vitroleros",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_vitrolero_galon: {
    message:
      "El vitrolero galón completo está disponible en formato redondo y cuadrado — ideal para distribución y almacenamiento a granel.",
    cta: {
      label: "Ver vitroleros galón",
      link: "/catalogo?categoria=Tarros+y+Vitroleros",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },
};
