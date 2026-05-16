// src/data/chatbot/flow.farmaceuticos.js

export const flowFarmaceuticos = {
  rama_farmaceuticos: {
    message:
      "Nuestra línea farmacéutica cumple con estándares de seguridad y hermeticidad. Contamos con pastilleros, envases farma y tapas especializadas. ¿Qué necesitas?",
    options: [
      { label: "Pastillero / frasco", next: "farmaceuticos_pastillero" },
      { label: "Envase farma", next: "farmaceuticos_envase" },
      { label: "Tapas especializadas", next: "farmaceuticos_tapas" },
      { label: "Ver toda la línea", next: "cta_farmaceuticos_todos" },
    ],
  },

  farmaceuticos_pastillero: {
    message:
      "Tenemos pastilleros en 110 ml y 150 ml con rosca R38 — disponibles en cristal, ámbar, blanco y azul. Empaque en caja.",
    filter: { categoria: "Farmacéuticos", capacidadMax: 160 },
    options: [
      { label: "Ver en catálogo", next: "cta_farmaceuticos_pastillero" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otros formatos", next: "rama_farmaceuticos" },
    ],
  },

  farmaceuticos_envase: {
    message:
      "Los envases farma están disponibles en 125 ml y 240 ml con rosca R24 inviolable — ideales para jarabes, suplementos líquidos y productos farmacéuticos.",
    filter: { categoria: "Farmacéuticos", capacidadMax: 250 },
    options: [
      { label: "Ver en catálogo", next: "cta_farmaceuticos_envase" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otros formatos", next: "rama_farmaceuticos" },
    ],
  },

  farmaceuticos_tapas: {
    message:
      "Contamos con tapa a prueba de niños R38 y tapa ciega inviolable R24 — disponibles en ámbar, blanco, azul y natural.",
    filter: { categoria: "Farmacéuticos", capacidadMax: null },
    options: [
      { label: "Ver en catálogo", next: "cta_farmaceuticos_tapas" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otros formatos", next: "rama_farmaceuticos" },
    ],
  },

  cta_farmaceuticos_todos: {
    message: "Aquí está toda nuestra línea farmacéutica:",
    cta: {
      label: "Ver línea Farmacéuticos",
      link: "/catalogo?categoria=Farmacéuticos",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_farmaceuticos_pastillero: {
    message: "Aquí puedes ver y comparar los pastilleros disponibles:",
    cta: {
      label: "Ver pastilleros",
      link: "/catalogo?categoria=Farmacéuticos",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_farmaceuticos_envase: {
    message: "Aquí puedes ver los envases farma con rosca inviolable:",
    cta: {
      label: "Ver envases farma",
      link: "/catalogo?categoria=Farmacéuticos",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_farmaceuticos_tapas: {
    message: "Aquí puedes ver las tapas de seguridad disponibles:",
    cta: {
      label: "Ver tapas farmacéuticas",
      link: "/catalogo?categoria=Farmacéuticos",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },
};
